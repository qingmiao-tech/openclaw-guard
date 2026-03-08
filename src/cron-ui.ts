import { addNotification } from './notifications.js';
import { getCronSnapshot, runOpenClawCommand, type CronJobRecord } from './openclaw-runtime.js';

export interface CronActionResult {
  success: boolean;
  message: string;
  output?: string;
}

export interface CronOverview {
  snapshotAt: string;
  jobs: CronJobRecord[];
  warnings: string[];
}

function runCronAction(args: string[], successMessage: string, failureMessage: string): CronActionResult {
  const result = runOpenClawCommand(['cron', ...args]);
  if (result.success) {
    addNotification({
      type: 'cron',
      source: 'cron-ui',
      title: 'Cron 操作成功',
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
    title: 'Cron 操作失败',
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
  return {
    snapshotAt: snapshot.capturedAt,
    jobs: snapshot.jobs,
    warnings: snapshot.warnings,
  };
}

export function enableCronJob(jobId: string): CronActionResult {
  return runCronAction(['enable', jobId], `已启用定时任务 ${jobId}`, `启用定时任务 ${jobId} 失败`);
}

export function disableCronJob(jobId: string): CronActionResult {
  return runCronAction(['disable', jobId], `已停用定时任务 ${jobId}`, `停用定时任务 ${jobId} 失败`);
}

export function runCronJob(jobId: string): CronActionResult {
  return runCronAction(['run', jobId], `已触发定时任务 ${jobId}`, `触发定时任务 ${jobId} 失败`);
}

export function removeCronJob(jobId: string): CronActionResult {
  return runCronAction(['remove', jobId], `已删除定时任务 ${jobId}`, `删除定时任务 ${jobId} 失败`);
}
