<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useAsyncResource } from '@/composables/useAsyncResource';
import { formatDateTime, formatNumber } from '@/features/common/display';
import PageCard from '@/features/common/PageCard.vue';
import PageTabs from '@/features/common/PageTabs.vue';
import {
  loadNotificationsSnapshot,
  runNotificationBulkAction,
  updateNotificationRead,
  type ActivityEvent,
  type GuardNotification,
  type NotificationBulkAction,
  type NotificationSummary,
  type NotificationsSnapshot,
} from '@/services/api/notifications';
import { useFeedbackStore } from '@/stores/feedback';
import { useUiStore } from '@/stores/ui';

type NotificationView = 'reminders' | 'timeline';
type ReminderFilter = 'all' | 'unread' | 'warning' | 'success';

type ReminderGroup = {
  key: string;
  label: string;
  items: GuardNotification[];
};

let notificationsCache: NotificationsSnapshot | null = null;

const ui = useUiStore();
const feedback = useFeedbackStore();
const view = ref<NotificationView>('reminders');
const searchQuery = ref('');
const sourceFilter = ref('all');
const reminderFilter = ref<ReminderFilter>('all');
const pageSize = ref(20);
const page = ref(1);
const mutatingId = ref('');
const bulkAction = ref<NotificationBulkAction | ''>('');
const copyingId = ref('');
const resource = useAsyncResource(() => loadNotificationsSnapshot(), notificationsCache, { immediate: false });

const pageSizeOptions = [10, 20, 50];

const reminderTabs = computed(() => [
  { id: 'reminders', label: ui.label('提醒', 'Reminders') },
  { id: 'timeline', label: ui.label('时间线', 'Timeline') },
]);

const items = computed(() => resource.data?.summary.items || []);
const events = computed(() => resource.data?.events || []);
const warningCount = computed(() => items.value.filter((item) => item.severity === 'warning' || item.severity === 'error').length);
const successCount = computed(() => items.value.filter((item) => item.severity === 'success').length);
const sourceOptions = computed(() => Array.from(new Set(items.value.map((item) => item.source).filter(Boolean))).sort());

const filteredReminders = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  return items.value.filter((item) => {
    if (reminderFilter.value === 'unread' && item.read) return false;
    if (reminderFilter.value === 'warning' && item.severity !== 'warning' && item.severity !== 'error') return false;
    if (reminderFilter.value === 'success' && item.severity !== 'success') return false;
    if (sourceFilter.value !== 'all' && item.source !== sourceFilter.value) return false;
    if (!query) return true;
    return [
      item.title,
      item.message,
      item.type,
      item.source,
      JSON.stringify(item.meta || {}),
    ].join(' ').toLowerCase().includes(query);
  });
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredReminders.value.length / pageSize.value)));
const pagedReminders = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return filteredReminders.value.slice(start, start + pageSize.value);
});

const reminderGroups = computed<ReminderGroup[]>(() => {
  const groups = new Map<string, ReminderGroup>();
  for (const item of pagedReminders.value) {
    const key = item.createdAt ? item.createdAt.slice(0, 10) : 'unknown';
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        label: formatDayLabel(item.createdAt),
        items: [],
      });
    }
    groups.get(key)?.items.push(item);
  }
  return Array.from(groups.values());
});

watch(() => resource.data, (value) => {
  if (value) notificationsCache = value;
});

watch([searchQuery, sourceFilter, reminderFilter, pageSize, view], () => {
  page.value = 1;
});

watch(totalPages, (value) => {
  if (page.value > value) page.value = value;
});

onMounted(() => {
  void resource.execute({ silent: !!resource.data });
});

function formatDayLabel(value?: string | null) {
  if (!value) return ui.label('未知日期', 'Unknown date');
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return value;
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(timestamp));
}

function notificationSeverityTone(severity: string) {
  if (severity === 'success') return 'pill--success';
  if (severity === 'warning') return 'pill--warning';
  if (severity === 'error') return 'pill--danger';
  return 'pill--info';
}

function notificationSeverityLabel(severity: string) {
  if (severity === 'success') return ui.label('成功', 'Success');
  if (severity === 'warning') return ui.label('警告', 'Warning');
  if (severity === 'error') return ui.label('异常', 'Error');
  return ui.label('提示', 'Info');
}

function notificationTypeLabel(type: string) {
  const labels: Record<string, { zh: string; en: string }> = {
    cron: { zh: '自动化', en: 'Automation' },
    recovery: { zh: '备份与恢复', en: 'Backup & Recovery' },
    git: { zh: 'Git', en: 'Git' },
    'git-sync': { zh: '备份与恢复', en: 'Backup & Recovery' },
    openclaw: { zh: 'OpenClaw', en: 'OpenClaw' },
    security: { zh: '安全', en: 'Security' },
  };
  const match = labels[type];
  if (match) return ui.label(match.zh, match.en);
  return type || ui.label('系统提醒', 'System reminder');
}

