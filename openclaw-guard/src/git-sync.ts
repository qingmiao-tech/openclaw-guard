import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { URL, URLSearchParams } from 'node:url';
import { getOpenClawDir } from './platform.js';
import { ensureDir, ensureGuardLayout, readJsonFile, writeJsonFile } from './guard-state.js';
import { addNotification } from './notifications.js';
import { runCommand } from './openclaw-runtime.js';

export type GitProvider = 'github' | 'gitee';
export type GitAuthMode = 'none' | 'token' | 'oauth';
export type GitOAuthPhase = 'idle' | 'authorizing' | 'success' | 'error';

export interface GitOAuthState {
  phase: GitOAuthPhase;
  provider: GitProvider | null;
  startedAt: string | null;
  completedAt: string | null;
  authorizeUrl: string | null;
  redirectUrl: string | null;
  message: string | null;
  error: string | null;
}

export interface GitSyncState {
  provider: GitProvider | null;
  remoteName: string;
  remoteUrl: string | null;
  authMode: GitAuthMode;
  username: string | null;
  repoOwner: string | null;
  repoName: string | null;
  repoPrivate: boolean | null;
  lastCheckedAt: string | null;
  lastSyncAt: string | null;
  lastCommitAt: string | null;
  lastError: string | null;
  oauth: GitOAuthState;
}

export interface GitSyncSecret {
  token: string;
}

export interface GitRepoRef {
  provider: GitProvider;
  host: string;
  owner: string;
  repo: string;
  normalizedRemoteUrl: string;
  webUrl: string;
}

export interface GitSyncStatus {
  repoPath: string;
  gitAvailable: boolean;
  repoInitialized: boolean;
  currentBranch: string | null;
  remoteName: string;
  remoteUrl: string | null;
  provider: GitProvider | null;
  authMode: GitAuthMode;
  authConfigured: boolean;
  repoPrivate: boolean | null;
  remoteOwner: string | null;
  remoteRepo: string | null;
  remoteHost: string | null;
  remoteWebUrl: string | null;
  accountUsername: string | null;
  hasChanges: boolean;
  changedFiles: string[];
  canCommit: boolean;
  canPush: boolean;
  canSync: boolean;
  commitReasons: string[];
  pushReasons: string[];
  reasons: string[];
  state: GitSyncState;
  oauth: GitOAuthState;
}

export interface GitSyncActionResult {
  success: boolean;
  message: string;
  status: GitSyncStatus;
  output?: string;
}

export interface OAuthLoginOptions {
  provider: GitProvider;
  clientId: string;
  clientSecret: string;
  scope?: string;
  redirectPort?: number;
  openBrowser?: boolean;
}

interface ProviderRepoInfo {
  private: boolean;
  owner: string;
  repo: string;
}

const DEFAULT_OAUTH_STATE: GitOAuthState = {
  phase: 'idle',
  provider: null,
  startedAt: null,
  completedAt: null,
  authorizeUrl: null,
  redirectUrl: null,
  message: null,
  error: null,
};

const DEFAULT_STATE: GitSyncState = {
  provider: null,
  remoteName: 'origin',
  remoteUrl: null,
  authMode: 'none',
  username: null,
  repoOwner: null,
  repoName: null,
  repoPrivate: null,
  lastCheckedAt: null,
  lastSyncAt: null,
  lastCommitAt: null,
  lastError: null,
  oauth: { ...DEFAULT_OAUTH_STATE },
};

function getStateFile(): string {
  return path.join(ensureGuardLayout().stateDir, 'git-sync.json');
}

function getSecretFile(): string {
  return path.join(ensureGuardLayout().secretsDir, 'git-sync.json');
}

function normalizeOAuthState(oauth?: Partial<GitOAuthState> | null): GitOAuthState {
  return {
    ...DEFAULT_OAUTH_STATE,
    ...(oauth || {}),
  };
}

