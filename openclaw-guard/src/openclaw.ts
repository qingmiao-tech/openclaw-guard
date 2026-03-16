import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { detectPlatform, getHomeDir } from './platform.js';
import { ensureGuardLayout, readJsonFile, resolveUserPath, writeJsonFile } from './guard-state.js';
import { getPersistentCachedValue, invalidatePersistentCache } from './persistent-cache.js';
import { getRecoveryOverview, saveRecoveryPoint } from './recovery.js';

export type OpenClawTaskMode = 'install' | 'update' | 'rollback' | 'uninstall';
export type OpenClawTaskPhase = 'idle' | 'running' | 'completed' | 'error';
export type OpenClawDetectedSource = 'managed-prefix' | 'path' | 'npm-prefix' | 'none';
export type OpenClawInstallKind = 'package' | 'git' | 'unknown';
export type OpenClawUpdateStrategy = 'official-cli' | 'bootstrap' | 'git-direct' | 'package-remove' | 'manual';
export type OpenClawPackageManager = 'pnpm' | 'bun' | 'npm' | 'unknown';
export type OpenClawUpdateChannel = 'stable' | 'beta' | 'dev';
export type OpenClawHistoryKind = 'update' | 'rollback' | 'install' | 'repair' | 'uninstall';

export interface OpenClawDetectionOptions {
  managedPrefix?: string;
  bypassCache?: boolean;
}

export interface OpenClawActionRequest {
  channel?: OpenClawUpdateChannel;
  tag?: string;
  version?: string;
  historyId?: string;
  gitRef?: string;
  gitDate?: string;
  restart?: boolean;
  dryRun?: boolean;
}

export interface OpenClawTaskState {
  mode: OpenClawTaskMode | null;
  phase: OpenClawTaskPhase;
  pid: number | null;
  startedAt: string | null;
  finishedAt: string | null;
  lastUpdatedAt: string | null;
  message: string | null;
  error: string | null;
  logTail: string[];
}

export interface OpenClawStateSnapshot {
  version: string | null;
  tag: string | null;
  branch: string | null;
  sha: string | null;
  binaryPath: string | null;
  channel: string | null;
  root: string | null;
}

export interface OpenClawUpdateHistoryEntry {
  id: string;
  kind: OpenClawHistoryKind;
  strategy: OpenClawUpdateStrategy;
  installKind: OpenClawInstallKind;
  installRoot: string | null;
  binaryPath: string | null;
  requestedTarget: Record<string, unknown> | null;
  before: OpenClawStateSnapshot;
  after: OpenClawStateSnapshot;
  startedAt: string;
  finishedAt: string;
  success: boolean;
  error: string | null;
}

export interface OpenClawOfficialStatus {
  root: string | null;
  installKind: OpenClawInstallKind;
  packageManager: OpenClawPackageManager;
  latestVersion: string | null;
  updateAvailable: boolean;
  channel: OpenClawUpdateChannel | null;
  channelSource: string | null;
  channelLabel: string | null;
  git: { branch: string | null; tag: string | null; sha: string | null };
  availability: { available: boolean; latestVersion: string | null; hasGitUpdate: boolean; hasRegistryUpdate: boolean; gitBehind: number | null };
  raw: Record<string, unknown>;
}

export interface OpenClawTargetCatalog {
  installKind: OpenClawInstallKind;
  officialStatusAvailable: boolean;
  effectiveUpdater: OpenClawUpdateStrategy;
  channels: OpenClawUpdateChannel[];
  distTags: Record<string, string>;
  packageVersions: string[];
  quickRollbackTarget: { version?: string | null; historyId?: string | null; label: string } | null;
  recentGitTags: string[];
  supportsGitRefDate: boolean;
  history: OpenClawUpdateHistoryEntry[];
}

export interface OpenClawStatus {
  installed: boolean;
  version: string | null;
  latestVersion: string | null;
  updateAvailable: boolean;
  binPath: string | null;
  detectedSource: OpenClawDetectedSource;
  managedPrefix: string;
  managedBinDir: string;
  managedBinaryPath: string;
  nodeVersion: string;
  npmVersion: string | null;
  npmPrefix: string | null;
  installReady: boolean;
  installCommand: string;
  installBlockers: string[];
  installTargetBinDir: string | null;
  installTargetBinaryPath: string | null;
  platformNotes: string[];
  installKind: OpenClawInstallKind;
  packageManager: OpenClawPackageManager | null;
  updateChannel: OpenClawUpdateChannel | null;
  updateChannelSource: string | null;
  officialStatusAvailable: boolean;
  effectiveUpdater: OpenClawUpdateStrategy;
  quickRollbackAvailable: boolean;
  lastHistoryEntry: OpenClawUpdateHistoryEntry | null;
  updateRoot: string | null;
  officialStatus: OpenClawOfficialStatus | null;
  action: OpenClawTaskState;
}

export interface TaskProgress {
  stage: string;
  message: string;
  done: boolean;
  error?: string;
}

export interface OpenClawActionResult {
  success: boolean;
  scheduled?: boolean;
  message: string;
  status: OpenClawStatus;
  action: OpenClawTaskState;
}

interface OpenClawLocalState {
  installed: boolean;
  version: string | null;
  binPath: string | null;
  detectedSource: OpenClawDetectedSource;
  managedPrefix: string;
  managedBinDir: string;
  managedBinaryPath: string;
  nodeVersion: string;
  npmVersion: string | null;
  npmPrefix: string | null;
  installReady: boolean;
  installCommand: string;
  installBlockers: string[];
  installTargetBinDir: string | null;
  installTargetBinaryPath: string | null;
  platformNotes: string[];
}

interface CommandCaptureResult {
  success: boolean;
  status: number | null;
  stdout: string;
  stderr: string;
  error: string | null;
}

const OPENCLAW_LOCAL_CACHE_KEY = 'openclaw-status-local-v4';
const OPENCLAW_OFFICIAL_CACHE_KEY = 'openclaw-status-official-v2';
const OPENCLAW_REGISTRY_CACHE_KEY = 'openclaw-status-registry-v1';
const OPENCLAW_HISTORY_FILE = 'openclaw-update-history.json';
const DEFAULT_TASK_STATE: OpenClawTaskState = {
  mode: null,
  phase: 'idle',
  pid: null,
  startedAt: null,
  finishedAt: null,
  lastUpdatedAt: null,
  message: null,
  error: null,
  logTail: [],
};

function nowIso(): string {
  return new Date().toISOString();
}

function samePath(left: string | null | undefined, right: string | null | undefined): boolean {
  if (!left || !right) return false;
  const normalize = detectPlatform() === 'windows'
    ? (value: string) => path.resolve(value).toLowerCase()
    : (value: string) => path.resolve(value);
  return normalize(left) === normalize(right);
}

function normalizeString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function normalizeNumber(value: unknown): number | null {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeBoolean(value: unknown): boolean {
  return value === true;
}

function normalizeChannel(value: unknown): OpenClawUpdateChannel | null {
  return value === 'stable' || value === 'beta' || value === 'dev' ? value : null;
}

function normalizeInstallKind(value: unknown): OpenClawInstallKind {
  return value === 'package' || value === 'git' ? value : 'unknown';
}

function normalizePackageManager(value: unknown): OpenClawPackageManager {
  return value === 'pnpm' || value === 'bun' || value === 'npm' ? value : 'unknown';
}

function quoteForDisplay(value: string): string {
  return /\s/.test(value) ? `"${value}"` : value;
}

function prependPath(dirPath: string | null | undefined, originalPath: string | undefined): string | undefined {
  if (!dirPath) return originalPath;
  const separator = detectPlatform() === 'windows' ? ';' : ':';
  const currentPath = originalPath || '';
  const parts = currentPath.split(separator).filter(Boolean);
  const normalizedTarget = detectPlatform() === 'windows' ? path.resolve(dirPath).toLowerCase() : path.resolve(dirPath);
  const hasEntry = parts.some((item) => {
    const candidate = detectPlatform() === 'windows' ? path.resolve(item).toLowerCase() : path.resolve(item);
    return candidate === normalizedTarget;
  });
  return hasEntry ? currentPath : (currentPath ? `${dirPath}${separator}${currentPath}` : dirPath);
}

function parseJsonOutput(raw: string): Record<string, unknown> | null {
  const text = String(raw || '').trim();
  if (!text) return null;
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace === -1 || lastBrace <= firstBrace) return null;
    try {
      return JSON.parse(text.slice(firstBrace, lastBrace + 1)) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
}

function tailOutput(stdout: string, stderr: string): string[] {
  return `${stdout || ''}\n${stderr || ''}`.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).slice(-30);
}

