<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useAsyncResource } from '@/composables/useAsyncResource';
import PageCard from '@/features/common/PageCard.vue';
import { loadOperationsSnapshot } from '@/services/api/dashboard';
import { useUiStore } from '@/stores/ui';

type OperationsSnapshot = Awaited<ReturnType<typeof loadOperationsSnapshot>>;

let operationsCache: OperationsSnapshot | null = null;

const ui = useUiStore();
const resource = useAsyncResource(() => loadOperationsSnapshot(), operationsCache, { immediate: false });

const webReport = computed<Record<string, unknown>>(() => (
  resource.data?.webReport && typeof resource.data.webReport === 'object'
    ? resource.data.webReport as Record<string, unknown>
    : {}
));

const services = computed<Record<string, unknown>>(() => (
  resource.data?.services && typeof resource.data.services === 'object'
    ? resource.data.services as Record<string, unknown>
    : {}
));

const serviceEntries = computed(() => Object.entries(services.value));
const runningLabel = computed(() => (
  webReport.value.running === true
    ? ui.label('运行中', 'Running')
    : ui.label('未运行', 'Stopped')
));
const primaryUrl = computed(() => String(webReport.value.primaryUrl || '-'));
const workbenchUrl = computed(() => String(webReport.value.workbenchUrl || '-'));
const nextAction = computed(() => String(webReport.value.nextAction || '-'));
const processLabel = computed(() => {
  const pid = webReport.value.pid;
  const port = webReport.value.port;
  if (!pid && !port) {
    return '-';
  }
  if (pid && port) {
    return `PID ${pid} · ${ui.label('端口', 'Port')} ${port}`;
  }
  if (pid) {
    return `PID ${pid}`;
  }
  return `${ui.label('端口', 'Port')} ${port}`;
});

function prettyPrint(value: unknown) {
  return JSON.stringify(value, null, 2);
}

watch(() => resource.data, (value) => {
  if (value) operationsCache = value;
});

onMounted(() => {
  void resource.execute({ silent: !!resource.data });
});
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('运维 / First slice', 'Operations / First slice') }}</p>
        <h2 class="page-header__title">{{ ui.label('运行态与后台服务', 'Runtime and background services') }}</h2>
        <p class="page-header__description">
          {{ ui.label('先把运行状态、访问地址和后台托管信息迁进新壳层，原始快照只在开发者模式下显示。', 'Bring runtime status, access URLs, and managed background details into the new shell first. Raw snapshots stay behind developer mode.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="resource.execute({ silent: true })">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新', 'Refresh') }}
      </button>
    </header>

    <div v-if="resource.loading && !resource.data" class="page-empty">
      {{ ui.label('正在加载运维状态…', 'Loading operations status…') }}
    </div>
    <div v-else-if="resource.error && !resource.data" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>
    <template v-else-if="resource.data">
      <div v-if="resource.error" class="status-banner status-banner--warning">
        {{ ui.label('已保留上一版运维快照，但后台刷新失败：', 'The last operations snapshot is still on screen, but the background refresh failed: ') }}{{ resource.error }}
      </div>
      <PageCard :title="ui.label('运行摘要', 'Runtime summary')" eyebrow="Summary">
        <div class="stat-grid">
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('Guard Web', 'Guard Web') }}</p>
            <strong>{{ runningLabel }}</strong>
            <span>{{ String(webReport.source || '-') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('访问地址', 'Access URL') }}</p>
            <strong>{{ primaryUrl }}</strong>
            <span>{{ workbenchUrl }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('后台进程', 'Background process') }}</p>
            <strong>{{ processLabel }}</strong>
            <span>{{ webReport.managed === true ? ui.label('当前由 Guard 托管', 'Currently managed by Guard') : ui.label('当前不是 Guard 托管进程', 'This process is not managed by Guard') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('服务快照', 'Service snapshot') }}</p>
            <strong>{{ serviceEntries.length }}</strong>
            <span>{{ ui.label('当前接口返回的服务条目数', 'Number of service entries returned by the current API') }}</span>
          </article>
        </div>
      </PageCard>

      <PageCard :title="ui.label('建议下一步', 'Suggested next step')" eyebrow="Guide">
        <div class="status-banner" :class="{ 'status-banner--warning': webReport.running !== true }">
          <div>
            <strong>{{ ui.label('下一步', 'Next step') }}</strong>
            <p class="muted-copy">{{ nextAction }}</p>
          </div>
        </div>
      </PageCard>

      <PageCard
        v-if="ui.developerMode"
        :title="ui.label('后台 Web 报告', 'Background web report')"
        eyebrow="Developer"
      >
        <pre class="code-panel">{{ prettyPrint(resource.data.webReport) }}</pre>
      </PageCard>

      <PageCard
        v-if="ui.developerMode"
        :title="ui.label('服务状态原始快照', 'Service status snapshot')"
        eyebrow="Developer"
      >
        <pre class="code-panel">{{ prettyPrint(resource.data.services) }}</pre>
      </PageCard>

      <PageCard
        v-else
        :title="ui.label('开发者模式', 'Developer mode')"
        eyebrow="Developer"
      >
        <p class="muted-copy">
          {{ ui.label('如果你需要查看原始 Web 报告、服务快照或后续的刷新诊断，请先到 Settings 打开开发者模式。', 'If you need raw web reports, service snapshots, or future refresh diagnostics, enable developer mode from Settings first.') }}
        </p>
      </PageCard>
    </template>
  </div>
</template>