function normalizeState(input?: Partial<GitSyncState> | null): GitSyncState {
  return {
    ...DEFAULT_STATE,
    ...(input || {}),
    oauth: normalizeOAuthState(input?.oauth),
  };
}

function saveState(nextState: GitSyncState): void {
  writeJsonFile(getStateFile(), normalizeState(nextState));
}

function saveSecret(secret: GitSyncSecret | null): void {
  const filePath = getSecretFile();
  if (!secret) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    return;
  }
  writeJsonFile(filePath, secret);
}

function loadSecret(): GitSyncSecret | null {
  return readJsonFile<GitSyncSecret | null>(getSecretFile(), null);
}

export function loadGitSyncState(): GitSyncState {
  return normalizeState(readJsonFile<GitSyncState>(getStateFile(), DEFAULT_STATE));
}

let activeOAuthServer: http.Server | null = null;
let activeOAuthTimeout: NodeJS.Timeout | null = null;

function runGit(args: string[], extraEnv?: NodeJS.ProcessEnv) {
  if (extraEnv && Object.keys(extraEnv).length > 0) {
    const result = spawnSync('git', args, {
      encoding: 'utf-8',
      timeout: 60000,
      shell: process.platform === 'win32',
      windowsHide: true,
      env: {
        ...process.env,
        ...extraEnv,
      },
    });

    return {
      success: result.status === 0 && !result.error,
      command: 'git',
      args,
      exitCode: result.status,
      stdout: result.stdout || '',
      stderr: result.stderr || '',
      error: result.error?.message,
    };
  }

  return runCommand('git', args, 60000);
}

function repoPath(): string {
  return getOpenClawDir();
}

function ensureGitAvailable(): boolean {
  return runGit(['--version']).success;
}

function isRepoInitialized(): boolean {
  return fs.existsSync(path.join(repoPath(), '.git'));
}

function getCurrentBranch(): string | null {
  const result = runGit(['-C', repoPath(), 'branch', '--show-current']);
  return result.success ? (result.stdout.trim() || null) : null;
}

function getRemoteUrl(remoteName: string): string | null {
  const result = runGit(['-C', repoPath(), 'remote', 'get-url', remoteName]);
  return result.success ? (result.stdout.trim() || null) : null;
}

function getChangedFiles(): string[] {
  if (!isRepoInitialized()) return [];
  const result = runGit(['-C', repoPath(), 'status', '--porcelain']);
  if (!result.success) return [];
  return result.stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.slice(3).trim())
    .filter(Boolean);
}

export function parseGitRemote(remoteUrl: string): GitRepoRef | null {
  const trimmed = remoteUrl.trim();
  let match = trimmed.match(/^https?:\/\/(github\.com|gitee\.com)\/([^/]+)\/([^/]+?)(?:\.git)?$/i);
  if (match) {
    const host = match[1].toLowerCase();
    const provider = host.includes('github') ? 'github' : 'gitee';
    const owner = match[2];
    const repo = match[3];
    return {
      provider,
      host,
      owner,
      repo,
      normalizedRemoteUrl: `https://${host}/${owner}/${repo}.git`,
      webUrl: `https://${host}/${owner}/${repo}`,
    };
  }

  match = trimmed.match(/^git@(github\.com|gitee\.com):([^/]+)\/([^/]+?)(?:\.git)?$/i);
  if (match) {
    const host = match[1].toLowerCase();
    const provider = host.includes('github') ? 'github' : 'gitee';
    const owner = match[2];
    const repo = match[3];
    return {
      provider,
      host,
      owner,
      repo,
      normalizedRemoteUrl: `https://${host}/${owner}/${repo}.git`,
      webUrl: `https://${host}/${owner}/${repo}`,
    };
  }

  return null;
}

