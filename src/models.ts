import { loadConfig, saveConfig, setNested, getNested } from './config.js';

export interface ProviderDef {
  id: string;
  name: string;
  icon: string;
  defaultBaseUrl: string;
  apiType: string;
  requiresApiKey: boolean;
  suggestedModels: Array<{ id: string; name: string; description?: string; recommended?: boolean }>;
}

export const PROVIDERS: ProviderDef[] = [
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    icon: '🟠',
    defaultBaseUrl: 'https://api.anthropic.com',
    apiType: 'anthropic-messages',
    requiresApiKey: true,
    suggestedModels: [
      { id: 'claude-opus-4-5-20251101', name: 'Claude Opus 4.5', description: '旗舰版本', recommended: true },
      { id: 'claude-sonnet-4-5-20250929', name: 'Claude Sonnet 4.5', description: '均衡版本' },
    ],
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: '🔵',
    defaultBaseUrl: 'https://api.openai.com/v1',
    apiType: 'openai-completions',
    requiresApiKey: true,
    suggestedModels: [
      { id: 'gpt-4o', name: 'GPT-4o', description: '多模态模型', recommended: true },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: '更快更省' },
    ],
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    icon: '🟣',
    defaultBaseUrl: 'https://api.deepseek.com',
    apiType: 'openai-completions',
    requiresApiKey: true,
    suggestedModels: [
      { id: 'deepseek-chat', name: 'DeepSeek V3', description: '最新对话模型', recommended: true },
      { id: 'deepseek-reasoner', name: 'DeepSeek R1', description: '推理增强模型' },
    ],
  },
  {
    id: 'moonshot',
    name: 'Moonshot (Kimi)',
    icon: '🌙',
    defaultBaseUrl: 'https://api.moonshot.cn/v1',
    apiType: 'openai-completions',
    requiresApiKey: true,
    suggestedModels: [
      { id: 'kimi-k2.5', name: 'Kimi K2.5', description: '最新旗舰模型', recommended: true },
      { id: 'moonshot-v1-128k', name: 'Moonshot 128K', description: '超长上下文' },
    ],
  },
  {
    id: 'qwen',
    name: '通义千问 (Qwen)',
    icon: '🟡',
    defaultBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiType: 'openai-completions',
    requiresApiKey: true,
    suggestedModels: [
      { id: 'qwen-max', name: 'Qwen Max', description: '旗舰版本', recommended: true },
      { id: 'qwen-plus', name: 'Qwen Plus', description: '均衡版本' },
    ],
  },
  {
    id: 'glm',
    name: '智谱 (GLM)',
    icon: '🧠',
    defaultBaseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    apiType: 'openai-completions',
    requiresApiKey: true,
    suggestedModels: [
      { id: 'glm-4', name: 'GLM-4', description: '最新旗舰模型', recommended: true },
    ],
  },
  {
    id: 'minimax',
    name: 'MiniMax',
    icon: '🧩',
    defaultBaseUrl: 'https://api.minimax.io/anthropic',
    apiType: 'anthropic-messages',
    requiresApiKey: true,
    suggestedModels: [
      { id: 'minimax-m2.1', name: 'MiniMax M2.1', description: '最新模型', recommended: true },
    ],
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    icon: '🛰️',
    defaultBaseUrl: 'https://openrouter.ai/api/v1',
    apiType: 'openai-completions',
    requiresApiKey: true,
    suggestedModels: [
      { id: 'anthropic/claude-opus-4-5', name: 'Claude Opus 4.5 (via OR)', recommended: true },
    ],
  },
  {
    id: 'ollama',
    name: 'Ollama (本地)',
    icon: '🧪',
    defaultBaseUrl: 'http://localhost:11434',
    apiType: 'openai-completions',
    requiresApiKey: false,
    suggestedModels: [
      { id: 'llama3', name: 'Llama 3', description: '本地运行', recommended: true },
    ],
  },
];

export interface ConfiguredProviderModel {
  fullId: string;
  id: string;
  name: string;
  api?: string;
  contextWindow?: number;
  maxTokens?: number;
  isPrimary: boolean;
  isFallback: boolean;
}

export interface ConfiguredProvider {
  name: string;
  baseUrl: string;
  apiType?: string;
  hasApiKey: boolean;
  apiKeyMasked?: string;
  models: ConfiguredProviderModel[];
}

export interface AIConfigOverview {
  primaryModel: string | null;
  fallbackModels: string[];
  providers: ConfiguredProvider[];
  availableModels: string[];
}

