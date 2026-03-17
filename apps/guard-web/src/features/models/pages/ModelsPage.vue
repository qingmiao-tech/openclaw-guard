<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useAsyncResource } from '@/composables/useAsyncResource';
import { parseOptionalNumber } from '@/features/common/display';
import PageCard from '@/features/common/PageCard.vue';
import {
  deleteProviderConfig,
  loadModelsSnapshot,
  saveProviderConfig,
  updateFallbackModels,
  updatePrimaryModel,
  type CustomProviderRecord,
  type ProviderPreset,
} from '@/services/api/models';
import { useFeedbackStore } from '@/stores/feedback';
import { useUiStore } from '@/stores/ui';

type PickerOption = {
  value: string;
  label: string;
  kind: 'new' | 'custom' | 'preset';
};

const API_TYPE_OPTIONS = ['openai-completions', 'anthropic-messages', 'openai-responses'];

const ui = useUiStore();
const feedback = useFeedbackStore();
const resource = useAsyncResource(() => loadModelsSnapshot());
const selectedKey = ref('__new__');
const routingSaving = ref(false);
const providerSaving = ref(false);
const providerDeleting = ref(false);
const primaryDraft = ref('');
const fallbackDraft = ref<string[]>([]);
const providerDraft = reactive({
  mode: 'new' as 'new' | 'custom' | 'preset',
  title: '',
  canDelete: false,
  name: '',
  baseUrl: '',
  apiType: 'openai-completions',
  apiKey: '',
  apiKeyHelp: '',
  modelsText: '',
});

const pickerOptions = computed<PickerOption[]>(() => {
  const snapshot = resource.data;
  const configuredProviders = snapshot?.config.providers || [];
  const presetProviders = snapshot?.catalog.presets || [];

  return [
    { value: '__new__', label: ui.label('新建空白 Provider', 'Create blank provider'), kind: 'new' },
    ...configuredProviders.map((provider) => ({
      value: provider.name,
      label: `${provider.name} · ${ui.label('已配置', 'configured')}`,
      kind: 'custom' as const,
    })),
    ...presetProviders
      .filter((preset) => !configuredProviders.some((provider) => provider.name === preset.id))
      .map((preset) => ({
        value: preset.id,
        label: `${preset.id} · ${ui.label('预设', 'preset')}`,
        kind: 'preset' as const,
      })),
  ];
});

const allModels = computed(() => {
  const providers = resource.data?.config.providers || [];
  return providers.flatMap((provider) => provider.models.map((model) => ({
    providerName: provider.name,
    fullId: model.fullId,
    name: model.name,
    api: model.api,
  })));
});

function formatModelsText(models: Array<{ id: string; name?: string; contextWindow?: number; maxTokens?: number; api?: string }>, defaultApiType?: string) {
  return models.map((model) => [
    model.id || '',
    model.name || model.id || '',
    model.contextWindow || '',
    model.maxTokens || '',
    model.api || defaultApiType || '',
  ].join('|')).join('\n');
}

function parseModelsText(textValue: string, defaultApiType: string) {
  return textValue
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [id, name, contextWindow, maxTokens, api] = line.split('|').map((part) => part.trim());
      return {
        id,
        name: name || id,
        contextWindow: parseOptionalNumber(contextWindow),
        maxTokens: parseOptionalNumber(maxTokens),
        api: api || defaultApiType || undefined,
      };
    })
    .filter((model) => model.id);
}

