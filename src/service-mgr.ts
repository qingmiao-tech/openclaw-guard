import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';
import { loadConfig, getNested } from './config.js';
import { ensureGuardLayout, readJsonFile, writeJsonFile } from './guard-state.js';
import { detectPlatform } from './platform.js';
import { getPersistentCachedValue, invalidatePersistentCache } from './persistent-cache.js';

export type ServiceActionName = 'start' | 'stop' | 'restart';
export type ServiceActionPhase = 'idle' | 'running' | 'completed' | 'error';

export interface ServiceActionState {
  action: ServiceActionName | null;
  phase: ServiceActionPhase;
  pid: number | null;
  startedAt: string | null;
  finishedAt: string | null;
  lastUpdatedAt: string | null;
  message: string | null;
  error: string | null;
}

export interface ServiceStatus {
  running: boolean;
  pid: number | null;
  port: number;
  action: ServiceActionState;
}

export interface ServiceActionResult {
  success: boolean;
  scheduled?: boolean;
  message: string;
  action: ServiceActionState;
  status: ServiceStatus;
}

interface ServiceStatusSnapshot {
  running: boolean;
  pid: number | null;
  port: number;
}

const SERVICE_STATUS_CACHE_KEY = 'gateway-service-status-v1';
const DEFAULT_ACTION_STATE: ServiceActionState = {
  action: null,
  phase: 'idle',
  pid: null,
  startedAt: null,
  finishedAt: null,
  lastUpdatedAt: null,
  message: null,
  error: null,
};

function nowIso(): string {
  return new Date().toISOString();
}

function sleepMs(ms: number) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function getActionStateFile(): string {
  return path.join(ensureGuardLayout().stateDir, 'service-action.json');
}

function normalizeActionState(input?: Partial<ServiceActionState> | null): ServiceActionState {
  const phase = input?.phase;
  return {
    action: input?.action === 'start' || input?.action === 'stop' || input?.action === 'restart' ? input.action : null,
    phase: phase === 'running' || phase === 'completed' || phase === 'error' ? phase : 'idle',
    pid: typeof input?.pid === 'number' && Number.isInteger(input.pid) && input.pid > 0 ? input.pid : null,
    startedAt: typeof input?.startedAt === 'string' ? input.startedAt : null,
    finishedAt: typeof input?.finishedAt === 'string' ? input.finishedAt : null,
    lastUpdatedAt: typeof input?.lastUpdatedAt === 'string' ? input.lastUpdatedAt : null,
    message: typeof input?.message === 'string' && input.message.trim() ? input.message : null,
    error: typeof input?.error === 'string' && input.error.trim() ? input.error : null,
  };
}

function saveActionState(next: Partial<ServiceActionState>): ServiceActionState {
  const merged = normalizeActionState({
    ...loadActionState(),
    ...next,
    lastUpdatedAt: next.lastUpdatedAt || nowIso(),
  });
  writeJsonFile(getActionStateFile(), merged);
  return merged;
}

