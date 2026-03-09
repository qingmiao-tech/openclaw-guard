import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

export interface CommandResult {
  success: boolean;
  command: string;
  args: string[];
  exitCode: number | null;
  stdout: string;
  stderr: string;
  error?: string;
}

export interface SessionUsage {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  totalTokens: number;
}

export interface SessionRecord {
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
  raw: Record<string, unknown>;
}

export interface RuntimeAlert {
  level: 'info' | 'warning' | 'error' | 'critical';
  code: string;
  message: string;
}

export interface RuntimeHeartbeatAgent {
  agentId: string;
  enabled: boolean;
  every: string | null;
  everyMs: number | null;
}

export interface RuntimeOsSummary {
  platform: string | null;
  arch: string | null;
  release: string | null;
  label: string | null;
}

export interface RuntimeUpdateSummary {
  root: string | null;
  installKind: string | null;
  packageManager: string | null;
  latestVersion: string | null;
  channel: string | null;
  channelSource: string | null;
  depsStatus: string | null;
  depsReason: string | null;
}

export interface RuntimeMemorySummary {
  agentId: string | null;
  backend: string | null;
  provider: string | null;
  requestedProvider: string | null;
  searchMode: string | null;
  workspaceDir: string | null;
  dbPath: string | null;
  files: number;
  chunks: number;
  dirty: boolean | null;
  sources: string[];
  extraPaths: string[];
  providerUnavailableReason: string | null;
}

export interface RuntimeMemoryPluginSummary {
  enabled: boolean | null;
  slot: string | null;
}

export interface RuntimeGatewaySelfSummary {
  host: string | null;
  ip: string | null;
  version: string | null;
  platform: string | null;
}

export interface RuntimeServiceSummary {
  label: string | null;
  installed: boolean | null;
  loadedText: string | null;
  runtimeShort: string | null;
}

export interface RuntimeSessionsByAgentSummary {
  agentId: string;
  path: string | null;
  count: number;
  recent: SessionRecord[];
}

export interface RuntimeSessionsMeta {
  paths: string[];
  byAgent: RuntimeSessionsByAgentSummary[];
}

export interface RuntimeSnapshot {
  ok: boolean;
  source: string;
  capturedAt: string;
  warnings: string[];
  alerts?: RuntimeAlert[];
  sessions: SessionRecord[];
  heartbeat?: {
    defaultAgentId: string | null;
    agents: RuntimeHeartbeatAgent[];
  };
  channelSummary?: string[];
  os?: RuntimeOsSummary;
  update?: RuntimeUpdateSummary;
  memory?: RuntimeMemorySummary;
  memoryPlugin?: RuntimeMemoryPluginSummary;
  gateway?: {
    mode: string | null;
    url: string | null;
    reachable: boolean | null;
    connectLatencyMs: number | null;
    error: string | null;
    self?: RuntimeGatewaySelfSummary;
  };
  gatewayService?: RuntimeServiceSummary;
  nodeService?: RuntimeServiceSummary;
  securityAudit?: {
    critical: number;
    warn: number;
    info: number;
    findingsCount: number;
  };
  agents?: {
    defaultId: string | null;
    total: number;
    totalSessions: number;
    bootstrapPendingCount: number;
  };
  summary?: {
    sessionCount: number;
    defaultModel: string | null;
    defaultContextTokens: number | null;
    queuedSystemEvents: number;
  };
  sessionsMeta?: RuntimeSessionsMeta;
  raw: unknown;
}

export interface CronJobRecord {
  id: string;
  name?: string;
  agentId: string;
  schedule: string;
  prompt: string;
  enabled: boolean;
  status: string;
  lastRunAt: string | null;
  nextRunAt: string | null;
  raw: Record<string, unknown>;
}

export interface CronStatusSummary {
  enabled: boolean | null;
  storePath: string | null;
  jobsCount: number | null;
  schedulerNextWakeAt: string | null;
  warnings: string[];
  raw: Record<string, unknown> | null;
}