function configureDraftFromSelection(selectionKey: string) {
  const snapshot = resource.data;
  if (!snapshot) return;

  const configuredProviders = snapshot.config.providers;
  const configuredMap = new Map(configuredProviders.map((provider) => [provider.name, provider]));
  const customProviderMap = new Map((snapshot.catalog.custom || []).map((provider) => [provider.name, provider]));
  const presetMap = new Map((snapshot.catalog.presets || []).map((provider) => [provider.id, provider]));

  if (!selectionKey || selectionKey === '__new__') {
    providerDraft.mode = 'new';
    providerDraft.title = ui.label('新建 Provider', 'Create provider');
    providerDraft.canDelete = false;
    providerDraft.name = '';
    providerDraft.baseUrl = '';
    providerDraft.apiType = 'openai-completions';
    providerDraft.apiKey = '';
    providerDraft.apiKeyHelp = ui.label('保存后写入 openclaw.json。', 'Saved into openclaw.json after you confirm.');
    providerDraft.modelsText = '';
    return;
  }

  const customProvider = customProviderMap.get(selectionKey);
  if (customProvider) {
    const overview = configuredMap.get(selectionKey);
    providerDraft.mode = 'custom';
    providerDraft.title = ui.label('编辑已配置 Provider', 'Edit configured provider');
    providerDraft.canDelete = true;
    providerDraft.name = selectionKey;
    providerDraft.baseUrl = customProvider.baseUrl || '';
    providerDraft.apiType = customProvider.apiType || customProvider.api || customProvider.models?.[0]?.api || 'openai-completions';
    providerDraft.apiKey = '';
    providerDraft.apiKeyHelp = overview?.apiKeyMasked
      ? ui.label(`留空会保留现有密钥：${overview.apiKeyMasked}`, `Leave blank to keep the current key: ${overview.apiKeyMasked}`)
      : ui.label('填写后会覆盖当前密钥。', 'A filled value replaces the current key.');
    providerDraft.modelsText = formatModelsText(customProvider.models || [], providerDraft.apiType);
    return;
  }

  const preset = presetMap.get(selectionKey);
  if (preset) {
    providerDraft.mode = 'preset';
    providerDraft.title = ui.label('从预设带入 Provider', 'Bootstrap provider from preset');
    providerDraft.canDelete = false;
    providerDraft.name = preset.id;
    providerDraft.baseUrl = preset.defaultBaseUrl || '';
    providerDraft.apiType = preset.apiType || 'openai-completions';
    providerDraft.apiKey = '';
    providerDraft.apiKeyHelp = preset.requiresApiKey
      ? ui.label('保存前请填写 API Key。', 'Fill in the API key before saving.')
      : ui.label('这个 Provider 通常不需要 API Key。', 'This provider usually does not require an API key.');
    providerDraft.modelsText = formatModelsText(
      (preset.suggestedModels || []).map((model) => ({
        id: model.id,
        name: model.name,
        api: preset.apiType,
      })),
      preset.apiType,
    );
    return;
  }

  selectedKey.value = '__new__';
}

watch(
  () => resource.data,
  (snapshot) => {
    if (!snapshot) return;
    primaryDraft.value = snapshot.config.primaryModel || '';
    fallbackDraft.value = [...(snapshot.config.fallbackModels || [])];

    const options = pickerOptions.value;
    if (!options.some((option) => option.value === selectedKey.value)) {
      selectedKey.value = options[1]?.value || '__new__';
      return;
    }
    configureDraftFromSelection(selectedKey.value);
  },
  { immediate: true },
);

watch(selectedKey, (value) => {
  configureDraftFromSelection(value);
});

async function handleRoutingSave() {
  routingSaving.value = true;
  try {
    const primaryResult = await updatePrimaryModel(primaryDraft.value);
    if (!primaryResult.success) {
      throw new Error(primaryResult.message);
    }

    const fallbackResult = await updateFallbackModels(fallbackDraft.value.filter((item) => item !== primaryDraft.value));
    if (!fallbackResult.success) {
      throw new Error(fallbackResult.message);
    }

    feedback.pushToast({
      tone: 'success',
      message: ui.label('模型路由已更新。', 'Model routing was updated.'),
    });
    await resource.execute({ silent: true });
  } catch (error) {
    feedback.pushToast({
      tone: 'error',
      message: error instanceof Error ? error.message : String(error),
    });
  } finally {
    routingSaving.value = false;
  }
}

