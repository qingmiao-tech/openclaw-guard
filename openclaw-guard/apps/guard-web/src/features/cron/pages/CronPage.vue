<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useAsyncResource } from '@/composables/useAsyncResource';
import { formatDateTime, formatNumber, parseOptionalNumber } from '@/features/common/display';
import PageCard from '@/features/common/PageCard.vue';
import {
  createCronJob,
  disableCronJob,
  enableCronJob,
  loadCronOverview,
  removeCronJob,
  runCronJob,
  updateCronJob,
  type CronActionResult,
  type CronJobInput,
  type CronJobRecord,
  type CronOverviewWithCache,
  type CronScheduleMode,
} from '@/services/api/cron';
import { useFeedbackStore } from '@/stores/feedback';
import { useUiStore } from '@/stores/ui';

type CronFilter = 'all' | 'enabled' | 'disabled';
type CronEditorMode = 'create' | 'edit';

type CronDraft = {
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

type LastActionState = {
  tone: 'success' | 'error';
  message: string;
  detail?: string;
  at: string;
} | null;

let cronOverviewCache: CronOverviewWithCache | null = null;

const ui = useUiStore();
const feedback = useFeedbackStore();
const searchQuery = ref('');
const filter = ref<CronFilter>('all');
const editorMode = ref<CronEditorMode>('create');
const editingJobId = ref('');
const runningAction = ref('');
const lastAction = ref<LastActionState>(null);
const resource = useAsyncResource(() => loadCronOverview(), cronOverviewCache, { immediate: false });
const draft = reactive(createDefaultDraft());

watch(() => resource.data, (value) => {
  if (value) cronOverviewCache = value;
});

onMounted(() => {
  void resource.execute({ silent: !!resource.data });
});

const jobs = computed(() => resource.data?.jobs || []);
const enabledJobs = computed(() => jobs.value.filter((job) => job.enabled));
const disabledJobs = computed(() => jobs.value.filter((job) => !job.enabled));
const filteredJobs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  return jobs.value.filter((job) => {
    if (filter.value === 'enabled' && !job.enabled) return false;
    if (filter.value === 'disabled' && job.enabled) return false;
    if (!query) return true;
    return [
      job.name,
      job.id,
      job.agentId,
      job.schedule,
      job.prompt,
      job.status,
    ].join(' ').toLowerCase().includes(query);
  });
});

watch(jobs, () => {
  if (editorMode.value === 'edit' && !jobs.value.find((job) => job.id === editingJobId.value)) {
    resetEditor();
  }
});

function createDefaultDraft(): CronDraft {
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

function resetDraft(next = createDefaultDraft()) {
  Object.assign(draft, next);
}

function resetEditor() {
  editorMode.value = 'create';
  editingJobId.value = '';
  resetDraft();
}

function formatDurationInput(value: unknown) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return '';
  if (numeric % 86_400_000 === 0) return `${numeric / 86_400_000}d`;
  if (numeric % 3_600_000 === 0) return `${numeric / 3_600_000}h`;
  if (numeric % 60_000 === 0) return `${numeric / 60_000}m`;
  if (numeric % 1_000 === 0) return `${numeric / 1_000}s`;
  return String(numeric);
}

