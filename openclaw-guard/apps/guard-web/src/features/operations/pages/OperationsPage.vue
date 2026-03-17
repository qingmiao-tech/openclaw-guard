<script setup lang="ts">
import { useAsyncResource } from '@/composables/useAsyncResource';
import PageCard from '@/features/common/PageCard.vue';
import { loadOperationsSnapshot } from '@/services/api/dashboard';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
const resource = useAsyncResource(() => loadOperationsSnapshot());

function prettyPrint(value: unknown) {
  return JSON.stringify(value, null, 2);
}
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('运维 / First slice', 'Operations / First slice') }}</p>
        <h2 class="page-header__title">{{ ui.label('运行态与后台服务', 'Runtime and background services') }}</h2>
        <p class="page-header__description">
          {{ ui.label('先把状态读取、最小刷新和结构化信息展示模块化。后续再逐步迁移交互按钮。', 'Modularize status reads, light refresh, and structured rendering first. Button interactions can follow in later slices.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="resource.execute({ silent: true })">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新', 'Refresh') }}
      </button>
    </header>

    <div v-if="resource.loading" class="page-empty">
      {{ ui.label('正在加载运维状态…', 'Loading operations status…') }}
    </div>
    <div v-else-if="resource.error" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>
    <template v-else-if="resource.data">
      <PageCard :title="ui.label('后台 Web 报告', 'Background web report')" eyebrow="Web report">
        <pre class="code-panel">{{ prettyPrint(resource.data.webReport) }}</pre>
      </PageCard>

      <PageCard :title="ui.label('服务状态原始快照', 'Service status snapshot')" eyebrow="Services">
        <pre class="code-panel">{{ prettyPrint(resource.data.services) }}</pre>
      </PageCard>
    </template>
  </div>
</template>
