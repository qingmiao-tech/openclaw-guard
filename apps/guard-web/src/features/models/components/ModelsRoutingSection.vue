<script setup lang="ts">
import PageCard from '@/features/common/PageCard.vue';
import { useUiStore } from '@/stores/ui';
import type { RoutingModelOption } from '../useModelsPageState';

defineProps<{
  primaryModel: string;
  providerCount: number;
  fallbackCount: number;
  availableModelCount: number;
  allModels: RoutingModelOption[];
  primaryDraft: string;
  fallbackDraft: string[];
  routingSaving: boolean;
}>();

const emit = defineEmits<{
  'update:primaryDraft': [value: string];
  toggleFallback: [modelId: string];
  save: [];
}>();

const ui = useUiStore();
</script>

<template>
  <div class="page-stack">
    <PageCard :title="ui.label('当前路由概览', 'Current routing overview')" eyebrow="Routing">
      <div class="stat-grid">
        <article class="stat-card">
          <p class="stat-card__label">{{ ui.label('主模型', 'Primary model') }}</p>
          <strong>{{ primaryModel || ui.label('未配置', 'Not configured') }}</strong>
          <span>{{ ui.label('默认执行路径', 'Default execution route') }}</span>
        </article>
        <article class="stat-card">
          <p class="stat-card__label">{{ ui.label('Provider 数量', 'Providers') }}</p>
          <strong>{{ providerCount }}</strong>
          <span>{{ ui.label('已经进入运行配置', 'Already present in runtime config') }}</span>
        </article>
        <article class="stat-card">
          <p class="stat-card__label">{{ ui.label('备用模型', 'Fallbacks') }}</p>
          <strong>{{ fallbackCount }}</strong>
          <span>{{ ui.label('主模型失败时按顺序尝试', 'Tried in sequence when the primary route fails') }}</span>
        </article>
        <article class="stat-card">
          <p class="stat-card__label">{{ ui.label('可选模型', 'Available models') }}</p>
          <strong>{{ availableModelCount }}</strong>
          <span>{{ ui.label('来自当前已配置 Provider', 'Collected from configured providers') }}</span>
        </article>
      </div>
    </PageCard>

    <PageCard :title="ui.label('主模型与备用链路', 'Primary and fallback chain')" eyebrow="Routing editor">
      <div class="settings-grid settings-grid--wide">
        <label class="settings-field">
          <span>{{ ui.label('主模型', 'Primary model') }}</span>
          <small>{{ ui.label('Guard 默认会先走这一条模型路径。', 'Guard routes here first by default.') }}</small>
          <select
            class="settings-input"
            :value="primaryDraft"
            @change="emit('update:primaryDraft', ($event.target as HTMLSelectElement).value)"
          >
            <option value="">{{ ui.label('暂不设置', 'Leave unset') }}</option>
            <option v-for="model in allModels" :key="model.fullId" :value="model.fullId">
              {{ `${model.providerName} / ${model.name}` }}
            </option>
          </select>
        </label>
      </div>

      <div class="checkbox-grid">
        <label v-for="model in allModels" :key="model.fullId" class="checkbox-card">
          <input
            :checked="fallbackDraft.includes(model.fullId)"
            type="checkbox"
            @change="emit('toggleFallback', model.fullId)"
          />
          <div>
            <strong>{{ `${model.providerName} / ${model.name}` }}</strong>
            <p>{{ model.api || ui.label('未声明 API 类型', 'API type is not declared') }}</p>
          </div>
        </label>
      </div>

      <div class="page-actions">
        <button class="inline-link inline-link--primary" type="button" :disabled="routingSaving" @click="emit('save')">
          {{ routingSaving ? ui.label('保存中…', 'Saving…') : ui.label('保存路由策略', 'Save routing strategy') }}
        </button>
      </div>
    </PageCard>
  </div>
</template>
