/**
 * AI 模型/Provider 配置管理模块
 * 管理多个 AI 提供商和模型配置
 */
import { loadConfig, saveConfig, setNested, getNested, deleteNested } from './config.js';

export interface ProviderDef {
  id: string;
  name: string;
  icon: string;
  defaultBaseUrl: string;
  apiType: string;
  requiresApiKey: boolean;
  suggestedModels: Array<{ id: string; name: string; description?: string; recommended?: boolean }>;
}

/** 预设 Provider 列表 */
export const PROVIDERS: ProviderDef[] = [
  {
    id: 'anthropic', name: 'Anthropic Claude', icon: '🟣',
    defaultBaseUrl: 'https://api.anthropic.com', apiType: 'anthropic-messages', requiresApiKey: true,
    suggestedModels: [
      { id: 'claude-opus-4-5-20251101', name: 'Claude Opus 4.5', description: '最强大版本', recommended: true },
      { id: 'claude-sonnet-4-5-20250929', name: 'Claude Sonnet 4.5', description: '平衡版本' },
    ],
  },
  {
    id: 'openai', name: 'OpenAI', icon: '🟢',
    defaultBaseUrl: 'https://api.openai.com/v1', apiType: 'openai-completions', requiresApiKey: true,
    suggestedModels: [
      { id: 'gpt-4o', name: 'GPT-4o', description: '多模态模型', recommended: true },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: '快速经济版' },
    ],
  },
  {
    id: 'deepseek', name: 'DeepSeek', icon: '🔵',
    defaultBaseUrl: 'https://api.deepseek.com', apiType: 'openai-completions', requiresApiKey: true,
    suggestedModels: [
      { id: 'deepseek-chat', name: 'DeepSeek V3', description: '最新对话模型', recommended: true },
      { id: 'deepseek-reasoner', name: 'DeepSeek R1', description: '推理增强模型' },
    ],
  },
  {
    id: 'moonshot', name: 'Moonshot (Kimi)', icon: '🌙',
    defaultBaseUrl: 'https://api.moonshot.cn/v1', apiType: 'openai-completions', requiresApiKey: true,
    suggestedModels: [
      { id: 'kimi-k2.5', name: 'Kimi K2.5', description: '最新旗舰模型', recommended: true },
      { id: 'moonshot-v1-128k', name: 'Moonshot 128K', description: '超长上下文' },
    ],
  },
  {
    id: 'qwen', name: '通义千问 (Qwen)', icon: '🔮',
    defaultBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1', apiType: 'openai-completions', requiresApiKey: true,
    suggestedModels: [
      { id: 'qwen-max', name: 'Qwen Max', description: '最强大版本', recommended: true },
      { id: 'qwen-plus', name: 'Qwen Plus', description: '平衡版本' },
    ],
  },
  {
    id: 'glm', name: '智谱 (GLM)', icon: '🔷',

    defaultBaseUrl: 'https://open.bigmodel.cn/api/paas/v4', apiType: 'openai-completions', requiresApiKey: true,
    suggestedModels: [
      { id: 'glm-4', name: 'GLM-4', description: '最新旗舰模型', recommended: true },
    ],
  },
  {
    id: 'minimax', name: 'MiniMax', icon: '🟡',
    defaultBaseUrl: 'https://api.minimax.io/anthropic', apiType: 'anthropic-messages', requiresApiKey: true,
    suggestedModels: [
      { id: 'minimax-m2.1', name: 'MiniMax M2.1', description: '最新模型', recommended: true },
    ],
  },
  {
    id: 'openrouter', name: 'OpenRouter', icon: '🔄',
    defaultBaseUrl: 'https://openrouter.ai/api/v1', apiType: 'openai-completions', requiresApiKey: true,
    suggestedModels: [
      { id: 'anthropic/claude-opus-4-5', name: 'Claude Opus 4.5 (via OR)', recommended: true },
    ],
  },
  {
    id: 'ollama', name: 'Ollama (本地)', icon: '🟠',
    defaultBaseUrl: 'http://localhost:11434', apiType: 'openai-completions', requiresApiKey: false,
    suggestedModels: [
      { id: 'llama3', name: 'Llama 3', description: '本地运行', recommended: true },
    ],
  },
];

export interface ConfiguredProvider {
  name: string;
  baseUrl: string;
  hasApiKey: boolean;
  apiKeyMasked?: string;
  models: Array<{ fullId: string; id: string; name: string; isPrimary: boolean; isFallback: boolean }>;
}

export interface AIConfigOverview {
  primaryModel: string | null;
  fallbackModels: string[];
  providers: ConfiguredProvider[];
  availableModels: string[];
}

/** 获取 AI 配置概览 */
export function getAIConfig(): AIConfigOverview {
  const config = loadConfig();
  const primaryModel = getNested(config, ['agents', 'defaults', 'model', 'primary']) || null;
  const fallbackModelsRaw = getNested(config, ['agents', 'defaults', 'model', 'fallbacks']);
  const fallbackModels = Array.isArray(fallbackModelsRaw)
    ? fallbackModelsRaw.filter((v): v is string => typeof v === 'string' && v.trim().length > 0)
    : [];
  const fallbackSet = new Set(fallbackModels);
  const availableModels = Object.keys(getNested(config, ['agents', 'defaults', 'models']) || {});
  const providersObj = getNested(config, ['models', 'providers']) || {};

  const providers: ConfiguredProvider[] = [];
  for (const [name, pCfg] of Object.entries(providersObj as Record<string, any>)) {
    const baseUrl = pCfg.baseUrl || '';
    const apiKey = pCfg.apiKey;
    const hasApiKey = !!apiKey;
    const apiKeyMasked = apiKey && apiKey.length > 8
      ? `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}`
      : apiKey ? '****' : undefined;

    const models = (pCfg.models || []).map((m: any) => {
      const fullId = `${name}/${m.id}`;
      return {
        fullId,
        id: m.id,
        name: m.name || m.id,
        isPrimary: primaryModel === fullId,
        isFallback: fallbackSet.has(fullId),
      };
    });

    providers.push({ name, baseUrl, hasApiKey, apiKeyMasked, models });
  }

  return { primaryModel, fallbackModels, providers, availableModels };
}

