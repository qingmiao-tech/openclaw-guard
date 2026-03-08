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
  gateway?: {
    mode: string | null;
    url: string | null;
    reachable: boolean | null;
    connectLatencyMs: number | null;
    error: string | null;
  };
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

  const parsed = extractJsonPayload([result.stdout, result.stderr].filter(Boolean).join('\n'));
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
  const heartbeatRoot = toObject(root.heartbeat) || {};
  const securityAuditRoot = toObject(root.securityAudit) || {};
  const securitySummary = toObject(securityAuditRoot.summary) || {};
  const sessions = response.ok
    ? resolveSessions(raw).map((item, index) => normalizeSession(item, index))
    : [];

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
    gateway: {
      mode: pickString(gatewayRoot.mode) || null,
      url: pickString(gatewayRoot.url) || null,
      reachable: typeof gatewayRoot.reachable === 'boolean' ? gatewayRoot.reachable : null,
      connectLatencyMs: pickNullableNumber(gatewayRoot.connectLatencyMs),
      error: pickString(gatewayRoot.error) || null,
    },
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
    schedulerNextWakeAt: normalizeTimestamp(raw?.schedulerNextWakeAtMs ?? raw?.nextWakeAtMs),
    warnings: response.warnings,
    raw,
  };
}

export function getCronSnapshot(): CronSnapshot {
  const response = runOpenClawJson(['cron', 'list'], 'OPENCLAW_GUARD_MOCK_CRON_JSON');
  const raw = response.data;
  const jobs = response.ok
    ? resolveCronJobs(raw).map((item, index) => normalizeCronJob(item, index))
    : [];

  return {
    ok: response.ok,
    source: response.source,
    capturedAt: new Date().toISOString(),
    warnings: response.warnings,
    jobs,
    status: getCronStatusSummary(),
    raw,
  };
}




