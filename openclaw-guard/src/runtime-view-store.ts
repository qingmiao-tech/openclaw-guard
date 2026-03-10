import path from 'node:path';
import {
  buildDashboardOverview,
  buildSessionOverview,
  type DashboardOverview,
  type SessionOverview,
} from './dashboard.js';
import type { CostSummary } from './costs.js';
import { ensureGuardLayout, isoNow, readJsonFile, writeJsonFile } from './guard-state.js';

const RUNTIME_VIEW_SNAPSHOT_FILE = path.join(ensureGuardLayout().stateDir, 'runtime-view-latest.json');
const RUNTIME_VIEW_FRESH_MS = 30_000;

export interface RuntimeViewCacheMeta {
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
}

export interface StoredRuntimeViewSnapshot {
  generatedAt: string;
  sessionOverview: SessionOverview;
  dashboardOverview: DashboardOverview;
}

export type DashboardOverviewWithCache = DashboardOverview & { cache: RuntimeViewCacheMeta };
export type SessionOverviewWithCache = SessionOverview & { cache: RuntimeViewCacheMeta };
export type CostSummaryWithCache = CostSummary & { cache: RuntimeViewCacheMeta };

interface RuntimeViewRefreshState {
  refreshing: boolean;
  queued: boolean;
  lastStartedAt: string | null;
  lastFinishedAt: string | null;
  lastSuccessAt: string | null;
  lastReason: string | null;
  lastError: string | null;
}

const refreshState: RuntimeViewRefreshState = {
  refreshing: false,
  queued: false,
  lastStartedAt: null,
  lastFinishedAt: null,
  lastSuccessAt: null,
  lastReason: null,
  lastError: null,
};

function readStoredRuntimeViewSnapshot(): StoredRuntimeViewSnapshot | null {
  const snapshot = readJsonFile<StoredRuntimeViewSnapshot | null>(RUNTIME_VIEW_SNAPSHOT_FILE, null);
  if (!snapshot || typeof snapshot.generatedAt !== 'string') return null;
  if (!snapshot.sessionOverview || !snapshot.dashboardOverview) return null;
  return snapshot;
}

function buildStoredRuntimeViewSnapshot(): StoredRuntimeViewSnapshot {
  const sessionOverview = buildSessionOverview();
  const dashboardOverview = buildDashboardOverview(sessionOverview);
  return {
    generatedAt: isoNow(),
    sessionOverview,
    dashboardOverview,
  };
}

function saveStoredRuntimeViewSnapshot(snapshot: StoredRuntimeViewSnapshot): StoredRuntimeViewSnapshot {
  writeJsonFile(RUNTIME_VIEW_SNAPSHOT_FILE, snapshot);
  return snapshot;
}

function scheduleRuntimeViewRefresh(reason: string): void {
  if (refreshState.refreshing || refreshState.queued) return;
  refreshState.queued = true;

  setTimeout(() => {
    refreshState.queued = false;
    try {
      refreshRuntimeViewSnapshot(reason);
    } catch {
      // Keep serving the last good snapshot; the cache metadata will expose the refresh error.
    }
  }, 0);
}

function buildCacheMeta(
  snapshot: StoredRuntimeViewSnapshot,
  source: RuntimeViewCacheMeta['source'],
  freshForMs: number,
): RuntimeViewCacheMeta {
  const generatedAtMs = Date.parse(snapshot.generatedAt);
  const ageMs = Number.isFinite(generatedAtMs) ? Math.max(0, Date.now() - generatedAtMs) : null;
  const stale = ageMs === null || ageMs > freshForMs;

  return {
    generatedAt: snapshot.generatedAt,
    ageMs,
    freshForMs,
    stale,
    refreshing: refreshState.refreshing || refreshState.queued,
    source,
    lastStartedAt: refreshState.lastStartedAt,
    lastFinishedAt: refreshState.lastFinishedAt,
    lastSuccessAt: refreshState.lastSuccessAt,
    lastReason: refreshState.lastReason,
    lastError: refreshState.lastError,
  };
}

export function refreshRuntimeViewSnapshot(reason = 'manual'): StoredRuntimeViewSnapshot {
  if (refreshState.refreshing) {
    const existing = readStoredRuntimeViewSnapshot();
    if (existing) return existing;
  }

  refreshState.refreshing = true;
  refreshState.lastStartedAt = isoNow();
  refreshState.lastReason = reason;
  refreshState.lastError = null;

  try {
    const snapshot = saveStoredRuntimeViewSnapshot(buildStoredRuntimeViewSnapshot());
    refreshState.lastFinishedAt = isoNow();
    refreshState.lastSuccessAt = refreshState.lastFinishedAt;
    return snapshot;
  } catch (error) {
    refreshState.lastFinishedAt = isoNow();
    refreshState.lastError = error instanceof Error ? error.message : String(error);
    throw error;
  } finally {
    refreshState.refreshing = false;
  }
}

export function getRuntimeViewSnapshot(freshForMs = RUNTIME_VIEW_FRESH_MS): {
  snapshot: StoredRuntimeViewSnapshot;
  cache: RuntimeViewCacheMeta;
} {
  const existing = readStoredRuntimeViewSnapshot();
  if (!existing) {
    const snapshot = refreshRuntimeViewSnapshot('bootstrap');
    return {
      snapshot,
      cache: buildCacheMeta(snapshot, 'bootstrap', freshForMs),
    };
  }

  const generatedAtMs = Date.parse(existing.generatedAt);
  const ageMs = Number.isFinite(generatedAtMs) ? Math.max(0, Date.now() - generatedAtMs) : Number.POSITIVE_INFINITY;
  const stale = !Number.isFinite(ageMs) || ageMs > freshForMs;

  if (stale) {
    scheduleRuntimeViewRefresh('stale-read');
  }

  return {
    snapshot: existing,
    cache: buildCacheMeta(existing, stale ? 'stale' : 'cache', freshForMs),
  };
}

export function getCachedDashboardOverview(): DashboardOverviewWithCache {
  const { snapshot, cache } = getRuntimeViewSnapshot();
  return {
    ...snapshot.dashboardOverview,
    cache,
  };
}

export function getCachedSessionOverview(): SessionOverviewWithCache {
  const { snapshot, cache } = getRuntimeViewSnapshot();
  return {
    ...snapshot.sessionOverview,
    cache,
  };
}

export function getCachedCostSummary(): CostSummaryWithCache {
  const { snapshot, cache } = getRuntimeViewSnapshot();
  return {
    ...snapshot.sessionOverview.costSummary,
    cache,
  };
}