function timelineTypeLabel(type: string) {
  const labels: Record<string, { zh: string; en: string }> = {
    'session-started': { zh: '会话启动', en: 'Session started' },
    'session-updated': { zh: '会话更新', en: 'Session updated' },
    'session-ended': { zh: '会话结束', en: 'Session ended' },
    'runtime-warning': { zh: '运行告警', en: 'Runtime warning' },
    'cron-run': { zh: '自动化执行', en: 'Automation run' },
    'git-sync': { zh: '备份与恢复', en: 'Backup & Recovery' },
  };
  const match = labels[type];
  return match ? ui.label(match.zh, match.en) : (type || ui.label('系统事件', 'System event'));
}

function sourceLabel(source: string) {
  if (!source) return ui.label('未知来源', 'Unknown source');
  if (source === 'cron-ui') return ui.label('Cron 管理', 'Cron management');
  if (source === 'openclaw') return 'OpenClaw';
  if (source === 'guard-ui') return 'Guard UI';
  return source;
}

function eventContext(event: ActivityEvent) {
  return [event.agentId, event.modelId, event.status].filter(Boolean).join(' · ');
}

function applySummary(summary: NotificationSummary) {
  if (!resource.data) return;
  const next: NotificationsSnapshot = {
    ...resource.data,
    summary: {
      items: Array.isArray(summary.items) ? summary.items : [],
      total: summary.total || 0,
      unread: summary.unread || 0,
      read: summary.read || 0,
    },
  };
  resource.data = next;
  notificationsCache = next;
}

async function refreshPage() {
  await resource.execute({ silent: !!resource.data });
}

async function handleToggleRead(item: GuardNotification) {
  const nextRead = !item.read;
  mutatingId.value = item.id;
  try {
    const result = await updateNotificationRead(item.id, nextRead);
    applySummary(result.summary);
    feedback.pushToast({
      tone: result.success ? 'success' : 'error',
      message: result.success
        ? (nextRead ? ui.label('已标记为已读。', 'Marked as read.') : ui.label('已重新标记为未读。', 'Marked as unread again.'))
        : ui.label('更新提醒状态失败。', 'Failed to update the reminder state.'),
    });
  } catch (error) {
    feedback.pushToast({
      tone: 'error',
      message: error instanceof Error ? error.message : String(error),
    });
  } finally {
    mutatingId.value = '';
  }
}

async function handleBulk(action: NotificationBulkAction) {
  if (action === 'clear-all') {
    const confirmed = await feedback.confirm({
      title: ui.label('清空全部通知', 'Clear all reminders'),
      message: ui.label('确认清空全部提醒吗？这个操作不可撤销。', 'Clear all reminders? This action cannot be undone.'),
      confirmLabel: ui.label('确认清空', 'Clear all'),
      cancelLabel: ui.label('取消', 'Cancel'),
      tone: 'danger',
    });
    if (!confirmed) return;
  }

  bulkAction.value = action;
  try {
    const result = await runNotificationBulkAction(action);
    applySummary(result.summary);
    feedback.pushToast({
      tone: result.success ? 'success' : 'error',
      message: result.message,
    });
  } catch (error) {
    feedback.pushToast({
      tone: 'error',
      message: error instanceof Error ? error.message : String(error),
    });
  } finally {
    bulkAction.value = '';
  }
}

