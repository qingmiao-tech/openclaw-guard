import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { detectPlatform, getHomeDir } from './platform.js';
import { ensureGuardLayout, readJsonFile, resolveUserPath, writeJsonFile } from './guard-state.js';
import { getPersistentCachedValue, invalidatePersistentCache } from './persistent-cache.js';

export type OpenClawTaskMode = 'install' | 'update';
export type OpenClawTaskPhase = 'idle' | 'running' | 'completed' | 'error';
export type OpenClawDetectedSource = 'managed-prefix' | 'path' | 'npm-prefix' | 'none';

export interface OpenClawDetectionOptions {
  managedPrefix?: string;
  bypassCache?: boolean;
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

const OPENCLAW_LOCAL_CACHE_KEY = 'openclaw-status-local-v3';
const OPENCLAW_REGISTRY_CACHE_KEY = 'openclaw-status-registry-v1';
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

function quoteForDisplay(value: string): string {
  return /\s/.test(value) ? `"${value}"` : value;
}

export function getDefaultOpenClawManagedPrefix(): string {
  return path.join(getHomeDir(), '.openclaw', 'guard', 'npm-global');
}

export function resolveManagedPrefix(managedPrefix?: string | null): string {
  const fromEnv = process.env.OPENCLAW_GUARD_MANAGED_PREFIX?.trim();
  const preferred = managedPrefix?.trim() || fromEnv || getDefaultOpenClawManagedPrefix();
  return resolveUserPath(preferred);
}

export function getOpenClawManagedBinDir(managedPrefix?: string | null): string {
  const resolvedPrefix = resolveManagedPrefix(managedPrefix);
  return detectPlatform() === 'windows'
    ? resolvedPrefix
    : path.join(resolvedPrefix, 'bin');
}

export function getOpenClawManagedBinaryPath(managedPrefix?: string | null): string {
  const resolvedPrefix = resolveManagedPrefix(managedPrefix);
  return detectPlatform() === 'windows'
    ? path.join(resolvedPrefix, 'openclaw.cmd')
    : path.join(resolvedPrefix, 'bin', 'openclaw');
}

export function getOpenClawInstallCommand(managedPrefix?: string | null): string {
  const resolvedPrefix = resolveManagedPrefix(managedPrefix);
  return `npm install -g openclaw@latest --prefix ${quoteForDisplay(resolvedPrefix)}`;
}

function getLocalCacheKey(managedPrefix?: string | null): string {
  return `${OPENCLAW_LOCAL_CACHE_KEY}:${resolveManagedPrefix(managedPrefix)}`;
}

function invalidateOpenClawCaches(managedPrefix?: string | null): void {
  invalidatePersistentCache(getLocalCacheKey(managedPrefix));
  invalidatePersistentCache(OPENCLAW_REGISTRY_CACHE_KEY);
}

function getTaskStateFile(): string {
  return path.join(ensureGuardLayout().stateDir, 'openclaw-install.json');
}

function normalizeTaskState(input?: Partial<OpenClawTaskState> | null): OpenClawTaskState {
  const phase = input?.phase;
  return {
    mode: input?.mode === 'install' || input?.mode === 'update' ? input.mode : null,
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
  const merged = normalizeTaskState({
    ...loadTaskState(),
    ...next,
    lastUpdatedAt: next.lastUpdatedAt || nowIso(),
  });
  writeJsonFile(getTaskStateFile(), merged);
  return merged;
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

function runTextCommand(command: string, args: string[], timeout = 10_000, extraEnv?: NodeJS.ProcessEnv): string {
  const result = spawnSync(command, args, {
    stdio: 'pipe',
    encoding: 'utf-8',
    timeout,
    shell: process.platform === 'win32',
    windowsHide: true,
    env: extraEnv ? { ...process.env, ...extraEnv } : process.env,
  });

  if (result.error || result.status !== 0) {
    throw new Error(result.error?.message || result.stderr || result.stdout || `exit code ${result.status}`);
  }

  return String(result.stdout || '').trim();
}

function runCommandCapture(command: string, args: string[], timeout = 180_000, extraEnv?: NodeJS.ProcessEnv) {
  const result = spawnSync(command, args, {
    stdio: 'pipe',
    encoding: 'utf-8',
    timeout,
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
    const prefix = runTextCommand('npm', ['config', 'get', 'prefix'], 8_000);
    return prefix && prefix !== 'undefined' ? prefix : null;
  } catch {
    return null;
  }
}

function buildExpectedBinaryPath(npmPrefix: string | null): string | null {
  if (!npmPrefix) return null;
  return detectPlatform() === 'windows'
    ? path.join(npmPrefix, 'openclaw.cmd')
    : path.join(npmPrefix, 'bin', 'openclaw');
}

function buildInstallNotes(options: {
  targetBinDir: string | null;
  managedPrefix: string;
  detectedSource: OpenClawDetectedSource;
}): string[] {
  const { targetBinDir, managedPrefix, detectedSource } = options;
  const platform = detectPlatform();
  const shared = [
    `Guard 默认把托管安装放到 ${managedPrefix}。`,
    targetBinDir ? `Guard 会优先把 ${targetBinDir} 注入当前进程 PATH。` : '安装完成后，Guard 会尝试自动刷新当前进程 PATH。',
  ];
  if (detectedSource === 'managed-prefix') {
    shared.unshift('当前正在复用 Guard 托管前缀中的 OpenClaw 安装。');
  } else if (detectedSource === 'path') {
    shared.unshift('当前正在复用 PATH 上已有的 OpenClaw 安装，不会强制覆盖它。');
  } else if (detectedSource === 'npm-prefix') {
    shared.unshift('当前正在复用 npm 默认 prefix 中的 OpenClaw 安装。');
  }

  if (platform === 'windows') {
    return [
      'Windows 下托管安装会把 openclaw.cmd 放到用户级 npm prefix 根目录。',
      ...shared,
      '如果系统终端仍提示找不到 openclaw，重新打开终端窗口后再试。',
    ];
  }
  if (platform === 'macos') {
    return [
      'macOS 下托管安装会把 CLI 放到用户目录下的 bin/openclaw。',
      ...shared,
      '如果你的 shell 仍旧找不到 openclaw，请重新打开终端或检查 npm prefix 是否已加入 PATH。',
    ];
  }
  return [
    'Linux 下托管安装会把 CLI 放到用户目录下的 bin/openclaw。',
    ...shared,
    '如果当前会话仍找不到 openclaw，请重新加载 shell 环境或确认 npm prefix 已加入 PATH。',
  ];
}

function ensurePathContains(dirPath: string | null): void {
  if (!dirPath) return;
  const currentPath = process.env.PATH || '';
  const separator = detectPlatform() === 'windows' ? ';' : ':';
  const parts = currentPath.split(separator).filter(Boolean);
  const compare = detectPlatform() === 'windows'
    ? (value: string) => value.toLowerCase()
    : (value: string) => value;
  const normalizedDir = compare(path.resolve(dirPath));
  if (parts.some((item) => compare(path.resolve(item)) === normalizedDir)) return;
  process.env.PATH = currentPath ? `${dirPath}${separator}${currentPath}` : dirPath;
}

function applyDiscoveredBinary(binaryPath: string | null): string | null {
  if (!binaryPath) return null;
  if (!fs.existsSync(binaryPath)) return null;
  process.env.OPENCLAW_GUARD_OPENCLAW_BIN = binaryPath;
  ensurePathContains(path.dirname(binaryPath));
  return binaryPath;
}

function locateBinaryFromPath(): string | null {
  const explicit = process.env.OPENCLAW_GUARD_OPENCLAW_BIN?.trim();
  if (explicit && fs.existsSync(explicit)) {
    return applyDiscoveredBinary(explicit);
  }

  try {
    const locatorOutput = runTextCommand(getCommandLocator(), ['openclaw'], 5_000);
    const located = locatorOutput.split(/\r?\n/).map((item) => item.trim()).find(Boolean) || null;
    if (located && fs.existsSync(located)) {
      return applyDiscoveredBinary(located);
    }
  } catch {
    // ignore path lookup failures
  }

  return null;
}

function discoverOpenClawBinary(
  managedPrefix: string,
  npmPrefix: string | null,
): { binPath: string | null; detectedSource: OpenClawDetectedSource } {
  const managedBinary = getOpenClawManagedBinaryPath(managedPrefix);
  if (fs.existsSync(managedBinary)) {
    return {
      binPath: applyDiscoveredBinary(managedBinary),
      detectedSource: 'managed-prefix',
    };
  }

  const npmExpected = buildExpectedBinaryPath(npmPrefix);
  const fromPath = locateBinaryFromPath();
  if (fromPath) {
    return {
      binPath: applyDiscoveredBinary(fromPath),
      detectedSource: npmExpected && samePath(fromPath, npmExpected) ? 'npm-prefix' : 'path',
    };
  }

  if (npmExpected && fs.existsSync(npmExpected)) {
    return {
      binPath: applyDiscoveredBinary(npmExpected),
      detectedSource: 'npm-prefix',
    };
  }

  return {
    binPath: null,
    detectedSource: 'none',
  };
}

function detectLocalOpenClawState(options: OpenClawDetectionOptions = {}): OpenClawLocalState {
  const managedPrefix = resolveManagedPrefix(options.managedPrefix);
  const managedBinaryPath = getOpenClawManagedBinaryPath(managedPrefix);
  const managedBinDir = getOpenClawManagedBinDir(managedPrefix);
  const nodeVersion = process.version;
  let npmVersion: string | null = null;
  try {
    npmVersion = runTextCommand('npm', ['--version'], 8_000);
  } catch {
    npmVersion = null;
  }

  const npmPrefix = getNpmPrefixFromVersion(npmVersion);
  const installBlockers = npmVersion ? [] : ['未检测到 npm，当前环境无法通过 Guard 自动安装 OpenClaw。'];
  const discovery = discoverOpenClawBinary(managedPrefix, npmPrefix);
  const discoveredBinary = discovery.binPath;

  let installed = false;
  let version: string | null = null;
  let binPath: string | null = discoveredBinary;

  if (discoveredBinary) {
    try {
      const versionOutput = runTextCommand(discoveredBinary, ['--version'], 10_000, { OPENCLAW_GUARD_OPENCLAW_BIN: discoveredBinary });
      const match = versionOutput.match(/(\d+\.\d+\.\d+[\w.-]*)/);
      version = match ? match[1] : (versionOutput || null);
      installed = true;
      binPath = applyDiscoveredBinary(discoveredBinary);
    } catch {
      installed = false;
    }
  }

  return {
    installed,
    version,
    binPath,
    detectedSource: discovery.detectedSource,
    managedPrefix,
    managedBinDir,
    managedBinaryPath,
    nodeVersion,
    npmVersion,
    npmPrefix,
    installReady: !!npmVersion,
    installCommand: getOpenClawInstallCommand(managedPrefix),
    installBlockers,
    installTargetBinDir: managedBinDir,
    installTargetBinaryPath: managedBinaryPath,
    platformNotes: buildInstallNotes({
      targetBinDir: managedBinDir,
      managedPrefix,
      detectedSource: discovery.detectedSource,
    }),
  };
}

function detectLatestOpenClawVersion(): string | null {
  try {
    return runTextCommand('npm', ['view', 'openclaw', 'version'], 4_000) || null;
  } catch {
    return null;
  }
}

export function getOpenClawTaskState(): OpenClawTaskState {
  const state = loadTaskState();
  if (state.phase === 'running' && state.pid && !isPidAlive(state.pid) && !state.finishedAt) {
    return saveTaskState({
      ...state,
      phase: 'error',
      finishedAt: nowIso(),
      message: '后台安装任务已意外结束，请重新查看状态。',
      error: state.error || '后台安装进程已退出。',
    });
  }
  return state;
}

export function detectOpenClaw(options: OpenClawDetectionOptions = {}): OpenClawStatus {
  const managedPrefix = resolveManagedPrefix(options.managedPrefix);
  const localLoader = () => detectLocalOpenClawState({ managedPrefix });
  const local = options.bypassCache
    ? localLoader()
    : getPersistentCachedValue(getLocalCacheKey(managedPrefix), {
      ttlMs: 15 * 60 * 1000,
      staleIfErrorMs: 7 * 24 * 60 * 60 * 1000,
      loader: localLoader,
    });
  const latestVersion = options.bypassCache
    ? detectLatestOpenClawVersion()
    : getPersistentCachedValue(OPENCLAW_REGISTRY_CACHE_KEY, {
      ttlMs: 6 * 60 * 60 * 1000,
      staleIfErrorMs: 7 * 24 * 60 * 60 * 1000,
      loader: detectLatestOpenClawVersion,
    });

  return {
    ...local,
    latestVersion,
    updateAvailable: !!(local.installed && local.version && latestVersion && local.version !== latestVersion),
    action: getOpenClawTaskState(),
  };
}

export function getOpenClawCommand(options: OpenClawDetectionOptions = {}): string {
  const explicit = process.env.OPENCLAW_GUARD_OPENCLAW_BIN?.trim();
  if (explicit && fs.existsSync(explicit)) return explicit;
  const status = detectOpenClaw(options);
  return status.binPath || 'openclaw';
}

export function getOpenClawBinPath(options: OpenClawDetectionOptions = {}): string | null {
  const command = getOpenClawCommand(options);
  return command === 'openclaw' ? null : command;
}

function resolveTaskCommand(
  mode: OpenClawTaskMode,
  options: OpenClawDetectionOptions = {},
): { command: string; args: string[]; cwd: string } | null {
  const modulePath = fileURLToPath(import.meta.url);
  const rootDir = path.resolve(path.dirname(modulePath), '..');
  const argvEntry = process.argv[1] ? path.resolve(process.argv[1]) : null;
  const distEntry = path.join(rootDir, 'dist', 'index.js');
  const srcEntry = path.join(rootDir, 'src', 'index.ts');
  const tsxCli = path.join(rootDir, 'node_modules', 'tsx', 'dist', 'cli.mjs');
  const forwardedArgs = ['openclaw-task', '--mode', mode, '--json'];
  if (options.managedPrefix) {
    forwardedArgs.push('--managed-prefix', resolveManagedPrefix(options.managedPrefix));
  }

  if (argvEntry && argvEntry.endsWith('.ts') && fs.existsSync(tsxCli) && fs.existsSync(srcEntry)) {
    return {
      command: process.execPath,
      args: [tsxCli, srcEntry, ...forwardedArgs],
      cwd: rootDir,
    };
  }

  if (argvEntry && argvEntry.endsWith('.js') && fs.existsSync(argvEntry)) {
    return {
      command: process.execPath,
      args: [argvEntry, ...forwardedArgs],
      cwd: rootDir,
    };
  }

  if (fs.existsSync(distEntry)) {
    return {
      command: process.execPath,
      args: [distEntry, ...forwardedArgs],
      cwd: rootDir,
    };
  }

  if (fs.existsSync(tsxCli) && fs.existsSync(srcEntry)) {
    return {
      command: process.execPath,
      args: [tsxCli, srcEntry, ...forwardedArgs],
      cwd: rootDir,
    };
  }

  return null;
}

function tailOutput(stdout: string, stderr: string): string[] {
  return `${stdout || ''}\n${stderr || ''}`
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(-30);
}

function resolveInstallExecution(
  localState: OpenClawLocalState,
  mode: OpenClawTaskMode,
): {
  skip: boolean;
  command?: string;
  args?: string[];
  message: string;
  error?: string;
} {
  if (localState.installed && mode === 'install') {
    return {
      skip: true,
      message: localState.detectedSource === 'managed-prefix'
        ? `已检测到 Guard 托管的 OpenClaw${localState.version ? `（${localState.version}）` : ''}，无需重复安装。`
        : `已检测到现有 OpenClaw 安装${localState.version ? `（${localState.version}）` : ''}，本次优先复用，不再重复安装。`,
    };
  }

  if (mode === 'update' && localState.installed) {
    if (localState.detectedSource === 'managed-prefix') {
      return {
        skip: false,
        command: 'npm',
        args: ['install', '-g', 'openclaw@latest', '--prefix', localState.managedPrefix],
        message: '正在更新 Guard 托管前缀中的 OpenClaw。',
      };
    }
    if (localState.detectedSource === 'npm-prefix') {
      return {
        skip: false,
        command: 'npm',
        args: ['install', '-g', 'openclaw@latest'],
        message: '正在更新 npm 默认 prefix 中的 OpenClaw。',
      };
    }
    return {
      skip: true,
      message: '当前复用的是 PATH 上已有的 OpenClaw 安装，Guard 不会直接覆盖它。',
      error: '请在原安装来源完成升级，或移除旧安装后让 Guard 安装到托管目录。',
    };
  }

  return {
    skip: false,
    command: 'npm',
    args: ['install', '-g', 'openclaw@latest', '--prefix', localState.managedPrefix],
    message: '当前未检测到可复用的 OpenClaw，准备安装到 Guard 托管前缀。',
  };
}

export function scheduleOpenClawTask(
  mode: OpenClawTaskMode,
  options: OpenClawDetectionOptions = {},
): OpenClawActionResult {
  const task = getOpenClawTaskState();
  if (task.phase === 'running' && task.pid && isPidAlive(task.pid)) {
    return {
      success: false,
      scheduled: false,
      message: '当前已有 OpenClaw 安装任务正在执行，请稍后再试。',
      status: detectOpenClaw(options),
      action: task,
    };
  }

  const status = detectOpenClaw(options);
  if (!status.installReady) {
    const failed = saveTaskState({
      mode,
      phase: 'error',
      pid: null,
      startedAt: null,
      finishedAt: nowIso(),
      message: status.installBlockers[0] || '当前环境不满足 OpenClaw 安装条件。',
      error: status.installBlockers.join(' | '),
      logTail: [],
    });
    return {
      success: false,
      scheduled: false,
      message: failed.message || '当前环境不满足 OpenClaw 安装条件。',
      status: detectOpenClaw(options),
      action: failed,
    };
  }

  const execution = resolveInstallExecution(status, mode);
  if (execution.skip) {
    const finalAction = saveTaskState({
      mode,
      phase: execution.error ? 'error' : 'completed',
      pid: null,
      startedAt: nowIso(),
      finishedAt: nowIso(),
      message: execution.message,
      error: execution.error || null,
      logTail: execution.error ? [execution.error] : [],
    });
    invalidateOpenClawCaches(options.managedPrefix);
    const refreshedStatus = detectOpenClaw(options);
    return {
      success: finalAction.phase !== 'error',
      scheduled: false,
      message: finalAction.message || execution.message,
      status: refreshedStatus,
      action: refreshedStatus.action,
    };
  }

  const command = resolveTaskCommand(mode, options);
  if (!command) {
    const failed = saveTaskState({
      mode,
      phase: 'error',
      pid: null,
      startedAt: null,
      finishedAt: nowIso(),
      message: '无法解析 OpenClaw 安装任务入口。',
      error: 'Unable to resolve OpenClaw task command.',
      logTail: [],
    });
    return {
      success: false,
      scheduled: false,
      message: failed.message || '无法解析 OpenClaw 安装任务入口。',
      status: detectOpenClaw(options),
      action: failed,
    };
  }

  try {
    const child = spawn(command.command, command.args, {
      cwd: command.cwd,
      detached: true,
      stdio: 'ignore',
      windowsHide: true,
      env: {
        ...process.env,
        OPENCLAW_GUARD_OPENCLAW_CHILD: '1',
        ...(options.managedPrefix ? { OPENCLAW_GUARD_MANAGED_PREFIX: resolveManagedPrefix(options.managedPrefix) } : {}),
      },
    });
    child.unref();

    const running = saveTaskState({
      mode,
      phase: 'running',
      pid: typeof child.pid === 'number' ? child.pid : null,
      startedAt: nowIso(),
      finishedAt: null,
      message: `已在后台发起 OpenClaw ${mode === 'install' ? '安装' : '更新'}。`,
      error: null,
      logTail: [],
    });
    invalidateOpenClawCaches(options.managedPrefix);
    const refreshedStatus = detectOpenClaw(options);
    const currentAction = refreshedStatus.action;
    return {
      success: currentAction.phase !== 'error',
      scheduled: currentAction.phase === 'running' && currentAction.pid === running.pid,
      message: currentAction.message || running.message || '后台安装任务已发起。',
      status: refreshedStatus,
      action: currentAction,
    };
  } catch (error) {
    const failed = saveTaskState({
      mode,
      phase: 'error',
      pid: null,
      startedAt: null,
      finishedAt: nowIso(),
      message: `无法发起 OpenClaw ${mode === 'install' ? '安装' : '更新'}任务。`,
      error: error instanceof Error ? error.message : String(error),
      logTail: [],
    });
    return {
      success: false,
      scheduled: false,
      message: failed.message || '无法发起后台安装任务。',
      status: detectOpenClaw(options),
      action: failed,
    };
  }
}

export function runOpenClawTask(
  mode: OpenClawTaskMode,
  options: OpenClawDetectionOptions = {},
): OpenClawTaskState {
  const startedAt = nowIso();
  saveTaskState({
    mode,
    phase: 'running',
    pid: process.pid,
    startedAt,
    finishedAt: null,
    message: `正在执行 OpenClaw ${mode === 'install' ? '安装' : '更新'}。`,
    error: null,
    logTail: [],
  });

  const localState = detectLocalOpenClawState(options);
  if (!localState.installReady) {
    return saveTaskState({
      mode,
      phase: 'error',
      pid: process.pid,
      startedAt,
      finishedAt: nowIso(),
      message: localState.installBlockers[0] || '当前环境不满足安装条件。',
      error: localState.installBlockers.join(' | '),
      logTail: [],
    });
  }

  const execution = resolveInstallExecution(localState, mode);
  if (execution.skip) {
    return saveTaskState({
      mode,
      phase: execution.error ? 'error' : 'completed',
      pid: process.pid,
      startedAt,
      finishedAt: nowIso(),
      message: execution.message,
      error: execution.error || null,
      logTail: execution.error ? [execution.error] : [],
    });
  }

  const installResult = runCommandCapture(
    execution.command || 'npm',
    execution.args || [],
    240_000,
    options.managedPrefix ? { OPENCLAW_GUARD_MANAGED_PREFIX: resolveManagedPrefix(options.managedPrefix) } : undefined,
  );
  invalidateOpenClawCaches(options.managedPrefix);

  const refreshed = detectLocalOpenClawState(options);
  const logTail = tailOutput(installResult.stdout, installResult.stderr);

  if (installResult.success && refreshed.installed) {
    return saveTaskState({
      mode,
      phase: 'completed',
      pid: process.pid,
      startedAt,
      finishedAt: nowIso(),
      message: `OpenClaw ${mode === 'install' ? '安装' : '更新'}成功${refreshed.version ? `，当前版本 ${refreshed.version}` : ''}。`,
      error: null,
      logTail,
    });
  }

  const missingPathHint = refreshed.installTargetBinDir
    ? `请检查 ${refreshed.installTargetBinDir} 是否已加入 PATH。`
    : '请检查 npm 全局安装目录是否已加入 PATH。';
  return saveTaskState({
    mode,
    phase: 'error',
    pid: process.pid,
    startedAt,
    finishedAt: nowIso(),
    message: installResult.success
      ? `OpenClaw 安装命令已执行，但当前进程尚未定位到 CLI。${missingPathHint}`
      : `OpenClaw ${mode === 'install' ? '安装' : '更新'}失败。`,
    error: installResult.error || installResult.stderr || installResult.stdout || missingPathHint,
    logTail,
  });
}

export function installOrUpdateOpenClaw(
  mode: 'install' | 'update',
  onProgress: (p: TaskProgress) => void,
  options: OpenClawDetectionOptions = {},
): void {
  const result = scheduleOpenClawTask(mode, options);
  onProgress({
    stage: mode,
    message: result.message,
    done: result.success !== true || result.action.phase !== 'running',
    error: result.success ? undefined : result.action.error || result.message,
  });
}

export function installOrUpdateSync(
  mode: 'install' | 'update',
  options: OpenClawDetectionOptions = {},
): { success: boolean; message: string; output: string } {
  const result = runOpenClawTask(mode, options);
  return {
    success: result.phase === 'completed',
    message: result.message || (result.phase === 'completed' ? '操作完成。' : '操作失败。'),
    output: result.logTail.join('\n'),
  };
}