async function handleProviderSave() {
  providerSaving.value = true;
  try {
    const result = await saveProviderConfig({
      name: providerDraft.name.trim(),
      baseUrl: providerDraft.baseUrl.trim(),
      apiKey: providerDraft.apiKey.trim() || undefined,
      apiType: providerDraft.apiType,
      models: parseModelsText(providerDraft.modelsText, providerDraft.apiType),
    });
    feedback.pushToast({
      tone: result.success ? 'success' : 'error',
      message: result.message,
    });
    if (result.success) {
      selectedKey.value = providerDraft.name.trim() || '__new__';
      await resource.execute({ silent: true });
    }
  } catch (error) {
    feedback.pushToast({
      tone: 'error',
      message: error instanceof Error ? error.message : String(error),
    });
  } finally {
    providerSaving.value = false;
  }
}

async function handleProviderDelete() {
  if (!providerDraft.canDelete || !providerDraft.name) return;

  const confirmed = await feedback.confirm({
    title: ui.label('删除 Provider', 'Delete provider'),
    message: ui.label(
      `确认删除 ${providerDraft.name} 吗？这会同时移除它的模型定义、主模型引用和备用链路。`,
      `Delete ${providerDraft.name}? This also removes its model definitions, primary selection, and fallback references.`,
    ),
    confirmLabel: ui.label('确认删除', 'Delete provider'),
    cancelLabel: ui.label('取消', 'Cancel'),
    tone: 'danger',
  });
  if (!confirmed) return;

  providerDeleting.value = true;
  try {
    const result = await deleteProviderConfig(providerDraft.name);
    feedback.pushToast({
      tone: result.success ? 'success' : 'error',
      message: result.message,
    });
    if (result.success) {
      selectedKey.value = '__new__';
      await resource.execute({ silent: true });
    }
  } catch (error) {
    feedback.pushToast({
      tone: 'error',
      message: error instanceof Error ? error.message : String(error),
    });
  } finally {
    providerDeleting.value = false;
  }
}

function toggleFallback(modelId: string) {
  if (fallbackDraft.value.includes(modelId)) {
    fallbackDraft.value = fallbackDraft.value.filter((item) => item !== modelId);
    return;
  }
  fallbackDraft.value = [...fallbackDraft.value, modelId];
}

