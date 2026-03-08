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
  agentId: string;
  modelId: string;
  channel: string;
  status: string;
  startedAt: string | null;
  updatedAt: string | null;
  usage: SessionUsage;
  estimatedCost: number;
  raw: Record<string, unknown>;
}

export interface RuntimeSnapshot {
  ok: boolean;
  source: string;
  capturedAt: string;
  warnings: string[];
  sessions: SessionRecord[];
  raw: unknown;
}

export interface CronJobRecord {
  id: string;
  agentId: string;
  schedule: string;
  prompt: string;
  enabled: boolean;
  status: string;
  lastRunAt: string | null;
  nextRunAt: string | null;
  raw: Record<string, unknown>;
}

export interface CronSnapshot {
  ok: boolean;
  source: string;
  capturedAt: string;
  warnings: string[];
  jobs: CronJobRecord[];
  raw: unknown;
}

function toObject(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function pickString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  }
  return '';
}

function pickNullableTimestamp(...values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return null;
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
  return !!pickString(item.id, item.jobId, item.schedule, item.cron, item.expression);
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
  const cacheReadTokens = pickNumber(root.cacheReadTokens, usage.cacheRead, usage.cacheReadTokens);
  const cacheWriteTokens = pickNumber(root.cacheWriteTokens, usage.cacheWrite, usage.cacheWriteTokens);
  const totalTokens = pickNumber(root.totalTokens, usage.total, usage.totalTokens, inputTokens + outputTokens + cacheReadTokens + cacheWriteTokens);
  return {
    inputTokens,
    outputTokens,
    cacheReadTokens,
    cacheWriteTokens,
    totalTokens,
  };
}

function normalizeSession(item: Record<string, unknown>, index: number): SessionRecord {
  const agent = toObject(item.agent) || {};
  const channel = toObject(item.channel) || {};
  const usage = normalizeUsage(item);
  const estimatedCost = pickNumber(item.estimatedCost, item.cost, (toObject(item.usage) || {}).cost, (toObject(item.tokenUsage) || {}).cost);

  return {
    id: pickString(item.id, item.sessionId, item.sid) || `session-${index + 1}`,
    agentId: pickString(item.agentId, item.agent, agent.id, agent.name) || 'default',
    modelId: pickString(item.modelId, item.model, item.assistantModel) || 'unknown',
    channel: pickString(item.channelId, item.channel, channel.id, channel.name) || 'unknown',
    status: pickString(item.status, item.state, item.phase) || 'unknown',
    startedAt: pickNullableTimestamp(item.startedAt, item.createdAt, item.startTime),
    updatedAt: pickNullableTimestamp(item.updatedAt, item.lastActivityAt, item.finishedAt, item.endTime),
    usage,
    estimatedCost,
    raw: item,
  };
}

function normalizeCronJob(item: Record<string, unknown>, index: number): CronJobRecord {
  const status = pickString(item.status, item.state) || (item.enabled === false ? 'disabled' : 'scheduled');
  return {
    id: pickString(item.id, item.jobId) || `cron-${index + 1}`,
    agentId: pickString(item.agentId, item.agent, item.agentName) || 'default',
    schedule: pickString(item.schedule, item.cron, item.expression) || '-',
    prompt: pickString(item.prompt, item.message, item.task, item.command) || '-',
    enabled: item.enabled === false ? false : status !== 'disabled',
    status,
    lastRunAt: pickNullableTimestamp(item.lastRunAt, item.lastExecutedAt),
    nextRunAt: pickNullableTimestamp(item.nextRunAt, item.nextExecutionAt),
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

  try {
    return {
      ok: true,
      data: JSON.parse(result.stdout),
      source: `openclaw ${args.join(' ')} --json`,
      warnings: [],
    };
  } catch {
    return {
      ok: false,
      data: null,
      source: `openclaw ${args.join(' ')} --json`,
      warnings: ['命令返回不是合法 JSON'],
    };
  }
}

export function getRuntimeSnapshot(): RuntimeSnapshot {
  const response = runOpenClawJson(['status'], 'OPENCLAW_GUARD_MOCK_STATUS_JSON');
  const raw = response.data;
  const sessions = response.ok
    ? findObjectArray(raw, looksLikeSession).map((item, index) => normalizeSession(item, index))
    : [];

  return {
    ok: response.ok,
    source: response.source,
    capturedAt: new Date().toISOString(),
    warnings: response.warnings,
    sessions,
    raw,
  };
}

export function getCronSnapshot(): CronSnapshot {
  const response = runOpenClawJson(['cron', 'list'], 'OPENCLAW_GUARD_MOCK_CRON_JSON');
  const raw = response.data;
  const jobs = response.ok
    ? findObjectArray(raw, looksLikeCron).map((item, index) => normalizeCronJob(item, index))
    : [];

  return {
    ok: response.ok,
    source: response.source,
    capturedAt: new Date().toISOString(),
    warnings: response.warnings,
    jobs,
    raw,
  };
}
