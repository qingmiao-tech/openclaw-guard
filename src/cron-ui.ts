import { addNotification } from './notifications.js';
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
  warnings: string[];
  status: CronStatusSummary;
}

function runCronAction(args: string[], successMessage: string, failureMessage: string): CronActionResult {
  const result = runOpenClawCommand(['cron', ...args]);
  if (result.success) {
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

export function getCronOverview(): CronOverview {
  const snapshot = getCronSnapshot();
  const warnings = [...snapshot.warnings, ...(snapshot.status?.warnings || [])]
    .map((item) => item.trim())
    .filter(Boolean);
  return {
    snapshotAt: snapshot.capturedAt,
    jobs: snapshot.jobs,
    warnings,
    status: snapshot.status || {
      enabled: null,
      storePath: null,
      schedulerNextWakeAt: null,
      warnings: [],
      raw: null,
    },
  };
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