function buildDraftFromJob(job: CronJobRecord): CronDraft {
  const raw = (job.raw || {}) as Record<string, unknown>;
  const payload = (raw.payload || {}) as Record<string, unknown>;
  const schedule = (raw.schedule || {}) as Record<string, unknown>;
  const next = createDefaultDraft();

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

function schedulerStateLabel(enabled: boolean | null) {
  if (enabled === true) return ui.label('已开启', 'Enabled');
  if (enabled === false) return ui.label('已关闭', 'Disabled');
  return ui.label('未知', 'Unknown');
}

function schedulerDetailLabel() {
  const status = resource.data?.status;
  if (!status) {
    return ui.label('调度器信息暂缺', 'Scheduler details are missing');
  }
  if (status.schedulerNextWakeAt) {
    return formatDateTime(status.schedulerNextWakeAt);
  }
  if (ui.developerMode && status.storePath) {
    return status.storePath;
  }
  if (status.enabled === true) {
    return ui.label('调度器已启用，但下一次唤醒时间暂未返回。', 'The scheduler is enabled, but the next wake time has not been reported yet.');
  }
  if (status.enabled === false) {
    return ui.label('调度器当前已停用。', 'The scheduler is currently disabled.');
  }
  return ui.label('调度器路径已收纳到开发者模式。', 'The scheduler path stays behind developer mode.');
}

function cronJobStatusLabel(job: CronJobRecord) {
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

function cronJobTone(job: CronJobRecord) {
  const key = String(job.status || '').trim().toLowerCase();
  if (['running', 'success', 'completed', 'enabled'].includes(key)) return 'pill--success';
  if (['queued', 'pending', 'paused', 'disabled'].includes(key) || job.enabled === false) return 'pill--warning';
  if (['failed', 'error'].includes(key)) return 'pill--danger';
  return job.enabled ? 'pill--info' : 'pill--warning';
}

function schedulePlaceholder() {
  if (draft.scheduleMode === 'every') return '10m / 1h';
  if (draft.scheduleMode === 'at') return '2026-03-20T09:00:00+08:00';
  return '0 9 * * *';
}

function buildPayload(): CronJobInput {
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

async function refreshPage() {
  await resource.execute({ silent: !!resource.data });
}

function markLastAction(result: CronActionResult, tone: 'success' | 'error') {
  lastAction.value = {
    tone,
    message: result.message,
    detail: result.output,
    at: new Date().toISOString(),
  };
}

async function finishAction(result: CronActionResult, resetAfterSuccess = false) {
  const tone = result.success ? 'success' : 'error';
  markLastAction(result, tone);
  feedback.pushToast({
    tone,
    message: result.message,
  });
  if (result.success && resetAfterSuccess) {
    resetEditor();
  }
  await refreshPage();
}

async function handleSubmit() {
  const actionKey = editorMode.value === 'edit' ? 'update' : 'create';
  runningAction.value = actionKey;
  try {
    const payload = buildPayload();
    const result = editorMode.value === 'edit'
      ? await updateCronJob({ jobId: editingJobId.value, ...payload })
      : await createCronJob(payload);
    await finishAction(result, result.success);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    lastAction.value = {
      tone: 'error',
      message,
      at: new Date().toISOString(),
    };
    feedback.pushToast({
      tone: 'error',
      message,
    });
  } finally {
    runningAction.value = '';
  }
}

function startEdit(job: CronJobRecord) {
  editorMode.value = 'edit';
  editingJobId.value = job.id;
  resetDraft(buildDraftFromJob(job));
}

async function handleJobAction(action: 'run' | 'enable' | 'disable' | 'remove', job: CronJobRecord) {
  if (action === 'remove') {
    const confirmed = await feedback.confirm({
      title: ui.label('删除 Cron 任务', 'Delete cron job'),
      message: ui.label(`确认删除任务 ${job.id}？`, `Delete cron job ${job.id}?`),
      confirmLabel: ui.label('确认删除', 'Delete job'),
      cancelLabel: ui.label('取消', 'Cancel'),
      tone: 'danger',
    });
    if (!confirmed) return;
  }

  const actionKey = `${action}:${job.id}`;
  runningAction.value = actionKey;
  try {
    const result = action === 'run'
      ? await runCronJob(job.id)
      : action === 'enable'
        ? await enableCronJob(job.id)
        : action === 'disable'
          ? await disableCronJob(job.id)
          : await removeCronJob(job.id);
    await finishAction(result, action === 'remove' && editorMode.value === 'edit' && editingJobId.value === job.id);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    lastAction.value = {
      tone: 'error',
      message,
      at: new Date().toISOString(),
    };
    feedback.pushToast({
      tone: 'error',
      message,
    });
  } finally {
    runningAction.value = '';
  }
}
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('Cron / Fourth slice', 'Cron / Fourth slice') }}</p>
        <h2 class="page-header__title">{{ ui.label('自动化任务', 'Automation jobs') }}</h2>
        <p class="page-header__description">
          {{ ui.label('把当前 Cron 的创建、编辑、运行、启停和删除能力迁进新壳层里，同时保持旧接口合同不变，让自动化真正进入模块化前端。', 'Move cron create, edit, run, enable, disable, and remove flows into the new shell while keeping the existing backend contract unchanged, so automation is fully part of the modular frontend.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="refreshPage">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新任务状态', 'Refresh jobs') }}
      </button>
    </header>

    <div v-if="resource.loading && !resource.data" class="page-empty">
      {{ ui.label('正在读取 Cron 状态与任务列表…', 'Loading cron status and jobs…') }}
    </div>
    <div v-else-if="resource.error && !resource.data" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>
    <template v-else-if="resource.data">
      <PageCard :title="ui.label('运行概览', 'Runtime overview')" eyebrow="Overview">
        <div class="stat-grid">
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('任务总数', 'Jobs') }}</p>
            <strong>{{ formatNumber(resource.data.jobs.length) }} / {{ formatNumber(resource.data.total) }}</strong>
            <span>{{ ui.label('当前已加载任务 / 运行态汇总总量', 'Loaded jobs / runtime total') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('已启用', 'Enabled') }}</p>
            <strong>{{ formatNumber(enabledJobs.length) }}</strong>
            <span>{{ ui.label('这些任务会按计划自动执行', 'These jobs run on their schedule') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('已停用', 'Disabled') }}</p>
            <strong>{{ formatNumber(disabledJobs.length) }}</strong>
            <span>{{ ui.label('停用后仍会保留，之后可以重新开启', 'Disabled jobs stay available and can be resumed later') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('调度器状态', 'Scheduler') }}</p>
            <strong>{{ schedulerStateLabel(resource.data.status.enabled) }}</strong>
            <span>{{ schedulerDetailLabel() }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('运行态任务数', 'Runtime job count') }}</p>
            <strong>{{ formatNumber(resource.data.status.jobsCount) }}</strong>
            <span>{{ ui.label('来自 openclaw cron status 的运行态统计', 'Reported directly by openclaw cron status') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('分页窗口', 'Pagination window') }}</p>
            <strong>{{ formatNumber(resource.data.offset) }} / {{ formatNumber(resource.data.limit) }}</strong>
            <span>{{ resource.data.hasMore ? ui.label(`还有更多任务未加载，nextOffset=${resource.data.nextOffset ?? '-'}`, `More jobs remain, nextOffset=${resource.data.nextOffset ?? '-'}`) : ui.label('当前页已经完整', 'The current page is complete') }}</span>
          </article>
        </div>

        <div v-if="resource.error" class="status-banner status-banner--warning">
          {{ ui.label('已保留上一版成功结果，同时后台刷新失败：', 'The last successful result is still on screen, but the background refresh failed: ') }}{{ resource.error }}
        </div>
      </PageCard>

      <PageCard v-if="lastAction" :title="ui.label('最近一次任务操作', 'Latest task action')" eyebrow="Action">
        <div class="status-banner" :class="lastAction.tone === 'success' ? 'status-banner--success' : 'status-banner--error'">
          <strong>{{ lastAction.message }}</strong>
          <span>{{ formatDateTime(lastAction.at) }}</span>
        </div>
        <pre v-if="ui.developerMode && lastAction.detail" class="code-panel">{{ lastAction.detail }}</pre>
        <p v-else-if="lastAction.detail" class="muted-copy">
          {{ ui.label('最近一次任务动作的原始 detail 已收纳到开发者模式里。需要查看底层返回内容时，请先到 Settings 打开开发者模式。', 'The raw detail from the latest task action now stays behind developer mode. Enable it from Settings if you need the underlying payload.') }}
        </p>
      </PageCard>

      <PageCard v-if="resource.data.warnings.length || resource.data.hasMore" :title="ui.label('当前提醒', 'Current warnings')" eyebrow="Warnings">
        <div class="list-stack">
          <article v-for="warning in resource.data.warnings" :key="warning" class="risk-row">
            <strong>{{ ui.label('注意事项', 'Warning') }}</strong>
            <span>{{ warning }}</span>
          </article>
          <article v-if="resource.data.hasMore" class="risk-row">
            <strong>{{ ui.label('尚未完整加载', 'More jobs exist') }}</strong>
            <span>{{ ui.label(`当前只拉取到 ${resource.data.jobs.length} 条任务，运行态汇总显示总量为 ${resource.data.total}。`, `Only ${resource.data.jobs.length} jobs are loaded while the runtime reports ${resource.data.total} in total.`) }}</span>
          </article>
        </div>
      </PageCard>

      <div class="page-split">
        <PageCard :title="editorMode === 'edit' ? ui.label(`编辑任务 ${editingJobId}`, `Edit ${editingJobId}`) : ui.label('新建 Cron 任务', 'Create cron job')" eyebrow="Editor">
          <div class="provider-card__header">
            <p class="muted-copy">
              {{ ui.label('这里直接复用现有的 cron-ui 接口，所以保存后的任务会立即回到同一套运行态里，不会产生第二套自动化系统。', 'This editor talks to the existing cron-ui API directly, so saved jobs go back into the same runtime immediately instead of creating a second automation system.') }}
            </p>
            <span class="pill" :class="editorMode === 'edit' ? 'pill--warning' : 'pill--success'">
              {{ editorMode === 'edit' ? ui.label('编辑模式', 'Edit mode') : ui.label('创建模式', 'Create mode') }}
            </span>
          </div>

          <form class="page-form-stack" @submit.prevent="handleSubmit">
            <div class="settings-grid settings-grid--wide">
              <label class="settings-field">
                <span>{{ ui.label('任务名称', 'Job name') }}</span>
                <input v-model="draft.name" class="settings-input" type="text" :placeholder="ui.label('例如：每日汇总', 'Example: Daily brief')" />
              </label>

              <label class="settings-field">
                <span>{{ ui.label('Agent ID', 'Agent ID') }}</span>
                <input v-model="draft.agentId" class="settings-input" type="text" :placeholder="ui.label('例如：task-hub', 'Example: task-hub')" />
              </label>

              <label class="settings-field">
                <span>{{ ui.label('调度类型', 'Schedule mode') }}</span>
                <select v-model="draft.scheduleMode" class="settings-input">
                  <option value="cron">cron</option>
                  <option value="every">every</option>
                  <option value="at">at</option>
                </select>
              </label>

              <label class="settings-field">
                <span>{{ ui.label('调度值', 'Schedule value') }}</span>
                <input v-model="draft.scheduleValue" class="settings-input" type="text" :placeholder="schedulePlaceholder()" />
                <small>{{ ui.label('cron 用 5 段表达式；every 例如 10m / 1h；at 支持 ISO 时间或 +20m。', 'Use a 5-field cron expression, 10m / 1h for every, or ISO time / +20m for at.') }}</small>
              </label>

              <label class="settings-field">
                <span>{{ ui.label('时区', 'Timezone') }}</span>
                <input v-model="draft.timezone" class="settings-input" type="text" placeholder="Asia/Shanghai" />
              </label>

              <label class="settings-field">
                <span>{{ ui.label('会话模式', 'Session mode') }}</span>
                <select v-model="draft.session" class="settings-input">
                  <option value="main">main</option>
                  <option value="isolated">isolated</option>
                </select>
              </label>

              <label class="settings-field">
                <span>{{ ui.label('模型覆盖', 'Model override') }}</span>
                <input v-model="draft.model" class="settings-input" type="text" :placeholder="ui.label('留空则使用 Agent 默认模型', 'Leave blank to use the agent default')" />
              </label>

              <label class="settings-field">
                <span>{{ ui.label('Thinking 等级', 'Thinking level') }}</span>
                <select v-model="draft.thinking" class="settings-input">
                  <option value="">{{ ui.label('跟随默认', 'Use default') }}</option>
                  <option value="off">off</option>
                  <option value="minimal">minimal</option>
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="high">high</option>
                </select>
              </label>

              <label class="settings-field">
                <span>{{ ui.label('唤醒时机', 'Wake mode') }}</span>
                <select v-model="draft.wake" class="settings-input">
                  <option value="now">now</option>
                  <option value="next-heartbeat">next-heartbeat</option>
                </select>
              </label>

              <label class="settings-field">
                <span>{{ ui.label('超时（秒）', 'Timeout (seconds)') }}</span>
                <input v-model="draft.timeoutSeconds" class="settings-input" type="number" min="1" placeholder="30" />
              </label>

              <label class="settings-field">
                <span>{{ ui.label('错峰', 'Stagger') }}</span>
                <input v-model="draft.stagger" class="settings-input" type="text" :placeholder="ui.label('例如：5m，填 0 表示精确执行', 'Example: 5m, use 0 for exact timing')" />
              </label>

              <label class="settings-field settings-field--full">
                <span>{{ ui.label('任务消息', 'Prompt') }}</span>
                <textarea v-model="draft.prompt" class="settings-textarea" :placeholder="ui.label('例如：汇总今天的新线索并输出为 Markdown。', 'Example: Summarize today’s new leads in Markdown.')" />
              </label>

              <label class="settings-field settings-field--full">
                <span>{{ ui.label('描述', 'Description') }}</span>
                <textarea v-model="draft.description" class="settings-textarea" :placeholder="ui.label('可选，用来解释这个任务的用途。', 'Optional note explaining what this job is for.')" />
              </label>
            </div>

            <div class="checkbox-grid">
              <label class="checkbox-card">
                <input v-model="draft.enabled" type="checkbox" />
                <div class="checkbox-card__body">
                  <strong>{{ ui.label('保存后立即启用', 'Enable after save') }}</strong>
                  <p>{{ ui.label('关闭时任务会保留，但不会按计划自动执行。', 'When disabled, the job stays available but will not run automatically.') }}</p>
                </div>
              </label>

              <label class="checkbox-card">
                <input v-model="draft.announce" type="checkbox" />
                <div class="checkbox-card__body">
                  <strong>{{ ui.label('投递结果', 'Deliver output') }}</strong>
                  <p>{{ ui.label('执行完成后尝试把结果投递回会话或目标通道。', 'Try to deliver the result back to the session or target channel after execution.') }}</p>
                </div>
              </label>

              <label class="checkbox-card">
                <input v-model="draft.bestEffortDeliver" type="checkbox" />
                <div class="checkbox-card__body">
                  <strong>{{ ui.label('尽力投递', 'Best effort deliver') }}</strong>
                  <p>{{ ui.label('当目标暂时不可用时，尽量保留或稍后交付结果。', 'Keep or retry delivery when the target is temporarily unavailable.') }}</p>
                </div>
              </label>

              <label class="checkbox-card">
                <input v-model="draft.deleteAfterRun" type="checkbox" />
                <div class="checkbox-card__body">
                  <strong>{{ ui.label('运行后删除', 'Delete after run') }}</strong>
                  <p>{{ ui.label('适合一次性任务；普通巡检或日报不建议开启。', 'Useful for one-off jobs. Leave it off for recurring inspections or briefs.') }}</p>
                </div>
              </label>
            </div>
          </form>

          <div class="page-actions">
            <button class="inline-link inline-link--primary" type="button" :disabled="runningAction === 'create' || runningAction === 'update'" @click="handleSubmit">
              {{
                runningAction === 'create' || runningAction === 'update'
                  ? ui.label('保存中…', 'Saving…')
                  : editorMode === 'edit'
                    ? ui.label('保存修改', 'Save changes')
                    : ui.label('创建任务', 'Create job')
              }}
            </button>
            <button class="inline-link" type="button" @click="resetEditor">
              {{ editorMode === 'edit' ? ui.label('切回创建模式', 'Switch to create mode') : ui.label('重置表单', 'Reset form') }}
            </button>
          </div>
        </PageCard>

        <PageCard :title="ui.label('任务列表', 'Job list')" eyebrow="Jobs">
          <div class="control-grid">
            <label class="settings-field">
              <span>{{ ui.label('搜索', 'Search') }}</span>
              <input v-model="searchQuery" class="settings-input" type="text" :placeholder="ui.label('搜索任务名、Agent、调度表达式', 'Search by name, agent, or schedule')" />
            </label>
          </div>

          <div class="pill-row">
            <button class="pill-button" :class="{ 'pill-button--active': filter === 'all' }" type="button" @click="filter = 'all'">
              {{ ui.label(`全部 (${jobs.length})`, `All (${jobs.length})`) }}
            </button>
            <button class="pill-button" :class="{ 'pill-button--active': filter === 'enabled' }" type="button" @click="filter = 'enabled'">
              {{ ui.label(`启用中 (${enabledJobs.length})`, `Enabled (${enabledJobs.length})`) }}
            </button>
            <button class="pill-button" :class="{ 'pill-button--active': filter === 'disabled' }" type="button" @click="filter = 'disabled'">
              {{ ui.label(`已停用 (${disabledJobs.length})`, `Disabled (${disabledJobs.length})`) }}
            </button>
          </div>

          <div v-if="filteredJobs.length" class="provider-stack">
            <article v-for="job in filteredJobs" :key="job.id" class="provider-card">
              <header class="provider-card__header">
                <div>
                  <strong>{{ job.name || job.id }}</strong>
                  <p>{{ `${job.id} · ${job.agentId}` }}</p>
                </div>
                <span class="pill" :class="cronJobTone(job)">{{ cronJobStatusLabel(job) }}</span>
              </header>

              <div class="mini-list">
                <div class="mini-list__item mini-list__item--stack">
                  <strong>{{ ui.label('调度', 'Schedule') }}</strong>
                  <p>{{ job.schedule || '-' }}</p>
                </div>
                <div class="mini-list__item mini-list__item--stack">
                  <strong>{{ ui.label('任务消息', 'Prompt') }}</strong>
                  <p>{{ job.prompt || '-' }}</p>
                </div>
                <div class="mini-list__item mini-list__item--stack">
                  <strong>{{ ui.label('最近执行', 'Last run') }}</strong>
                  <p>{{ formatDateTime(job.lastRunAt) }}</p>
                  <p>{{ ui.label('下次执行：', 'Next run: ') }}{{ formatDateTime(job.nextRunAt) }}</p>
                </div>
              </div>

              <div class="page-actions">
                <button class="inline-link" type="button" @click="startEdit(job)">
                  {{ ui.label('编辑', 'Edit') }}
                </button>
                <button class="inline-link" type="button" :disabled="runningAction === `run:${job.id}`" @click="handleJobAction('run', job)">
                  {{ runningAction === `run:${job.id}` ? ui.label('执行中…', 'Running…') : ui.label('立即运行', 'Run now') }}
                </button>
                <button class="inline-link" type="button" :disabled="runningAction === `enable:${job.id}` || runningAction === `disable:${job.id}`" @click="handleJobAction(job.enabled ? 'disable' : 'enable', job)">
                  {{
                    runningAction === `enable:${job.id}` || runningAction === `disable:${job.id}`
                      ? ui.label('处理中…', 'Working…')
                      : job.enabled
                        ? ui.label('停用', 'Disable')
                        : ui.label('启用', 'Enable')
                  }}
                </button>
                <button class="inline-link inline-link--danger" type="button" :disabled="runningAction === `remove:${job.id}`" @click="handleJobAction('remove', job)">
                  {{ runningAction === `remove:${job.id}` ? ui.label('删除中…', 'Deleting…') : ui.label('删除', 'Delete') }}
                </button>
              </div>
            </article>
          </div>
          <div v-else class="page-empty">
            {{ ui.label('当前筛选条件下没有匹配的任务。', 'No cron jobs match the current filters.') }}
          </div>
        </PageCard>
      </div>
    </template>
  </div>
</template>
