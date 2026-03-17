import { deleteJson, fetchJson, postJson } from './client';

export type ProviderPreset = {
  id: string;
  name: string;
  icon: string;
  defaultBaseUrl: string;
  apiType: string;
  requiresApiKey: boolean;
  suggestedModels: Array<{
    id: string;
    name: string;
    description?: string;
    recommended?: boolean;
  }>;
};

export type ConfiguredProviderModel = {
  fullId: string;
  id: string;
  name: string;
  api?: string;
  contextWindow?: number;
  maxTokens?: number;
  isPrimary: boolean;
  isFallback: boolean;
};

export type ConfiguredProvider = {
  name: string;
  baseUrl: string;
  apiType?: string;
  hasApiKey: boolean;
  apiKeyMasked?: string;
  models: ConfiguredProviderModel[];
};

export type AIConfigOverview = {
  primaryModel: string | null;
  fallbackModels: string[];
  providers: ConfiguredProvider[];
  availableModels: string[];
};

export type CustomProviderRecord = {
  name: string;
  baseUrl?: string;
  apiType?: string;
  api?: string;
  apiKey?: string;
  models?: Array<{
    id: string;
    name?: string;
    api?: string;
    contextWindow?: number;
    maxTokens?: number;
  }>;
};

export type ProviderCatalog = {
  presets: ProviderPreset[];
  custom: CustomProviderRecord[];
};

export type ModelMutationResult = {
  success: boolean;
  message: string;
};

export async function loadModelsSnapshot() {
  const [config, catalog] = await Promise.all([
    fetchJson<AIConfigOverview>('/api/ai/config'),
    fetchJson<ProviderCatalog>('/api/ai/providers'),
  ]);

  return { config, catalog };
}

export function saveProviderConfig(payload: {
  name: string;
  baseUrl: string;
  apiKey?: string;
  apiType?: string;
  models: Array<{
    id: string;
    name: string;
    api?: string;
    contextWindow?: number;
    maxTokens?: number;
  }>;
}) {
  return postJson<ModelMutationResult>('/api/ai/provider', payload);
}

export function deleteProviderConfig(name: string) {
  return deleteJson<ModelMutationResult>(`/api/ai/provider/${encodeURIComponent(name)}`);
}

export function updatePrimaryModel(modelId: string) {
  return postJson<ModelMutationResult>('/api/ai/primary', { modelId });
}

export function updateFallbackModels(modelIds: string[]) {
  return postJson<ModelMutationResult>('/api/ai/fallbacks', { modelIds });
}