function loadActionState(): ServiceActionState {
  return normalizeActionState(readJsonFile<ServiceActionState | null>(getActionStateFile(), DEFAULT_ACTION_STATE));
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

function runTextCommand(command: string, args: string[], timeout = 10_000): string {
  const result = spawnSync(command, args, {
    stdio: 'pipe',
    encoding: 'utf-8',
    timeout,
    shell: process.platform === 'win32',
    windowsHide: true,
  });
  if (result.error || result.status !== 0) {
    throw new Error(result.error?.message || result.stderr || result.stdout || `exit code ${result.status}`);
  }
  return String(result.stdout || '').trim();
}

function invalidateServiceStatusCache(): void {
  invalidatePersistentCache(SERVICE_STATUS_CACHE_KEY);
}

function getBaseServiceStatus(): ServiceStatusSnapshot {
  return getPersistentCachedValue(SERVICE_STATUS_CACHE_KEY, {
    ttlMs: 2_500,
    staleIfErrorMs: 10_000,
    loader: computeServiceStatusSnapshot,
  });
}

export function getGatewayPort(): number {
  const config = loadConfig();
  const port = getNested(config, ['gateway', 'port']);
  return typeof port === 'number' && port > 0 ? port : 18789;
}

function checkPortListening(port: number): number | null {
  const platform = detectPlatform();
  try {
    if (platform === 'windows') {
      const output = runTextCommand('netstat', ['-ano'], 5_000);
      for (const line of output.split(/\r?\n/)) {
        if (!line.includes(`:${port}`) || !line.includes('LISTENING')) continue;
        const parts = line.trim().split(/\s+/);
        const pid = Number(parts[parts.length - 1]);
        if (Number.isInteger(pid) && pid > 0) return pid;
      }
      return null;
    }

    const output = runTextCommand('lsof', ['-ti', `:${port}`], 5_000);
    const pid = Number(output.split(/\r?\n/)[0]?.trim());
    return Number.isInteger(pid) && pid > 0 ? pid : null;
  } catch {
    return null;
  }
}

function findOpenClawBin(): string | null {
  try {
    const locatorCommand = detectPlatform() === 'windows' ? 'where' : 'which';
    return runTextCommand(locatorCommand, ['openclaw'], 5_000).split(/\r?\n/)[0]?.trim() || null;
  } catch {
    return null;
  }
}

function runOpenClaw(args: string[]): { success: boolean; output: string } {
  const result = spawnSync('openclaw', args, {
    stdio: 'pipe',
    encoding: 'utf-8',
    timeout: 30_000,
    shell: process.platform === 'win32',
    windowsHide: true,
  });
  if (result.error || result.status !== 0) {
    const message = result.error?.message || result.stderr || result.stdout || `exit code ${result.status}`;
    return { success: false, output: String(message).trim() };
  }
  return { success: true, output: String(result.stdout || '').trim() };
}

function computeServiceStatusSnapshot(): ServiceStatusSnapshot {
  const port = getGatewayPort();
  const pid = checkPortListening(port);
  return { running: pid !== null, pid, port };
}

function resolveProjectRoot(): string {
  const modulePath = fileURLToPath(import.meta.url);
  return path.resolve(path.dirname(modulePath), '..');
}

function resolveServiceTaskCommand(action: ServiceActionName): { command: string; args: string[]; cwd: string } | null {
  const rootDir = resolveProjectRoot();
  const argvEntry = process.argv[1] ? path.resolve(process.argv[1]) : null;
  const distEntry = path.join(rootDir, 'dist', 'index.js');
  const srcEntry = path.join(rootDir, 'src', 'index.ts');
  const tsxCli = path.join(rootDir, 'node_modules', 'tsx', 'dist', 'cli.mjs');

  if (argvEntry && argvEntry.endsWith('.ts') && fs.existsSync(tsxCli) && fs.existsSync(srcEntry)) {
    return {
      command: process.execPath,
      args: [tsxCli, srcEntry, 'service-task', '--action', action, '--json'],
      cwd: rootDir,
    };
  }

  if (argvEntry && argvEntry.endsWith('.js') && fs.existsSync(argvEntry)) {
    return {
      command: process.execPath,
      args: [argvEntry, 'service-task', '--action', action, '--json'],
      cwd: rootDir,
    };
  }

  if (fs.existsSync(distEntry)) {
    return {
      command: process.execPath,
      args: [distEntry, 'service-task', '--action', action, '--json'],
      cwd: rootDir,
    };
  }

  if (fs.existsSync(tsxCli) && fs.existsSync(srcEntry)) {
    return {
      command: process.execPath,
      args: [tsxCli, srcEntry, 'service-task', '--action', action, '--json'],
      cwd: rootDir,
    };
  }

  return null;
}

function waitForGatewayState(expectedRunning: boolean, timeoutMs = 15_000, intervalMs = 1_000): ServiceStatusSnapshot {
  const deadline = Date.now() + timeoutMs;
  let latest = computeServiceStatusSnapshot();
  while (Date.now() < deadline) {
    latest = computeServiceStatusSnapshot();
    if (latest.running === expectedRunning) {
      invalidateServiceStatusCache();
      return latest;
    }
    sleepMs(intervalMs);
  }
  invalidateServiceStatusCache();
  return latest;
}

function performStartService(): { success: boolean; message: string } {
  const status = computeServiceStatusSnapshot();
  if (status.running) {
    return { success: false, message: `Gateway 已在运行中（PID: ${status.pid}）。` };
  }

  const bin = findOpenClawBin();
  if (!bin) {
    return { success: false, message: '未检测到 openclaw 命令，请先完成安装。' };
  }

  try {
    const child = spawn('openclaw', ['gateway', 'start'], {
      stdio: 'ignore',
      detached: true,
      shell: process.platform === 'win32',
      windowsHide: true,
    });
    child.unref();
  } catch (error) {
    return { success: false, message: `启动失败: ${error instanceof Error ? error.message : String(error)}` };
  }

  const started = waitForGatewayState(true, 20_000);
  if (started.running) {
    return { success: true, message: `Gateway 已启动（PID: ${started.pid}）。` };
  }

  return { success: false, message: 'Gateway 启动超时，请检查 openclaw gateway 日志。' };
}

function performStopService(): { success: boolean; message: string } {
  const before = computeServiceStatusSnapshot();
  if (!before.running) {
    return { success: true, message: 'Gateway 当前未运行。' };
  }

  const result = runOpenClaw(['gateway', 'stop']);
  if (!result.success) {
    runOpenClaw(['gateway', 'stop', '--force']);
  }

  const stopped = waitForGatewayState(false, 15_000);
  if (!stopped.running) {
    return { success: true, message: 'Gateway 已停止。' };
  }

  return { success: false, message: `Gateway 停止失败，当前 PID: ${stopped.pid}` };
}

function performRestartService(): { success: boolean; message: string } {
  const result = runOpenClaw(['gateway', 'restart']);
  const restarted = waitForGatewayState(true, 20_000);
  if (restarted.running) {
    return { success: true, message: `Gateway 已重启（PID: ${restarted.pid}）。` };
  }

  if (!result.success) {
    const stopped = performStopService();
    if (!stopped.success) return stopped;
    return performStartService();
  }

  return { success: false, message: 'Gateway 重启后未在预期时间内恢复监听，请检查日志。' };
}

export function getServiceActionStatus(): ServiceActionState {
  const state = loadActionState();
  if (state.phase === 'running' && state.pid && !isPidAlive(state.pid) && !state.finishedAt) {
    return saveActionState({
      ...state,
      phase: 'error',
      finishedAt: nowIso(),
      message: '后台任务意外结束，请重新获取状态。',
      error: state.error || '后台任务进程已退出。',
    });
  }
  return state;
}

export function getServiceStatus(): ServiceStatus {
  const snapshot = getBaseServiceStatus();
  return {
    ...snapshot,
    action: getServiceActionStatus(),
  };
}

function scheduleServiceAction(action: ServiceActionName): ServiceActionResult {
  const currentAction = getServiceActionStatus();
  if (currentAction.phase === 'running' && currentAction.pid && isPidAlive(currentAction.pid)) {
    return {
      success: false,
      scheduled: false,
      message: '当前已有 Gateway 后台任务正在执行，请稍后再试。',
      action: currentAction,
      status: getServiceStatus(),
    };
  }

  if (!findOpenClawBin()) {
    const failed = saveActionState({
      action,
      phase: 'error',
      pid: null,
      startedAt: null,
      finishedAt: nowIso(),
      message: '未检测到 openclaw 命令，请先完成安装。',
      error: 'openclaw command not found',
    });
    return {
      success: false,
      scheduled: false,
      message: failed.message || '未检测到 openclaw 命令，请先完成安装。',
      action: failed,
      status: getServiceStatus(),
    };
  }

  const command = resolveServiceTaskCommand(action);
  if (!command) {
    const failed = saveActionState({
      action,
      phase: 'error',
      pid: null,
      startedAt: null,
      finishedAt: nowIso(),
      message: '无法解析 Gateway 后台任务入口。',
      error: 'Unable to resolve service task command.',
    });
    return {
      success: false,
      scheduled: false,
      message: failed.message || '无法解析 Gateway 后台任务入口。',
      action: failed,
      status: getServiceStatus(),
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
        OPENCLAW_GUARD_SERVICE_CHILD: '1',
      },
    });
    child.unref();

    const scheduled = saveActionState({
      action,
      phase: 'running',
      pid: typeof child.pid === 'number' ? child.pid : null,
      startedAt: nowIso(),
      finishedAt: null,
      message: `已在后台发起 Gateway ${action === 'start' ? '启动' : action === 'stop' ? '停止' : '重启'}，请稍候。`,
      error: null,
    });
    invalidateServiceStatusCache();
    return {
      success: true,
      scheduled: true,
      message: scheduled.message || '后台任务已发起。',
      action: scheduled,
      status: getServiceStatus(),
    };
  } catch (error) {
    const failed = saveActionState({
      action,
      phase: 'error',
      pid: null,
      startedAt: null,
      finishedAt: nowIso(),
      message: `无法发起 Gateway ${action === 'start' ? '启动' : action === 'stop' ? '停止' : '重启'}任务。`,
      error: error instanceof Error ? error.message : String(error),
    });
    return {
      success: false,
      scheduled: false,
      message: failed.message || '无法发起后台任务。',
      action: failed,
      status: getServiceStatus(),
    };
  }
}

