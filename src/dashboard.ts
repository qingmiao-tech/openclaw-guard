import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { detectPlatform, getCurrentUser, getHomeDir, getOpenClawDir } from './platform.js';
import { detectOpenClaw } from './openclaw.js';
import { getServiceStatus } from './service-mgr.js';
import { ensureGuardLayout, appendJsonl, readJsonFile, readJsonl, writeJsonFile } from './guard-state.js';
import { getAgentCatalog, getManagedRoots, listMemoryFiles } from './workspace-files.js';
import { getUnreadNotificationCount, listNotifications, type GuardNotification } from './notifications.js';
import { getRuntimeSnapshot, type RuntimeSnapshot, type SessionRecord } from './openclaw-runtime.js';
import { persistCostSummary, summarizeCosts, type CostSummary } from './costs.js';

export interface ActivityEvent {
  id: string;
  type: 'session-started' | 'session-updated' | 'session-ended' | 'runtime-warning' | 'cron-run' | 'git-sync';
  createdAt: string;
  title: string;
  description: string;
  sessionId?: string;
  agentId?: string;
  modelId?: string;
  status?: string;
}

export interface SessionOverview {
  snapshot: RuntimeSnapshot;
  costSummary: CostSummary;
  recentActivity: ActivityEvent[];
}

export interface DashboardOverview {
  capturedAt: string;
  platform: string;
  user: string;
  homeDir: string;
  openclawDir: string;
  cpu: {
    cores: number;
    model: string;
    loadAverage: number[];
  };
  memory: {
    totalBytes: number;
    freeBytes: number;
    usedBytes: number;
  };
  disk: {
    mountPath: string;
    totalBytes: number | null;
    freeBytes: number | null;
  };
  openclaw: ReturnType<typeof detectOpenClaw>;
  gateway: ReturnType<typeof getServiceStatus>;
  agents: {
    total: number;
    defaultAgentId: string | null;
    workspacesReady: number;
  };
  sessions: {
    total: number;
    active: number;
  };
  memoryFiles: number;
  notifications: {
    unread: number;
    latest: GuardNotification[];
  };
  runtime: {
    warnings: string[];
    alerts: Array<{
      level: 'info' | 'warning' | 'error' | 'critical';
      code: string;
      message: string;
    }>;
    os: RuntimeSnapshot['os'];
    update: RuntimeSnapshot['update'];
    memory: RuntimeSnapshot['memory'];
    memoryPlugin: RuntimeSnapshot['memoryPlugin'];
    gateway: RuntimeSnapshot['gateway'];
    gatewayService: RuntimeSnapshot['gatewayService'];
    nodeService: RuntimeSnapshot['nodeService'];
    securityAudit: RuntimeSnapshot['securityAudit'];
    summary: RuntimeSnapshot['summary'];
    sessionsMeta: RuntimeSnapshot['sessionsMeta'];
  };
}

interface StoredSessionSnapshot {
  capturedAt: string;
  sessions: SessionRecord[];
}

function getLatestSessionSnapshotFile(): string {
  return path.join(ensureGuardLayout().sessionsDir, 'latest.json');
}

function getSessionHistoryFile(capturedAt: string): string {
  return path.join(ensureGuardLayout().sessionsDir, `${capturedAt.slice(0, 10)}.jsonl`);
}

function getActivityFile(capturedAt: string): string {
  return path.join(ensureGuardLayout().activityDir, `${capturedAt.slice(0, 10)}.jsonl`);
}

function readStoredSessionSnapshot(): StoredSessionSnapshot {
  return readJsonFile<StoredSessionSnapshot>(getLatestSessionSnapshotFile(), {
    capturedAt: '',
    sessions: [],
  });
}