export function getDefaultOpenClawManagedPrefix(): string {
  return path.join(getHomeDir(), '.openclaw', 'guard', 'npm-global');
}

export function resolveManagedPrefix(managedPrefix?: string | null): string {
  const fromEnv = process.env.OPENCLAW_GUARD_MANAGED_PREFIX?.trim();
  return resolveUserPath(managedPrefix?.trim() || fromEnv || getDefaultOpenClawManagedPrefix());
}

export function getOpenClawManagedBinDir(managedPrefix?: string | null): string {
  const resolvedPrefix = resolveManagedPrefix(managedPrefix);
  return detectPlatform() === 'windows' ? resolvedPrefix : path.join(resolvedPrefix, 'bin');
}

export function getOpenClawManagedBinaryPath(managedPrefix?: string | null): string {
  const resolvedPrefix = resolveManagedPrefix(managedPrefix);
  return detectPlatform() === 'windows' ? path.join(resolvedPrefix, 'openclaw.cmd') : path.join(resolvedPrefix, 'bin', 'openclaw');
}

export function getOpenClawInstallCommand(managedPrefix?: string | null): string {
  const resolvedPrefix = resolveManagedPrefix(managedPrefix);
  return `npm install -g openclaw@latest --prefix ${quoteForDisplay(resolvedPrefix)}`;
}

function getTaskStateFile(): string {
  return path.join(ensureGuardLayout().stateDir, 'openclaw-install.json');
}

function getHistoryFile(): string {
  return path.join(ensureGuardLayout().stateDir, OPENCLAW_HISTORY_FILE);
}

function getLocalCacheKey(managedPrefix?: string | null): string {
  return `${OPENCLAW_LOCAL_CACHE_KEY}:${resolveManagedPrefix(managedPrefix)}`;
}

function getOfficialCacheKey(localState: Pick<OpenClawLocalState, 'managedPrefix' | 'binPath'>): string {
  return `${OPENCLAW_OFFICIAL_CACHE_KEY}:${localState.managedPrefix}:${localState.binPath || 'none'}`;
}

function normalizeTaskState(input?: Partial<OpenClawTaskState> | null): OpenClawTaskState {
  const phase = input?.phase;
  return {
    mode: input?.mode === 'install' || input?.mode === 'update' || input?.mode === 'rollback' || input?.mode === 'uninstall' ? input.mode : null,
    phase: phase === 'running' || phase === 'completed' || phase === 'error' ? phase : 'idle',
    pid: typeof input?.pid === 'number' && Number.isInteger(input.pid) && input.pid > 0 ? input.pid : null,
    startedAt: typeof input?.startedAt === 'string' ? input.startedAt : null,
    finishedAt: typeof input?.finishedAt === 'string' ? input.finishedAt : null,
    lastUpdatedAt: typeof input?.lastUpdatedAt === 'string' ? input.lastUpdatedAt : null,
    message: typeof input?.message === 'string' && input.message.trim() ? input.message : null,
    error: typeof input?.error === 'string' && input.error.trim() ? input.error : null,
    logTail: Array.isArray(input?.logTail) ? input.logTail.map((item) => String(item)).filter(Boolean).slice(-30) : [],
  };
}

function loadTaskState(): OpenClawTaskState {
  return normalizeTaskState(readJsonFile<OpenClawTaskState | null>(getTaskStateFile(), DEFAULT_TASK_STATE));
}

function saveTaskState(next: Partial<OpenClawTaskState>): OpenClawTaskState {
  const merged = normalizeTaskState({ ...loadTaskState(), ...next, lastUpdatedAt: next.lastUpdatedAt || nowIso() });
  writeJsonFile(getTaskStateFile(), merged);
  return merged;
}

function loadHistoryEntries(): OpenClawUpdateHistoryEntry[] {
  const items = readJsonFile<OpenClawUpdateHistoryEntry[] | null>(getHistoryFile(), []);
  return Array.isArray(items) ? items.filter((item) => item && typeof item.id === 'string').slice(-200) : [];
}

function appendHistoryEntry(entry: OpenClawUpdateHistoryEntry): void {
  const items = loadHistoryEntries();
  items.push(entry);
  writeJsonFile(getHistoryFile(), items.slice(-200));
}

function isPidAlive(pid: number | null | undefined): boolean {
  if (!Number.isInteger(pid) || !pid || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function runTextCommand(command: string, args: string[], timeout = 10_000, extraEnv?: NodeJS.ProcessEnv, cwd?: string): string {
  const result = spawnSync(command, args, {
    stdio: 'pipe',
    encoding: 'utf-8',
    timeout,
    cwd,
    shell: process.platform === 'win32',
    windowsHide: true,
    env: extraEnv ? { ...process.env, ...extraEnv } : process.env,
  });
  if (result.error || result.status !== 0) {
    throw new Error(result.error?.message || result.stderr || result.stdout || `exit code ${result.status}`);
  }
  return String(result.stdout || '').trim();
}

function runCommandCapture(command: string, args: string[], timeout = 180_000, extraEnv?: NodeJS.ProcessEnv, cwd?: string): CommandCaptureResult {
  const result = spawnSync(command, args, {
    stdio: 'pipe',
    encoding: 'utf-8',
    timeout,
    cwd,
    shell: process.platform === 'win32',
    windowsHide: true,
    env: extraEnv ? { ...process.env, ...extraEnv } : process.env,
  });
  return {
    success: result.status === 0 && !result.error,
    status: result.status,
    stdout: String(result.stdout || ''),
    stderr: String(result.stderr || ''),
    error: result.error?.message || null,
  };
}

function getCommandLocator(): string {
  return detectPlatform() === 'windows' ? 'where' : 'which';
}

function getNpmPrefixFromVersion(npmVersion: string | null): string | null {
  if (!npmVersion) return null;
  try {
    return runTextCommand('npm', ['config', 'get', 'prefix'], 8_000) || null;
  } catch {
    return null;
  }
}

function buildExpectedBinaryPath(npmPrefix: string | null): string | null {
  if (!npmPrefix) return null;
  return detectPlatform() === 'windows' ? path.join(npmPrefix, 'openclaw.cmd') : path.join(npmPrefix, 'bin', 'openclaw');
}

function buildInstallNotes(options: { targetBinDir: string | null; managedPrefix: string; detectedSource: OpenClawDetectedSource }): string[] {
  const shared = [
    `Guard 默认把托管安装放到 ${options.managedPrefix}。`,
    options.targetBinDir ? `Guard 会优先把 ${options.targetBinDir} 注入当前进程 PATH。` : '安装完成后，Guard 会尝试自动刷新当前进程 PATH。',
  ];
  if (options.detectedSource === 'managed-prefix') shared.unshift('当前正在复用 Guard 托管前缀中的 OpenClaw 安装。');
  if (options.detectedSource === 'path') shared.unshift('当前正在复用 PATH 上已有的 OpenClaw 安装。');
  if (options.detectedSource === 'npm-prefix') shared.unshift('当前正在复用 npm 默认 prefix 中的 OpenClaw 安装。');
  if (detectPlatform() === 'windows') return ['Windows 下托管安装会把 openclaw.cmd 放到用户级 npm prefix 根目录。', ...shared, '如果系统终端仍提示找不到 openclaw，重新打开终端窗口后再试。'];
  if (detectPlatform() === 'macos') return ['macOS 下托管安装会把 CLI 放到用户目录下的 bin/openclaw。', ...shared, '如果你的 shell 仍旧找不到 openclaw，请重新打开终端或检查 npm prefix 是否已加入 PATH。'];
  return ['Linux 下托管安装会把 CLI 放到用户目录下的 bin/openclaw。', ...shared, '如果当前会话仍找不到 openclaw，请重新加载 shell 环境或确认 npm prefix 已加入 PATH。'];
}

function ensurePathContains(dirPath: string | null): void {
  if (!dirPath) return;
  process.env.PATH = prependPath(dirPath, process.env.PATH) || process.env.PATH;
}

function applyDiscoveredBinary(binaryPath: string | null): string | null {
  if (!binaryPath || !fs.existsSync(binaryPath)) return null;
  process.env.OPENCLAW_GUARD_OPENCLAW_BIN = binaryPath;
  ensurePathContains(path.dirname(binaryPath));
  return binaryPath;
}

function locateBinaryFromPath(): string | null {
  const explicit = process.env.OPENCLAW_GUARD_OPENCLAW_BIN?.trim();
  if (explicit && fs.existsSync(explicit)) return applyDiscoveredBinary(explicit);
  try {
    const located = runTextCommand(getCommandLocator(), ['openclaw'], 5_000).split(/\r?\n/).map((item) => item.trim()).find(Boolean) || null;
    return located && fs.existsSync(located) ? applyDiscoveredBinary(located) : null;
  } catch {
    return null;
  }
}

function discoverOpenClawBinary(managedPrefix: string, npmPrefix: string | null): { binPath: string | null; detectedSource: OpenClawDetectedSource } {
  const managedBinary = getOpenClawManagedBinaryPath(managedPrefix);
  if (fs.existsSync(managedBinary)) return { binPath: applyDiscoveredBinary(managedBinary), detectedSource: 'managed-prefix' };
  const npmExpected = buildExpectedBinaryPath(npmPrefix);
  const fromPath = locateBinaryFromPath();
  if (fromPath) return { binPath: applyDiscoveredBinary(fromPath), detectedSource: npmExpected && samePath(fromPath, npmExpected) ? 'npm-prefix' : 'path' };
  if (npmExpected && fs.existsSync(npmExpected)) return { binPath: applyDiscoveredBinary(npmExpected), detectedSource: 'npm-prefix' };
  return { binPath: null, detectedSource: 'none' };
}

function detectLocalOpenClawState(options: OpenClawDetectionOptions = {}): OpenClawLocalState {
  const managedPrefix = resolveManagedPrefix(options.managedPrefix);
  const managedBinaryPath = getOpenClawManagedBinaryPath(managedPrefix);
  const managedBinDir = getOpenClawManagedBinDir(managedPrefix);
  let npmVersion: string | null = null;
  try { npmVersion = runTextCommand('npm', ['--version'], 8_000); } catch {}
  const npmPrefix = getNpmPrefixFromVersion(npmVersion);
  const discovery = discoverOpenClawBinary(managedPrefix, npmPrefix);
  let installed = false;
  let version: string | null = null;
  let binPath: string | null = discovery.binPath;
  if (discovery.binPath) {
    try {
      const output = runTextCommand(discovery.binPath, ['--version'], 10_000, { OPENCLAW_GUARD_OPENCLAW_BIN: discovery.binPath });
      const match = output.match(/(\d+\.\d+\.\d+[\w.-]*)/);
      version = match ? match[1] : (output || null);
      installed = true;
      binPath = applyDiscoveredBinary(discovery.binPath);
    } catch {}
  }
  return {
    installed,
    version,
    binPath,
    detectedSource: discovery.detectedSource,
    managedPrefix,
    managedBinDir,
    managedBinaryPath,
    nodeVersion: process.version,
    npmVersion,
    npmPrefix,
    installReady: !!npmVersion,
    installCommand: getOpenClawInstallCommand(managedPrefix),
    installBlockers: npmVersion ? [] : ['未检测到 npm，当前环境无法通过 Guard 自动安装 OpenClaw。'],
    installTargetBinDir: managedBinDir,
    installTargetBinaryPath: managedBinaryPath,
    platformNotes: buildInstallNotes({ targetBinDir: managedBinDir, managedPrefix, detectedSource: discovery.detectedSource }),
  };
}

function detectLatestOpenClawVersion(): string | null {
  try {
    return runTextCommand('npm', ['view', 'openclaw', 'version'], 5_000) || null;
  } catch {
    return null;
  }
}

function buildOfficialCliEnv(localState: OpenClawLocalState): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env, PATH: prependPath(localState.managedBinDir, process.env.PATH) };
  if (localState.binPath) env.OPENCLAW_GUARD_OPENCLAW_BIN = localState.binPath;
  if (localState.detectedSource === 'managed-prefix') {
    env.NPM_CONFIG_PREFIX = localState.managedPrefix;
    env.npm_config_prefix = localState.managedPrefix;
  }
  return env;
}

