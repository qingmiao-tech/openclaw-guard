<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useAsyncResource } from '@/composables/useAsyncResource';
import { formatNumber } from '@/features/common/display';
import PageCard from '@/features/common/PageCard.vue';
import { loadServiceLogs, type ServiceLogsResponse } from '@/services/api/logs';
import { useFeedbackStore } from '@/stores/feedback';
import { useUiStore } from '@/stores/ui';

let logsCache: ServiceLogsResponse | null = null;

const ui = useUiStore();
const feedback = useFeedbackStore();
const selectedLines = ref(logsCache?.requestedLines || 200);
const resource = useAsyncResource(() => loadServiceLogs(selectedLines.value), logsCache, { immediate: false });

const lineOptions = [100, 200, 500];

const logLines = computed(() => resource.data.value?.logs || []);
const hasLogError = computed(() => /^(获取日志失败|Failed to fetch logs)/.test(logLines.value[0] || ''));

watch(resource.data, (value) => {
  if (value) logsCache = value;
});

onMounted(() => {
  void resource.execute({ silent: !!resource.data.value });
});

async function refreshLogs(forceLines?: number) {
  if (typeof forceLines === 'number') {
    selectedLines.value = forceLines;
  }
  await resource.execute({ silent: !!resource.data.value });
}

async function copyLogs() {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) return;
  await navigator.clipboard.writeText(logLines.value.join('\n'));
  feedback.pushToast({
    tone: 'success',
    message: ui.label('最近日志已复制。', 'The latest log lines have been copied.'),
  });
}
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('日志 / Fourth slice', 'Logs / Fourth slice') }}</p>
        <h2 class="page-header__title">{{ ui.label('日志与排障', 'Logs & troubleshooting') }}</h2>
        <p class="page-header__description">
          {{ ui.label('先把最常用的 Gateway 日志排障入口迁进新壳层里，支持切换日志行数、静默刷新和快速复制，避免排障时还要跳回旧控制台。', 'Bring the most-used Gateway log workflow into the new shell first, with line-count switching, silent refresh, and quick copy so troubleshooting no longer depends on the old console.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="refreshLogs()">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新日志', 'Refresh logs') }}
      </button>
    </header>

    <div v-if="resource.loading && !resource.data" class="page-empty">
      {{ ui.label('正在读取最近日志…', 'Loading the latest log lines…') }}
    </div>
    <div v-else-if="resource.error && !resource.data" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>
    <template v-else-if="resource.data">
      <PageCard :title="ui.label('日志概览', 'Log overview')" eyebrow="Gateway">
        <div class="stat-grid">
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('日志来源', 'Source') }}</p>
            <strong>Gateway</strong>
            <span>{{ ui.label('当前先迁移最常用的 Gateway 日志入口', 'The first migrated source is the Gateway log stream') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('请求行数', 'Requested lines') }}</p>
            <strong>{{ formatNumber(resource.data.requestedLines) }}</strong>
            <span>{{ ui.label('切换后会静默拉取新结果', 'Changing this refreshes the result silently') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('返回行数', 'Returned lines') }}</p>
            <strong>{{ formatNumber(logLines.length) }}</strong>
            <span>{{ ui.label('展示当前接口返回的最新结果', 'Shows the latest lines returned by the API') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('当前状态', 'Current state') }}</p>
            <strong>{{ hasLogError ? ui.label('需要排查', 'Needs attention') : ui.label('可直接查看', 'Ready to inspect') }}</strong>
            <span>{{ hasLogError ? ui.label('接口返回了错误提示，建议先回到运维确认服务状态。', 'The API returned an error banner. Confirm the service state in Operations first.') : ui.label('如果最近刚执行过启停或重启，先看这里通常最快。', 'If you recently started, stopped, or restarted services, this is usually the fastest place to check.') }}</span>
          </article>
        </div>

        <div v-if="resource.error" class="status-banner status-banner--warning">
          {{ ui.label('已保留上一版成功结果，同时后台刷新失败：', 'The last successful result is still on screen, but the background refresh failed: ') }}{{ resource.error }}
        </div>
      </PageCard>

      <PageCard :title="ui.label('最近日志输出', 'Latest log output')" eyebrow="Output">
        <template #actions>
          <div class="page-actions">
            <button
              v-for="lines in lineOptions"
              :key="lines"
              class="pill-button"
              :class="{ 'pill-button--active': selectedLines === lines }"
              type="button"
              @click="refreshLogs(lines)"
            >
              {{ ui.label(`最近 ${lines} 行`, `${lines} lines`) }}
            </button>
            <button class="inline-link" type="button" @click="copyLogs">
              {{ ui.label('复制日志', 'Copy logs') }}
            </button>
          </div>
        </template>

        <div v-if="hasLogError" class="status-banner status-banner--warning">
          {{ logLines[0] }}
        </div>
        <pre class="code-panel log-output">{{ logLines.join('\n') || ui.label('当前没有可显示的日志内容。', 'No log content is available right now.') }}</pre>
      </PageCard>
    </template>
  </div>
</template>
