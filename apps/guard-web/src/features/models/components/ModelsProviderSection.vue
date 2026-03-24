<script setup lang="ts">
import PageCard from '@/features/common/PageCard.vue';
import { useUiStore } from '@/stores/ui';
import type { ConfiguredProvider } from '@/services/api/models';
import type { PickerOption, ProviderDraft } from '../useModelsPageState';

defineProps<{
  pickerOptions: PickerOption[];
  selectedKey: string;
  providerDraft: ProviderDraft;
  providerHint: string;
  apiTypeOptions: readonly string[];
  configuredProviders: ConfiguredProvider[];
  providerSaving: boolean;
  providerDeleting: boolean;
}>();

const emit = defineEmits<{
  'update:selectedKey': [value: string];
  save: [];
  reset: [];
  delete: [];
}>();

const ui = useUiStore();
</script>

<template>
  <div class="page-two-column">
    <PageCard :title="ui.label('Provider 选择器', 'Provider picker')" eyebrow="Provider">
      <div class="catalog-list">
        <button
          v-for="option in pickerOptions"
          :key="option.value"
          class="catalog-list__item"
          :class="{ 'catalog-list__item--active': selectedKey === option.value }"
          type="button"
          @click="emit('update:selectedKey', option.value)"
        >
          <div class="catalog-list__title">
            <strong>{{ option.label }}</strong>
          </div>
          <div class="pill-row">
            <span class="pill" :class="option.kind === 'custom' ? 'pill--success' : option.kind === 'preset' ? 'pill--info' : 'pill--muted'">
              {{
                option.kind === 'custom'
                  ? ui.label('已配置', 'Configured')
                  : option.kind === 'preset'
                    ? ui.label('预设', 'Preset')
                    : ui.label('空白', 'Blank')
              }}
            </span>
          </div>
        </button>
      </div>
    </PageCard>

    <div class="page-stack">
      <PageCard :title="providerDraft.title" eyebrow="Editor">
        <p class="muted-copy">{{ providerHint }}</p>

        <div class="settings-grid settings-grid--wide">
          <label class="settings-field">
            <span>{{ ui.label('Provider 名称', 'Provider name') }}</span>
            <input v-model="providerDraft.name" class="settings-input" type="text" />
          </label>
          <label class="settings-field">
            <span>Base URL</span>
            <input v-model="providerDraft.baseUrl" class="settings-input" type="text" />
          </label>
          <label class="settings-field">
            <span>{{ ui.label('默认 API 类型', 'Default API type') }}</span>
            <select v-model="providerDraft.apiType" class="settings-input">
              <option v-for="option in apiTypeOptions" :key="option" :value="option">{{ option }}</option>
            </select>
          </label>
          <label class="settings-field">
            <span>API Key</span>
            <small>{{ providerDraft.apiKeyHelp }}</small>
            <input v-model="providerDraft.apiKey" class="settings-input" type="password" />
          </label>
          <label class="settings-field settings-field--full">
            <span>{{ ui.label('模型列表', 'Model list') }}</span>
            <small>{{ ui.label('每行格式：id | 名称 | contextWindow | maxTokens | api', 'One line per model: id | name | contextWindow | maxTokens | api') }}</small>
            <textarea v-model="providerDraft.modelsText" class="settings-textarea" rows="8" />
          </label>
        </div>

        <div class="page-actions">
          <button class="inline-link inline-link--primary" type="button" :disabled="providerSaving" @click="emit('save')">
            {{ providerSaving ? ui.label('保存中…', 'Saving…') : ui.label('保存 Provider', 'Save provider') }}
          </button>
          <button class="inline-link" type="button" @click="emit('reset')">
            {{ ui.label('恢复当前内容', 'Reset draft') }}
          </button>
          <button
            v-if="providerDraft.canDelete"
            class="inline-link inline-link--danger"
            type="button"
            :disabled="providerDeleting"
            @click="emit('delete')"
          >
            {{ providerDeleting ? ui.label('删除中…', 'Deleting…') : ui.label('删除 Provider', 'Delete provider') }}
          </button>
        </div>
      </PageCard>

      <PageCard :title="ui.label('已配置 Provider', 'Configured providers')" eyebrow="Overview">
        <div class="provider-stack">
          <article v-for="provider in configuredProviders" :key="provider.name" class="provider-card">
            <header class="provider-card__header">
              <div>
                <strong>{{ provider.name }}</strong>
                <p>{{ provider.baseUrl }}</p>
              </div>
              <div class="pill-row">
                <span v-if="provider.hasApiKey" class="pill pill--success">{{ ui.label('有密钥', 'Has key') }}</span>
                <span v-else class="pill pill--muted">{{ ui.label('无密钥', 'No key') }}</span>
              </div>
            </header>
            <div class="mini-list">
              <div v-for="model in provider.models" :key="model.fullId" class="mini-list__item">
                <div>
                  <strong>{{ model.name }}</strong>
                  <p>{{ model.fullId }}</p>
                </div>
                <div class="pill-row">
                  <span v-if="model.isPrimary" class="pill pill--success">{{ ui.label('主模型', 'Primary') }}</span>
                  <span v-if="model.isFallback" class="pill pill--info">{{ ui.label('备用', 'Fallback') }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </PageCard>
    </div>
  </div>
</template>