function stripProviderLevelApiType(config: Record<string, any>): void {
  const providers = getNested(config, ['models', 'providers']);
  if (!providers || typeof providers !== 'object' || Array.isArray(providers)) return;
  for (const providerConfig of Object.values(providers as Record<string, any>)) {
    if (providerConfig && typeof providerConfig === 'object' && !Array.isArray(providerConfig) && 'apiType' in providerConfig) {
      delete providerConfig.apiType;
    }
  }
}

export function getAIConfig(): AIConfigOverview {
  const config = loadConfig();
  const primaryModel = getNested(config, ['agents', 'defaults', 'model', 'primary']) || null;
  const fallbackModelsRaw = getNested(config, ['agents', 'defaults', 'model', 'fallbacks']);
  const fallbackModels = Array.isArray(fallbackModelsRaw)
    ? fallbackModelsRaw.filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
    : [];
  const fallbackSet = new Set(fallbackModels);
  const availableModels = Object.keys(getNested(config, ['agents', 'defaults', 'models']) || {});
  const providersObj = getNested(config, ['models', 'providers']) || {};

  const providers: ConfiguredProvider[] = [];
  for (const [name, providerConfig] of Object.entries(providersObj as Record<string, any>)) {
    const baseUrl = providerConfig.baseUrl || '';
    const apiType = providerConfig.apiType || providerConfig.api || providerConfig.models?.[0]?.api || '';
    const apiKey = providerConfig.apiKey;
    const hasApiKey = !!apiKey;
    const apiKeyMasked = apiKey && apiKey.length > 8
      ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}`
      : apiKey ? '****' : undefined;

    const models = (providerConfig.models || []).map((model: any) => {
      const fullId = `${name}/${model.id}`;
      return {
        fullId,
        id: model.id,
        name: model.name || model.id,
        api: model.api,
        contextWindow: typeof model.contextWindow === 'number' ? model.contextWindow : undefined,
        maxTokens: typeof model.maxTokens === 'number' ? model.maxTokens : undefined,
        isPrimary: primaryModel === fullId,
        isFallback: fallbackSet.has(fullId),
      };
    });

    providers.push({ name, baseUrl, apiType, hasApiKey, apiKeyMasked, models });
  }

  return { primaryModel, fallbackModels, providers, availableModels };
}

export function saveProvider(params: {
  name: string;
  baseUrl: string;
  apiKey?: string;
  apiType?: string;
  models: Array<{ id: string; name: string; api?: string; contextWindow?: number; maxTokens?: number }>;
}): { success: boolean; message: string } {
  const name = params.name.trim();
  const baseUrl = params.baseUrl.trim();
  const models = (Array.isArray(params.models) ? params.models : [])
    .map((model) => ({
      id: String(model.id || '').trim(),
      name: String(model.name || model.id || '').trim(),
      api: typeof model.api === 'string' && model.api.trim() ? model.api.trim() : undefined,
      contextWindow: typeof model.contextWindow === 'number' && Number.isFinite(model.contextWindow) ? model.contextWindow : undefined,
      maxTokens: typeof model.maxTokens === 'number' && Number.isFinite(model.maxTokens) ? model.maxTokens : undefined,
    }))
    .filter((model) => model.id);

  if (!name) return { success: false, message: 'Provider 名称不能为空。' };
  if (!baseUrl) return { success: false, message: 'Base URL 不能为空。' };
  if (models.length === 0) return { success: false, message: '至少需要配置一个模型。' };

  const config = loadConfig();
  const effectiveApiType = params.apiType?.trim() || 'openai-completions';
  stripProviderLevelApiType(config);
  const existingProvider = getNested(config, ['models', 'providers', name]) || {};
  const existingApiKey = typeof existingProvider.apiKey === 'string' ? existingProvider.apiKey : undefined;

  setNested(config, ['models', 'providers'], getNested(config, ['models', 'providers']) || {});
  if (!getNested(config, ['agents', 'defaults', 'models'])) {
    setNested(config, ['agents', 'defaults', 'models'], {});
  }

  const providerConfig: Record<string, any> = {
    baseUrl,
    models: models.map((model) => ({
      id: model.id,
      name: model.name,
      api: model.api || effectiveApiType,
      input: ['text'],
      contextWindow: model.contextWindow ?? 200000,
      maxTokens: model.maxTokens ?? 8192,
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    })),
  };

  if (params.apiKey && params.apiKey.trim()) {
    providerConfig.apiKey = params.apiKey.trim();
  } else {
    if (existingApiKey) providerConfig.apiKey = existingApiKey;
  }

  config.models.providers[name] = providerConfig;

  for (const model of models) {
    const fullId = `${name}/${model.id}`;
    setNested(config, ['agents', 'defaults', 'models', fullId], getNested(config, ['agents', 'defaults', 'models', fullId]) || {});
  }

  setNested(config, ['meta', 'lastTouchedAt'], new Date().toISOString());

  try {
    saveConfig(config, { merge: false });
    return { success: true, message: `Provider ${name} 已保存。` };
  } catch (error) {
    return { success: false, message: `保存失败：${error}` };
  }
}

export function deleteProvider(name: string): { success: boolean; message: string } {
  const providerName = name.trim();
  if (!providerName) return { success: false, message: 'Provider 名称不能为空。' };

  const config = loadConfig();
  stripProviderLevelApiType(config);
  const providers = getNested(config, ['models', 'providers']);
  if (providers) delete providers[providerName];

  const models = getNested(config, ['agents', 'defaults', 'models']);
  if (models) {
    for (const key of Object.keys(models)) {
      if (key.startsWith(`${providerName}/`)) delete models[key];
    }
  }

  const primary = getNested(config, ['agents', 'defaults', 'model', 'primary']);
  if (typeof primary === 'string' && primary.startsWith(`${providerName}/`)) {
    setNested(config, ['agents', 'defaults', 'model', 'primary'], null);
  }

  const fallbackModels = getNested(config, ['agents', 'defaults', 'model', 'fallbacks']);
  if (Array.isArray(fallbackModels)) {
    setNested(
      config,
      ['agents', 'defaults', 'model', 'fallbacks'],
      fallbackModels.filter((modelId: unknown) => typeof modelId !== 'string' || !modelId.startsWith(`${providerName}/`)),
    );
  }

  setNested(config, ['meta', 'lastTouchedAt'], new Date().toISOString());

  try {
    saveConfig(config, { merge: false });
    return { success: true, message: `Provider ${providerName} 已删除。` };
  } catch (error) {
    return { success: false, message: `删除失败：${error}` };
  }
}

export function setPrimaryModel(modelId: string): { success: boolean; message: string } {
  const nextModelId = modelId.trim();
  const config = loadConfig();
  stripProviderLevelApiType(config);
  setNested(config, ['agents', 'defaults', 'model', 'primary'], nextModelId || null);
  setNested(config, ['meta', 'lastTouchedAt'], new Date().toISOString());

  try {
    saveConfig(config, { merge: false });
    return {
      success: true,
      message: nextModelId ? `主模型已切换为 ${nextModelId}。` : '主模型已清空。',
    };
  } catch (error) {
    return { success: false, message: `设置失败：${error}` };
  }
}

export function setFallbackModels(modelIds: string[]): { success: boolean; message: string } {
  const config = loadConfig();
  stripProviderLevelApiType(config);

  const normalized = Array.from(
    new Set(
      (Array.isArray(modelIds) ? modelIds : [])
        .map((id) => String(id || '').trim())
        .filter(Boolean),
    ),
  );

  const modelNode = getNested(config, ['agents', 'defaults', 'model']);
  if (!modelNode || typeof modelNode !== 'object' || Array.isArray(modelNode)) {
    const existingPrimary =
      typeof modelNode === 'string'
        ? modelNode
        : getNested(config, ['agents', 'defaults', 'model', 'primary']) || null;
    setNested(config, ['agents', 'defaults', 'model'], {
      primary: existingPrimary,
      fallbacks: normalized,
    });
  } else {
    setNested(config, ['agents', 'defaults', 'model', 'fallbacks'], normalized);
  }

  if (!getNested(config, ['agents', 'defaults', 'models'])) {
    setNested(config, ['agents', 'defaults', 'models'], {});
  }
  for (const id of normalized) {
    setNested(config, ['agents', 'defaults', 'models', id], getNested(config, ['agents', 'defaults', 'models', id]) || {});
  }

  setNested(config, ['meta', 'lastTouchedAt'], new Date().toISOString());

  try {
    saveConfig(config, { merge: false });
    if (normalized.length > 0) {
      return { success: true, message: `Fallback 链已更新：${normalized.join(' -> ')}` };
    }
    return { success: true, message: 'Fallback 链已清空。' };
  } catch (error) {
    return { success: false, message: `设置失败：${error}` };
  }
}