function normalizeOfficialStatus(payload: Record<string, unknown>): OpenClawOfficialStatus {
  const update = (payload.update || {}) as Record<string, unknown>;
  const channel = (payload.channel || {}) as Record<string, unknown>;
  const availability = (payload.availability || {}) as Record<string, unknown>;
  const git = (update.git || {}) as Record<string, unknown>;
  return {
    root: normalizeString(update.root),
    installKind: normalizeInstallKind(update.installKind),
    packageManager: normalizePackageManager(update.packageManager),
    latestVersion: normalizeString(availability.latestVersion),
    updateAvailable: normalizeBoolean(availability.available),
    channel: normalizeChannel(channel.value),
    channelSource: normalizeString(channel.source),
    channelLabel: normalizeString(channel.label),
    git: { branch: normalizeString(git.branch), tag: normalizeString(git.tag), sha: normalizeString(git.sha) },
    availability: {
      available: normalizeBoolean(availability.available),
      latestVersion: normalizeString(availability.latestVersion),
      hasGitUpdate: normalizeBoolean(availability.hasGitUpdate),
      hasRegistryUpdate: normalizeBoolean(availability.hasRegistryUpdate),
      gitBehind: normalizeNumber(availability.gitBehind),
    },
    raw: payload,
  };
}

function isNodeModulesOpenClawRoot(root: string | null | undefined): boolean {
  if (!root) return false;
  return /[\\/]node_modules[\\/]openclaw$/i.test(path.resolve(root));
}

function isPathInsideRoot(candidatePath: string | null | undefined, rootPath: string | null | undefined): boolean {
  if (!candidatePath || !rootPath) return false;
  const normalizedCandidate = path.resolve(candidatePath).replace(/[\\/]+/g, '/').toLowerCase();
  const normalizedRoot = path.resolve(rootPath).replace(/[\\/]+/g, '/').toLowerCase();
  return normalizedCandidate === normalizedRoot || normalizedCandidate.startsWith(`${normalizedRoot}/`);
}

function inferInstallKind(localState: OpenClawLocalState, officialStatus: OpenClawOfficialStatus | null): OpenClawInstallKind {
  if (officialStatus?.installKind && officialStatus.installKind !== 'unknown') return officialStatus.installKind;
  if (isNodeModulesOpenClawRoot(officialStatus?.root)) return 'package';
  if (localState.detectedSource === 'managed-prefix' || localState.detectedSource === 'npm-prefix') return 'package';
  if (localState.detectedSource === 'path' && isPathInsideRoot(officialStatus?.root, localState.npmPrefix)) return 'package';
  return 'unknown';
}

function inferPackageManager(localState: OpenClawLocalState, officialStatus: OpenClawOfficialStatus | null): OpenClawPackageManager | null {
  if (officialStatus?.packageManager && officialStatus.packageManager !== 'unknown') return officialStatus.packageManager;
  if (localState.detectedSource === 'managed-prefix' || localState.detectedSource === 'npm-prefix') return 'npm';
  if (isNodeModulesOpenClawRoot(officialStatus?.root) && isPathInsideRoot(officialStatus?.root, localState.npmPrefix)) return 'npm';
  return null;
}

function readOfficialStatus(localState: OpenClawLocalState): OpenClawOfficialStatus | null {
  if (!localState.installed || !localState.binPath || !fs.existsSync(localState.binPath)) return null;
  const result = runCommandCapture(localState.binPath, ['update', 'status', '--json'], 30_000, buildOfficialCliEnv(localState), path.dirname(localState.binPath));
  if (!result.success) return null;
  const parsed = parseJsonOutput(result.stdout || result.stderr);
  return parsed ? normalizeOfficialStatus(parsed) : null;
}

function isHistoryRelevant(entry: OpenClawUpdateHistoryEntry, status: Pick<OpenClawStatus, 'updateRoot' | 'binPath' | 'managedBinaryPath'>): boolean {
  if (status.updateRoot && entry.installRoot && samePath(status.updateRoot, entry.installRoot)) return true;
  if (status.binPath && entry.binaryPath && samePath(status.binPath, entry.binaryPath)) return true;
  return !!(status.managedBinaryPath && entry.binaryPath && samePath(status.managedBinaryPath, entry.binaryPath));
}

function listRelevantHistory(status: Pick<OpenClawStatus, 'updateRoot' | 'binPath' | 'managedBinaryPath' | 'installKind'>): OpenClawUpdateHistoryEntry[] {
  return loadHistoryEntries().filter((entry) => isHistoryRelevant(entry, status)).sort((left, right) => Date.parse(right.finishedAt) - Date.parse(left.finishedAt));
}