function requestJson(targetUrl: string, options: { method?: string; headers?: Record<string, string>; body?: string } = {}): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(targetUrl);
    const transport = parsed.protocol === 'http:' ? http : https;
    const request = transport.request(parsed, {
      method: options.method || 'GET',
      headers: options.headers,
    }, (response) => {
      const chunks: Buffer[] = [];
      response.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      response.on('end', () => {
        const rawText = Buffer.concat(chunks).toString('utf-8');
        try {
          const parsedJson = rawText ? JSON.parse(rawText) as Record<string, unknown> : {};
          if ((response.statusCode || 500) >= 400) {
            reject(new Error(`HTTP ${response.statusCode}: ${rawText}`));
            return;
          }
          resolve(parsedJson);
        } catch (error) {
          reject(error instanceof Error ? error : new Error(String(error)));
        }
      });
    });
    request.on('error', reject);
    if (options.body) request.write(options.body);
    request.end();
  });
}

function buildAuthenticatedRemoteUrl(remote: GitRepoRef, token: string, username?: string | null): string {
  const safeToken = encodeURIComponent(token);
  if (remote.provider === 'github') {
    return `https://x-access-token:${safeToken}@${remote.host}/${remote.owner}/${remote.repo}.git`;
  }
  const safeUser = encodeURIComponent(username || 'oauth2');
  return `https://${safeUser}:${safeToken}@${remote.host}/${remote.owner}/${remote.repo}.git`;
}

async function fetchProviderRepoInfo(remote: GitRepoRef, token: string): Promise<ProviderRepoInfo> {
  if (remote.provider === 'github') {
    const payload = await requestJson(`https://api.github.com/repos/${remote.owner}/${remote.repo}`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'openclaw-guard',
      },
    });
    return {
      private: payload.private === true,
      owner: remote.owner,
      repo: remote.repo,
    };
  }

  const payload = await requestJson(`https://gitee.com/api/v5/repos/${remote.owner}/${remote.repo}?access_token=${encodeURIComponent(token)}`, {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'openclaw-guard',
    },
  });
  return {
    private: payload.private === true,
    owner: remote.owner,
    repo: remote.repo,
  };
}