export interface CronSnapshot {
  ok: boolean;
  source: string;
  capturedAt: string;
  warnings: string[];
  jobs: CronJobRecord[];
  total: number;
  offset: number;
  limit: number;
  hasMore: boolean;
  nextOffset: number | null;
  status?: CronStatusSummary;
  raw: unknown;
}
function extractJsonPayload(text: string): unknown | null {
  const input = text.trim();
  if (!input) return null;

  try {
    return JSON.parse(input);
  } catch {
    // Continue scanning for a JSON payload embedded in noisy output.
  }

  for (let start = 0; start < input.length; start += 1) {
    const first = input[start];
    if (first !== '{' && first !== '[') continue;

    let inString = false;
    let escaped = false;
    const stack: string[] = [];

    for (let index = start; index < input.length; index += 1) {
      const char = input[index];

      if (inString) {
        if (escaped) {
          escaped = false;
          continue;
        }
        if (char === '\\') {
          escaped = true;
          continue;
        }
        if (char === '"') {
          inString = false;
        }
        continue;
      }

      if (char === '"') {
        inString = true;
        continue;
      }

      if (char === '{') {
        stack.push('}');
        continue;
      }
      if (char === '[') {
        stack.push(']');
        continue;
      }
      if ((char === '}' || char === ']') && stack.length > 0) {
        const expected = stack.pop();
        if (expected !== char) break;
        if (stack.length === 0) {
          const candidate = input.slice(start, index + 1);
          try {
            return JSON.parse(candidate);
          } catch {
            break;
          }
        }
      }
    }
  }

  return null;
}

export function parseOpenClawJsonOutput(stdout: string, stderr = ''): unknown | null {
  return extractJsonPayload([stdout, stderr].filter(Boolean).join('\n'));
}

function toObject(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function toObjectArray(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => toObject(item))
    .filter((item): item is Record<string, unknown> => item !== null);
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean);
}

function pickString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  }
  return '';
}

function pickNumber(...values: unknown[]): number {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return 0;
}

function pickNullableNumber(...values: unknown[]): number | null {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return null;
}

function normalizeTimestamp(value: unknown): string | null {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (/^\d+$/.test(trimmed)) {
      return normalizeTimestamp(Number(trimmed));
    }
    const parsed = Date.parse(trimmed);
    return Number.isFinite(parsed) ? new Date(parsed).toISOString() : trimmed;
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    const ms = value > 1e12 ? value : value > 1e9 ? value * 1000 : value;
    const date = new Date(ms);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }
  return null;
}

function looksLikeSession(item: Record<string, unknown>): boolean {
  return !!pickString(
    item.id,
    item.sessionId,
    item.sid,
    item.model,
    item.modelId,
    item.agent,
    item.agentId,
  );
}

function looksLikeCron(item: Record<string, unknown>): boolean {
  return !!pickString(item.id, item.jobId, item.name, item.schedule, item.cron, item.expression);
}

function findObjectArray(root: unknown, predicate: (item: Record<string, unknown>) => boolean): Record<string, unknown>[] {
  const queue: unknown[] = [root];
  while (queue.length > 0) {
    const current = queue.shift();
    if (Array.isArray(current)) {
      const objects = current
        .map((item) => toObject(item))
        .filter((item): item is Record<string, unknown> => item !== null);
      if (objects.length > 0 && objects.some(predicate)) return objects;
      queue.push(...current);
      continue;
    }
    const object = toObject(current);
    if (!object) continue;
    queue.push(...Object.values(object));
  }
  return [];
}

function normalizeUsage(root: Record<string, unknown>): SessionUsage {
  const usage = toObject(root.usage) || toObject(root.tokenUsage) || toObject(root.tokens) || {};
  const inputTokens = pickNumber(root.inputTokens, root.promptTokens, usage.input, usage.prompt, usage.inputTokens, usage.promptTokens);
  const outputTokens = pickNumber(root.outputTokens, root.completionTokens, usage.output, usage.completion, usage.outputTokens, usage.completionTokens);
  const cacheReadTokens = pickNumber(root.cacheReadTokens, root.cacheRead, usage.cacheRead, usage.cacheReadTokens);
  const cacheWriteTokens = pickNumber(root.cacheWriteTokens, root.cacheWrite, usage.cacheWrite, usage.cacheWriteTokens);
  const totalTokens = pickNumber(root.totalTokens, usage.total, usage.totalTokens, inputTokens + outputTokens + cacheReadTokens + cacheWriteTokens);
  return {
    inputTokens,
    outputTokens,
    cacheReadTokens,
    cacheWriteTokens,
    totalTokens,
  };
}

