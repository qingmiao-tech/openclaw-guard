import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { GUARD_PACKAGE_NAME, GUARD_PACKAGE_ROOT, GUARD_VERSION } from './app-meta.js';
import { ensureGuardLayout, readJsonFile, writeJsonFile } from './guard-state.js';
import { getPersistentCachedValue, invalidatePersistentCache } from './persistent-cache.js';
import { clearWebRuntimeRecord, getWebBackgroundStatus, startWebBackgroundService, type WebBackgroundActionResult } from './web-background.js';

export type GuardInstallSource = 'npm-global' | 'npx' | 'workspace' | 'unknown';
export type GuardSelfUpdatePhase = 'idle' | 'running' | 'completed' | 'error';
export type GuardSelfNextAction = 'update-now' | 'rerun-npx' | 'pull-workspace' | 'manual';

export interface GuardSelfUpdateState {
  phase: GuardSelfUpdatePhase;
  pid: number | null;
  port: number | null;
  targetPid: number | null;
  newPid: number | null;
  startedAt: string | null;
  finishedAt: string | null;
  lastUpdatedAt: string | null;
  targetVersion: string | null;
  message: string | null;
  error: string | null;
}

export interface GuardSelfStatus {
  packageName: string;
  currentVersion: string;
  latestVersion: string | null;
  updateAvailable: boolean;
  installSource: GuardInstallSource;
  updateSupported: boolean;
  nextAction: GuardSelfNextAction;
  packageRoot: string;
  binPath: string | null;
  nodeVersion: string;
  npmVersion: string | null;
  globalNodeModules: string | null;
  updateCommand: string | null;
  releaseUrl: string;
  docsUrl: string;
  action: GuardSelfUpdateState;
}

export interface GuardSelfUpdateOptions {
  port: number;
  currentPid?: number;
  targetVersion?: string;
  dryRun?: boolean;
  responseGraceMs?: number;
}

export interface GuardSelfUpdateResult {
  success: boolean;
  scheduled?: boolean;
  message: string;
  status: GuardSelfStatus;
  action: GuardSelfUpdateState;
}

interface TaskCommand {
  command: string;
  args: string[];
  cwd: string;
}

interface CommandResult {
  success: boolean;
  status: number | null;
  stdout: string;
  stderr: string;
  error: string | null;
}

interface GuardSelfUpdateTaskDeps {
  wait: (ms: number) => Promise<void>;
  isPidAlive: (pid: number | null | undefined) => boolean;
  stopPid: (pid: number) => boolean;
  clearRuntimeRecord: (expectedPid?: number) => void;
  startBackground: (options: { port: number }) => Promise<WebBackgroundActionResult>;
  runInstall: (version: string) => CommandResult;
  readStatus: (options?: { bypassCache?: boolean }) => GuardSelfStatus;
}

const DEFAULT_STATE: GuardSelfUpdateState = {
  phase: 'idle',
  pid: null,
  port: null,
  targetPid: null,
  newPid: null,
  startedAt: null,
  finishedAt: null,
  lastUpdatedAt: null,
  targetVersion: null,
  message: null,
  error: null,
};

const GUARD_LATEST_CACHE_KEY = 'guard-self-latest-v1';
const GUARD_SELF_UPDATE_FILE = 'guard-self-update.json';
const DEFAULT_REGISTRY = 'https://registry.npmjs.org/';

function nowIso(): string {
  return new Date().toISOString();
}