function createActivityEvent(input: Omit<ActivityEvent, 'id'>): ActivityEvent {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`,
    ...input,
  };
}

function diffSessions(previous: SessionRecord[], current: SessionRecord[], capturedAt: string, warnings: string[]): ActivityEvent[] {
  const previousMap = new Map(previous.map((session) => [session.id, session]));
  const currentMap = new Map(current.map((session) => [session.id, session]));
  const events: ActivityEvent[] = [];

  for (const session of current) {
    const existing = previousMap.get(session.id);
    if (!existing) {
      events.push(createActivityEvent({
        type: 'session-started',
        createdAt: capturedAt,
        title: `Session started ${session.id}`,
        description: `${session.agentId} started using ${session.modelId}`,
        sessionId: session.id,
        agentId: session.agentId,
        modelId: session.modelId,
        status: session.status,
      }));
      continue;
    }

    if (existing.status !== session.status || existing.modelId !== session.modelId || existing.agentId !== session.agentId) {
      events.push(createActivityEvent({
        type: 'session-updated',
        createdAt: capturedAt,
        title: `Session state changed ${session.id}`,
        description: `${existing.status} -> ${session.status}`,
        sessionId: session.id,
        agentId: session.agentId,
        modelId: session.modelId,
        status: session.status,
      }));
    }
  }

  for (const session of previous) {
    if (currentMap.has(session.id)) continue;
    events.push(createActivityEvent({
      type: 'session-ended',
      createdAt: capturedAt,
      title: `Session ended ${session.id}`,
      description: `${session.agentId} session disappeared from runtime snapshot`,
      sessionId: session.id,
      agentId: session.agentId,
      modelId: session.modelId,
      status: session.status,
    }));
  }

  for (const warning of warnings) {
    events.push(createActivityEvent({
      type: 'runtime-warning',
      createdAt: capturedAt,
      title: 'Runtime warning',
      description: warning,
    }));
  }

  return events;
}

export function captureSessionOverview(): SessionOverview {
  const snapshot = getRuntimeSnapshot();
  const previous = readStoredSessionSnapshot();
  const events = diffSessions(previous.sessions, snapshot.sessions, snapshot.capturedAt, snapshot.warnings);

  writeJsonFile(getLatestSessionSnapshotFile(), {
    capturedAt: snapshot.capturedAt,
    sessions: snapshot.sessions,
  } satisfies StoredSessionSnapshot);
  appendJsonl(getSessionHistoryFile(snapshot.capturedAt), {
    capturedAt: snapshot.capturedAt,
    sessions: snapshot.sessions,
  });
  for (const event of events) {
    appendJsonl(getActivityFile(snapshot.capturedAt), event);
  }

  const costSummary = summarizeCosts(snapshot);
  persistCostSummary(costSummary);

  return {
    snapshot,
    costSummary,
    recentActivity: getRecentActivity(50),
  };
}

export function getRecentActivity(limit = 50): ActivityEvent[] {
  const activityDir = ensureGuardLayout().activityDir;
  if (!fs.existsSync(activityDir)) return [];
  const files = fs.readdirSync(activityDir)
    .filter((file) => file.endsWith('.jsonl'))
    .sort()
    .reverse()
    .slice(0, 7);
  const results: ActivityEvent[] = [];
  for (const file of files) {
    const items = readJsonl<ActivityEvent>(path.join(activityDir, file), limit);
    results.push(...items);
    if (results.length >= limit) break;
  }
  return results
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

function getDiskStats(targetPath: string): { totalBytes: number | null; freeBytes: number | null } {
  try {
    const stats = fs.statfsSync(targetPath);
    return {
      totalBytes: stats.bsize * stats.blocks,
      freeBytes: stats.bsize * stats.bavail,
    };
  } catch {
    return {
      totalBytes: null,
      freeBytes: null,
    };
  }
}

export function getDashboardOverview(): DashboardOverview {
  const sessionOverview = captureSessionOverview();
  const agents = getAgentCatalog();
  const memoryFiles = listMemoryFiles();
  const cpuInfo = os.cpus();
  const disk = getDiskStats(getOpenClawDir());
  const defaultAgent = agents.find((agent) => agent.isDefault) || agents[0] || null;

  return {
    capturedAt: new Date().toISOString(),
    platform: detectPlatform(),
    user: getCurrentUser(),
    homeDir: getHomeDir(),
    openclawDir: getOpenClawDir(),
    cpu: {
      cores: cpuInfo.length,
      model: cpuInfo[0]?.model || 'unknown',
      loadAverage: os.loadavg(),
    },
    memory: {
      totalBytes: os.totalmem(),
      freeBytes: os.freemem(),
      usedBytes: os.totalmem() - os.freemem(),
    },
    disk: {
      mountPath: getOpenClawDir(),
      totalBytes: disk.totalBytes,
      freeBytes: disk.freeBytes,
    },
    openclaw: detectOpenClaw(),
    gateway: getServiceStatus(),
    agents: {
      total: agents.length,
      defaultAgentId: defaultAgent?.id || null,
      workspacesReady: getManagedRoots().filter((root) => fs.existsSync(root.path)).length,
    },
    sessions: {
      total: sessionOverview.snapshot.sessions.length,
      active: sessionOverview.snapshot.sessions.filter((session) => !['ended', 'finished', 'closed'].includes(session.status)).length,
    },
    memoryFiles: memoryFiles.length,
    notifications: {
      unread: getUnreadNotificationCount(),
      latest: listNotifications(5),
    },
    runtime: {
      warnings: sessionOverview.snapshot.warnings,
      alerts: sessionOverview.snapshot.alerts || [],
      os: sessionOverview.snapshot.os,
      update: sessionOverview.snapshot.update,
      memory: sessionOverview.snapshot.memory,
      memoryPlugin: sessionOverview.snapshot.memoryPlugin,
      gateway: sessionOverview.snapshot.gateway,
      gatewayService: sessionOverview.snapshot.gatewayService,
      nodeService: sessionOverview.snapshot.nodeService,
      securityAudit: sessionOverview.snapshot.securityAudit,
      summary: sessionOverview.snapshot.summary,
      sessionsMeta: sessionOverview.snapshot.sessionsMeta,
    },
  };
}