function normalizeServiceSummary(root: unknown): RuntimeServiceSummary {
  const service = toObject(root) || {};
  return {
    label: pickString(service.label) || null,
    installed: typeof service.installed === 'boolean' ? service.installed : null,
    loadedText: pickString(service.loadedText) || null,
    runtimeShort: pickString(service.runtimeShort) || null,
  };
}

function parseChannelFromSession(root: Record<string, unknown>): string {
  const explicit = pickString(root.channelId, root.channel);
  if (explicit) return explicit;
  const key = pickString(root.key);
  const parts = key.split(':').filter(Boolean);
  if (parts[0] === 'agent' && parts.length >= 4) {
    return parts[2] || 'unknown';
  }
  return pickString(root.kind) || 'unknown';
}

function normalizeSession(item: Record<string, unknown>, index: number): SessionRecord {
  const agent = toObject(item.agent) || {};
  const usage = normalizeUsage(item);
  const estimatedCost = pickNumber(item.estimatedCost, item.cost, (toObject(item.usage) || {}).cost, (toObject(item.tokenUsage) || {}).cost);

  return {
    id: pickString(item.id, item.sessionId, item.sid) || `session-${index + 1}`,
    key: pickString(item.key) || undefined,
    kind: pickString(item.kind) || undefined,
    agentId: pickString(item.agentId, item.agent, agent.id, agent.name) || 'default',
    modelId: pickString(item.modelId, item.model, item.assistantModel) || 'unknown',
    channel: parseChannelFromSession(item),
    status: pickString(item.status, item.state, item.phase, item.lastRunStatus) || (item.abortedLastRun === true ? 'aborted' : 'active'),
    startedAt: normalizeTimestamp(item.startedAt ?? item.createdAt ?? item.startTime),
    updatedAt: normalizeTimestamp(item.updatedAt ?? item.lastActivityAt ?? item.finishedAt ?? item.endTime),
    contextTokens: pickNullableNumber(item.contextTokens),
    remainingTokens: pickNullableNumber(item.remainingTokens),
    percentUsed: pickNullableNumber(item.percentUsed),
    flags: toStringArray(item.flags),
    usage,
    estimatedCost,
    raw: item,
  };
}

function formatCronSchedule(value: unknown): string {
  if (typeof value === 'string' && value.trim()) return value.trim();
  const object = toObject(value);
  if (!object) return '-';
  const kind = pickString(object.kind);
  if (kind === 'at') {
    return `at ${pickString(object.at)}`;
  }
  if (kind === 'every') {
    const everyMs = pickNumber(object.everyMs);
    return everyMs > 0 ? `every ${everyMs}ms` : 'every';
  }
  if (kind === 'cron') {
    return pickString(object.expr) ? `cron ${pickString(object.expr)}` : 'cron';
  }
  return pickString(object.expr, object.at) || '-';
}

function formatCronPrompt(item: Record<string, unknown>): string {
  const payload = toObject(item.payload) || {};
  return pickString(
    item.prompt,
    item.message,
    item.task,
    item.command,
    item.text,
    payload.message,
    payload.text,
  ) || '-';
}