async function copyNotification(item: GuardNotification) {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) return;
  copyingId.value = item.id;
  try {
    await navigator.clipboard.writeText(JSON.stringify(item, null, 2));
    feedback.pushToast({
      tone: 'success',
      message: ui.label('提醒详情已复制。', 'The reminder details have been copied.'),
    });
  } finally {
    copyingId.value = '';
  }
}
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('通知 / Fourth slice', 'Notifications / Fourth slice') }}</p>
        <h2 class="page-header__title">{{ ui.label('提醒与时间线', 'Reminders & timeline') }}</h2>
        <p class="page-header__description">
          {{ ui.label('把原来分散的提醒和活动时间线收回同一页里，默认先给普通用户看到可处理的提醒，切换到时间线再回看系统最近发生了什么。', 'Bring reminders and the activity feed back into one page, so users first see what needs action and then switch to the timeline to review what the system has been doing.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="refreshPage">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新', 'Refresh') }}
      </button>
    </header>

    <PageTabs :items="reminderTabs" :active-id="view" @change="view = $event as NotificationView" />

    <div v-if="resource.loading && !resource.data" class="page-empty">
      {{ ui.label('正在读取提醒与时间线…', 'Loading reminders and timeline events…') }}
    </div>
    <div v-else-if="resource.error && !resource.data" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>
    <template v-else-if="resource.data">
      <PageCard :title="ui.label('当前概览', 'Current overview')" eyebrow="Overview">
        <div class="stat-grid">
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('提醒总数', 'Total reminders') }}</p>
            <strong>{{ formatNumber(resource.data.summary.total) }}</strong>
            <span>{{ ui.label('包含已读与未读提醒', 'Includes both read and unread reminders') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('待处理', 'Needs attention') }}</p>
            <strong>{{ formatNumber(resource.data.summary.unread) }}</strong>
            <span>{{ ui.label('建议先处理这些未读提醒', 'Start with these unread reminders') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('告警提醒', 'Warnings / errors') }}</p>
            <strong>{{ formatNumber(warningCount) }}</strong>
            <span>{{ ui.label('包含 warning 与 error 两种严重级别', 'Counts both warning and error severity') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('时间线事件', 'Timeline events') }}</p>
            <strong>{{ formatNumber(events.length) }}</strong>
            <span>{{ ui.label('最近活动会从这里回放', 'Recent system activity is replayed here') }}</span>
          </article>
        </div>

        <div v-if="resource.error" class="status-banner status-banner--warning">
          {{ ui.label('已保留上一版成功结果，同时后台刷新失败：', 'The last successful result is still on screen, but the background refresh failed: ') }}{{ resource.error }}
        </div>
      </PageCard>

      <template v-if="view === 'reminders'">
        <PageCard :title="ui.label('筛选与批量操作', 'Filters & bulk actions')" eyebrow="Controls">
          <div class="control-grid">
            <label class="settings-field">
              <span>{{ ui.label('搜索', 'Search') }}</span>
              <input
                v-model="searchQuery"
                class="settings-input"
                type="text"
                :placeholder="ui.label('搜索标题、消息、来源', 'Search title, message, or source')"
              />
            </label>
            <label class="settings-field">
              <span>{{ ui.label('来源', 'Source') }}</span>
              <select v-model="sourceFilter" class="settings-input">
                <option value="all">{{ ui.label('全部来源', 'All sources') }}</option>
                <option v-for="source in sourceOptions" :key="source" :value="source">
                  {{ sourceLabel(source) }}
                </option>
              </select>
            </label>
            <label class="settings-field">
              <span>{{ ui.label('每页显示', 'Per page') }}</span>
              <select v-model="pageSize" class="settings-input">
                <option v-for="size in pageSizeOptions" :key="size" :value="size">
                  {{ ui.label(`${size} 条`, `${size}`) }}
                </option>
              </select>
            </label>
          </div>

          <div class="pill-row">
            <button class="pill-button" :class="{ 'pill-button--active': reminderFilter === 'all' }" type="button" @click="reminderFilter = 'all'">
              {{ ui.label(`全部 (${resource.data.summary.total})`, `All (${resource.data.summary.total})`) }}
            </button>
            <button class="pill-button" :class="{ 'pill-button--active': reminderFilter === 'unread' }" type="button" @click="reminderFilter = 'unread'">
              {{ ui.label(`未读 (${resource.data.summary.unread})`, `Unread (${resource.data.summary.unread})`) }}
            </button>
            <button class="pill-button" :class="{ 'pill-button--active': reminderFilter === 'warning' }" type="button" @click="reminderFilter = 'warning'">
              {{ ui.label(`警告 (${warningCount})`, `Warning (${warningCount})`) }}
            </button>
            <button class="pill-button" :class="{ 'pill-button--active': reminderFilter === 'success' }" type="button" @click="reminderFilter = 'success'">
              {{ ui.label(`成功 (${successCount})`, `Success (${successCount})`) }}
            </button>
          </div>

          <div class="page-actions">
            <button class="inline-link" type="button" :disabled="bulkAction === 'read-all'" @click="handleBulk('read-all')">
              {{ bulkAction === 'read-all' ? ui.label('处理中…', 'Working…') : ui.label('全部标记为已读', 'Mark all as read') }}
            </button>
            <button class="inline-link" type="button" :disabled="bulkAction === 'unread-all'" @click="handleBulk('unread-all')">
              {{ bulkAction === 'unread-all' ? ui.label('处理中…', 'Working…') : ui.label('全部重新标记为未读', 'Mark all as unread') }}
            </button>
            <button class="inline-link" type="button" :disabled="bulkAction === 'clear-read'" @click="handleBulk('clear-read')">
              {{ bulkAction === 'clear-read' ? ui.label('处理中…', 'Working…') : ui.label('清空已读提醒', 'Clear read reminders') }}
            </button>
            <button class="inline-link inline-link--danger" type="button" :disabled="bulkAction === 'clear-all'" @click="handleBulk('clear-all')">
              {{ bulkAction === 'clear-all' ? ui.label('处理中…', 'Working…') : ui.label('清空全部提醒', 'Clear all reminders') }}
            </button>
          </div>
          <p v-if="!ui.developerMode" class="muted-copy">
            {{ ui.label('原始提醒详情复制已收纳到开发者模式里。若要导出 JSON 详情排障，请先到 Settings 打开开发者模式。', 'Raw reminder-detail copy now stays behind developer mode. Enable it from Settings if you need the JSON payload for troubleshooting.') }}
          </p>
        </PageCard>

        <PageCard :title="ui.label('提醒列表', 'Reminder list')" eyebrow="Reminders">
          <div v-if="filteredReminders.length" class="timeline-day-stack">
            <section v-for="group in reminderGroups" :key="group.key" class="timeline-day-group">
              <div class="timeline-day-header">
                <strong>{{ group.label }}</strong>
                <span>{{ ui.label(`${group.items.length} 条提醒`, `${group.items.length} reminders`) }}</span>
              </div>

              <div class="provider-stack">
                <article v-for="item in group.items" :key="item.id" class="provider-card">
                  <header class="provider-card__header">
                    <div>
                      <strong>{{ item.title || ui.label('系统提醒', 'System reminder') }}</strong>
                      <p>{{ formatDateTime(item.createdAt) }}</p>
                    </div>
                    <div class="pill-row">
                      <span class="pill" :class="notificationSeverityTone(item.severity)">
                        {{ notificationSeverityLabel(item.severity) }}
                      </span>
                      <span class="pill" :class="item.read ? 'pill--muted' : 'pill--warning'">
                        {{ item.read ? ui.label('已读', 'Read') : ui.label('未读', 'Unread') }}
                      </span>
                    </div>
                  </header>

                  <p>{{ item.message }}</p>

                  <div class="pill-row">
                    <span class="pill pill--info">{{ sourceLabel(item.source) }}</span>
                    <span class="pill pill--muted">{{ notificationTypeLabel(item.type) }}</span>
                  </div>

                  <div class="page-actions">
                    <button class="inline-link" type="button" :disabled="mutatingId === item.id" @click="handleToggleRead(item)">
                      {{
                        mutatingId === item.id
                          ? ui.label('处理中…', 'Working…')
                          : item.read
                            ? ui.label('重新标记为未读', 'Mark as unread')
                            : ui.label('标记为已读', 'Mark as read')
                      }}
                    </button>
                    <button v-if="ui.developerMode" class="inline-link" type="button" :disabled="copyingId === item.id" @click="copyNotification(item)">
                      {{ copyingId === item.id ? ui.label('复制中…', 'Copying…') : ui.label('复制详情', 'Copy details') }}
                    </button>
                  </div>
                </article>
              </div>
            </section>
          </div>
          <div v-else class="page-empty">
            {{ ui.label('当前筛选条件下没有匹配的提醒。', 'No reminders match the current filters.') }}
          </div>

          <div v-if="filteredReminders.length" class="pagination-bar">
            <p class="muted-copy">
              {{
                ui.label(
                  `当前第 ${page} / ${totalPages} 页，共 ${filteredReminders.length} 条提醒`,
                  `Page ${page} of ${totalPages}, ${filteredReminders.length} reminders total`,
                )
              }}
            </p>
            <div class="page-actions">
              <button class="inline-link" type="button" :disabled="page <= 1" @click="page -= 1">
                {{ ui.label('上一页', 'Previous') }}
              </button>
              <button class="inline-link" type="button" :disabled="page >= totalPages" @click="page += 1">
                {{ ui.label('下一页', 'Next') }}
              </button>
            </div>
          </div>
        </PageCard>
      </template>

      <template v-else>
        <PageCard :title="ui.label('最近时间线', 'Recent timeline')" eyebrow="Timeline">
          <div v-if="events.length" class="provider-stack">
            <article v-for="event in events" :key="event.id" class="provider-card">
              <header class="provider-card__header">
                <div>
                  <strong>{{ event.title || ui.label('系统事件', 'System event') }}</strong>
                  <p>{{ formatDateTime(event.createdAt) }}</p>
                </div>
                <span class="pill pill--info">{{ timelineTypeLabel(event.type) }}</span>
              </header>
              <p>{{ event.description }}</p>
              <p v-if="eventContext(event)" class="muted-copy">{{ eventContext(event) }}</p>
            </article>
          </div>
          <div v-else class="page-empty">
            {{ ui.label('时间线里还没有新的记录。', 'No timeline events are available yet.') }}
          </div>
        </PageCard>
      </template>
    </template>
  </div>
</template>