function getQuickRollbackEntry(status: Pick<OpenClawStatus, 'installKind' | 'updateRoot' | 'binPath' | 'managedBinaryPath'>): OpenClawUpdateHistoryEntry | null {
  const items = listRelevantHistory(status);
  if (status.installKind === 'package') return items.find((item) => item.success && !!item.before.version) || null;
  if (status.installKind === 'git') return items.find((item) => item.success && !!(item.before.sha || item.before.tag)) || null;
  return null;
}

function resolveEffectiveUpdater(localState: OpenClawLocalState, officialStatus: OpenClawOfficialStatus | null): OpenClawUpdateStrategy {
  return officialStatus && localState.installed ? 'official-cli' : 'bootstrap';
}

export function getOpenClawTaskState(): OpenClawTaskState {
  const state = loadTaskState();
  if (state.phase === 'running' && state.pid && !isPidAlive(state.pid) && !state.finishedAt) {
    return saveTaskState({ ...state, phase: 'error', finishedAt: nowIso(), message: '后台 OpenClaw 任务已意外结束，请重新查看状态。', error: state.error || '后台 OpenClaw 进程已退出。' });
  }
  return state;
}

export function detectOpenClaw(options: OpenClawDetectionOptions = {}): OpenClawStatus {
  const managedPrefix = resolveManagedPrefix(options.managedPrefix);
  const localState = options.bypassCache ? detectLocalOpenClawState({ managedPrefix }) : getPersistentCachedValue(getLocalCacheKey(managedPrefix), {
    ttlMs: 15 * 60 * 1000,
    staleIfErrorMs: 7 * 24 * 60 * 60 * 1000,
    loader: () => detectLocalOpenClawState({ managedPrefix }),
  });
  const officialStatus = localState.installed ? (options.bypassCache ? readOfficialStatus(localState) : getPersistentCachedValue(getOfficialCacheKey(localState), {
    ttlMs: 5 * 60 * 1000,
    staleIfErrorMs: 12 * 60 * 60 * 1000,
    loader: () => readOfficialStatus(localState),
  })) : null;
  const latestVersion = officialStatus?.latestVersion || (options.bypassCache ? detectLatestOpenClawVersion() : getPersistentCachedValue(OPENCLAW_REGISTRY_CACHE_KEY, {
    ttlMs: 6 * 60 * 60 * 1000,
    staleIfErrorMs: 7 * 24 * 60 * 60 * 1000,
    loader: detectLatestOpenClawVersion,
  }));
  const mergedOfficialStatus = officialStatus ? {
    ...officialStatus,
    latestVersion: officialStatus.latestVersion || latestVersion || null,
    availability: {
      ...officialStatus.availability,
      latestVersion: officialStatus.availability?.latestVersion || latestVersion || null,
    },
  } : null;
  const updateAvailable = !!(localState.installed && localState.version && latestVersion && localState.version !== latestVersion)
    || !!mergedOfficialStatus?.updateAvailable;
  const inferredInstallKind = inferInstallKind(localState, mergedOfficialStatus);
  const inferredPackageManager = inferPackageManager(localState, mergedOfficialStatus);
  const baseStatus: OpenClawStatus = {
    ...localState,
    latestVersion,
    updateAvailable,
    installKind: inferredInstallKind,
    packageManager: inferredPackageManager,
    updateChannel: mergedOfficialStatus?.channel || null,
    updateChannelSource: mergedOfficialStatus?.channelSource || null,
    officialStatusAvailable: !!mergedOfficialStatus,
    effectiveUpdater: resolveEffectiveUpdater(localState, mergedOfficialStatus),
    quickRollbackAvailable: false,
    lastHistoryEntry: null,
    updateRoot: mergedOfficialStatus?.root || null,
    officialStatus: mergedOfficialStatus,
    action: getOpenClawTaskState(),
  };
  const history = listRelevantHistory(baseStatus);
  return { ...baseStatus, quickRollbackAvailable: !!getQuickRollbackEntry(baseStatus), lastHistoryEntry: history[0] || null };
}

function detectPackageDistTags(): Record<string, string> {
  try {
    const parsed = parseJsonOutput(runTextCommand('npm', ['view', 'openclaw', 'dist-tags', '--json'], 6_000));
    return parsed ? Object.entries(parsed).reduce<Record<string, string>>((acc, [key, value]) => (typeof value === 'string' ? { ...acc, [key]: value } : acc), {}) : {};
  } catch {
    return {};
  }
}

function detectPackageVersions(limit = 12): string[] {
  try {
    const parsed = JSON.parse(runTextCommand('npm', ['view', 'openclaw', 'versions', '--json'], 8_000)) as unknown;
    return Array.isArray(parsed) ? parsed.map((item) => String(item).trim()).filter(Boolean).slice(-limit).reverse() : [];
  } catch {
    return [];
  }
}

function detectRecentGitTags(root: string | null, limit = 12): string[] {
  if (!root) return [];
  const result = runCommandCapture('git', ['-C', root, 'tag', '--list', '--sort=-v:refname'], 12_000);
  return result.success ? result.stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).slice(0, limit) : [];
}

export function getOpenClawTargets(options: OpenClawDetectionOptions = {}): OpenClawTargetCatalog {
  const status = detectOpenClaw({ ...options, bypassCache: true });
  const quickRollbackEntry = getQuickRollbackEntry(status);
  return {
    installKind: status.installKind,
    officialStatusAvailable: status.officialStatusAvailable,
    effectiveUpdater: status.effectiveUpdater,
    channels: ['stable', 'beta', 'dev'],
    distTags: status.installKind === 'package' ? detectPackageDistTags() : {},
    packageVersions: status.installKind === 'package' ? detectPackageVersions(16) : [],
    quickRollbackTarget: quickRollbackEntry ? {
      version: quickRollbackEntry.before.version || null,
      historyId: quickRollbackEntry.id,
      label: quickRollbackEntry.before.version ? `上一版本 ${quickRollbackEntry.before.version}` : '最近一次可回退目标',
    } : null,
    recentGitTags: status.installKind === 'git' ? detectRecentGitTags(status.updateRoot, 16) : [],
    supportsGitRefDate: status.installKind === 'git',
    history: listRelevantHistory(status).slice(0, 20),
  };
}

export function getOpenClawCommand(options: OpenClawDetectionOptions = {}): string {
  const explicit = process.env.OPENCLAW_GUARD_OPENCLAW_BIN?.trim();
  if (explicit && fs.existsSync(explicit)) return explicit;
  return detectOpenClaw(options).binPath || 'openclaw';
}

export function getOpenClawBinPath(options: OpenClawDetectionOptions = {}): string | null {
  const command = getOpenClawCommand(options);
  return command === 'openclaw' ? null : command;
}

function buildRequestArgs(request: OpenClawActionRequest): string[] {
  const args: string[] = [];
  if (request.channel) args.push('--channel', request.channel);
  if (request.tag) args.push('--tag', request.tag);
  if (request.version) args.push('--version', request.version);
  if (request.historyId) args.push('--history-id', request.historyId);
  if (request.gitRef) args.push('--ref', request.gitRef);
  if (request.gitDate) args.push('--date', request.gitDate);
  if (request.restart === false) args.push('--no-restart');
  if (request.dryRun === true) args.push('--dry-run');
  return args;
}

function resolveTaskCommand(mode: OpenClawTaskMode, request: OpenClawActionRequest = {}, options: OpenClawDetectionOptions = {}): { command: string; args: string[]; cwd: string } | null {
  const modulePath = fileURLToPath(import.meta.url);
  const rootDir = path.resolve(path.dirname(modulePath), '..');
  const argvEntry = process.argv[1] ? path.resolve(process.argv[1]) : null;
  const distEntry = path.join(rootDir, 'dist', 'index.js');
  const srcEntry = path.join(rootDir, 'src', 'index.ts');
  const tsxCli = path.join(rootDir, 'node_modules', 'tsx', 'dist', 'cli.mjs');
  const forwardedArgs = ['openclaw-task', '--mode', mode, '--json', ...buildRequestArgs(request)];
  if (options.managedPrefix) forwardedArgs.push('--managed-prefix', resolveManagedPrefix(options.managedPrefix));
  if (argvEntry && argvEntry.endsWith('.ts') && fs.existsSync(tsxCli) && fs.existsSync(srcEntry)) return { command: process.execPath, args: [tsxCli, srcEntry, ...forwardedArgs], cwd: rootDir };
  if (argvEntry && argvEntry.endsWith('.js') && fs.existsSync(argvEntry)) return { command: process.execPath, args: [argvEntry, ...forwardedArgs], cwd: rootDir };
  if (fs.existsSync(distEntry)) return { command: process.execPath, args: [distEntry, ...forwardedArgs], cwd: rootDir };
  if (fs.existsSync(tsxCli) && fs.existsSync(srcEntry)) return { command: process.execPath, args: [tsxCli, srcEntry, ...forwardedArgs], cwd: rootDir };
  return null;
}

