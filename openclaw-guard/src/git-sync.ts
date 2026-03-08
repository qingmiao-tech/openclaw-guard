import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { URL, URLSearchParams } from 'node:url';
import { getOpenClawDir } from './platform.js';
import { ensureDir, ensureGuardLayout, readJsonFile, writeJsonFile } from './guard-state.js';
import { addNotification } from './notifications.js';
import { runCommand } from './openclaw-runtime.js';

export type GitProvider = 'github' | 'gitee';
export type GitAuthMode = 'none' | 'token' | 'oauth';

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
  hasChanges: boolean;
  changedFiles: string[];
  canSync: boolean;
  reasons: string[];
  state: GitSyncState;
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
};

function getStateFile(): string {
  return path.join(ensureGuardLayout().stateDir, 'git-sync.json');
}

function getSecretFile(): string {
  return path.join(ensureGuardLayout().secretsDir, 'git-sync.json');
}

function saveState(nextState: GitSyncState): void {
  writeJsonFile(getStateFile(), nextState);
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
  return readJsonFile<GitSyncState>(getStateFile(), DEFAULT_STATE);
}

function runGit(args: string[], extraEnv?: NodeJS.ProcessEnv) {
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
  const state = { ...loadGitSyncState(), ...stateOverride };
  const remoteUrl = state.remoteUrl || getRemoteUrl(state.remoteName) || null;
  const remote = remoteUrl ? parseGitRemote(remoteUrl) : null;
  const secret = loadSecret();
  const changedFiles = getChangedFiles();
  const reasons: string[] = [];

  if (!ensureGitAvailable()) reasons.push('未检测到 git 可执行文件');
  if (!isRepoInitialized()) reasons.push('当前 .openclaw 目录还不是 Git 仓库');
  if (!remoteUrl) reasons.push('尚未绑定远程仓库');
  if (remoteUrl && !remote) reasons.push('当前远程仓库不是 GitHub/Gitee 的标准地址');
  if (!secret?.token) reasons.push('尚未配置 Git 认证');
  if (state.repoPrivate !== true) reasons.push('远程仓库尚未确认是 private，已阻止同步');

  const status: GitSyncStatus = {
    repoPath: repoPath(),
    gitAvailable: ensureGitAvailable(),
    repoInitialized: isRepoInitialized(),
    currentBranch: getCurrentBranch(),
    remoteName: state.remoteName,
    remoteUrl,
    provider: remote?.provider || state.provider || null,
    authMode: state.authMode,
    authConfigured: !!secret?.token,
    repoPrivate: state.repoPrivate,
    hasChanges: changedFiles.length > 0,
    changedFiles,
    canSync: reasons.length === 0,
    reasons,
    state: {
      ...state,
      provider: remote?.provider || state.provider,
      remoteUrl,
      repoOwner: remote?.owner || state.repoOwner,
      repoName: remote?.repo || state.repoName,
    },
  };

  if (status.hasChanges) {
    addNotification({
      type: 'git-sync',
      source: 'git-sync',
      title: '检测到 .openclaw 有未同步变更',
      message: `共有 ${status.changedFiles.length} 个文件发生变化，可执行一键提交并推送。`,
      severity: 'info',
      meta: { changedFiles: status.changedFiles.slice(0, 20) },
    });
  }

  return status;
}

export function getGitSyncStatus(): GitSyncStatus {
  return buildStatus();
}

export function initGitSync(): GitSyncActionResult {
  if (!ensureGitAvailable()) {
    return {
      success: false,
      message: '未检测到 git，可先安装 Git 再继续。',
      status: buildStatus(),
    };
  }

  if (!isRepoInitialized()) {
    const initResult = runGit(['-C', repoPath(), 'init']);
    if (!initResult.success) {
      return {
        success: false,
        message: `初始化 Git 仓库失败: ${initResult.error || initResult.stderr || initResult.stdout}`,
        status: buildStatus(),
        output: initResult.stderr || initResult.stdout,
      };
    }
  }

  const gitignorePath = ensureGitIgnore();
  addNotification({
    type: 'git-sync',
    source: 'git-sync',
    title: 'Git 同步仓库已初始化',
    message: `已准备 Git 仓库，并更新 ${gitignorePath}`,
    severity: 'success',
  });
  return {
    success: true,
    message: 'Git 同步仓库已初始化。',
    status: buildStatus(),
    output: gitignorePath,
  };
}

export function connectGitRemote(input: { provider?: GitProvider; remoteUrl: string; remoteName?: string }): GitSyncActionResult {
  const remote = parseGitRemote(input.remoteUrl);
  if (!remote) {
    return {
      success: false,
      message: '仅支持 GitHub/Gitee 的 HTTPS 或 SSH 仓库地址。',
      status: buildStatus(),
    };
  }

  if (input.provider && input.provider !== remote.provider) {
    return {
      success: false,
      message: '提供的 provider 与仓库地址不匹配。',
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
      message: `绑定远程仓库失败: ${result.error || result.stderr || result.stdout}`,
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
    title: '远程仓库绑定成功',
    message: remote.normalizedRemoteUrl,
    severity: 'success',
  });
  return {
    success: true,
    message: `已绑定远程仓库 ${remote.normalizedRemoteUrl}`,
    status: buildStatus(state),
  };
}

