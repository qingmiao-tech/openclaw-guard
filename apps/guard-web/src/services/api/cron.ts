import { fetchJson, postJson } from './client';

export type CronScheduleMode = 'cron' | 'every' | 'at';

export type CronJobRecord = {
  id: string;
  name?: string;
  agentId: string;
  schedule: string;
  prompt: string;
  enabled: boolean;
  status: string;
  lastRunAt: string | null;
  nextRunAt: string | null;
  raw: Record<string, unknown>;
};

export type CronStatusSummary = {
  enabled: boolean | null;
  storePath: string | null;
  jobsCount: number | null;
  schedulerNextWakeAt: string | null;
  warnings: string[];
  raw: Record<string, unknown> | null;
};

export type CronOverviewCacheMeta = {
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
};

export type CronOverviewWithCache = {
  snapshotAt: string;
  jobs: CronJobRecord[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
  nextOffset: number | null;
  warnings: string[];
  status: CronStatusSummary;
  cache: CronOverviewCacheMeta;
};

export type CronJobInput = {
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
  thinking?: '' | 'off' | 'minimal' | 'low' | 'medium' | 'high';
  session?: '' | 'main' | 'isolated';
  wake?: '' | 'now' | 'next-heartbeat';
  timeoutSeconds?: number;
  stagger?: string;
  announce?: boolean;
  bestEffortDeliver?: boolean;
  deleteAfterRun?: boolean;
};

export type CronActionResult = {
  success: boolean;
  message: string;
  output?: string;
};

export function loadCronOverview() {
  return fetchJson<CronOverviewWithCache>('/api/cron-ui');
}

export function createCronJob(input: CronJobInput) {
  return postJson<CronActionResult>('/api/cron-ui/create', input);
}

export function updateCronJob(input: CronJobInput & { jobId: string }) {
  return postJson<CronActionResult>('/api/cron-ui/update', input);
}

export function enableCronJob(jobId: string) {
  return postJson<CronActionResult>('/api/cron-ui/enable', { jobId });
}

export function disableCronJob(jobId: string) {
  return postJson<CronActionResult>('/api/cron-ui/disable', { jobId });
}

export function runCronJob(jobId: string) {
  return postJson<CronActionResult>('/api/cron-ui/run', { jobId });
}

export function removeCronJob(jobId: string) {
  return postJson<CronActionResult>('/api/cron-ui/remove', { jobId });
}