function presetHint(preset: ProviderPreset | undefined, customProvider: CustomProviderRecord | undefined) {
  if (preset) {
    return ui.label(`预设入口：${preset.name}`, `Preset source: ${preset.name}`);
  }
  if (customProvider?.models?.length) {
    return ui.label(`当前已录入 ${customProvider.models.length} 个模型`, `${customProvider.models.length} model entries are recorded now`);
  }
  return ui.label('保存后就会写入当前 openclaw.json。', 'Saving writes the provider into the active openclaw.json.');
}
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('模型 / Second slice', 'Models / Second slice') }}</p>
        <h2 class="page-header__title">{{ ui.label('模型策略', 'Model strategy') }}</h2>
        <p class="page-header__description">
          {{ ui.label('把 Provider、主模型和 fallback 链迁到模块化页面里，同时保持当前 openclaw.json 的真实读写。', 'Move providers, the primary model, and the fallback chain into the modular page while keeping real read-write access to the current openclaw.json.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="resource.execute({ silent: true })">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新', 'Refresh') }}
      </button>
    </header>

    <div v-if="resource.loading" class="page-empty">
      {{ ui.label('正在读取模型配置…', 'Loading model configuration…') }}
    </div>
    <div v-else-if="resource.error" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>
    <template v-else-if="resource.data">
      <PageCard :title="ui.label('当前路由概览', 'Current routing overview')" eyebrow="Routing">
        <div class="stat-grid">
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('主模型', 'Primary model') }}</p>
            <strong>{{ resource.data.config.primaryModel || ui.label('待设置', 'Not configured') }}</strong>
            <span>{{ ui.label('默认执行路径', 'Default execution route') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('Provider 数量', 'Providers') }}</p>
            <strong>{{ resource.data.config.providers.length }}</strong>
            <span>{{ ui.label('已经进入运行配置', 'Already present in runtime config') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('备用模型', 'Fallbacks') }}</p>
            <strong>{{ resource.data.config.fallbackModels.length }}</strong>
            <span>{{ ui.label('主模型失败时按顺序尝试', 'Tried in sequence when the primary route fails') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('可选模型', 'Available models') }}</p>
            <strong>{{ allModels.length }}</strong>
            <span>{{ ui.label('来自当前已配置 Provider', 'Collected from configured providers') }}</span>
          </article>
        </div>
      </PageCard>

      <PageCard :title="ui.label('主模型与备用链路', 'Primary and fallback chain')" eyebrow="Routing editor">
        <div class="settings-grid settings-grid--wide">
          <label class="settings-field">
            <span>{{ ui.label('主模型', 'Primary model') }}</span>
            <small>{{ ui.label('Guard 默认先走这一条模型路径。', 'Guard routes here first by default.') }}</small>
            <select v-model="primaryDraft" class="settings-input">
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
              @change="toggleFallback(model.fullId)"
            />
            <div>
              <strong>{{ `${model.providerName} / ${model.name}` }}</strong>
              <p>{{ model.api || ui.label('未声明 API 类型', 'API type is not declared') }}</p>
            </div>
          </label>
        </div>

        <div class="page-actions">
          <button class="inline-link inline-link--primary" type="button" :disabled="routingSaving" @click="handleRoutingSave">
            {{ routingSaving ? ui.label('保存中…', 'Saving…') : ui.label('保存路由策略', 'Save routing strategy') }}
          </button>
        </div>
      </PageCard>

      <div class="page-two-column">
        <PageCard :title="ui.label('Provider 选择器', 'Provider picker')" eyebrow="Provider">
          <div class="catalog-list">
            <button
              v-for="option in pickerOptions"
              :key="option.value"
              class="catalog-list__item"
              :class="{ 'catalog-list__item--active': selectedKey === option.value }"
              type="button"
              @click="selectedKey = option.value"
            >
              <div class="catalog-list__title">
                <strong>{{ option.label }}</strong>
              </div>
              <div class="pill-row">
                <span class="pill" :class="option.kind === 'custom' ? 'pill--success' : option.kind === 'preset' ? 'pill--info' : 'pill--muted'">
                  {{ option.kind === 'custom' ? ui.label('已配置', 'Configured') : option.kind === 'preset' ? ui.label('预设', 'Preset') : ui.label('空白', 'Blank') }}
                </span>
              </div>
            </button>
          </div>
        </PageCard>

        <div class="page-stack">
          <PageCard :title="providerDraft.title" eyebrow="Editor">
            <p class="muted-copy">
              {{ presetHint(resource.data.catalog.presets.find((item) => item.id === selectedKey), resource.data.catalog.custom.find((item) => item.name === selectedKey)) }}
            </p>

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
                  <option v-for="option in API_TYPE_OPTIONS" :key="option" :value="option">{{ option }}</option>
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
              <button class="inline-link inline-link--primary" type="button" :disabled="providerSaving" @click="handleProviderSave">
                {{ providerSaving ? ui.label('保存中…', 'Saving…') : ui.label('保存 Provider', 'Save provider') }}
              </button>
              <button class="inline-link" type="button" @click="configureDraftFromSelection(selectedKey)">
                {{ ui.label('恢复当前内容', 'Reset draft') }}
              </button>
              <button
                v-if="providerDraft.canDelete"
                class="inline-link inline-link--danger"
                type="button"
                :disabled="providerDeleting"
                @click="handleProviderDelete"
              >
                {{ providerDeleting ? ui.label('删除中…', 'Deleting…') : ui.label('删除 Provider', 'Delete provider') }}
              </button>
            </div>
          </PageCard>

          <PageCard :title="ui.label('已配置 Provider', 'Configured providers')" eyebrow="Overview">
            <div class="provider-stack">
              <article v-for="provider in resource.data.config.providers" :key="provider.name" class="provider-card">
                <header class="provider-card__header">
                  <div>
                    <strong>{{ provider.name }}</strong>
                    <p>{{ provider.baseUrl }}</p>
                  </div>
                  <div class="pill-row">
                    <span class="pill pill--success" v-if="provider.hasApiKey">{{ ui.label('有密钥', 'Has key') }}</span>
                    <span class="pill pill--muted" v-else>{{ ui.label('无密钥', 'No key') }}</span>
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
  </div>
</template>
