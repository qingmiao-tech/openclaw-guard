import fs from 'node:fs';
import path from 'node:path';
import { addNotification } from './notifications.js';
import { ensureGuardLayout, isoNow, readJsonFile, writeJsonFile } from './guard-state.js';
import { getCronSnapshot, runOpenClawCommand, type CronJobRecord, type CronStatusSummary } from './openclaw-runtime.js';

export interface CronActionResult {
  success: boolean;
  message: string;
  output?: string;
}

export type CronScheduleMode = 'cron' | 'every' | 'at';

export interface CronJobInput {
  jobId?: string;
  name?: string;
  description?: string;
  agentId?: string;
  prompt?: string;
  scheduleMode: CronScheduleMode;
  scheduleValue: string;
  enabled?: boolean;
  timezone?: string;
  model?: string;
  thinking?: 'off' | 'minimal' | 'low' | 'medium' | 'high';
  session?: 'main' | 'isolated';
  wake?: 'now' | 'next-heartbeat';
  timeoutMs?: number;
  timeoutSeconds?: number;
  stagger?: string;
  announce?: boolean;
  bestEffortDeliver?: boolean;
  deleteAfterRun?: boolean;
}

export interface CronOverview {
  snapshotAt: string;
  jobs: CronJobRecord[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
  nextOffset: number | null;
  warnings: string[];
  status: CronStatusSummary;
}

export interface CronOverviewCacheMeta {
  generatedAt: string | null;
  ageMs: number | null;
  freshForMs: number;
  stale: boolean;
  refreshing: boolean;
  source: 'bootstrap' | 'cache' | 'stale';
  lastStartedAt: string | null;
  lastFinishedAt: string | null;
  lastSuccessAt: string | null;
  lastReason: string | null;
  lastError: string | null;
}

export interface CronOverviewWithCache extends CronOverview {
  cache: CronOverviewCacheMeta;
}

interface StoredCronOverviewSnapshot {
  generatedAt: string;
  overview: CronOverview;
}

interface CronRefreshState {
  refreshing: boolean;
  queued: boolean;
  lastStartedAt: string | null;
  lastFinishedAt: string | null;
  lastSuccessAt: string | null;
  lastReason: string | null;
  lastError: string | null;
}

const CRON_OVERVIEW_CACHE_FILE = path.join(ensureGuardLayout().stateDir, 'cron-overview-latest.json');
const CRON_OVERVIEW_FRESH_MS = 30_000;

const cronRefreshState: CronRefreshState = {
  refreshing: false,
  queued: false,
  lastStartedAt: null,
  lastFinishedAt: null,
  lastSuccessAt: null,
  lastReason: null,
  lastError: null,
};

function readStoredCronOverviewSnapshot(): StoredCronOverviewSnapshot | null {
  const snapshot = readJsonFile<StoredCronOverviewSnapshot | null>(CRON_OVERVIEW_CACHE_FILE, null);
  if (!snapshot || typeof snapshot.generatedAt !== 'string' || !snapshot.overview) return null;
  return snapshot;
}

function saveStoredCronOverviewSnapshot(snapshot: StoredCronOverviewSnapshot): StoredCronOverviewSnapshot {
  writeJsonFile(CRON_OVERVIEW_CACHE_FILE, snapshot);
  return snapshot;
}

function buildCronCacheMeta(
  snapshot: StoredCronOverviewSnapshot,
  source: CronOverviewCacheMeta['source'],
  freshForMs: number,
): CronOverviewCacheMeta {
  const generatedAtMs = Date.parse(snapshot.generatedAt);
  const ageMs = Number.isFinite(generatedAtMs) ? Math.max(0, Date.now() - generatedAtMs) : null;
  const stale = ageMs === null || ageMs > freshForMs;
  return {
    generatedAt: snapshot.generatedAt,
    ageMs,
    freshForMs,
    stale,
    refreshing: cronRefreshState.refreshing || cronRefreshState.queued,
    source,
    lastStartedAt: cronRefreshState.lastStartedAt,
    lastFinishedAt: cronRefreshState.lastFinishedAt,
    lastSuccessAt: cronRefreshState.lastSuccessAt,
    lastReason: cronRefreshState.lastReason,
    lastError: cronRefreshState.lastError,
  };
}

function runCronAction(args: string[], successMessage: string, failureMessage: string): CronActionResult {
  const result = runOpenClawCommand(['cron', ...args]);
  if (result.success) {
    try {
      refreshCronOverviewSnapshot('cron-action');
    } catch {
      invalidateCronOverviewSnapshot();
    }
    addNotification({
      type: 'cron',
      source: 'cron-ui',
      title: 'Cron action succeeded',
      message: successMessage,
      severity: 'success',
      meta: { args },
    });
    return {
      success: true,
      message: successMessage,
      output: result.stdout.trim(),
    };
  }

  addNotification({
    type: 'cron',
    source: 'cron-ui',
    title: 'Cron action failed',
    message: `${failureMessage}: ${result.error || result.stderr || result.stdout}`,
    severity: 'error',
    meta: { args },
  });
  return {
    success: false,
    message: failureMessage,
    output: result.error || result.stderr || result.stdout,
  };
}

function pushArg(args: string[], flag: string, value: string | number | undefined | null): void {
  if (value === undefined || value === null) return;
  const text = String(value).trim();
  if (!text) return;
  args.push(flag, text);
}

function normalizeScheduleMode(input: string): CronScheduleMode {
  return input === 'every' || input === 'at' ? input : 'cron';
}

function buildScheduleArgs(args: string[], input: CronJobInput): void {
  const scheduleMode = normalizeScheduleMode(input.scheduleMode);
  const scheduleValue = String(input.scheduleValue || '').trim();
  if (!scheduleValue) {
    throw new Error('scheduleValue is required');
  }

  if (scheduleMode === 'every') {
    args.push('--every', scheduleValue);
    return;
  }
  if (scheduleMode === 'at') {
    args.push('--at', scheduleValue);
    return;
  }
  args.push('--cron', scheduleValue);
}

function buildCronMutationArgs(input: CronJobInput, mode: 'create' | 'update'): string[] {
  const args: string[] = [];
  if (mode === 'update') {
    const jobId = String(input.jobId || '').trim();
    if (!jobId) throw new Error('jobId is required');
    args.push('edit', jobId);
  } else {
    args.push('add');
  }

  buildScheduleArgs(args, input);

  pushArg(args, '--name', input.name);
  pushArg(args, '--description', input.description);
  pushArg(args, '--message', input.prompt);
  pushArg(args, '--tz', input.timezone);
  pushArg(args, '--model', input.model);
  pushArg(args, '--thinking', input.thinking);
  pushArg(args, '--session', input.session);
  pushArg(args, '--wake', input.wake);

  if (mode === 'update') {
    if (input.agentId === '') {
      args.push('--clear-agent');
    } else {
      pushArg(args, '--agent', input.agentId);
    }
  } else {
    pushArg(args, '--agent', input.agentId);
  }

  if (typeof input.timeoutMs === 'number' && Number.isFinite(input.timeoutMs) && input.timeoutMs > 0) {
    pushArg(args, '--timeout', input.timeoutMs);
  }
  if (typeof input.timeoutSeconds === 'number' && Number.isFinite(input.timeoutSeconds) && input.timeoutSeconds > 0) {
    pushArg(args, '--timeout-seconds', input.timeoutSeconds);
  }

  const stagger = String(input.stagger || '').trim();
  if (stagger === '0') {
    args.push('--exact');
  } else {
    pushArg(args, '--stagger', stagger);
  }

  if (mode === 'update') {
    if (input.enabled === true) args.push('--enable');
    if (input.enabled === false) args.push('--disable');
  } else if (input.enabled === false) {
    args.push('--disabled');
  }

  if (input.announce === true) {
    args.push('--announce');
  } else if (mode === 'update' && input.announce === false) {
    args.push('--no-deliver');
  }

  if (input.bestEffortDeliver === true) {
    args.push('--best-effort-deliver');
  } else if (mode === 'update' && input.bestEffortDeliver === false) {
    args.push('--no-best-effort-deliver');
  }

  if (input.deleteAfterRun === true) {
    args.push('--delete-after-run');
  } else if (mode === 'update' && input.deleteAfterRun === false) {
    args.push('--keep-after-run');
  }

  return args;
}

export function buildCronOverview(): CronOverview {
  const snapshot = getCronSnapshot();
  const warnings = [...snapshot.warnings, ...(snapshot.status?.warnings || [])]
    .map((item) => item.trim())
    .filter(Boolean);
  return {
    snapshotAt: snapshot.capturedAt,
    jobs: snapshot.jobs,
    total: snapshot.total,
    offset: snapshot.offset,
    limit: snapshot.limit,
    hasMore: snapshot.hasMore,
    nextOffset: snapshot.nextOffset,
    warnings,
    status: snapshot.status || {
      enabled: null,
      storePath: null,
      jobsCount: null,
      schedulerNextWakeAt: null,
      warnings: [],
      raw: null,
    },
  };
}

function scheduleCronOverviewRefresh(reason: string): void {
  if (cronRefreshState.refreshing || cronRefreshState.queued) return;
  cronRefreshState.queued = true;
  setTimeout(() => {
    cronRefreshState.queued = false;
    try {
      refreshCronOverviewSnapshot(reason);
    } catch {
      // Keep serving the last good snapshot.
    }
  }, 0);
}

export function refreshCronOverviewSnapshot(reason = 'manual'): StoredCronOverviewSnapshot {
  cronRefreshState.refreshing = true;
  cronRefreshState.lastStartedAt = isoNow();
  cronRefreshState.lastReason = reason;
  cronRefreshState.lastError = null;

  try {
    const snapshot = saveStoredCronOverviewSnapshot({
      generatedAt: isoNow(),
      overview: buildCronOverview(),
    });
    cronRefreshState.lastFinishedAt = isoNow();
    cronRefreshState.lastSuccessAt = cronRefreshState.lastFinishedAt;
    return snapshot;
  } catch (error) {
    cronRefreshState.lastFinishedAt = isoNow();
    cronRefreshState.lastError = error instanceof Error ? error.message : String(error);
    throw error;
  } finally {
    cronRefreshState.refreshing = false;
  }
}

export function getCachedCronOverview(freshForMs = CRON_OVERVIEW_FRESH_MS): CronOverviewWithCache {
  const existing = readStoredCronOverviewSnapshot();
  if (!existing) {
    const snapshot = refreshCronOverviewSnapshot('bootstrap');
    return {
      ...snapshot.overview,
      cache: buildCronCacheMeta(snapshot, 'bootstrap', freshForMs),
    };
  }

  const generatedAtMs = Date.parse(existing.generatedAt);
  const ageMs = Number.isFinite(generatedAtMs) ? Math.max(0, Date.now() - generatedAtMs) : Number.POSITIVE_INFINITY;
  const stale = !Number.isFinite(ageMs) || ageMs > freshForMs;
  if (stale) scheduleCronOverviewRefresh('stale-read');

  return {
    ...existing.overview,
    cache: buildCronCacheMeta(existing, stale ? 'stale' : 'cache', freshForMs),
  };
}

export function getCronOverview(): CronOverview {
  return buildCronOverview();
}

export function invalidateCronOverviewSnapshot(): void {
  try {
    if (fs.existsSync(CRON_OVERVIEW_CACHE_FILE)) {
      fs.unlinkSync(CRON_OVERVIEW_CACHE_FILE);
    }
  } catch {
    // ignore cache cleanup failures
  }
}

export function enableCronJob(jobId: string): CronActionResult {
  return runCronAction(['enable', jobId], `Enabled cron job ${jobId}`, `Failed to enable cron job ${jobId}`);
}

export function disableCronJob(jobId: string): CronActionResult {
  return runCronAction(['disable', jobId], `Disabled cron job ${jobId}`, `Failed to disable cron job ${jobId}`);
}

export function runCronJob(jobId: string): CronActionResult {
  return runCronAction(['run', jobId], `Triggered cron job ${jobId}`, `Failed to trigger cron job ${jobId}`);
}

export function removeCronJob(jobId: string): CronActionResult {
  return runCronAction(['remove', jobId], `Removed cron job ${jobId}`, `Failed to remove cron job ${jobId}`);
}

export function createCronJob(input: CronJobInput): CronActionResult {
  try {
    const args = buildCronMutationArgs(input, 'create');
    const scheduleLabel = `${normalizeScheduleMode(input.scheduleMode)} ${String(input.scheduleValue || '').trim()}`;
    return runCronAction(
      args,
      `Created cron job${input.name ? ` ${input.name}` : ''} (${scheduleLabel})`,
      `Failed to create cron job${input.name ? ` ${input.name}` : ''}`,
    );
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

export function updateCronJob(input: CronJobInput): CronActionResult {
  try {
    const args = buildCronMutationArgs(input, 'update');
    const jobId = String(input.jobId || '').trim();
    return runCronAction(
      args,
      `Updated cron job ${jobId}`,
      `Failed to update cron job ${jobId}`,
    );
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