/** 保存 Provider 配置 */
export function saveProvider(params: {
  name: string;
  baseUrl: string;
  apiKey?: string;
  apiType?: string;
  models: Array<{ id: string; name: string; api?: string; contextWindow?: number; maxTokens?: number }>;
}): { success: boolean; message: string } {
  const config = loadConfig();
  const effectiveApiType = params.apiType || 'openai-completions';

  // 确保路径存在
  setNested(config, ['models', 'providers', params.name], {});
  if (!getNested(config, ['agents', 'defaults', 'models'])) {
    setNested(config, ['agents', 'defaults', 'models'], {});
  }

  // 构建 Provider 配置
  const providerConfig: Record<string, any> = {
    baseUrl: params.baseUrl,
    apiType: effectiveApiType,
    models: params.models.map(m => ({
      id: m.id,
      name: m.name,
      api: m.api || effectiveApiType,
      input: ['text'],
      contextWindow: m.contextWindow !== undefined ? m.contextWindow : 200000,
      maxTokens: m.maxTokens !== undefined ? m.maxTokens : 8192,
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    })),
  };

  // 处理 API Key
  if (params.apiKey && params.apiKey.trim()) {
    providerConfig.apiKey = params.apiKey;
  } else {
    // 保留已有的 key
    const existing = getNested(config, ['models', 'providers', params.name, 'apiKey']);
    if (existing) providerConfig.apiKey = existing;
  }

  config.models.providers[params.name] = providerConfig;

  // 将模型添加到 agents.defaults.models
  for (const m of params.models) {
    const fullId = `${params.name}/${m.id}`;
    setNested(config, ['agents', 'defaults', 'models', fullId], {});
  }

  // 更新 meta
  setNested(config, ['meta', 'lastTouchedAt'], new Date().toISOString());

  try {
    saveConfig(config);
    return { success: true, message: `Provider ${params.name} 已保存` };
  } catch (err) {
    return { success: false, message: `保存失败: ${err}` };
  }
}


/** 删除 Provider */
export function deleteProvider(name: string): { success: boolean; message: string } {
  const config = loadConfig();

  // 删除 Provider
  const providers = getNested(config, ['models', 'providers']);
  if (providers) delete providers[name];

  // 删除相关模型
  const models = getNested(config, ['agents', 'defaults', 'models']);
  if (models) {
    for (const key of Object.keys(models)) {
      if (key.startsWith(`${name}/`)) delete models[key];
    }
  }

  // 如果主模型属于该 Provider，清除
  const primary = getNested(config, ['agents', 'defaults', 'model', 'primary']);
  if (primary && typeof primary === 'string' && primary.startsWith(`${name}/`)) {
    setNested(config, ['agents', 'defaults', 'model', 'primary'], null);
  }

  // 娓呯悊 fallbacks 涓 Provider 鐨勬ā鍨?
  const fallbackModels = getNested(config, ['agents', 'defaults', 'model', 'fallbacks']);
  if (Array.isArray(fallbackModels)) {
    const nextFallbacks = fallbackModels.filter(
      (modelId: unknown) => typeof modelId !== 'string' || !modelId.startsWith(`${name}/`),
    );
    setNested(config, ['agents', 'defaults', 'model', 'fallbacks'], nextFallbacks);
  }

  try {
    saveConfig(config);
    return { success: true, message: `Provider ${name} 已删除` };
  } catch (err) {
    return { success: false, message: `删除失败: ${err}` };
  }
}

/** 设置主模型 */
export function setPrimaryModel(modelId: string): { success: boolean; message: string } {
  const config = loadConfig();
  setNested(config, ['agents', 'defaults', 'model', 'primary'], modelId);
  try {
    saveConfig(config);
    return { success: true, message: `主模型已设置为 ${modelId}` };
  } catch (err) {
    return { success: false, message: `设置失败: ${err}` };
  }
}

/** Set fallback models list */
export function setFallbackModels(modelIds: string[]): { success: boolean; message: string } {
  const config = loadConfig();

  const normalized = Array.from(
    new Set(
      (Array.isArray(modelIds) ? modelIds : [])
        .map((id) => String(id || '').trim())
        .filter(Boolean),
    ),
  );

  // Ensure agents.defaults.model is an object shape.
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

  // Keep allowlist in sync so configured fallback IDs are visible/selectable.
  if (!getNested(config, ['agents', 'defaults', 'models'])) {
    setNested(config, ['agents', 'defaults', 'models'], {});
  }
  for (const id of normalized) {
    setNested(config, ['agents', 'defaults', 'models', id], {});
  }

  setNested(config, ['meta', 'lastTouchedAt'], new Date().toISOString());

  try {
    saveConfig(config);
    if (normalized.length > 0) {
      return { success: true, message: `Fallback models updated: ${normalized.join(', ')}` };
    }
    return { success: true, message: 'Fallback models cleared.' };
  } catch (err) {
    return { success: false, message: `Failed to set fallback models: ${err}` };
  }
}