function ensureGitIgnore(): string {
  const filePath = path.join(repoPath(), '.gitignore');
  const requiredEntries = [
    'guard/secrets/',
    'guard/state/',
    'env',
    '*.log',
  ];
  const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8').split(/\r?\n/) : [];
  const merged = existing.slice();
  for (const entry of requiredEntries) {
    if (!merged.includes(entry)) merged.push(entry);
  }
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${merged.filter(Boolean).join('\n')}\n`, 'utf-8');
  return filePath;
}

function buildStatus(stateOverride?: Partial<GitSyncState>): GitSyncStatus {
  const state = normalizeState({ ...loadGitSyncState(), ...stateOverride });
  const remoteUrl = state.remoteUrl || getRemoteUrl(state.remoteName) || null;
  const remote = remoteUrl ? parseGitRemote(remoteUrl) : null;
  const secret = loadSecret();
  const changedFiles = getChangedFiles();
  const gitAvailable = ensureGitAvailable();
  const repoInitialized = isRepoInitialized();
  const commitReasons: string[] = [];
  const pushReasons: string[] = [];
  const syncReasons: string[] = [];

  if (!gitAvailable) {
    commitReasons.push('Git executable was not detected');
    pushReasons.push('Git executable was not detected');
    syncReasons.push('Git executable was not detected');
  }
  if (!repoInitialized) {
    commitReasons.push('The current .openclaw directory is not a Git repository yet');
    pushReasons.push('The current .openclaw directory is not a Git repository yet');
    syncReasons.push('The current .openclaw directory is not a Git repository yet');
  }
  if (!changedFiles.length) {
    commitReasons.push('There are no local changes to commit');
    syncReasons.push('There are no local changes to commit');
  }
  if (!remoteUrl) {
    pushReasons.push('No remote repository is connected yet');
    syncReasons.push('No remote repository is connected yet');
  }
  if (remoteUrl && !remote) {
    pushReasons.push('The remote repository is not a standard GitHub/Gitee URL');
    syncReasons.push('The remote repository is not a standard GitHub/Gitee URL');
  }
  if (!secret?.token) {
    pushReasons.push('Git authentication is not configured yet');
    syncReasons.push('Git authentication is not configured yet');
  }
  if (state.repoPrivate !== true) {
    pushReasons.push('The remote repository is not confirmed as private, push is blocked');
    syncReasons.push('The remote repository is not confirmed as private, sync is blocked');
  }

  const canCommit = commitReasons.length === 0;
  const canPush = pushReasons.length === 0;
  const canSync = syncReasons.length === 0;

  const status: GitSyncStatus = {
    repoPath: repoPath(),
    gitAvailable,
    repoInitialized,
    currentBranch: getCurrentBranch(),
    remoteName: state.remoteName,
    remoteUrl,
    provider: remote?.provider || state.provider || null,
    authMode: state.authMode,
    authConfigured: !!secret?.token,
    repoPrivate: state.repoPrivate,
    remoteOwner: remote?.owner || state.repoOwner || null,
    remoteRepo: remote?.repo || state.repoName || null,
    remoteHost: remote?.host || null,
    remoteWebUrl: remote?.webUrl || null,
    accountUsername: state.username || null,
    hasChanges: changedFiles.length > 0,
    changedFiles,
    canCommit,
    canPush,
    canSync,
    commitReasons,
    pushReasons,
    reasons: syncReasons,
    state: {
      ...state,
      provider: remote?.provider || state.provider,
      remoteUrl,
      repoOwner: remote?.owner || state.repoOwner,
      repoName: remote?.repo || state.repoName,
      oauth: normalizeOAuthState(state.oauth),
    },
    oauth: normalizeOAuthState(state.oauth),
  };

  if (status.hasChanges) {
    addNotification({
      type: 'git-sync',
      source: 'git-sync',
      title: 'Detected unsynced .openclaw changes',
      message: `There are ${status.changedFiles.length} changed files ready for commit and push.`,
      severity: 'info',
      meta: { changedFiles: status.changedFiles.slice(0, 20) },
    });
  }

  return status;
}

function updateOAuthState(patch: Partial<GitOAuthState>): GitSyncState {
  const current = loadGitSyncState();
  const next = normalizeState({
    ...current,
    oauth: {
      ...current.oauth,
      ...patch,
    },
  });
  saveState(next);
  return next;
}

function clearActiveOAuthFlow(): void {
  if (activeOAuthTimeout) {
    clearTimeout(activeOAuthTimeout);
    activeOAuthTimeout = null;
  }
  if (activeOAuthServer) {
    try {
      activeOAuthServer.close();
    } catch {
      // ignore close errors
    }
    activeOAuthServer = null;
  }
}

export function getGitSyncStatus(): GitSyncStatus {
  return buildStatus();
}

export function initGitSync(): GitSyncActionResult {
  if (!ensureGitAvailable()) {
    return {
      success: false,
      message: 'Git was not detected. Install Git before continuing.',
      status: buildStatus(),
    };
  }

  if (!isRepoInitialized()) {
    const initResult = runGit(['-C', repoPath(), 'init']);
    if (!initResult.success) {
      return {
        success: false,
        message: `Failed to initialize Git repository: ${initResult.error || initResult.stderr || initResult.stdout}`,
        status: buildStatus(),
        output: initResult.stderr || initResult.stdout,
      };
    }
  }

  const gitignorePath = ensureGitIgnore();
  addNotification({
    type: 'git-sync',
    source: 'git-sync',
    title: 'Git sync repository initialized',
    message: `Prepared the Git repository and updated ${gitignorePath}`,
    severity: 'success',
  });
  return {
    success: true,
    message: 'Git sync repository initialized.',
    status: buildStatus(),
    output: gitignorePath,
  };
}

export function connectGitRemote(input: { provider?: GitProvider; remoteUrl: string; remoteName?: string }): GitSyncActionResult {
  const remote = parseGitRemote(input.remoteUrl);
  if (!remote) {
    return {
      success: false,
      message: 'Only GitHub/Gitee HTTPS or SSH repository URLs are supported.',
      status: buildStatus(),
    };
  }

  if (input.provider && input.provider !== remote.provider) {
    return {
      success: false,
      message: 'The provided provider does not match the remote URL.',
      status: buildStatus(),
    };
  }

  const initResult = initGitSync();
  if (!initResult.success) return initResult;

  const remoteName = input.remoteName?.trim() || 'origin';
  const existing = getRemoteUrl(remoteName);
  const command = existing
    ? ['-C', repoPath(), 'remote', 'set-url', remoteName, remote.normalizedRemoteUrl]
    : ['-C', repoPath(), 'remote', 'add', remoteName, remote.normalizedRemoteUrl];
  const result = runGit(command);
  if (!result.success) {
    return {
      success: false,
        message: `Failed to bind remote repository: ${result.error || result.stderr || result.stdout}`,
      status: buildStatus(),
      output: result.stderr || result.stdout,
    };
  }

  const state: GitSyncState = {
    ...loadGitSyncState(),
    provider: remote.provider,
    remoteName,
    remoteUrl: remote.normalizedRemoteUrl,
    repoOwner: remote.owner,
    repoName: remote.repo,
    lastError: null,
  };
  saveState(state);
  addNotification({
    type: 'git-sync',
    source: 'git-sync',
    title: 'Remote repository connected',
    message: remote.normalizedRemoteUrl,
    severity: 'success',
  });
  return {
    success: true,
    message: `Connected remote repository ${remote.normalizedRemoteUrl}`,
    status: buildStatus(state),
  };
}

export function saveGitTokenAuth(input: { provider?: GitProvider; token: string; username?: string | null; authMode?: GitAuthMode }): GitSyncActionResult {
  const token = input.token.trim();
  if (!token) {
    return {
      success: false,
      message: 'Token cannot be empty.',
      status: buildStatus(),
    };
  }
  saveSecret({ token });
  const current = loadGitSyncState();
  const next: GitSyncState = {
    ...current,
    provider: input.provider || current.provider,
    username: input.username || current.username,
    authMode: input.authMode || 'token',
    lastError: null,
    oauth: {
      ...current.oauth,
      phase: input.authMode === 'oauth' ? 'success' : current.oauth.phase === 'authorizing' ? 'idle' : current.oauth.phase,
      provider: input.provider || current.provider || current.oauth.provider,
      completedAt: input.authMode === 'oauth' ? new Date().toISOString() : current.oauth.completedAt,
      message: input.authMode === 'oauth' ? 'OAuth finished successfully. Continue with private-check or sync.' : current.oauth.message,
      error: null,
    },
  };
  saveState(next);
  addNotification({
    type: 'git-sync',
    source: 'git-sync',
    title: 'Git authentication saved',
    message: 'Git credentials were saved. You can continue with private-check or sync.',
    severity: 'success',
  });
  return {
    success: true,
    message: 'Git authentication saved.',
    status: buildStatus(next),
  };
}

export async function checkGitRemotePrivate(): Promise<GitSyncActionResult> {
  const state = loadGitSyncState();
  const remoteUrl = state.remoteUrl || getRemoteUrl(state.remoteName) || null;
  const remote = remoteUrl ? parseGitRemote(remoteUrl) : null;
  const secret = loadSecret();

  if (!remote || !secret?.token) {
    return {
      success: false,
      message: 'Connect a remote repository and configure authentication before checking private status.',
      status: buildStatus(),
    };
  }

  try {
    const repoInfo = await fetchProviderRepoInfo(remote, secret.token);
    const next: GitSyncState = {
      ...state,
      provider: remote.provider,
      remoteUrl: remote.normalizedRemoteUrl,
      repoOwner: repoInfo.owner,
      repoName: repoInfo.repo,
      repoPrivate: repoInfo.private,
      lastCheckedAt: new Date().toISOString(),
      lastError: repoInfo.private ? null : 'Remote repository is not private',
    };
    saveState(next);
    const message = repoInfo.private
      ? 'The remote repository is confirmed as private and ready to sync.'
      : 'The remote repository is not private, Guard has blocked sync.';
    addNotification({
      type: 'git-sync',
      source: 'git-sync',
      title: repoInfo.private ? 'Private repository check passed' : 'Private repository check failed',
      message,
      severity: repoInfo.private ? 'success' : 'warning',
    });
    return {
      success: repoInfo.private,
      message,
      status: buildStatus(next),
    };
  } catch (error) {
    const next: GitSyncState = {
      ...state,
      lastCheckedAt: new Date().toISOString(),
      lastError: error instanceof Error ? error.message : String(error),
    };
    saveState(next);
    addNotification({
      type: 'git-sync',
      source: 'git-sync',
      title: 'Private repository check failed',
      message: next.lastError || 'Unknown error',
      severity: 'error',
    });
    return {
      success: false,
      message: `Private repository check failed: ${next.lastError}`,
      status: buildStatus(next),
    };
  }
}

function generateCommitMessage(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = `${now.getMonth() + 1}`.padStart(2, '0');
  const dd = `${now.getDate()}`.padStart(2, '0');
  const hh = `${now.getHours()}`.padStart(2, '0');
  const mi = `${now.getMinutes()}`.padStart(2, '0');
  return `同步 OpenClaw 配置 ${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}

function getReadyStatus(): GitSyncStatus {
  const status = buildStatus();
  return status;
}

export function commitGitSync(message?: string): GitSyncActionResult {
  const status = getReadyStatus();
  if (!status.canCommit) {
    return {
      success: false,
      message: `Commit pre-check failed: ${status.commitReasons.join('; ')}`,
      status,
    };
  }

  const addResult = runGit(['-C', repoPath(), 'add', '-A']);
  if (!addResult.success) {
    return {
      success: false,
        message: `Failed to stage files: ${addResult.error || addResult.stderr || addResult.stdout}`,
      status,
      output: addResult.stderr || addResult.stdout,
    };
  }

  const commitResult = runGit(['-C', repoPath(), 'commit', '-m', message?.trim() || generateCommitMessage()]);
  if (!commitResult.success) {
    return {
      success: false,
        message: `Commit failed: ${commitResult.error || commitResult.stderr || commitResult.stdout}`,
      status,
      output: commitResult.stderr || commitResult.stdout,
    };
  }

  const next: GitSyncState = {
    ...status.state,
    lastCommitAt: new Date().toISOString(),
    lastError: null,
  };
  saveState(next);
  addNotification({
    type: 'git-sync',
    source: 'git-sync',
    title: 'Local commit succeeded',
    message: commitResult.stdout.trim() || 'A new Git commit was created.',
    severity: 'success',
  });
  return {
    success: true,
    message: 'Local commit succeeded.',
    status: buildStatus(next),
    output: commitResult.stdout.trim(),
  };
}

export function pushGitSync(): GitSyncActionResult {
  const status = getReadyStatus();
  if (!status.canPush) {
    return {
      success: false,
      message: `Push pre-check failed: ${status.pushReasons.join('; ')}`,
      status,
    };
  }

  const secret = loadSecret();
  const remote = status.remoteUrl ? parseGitRemote(status.remoteUrl) : null;
  if (!secret?.token || !remote) {
    return {
      success: false,
      message: 'Remote repository or authentication is missing before push.',
      status,
    };
  }

  const branch = status.currentBranch || 'main';
  const authUrl = buildAuthenticatedRemoteUrl(remote, secret.token, status.state.username);
  const pushResult = runGit(['-C', repoPath(), 'push', authUrl, `HEAD:${branch}`]);
  if (!pushResult.success) {
    const next: GitSyncState = {
      ...status.state,
      lastError: pushResult.error || pushResult.stderr || pushResult.stdout,
    };
    saveState(next);
    addNotification({
      type: 'git-sync',
      source: 'git-sync',
      title: 'Remote push failed',
      message: next.lastError || 'Unknown error',
      severity: 'error',
    });
    return {
      success: false,
      message: `Remote push failed: ${next.lastError}`,
      status: buildStatus(next),
      output: pushResult.stderr || pushResult.stdout,
    };
  }

  const next: GitSyncState = {
    ...status.state,
    lastSyncAt: new Date().toISOString(),
    lastError: null,
  };
  saveState(next);
  addNotification({
    type: 'git-sync',
    source: 'git-sync',
    title: 'Remote push succeeded',
    message: pushResult.stdout.trim() || 'Changes were pushed to the private remote repository.',
    severity: 'success',
  });
  return {
    success: true,
    message: 'Remote push succeeded.',
    status: buildStatus(next),
    output: pushResult.stdout.trim(),
  };
}

export function syncGitSync(message?: string): GitSyncActionResult {
  const commitResult = commitGitSync(message);
  if (!commitResult.success) return commitResult;
  return pushGitSync();
}

function openUrlInBrowser(targetUrl: string): void {
  const command = process.platform === 'win32'
    ? ['cmd', '/c', 'start', '', targetUrl]
    : process.platform === 'darwin'
      ? ['open', targetUrl]
      : ['xdg-open', targetUrl];
  spawn(command[0], command.slice(1), {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  }).unref();
}

async function fetchOAuthUser(provider: GitProvider, token: string): Promise<{ username: string | null }> {
  if (provider === 'github') {
    const payload = await requestJson('https://api.github.com/user', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'openclaw-guard',
      },
    });
    return { username: typeof payload.login === 'string' ? payload.login : null };
  }

  const payload = await requestJson(`https://gitee.com/api/v5/user?access_token=${encodeURIComponent(token)}`, {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'openclaw-guard',
    },
  });
  return { username: typeof payload.login === 'string' ? payload.login : null };
}