function snapshotFromStatus(status: Pick<OpenClawStatus, 'version' | 'binPath' | 'updateChannel' | 'updateRoot' | 'officialStatus'>): OpenClawStateSnapshot {
  return {
    version: status.version || null,
    tag: status.officialStatus?.git.tag || null,
    branch: status.officialStatus?.git.branch || null,
    sha: status.officialStatus?.git.sha || null,
    binaryPath: status.binPath || null,
    channel: status.updateChannel || null,
    root: status.updateRoot || null,
  };
}

function maybeCreateRecoveryCheckpoint(mode: OpenClawTaskMode): { created: boolean; message: string | null } {
  if (mode !== 'update' && mode !== 'rollback' && mode !== 'uninstall') return { created: false, message: null };
  try {
    const overview = getRecoveryOverview();
    if (!overview.repoReady) return { created: false, message: '备份与恢复尚未就绪，本次不会额外创建保护点。' };
    const label = mode === 'rollback'
      ? 'before OpenClaw rollback'
      : mode === 'uninstall'
        ? 'before OpenClaw uninstall'
        : 'before OpenClaw update';
    const result = saveRecoveryPoint(label);
    return { created: result.success && !!result.createdPoint, message: result.message };
  } catch (error) {
    return { created: false, message: error instanceof Error ? error.message : String(error) };
  }
}

function clearDiscoveredBinary(binaryPath?: string | null): void {
  const current = process.env.OPENCLAW_GUARD_OPENCLAW_BIN?.trim();
  if (!current) return;
  if (!binaryPath || samePath(current, binaryPath)) {
    delete process.env.OPENCLAW_GUARD_OPENCLAW_BIN;
  }
}

