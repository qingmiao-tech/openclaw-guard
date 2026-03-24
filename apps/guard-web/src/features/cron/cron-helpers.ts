import { formatDateTime, parseOptionalNumber } from '@/features/common/display';
import type {
  CronJobInput,
  CronJobRecord,
  CronScheduleMode,
  CronStatusSummary,
} from '@/services/api/cron';
import { useUiStore } from '@/stores/ui';

type UiStore = ReturnType<typeof useUiStore>;

export type CronFilter = 'all' | 'enabled' | 'disabled';
export type CronEditorMode = 'create' | 'edit';

export type CronDraft = {
  name: string;
  description: string;
  agentId: string;
  prompt: string;
  scheduleMode: CronScheduleMode;
  scheduleValue: string;
  enabled: boolean;
  timezone: string;
  model: string;
  thinking: '' | 'off' | 'minimal' | 'low' | 'medium' | 'high';
  session: '' | 'main' | 'isolated';
  wake: '' | 'now' | 'next-heartbeat';
  timeoutSeconds: string;
  stagger: string;
  announce: boolean;
  bestEffortDeliver: boolean;
  deleteAfterRun: boolean;
};

export type LastActionState = {
  tone: 'success' | 'error';
  message: string;
  detail?: string;
  at: string;
} | null;

export type CronJobAction = 'run' | 'enable' | 'disable' | 'remove';

export function createDefaultCronDraft(): CronDraft {
  return {
    name: '',
    description: '',
    agentId: '',
    prompt: '',
    scheduleMode: 'cron',
    scheduleValue: '0 9 * * *',
    enabled: true,
    timezone: '',
    model: '',
    thinking: '',
    session: 'main',
    wake: 'now',
    timeoutSeconds: '30',
    stagger: '',
    announce: false,
    bestEffortDeliver: false,
    deleteAfterRun: false,
  };
}

export function formatDurationInput(value: unknown) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return '';
  if (numeric % 86_400_000 === 0) return `${numeric / 86_400_000}d`;
  if (numeric % 3_600_000 === 0) return `${numeric / 3_600_000}h`;
  if (numeric % 60_000 === 0) return `${numeric / 60_000}m`;
  if (numeric % 1_000 === 0) return `${numeric / 1_000}s`;
  return String(numeric);
}

export function buildDraftFromJob(job: CronJobRecord): CronDraft {
  const raw = (job.raw || {}) as Record<string, unknown>;
  const payload = (raw.payload || {}) as Record<string, unknown>;
  const schedule = (raw.schedule || {}) as Record<string, unknown>;
  const next = createDefaultCronDraft();

  if (schedule.kind === 'every') {
    next.scheduleMode = 'every';
    next.scheduleValue = formatDurationInput(schedule.everyMs);
  } else if (schedule.kind === 'at') {
    next.scheduleMode = 'at';
    next.scheduleValue = String(schedule.at || '');
  } else if (schedule.kind === 'cron') {
    next.scheduleMode = 'cron';
    next.scheduleValue = String(schedule.expr || '');
  }

  if (!next.scheduleValue && typeof job.schedule === 'string') {
    if (job.schedule.startsWith('cron ')) {
      next.scheduleMode = 'cron';
      next.scheduleValue = job.schedule.slice(5).trim();
    } else if (job.schedule.startsWith('every ')) {
      next.scheduleMode = 'every';
      next.scheduleValue = job.schedule.slice(6).trim();
    } else if (job.schedule.startsWith('at ')) {
      next.scheduleMode = 'at';
      next.scheduleValue = job.schedule.slice(3).trim();
    } else {
      next.scheduleValue = job.schedule.trim();
    }
  }

  next.stagger = formatDurationInput(schedule.staggerMs);
  next.name = String(raw.name || job.name || '');
  next.description = String(raw.description || '');
  next.agentId = String(raw.agentId || job.agentId || '');
  next.prompt = String(payload.message || payload.text || raw.message || job.prompt || '');
  next.enabled = job.enabled !== false;
  next.timezone = String(raw.tz || '');
  next.model = String(raw.model || payload.model || '');
  next.thinking = String(raw.thinking || payload.thinking || '') as CronDraft['thinking'];
  next.session = String(raw.session || payload.session || next.session) as CronDraft['session'];
  next.wake = String(raw.wake || next.wake) as CronDraft['wake'];
  next.timeoutSeconds = raw.timeoutSeconds ? String(raw.timeoutSeconds) : next.timeoutSeconds;
  next.announce = raw.announce === true || raw.deliver === true;
  next.bestEffortDeliver = raw.bestEffortDeliver === true;
  next.deleteAfterRun = raw.deleteAfterRun === true;

  return next;
}