export function saveGitTokenAuth(input: { provider?: GitProvider; token: string; username?: string | null; authMode?: GitAuthMode }): GitSyncActionResult {
  const token = input.token.trim();
  if (!token) {
    return {
      success: false,
      message: 'Token 不能为空。',
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
  };
  saveState(next);
  addNotification({
    type: 'git-sync',
    source: 'git-sync',
    title: 'Git 认证已保存',
    message: '已保存 Git 凭据，可继续执行 private 校验和同步。',
    severity: 'success',
  });
  return {
    success: true,
    message: 'Git 认证已保存。',
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
      message: '请先完成远程仓库绑定和认证后再校验 private。',
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
      lastError: repoInfo.private ? null : '远程仓库不是 private',
    };
    saveState(next);
    const message = repoInfo.private
      ? '远程仓库已确认是 private，可执行同步。'
      : '远程仓库不是 private，Guard 已拒绝同步。';
    addNotification({
      type: 'git-sync',
      source: 'git-sync',
      title: repoInfo.private ? '私有仓校验通过' : '私有仓校验失败',
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
      title: '私有仓校验失败',
      message: next.lastError || '未知错误',
      severity: 'error',
    });
    return {
      success: false,
      message: `私有仓校验失败: ${next.lastError}`,
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
  if (!status.canSync) {
    return {
      success: false,
      message: `同步前检查未通过: ${status.reasons.join('；')}`,
      status,
    };
  }
  if (!status.hasChanges) {
    return {
      success: false,
      message: '当前没有可提交的变更。',
      status,
    };
  }

  const addResult = runGit(['-C', repoPath(), 'add', '-A']);
  if (!addResult.success) {
    return {
      success: false,
      message: `暂存文件失败: ${addResult.error || addResult.stderr || addResult.stdout}`,
      status,
      output: addResult.stderr || addResult.stdout,
    };
  }

  const commitResult = runGit(['-C', repoPath(), 'commit', '-m', message?.trim() || generateCommitMessage()]);
  if (!commitResult.success) {
    return {
      success: false,
      message: `提交失败: ${commitResult.error || commitResult.stderr || commitResult.stdout}`,
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
    title: '本地提交成功',
    message: commitResult.stdout.trim() || '已生成新的 Git 提交。',
    severity: 'success',
  });
  return {
    success: true,
    message: '本地提交成功。',
    status: buildStatus(next),
    output: commitResult.stdout.trim(),
  };
}

export function pushGitSync(): GitSyncActionResult {
  const status = getReadyStatus();
  if (!status.canSync) {
    return {
      success: false,
      message: `推送前检查未通过: ${status.reasons.join('；')}`,
      status,
    };
  }

  const secret = loadSecret();
  const remote = status.remoteUrl ? parseGitRemote(status.remoteUrl) : null;
  if (!secret?.token || !remote) {
    return {
      success: false,
      message: '推送前缺少远程仓库或认证信息。',
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
      title: '远程推送失败',
      message: next.lastError || '未知错误',
      severity: 'error',
    });
    return {
      success: false,
      message: `远程推送失败: ${next.lastError}`,
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
    title: '远程推送成功',
    message: pushResult.stdout.trim() || '已推送到远程 private 仓库。',
    severity: 'success',
  });
  return {
    success: true,
    message: '远程推送成功。',
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

  const stateValue = Math.random().toString(16).slice(2) + Date.now().toString(16);
  const callbackServer = http.createServer();

  const authResult = await new Promise<GitSyncActionResult>((resolve) => {
    const timeout = setTimeout(() => {
      callbackServer.close();
      resolve({
        success: false,
        message: 'OAuth 登录超时，请重试。',
        status: buildStatus(),
      });
    }, 180000);

    callbackServer.on('request', async (req, res) => {
      try {
        const requestUrl = new URL(req.url || '/', 'http://127.0.0.1');
        const code = requestUrl.searchParams.get('code');
        const returnedState = requestUrl.searchParams.get('state');
        if (!code || returnedState !== stateValue) {
          res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('OAuth 回调校验失败，请返回 Guard 重试。');
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
          throw new Error('OAuth 未返回 access_token');
        }

        const user = await fetchOAuthUser(options.provider, token);
        const saveResult = saveGitTokenAuth({
          provider: options.provider,
          token,
          username: user.username,
          authMode: 'oauth',
        });

        clearTimeout(timeout);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<html><body><h2>OpenClaw Guard 授权成功</h2><p>可以关闭这个窗口，回到 Guard 继续操作。</p></body></html>');
        callbackServer.close();
        resolve(saveResult);
      } catch (error) {
        clearTimeout(timeout);
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<html><body><h2>OpenClaw Guard 授权失败</h2><p>请回到 Guard 查看错误提示。</p></body></html>');
        callbackServer.close();
        resolve({
          success: false,
          message: error instanceof Error ? error.message : String(error),
          status: buildStatus(),
        });
      }
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
      if (options.openBrowser !== false) {
        openUrlInBrowser(authUrl);
      }
      addNotification({
        type: 'git-sync',
        source: 'git-sync',
        title: 'OAuth 授权已发起',
        message: `请在浏览器完成 ${options.provider} 授权。`,
        severity: 'info',
      });
    });
  });

  return authResult;
}