function resolvePackageManagerForRoot(root: string): OpenClawPackageManager {
  if (fs.existsSync(path.join(root, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(root, 'bun.lockb'))) return 'bun';
  return 'npm';
}

function getPackageInstallArgs(manager: OpenClawPackageManager): string[] {
  if (manager === 'pnpm') return ['pnpm', 'install'];
  if (manager === 'bun') return ['bun', 'install'];
  return ['npm', 'install'];
}

function getPackageRunArgs(manager: OpenClawPackageManager, script: string): string[] {
  if (manager === 'pnpm') return ['pnpm', script];
  if (manager === 'bun') return ['bun', 'run', script];
  return ['npm', 'run', script];
}

function runBootstrapInstall(mode: OpenClawTaskMode, localState: OpenClawLocalState, request: OpenClawActionRequest): { success: boolean; message: string; error?: string | null; logTail: string[] } {
  if (!localState.installReady) return { success: false, message: localState.installBlockers[0] || '当前环境不满足安装条件。', error: localState.installBlockers.join(' | '), logTail: [] };
  if (mode === 'rollback' || mode === 'uninstall') {
    return {
      success: false,
      message: mode === 'rollback'
        ? '当前无法直接执行版本回退，请先修复安装或改用源码检出方式。'
        : '当前无法通过 Guard 托管安装链路直接执行卸载，请先切换到已识别的安装来源。',
      error: mode === 'rollback'
        ? 'Rollback requires an available official CLI or a git checkout.'
        : 'Uninstall requires an installed package or a managed Guard prefix.',
      logTail: [],
    };
  }
  const packageSpec = request.version || request.tag ? `openclaw@${request.version || request.tag}` : 'openclaw@latest';
  const result = runCommandCapture('npm', ['install', '-g', packageSpec, '--prefix', localState.managedPrefix], 240_000, {
    OPENCLAW_GUARD_MANAGED_PREFIX: localState.managedPrefix,
    NPM_CONFIG_PREFIX: localState.managedPrefix,
    npm_config_prefix: localState.managedPrefix,
  });
  return {
    success: result.success,
    message: result.success ? (mode === 'install' ? 'Guard 已把 OpenClaw 安装到托管目录。' : 'Guard 已把 OpenClaw 修复到托管目录。') : `OpenClaw ${mode === 'install' ? '安装' : '修复'}失败。`,
    error: result.success ? null : (result.error || result.stderr || result.stdout || 'Unknown bootstrap error.'),
    logTail: tailOutput(result.stdout, result.stderr),
  };
}

function resolvePackageRollbackVersion(status: OpenClawStatus, request: OpenClawActionRequest): string | null {
  if (request.version) return request.version;
  if (request.tag) return request.tag;
  const items = listRelevantHistory(status);
  if (request.historyId) return items.find((item) => item.id === request.historyId)?.before.version || null;
  return items.find((item) => item.success && !!item.before.version)?.before.version || null;
}

function getPackageManagerFallbackCommand(manager: OpenClawPackageManager, packageSpec: string, localState: OpenClawLocalState, beforeStatus: OpenClawStatus): { command: string; args: string[]; env?: NodeJS.ProcessEnv } | null {
  if (manager === 'pnpm') {
    return { command: 'pnpm', args: ['add', '-g', packageSpec] };
  }
  if (manager === 'bun') {
    return { command: 'bun', args: ['add', '-g', packageSpec] };
  }
  if (manager === 'npm') {
    const prefix = localState.detectedSource === 'managed-prefix'
      ? localState.managedPrefix
      : beforeStatus.npmPrefix || null;
    const env = prefix
      ? { NPM_CONFIG_PREFIX: prefix, npm_config_prefix: prefix }
      : undefined;
    const args = ['install', '-g', packageSpec];
    if (prefix) args.push('--prefix', prefix);
    return { command: 'npm', args, env };
  }
  return null;
}

function shouldFallbackToPackageManager(mode: OpenClawTaskMode, result: CommandCaptureResult): boolean {
  if (mode !== 'update' && mode !== 'rollback') return false;
  const payload = parseJsonOutput(result.stdout || result.stderr);
  const status = normalizeString(payload?.status);
  const reason = normalizeString(payload?.reason);
  if (status === 'skipped' && reason === 'not-git-install') return true;
  const text = `${result.stdout}\n${result.stderr}`.toLowerCase();
  return text.includes("package manager couldn't be detected")
    || text.includes('package manager could not be detected')
    || text.includes('not-git-install');
}

function runPackageManagerFallbackAction(mode: OpenClawTaskMode, localState: OpenClawLocalState, request: OpenClawActionRequest, beforeStatus: OpenClawStatus): { success: boolean; message: string; error?: string | null; logTail: string[] } | null {
  const manager = beforeStatus.packageManager || inferPackageManager(localState, beforeStatus.officialStatus);
  if (!manager) return null;
  if (mode === 'update' && request.channel) return null;
  const packageSpec = mode === 'rollback'
    ? (() => {
        const version = resolvePackageRollbackVersion(beforeStatus, request);
        return version ? `openclaw@${version}` : null;
      })()
    : `openclaw@${request.tag || request.version || 'latest'}`;
  if (!packageSpec) {
    return {
      success: false,
      message: '当前没有可用于回退的目标版本。',
      error: 'No package rollback target available for fallback update.',
      logTail: [],
    };
  }
  const commandSpec = getPackageManagerFallbackCommand(manager, packageSpec, localState, beforeStatus);
  if (!commandSpec) return null;
  const result = runCommandCapture(commandSpec.command, commandSpec.args, 20 * 60_000, commandSpec.env);
  return {
    success: result.success,
    message: result.success
      ? (mode === 'rollback'
        ? '官方更新器未识别包管理器，Guard 已回退到原全局安装方式完成版本恢复。'
        : '官方更新器未识别包管理器，Guard 已回退到原全局安装方式完成更新。')
      : `OpenClaw ${mode === 'rollback' ? '回退' : '更新'}失败。`,
    error: result.success ? null : (result.error || result.stderr || result.stdout || 'Package manager fallback failed.'),
    logTail: tailOutput(result.stdout, result.stderr),
  };
}

function runOfficialCliAction(mode: OpenClawTaskMode, localState: OpenClawLocalState, request: OpenClawActionRequest, beforeStatus: OpenClawStatus): { success: boolean; message: string; error?: string | null; logTail: string[] } {
  if (!localState.binPath) return { success: false, message: '未定位到可执行的 OpenClaw CLI。', error: 'OpenClaw binary path is unavailable.', logTail: [] };
  if (mode === 'uninstall') {
    return { success: false, message: '官方更新 CLI 当前不负责卸载，请改走 Guard 的卸载流程。', error: 'Official CLI uninstall is not available.', logTail: [] };
  }
  const args = ['update', '--json'];
  if (request.restart === false) args.push('--no-restart');
  if (request.dryRun) args.push('--dry-run');
  if (mode === 'rollback') {
    const version = resolvePackageRollbackVersion(beforeStatus, request);
    if (!version) return { success: false, message: '当前没有可用的上一版本记录，请先完成一次通过 Guard 发起的更新。', error: 'No package rollback target available.', logTail: [] };
    args.push('--tag', version, '--yes');
  } else {
    if (request.channel) args.push('--channel', request.channel);
    if (request.tag) args.push('--tag', request.tag);
  }
  const result = runCommandCapture(localState.binPath, args, 20 * 60_000, buildOfficialCliEnv(localState), beforeStatus.updateRoot || path.dirname(localState.binPath));
  if (shouldFallbackToPackageManager(mode, result)) {
    const fallback = runPackageManagerFallbackAction(mode, localState, request, beforeStatus);
    if (fallback) {
      const officialTail = tailOutput(result.stdout, result.stderr);
      return {
        ...fallback,
        logTail: [...officialTail, ...fallback.logTail].slice(-30),
      };
    }
  }
  return {
    success: result.success,
    message: result.success
      ? (request.dryRun
        ? (mode === 'rollback' ? '已生成 OpenClaw 回退预演。' : '已生成 OpenClaw 更新预演。')
        : (mode === 'rollback' ? '已按原安装来源完成 OpenClaw 回退。' : '已按原安装来源完成 OpenClaw 更新。'))
      : `OpenClaw ${mode === 'rollback' ? '回退' : '更新'}失败。`,
    error: result.success ? null : (result.error || result.stderr || result.stdout || 'Official CLI update failed.'),
    logTail: tailOutput(result.stdout, result.stderr),
  };
}

function runGitDirectRollback(request: OpenClawActionRequest, beforeStatus: OpenClawStatus): { success: boolean; message: string; error?: string | null; logTail: string[] } {
  const root = beforeStatus.updateRoot;
  if (!root) return { success: false, message: '当前未识别到 OpenClaw 源码检出目录，无法执行高级 Git 回退。', error: 'Git install root is unavailable.', logTail: [] };
  const lines: string[] = [];
  const runStep = (command: string, args: string[], timeout = 20 * 60_000): CommandCaptureResult => {
    const result = runCommandCapture(command, args, timeout, undefined, root);
    lines.push(`${result.success ? 'OK' : 'ERR'} ${[command, ...args].join(' ')}`);
    tailOutput(result.stdout, result.stderr).forEach((line) => lines.push(line));
    return result;
  };
  const fetchResult = runStep('git', ['-C', root, 'fetch', '--all', '--prune', '--tags'], 120_000);
  if (!fetchResult.success) return { success: false, message: '无法获取最新 Git 标签与引用，源码回退已中止。', error: fetchResult.error || fetchResult.stderr || fetchResult.stdout, logTail: lines.slice(-30) };
  const dirtyResult = runStep('git', ['-C', root, 'status', '--porcelain', '--', ':!dist/control-ui/'], 20_000);
  if (!dirtyResult.success) return { success: false, message: '无法确认当前源码工作区状态，源码回退已中止。', error: dirtyResult.error || dirtyResult.stderr || dirtyResult.stdout, logTail: lines.slice(-30) };
  if (dirtyResult.stdout.trim()) return { success: false, message: '当前源码工作区存在未提交改动，请先清理后再执行高级 Git 回退。', error: 'Git worktree is dirty.', logTail: lines.slice(-30) };
  let targetRef = request.gitRef || null;
  if (!targetRef && request.historyId) {
    const matched = listRelevantHistory(beforeStatus).find((item) => item.id === request.historyId);
    targetRef = matched?.before.sha || matched?.before.tag || null;
  }
  if (!targetRef && request.gitDate) {
    const dateResult = runStep('git', ['-C', root, 'rev-list', '-n', '1', `--before=${request.gitDate}`, '--all'], 20_000);
    if (!dateResult.success || !dateResult.stdout.trim()) return { success: false, message: '没有找到对应日期之前的提交，源码回退已中止。', error: dateResult.error || dateResult.stderr || dateResult.stdout || 'No commit found before the requested date.', logTail: lines.slice(-30) };
    targetRef = dateResult.stdout.trim();
  }
  if (!targetRef) return { success: false, message: '请提供要回退的 Git 标签、引用、历史记录或日期。', error: 'gitRef, gitDate, or historyId is required for git rollback.', logTail: lines.slice(-30) };
  if (request.dryRun) return { success: true, message: `已生成源码回退预演，目标为 ${targetRef}。`, logTail: lines.slice(-30) };
  const checkoutResult = runStep('git', ['-C', root, 'checkout', '--detach', targetRef], 60_000);
  if (!checkoutResult.success) return { success: false, message: 'Git checkout 失败，源码回退已中止。', error: checkoutResult.error || checkoutResult.stderr || checkoutResult.stdout, logTail: lines.slice(-30) };
  const manager = resolvePackageManagerForRoot(root);
  const installArgs = getPackageInstallArgs(manager);
  const installResult = runStep(installArgs[0], installArgs.slice(1), 20 * 60_000);
  if (!installResult.success) return { success: false, message: '依赖安装失败，源码回退已中止。', error: installResult.error || installResult.stderr || installResult.stdout, logTail: lines.slice(-30) };
  const buildArgs = getPackageRunArgs(manager, 'build');
  const buildResult = runStep(buildArgs[0], buildArgs.slice(1), 20 * 60_000);
  if (!buildResult.success) return { success: false, message: '项目构建失败，源码回退已中止。', error: buildResult.error || buildResult.stderr || buildResult.stdout, logTail: lines.slice(-30) };
  const uiBuildArgs = getPackageRunArgs(manager, 'ui:build');
  const uiBuildResult = runStep(uiBuildArgs[0], uiBuildArgs.slice(1), 20 * 60_000);
  if (!uiBuildResult.success) return { success: false, message: 'UI 构建失败，源码回退已中止。', error: uiBuildResult.error || uiBuildResult.stderr || uiBuildResult.stdout, logTail: lines.slice(-30) };
  const doctorEntry = path.join(root, 'openclaw.mjs');
  if (!fs.existsSync(doctorEntry)) return { success: false, message: '未找到 openclaw.mjs，无法执行 doctor 校验。', error: `Missing ${doctorEntry}`, logTail: lines.slice(-30) };
  const doctorResult = runStep(process.execPath, [doctorEntry, 'doctor', '--non-interactive', '--fix'], 20 * 60_000);
  if (!doctorResult.success) return { success: false, message: 'doctor 校验失败，源码回退已中止。', error: doctorResult.error || doctorResult.stderr || doctorResult.stdout, logTail: lines.slice(-30) };
  if (request.restart !== false) {
    const restartResult = runStep(process.execPath, [doctorEntry, 'gateway', 'restart'], 120_000);
    if (!restartResult.success) return { success: false, message: '源码已回退，但网关重启失败，请手动重启 OpenClaw Gateway。', error: restartResult.error || restartResult.stderr || restartResult.stdout, logTail: lines.slice(-30) };
  }
  return { success: true, message: `已回退到源码引用 ${targetRef}，当前可能处于 detached HEAD 状态。`, logTail: lines.slice(-30) };
}

function appendStepLog(lines: string[], command: string, args: string[], result: CommandCaptureResult): void {
  lines.push(`${result.success ? 'OK' : 'ERR'} ${[command, ...args].join(' ')}`);
  tailOutput(result.stdout, result.stderr).forEach((line) => lines.push(line));
}

function stopGatewayBeforeUninstall(localState: OpenClawLocalState, request: OpenClawActionRequest, lines: string[]): void {
  if (!localState.binPath || !fs.existsSync(localState.binPath)) return;
  if (request.dryRun) {
    lines.push(`DRY ${[localState.binPath, 'gateway', 'stop'].join(' ')}`);
    return;
  }
  const stopResult = runCommandCapture(localState.binPath, ['gateway', 'stop'], 45_000, buildOfficialCliEnv(localState), path.dirname(localState.binPath));
  appendStepLog(lines, localState.binPath, ['gateway', 'stop'], stopResult);
  if (stopResult.success) return;
  const forceResult = runCommandCapture(localState.binPath, ['gateway', 'stop', '--force'], 45_000, buildOfficialCliEnv(localState), path.dirname(localState.binPath));
  appendStepLog(lines, localState.binPath, ['gateway', 'stop', '--force'], forceResult);
}

function addCandidatePath(targets: Set<string>, value?: string | null): void {
  if (!value) return;
  targets.add(path.resolve(value));
}

function addShimCandidates(targets: Set<string>, binDir?: string | null): void {
  if (!binDir) return;
  addCandidatePath(targets, path.join(binDir, 'openclaw'));
  addCandidatePath(targets, path.join(binDir, 'openclaw.cmd'));
  addCandidatePath(targets, path.join(binDir, 'openclaw.ps1'));
}

function isSafePackageRoot(rootPath: string | null | undefined): boolean {
  if (!rootPath) return false;
  const normalized = path.resolve(rootPath).replace(/\\/g, '/');
  return /\/node_modules\/openclaw$/i.test(normalized);
}

function collectPackageRemovalTargets(localState: OpenClawLocalState, beforeStatus: OpenClawStatus): { directories: string[]; files: string[] } {
  const directories = new Set<string>();
  const files = new Set<string>();
  const includeManagedTargets = beforeStatus.detectedSource === 'managed-prefix' || localState.detectedSource === 'managed-prefix';

  if (isSafePackageRoot(beforeStatus.updateRoot)) addCandidatePath(directories, beforeStatus.updateRoot);
  addCandidatePath(files, localState.binPath);
  addShimCandidates(files, localState.binPath ? path.dirname(localState.binPath) : null);

  if (beforeStatus.npmPrefix) {
    const prefixBinDir = detectPlatform() === 'windows' ? beforeStatus.npmPrefix : path.join(beforeStatus.npmPrefix, 'bin');
    addShimCandidates(files, prefixBinDir);
    addCandidatePath(directories, path.join(beforeStatus.npmPrefix, 'node_modules', 'openclaw'));
    addCandidatePath(directories, path.join(beforeStatus.npmPrefix, 'lib', 'node_modules', 'openclaw'));
  }

  if (includeManagedTargets) {
    addShimCandidates(files, localState.managedBinDir);
    addCandidatePath(directories, path.join(localState.managedPrefix, 'node_modules', 'openclaw'));
    addCandidatePath(directories, path.join(localState.managedPrefix, 'lib', 'node_modules', 'openclaw'));
  }

  return {
    directories: Array.from(directories).filter((item) => isSafePackageRoot(item)),
    files: Array.from(files),
  };
}

function removeDirectoryIfExists(dirPath: string, lines: string[]): void {
  if (!fs.existsSync(dirPath)) return;
  fs.rmSync(dirPath, { recursive: true, force: true });
  lines.push(`OK remove ${dirPath}`);
}

function removeFileIfExists(filePath: string, lines: string[]): void {
  if (!fs.existsSync(filePath)) return;
  fs.rmSync(filePath, { force: true });
  lines.push(`OK remove ${filePath}`);
}

function runManagedPrefixUninstall(localState: OpenClawLocalState, request: OpenClawActionRequest): { success: boolean; message: string; error?: string | null; logTail: string[] } {
  const lines: string[] = [];
  stopGatewayBeforeUninstall(localState, request, lines);
  const commandArgs = ['uninstall', '-g', 'openclaw', '--prefix', localState.managedPrefix];
  if (request.dryRun) {
    lines.push(`DRY npm ${commandArgs.join(' ')}`);
    lines.push(`DRY remove ${localState.managedPrefix}`);
    return { success: true, message: '已生成 Guard 托管安装卸载预演。', logTail: lines.slice(-30) };
  }

  const uninstallResult = runCommandCapture('npm', commandArgs, 240_000, {
    OPENCLAW_GUARD_MANAGED_PREFIX: localState.managedPrefix,
    NPM_CONFIG_PREFIX: localState.managedPrefix,
    npm_config_prefix: localState.managedPrefix,
  });
  appendStepLog(lines, 'npm', commandArgs, uninstallResult);
  if (!uninstallResult.success && fs.existsSync(localState.managedPrefix)) {
    lines.push('WARN npm uninstall failed; falling back to removing the managed prefix directly.');
  }

  try {
    removeDirectoryIfExists(localState.managedPrefix, lines);
    clearDiscoveredBinary(localState.binPath);
    return {
      success: true,
      message: '已移除 Guard 托管目录中的 OpenClaw 程序文件。',
      logTail: lines.slice(-30),
    };
  } catch (error) {
    return {
      success: false,
      message: 'Guard 托管目录卸载失败。',
      error: error instanceof Error ? error.message : String(error),
      logTail: lines.slice(-30),
    };
  }
}

function runManualPackageUninstall(localState: OpenClawLocalState, beforeStatus: OpenClawStatus, request: OpenClawActionRequest): { success: boolean; message: string; error?: string | null; logTail: string[] } {
  const lines: string[] = [];
  stopGatewayBeforeUninstall(localState, request, lines);
  const targets = collectPackageRemovalTargets(localState, beforeStatus);
  if (!targets.directories.length && !targets.files.length) {
    return {
      success: false,
      message: '当前安装来源无法安全自动卸载，请按原安装方式手动移除 OpenClaw。',
      error: 'No safe uninstall targets were derived from the current installation.',
      logTail: lines.slice(-30),
    };
  }
  if (request.dryRun) {
    targets.directories.forEach((item) => lines.push(`DRY remove ${item}`));
    targets.files.forEach((item) => lines.push(`DRY remove ${item}`));
    return { success: true, message: '已生成 OpenClaw 卸载预演。', logTail: lines.slice(-30) };
  }
  try {
    targets.directories.forEach((item) => removeDirectoryIfExists(item, lines));
    targets.files.forEach((item) => removeFileIfExists(item, lines));
    clearDiscoveredBinary(localState.binPath);
    return {
      success: true,
      message: '已移除当前安装来源里的 OpenClaw 程序文件。',
      logTail: lines.slice(-30),
    };
  } catch (error) {
    return {
      success: false,
      message: 'OpenClaw 卸载失败。',
      error: error instanceof Error ? error.message : String(error),
      logTail: lines.slice(-30),
    };
  }
}

function runOpenClawUninstall(request: OpenClawActionRequest, beforeStatus: OpenClawStatus, localState: OpenClawLocalState): { success: boolean; message: string; error?: string | null; logTail: string[] } {
  if (!beforeStatus.installed) {
    return {
      success: true,
      message: request.dryRun ? '当前没有检测到 OpenClaw，卸载预演已跳过。' : '当前没有检测到 OpenClaw，无需继续卸载。',
      logTail: [],
    };
  }
  if (localState.detectedSource === 'managed-prefix') {
    return runManagedPrefixUninstall(localState, request);
  }
  if (beforeStatus.installKind === 'package') {
    return runManualPackageUninstall(localState, beforeStatus, request);
  }
  if (beforeStatus.installKind === 'git') {
    const lines: string[] = [];
    stopGatewayBeforeUninstall(localState, request, lines);
    return {
      success: false,
      message: '当前 OpenClaw 来自源码检出。Guard 不会自动删除你的源码仓库，请先停用相关服务后手动删除仓库目录。',
      error: 'Source-checkout uninstall requires manual repository removal.',
      logTail: lines.slice(-30),
    };
  }
  return {
    success: false,
    message: '当前安装来源无法安全识别，Guard 不会盲删文件。请按原安装方式手动卸载。',
    error: 'Unsupported uninstall source.',
    logTail: [],
  };
}

function createHistoryEntry(params: { mode: OpenClawTaskMode; strategy: OpenClawUpdateStrategy; beforeStatus: OpenClawStatus; afterStatus: OpenClawStatus; request: OpenClawActionRequest; startedAt: string; finishedAt: string; success: boolean; error?: string | null }): OpenClawUpdateHistoryEntry {
  const kind: OpenClawHistoryKind = params.mode === 'rollback'
    ? 'rollback'
    : params.mode === 'install'
      ? (params.beforeStatus.installed ? 'repair' : 'install')
      : params.mode === 'uninstall'
        ? 'uninstall'
        : 'update';
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    kind,
    strategy: params.strategy,
    installKind: params.afterStatus.installKind || params.beforeStatus.installKind,
    installRoot: params.afterStatus.updateRoot || params.beforeStatus.updateRoot || null,
    binaryPath: params.afterStatus.binPath || params.beforeStatus.binPath || null,
    requestedTarget: { ...params.request },
    before: snapshotFromStatus(params.beforeStatus),
    after: snapshotFromStatus(params.afterStatus),
    startedAt: params.startedAt,
    finishedAt: params.finishedAt,
    success: params.success,
    error: params.error || null,
  };
}

