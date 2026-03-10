import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { getDashboardOverview } from './dashboard.js';
import { getGitSyncStatus } from './git-sync.js';
import { ensureGuardLayout, readJsonFile, writeJsonFile } from './guard-state.js';
import { detectOpenClaw } from './openclaw.js';
import { getCronOverview } from './cron-ui.js';
import { getServiceStatus } from './service-mgr.js';

type CachePrewarmPhase = 'idle' | 'scheduled' | 'running' | 'completed' | 'error';

export interface CachePrewarmTaskStatus {
  id: string;
  label: string;
  startedAt: string | null;
  finishedAt: string | null;
  durationMs: number | null;
  success: boolean | null;
  error: string | null;
}

export interface CachePrewarmStatus {
  phase: CachePrewarmPhase;
  trigger: string | null;
  pid: number | null;
  scheduledAt: string | null;
  startedAt: string | null;
  finishedAt: string | null;
  lastDurationMs: number | null;
  nextAllowedAt: string | null;
  lastError: string | null;
  tasks: CachePrewarmTaskStatus[];
}

export interface SpawnCachePrewarmResult {
  scheduled: boolean;
  message: string;
  status: CachePrewarmStatus;
}

interface CachePrewarmTask {
  id: string;
  label: string;
  run: () => void;
}

const PREWARM_INTERVAL_MS = 60_000;
const PREWARM_START_DELAY_MS = 300;

const PREWARM_TASKS: CachePrewarmTask[] = [
  {
    id: 'openclaw-status',
    label: 'OpenClaw status',
    run: () => {
      detectOpenClaw();
    },
  },
  {
    id: 'gateway-status',
    label: 'Gateway service status',
    run: () => {
      getServiceStatus();
    },
  },
  {
    id: 'dashboard-overview',
    label: 'Dashboard overview',
    run: () => {
      getDashboardOverview();
    },
  },
  {
    id: 'cron-overview',
    label: 'Cron overview',
    run: () => {
      getCronOverview();
    },
  },
  {
    id: 'git-sync-status',
    label: 'Git sync status',
    run: () => {
      getGitSyncStatus();
    },
  },
];

const DEFAULT_STATUS: CachePrewarmStatus = {
  phase: 'idle',
  trigger: null,
  pid: null,
  scheduledAt: null,
  startedAt: null,
  finishedAt: null,
  lastDurationMs: null,
  nextAllowedAt: null,
  lastError: null,
  tasks: PREWARM_TASKS.map((task) => ({
    id: task.id,
    label: task.label,
    startedAt: null,
    finishedAt: null,
    durationMs: null,
    success: null,
    error: null,
  })),
};

function getStatusFile(): string {
  return path.join(ensureGuardLayout().stateDir, 'cache-prewarm.json');
}

function buildDefaultTaskStatuses(): CachePrewarmTaskStatus[] {
  return DEFAULT_STATUS.tasks.map((task) => ({ ...task }));
}

function normalizeTaskStatuses(input: unknown): CachePrewarmTaskStatus[] {
  const source = Array.isArray(input) ? input : [];
  const sourceMap = new Map<string, CachePrewarmTaskStatus>();

  for (const item of source) {
    if (!item || typeof item !== 'object') continue;
    const record = item as Partial<CachePrewarmTaskStatus>;
    if (typeof record.id !== 'string' || !record.id.trim()) continue;
    sourceMap.set(record.id, {
      id: record.id,
      label: typeof record.label === 'string' && record.label.trim() ? record.label : record.id,
      startedAt: typeof record.startedAt === 'string' ? record.startedAt : null,
      finishedAt: typeof record.finishedAt === 'string' ? record.finishedAt : null,
      durationMs: typeof record.durationMs === 'number' && Number.isFinite(record.durationMs) ? record.durationMs : null,
      success: typeof record.success === 'boolean' ? record.success : null,
      error: typeof record.error === 'string' && record.error.trim() ? record.error : null,
    });
  }

  return PREWARM_TASKS.map((task) => {
    const existing = sourceMap.get(task.id);
    return existing
      ? { ...existing, id: task.id, label: task.label }
      : {
          id: task.id,
          label: task.label,
          startedAt: null,
          finishedAt: null,
          durationMs: null,
          success: null,
          error: null,
        };
  });
}

