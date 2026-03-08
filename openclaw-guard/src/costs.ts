import path from 'node:path';
import { loadConfig, getNested } from './config.js';
import { ensureGuardLayout, writeJsonFile } from './guard-state.js';
import type { RuntimeSnapshot, SessionRecord } from './openclaw-runtime.js';

export interface CostLineItem {
  sessionId: string;
  agentId: string;
  modelId: string;
  usage: SessionRecord['usage'];
  estimatedCost: number;
}

export interface CostBucket {
  id: string;
  estimatedCost: number;
  totalTokens: number;
}

export interface CostSummary {
  capturedAt: string;
  pricingUnit: 'per-million-tokens';
  totalEstimatedCost: number;
  totalTokens: number;
  sessions: CostLineItem[];
  byModel: CostBucket[];
  byAgent: CostBucket[];
}

interface CostRate {
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
}

function getModelCostRate(modelId: string): CostRate {
  const config = loadConfig();
  const [providerId, localModelId] = modelId.split('/', 2);
  const providers = getNested(config, ['models', 'providers']);
  const provider = providers && typeof providers === 'object'
    ? (providers as Record<string, unknown>)[providerId]
    : null;
  const providerObject = provider && typeof provider === 'object' && !Array.isArray(provider)
    ? provider as Record<string, unknown>
    : null;
  const models = Array.isArray(providerObject?.models) ? providerObject.models : [];
  const model = models.find((item) => {
    return !!item
      && typeof item === 'object'
      && !Array.isArray(item)
      && typeof (item as Record<string, unknown>).id === 'string'
      && (item as Record<string, unknown>).id === localModelId;
  });
  const modelObject = model && typeof model === 'object' && !Array.isArray(model)
    ? model as Record<string, unknown>
    : null;
  const cost = modelObject && typeof modelObject.cost === 'object' && modelObject.cost !== null && !Array.isArray(modelObject.cost)
    ? modelObject.cost as Record<string, unknown>
    : {};

  return {
    input: normalizeNumber(cost.input),
    output: normalizeNumber(cost.output),
    cacheRead: normalizeNumber(cost.cacheRead),
    cacheWrite: normalizeNumber(cost.cacheWrite),
  };
}

function normalizeNumber(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

function calculateSessionCost(session: SessionRecord): number {
  if (session.estimatedCost > 0) return session.estimatedCost;
  const rate = getModelCostRate(session.modelId);
  return (
    session.usage.inputTokens * rate.input
    + session.usage.outputTokens * rate.output
    + session.usage.cacheReadTokens * rate.cacheRead
    + session.usage.cacheWriteTokens * rate.cacheWrite
  ) / 1_000_000;
}

function summarizeBuckets(items: CostLineItem[], key: 'agentId' | 'modelId'): CostBucket[] {
  const bucket = new Map<string, CostBucket>();
  for (const item of items) {
    const id = item[key];
    const current = bucket.get(id) || { id, estimatedCost: 0, totalTokens: 0 };
    current.estimatedCost += item.estimatedCost;
    current.totalTokens += item.usage.totalTokens;
    bucket.set(id, current);
  }
  return Array.from(bucket.values()).sort((a, b) => b.estimatedCost - a.estimatedCost || b.totalTokens - a.totalTokens);
}

export function summarizeCosts(snapshot: RuntimeSnapshot): CostSummary {
  const sessions = snapshot.sessions.map((session) => ({
    sessionId: session.id,
    agentId: session.agentId,
    modelId: session.modelId,
    usage: session.usage,
    estimatedCost: calculateSessionCost(session),
  }));
  const totalEstimatedCost = sessions.reduce((sum, item) => sum + item.estimatedCost, 0);
  const totalTokens = sessions.reduce((sum, item) => sum + item.usage.totalTokens, 0);

  return {
    capturedAt: snapshot.capturedAt,
    pricingUnit: 'per-million-tokens',
    totalEstimatedCost,
    totalTokens,
    sessions,
    byModel: summarizeBuckets(sessions, 'modelId'),
    byAgent: summarizeBuckets(sessions, 'agentId'),
  };
}

export function persistCostSummary(summary: CostSummary): string {
  const filePath = path.join(ensureGuardLayout().costsDir, 'latest.json');
  writeJsonFile(filePath, summary);
  return filePath;
}