function normalizeState(input?: Partial<GuardSelfUpdateState> | null): GuardSelfUpdateState {
  const phase = input?.phase;
  return {
    phase: phase === 'running' || phase === 'completed' || phase === 'error' ? phase : 'idle',
    pid: typeof input?.pid === 'number' && Number.isInteger(input.pid) && input.pid > 0 ? input.pid : null,
    port: typeof input?.port === 'number' && Number.isFinite(input.port) && input.port > 0 ? input.port : null,
    targetPid: typeof input?.targetPid === 'number' && Number.isInteger(input.targetPid) && input.targetPid > 0 ? input.targetPid : null,
    newPid: typeof input?.newPid === 'number' && Number.isInteger(input.newPid) && input.newPid > 0 ? input.newPid : null,
    startedAt: typeof input?.startedAt === 'string' ? input.startedAt : null,
    finishedAt: typeof input?.finishedAt === 'string' ? input.finishedAt : null,
    lastUpdatedAt: typeof input?.lastUpdatedAt === 'string' ? input.lastUpdatedAt : null,
    targetVersion: typeof input?.targetVersion === 'string' && input.targetVersion.trim() ? input.targetVersion.trim() : null,
    message: typeof input?.message === 'string' && input.message.trim() ? input.message : null,
    error: typeof input?.error === 'string' && input.error.trim() ? input.error : null,
  };
}

function getStateFile(): string {
  return path.join(ensureGuardLayout().stateDir, GUARD_SELF_UPDATE_FILE);
}

function loadState(): GuardSelfUpdateState {
  return normalizeState(readJsonFile<GuardSelfUpdateState | null>(getStateFile(), DEFAULT_STATE));
}

