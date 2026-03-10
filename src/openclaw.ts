import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { detectPlatform } from './platform.js';
import { ensureGuardLayout, readJsonFile, writeJsonFile } from './guard-state.js';
import { getPersistentCachedValue, invalidatePersistentCache } from './persistent-cache.js';

export type OpenClawTaskMode = 'install' | 'update';
export type OpenClawTaskPhase = 'idle' | 'running' | 'completed' | 'error';

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

const OPENCLAW_LOCAL_CACHE_KEY = 'openclaw-status-local-v2';
const OPENCLAW_REGISTRY_CACHE_KEY = 'openclaw-status-registry-v1';
const DEFAULT_INSTALL_COMMAND = 'npm install -g openclaw@latest';
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

function buildInstallNotes(targetBinDir: string | null): string[] {
  const platform = detectPlatform();
  if (platform === 'windows') {
    return [
      'Windows 下默认通过 npm 全局安装，CLI 通常会落在 npm prefix 根目录，例如 openclaw.cmd。',
      targetBinDir ? `Guard 会优先尝试把 ${targetBinDir} 加入当前进程 PATH，避免“装好了但本进程找不到”。` : '安装完成后，Guard 会尝试自动刷新当前进程 PATH。',
      '如果系统终端仍提示找不到 openclaw，重新打开终端窗口后再试。',
    ];
  }
  if (platform === 'macos') {
    return [
      'macOS 下默认通过 npm 全局安装，CLI 一般位于 npm prefix 下的 bin/openclaw。',
      targetBinDir ? `Guard 会优先尝试把 ${targetBinDir} 加入当前进程 PATH。` : '安装完成后，Guard 会尝试自动刷新当前进程 PATH。',
      '如果你的 shell 仍旧找不到 openclaw，请重新打开终端或检查 npm prefix 是否已加入 PATH。',
    ];
  }
  return [
    'Linux 下默认通过 npm 全局安装，CLI 一般位于 npm prefix 下的 bin/openclaw。',
    targetBinDir ? `Guard 会优先尝试把 ${targetBinDir} 加入当前进程 PATH。` : '安装完成后，Guard 会尝试自动刷新当前进程 PATH。',
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

function discoverOpenClawBinary(npmPrefix: string | null): string | null {
  const fromPath = locateBinaryFromPath();
  if (fromPath) return fromPath;

  const expected = buildExpectedBinaryPath(npmPrefix);
  if (expected && fs.existsSync(expected)) {
    return applyDiscoveredBinary(expected);
  }

  return null;
}

function detectLocalOpenClawState(): OpenClawLocalState {
  const nodeVersion = process.version;
  let npmVersion: string | null = null;
  try {
    npmVersion = runTextCommand('npm', ['--version'], 8_000);
  } catch {
    npmVersion = null;
  }

  const npmPrefix = getNpmPrefixFromVersion(npmVersion);
  const targetBinaryPath = buildExpectedBinaryPath(npmPrefix);
  const targetBinDir = targetBinaryPath ? path.dirname(targetBinaryPath) : null;
  const installBlockers = npmVersion ? [] : ['未检测到 npm，当前环境无法通过 Guard 自动安装 OpenClaw。'];
  const discoveredBinary = discoverOpenClawBinary(npmPrefix);

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
    nodeVersion,
    npmVersion,
    npmPrefix,
    installReady: !!npmVersion,
    installCommand: DEFAULT_INSTALL_COMMAND,
    installBlockers,
    installTargetBinDir: targetBinDir,
    installTargetBinaryPath: targetBinaryPath,
    platformNotes: buildInstallNotes(targetBinDir),
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

export function detectOpenClaw(): OpenClawStatus {
  const local = getPersistentCachedValue(OPENCLAW_LOCAL_CACHE_KEY, {
    ttlMs: 15 * 60 * 1000,
    staleIfErrorMs: 7 * 24 * 60 * 60 * 1000,
    loader: detectLocalOpenClawState,
  });
  const latestVersion = getPersistentCachedValue(OPENCLAW_REGISTRY_CACHE_KEY, {
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

export function getOpenClawCommand(): string {
  const explicit = process.env.OPENCLAW_GUARD_OPENCLAW_BIN?.trim();
  if (explicit && fs.existsSync(explicit)) return explicit;
  const status = detectOpenClaw();
  return status.binPath || 'openclaw';
}

export function getOpenClawBinPath(): string | null {
  const command = getOpenClawCommand();
  return command === 'openclaw' ? null : command;
}

function resolveTaskCommand(mode: OpenClawTaskMode): { command: string; args: string[]; cwd: string } | null {
  const modulePath = fileURLToPath(import.meta.url);
  const rootDir = path.resolve(path.dirname(modulePath), '..');
  const argvEntry = process.argv[1] ? path.resolve(process.argv[1]) : null;
  const distEntry = path.join(rootDir, 'dist', 'index.js');
  const srcEntry = path.join(rootDir, 'src', 'index.ts');
  const tsxCli = path.join(rootDir, 'node_modules', 'tsx', 'dist', 'cli.mjs');

  if (argvEntry && argvEntry.endsWith('.ts') && fs.existsSync(tsxCli) && fs.existsSync(srcEntry)) {
    return {
      command: process.execPath,
      args: [tsxCli, srcEntry, 'openclaw-task', '--mode', mode, '--json'],
      cwd: rootDir,
    };
  }

  if (argvEntry && argvEntry.endsWith('.js') && fs.existsSync(argvEntry)) {
    return {
      command: process.execPath,
      args: [argvEntry, 'openclaw-task', '--mode', mode, '--json'],
      cwd: rootDir,
    };
  }

  if (fs.existsSync(distEntry)) {
    return {
      command: process.execPath,
      args: [distEntry, 'openclaw-task', '--mode', mode, '--json'],
      cwd: rootDir,
    };
  }

  if (fs.existsSync(tsxCli) && fs.existsSync(srcEntry)) {
    return {
      command: process.execPath,
      args: [tsxCli, srcEntry, 'openclaw-task', '--mode', mode, '--json'],
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

export function scheduleOpenClawTask(mode: OpenClawTaskMode): OpenClawActionResult {
  const task = getOpenClawTaskState();
  if (task.phase === 'running' && task.pid && isPidAlive(task.pid)) {
    return {
      success: false,
      scheduled: false,
      message: '当前已有 OpenClaw 安装任务正在执行，请稍后再试。',
      status: detectOpenClaw(),
      action: task,
    };
  }

  const status = detectOpenClaw();
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
      status: detectOpenClaw(),
      action: failed,
    };
  }

  const command = resolveTaskCommand(mode);
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
      status: detectOpenClaw(),
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
    invalidatePersistentCache(OPENCLAW_LOCAL_CACHE_KEY);
    invalidatePersistentCache(OPENCLAW_REGISTRY_CACHE_KEY);
    return {
      success: true,
      scheduled: true,
      message: running.message || '后台安装任务已发起。',
      status: detectOpenClaw(),
      action: running,
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
      status: detectOpenClaw(),
      action: failed,
    };
  }
}

export function runOpenClawTask(mode: OpenClawTaskMode): OpenClawTaskState {
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

  const localState = detectLocalOpenClawState();
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

  const installResult = runCommandCapture('npm', ['install', '-g', 'openclaw@latest'], 240_000);
  invalidatePersistentCache(OPENCLAW_LOCAL_CACHE_KEY);
  invalidatePersistentCache(OPENCLAW_REGISTRY_CACHE_KEY);

  const refreshed = detectLocalOpenClawState();
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
): void {
  const result = scheduleOpenClawTask(mode);
  onProgress({
    stage: mode,
    message: result.message,
    done: result.success !== true || result.action.phase !== 'running',
    error: result.success ? undefined : result.action.error || result.message,
  });
}

export function installOrUpdateSync(mode: 'install' | 'update'): { success: boolean; message: string; output: string } {
  const result = runOpenClawTask(mode);
  return {
    success: result.phase === 'completed',
    message: result.message || (result.phase === 'completed' ? '操作完成。' : '操作失败。'),
    output: result.logTail.join('\n'),
  };
}