export function schedulerStateLabel(ui: UiStore, enabled: boolean | null) {
  if (enabled === true) return ui.label('已启用', 'Enabled');
  if (enabled === false) return ui.label('已停用', 'Disabled');
  return ui.label('未知', 'Unknown');
}

export function schedulerDetailLabel(
  ui: UiStore,
  developerMode: boolean,
  status: CronStatusSummary | null | undefined,
) {
  if (!status) {
    return ui.label('调度器详情暂缺。', 'Scheduler details are missing.');
  }
  if (status.schedulerNextWakeAt) {
    return formatDateTime(status.schedulerNextWakeAt);
  }
  if (developerMode && status.storePath) {
    return status.storePath;
  }
  if (status.enabled === true) {
    return ui.label(
      '调度器已启用，但下一次唤醒时间暂未返回。',
      'The scheduler is enabled, but the next wake time has not been reported yet.',
    );
  }
  if (status.enabled === false) {
    return ui.label('调度器当前已停用。', 'The scheduler is currently disabled.');
  }
  return ui.label(
    '调度器路径已收纳到开发者模式。',
    'The scheduler path stays behind developer mode.',
  );
}

export function cronJobStatusLabel(ui: UiStore, job: CronJobRecord) {
  const key = String(job.status || '').trim().toLowerCase();
  if (!key) return job.enabled ? ui.label('已启用', 'Enabled') : ui.label('已停用', 'Disabled');

  const labels: Record<string, { zh: string; en: string }> = {
    enabled: { zh: '已启用', en: 'Enabled' },
    disabled: { zh: '已停用', en: 'Disabled' },
    running: { zh: '执行中', en: 'Running' },
    queued: { zh: '排队中', en: 'Queued' },
    pending: { zh: '等待中', en: 'Pending' },
    paused: { zh: '已暂停', en: 'Paused' },
    success: { zh: '成功', en: 'Success' },
    completed: { zh: '已完成', en: 'Completed' },
    failed: { zh: '失败', en: 'Failed' },
    error: { zh: '异常', en: 'Error' },
  };

  const match = labels[key];
  return match ? ui.label(match.zh, match.en) : key;
}

export function cronJobTone(job: CronJobRecord) {
  const key = String(job.status || '').trim().toLowerCase();
  if (['running', 'success', 'completed', 'enabled'].includes(key)) return 'pill--success';
  if (['queued', 'pending', 'paused', 'disabled'].includes(key) || job.enabled === false) {
    return 'pill--warning';
  }
  if (['failed', 'error'].includes(key)) return 'pill--danger';
  return job.enabled ? 'pill--info' : 'pill--warning';
}

export function schedulePlaceholder(mode: CronScheduleMode) {
  if (mode === 'every') return '10m / 1h';
  if (mode === 'at') return '2026-03-20T09:00:00+08:00';
  return '0 9 * * *';
}

export function buildPayload(draft: CronDraft): CronJobInput {
  return {
    name: draft.name.trim() || undefined,
    description: draft.description.trim() || undefined,
    agentId: draft.agentId.trim() || undefined,
    prompt: draft.prompt.trim() || undefined,
    scheduleMode: draft.scheduleMode,
    scheduleValue: draft.scheduleValue.trim(),
    enabled: draft.enabled,
    timezone: draft.timezone.trim() || undefined,
    model: draft.model.trim() || undefined,
    thinking: draft.thinking || undefined,
    session: draft.session || undefined,
    wake: draft.wake || undefined,
    timeoutSeconds: parseOptionalNumber(draft.timeoutSeconds),
    stagger: draft.stagger.trim() || undefined,
    announce: draft.announce,
    bestEffortDeliver: draft.bestEffortDeliver,
    deleteAfterRun: draft.deleteAfterRun,
  };
}
