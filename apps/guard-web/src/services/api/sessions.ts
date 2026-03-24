import { fetchJson } from './client';

export type SessionUsage = {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  totalTokens: number;
};

export type SessionRecord = {
  id: string;
  key?: string;
  kind?: string;
  agentId: string;
  modelId: string;
  channel: string;
  status: string;
  startedAt: string | null;
  updatedAt: string | null;
  contextTokens?: number | null;
  remainingTokens?: number | null;
  percentUsed?: number | null;
  flags?: string[];
  usage: SessionUsage;
  estimatedCost: number;
};

export type RuntimeServiceSummary = {
  label: string | null;
  installed: boolean | null;
  loadedText: string | null;
  runtimeShort: string | null;
};

export type RuntimeSessionsByAgentSummary = {
  agentId: string;
  path: string | null;
  count: number;
  recent: SessionRecord[];
};

export type RuntimeSnapshot = {
  capturedAt: string;
  warnings: string[];
  sessions: SessionRecord[];
  os?: {
    platform: string | null;
    arch: string | null;
    release: string | null;
    label: string | null;
  };
  update?: {
    root: string | null;
    installKind: string | null;
    packageManager: string | null;
    latestVersion: string | null;
    channel: string | null;
    channelSource: string | null;
    depsStatus: string | null;
    depsReason: string | null;
  };
  memory?: {
    backend: string | null;
    provider: string | null;
    searchMode: string | null;
    workspaceDir: string | null;
    dbPath: string | null;
    files: number;
    chunks: number;
    dirty: boolean | null;
  };
  gateway?: {
    mode: string | null;
    url: string | null;
    reachable: boolean | null;
    connectLatencyMs: number | null;
    error: string | null;
    self?: {
      host: string | null;
      ip: string | null;
      version: string | null;
      platform: string | null;
    };
  };
  gatewayService?: RuntimeServiceSummary;
  nodeService?: RuntimeServiceSummary;
  securityAudit?: {
    critical: number;
    warn: number;
    info: number;
    findingsCount: number;
  };
  summary?: {
    sessionCount: number;
    defaultModel: string | null;
    defaultContextTokens: number | null;
    queuedSystemEvents: number;
  };
  sessionsMeta?: {
    paths: string[];
    byAgent: RuntimeSessionsByAgentSummary[];
  };
};

export type CostSummary = {
  totalTokens: number;
  totalEstimatedCost: number;
  pricingUnit: string | null;
};

export type ActivityEvent = {
  id: string;
  type: string;
  createdAt: string;
  title: string;
  description: string;
  sessionId?: string;
  agentId?: string;
  modelId?: string;
  status?: string;
};

export type SessionOverviewResponse = {
  snapshot: RuntimeSnapshot;
  costSummary: CostSummary;
  recentActivity: ActivityEvent[];
  cache?: {
    generatedAt: string | null;
    ageMs: number | null;
    freshForMs: number;
    stale: boolean;
    refreshing: boolean;
    source: 'bootstrap' | 'cache' | 'stale';
    lastStartedAt: string | null;
    lastFinishedAt: string | null;
    lastSuccessAt: string | null;
    lastReason: string | null;
    lastError: string | null;
  };
};

export function loadSessionsSnapshot() {
  return fetchJson<SessionOverviewResponse>('/api/sessions');
}