function normalizeCronJob(item: Record<string, unknown>, index: number): CronJobRecord {
  const state = toObject(item.state) || {};
  const schedule = item.schedule ?? item.cron ?? item.expression;
  const status = pickString(state.lastRunStatus, state.lastStatus, item.status, item.state) || (item.enabled === false ? 'disabled' : 'scheduled');
  return {
    id: pickString(item.id, item.jobId) || `cron-${index + 1}`,
    name: pickString(item.name) || undefined,
    agentId: pickString(item.agentId, item.agent, item.agentName) || 'default',
    schedule: formatCronSchedule(schedule),
    prompt: formatCronPrompt(item),
    enabled: item.enabled === false ? false : status !== 'disabled',
    status,
    lastRunAt: normalizeTimestamp(item.lastRunAt ?? item.lastExecutedAt ?? state.lastRunAtMs),
    nextRunAt: normalizeTimestamp(item.nextRunAt ?? item.nextExecutionAt ?? state.nextRunAtMs),
    raw: item,
  };
}

export function runCommand(command: string, args: string[], timeoutMs = 30000): CommandResult {
  const result = spawnSync(command, args, {
    encoding: 'utf-8',
    timeout: timeoutMs,
    shell: process.platform === 'win32',
    windowsHide: true,
  });

  return {
    success: result.status === 0 && !result.error,
    command,
    args,
    exitCode: result.status,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
    error: result.error?.message,
  };
}

function readMockJsonFromEnv(envKey: string): unknown | null {
  const value = process.env[envKey]?.trim();
  if (!value) return null;
  try {
    if (value.startsWith('{') || value.startsWith('[')) {
      return JSON.parse(value);
    }
    if (fs.existsSync(value)) {
      return JSON.parse(fs.readFileSync(path.resolve(value), 'utf-8'));
    }
  } catch {
    return null;
  }
  return null;
}

export function runOpenClawCommand(args: string[], timeoutMs = 30000): CommandResult {
  const command = process.env.OPENCLAW_GUARD_OPENCLAW_BIN?.trim() || 'openclaw';
  return runCommand(command, args, timeoutMs);
}

export function runOpenClawJson(args: string[], mockEnvKey?: string): { ok: boolean; data: unknown; source: string; warnings: string[] } {
  if (mockEnvKey) {
    const mocked = readMockJsonFromEnv(mockEnvKey);
    if (mocked !== null) {
      return {
        ok: true,
        data: mocked,
        source: `mock:${mockEnvKey}`,
        warnings: [],
      };
    }
  }

  const result = runOpenClawCommand([...args, '--json']);
  if (!result.success) {
    return {
      ok: false,
      data: null,
      source: `openclaw ${args.join(' ')} --json`,
      warnings: [result.error || result.stderr || result.stdout || '命令执行失败'],
    };
  }

  const parsed = parseOpenClawJsonOutput(result.stdout, result.stderr);
  if (parsed !== null) {
    return {
      ok: true,
      data: parsed,
      source: `openclaw ${args.join(' ')} --json`,
      warnings: [],
    };
  }

  return {
    ok: false,
    data: null,
    source: `openclaw ${args.join(' ')} --json`,
    warnings: ['命令返回的内容不是合法 JSON'],
  };
}

function extractRuntimeAlerts(root: Record<string, unknown>): RuntimeAlert[] {
  const alerts: RuntimeAlert[] = [];
  const gateway = toObject(root.gateway) || {};
  if (gateway.reachable === false && pickString(gateway.error)) {
    alerts.push({
      level: 'error',
      code: 'gateway-unreachable',
      message: pickString(gateway.error),
    });
  }

  const securityAudit = toObject(root.securityAudit) || {};
  const summary = toObject(securityAudit.summary) || {};
  const critical = pickNumber(summary.critical);
  const warn = pickNumber(summary.warn);
  if (critical > 0) {
    alerts.push({
      level: 'critical',
      code: 'security-audit-critical',
      message: `安全审计存在 ${critical} 条 critical 风险，请尽快处理。`,
    });
  } else if (warn > 0) {
    alerts.push({
      level: 'warning',
      code: 'security-audit-warn',
      message: `安全审计存在 ${warn} 条 warning 提示，建议继续收敛配置。`,
    });
  }

  return alerts;
}

function resolveSessions(root: unknown): Record<string, unknown>[] {
  const runtime = toObject(root) || {};
  const sessionsRoot = toObject(runtime.sessions);
  const recent = toObjectArray(sessionsRoot?.recent);
  if (recent.length > 0) return recent;
  const directSessions = toObjectArray(runtime.sessions);
  if (directSessions.length > 0) return directSessions;
  return findObjectArray(root, looksLikeSession);
}

