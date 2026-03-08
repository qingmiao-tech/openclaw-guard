import { addNotification } from './notifications.js';
import { getCronSnapshot, runOpenClawCommand, type CronJobRecord, type CronStatusSummary } from './openclaw-runtime.js';

export interface CronActionResult {
  success: boolean;
  message: string;
  output?: string;
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
