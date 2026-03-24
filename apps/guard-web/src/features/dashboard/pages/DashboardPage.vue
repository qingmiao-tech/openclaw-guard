<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useAsyncResource } from '@/composables/useAsyncResource';
import PageCard from '@/features/common/PageCard.vue';
import { loadDashboardSnapshot } from '@/services/api/dashboard';
import { useUiStore } from '@/stores/ui';

type DashboardSnapshot = Awaited<ReturnType<typeof loadDashboardSnapshot>>;

let dashboardCache: DashboardSnapshot | null = null;

const ui = useUiStore();
const resource = useAsyncResource(() => loadDashboardSnapshot(), dashboardCache, { immediate: false });

const riskItems = computed(() => {
  const source = resource.data?.overview?.risks;
  return Array.isArray(source) ? source : [];
});

watch(() => resource.data, (value) => {
  if (value) dashboardCache = value;
});

onMounted(() => {
  void resource.execute({ silent: !!resource.data });
});
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('首页 / 总览', 'Home / Overview') }}</p>
        <h2 class="page-header__title">{{ ui.label('带路首页', 'Guided Home') }}</h2>
        <p class="page-header__description">
          {{ ui.label('从这里完成最常用的四条主路径：确认运行、配置模型、连接渠道、开启备份与恢复。', 'Use this page to walk the four main paths: confirm runtime health, configure models, connect channels, and turn on backup and recovery.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="resource.execute({ silent: true })">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新', 'Refresh') }}
      </button>
    </header>

    <div v-if="resource.loading && !resource.data" class="page-empty">
      {{ ui.label('正在加载首页快照…', 'Loading the home snapshot…') }}
    </div>

    <div v-else-if="resource.error && !resource.data" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>

    <template v-else-if="resource.data">
      <div v-if="resource.error" class="status-banner status-banner--warning">
        {{ ui.label('已保留上一版首页快照，但后台刷新失败：', 'The last home snapshot is still on screen, but the background refresh failed: ') }}{{ resource.error }}
      </div>
      <PageCard :title="ui.label('当前可用性', 'Current availability')" eyebrow="Status">
        <div class="stat-grid">
          <article class="stat-card">
            <p class="stat-card__label">Guard</p>
            <strong>{{ resource.data.info?.guardVersion || 'unknown' }}</strong>
            <span>{{ resource.data.info?.platform || 'unknown platform' }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">OpenClaw</p>
            <strong>{{ resource.data.info?.openclaw?.installed ? (resource.data.info?.openclaw?.version || 'installed') : ui.label('未安装', 'Not installed') }}</strong>
            <span>{{ resource.data.info?.openclaw?.detectedSource || ui.label('待检测', 'Pending detection') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('Node 运行时', 'Node runtime') }}</p>
            <strong>{{ resource.data.info?.nodeVersion || 'unknown' }}</strong>
            <span>{{ resource.data.info?.user || ui.label('用户未知', 'Unknown user') }}</span>
          </article>
        </div>
      </PageCard>

      <PageCard :title="ui.label('建议动作', 'Suggested actions')" eyebrow="Next">
        <div class="list-stack">
          <article class="action-row">
            <div>
              <h3>{{ ui.label('先确认运行状态', 'Review runtime health first') }}</h3>
              <p>{{ ui.label('先确认 Guard Web、OpenClaw 和后台服务都在线，再继续模型、渠道或恢复配置会更稳妥。', 'Check Guard Web, OpenClaw, and background services first so the rest of your setup starts from a healthy base.') }}</p>
            </div>
            <RouterLink class="inline-link" to="/operations">{{ ui.label('查看运维页', 'Open operations') }}</RouterLink>
          </article>
          <article class="action-row">
            <div>
              <h3>{{ ui.label('先接好模型', 'Connect your models') }}</h3>
              <p>{{ ui.label('先把主模型和回退模型配置好，后面的渠道接入和运行排查会更顺。', 'Configure your primary and fallback models first so channel setup and troubleshooting stay predictable.') }}</p>
            </div>
            <RouterLink class="inline-link" to="/models">{{ ui.label('打开模型页', 'Open models') }}</RouterLink>
          </article>
          <article class="action-row">
            <div>
              <h3>{{ ui.label('再连接渠道', 'Connect your channels') }}</h3>
              <p>{{ ui.label('完成渠道接线后，Guard 才能真正把模型能力接到实际使用场景里。', 'Once channels are configured, Guard can bring model capability into the real usage flow.') }}</p>
            </div>
            <RouterLink class="inline-link" to="/channels">{{ ui.label('打开渠道页', 'Open channels') }}</RouterLink>
          </article>
          <article class="action-row">
            <div>
              <h3>{{ ui.label('最后补齐备份保护', 'Finish backup protection') }}</h3>
              <p>{{ ui.label('优先创建首个恢复点并接好云端保护，这样后续试错时更容易保住现场，也方便快速回到之前的状态。', 'Create the first recovery point and connect cloud protection so later experiments stay recoverable and easier to rewind.') }}</p>
            </div>
            <RouterLink class="inline-link" to="/recovery">{{ ui.label('打开备份与恢复', 'Open backup & recovery') }}</RouterLink>
          </article>
        </div>
      </PageCard>

      <PageCard :title="ui.label('风险提示', 'Risk summary')" eyebrow="Risk">
        <div v-if="riskItems.length" class="list-stack">
          <article v-for="(risk, index) in riskItems" :key="`${risk.title}-${index}`" class="risk-row">
            <strong>{{ risk.title || ui.label('未命名风险', 'Unnamed risk') }}</strong>
            <span>{{ risk.detail || ui.label('暂无详细描述。', 'No detail provided.') }}</span>
          </article>
        </div>
        <p v-else class="muted-copy">
          {{ ui.label('当前还没有结构化风险提示。若要做更细的运行或安全检查，可以继续查看运维页和安全页。', 'No structured risk items are available right now. For a deeper health or safety review, continue to Operations and Security.') }}
        </p>
      </PageCard>
    </template>
  </div>
</template>