function normalizeStatus(input?: Partial<CachePrewarmStatus> | null): CachePrewarmStatus {
  const phase = input?.phase;
  return {
    phase: phase === 'scheduled' || phase === 'running' || phase === 'completed' || phase === 'error' ? phase : 'idle',
    trigger: typeof input?.trigger === 'string' ? input.trigger : null,
    pid: typeof input?.pid === 'number' && Number.isInteger(input.pid) && input.pid > 0 ? input.pid : null,
    scheduledAt: typeof input?.scheduledAt === 'string' ? input.scheduledAt : null,
    startedAt: typeof input?.startedAt === 'string' ? input.startedAt : null,
    finishedAt: typeof input?.finishedAt === 'string' ? input.finishedAt : null,
    lastDurationMs: typeof input?.lastDurationMs === 'number' && Number.isFinite(input.lastDurationMs) ? input.lastDurationMs : null,
    nextAllowedAt: typeof input?.nextAllowedAt === 'string' ? input.nextAllowedAt : null,
    lastError: typeof input?.lastError === 'string' && input.lastError.trim() ? input.lastError : null,
    tasks: normalizeTaskStatuses(input?.tasks),
  };
}

function saveStatus(status: CachePrewarmStatus): CachePrewarmStatus {
  const normalized = normalizeStatus(status);
  writeJsonFile(getStatusFile(), normalized);
  return normalized;
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

function resolveProjectRoot(): string {
  const modulePath = fileURLToPath(import.meta.url);
  return path.resolve(path.dirname(modulePath), '..');
}

function resolvePrewarmCommand(trigger: string): { command: string; args: string[]; cwd: string } | null {
  const rootDir = resolveProjectRoot();
  const argvEntry = process.argv[1] ? path.resolve(process.argv[1]) : null;
  const distEntry = path.join(rootDir, 'dist', 'index.js');
  const srcEntry = path.join(rootDir, 'src', 'index.ts');
  const tsxCli = path.join(rootDir, 'node_modules', 'tsx', 'dist', 'cli.mjs');

  if (argvEntry && argvEntry.endsWith('.ts') && fs.existsSync(tsxCli) && fs.existsSync(srcEntry)) {
    return {
      command: process.execPath,
      args: [tsxCli, srcEntry, 'cache-prewarm', '--trigger', trigger, '--json'],
      cwd: rootDir,
    };
  }

  if (argvEntry && argvEntry.endsWith('.js') && fs.existsSync(argvEntry)) {
    return {
      command: process.execPath,
      args: [argvEntry, 'cache-prewarm', '--trigger', trigger, '--json'],
      cwd: rootDir,
    };
  }

  if (fs.existsSync(distEntry)) {
    return {
      command: process.execPath,
      args: [distEntry, 'cache-prewarm', '--trigger', trigger, '--json'],
      cwd: rootDir,
    };
  }

  if (fs.existsSync(tsxCli) && fs.existsSync(srcEntry)) {
    return {
      command: process.execPath,
      args: [tsxCli, srcEntry, 'cache-prewarm', '--trigger', trigger, '--json'],
      cwd: rootDir,
    };
  }

  return null;
}

export function getCachePrewarmStatus(): CachePrewarmStatus {
  return normalizeStatus(readJsonFile<CachePrewarmStatus | null>(getStatusFile(), DEFAULT_STATUS));
}

export function spawnCachePrewarm(trigger = 'server-start'): SpawnCachePrewarmResult {
  const current = getCachePrewarmStatus();
  const now = Date.now();

  if ((current.phase === 'scheduled' || current.phase === 'running') && current.pid && isPidAlive(current.pid)) {
    return {
      scheduled: false,
      message: `Cache prewarm is already ${current.phase}.`,
      status: current,
    };
  }

  const nextAllowedAtMs = current.nextAllowedAt ? Date.parse(current.nextAllowedAt) : Number.NaN;
  if (Number.isFinite(nextAllowedAtMs) && nextAllowedAtMs > now) {
    return {
      scheduled: false,
      message: 'Cache prewarm was completed recently and is still fresh.',
      status: current,
    };
  }

  const command = resolvePrewarmCommand(trigger);
  if (!command) {
    const failed = saveStatus({
      ...current,
      phase: 'error',
      trigger,
      pid: null,
      scheduledAt: new Date(now).toISOString(),
      startedAt: null,
      finishedAt: new Date(now).toISOString(),
      lastDurationMs: 0,
      nextAllowedAt: null,
      lastError: 'Unable to resolve the cache prewarm command.',
      tasks: buildDefaultTaskStatuses(),
    });
    return {
      scheduled: false,
      message: failed.lastError || 'Unable to resolve the cache prewarm command.',
      status: failed,
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
        OPENCLAW_GUARD_PREWARM_CHILD: '1',
      },
    });
    child.unref();

    const scheduled = saveStatus({
      phase: 'scheduled',
      trigger,
      pid: typeof child.pid === 'number' ? child.pid : null,
      scheduledAt: new Date(now).toISOString(),
      startedAt: null,
      finishedAt: null,
      lastDurationMs: null,
      nextAllowedAt: null,
      lastError: null,
      tasks: buildDefaultTaskStatuses(),
    });

    return {
      scheduled: true,
      message: `Cache prewarm scheduled (pid ${scheduled.pid ?? 'unknown'}).`,
      status: scheduled,
    };
  } catch (error) {
    const failed = saveStatus({
      ...current,
      phase: 'error',
      trigger,
      pid: null,
      scheduledAt: new Date(now).toISOString(),
      startedAt: null,
      finishedAt: new Date(now).toISOString(),
      lastDurationMs: 0,
      nextAllowedAt: null,
      lastError: error instanceof Error ? error.message : String(error),
      tasks: buildDefaultTaskStatuses(),
    });
    return {
      scheduled: false,
      message: failed.lastError || 'Failed to schedule cache prewarm.',
      status: failed,
    };
  }
}

