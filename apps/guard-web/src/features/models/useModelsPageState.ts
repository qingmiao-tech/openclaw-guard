import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useAsyncResource } from '@/composables/useAsyncResource';
import { parseOptionalNumber } from '@/features/common/display';
import {
  deleteProviderConfig,
  loadModelsSnapshot,
  saveProviderConfig,
  updateFallbackModels,
  updatePrimaryModel,
  type ConfiguredProvider,
  type CustomProviderRecord,
  type ProviderPreset,
} from '@/services/api/models';
import { useFeedbackStore } from '@/stores/feedback';
import { useUiStore } from '@/stores/ui';

export type PickerOption = {
  value: string;
  label: string;
  kind: 'new' | 'custom' | 'preset';
};

export type RoutingModelOption = {
  providerName: string;
  fullId: string;
  name: string;
  api?: string;
};

export type ProviderDraft = {
  mode: 'new' | 'custom' | 'preset';
  title: string;
  canDelete: boolean;
  name: string;
  baseUrl: string;
  apiType: string;
  apiKey: string;
  apiKeyHelp: string;
  modelsText: string;
};

export type ModelsSnapshot = Awaited<ReturnType<typeof loadModelsSnapshot>>;

const DEFAULT_PROVIDER_KEY = '__new__';
const DEFAULT_API_TYPE = 'openai-completions';

export const MODEL_API_TYPE_OPTIONS = [
  'openai-completions',
  'anthropic-messages',
  'openai-responses',
] as const;

let modelsCache: ModelsSnapshot | null = null;

function formatModelsText(
  models: Array<{
    id: string;
    name?: string;
    contextWindow?: number;
    maxTokens?: number;
    api?: string;
  }>,
  defaultApiType?: string,
) {
  return models
    .map((model) =>
      [
        model.id || '',
        model.name || model.id || '',
        model.contextWindow || '',
        model.maxTokens || '',
        model.api || defaultApiType || '',
      ].join('|'),
    )
    .join('\n');
}

