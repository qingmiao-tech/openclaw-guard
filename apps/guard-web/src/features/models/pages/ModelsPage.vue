<script setup lang="ts">
import ModelsProviderSection from '@/features/models/components/ModelsProviderSection.vue';
import ModelsRoutingSection from '@/features/models/components/ModelsRoutingSection.vue';
import {
  MODEL_API_TYPE_OPTIONS,
  useModelsPageState,
} from '@/features/models/useModelsPageState';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
const {
  resource,
  selectedKey,
  routingSaving,
  providerSaving,
  providerDeleting,
  primaryDraft,
  fallbackDraft,
  providerDraft,
  pickerOptions,
  configuredProviders,
  allModels,
  providerHint,
  refresh,
  handleRoutingSave,
  handleProviderSave,
  handleProviderDelete,
  toggleFallback,
  resetProviderDraft,
} = useModelsPageState();
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('模型 / 策略', 'Models / Strategy') }}</p>
        <h2 class="page-header__title">{{ ui.label('模型策略', 'Model strategy') }}</h2>
        <p class="page-header__description">
          {{ ui.label('把 Provider、主模型和 fallback 链路放到模块化页面里，同时保持当前 openclaw.json 的真实读写。', 'Move providers, the primary model, and the fallback chain into the modular page while keeping real read-write access to the current openclaw.json.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="refresh">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新', 'Refresh') }}
      </button>
    </header>

    <div v-if="resource.loading && !resource.data" class="page-empty">
      {{ ui.label('正在读取模型配置…', 'Loading model configuration…') }}
    </div>
    <div v-else-if="resource.error && !resource.data" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>
    <template v-else-if="resource.data">
      <div v-if="resource.error" class="status-banner status-banner--warning">
        {{ ui.label('已保留上一版模型快照，但后台刷新失败：', 'The last model snapshot is still on screen, but the background refresh failed: ') }}{{ resource.error }}
      </div>

      <ModelsRoutingSection
        :primary-model="resource.data.config.primaryModel || ''"
        :provider-count="resource.data.config.providers.length"
        :fallback-count="resource.data.config.fallbackModels.length"
        :available-model-count="allModels.length"
        :all-models="allModels"
        :primary-draft="primaryDraft"
        :fallback-draft="fallbackDraft"
        :routing-saving="routingSaving"
        @update:primary-draft="primaryDraft = $event"
        @toggle-fallback="toggleFallback"
        @save="handleRoutingSave"
      />

      <ModelsProviderSection
        :picker-options="pickerOptions"
        :selected-key="selectedKey"
        :provider-draft="providerDraft"
        :provider-hint="providerHint"
        :api-type-options="MODEL_API_TYPE_OPTIONS"
        :configured-providers="configuredProviders"
        :provider-saving="providerSaving"
        :provider-deleting="providerDeleting"
        @update:selected-key="selectedKey = $event"
        @save="handleProviderSave"
        @reset="resetProviderDraft"
        @delete="handleProviderDelete"
      />
    </template>
  </div>
</template>