function buildFinalMessage(mode: OpenClawTaskMode, success: boolean, directMessage: string, afterStatus: OpenClawStatus, checkpoint: { created: boolean }, request: OpenClawActionRequest): string {
  if (!success) return directMessage;
  const suffix = checkpoint.created ? ' 已自动创建恢复点。' : '';
  if (request.dryRun) return `${directMessage}${suffix}`.trim();
  if (mode === 'rollback') return `OpenClaw 回退完成，当前版本 ${afterStatus.version || '-'}。${suffix}`.trim();
  if (mode === 'install') return `OpenClaw 已安装完成，当前版本 ${afterStatus.version || '-'}。${suffix}`.trim();
  if (mode === 'uninstall') return `OpenClaw 已卸载完成。${suffix}`.trim();
  return `OpenClaw 更新完成，当前版本 ${afterStatus.version || '-'}。${suffix}`.trim();
}

function runOpenClawAction(mode: OpenClawTaskMode, request: OpenClawActionRequest, options: OpenClawDetectionOptions, startedAt: string): { success: boolean; message: string; error?: string | null; logTail: string[] } {
  const beforeStatus = detectOpenClaw({ ...options, bypassCache: true });
  const localState = detectLocalOpenClawState({ managedPrefix: options.managedPrefix });
  const checkpoint = maybeCreateRecoveryCheckpoint(mode);
  const strategy: OpenClawUpdateStrategy = mode === 'uninstall'
    ? (localState.detectedSource === 'managed-prefix' || beforeStatus.installKind === 'package' ? 'package-remove' : 'manual')
    : mode === 'rollback' && beforeStatus.installKind === 'git'
      ? 'git-direct'
      : ((mode === 'update' || mode === 'rollback') && beforeStatus.officialStatusAvailable && beforeStatus.installed ? 'official-cli' : 'bootstrap');
  const result = mode === 'uninstall'
    ? runOpenClawUninstall(request, beforeStatus, localState)
    : strategy === 'git-direct'
      ? runGitDirectRollback(request, beforeStatus)
      : strategy === 'official-cli'
        ? runOfficialCliAction(mode, localState, request, beforeStatus)
        : runBootstrapInstall(mode, localState, request);
  invalidatePersistentCache(getOfficialCacheKey(localState));
  invalidatePersistentCache(getLocalCacheKey(localState.managedPrefix));
  invalidatePersistentCache(OPENCLAW_REGISTRY_CACHE_KEY);
  const afterStatus = detectOpenClaw({ ...options, bypassCache: true });
  if (mode === 'uninstall' && result.success && !request.dryRun && afterStatus.installed) {
    return {
      success: false,
      message: '卸载动作已执行，但系统里仍检测到另一份 OpenClaw 安装，请按当前来源继续清理。',
      error: afterStatus.binPath ? `OpenClaw is still detected at ${afterStatus.binPath}` : 'OpenClaw is still detected after uninstall.',
      logTail: result.logTail,
    };
  }
  if (!request.dryRun) appendHistoryEntry(createHistoryEntry({ mode, strategy, beforeStatus, afterStatus, request, startedAt, finishedAt: nowIso(), success: result.success, error: result.error || null }));
  return { success: result.success, message: buildFinalMessage(mode, result.success, result.message, afterStatus, checkpoint, request), error: result.error || null, logTail: result.logTail };
}

