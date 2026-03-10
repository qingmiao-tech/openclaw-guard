import fs from 'node:fs';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { ensureGuardLayout, readJsonFile, writeJsonFile } from './guard-state.js';
import {
  clearWebRuntimeRecord,
  getWebBackgroundStatus,
  startWebBackgroundService,
  type WebBackgroundActionResult,
} from './web-background.js';
import { runServiceActionTask } from './service-mgr.js';

export type GuardRestartPhase = 'idle' | 'running' | 'completed' | 'error';

export interface GuardRestartState {
  phase: GuardRestartPhase;
  pid: number | null;
  port: number | null;
  targetPid: number | null;
  newPid: number | null;
  restartGateway: boolean;
  startedAt: string | null;
  finishedAt: string | null;
  lastUpdatedAt: string | null;
  message: string | null;
  error: string | null;
}

export interface GuardRestartResult {
  success: boolean;
  scheduled?: boolean;
  message: string;
  state: GuardRestartState;
}

export interface GuardRestartOptions {
  port: number;
  currentPid?: number;
  restartGateway?: boolean;
}

export interface GuardRestartTaskOptions extends GuardRestartOptions {
  responseGraceMs?: number;
}

interface TaskCommand {
  command: string;
  args: string[];
  cwd: string;
}

interface GuardRestartTaskDeps {
  wait: (ms: number) => Promise<void>;
  isPidAlive: (pid: number | null | undefined) => boolean;
  stopPid: (pid: number) => boolean;
  clearRuntimeRecord: (expectedPid?: number) => void;
  startBackground: (options: { port: number }) => Promise<WebBackgroundActionResult>;
  runGatewayRestart: () => { phase: string; message: string | null; error: string | null };
}

const DEFAULT_STATE: GuardRestartState = {
  phase: 'idle',
  pid: null,
  port: null,
  targetPid: null,
  newPid: null,
  restartGateway: false,
  startedAt: null,
  finishedAt: null,
  lastUpdatedAt: null,
  message: null,
  error: null,
};

function nowIso(): string {
  return new Date().toISOString();
}

function getProjectRoot(): string {
  const override = process.env.OPENCLAW_GUARD_PROJECT_ROOT;
  if (override) return path.resolve(override);
  const modulePath = fileURLToPath(import.meta.url);
  return path.resolve(path.dirname(modulePath), '..');
}

function getStateFile(): string {
  return path.join(ensureGuardLayout().stateDir, 'guard-restart.json');
}

function normalizeState(input?: Partial<GuardRestartState> | null): GuardRestartState {
  const phase = input?.phase;
  return {
    phase: phase === 'running' || phase === 'completed' || phase === 'error' ? phase : 'idle',
    pid: typeof input?.pid === 'number' && Number.isInteger(input.pid) && input.pid > 0 ? input.pid : null,
    port: typeof input?.port === 'number' && Number.isFinite(input.port) && input.port > 0 ? input.port : null,
    targetPid: typeof input?.targetPid === 'number' && Number.isInteger(input.targetPid) && input.targetPid > 0 ? input.targetPid : null,
    newPid: typeof input?.newPid === 'number' && Number.isInteger(input.newPid) && input.newPid > 0 ? input.newPid : null,
    restartGateway: input?.restartGateway === true,
    startedAt: typeof input?.startedAt === 'string' ? input.startedAt : null,
    finishedAt: typeof input?.finishedAt === 'string' ? input.finishedAt : null,
    lastUpdatedAt: typeof input?.lastUpdatedAt === 'string' ? input.lastUpdatedAt : null,
    message: typeof input?.message === 'string' && input.message.trim() ? input.message : null,
    error: typeof input?.error === 'string' && input.error.trim() ? input.error : null,
  };
}

function loadState(): GuardRestartState {
  return normalizeState(readJsonFile<GuardRestartState | null>(getStateFile(), DEFAULT_STATE));
}

function saveState(next: Partial<GuardRestartState>): GuardRestartState {
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
      execFileSync('taskkill', ['/PID', String(pid), '/T', '/F'], {
        encoding: 'utf-8',
        windowsHide: true,
      });
      return true;
    }

    process.kill(pid, 'SIGTERM');
    return true;
  } catch {
    return false;
  }
}