export function runCachePrewarm(trigger = 'manual'): CachePrewarmStatus {
  const current = getCachePrewarmStatus();
  if ((current.phase === 'scheduled' || current.phase === 'running') && current.pid && current.pid !== process.pid && isPidAlive(current.pid)) {
    return current;
  }

  const tasks = buildDefaultTaskStatuses();
  const startedAt = new Date().toISOString();
  const startedMs = Date.now();

  saveStatus({
    phase: 'running',
    trigger,
    pid: process.pid,
    scheduledAt: current.scheduledAt || startedAt,
    startedAt,
    finishedAt: null,
    lastDurationMs: null,
    nextAllowedAt: null,
    lastError: null,
    tasks,
  });

  let firstError: string | null = null;

  for (const task of PREWARM_TASKS) {
    const taskStatus = tasks.find((item) => item.id === task.id);
    if (!taskStatus) continue;

    const taskStartedMs = Date.now();
    taskStatus.startedAt = new Date(taskStartedMs).toISOString();
    taskStatus.finishedAt = null;
    taskStatus.durationMs = null;
    taskStatus.success = null;
    taskStatus.error = null;
    saveStatus({
      phase: 'running',
      trigger,
      pid: process.pid,
      scheduledAt: current.scheduledAt || startedAt,
      startedAt,
      finishedAt: null,
      lastDurationMs: Date.now() - startedMs,
      nextAllowedAt: null,
      lastError: firstError,
      tasks,
    });

    try {
      task.run();
      taskStatus.success = true;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      taskStatus.success = false;
      taskStatus.error = message;
      if (!firstError) firstError = message;
    }

    taskStatus.finishedAt = new Date().toISOString();
    taskStatus.durationMs = Date.now() - taskStartedMs;
    saveStatus({
      phase: 'running',
      trigger,
      pid: process.pid,
      scheduledAt: current.scheduledAt || startedAt,
      startedAt,
      finishedAt: null,
      lastDurationMs: Date.now() - startedMs,
      nextAllowedAt: null,
      lastError: firstError,
      tasks,
    });
  }

  const finishedMs = Date.now();
  return saveStatus({
    phase: firstError ? 'error' : 'completed',
    trigger,
    pid: process.pid,
    scheduledAt: current.scheduledAt || startedAt,
    startedAt,
    finishedAt: new Date(finishedMs).toISOString(),
    lastDurationMs: finishedMs - startedMs,
    nextAllowedAt: new Date(finishedMs + PREWARM_INTERVAL_MS).toISOString(),
    lastError: firstError,
    tasks,
  });
}

export function scheduleServerCachePrewarm(trigger = 'server-start'): void {
  setTimeout(() => {
    try {
      const result = spawnCachePrewarm(trigger);
      if (result.scheduled) {
        console.log(`[Guard] Cache prewarm scheduled: pid=${result.status.pid ?? 'unknown'}`);
      } else {
        console.log(`[Guard] Cache prewarm skipped: ${result.message}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`[Guard] Cache prewarm scheduling failed: ${message}`);
    }
  }, PREWARM_START_DELAY_MS);
}