export async function startOAuthLogin(options: OAuthLoginOptions): Promise<GitSyncActionResult> {
  const providerConfig = options.provider === 'github'
    ? {
      authorizeUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      scope: options.scope || 'repo read:user',
    }
    : {
      authorizeUrl: 'https://gitee.com/oauth/authorize',
      tokenUrl: 'https://gitee.com/oauth/token',
      scope: options.scope || 'projects',
    };

  clearActiveOAuthFlow();

  const stateValue = Math.random().toString(16).slice(2) + Date.now().toString(16);
  const callbackServer = http.createServer();
  const startedAt = new Date().toISOString();

  callbackServer.on('request', async (req, res) => {
    try {
      const requestUrl = new URL(req.url || '/', 'http://127.0.0.1');
      const code = requestUrl.searchParams.get('code');
      const returnedState = requestUrl.searchParams.get('state');
      if (!code || returnedState !== stateValue) {
        const next = updateOAuthState({
          phase: 'error',
          provider: options.provider,
          completedAt: new Date().toISOString(),
          message: 'OAuth callback verification failed. Please restart the flow.',
          error: 'callback-state-mismatch',
        });
        addNotification({
          type: 'git-sync',
          source: 'git-sync',
          title: 'OAuth callback verification failed',
          message: 'The callback did not include a valid code/state pair. Please start OAuth again.',
          severity: 'error',
        });
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<html><body><h2>OpenClaw Guard OAuth verification failed</h2><p>Please return to Guard and start the OAuth flow again.</p></body></html>');
        clearActiveOAuthFlow();
        buildStatus(next);
        return;
      }

      const redirectUri = `http://127.0.0.1:${(callbackServer.address() as { port: number }).port}/callback`;
      const tokenResponse = await requestJson(providerConfig.tokenUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'openclaw-guard',
        },
        body: new URLSearchParams({
          client_id: options.clientId,
          client_secret: options.clientSecret,
          code,
          redirect_uri: redirectUri,
          state: stateValue,
        }).toString(),
      });

      const token = typeof tokenResponse.access_token === 'string' ? tokenResponse.access_token : '';
      if (!token) {
        throw new Error('OAuth did not return an access_token');
      }

      const user = await fetchOAuthUser(options.provider, token);
      const saveResult = saveGitTokenAuth({
        provider: options.provider,
        token,
        username: user.username,
        authMode: 'oauth',
      });
      if (saveResult.status.remoteUrl) {
        await checkGitRemotePrivate();
      }
      const next = updateOAuthState({
        phase: 'success',
        provider: options.provider,
        completedAt: new Date().toISOString(),
        message: 'OAuth finished successfully. Continue with private-check or sync.',
        error: null,
      });
      addNotification({
        type: 'git-sync',
        source: 'git-sync',
        title: 'OAuth completed successfully',
        message: `${options.provider} account: ${user.username || 'unknown'}`,
        severity: 'success',
      });
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<html><body><h2>OpenClaw Guard OAuth completed</h2><p>You can close this window and return to Guard.</p></body></html>');
      clearActiveOAuthFlow();
      saveResult.status = buildStatus(next);
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const next = updateOAuthState({
        phase: 'error',
        provider: options.provider,
        completedAt: new Date().toISOString(),
        message: 'OAuth failed. Check network, Client ID, Client Secret, and callback settings.',
        error: message,
      });
      addNotification({
        type: 'git-sync',
        source: 'git-sync',
        title: 'OAuth failed',
        message,
        severity: 'error',
      });
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<html><body><h2>OpenClaw Guard OAuth failed</h2><p>Return to Guard for details, then retry.</p></body></html>');
      clearActiveOAuthFlow();
      buildStatus(next);
    }
  });

  return await new Promise<GitSyncActionResult>((resolve) => {
    callbackServer.on('error', (error) => {
      const message = error instanceof Error ? error.message : String(error);
      const next = updateOAuthState({
        phase: 'error',
        provider: options.provider,
        completedAt: new Date().toISOString(),
        message: 'OAuth callback server failed to start.',
        error: message,
      });
      addNotification({
        type: 'git-sync',
        source: 'git-sync',
        title: 'OAuth startup failed',
        message,
        severity: 'error',
      });
      clearActiveOAuthFlow();
      resolve({
        success: false,
        message: `OAuth callback server failed to start: ${message}`,
        status: buildStatus(next),
      });
    });

    callbackServer.listen(options.redirectPort || 0, '127.0.0.1', () => {
      const port = (callbackServer.address() as { port: number }).port;
      const redirectUri = `http://127.0.0.1:${port}/callback`;
      const authUrl = `${providerConfig.authorizeUrl}?${new URLSearchParams({
        client_id: options.clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: providerConfig.scope,
        state: stateValue,
      }).toString()}`;

      const next = updateOAuthState({
        phase: 'authorizing',
        provider: options.provider,
        startedAt,
        completedAt: null,
        authorizeUrl: authUrl,
        redirectUrl: redirectUri,
        message: 'Browser authorization started. Finish login in your browser.',
        error: null,
      });

      activeOAuthServer = callbackServer;
      activeOAuthTimeout = setTimeout(() => {
        const timeoutState = updateOAuthState({
          phase: 'error',
          provider: options.provider,
          completedAt: new Date().toISOString(),
          message: 'OAuth timed out. Start the flow again.',
          error: 'timeout',
        });
        addNotification({
          type: 'git-sync',
          source: 'git-sync',
          title: 'OAuth timed out',
          message: 'The browser authorization was not completed within 180 seconds.',
          severity: 'warning',
        });
        clearActiveOAuthFlow();
        buildStatus(timeoutState);
      }, 180000);

      if (options.openBrowser !== false) {
        openUrlInBrowser(authUrl);
      }

      addNotification({
        type: 'git-sync',
        source: 'git-sync',
        title: 'OAuth started',
        message: `Open ${options.provider} in your browser and finish the login. Callback: ${redirectUri}`,
        severity: 'info',
      });

      resolve({
        success: true,
        message: 'OAuth started. Finish the login in your browser.',
        status: buildStatus(next),
        output: authUrl,
      });
    });
  });
}