function resolveTaskCommand(): TaskCommand | null {
  const rootDir = getProjectRoot();
  const argvEntry = process.argv[1] ? path.resolve(process.argv[1]) : null;
  const distEntry = path.join(rootDir, 'dist', 'index.js');
  const srcEntry = path.join(rootDir, 'src', 'index.ts');
  const tsxCli = path.join(rootDir, 'node_modules', 'tsx', 'dist', 'cli.mjs');

  if (argvEntry && argvEntry.endsWith('.ts') && fs.existsSync(tsxCli) && fs.existsSync(srcEntry)) {
    return {
      command: process.execPath,
      args: [tsxCli, srcEntry, 'guard-task'],
      cwd: rootDir,
    };
  }

  if (argvEntry && argvEntry.endsWith('.js') && fs.existsSync(argvEntry)) {
    return {
      command: process.execPath,
      args: [argvEntry, 'guard-task'],
      cwd: rootDir,
    };
  }

  if (fs.existsSync(distEntry)) {
    return {
      command: process.execPath,
      args: [distEntry, 'guard-task'],
      cwd: rootDir,
    };
  }

  if (fs.existsSync(tsxCli) && fs.existsSync(srcEntry)) {
    return {
      command: process.execPath,
      args: [tsxCli, srcEntry, 'guard-task'],
      cwd: rootDir,
    };
  }

  return null;
}

function resolveTargetPid(port: number, currentPid?: number): number | null {
  if (Number.isInteger(currentPid) && currentPid && currentPid > 0) return currentPid;
  const status = getWebBackgroundStatus(port);
  return status.running && status.pid ? status.pid : null;
}

export function getGuardRestartStatus(): GuardRestartState {
  const state = loadState();
  if (state.phase === 'running' && state.pid && !isPidAlive(state.pid) && !state.finishedAt) {
    return saveState({
      ...state,
      phase: 'error',
      finishedAt: nowIso(),
      message: 'Guard 重启后台任务意外结束，请重试。',
      error: state.error || 'Guard restart child process exited unexpectedly.',
    });
  }
  return state;
}

export function scheduleGuardRestart(options: GuardRestartOptions): GuardRestartResult {
  const current = getGuardRestartStatus();
  if (current.phase === 'running' && current.pid && isPidAlive(current.pid)) {
    return {
      success: false,
      scheduled: false,
      message: '当前已有 Guard 完整重启任务在执行，请稍后再试。',
      state: current,
    };
  }

  const command = resolveTaskCommand();
  if (!command) {
    const failed = saveState({
      phase: 'error',
      pid: null,
      port: options.port,
      targetPid: null,
      newPid: null,
      restartGateway: options.restartGateway === true,
      startedAt: null,
      finishedAt: nowIso(),
      message: '无法解析 Guard 重启任务入口。',
      error: 'Unable to resolve guard restart task command.',
    });
    return {
      success: false,
      scheduled: false,
      message: failed.message || '无法解析 Guard 重启任务入口。',
      state: failed,
    };
  }

  const targetPid = resolveTargetPid(options.port, options.currentPid);

  try {
    const args = [
      ...command.args,
      '--port',
      String(options.port),
      '--json',
    ];
    if (targetPid) {
      args.push('--current-pid', String(targetPid));
    }
    if (options.restartGateway === true) {
      args.push('--restart-gateway');
    }

    const child = spawn(command.command, args, {
      cwd: command.cwd,
      detached: true,
      stdio: 'ignore',
      windowsHide: true,
      env: {
        ...process.env,
        OPENCLAW_GUARD_RESTART_CHILD: '1',
      },
    });
    child.unref();

    const scheduled = saveState({
      phase: 'running',
      pid: typeof child.pid === 'number' ? child.pid : null,
      port: options.port,
      targetPid,
      newPid: null,
      restartGateway: options.restartGateway === true,
      startedAt: nowIso(),
      finishedAt: null,
      message: targetPid
        ? `已在后台发起 Guard 完整重启，将接管 PID ${targetPid}。`
        : '未检测到现有 Guard Web 实例，已切换为后台启动流程。',
      error: null,
    });

    return {
      success: true,
      scheduled: true,
      message: scheduled.message || 'Guard 重启任务已调度。',
      state: scheduled,
    };
  } catch (error) {
    const failed = saveState({
      phase: 'error',
      pid: null,
      port: options.port,
      targetPid,
      newPid: null,
      restartGateway: options.restartGateway === true,
      startedAt: null,
      finishedAt: nowIso(),
      message: '无法发起 Guard 完整重启任务。',
      error: error instanceof Error ? error.message : String(error),
    });
    return {
      success: false,
      scheduled: false,
      message: failed.message || '无法发起 Guard 完整重启任务。',
      state: failed,
    };
  }
}