export function getRuntimeSnapshot(): RuntimeSnapshot {
  const response = runOpenClawJson(['status'], 'OPENCLAW_GUARD_MOCK_STATUS_JSON');
  const raw = response.data;
  const root = toObject(raw) || {};
  const sessionsRoot = toObject(root.sessions) || {};
  const agentsRoot = toObject(root.agents) || {};
  const gatewayRoot = toObject(root.gateway) || {};
  const gatewaySelfRoot = toObject(gatewayRoot.self) || {};
  const heartbeatRoot = toObject(root.heartbeat) || {};
  const securityAuditRoot = toObject(root.securityAudit) || {};
  const securitySummary = toObject(securityAuditRoot.summary) || {};
  const memoryRoot = toObject(root.memory) || {};
  const memoryCustomRoot = toObject(memoryRoot.custom) || {};
  const memoryPluginRoot = toObject(root.memoryPlugin) || {};
  const osRoot = toObject(root.os) || {};
  const updateRoot = toObject(root.update) || {};
  const updateRegistryRoot = toObject(updateRoot.registry) || {};
  const updateDepsRoot = toObject(updateRoot.deps) || {};
  const sessions = response.ok
    ? resolveSessions(raw).map((item, index) => normalizeSession(item, index))
    : [];
  const sessionsByAgent = toObjectArray(sessionsRoot.byAgent).map((item, index) => ({
    agentId: pickString(item.agentId, item.id) || `agent-${index + 1}`,
    path: pickString(item.path) || null,
    count: pickNumber(item.count),
    recent: toObjectArray(item.recent).map((session, sessionIndex) => normalizeSession(session, sessionIndex)),
  }));

  return {
    ok: response.ok,
    source: response.source,
    capturedAt: new Date().toISOString(),
    warnings: response.warnings,
    alerts: response.ok ? extractRuntimeAlerts(root) : [],
    sessions,
    heartbeat: {
      defaultAgentId: pickString(heartbeatRoot.defaultAgentId) || null,
      agents: toObjectArray(heartbeatRoot.agents).map((item) => ({
        agentId: pickString(item.agentId, item.id) || 'unknown',
        enabled: item.enabled !== false,
        every: pickString(item.every) || null,
        everyMs: pickNullableNumber(item.everyMs),
      })),
    },
    channelSummary: Array.isArray(root.channelSummary)
      ? root.channelSummary.map((item) => String(item))
      : [],
    os: {
      platform: pickString(osRoot.platform) || null,
      arch: pickString(osRoot.arch) || null,
      release: pickString(osRoot.release) || null,
      label: pickString(osRoot.label) || null,
    },
    update: {
      root: pickString(updateRoot.root) || null,
      installKind: pickString(updateRoot.installKind) || null,
      packageManager: pickString(updateRoot.packageManager) || null,
      latestVersion: pickString(updateRegistryRoot.latestVersion) || null,
      channel: pickString(root.updateChannel) || null,
      channelSource: pickString(root.updateChannelSource) || null,
      depsStatus: pickString(updateDepsRoot.status) || null,
      depsReason: pickString(updateDepsRoot.reason) || null,
    },
    memory: {
      agentId: pickString(memoryRoot.agentId) || null,
      backend: pickString(memoryRoot.backend) || null,
      provider: pickString(memoryRoot.provider) || null,
      requestedProvider: pickString(memoryRoot.requestedProvider) || null,
      searchMode: pickString(memoryCustomRoot.searchMode) || null,
      workspaceDir: pickString(memoryRoot.workspaceDir) || null,
      dbPath: pickString(memoryRoot.dbPath) || null,
      files: pickNumber(memoryRoot.files),
      chunks: pickNumber(memoryRoot.chunks),
      dirty: typeof memoryRoot.dirty === 'boolean' ? memoryRoot.dirty : null,
      sources: toStringArray(memoryRoot.sources),
      extraPaths: toStringArray(memoryRoot.extraPaths),
      providerUnavailableReason: pickString(memoryCustomRoot.providerUnavailableReason) || null,
    },
    memoryPlugin: {
      enabled: typeof memoryPluginRoot.enabled === 'boolean' ? memoryPluginRoot.enabled : null,
      slot: pickString(memoryPluginRoot.slot) || null,
    },
    gateway: {
      mode: pickString(gatewayRoot.mode) || null,
      url: pickString(gatewayRoot.url) || null,
      reachable: typeof gatewayRoot.reachable === 'boolean' ? gatewayRoot.reachable : null,
      connectLatencyMs: pickNullableNumber(gatewayRoot.connectLatencyMs),
      error: pickString(gatewayRoot.error) || null,
      self: {
        host: pickString(gatewaySelfRoot.host) || null,
        ip: pickString(gatewaySelfRoot.ip) || null,
        version: pickString(gatewaySelfRoot.version) || null,
        platform: pickString(gatewaySelfRoot.platform) || null,
      },
    },
    gatewayService: normalizeServiceSummary(root.gatewayService),
    nodeService: normalizeServiceSummary(root.nodeService),
    securityAudit: {
      critical: pickNumber(securitySummary.critical),
      warn: pickNumber(securitySummary.warn),
      info: pickNumber(securitySummary.info),
      findingsCount: Array.isArray(securityAuditRoot.findings) ? securityAuditRoot.findings.length : 0,
    },
    agents: {
      defaultId: pickString(agentsRoot.defaultId) || null,
      total: toObjectArray(agentsRoot.agents).length,
      totalSessions: pickNumber(agentsRoot.totalSessions),
      bootstrapPendingCount: pickNumber(agentsRoot.bootstrapPendingCount),
    },
    summary: {
      sessionCount: pickNumber(sessionsRoot.count, sessions.length),
      defaultModel: pickString((toObject(sessionsRoot.defaults) || {}).model) || null,
      defaultContextTokens: pickNullableNumber((toObject(sessionsRoot.defaults) || {}).contextTokens),
      queuedSystemEvents: Array.isArray(root.queuedSystemEvents) ? root.queuedSystemEvents.length : 0,
    },
    sessionsMeta: {
      paths: toStringArray(sessionsRoot.paths),
      byAgent: sessionsByAgent,
    },
    raw,
  };
}