export function runServiceActionTask(action: ServiceActionName): ServiceActionState {
  const startedAt = nowIso();
  saveActionState({
    action,
    phase: 'running',
    pid: process.pid,
    startedAt,
    finishedAt: null,
    message: `正在执行 Gateway ${action === 'start' ? '启动' : action === 'stop' ? '停止' : '重启'}任务。`,
    error: null,
  });

  invalidateServiceStatusCache();

  const result = action === 'start'
    ? performStartService()
    : action === 'stop'
      ? performStopService()
      : performRestartService();

  invalidateServiceStatusCache();

  return saveActionState({
    action,
    phase: result.success ? 'completed' : 'error',
    pid: process.pid,
    startedAt,
    finishedAt: nowIso(),
    message: result.message,
    error: result.success ? null : result.message,
  });
}

export function startService(): ServiceActionResult {
  return scheduleServiceAction('start');
}

export function stopService(): ServiceActionResult {
  return scheduleServiceAction('stop');
}

export function restartService(): ServiceActionResult {
  return scheduleServiceAction('restart');
}

export function getLogs(lines = 100): string[] {
  const result = runOpenClaw(['logs', '--lines', String(lines)]);
  if (result.success) {
    return result.output.split(/\r?\n/).filter(Boolean);
  }
  return [`获取日志失败: ${result.output}`];
}