function parseModelsText(textValue: string, defaultApiType: string) {
  return textValue
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [id, name, contextWindow, maxTokens, api] = line
        .split('|')
        .map((part) => part.trim());

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

function buildProviderHint(
  ui: ReturnType<typeof useUiStore>,
  preset: ProviderPreset | undefined,
  customProvider: CustomProviderRecord | undefined,
) {
  if (preset) {
    return ui.label(`预设来源：${preset.name}`, `Preset source: ${preset.name}`);
  }

  if (customProvider?.models?.length) {
    return ui.label(
      `当前已记录 ${customProvider.models.length} 个模型条目`,
      `${customProvider.models.length} model entries are recorded now`,
    );
  }

  return ui.label(
    '保存后会写入当前生效的 openclaw.json。',
    'Saving writes the provider into the active openclaw.json.',
  );
}

export function useModelsPageState() {
  const ui = useUiStore();
  const feedback = useFeedbackStore();
  const resource = useAsyncResource(() => loadModelsSnapshot(), modelsCache, {
    immediate: false,
  });

  const selectedKey = ref(DEFAULT_PROVIDER_KEY);
  const routingSaving = ref(false);
  const providerSaving = ref(false);
  const providerDeleting = ref(false);
  const primaryDraft = ref('');
  const fallbackDraft = ref<string[]>([]);
  const providerDraft = reactive<ProviderDraft>({
    mode: 'new',
    title: '',
    canDelete: false,
    name: '',
    baseUrl: '',
    apiType: DEFAULT_API_TYPE,
    apiKey: '',
    apiKeyHelp: '',
    modelsText: '',
  });

  const pickerOptions = computed<PickerOption[]>(() => {
    const snapshot = resource.data;
    const configuredProviders = snapshot?.config.providers || [];
    const presetProviders = snapshot?.catalog.presets || [];

    return [
      {
        value: DEFAULT_PROVIDER_KEY,
        label: ui.label('新建空白 Provider', 'Create blank provider'),
        kind: 'new',
      },
      ...configuredProviders.map((provider) => ({
        value: provider.name,
        label: `${provider.name} · ${ui.label('已配置', 'Configured')}`,
        kind: 'custom' as const,
      })),
      ...presetProviders
        .filter(
          (preset) =>
            !configuredProviders.some((provider) => provider.name === preset.id),
        )
        .map((preset) => ({
          value: preset.id,
          label: `${preset.id} · ${ui.label('预设', 'Preset')}`,
          kind: 'preset' as const,
        })),
    ];
  });

  const configuredProviders = computed<ConfiguredProvider[]>(
    () => resource.data?.config.providers || [],
  );

  const allModels = computed<RoutingModelOption[]>(() =>
    configuredProviders.value.flatMap((provider) =>
      provider.models.map((model) => ({
        providerName: provider.name,
        fullId: model.fullId,
        name: model.name,
        api: model.api,
      })),
    ),
  );

  const selectedPreset = computed(() =>
    resource.data?.catalog.presets.find((item) => item.id === selectedKey.value),
  );

  const selectedCustomProvider = computed(() =>
    resource.data?.catalog.custom.find((item) => item.name === selectedKey.value),
  );

  const providerHint = computed(() =>
    buildProviderHint(ui, selectedPreset.value, selectedCustomProvider.value),
  );

  function configureDraftFromSelection(selectionKey: string) {
    const snapshot = resource.data;
    if (!snapshot) {
      return;
    }

    const configuredMap = new Map(
      snapshot.config.providers.map((provider) => [provider.name, provider]),
    );
    const customProviderMap = new Map(
      (snapshot.catalog.custom || []).map((provider) => [provider.name, provider]),
    );
    const presetMap = new Map(
      (snapshot.catalog.presets || []).map((provider) => [provider.id, provider]),
    );

    if (!selectionKey || selectionKey === DEFAULT_PROVIDER_KEY) {
      providerDraft.mode = 'new';
      providerDraft.title = ui.label('新建 Provider', 'Create provider');
      providerDraft.canDelete = false;
      providerDraft.name = '';
      providerDraft.baseUrl = '';
      providerDraft.apiType = DEFAULT_API_TYPE;
      providerDraft.apiKey = '';
      providerDraft.apiKeyHelp = ui.label(
        '确认保存后会写入 openclaw.json。',
        'Saved into openclaw.json after you confirm.',
      );
      providerDraft.modelsText = '';
      return;
    }

    const customProvider = customProviderMap.get(selectionKey);
    if (customProvider) {
      const overview = configuredMap.get(selectionKey);
      providerDraft.mode = 'custom';
      providerDraft.title = ui.label(
        '编辑已配置 Provider',
        'Edit configured provider',
      );
      providerDraft.canDelete = true;
      providerDraft.name = selectionKey;
      providerDraft.baseUrl = customProvider.baseUrl || '';
      providerDraft.apiType =
        customProvider.apiType ||
        customProvider.api ||
        customProvider.models?.[0]?.api ||
        DEFAULT_API_TYPE;
      providerDraft.apiKey = '';
      providerDraft.apiKeyHelp = overview?.apiKeyMasked
        ? ui.label(
            `留空会保留当前密钥：${overview.apiKeyMasked}`,
            `Leave blank to keep the current key: ${overview.apiKeyMasked}`,
          )
        : ui.label(
            '填写后会覆盖当前密钥。',
            'A filled value replaces the current key.',
          );
      providerDraft.modelsText = formatModelsText(
        customProvider.models || [],
        providerDraft.apiType,
      );
      return;
    }

    const preset = presetMap.get(selectionKey);
    if (preset) {
      providerDraft.mode = 'preset';
      providerDraft.title = ui.label(
        '从预设带入 Provider',
        'Bootstrap provider from preset',
      );
      providerDraft.canDelete = false;
      providerDraft.name = preset.id;
      providerDraft.baseUrl = preset.defaultBaseUrl || '';
      providerDraft.apiType = preset.apiType || DEFAULT_API_TYPE;
      providerDraft.apiKey = '';
      providerDraft.apiKeyHelp = preset.requiresApiKey
        ? ui.label('保存前请填写 API Key。', 'Fill in the API key before saving.')
        : ui.label(
            '这个 Provider 通常不需要 API Key。',
            'This provider usually does not require an API key.',
          );
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

    selectedKey.value = DEFAULT_PROVIDER_KEY;
  }

  watch(
    () => resource.data,
    (snapshot) => {
      if (snapshot) {
        modelsCache = snapshot;
      }

      if (!snapshot) {
        return;
      }

      primaryDraft.value = snapshot.config.primaryModel || '';
      fallbackDraft.value = [...(snapshot.config.fallbackModels || [])];

      const options = pickerOptions.value;
      if (!options.some((option) => option.value === selectedKey.value)) {
        selectedKey.value = options[1]?.value || DEFAULT_PROVIDER_KEY;
        return;
      }

      configureDraftFromSelection(selectedKey.value);
    },
    { immediate: true },
  );

  watch(selectedKey, (value) => {
    configureDraftFromSelection(value);
  });

  onMounted(() => {
    void resource.execute({ silent: !!resource.data });
  });

  async function refresh() {
    await resource.execute({ silent: true });
  }

  async function handleRoutingSave() {
    routingSaving.value = true;

    try {
      const primaryResult = await updatePrimaryModel(primaryDraft.value);
      if (!primaryResult.success) {
        throw new Error(primaryResult.message);
      }

      const fallbackResult = await updateFallbackModels(
        fallbackDraft.value.filter((item) => item !== primaryDraft.value),
      );
      if (!fallbackResult.success) {
        throw new Error(fallbackResult.message);
      }

      feedback.pushToast({
        tone: 'success',
        message: ui.label(
          '模型路由策略已更新。',
          'Model routing was updated.',
        ),
      });
      await refresh();
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
        selectedKey.value = providerDraft.name.trim() || DEFAULT_PROVIDER_KEY;
        await refresh();
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
    if (!providerDraft.canDelete || !providerDraft.name) {
      return;
    }

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
    if (!confirmed) {
      return;
    }

    providerDeleting.value = true;

    try {
      const result = await deleteProviderConfig(providerDraft.name);
      feedback.pushToast({
        tone: result.success ? 'success' : 'error',
        message: result.message,
      });

      if (result.success) {
        selectedKey.value = DEFAULT_PROVIDER_KEY;
        await refresh();
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

  function resetProviderDraft() {
    configureDraftFromSelection(selectedKey.value);
  }

  return {
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
  };
}