function createDefaultTaskDeps(): GuardRestartTaskDeps {
  return {
    wait: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    isPidAlive,
    stopPid: killPid,
    clearRuntimeRecord: clearWebRuntimeRecord,
    startBackground: ({ port }) => startWebBackgroundService({ port }),
    runGatewayRestart: () => runServiceActionTask('restart'),
  };
}

async function waitForPidExit(
  pid: number,
  deps: GuardRestartTaskDeps,
  timeoutMs = 15_000,
  intervalMs = 250,
): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (!deps.isPidAlive(pid)) return true;
    await deps.wait(intervalMs);
  }
  return !deps.isPidAlive(pid);
}

export async function runGuardRestartTask(
  options: GuardRestartTaskOptions,
  overrides: Partial<GuardRestartTaskDeps> = {},
): Promise<GuardRestartState> {
  const deps: GuardRestartTaskDeps = {
    ...createDefaultTaskDeps(),
    ...overrides,
  };

  const targetPid = resolveTargetPid(options.port, options.currentPid);
  const startedAt = nowIso();

  saveState({
    phase: 'running',
    pid: process.pid,
    port: options.port,
    targetPid,
    newPid: null,
    restartGateway: options.restartGateway === true,
    startedAt,
    finishedAt: null,
    message: targetPid
      ? `准备完整重启 Guard，目标 PID ${targetPid}。`
      : '准备启动新的 Guard Web 托管实例。',
    error: null,
  });

  await deps.wait(Math.max(0, options.responseGraceMs ?? 600));

  if (targetPid && deps.isPidAlive(targetPid)) {
    const stopped = deps.stopPid(targetPid);
    if (!stopped) {
      return saveState({
        phase: 'error',
        port: options.port,
        targetPid,
        newPid: null,
        restartGateway: options.restartGateway === true,
        startedAt,
        finishedAt: nowIso(),
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
        restartGateway: options.restartGateway === true,
        startedAt,
        finishedAt: nowIso(),
        message: `旧的 Guard Web 进程 (PID ${targetPid}) 在预期时间内没有退出。`,
        error: `Guard Web process ${targetPid} did not exit within timeout.`,
      });
    }
  }

  deps.clearRuntimeRecord(targetPid || undefined);

  const background = await deps.startBackground({ port: options.port });
  const newPid = background.pid ?? background.status?.pid ?? null;
  if (!background.success || !background.status?.running || !newPid) {
    return saveState({
      phase: 'error',
      port: options.port,
      targetPid,
      newPid: null,
      restartGateway: options.restartGateway === true,
      startedAt,
      finishedAt: nowIso(),
      message: background.message || '新的 Guard Web 实例启动失败。',
      error: background.message || 'Failed to start the new Guard Web instance.',
    });
  }

  if (options.restartGateway === true) {
    const gatewayResult = deps.runGatewayRestart();
    if (gatewayResult.phase !== 'completed') {
      return saveState({
        phase: 'error',
        port: options.port,
        targetPid,
        newPid,
        restartGateway: true,
        startedAt,
        finishedAt: nowIso(),
        message: gatewayResult.message || 'Guard 已重启，但 Gateway 重启失败。',
        error: gatewayResult.error || gatewayResult.message || 'Gateway restart failed after Guard restart.',
      });
    }

    return saveState({
      phase: 'completed',
      port: options.port,
      targetPid,
      newPid,
      restartGateway: true,
      startedAt,
      finishedAt: nowIso(),
      message: `Guard 已完整重启，新实例 PID ${newPid}；Gateway 也已完成重启。`,
      error: null,
    });
  }

  return saveState({
    phase: 'completed',
    port: options.port,
    targetPid,
    newPid,
    restartGateway: false,
    startedAt,
    finishedAt: nowIso(),
    message: `Guard 已完整重启，新实例 PID ${newPid}。`,
    error: null,
  });
}