function saveState(next: Partial<GuardSelfUpdateState>): GuardSelfUpdateState {
  const merged = normalizeState({
    ...loadState(),
    ...next,
    lastUpdatedAt: next.lastUpdatedAt || nowIso(),
  });
  writeJsonFile(getStateFile(), merged);
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

function killPid(pid: number): boolean {
  try {
    if (process.platform === 'win32') {
      const result = spawnSync('taskkill', ['/PID', String(pid), '/T', '/F'], {
        encoding: 'utf-8',
        windowsHide: true,
      });
      return result.status === 0;
    }
    process.kill(pid, 'SIGTERM');
    return true;
  } catch {
    return false;
  }
}

function runCommand(command: string, args: string[], timeoutMs: number, cwd?: string): CommandResult {
  try {
    const isWindowsShell = process.platform === 'win32';
    const quoteShellArg = (value: string) => /[\s"]/u.test(value)
      ? `"${String(value).replace(/"/g, '\\"')}"`
      : value;
    const result = isWindowsShell
      ? spawnSync([command, ...args].map(quoteShellArg).join(' '), {
          cwd,
          encoding: 'utf-8',
          shell: true,
          timeout: timeoutMs,
          windowsHide: true,
        })
      : spawnSync(command, args, {
          cwd,
          encoding: 'utf-8',
          timeout: timeoutMs,
          windowsHide: true,
        });
    return {
      success: result.status === 0 && !result.error,
      status: typeof result.status === 'number' ? result.status : null,
      stdout: String(result.stdout || '').trim(),
      stderr: String(result.stderr || '').trim(),
      error: result.error ? result.error.message : null,
    };
  } catch (error) {
    return {
      success: false,
      status: null,
      stdout: '',
      stderr: '',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function readPackageVersion(rootDir = GUARD_PACKAGE_ROOT): string {
  try {
    const packageJsonPath = path.join(rootDir, 'package.json');
    const parsed = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as { version?: string };
    return typeof parsed.version === 'string' && parsed.version.trim() ? parsed.version.trim() : GUARD_VERSION;
  } catch {
    return GUARD_VERSION;
  }
}

function normalizePath(value: string): string {
  const resolved = path.resolve(value);
  return process.platform === 'win32' ? resolved.toLowerCase() : resolved;
}

function isPathInside(candidate: string | null | undefined, root: string | null | undefined): boolean {
  if (!candidate || !root) return false;
  const normalizedCandidate = normalizePath(candidate);
  const normalizedRoot = normalizePath(root);
  return normalizedCandidate === normalizedRoot || normalizedCandidate.startsWith(`${normalizedRoot}${path.sep}`);
}

function readNpmVersion(): string | null {
  const result = runCommand('npm', ['--version'], 8_000);
  return result.success && result.stdout ? result.stdout : null;
}

function readGlobalNodeModules(): string | null {
  const result = runCommand('npm', ['root', '-g'], 8_000);
  return result.success && result.stdout ? path.resolve(result.stdout) : null;
}

function isNpxPath(rootDir: string): boolean {
  const normalized = normalizePath(rootDir);
  return normalized.includes(`${path.sep}_npx${path.sep}`)
    || normalized.includes(`${path.sep}npm-cache${path.sep}`)
    || normalized.includes(`${path.sep}.npm${path.sep}_npx${path.sep}`);
}

function isWorkspacePath(rootDir: string): boolean {
  if ((process.argv[1] || '').endsWith('.ts')) return true;
  return fs.existsSync(path.join(rootDir, 'src')) || fs.existsSync(path.join(rootDir, 'tsconfig.json'));
}

function detectInstallSource(rootDir: string, globalNodeModules: string | null): GuardInstallSource {
  if (globalNodeModules && isPathInside(rootDir, globalNodeModules)) return 'npm-global';
  if (isNpxPath(rootDir)) return 'npx';
  if (isWorkspacePath(rootDir)) return 'workspace';
  return 'unknown';
}

function compareLooseVersions(left: string, right: string): number {
  const leftParts = left.split(/[.+-]/).filter(Boolean);
  const rightParts = right.split(/[.+-]/).filter(Boolean);
  const length = Math.max(leftParts.length, rightParts.length);
  for (let index = 0; index < length; index += 1) {
    const leftPart = leftParts[index] || '0';
    const rightPart = rightParts[index] || '0';
    const leftNumber = Number(leftPart);
    const rightNumber = Number(rightPart);
    const leftIsNumber = Number.isFinite(leftNumber) && `${leftNumber}` === leftPart;
    const rightIsNumber = Number.isFinite(rightNumber) && `${rightNumber}` === rightPart;
    if (leftIsNumber && rightIsNumber) {
      if (leftNumber !== rightNumber) return leftNumber > rightNumber ? 1 : -1;
      continue;
    }
    if (leftPart !== rightPart) return leftPart > rightPart ? 1 : -1;
  }
  return 0;
}

function detectLatestGuardVersion(): string | null {
  const result = runCommand('npm', ['view', GUARD_PACKAGE_NAME, 'version', '--registry', DEFAULT_REGISTRY], 10_000);
  if (!result.success || !result.stdout) return null;
  return result.stdout.split(/\r?\n/).map((line) => line.trim()).find(Boolean) || null;
}

function resolveNextAction(source: GuardInstallSource, updateAvailable: boolean): GuardSelfNextAction {
  if (!updateAvailable) return 'manual';
  if (source === 'npm-global') return 'update-now';
  if (source === 'npx') return 'rerun-npx';
  if (source === 'workspace') return 'pull-workspace';
  return 'manual';
}

function buildUpdateCommand(source: GuardInstallSource, version = 'latest'): string | null {
  if (source === 'npm-global') {
    return `npm install -g ${GUARD_PACKAGE_NAME}@${version} --registry ${DEFAULT_REGISTRY}`;
  }
  if (source === 'npx') {
    return `npx -y ${GUARD_PACKAGE_NAME}@${version} web --port 18088`;
  }
  if (source === 'workspace') {
    return 'git pull && npm install && npm run build';
  }
  return null;
}

function readCurrentBinPath(): string | null {
  return process.argv[1] ? path.resolve(process.argv[1]) : null;
}

export function getGuardSelfUpdateState(): GuardSelfUpdateState {
  const state = loadState();
  if (state.phase === 'running' && state.pid && !isPidAlive(state.pid) && !state.finishedAt) {
    return saveState({
      ...state,
      phase: 'error',
      finishedAt: nowIso(),
      message: 'Guard 自更新后台任务意外结束，请重新检查版本状态。',
      error: state.error || 'Guard self-update child process exited unexpectedly.',
    });
  }
  return state;
}

export function getGuardSelfStatus(options: { bypassCache?: boolean } = {}): GuardSelfStatus {
  const npmVersion = readNpmVersion();
  const globalNodeModules = readGlobalNodeModules();
  const currentVersion = readPackageVersion();
  const latestVersion = options.bypassCache
    ? detectLatestGuardVersion()
    : getPersistentCachedValue(GUARD_LATEST_CACHE_KEY, {
        ttlMs: 30 * 60 * 1000,
        staleIfErrorMs: 7 * 24 * 60 * 60 * 1000,
        loader: detectLatestGuardVersion,
      });
  const installSource = detectInstallSource(GUARD_PACKAGE_ROOT, globalNodeModules);
  const updateAvailable = !!(latestVersion && compareLooseVersions(currentVersion, latestVersion) < 0);
  const nextAction = resolveNextAction(installSource, updateAvailable);
  const updateSupported = installSource === 'npm-global' && !!npmVersion;
  return {
    packageName: GUARD_PACKAGE_NAME,
    currentVersion,
    latestVersion,
    updateAvailable,
    installSource,
    updateSupported,
    nextAction,
    packageRoot: GUARD_PACKAGE_ROOT,
    binPath: readCurrentBinPath(),
    nodeVersion: process.version,
    npmVersion,
    globalNodeModules,
    updateCommand: buildUpdateCommand(installSource, updateAvailable && latestVersion ? latestVersion : 'latest'),
    releaseUrl: 'https://github.com/qingmiao-tech/openclaw-guard/releases',
    docsUrl: 'https://qingmiao-tech.github.io/openclaw-guard/',
    action: getGuardSelfUpdateState(),
  };
}

function resolveTargetPid(port: number, currentPid?: number): number | null {
  if (Number.isInteger(currentPid) && currentPid && currentPid > 0) return currentPid;
  const status = getWebBackgroundStatus(port);
  return status.running && status.pid ? status.pid : null;
}

function resolveTaskCommand(options: GuardSelfUpdateOptions): TaskCommand | null {
  const rootDir = GUARD_PACKAGE_ROOT;
  const argvEntry = process.argv[1] ? path.resolve(process.argv[1]) : null;
  const distEntry = path.join(rootDir, 'dist', 'index.js');
  const srcEntry = path.join(rootDir, 'src', 'index.ts');
  const tsxCli = path.join(rootDir, 'node_modules', 'tsx', 'dist', 'cli.mjs');
  const forwardedArgs = ['self-update-task', '--port', String(options.port), '--json'];
  if (options.currentPid) forwardedArgs.push('--current-pid', String(options.currentPid));
  if (options.targetVersion) forwardedArgs.push('--target-version', options.targetVersion);
  if (options.dryRun === true) forwardedArgs.push('--dry-run');

  if (argvEntry && argvEntry.endsWith('.ts') && fs.existsSync(tsxCli) && fs.existsSync(srcEntry)) {
    return { command: process.execPath, args: [tsxCli, srcEntry, ...forwardedArgs], cwd: rootDir };
  }
  if (argvEntry && argvEntry.endsWith('.js') && fs.existsSync(argvEntry)) {
    return { command: process.execPath, args: [argvEntry, ...forwardedArgs], cwd: rootDir };
  }
  if (fs.existsSync(distEntry)) {
    return { command: process.execPath, args: [distEntry, ...forwardedArgs], cwd: rootDir };
  }
  if (fs.existsSync(tsxCli) && fs.existsSync(srcEntry)) {
    return { command: process.execPath, args: [tsxCli, srcEntry, ...forwardedArgs], cwd: rootDir };
  }
  return null;
}

export function scheduleGuardSelfUpdate(options: GuardSelfUpdateOptions): GuardSelfUpdateResult {
  const current = getGuardSelfUpdateState();
  if (current.phase === 'running' && current.pid && isPidAlive(current.pid)) {
    return {
      success: false,
      scheduled: false,
      message: '当前已有 Guard 自更新任务在执行，请稍后再试。',
      status: getGuardSelfStatus(),
      action: current,
    };
  }

  const status = getGuardSelfStatus();
  if (!status.updateSupported) {
    const failed = saveState({
      phase: 'error',
      pid: null,
      port: options.port,
      targetPid: resolveTargetPid(options.port, options.currentPid),
      newPid: null,
      startedAt: null,
      finishedAt: nowIso(),
      targetVersion: options.targetVersion || status.latestVersion || null,
      message: '当前安装来源暂不支持在线更新 Guard。',
      error: `Unsupported Guard install source: ${status.installSource}`,
    });
    return {
      success: false,
      scheduled: false,
      message: failed.message || '当前安装来源暂不支持在线更新 Guard。',
      status: getGuardSelfStatus({ bypassCache: true }),
      action: failed,
    };
  }

  const command = resolveTaskCommand(options);
  if (!command) {
    const failed = saveState({
      phase: 'error',
      pid: null,
      port: options.port,
      targetPid: resolveTargetPid(options.port, options.currentPid),
      newPid: null,
      startedAt: null,
      finishedAt: nowIso(),
      targetVersion: options.targetVersion || status.latestVersion || null,
      message: '无法解析 Guard 自更新任务入口。',
      error: 'Unable to resolve guard self-update task command.',
    });
    return {
      success: false,
      scheduled: false,
      message: failed.message || '无法解析 Guard 自更新任务入口。',
      status: getGuardSelfStatus({ bypassCache: true }),
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
        OPENCLAW_GUARD_SELF_UPDATE_CHILD: '1',
      },
    });
    child.unref();

    const scheduled = saveState({
      phase: 'running',
      pid: typeof child.pid === 'number' ? child.pid : null,
      port: options.port,
      targetPid: resolveTargetPid(options.port, options.currentPid),
      newPid: null,
      startedAt: nowIso(),
      finishedAt: null,
      targetVersion: options.targetVersion || status.latestVersion || null,
      message: options.dryRun === true
        ? '已在后台发起 Guard 自更新预演。'
        : '已在后台发起 Guard 在线更新，页面会短暂断开后自动恢复。',
      error: null,
    });

    return {
      success: true,
      scheduled: true,
      message: scheduled.message || 'Guard 在线更新任务已调度。',
      status: getGuardSelfStatus({ bypassCache: true }),
      action: scheduled,
    };
  } catch (error) {
    const failed = saveState({
      phase: 'error',
      pid: null,
      port: options.port,
      targetPid: resolveTargetPid(options.port, options.currentPid),
      newPid: null,
      startedAt: null,
      finishedAt: nowIso(),
      targetVersion: options.targetVersion || status.latestVersion || null,
      message: '无法发起 Guard 在线更新任务。',
      error: error instanceof Error ? error.message : String(error),
    });
    return {
      success: false,
      scheduled: false,
      message: failed.message || '无法发起 Guard 在线更新任务。',
      status: getGuardSelfStatus({ bypassCache: true }),
      action: failed,
    };
  }
}

function waitForPidExit(
  pid: number,
  deps: GuardSelfUpdateTaskDeps,
  timeoutMs = 15_000,
  intervalMs = 250,
): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  const poll = async (): Promise<boolean> => {
    if (Date.now() >= deadline) return !deps.isPidAlive(pid);
    if (!deps.isPidAlive(pid)) return true;
    await deps.wait(intervalMs);
    return poll();
  };
  return poll();
}

function createDefaultTaskDeps(): GuardSelfUpdateTaskDeps {
  return {
    wait: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    isPidAlive,
    stopPid: killPid,
    clearRuntimeRecord: clearWebRuntimeRecord,
    startBackground: ({ port }) => startWebBackgroundService({ port }),
    runInstall: (version) => runCommand('npm', ['install', '-g', `${GUARD_PACKAGE_NAME}@${version}`, '--registry', DEFAULT_REGISTRY], 180_000),
    readStatus: (options) => getGuardSelfStatus(options),
  };
}

export async function runGuardSelfUpdateTask(
  options: GuardSelfUpdateOptions,
  overrides: Partial<GuardSelfUpdateTaskDeps> = {},
): Promise<GuardSelfUpdateState> {
  const deps: GuardSelfUpdateTaskDeps = {
    ...createDefaultTaskDeps(),
    ...overrides,
  };
  const before = deps.readStatus({ bypassCache: true });
  const targetVersion = options.targetVersion || before.latestVersion || 'latest';
  const targetPid = resolveTargetPid(options.port, options.currentPid);
  const startedAt = nowIso();

  saveState({
    phase: 'running',
    pid: process.pid,
    port: options.port,
    targetPid,
    newPid: null,
    startedAt,
    finishedAt: null,
    targetVersion,
    message: `准备将 Guard 从 v${before.currentVersion} 更新到 ${targetVersion === 'latest' ? 'latest' : `v${targetVersion}`}。`,
    error: null,
  });

  if (!before.updateSupported) {
    return saveState({
      phase: 'error',
      port: options.port,
      targetPid,
      newPid: null,
      startedAt,
      finishedAt: nowIso(),
      targetVersion,
      message: '当前安装来源暂不支持在线更新 Guard。',
      error: `Unsupported Guard install source: ${before.installSource}`,
    });
  }

  if (options.dryRun === true) {
    return saveState({
      phase: 'completed',
      port: options.port,
      targetPid,
      newPid: targetPid || null,
      startedAt,
      finishedAt: nowIso(),
      targetVersion,
      message: `预演完成：将执行 ${buildUpdateCommand('npm-global', targetVersion) || `npm install -g ${GUARD_PACKAGE_NAME}@${targetVersion}`}，然后重启 Guard Web。`,
      error: null,
    });
  }

  await deps.wait(Math.max(0, options.responseGraceMs ?? 600));

  if (targetPid && deps.isPidAlive(targetPid)) {
    const stopped = deps.stopPid(targetPid);
    if (!stopped) {
      return saveState({
        phase: 'error',
        port: options.port,
        targetPid,
        newPid: null,
        startedAt,
        finishedAt: nowIso(),
        targetVersion,
        message: `无法停止旧的 Guard Web 进程 (PID ${targetPid})。`,
        error: `Unable to stop previous Guard Web process ${targetPid}.`,
      });
    }
    const exited = await waitForPidExit(targetPid, deps);
    if (!exited) {
      return saveState({
        phase: 'error',
        port: options.port,
        targetPid,
        newPid: null,
        startedAt,
        finishedAt: nowIso(),
        targetVersion,
        message: `旧的 Guard Web 进程 (PID ${targetPid}) 在预期时间内没有退出。`,
        error: `Guard Web process ${targetPid} did not exit within timeout.`,
      });
    }
  }

  deps.clearRuntimeRecord(targetPid || undefined);
  const installResult = deps.runInstall(targetVersion);
  invalidatePersistentCache(GUARD_LATEST_CACHE_KEY);
  const afterInstall = deps.readStatus({ bypassCache: true });

  const background = await deps.startBackground({ port: options.port });
  const newPid = background.pid ?? background.status?.pid ?? null;

  if (!installResult.success) {
    return saveState({
      phase: 'error',
      port: options.port,
      targetPid,
      newPid,
      startedAt,
      finishedAt: nowIso(),
      targetVersion,
      message: background.success
        ? 'Guard 更新失败，但已重新拉起当前工作台。'
        : 'Guard 更新失败，且无法重新拉起工作台。',
      error: installResult.error || installResult.stderr || installResult.stdout || 'Guard self-update failed.',
    });
  }

  if (!background.success || !background.status?.running || !newPid) {
    return saveState({
      phase: 'error',
      port: options.port,
      targetPid,
      newPid: null,
      startedAt,
      finishedAt: nowIso(),
      targetVersion,
      message: background.message || 'Guard 已更新，但新的工作台实例启动失败。',
      error: background.message || 'Failed to restart Guard Web after updating Guard.',
    });
  }

  return saveState({
    phase: 'completed',
    port: options.port,
    targetPid,
    newPid,
    startedAt,
    finishedAt: nowIso(),
    targetVersion,
    message: `Guard 已更新到 v${afterInstall.currentVersion}，新的工作台实例 PID ${newPid}。`,
    error: null,
  });
}
