<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useAsyncResource } from '@/composables/useAsyncResource';
import PageCard from '@/features/common/PageCard.vue';
import { loadDashboardSnapshot } from '@/services/api/dashboard';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
const resource = useAsyncResource(() => loadDashboardSnapshot());

const riskItems = computed(() => {
  const source = resource.data?.overview?.risks;
  return Array.isArray(source) ? source : [];
});
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('首页 / First slice', 'Home / First slice') }}</p>
        <h2 class="page-header__title">{{ ui.label('带路首页', 'Guided Home') }}</h2>
        <p class="page-header__description">
          {{ ui.label('先回答现在能不能用、下一步该做什么，以及哪里可能有风险。', 'Answer what works now, what to do next, and where risk still exists.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="resource.execute({ silent: true })">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新', 'Refresh') }}
      </button>
    </header>

    <div v-if="resource.loading" class="page-empty">
      {{ ui.label('正在加载首页快照…', 'Loading the home snapshot…') }}
    </div>

    <div v-else-if="resource.error" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>

    <template v-else-if="resource.data">
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
              <h3>{{ ui.label('继续迁移首页 / 运维 / OpenClaw', 'Keep migrating Home / Operations / OpenClaw') }}</h3>
              <p>{{ ui.label('这一版 Vue 壳层已经接上真实 API，下一批继续迁移渠道、模型、安全、备份与恢复。', 'This Vue shell already talks to real APIs; next we migrate Channels, Models, Security, and Recovery.') }}</p>
            </div>
            <RouterLink class="inline-link" to="/operations">{{ ui.label('查看运维页', 'Open operations') }}</RouterLink>
          </article>
          <article class="action-row">
            <div>
              <h3>{{ ui.label('保持旧控制台可用', 'Keep the legacy console available') }}</h3>
              <p>{{ ui.label('新壳层目前是开发线入口，不替换正式运行时。需要完整能力时仍可打开当前正式控制台。', 'The new shell is a dev-line entry for now and does not replace the production runtime yet.') }}</p>
            </div>
            <a class="inline-link" href="/" target="_blank" rel="noreferrer">{{ ui.label('打开正式控制台', 'Open production console') }}</a>
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
          {{ ui.label('当前 API 未返回结构化风险列表，因此这里先显示为安全占位。后续页面迁移时会继续精炼。', 'The current API did not return structured risks, so this section stays intentionally lightweight for the first scaffold.') }}
        </p>
      </PageCard>
    </template>
  </div>
</template>