export function scheduleOpenClawTask(mode: OpenClawTaskMode, request: OpenClawActionRequest = {}, options: OpenClawDetectionOptions = {}): OpenClawActionResult {
  const task = getOpenClawTaskState();
  if (task.phase === 'running' && task.pid && isPidAlive(task.pid)) {
    return { success: false, scheduled: false, message: '当前已有 OpenClaw 任务正在执行，请稍后再试。', status: detectOpenClaw(options), action: task };
  }
  const status = detectOpenClaw(options);
  if (!status.installReady && mode === 'install') {
    const failed = saveTaskState({ mode, phase: 'error', pid: null, startedAt: null, finishedAt: nowIso(), message: status.installBlockers[0] || '当前环境不满足 OpenClaw 安装条件。', error: status.installBlockers.join(' | '), logTail: [] });
    return { success: false, scheduled: false, message: failed.message || '当前环境不满足 OpenClaw 安装条件。', status: detectOpenClaw(options), action: failed };
  }
  const command = resolveTaskCommand(mode, request, options);
  if (!command) {
    const failed = saveTaskState({ mode, phase: 'error', pid: null, startedAt: null, finishedAt: nowIso(), message: '无法解析 OpenClaw 后台任务入口。', error: 'Unable to resolve OpenClaw task command.', logTail: [] });
    return { success: false, scheduled: false, message: failed.message || '无法解析 OpenClaw 后台任务入口。', status: detectOpenClaw(options), action: failed };
  }
  try {
    const child = spawn(command.command, command.args, {
      cwd: command.cwd,
      detached: true,
      stdio: 'ignore',
      windowsHide: true,
      env: { ...process.env, OPENCLAW_GUARD_OPENCLAW_CHILD: '1', ...(options.managedPrefix ? { OPENCLAW_GUARD_MANAGED_PREFIX: resolveManagedPrefix(options.managedPrefix) } : {}) },
    });
    child.unref();
    const running = saveTaskState({ mode, phase: 'running', pid: typeof child.pid === 'number' ? child.pid : null, startedAt: nowIso(), finishedAt: null, message: `已在后台发起 OpenClaw ${mode === 'install' ? '安装' : mode === 'update' ? '更新' : mode === 'rollback' ? '回退' : '卸载'}。`, error: null, logTail: [] });
    invalidatePersistentCache(getLocalCacheKey(options.managedPrefix));
    invalidatePersistentCache(OPENCLAW_REGISTRY_CACHE_KEY);
    return { success: true, scheduled: true, message: running.message || '后台任务已发起。', status: detectOpenClaw(options), action: detectOpenClaw(options).action };
  } catch (error) {
    const failed = saveTaskState({ mode, phase: 'error', pid: null, startedAt: null, finishedAt: nowIso(), message: `无法发起 OpenClaw ${mode === 'install' ? '安装' : mode === 'update' ? '更新' : mode === 'rollback' ? '回退' : '卸载'}任务。`, error: error instanceof Error ? error.message : String(error), logTail: [] });
    return { success: false, scheduled: false, message: failed.message || '无法发起后台任务。', status: detectOpenClaw(options), action: failed };
  }
}

export function runOpenClawTask(mode: OpenClawTaskMode, requestOrOptions: OpenClawActionRequest | OpenClawDetectionOptions = {}, maybeOptions: OpenClawDetectionOptions = {}): OpenClawTaskState {
  const looksLikeRequest = 'channel' in requestOrOptions || 'tag' in requestOrOptions || 'version' in requestOrOptions || 'historyId' in requestOrOptions || 'gitRef' in requestOrOptions || 'gitDate' in requestOrOptions || 'restart' in requestOrOptions || 'dryRun' in requestOrOptions;
  const request = looksLikeRequest ? requestOrOptions as OpenClawActionRequest : {};
  const options = looksLikeRequest ? maybeOptions : requestOrOptions as OpenClawDetectionOptions;
  const startedAt = nowIso();
  saveTaskState({ mode, phase: 'running', pid: process.pid, startedAt, finishedAt: null, message: `正在执行 OpenClaw ${mode === 'install' ? '安装' : mode === 'update' ? '更新' : mode === 'rollback' ? '回退' : '卸载'}。`, error: null, logTail: [] });
  const execution = runOpenClawAction(mode, request, options, startedAt);
  return saveTaskState({ mode, phase: execution.success ? 'completed' : 'error', pid: process.pid, startedAt, finishedAt: nowIso(), message: execution.message, error: execution.error || null, logTail: execution.logTail });
}

export function installOrUpdateOpenClaw(mode: 'install' | 'update', onProgress: (p: TaskProgress) => void, options: OpenClawDetectionOptions = {}): void {
  const result = scheduleOpenClawTask(mode, {}, options);
  onProgress({ stage: mode, message: result.message, done: result.success !== true || result.action.phase !== 'running', error: result.success ? undefined : result.action.error || result.message });
}

export function installOrUpdateSync(mode: 'install' | 'update', options: OpenClawDetectionOptions = {}): { success: boolean; message: string; output: string } {
  const result = runOpenClawTask(mode, options);
  return { success: result.phase === 'completed', message: result.message || (result.phase === 'completed' ? '操作完成。' : '操作失败。'), output: result.logTail.join('\n') };
}