function resolveCronJobs(root: unknown): Record<string, unknown>[] {
  const runtime = toObject(root) || {};
  const jobs = toObjectArray(runtime.jobs);
  if (jobs.length > 0) return jobs;
  return findObjectArray(root, looksLikeCron);
}

export function getCronStatusSummary(): CronStatusSummary {
  const response = runOpenClawJson(['cron', 'status'], 'OPENCLAW_GUARD_MOCK_CRON_STATUS_JSON');
  const raw = toObject(response.data);
  return {
    enabled: raw && typeof raw.enabled === 'boolean' ? raw.enabled : null,
    storePath: raw ? pickString(raw.storePath) || null : null,
    jobsCount: raw ? pickNullableNumber(raw.jobs) : null,
    schedulerNextWakeAt: normalizeTimestamp(raw?.schedulerNextWakeAtMs ?? raw?.nextWakeAtMs),
    warnings: response.warnings,
    raw,
  };
}

export function getCronSnapshot(): CronSnapshot {
  const response = runOpenClawJson(['cron', 'list'], 'OPENCLAW_GUARD_MOCK_CRON_JSON');
  const raw = response.data;
  const root = toObject(raw) || {};
  const jobs = response.ok
    ? resolveCronJobs(raw).map((item, index) => normalizeCronJob(item, index))
    : [];

  return {
    ok: response.ok,
    source: response.source,
    capturedAt: new Date().toISOString(),
    warnings: response.warnings,
    jobs,
    total: pickNumber(root.total, jobs.length),
    offset: pickNumber(root.offset),
    limit: pickNumber(root.limit, jobs.length),
    hasMore: root.hasMore === true,
    nextOffset: pickNullableNumber(root.nextOffset),
    status: getCronStatusSummary(),
    raw,
  };
}






