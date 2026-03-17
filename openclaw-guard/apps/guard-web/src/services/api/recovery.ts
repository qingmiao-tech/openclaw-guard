import { fetchJson, postJson } from './client';

export type RecoveryPointKind = 'manual' | 'auto' | 'restore';

export type RecoveryPoint = {
  id: string;
  commitSha: string;
  shortSha: string;
  createdAt: string;
  kind: RecoveryPointKind;
  title: string;
  summary: string;
  pushed: boolean;
  restorable: boolean;
  sourceCommitSha?: string | null;
};

export type RecoveryOverview = {
  protected: boolean;
  repoReady: boolean;
  remoteReady: boolean;
  currentBranch: string | null;
  lastSavedAt: string | null;
  lastPushedAt: string | null;
  unsyncedChanges: boolean;
  nextAction: string;
  warnings: string[];
  latestPoint: RecoveryPoint | null;
};

export type RecoverySaveResult = {
  success: boolean;
  message: string;
  createdPoint: RecoveryPoint | null;
  pushed: boolean;
  warnings: string[];
  overview: RecoveryOverview;
};

export type RestoreActionResult = {
  success: boolean;
  message: string;
  branch: string | null;
  restoredFrom: RecoveryPoint | null;
  createdPoint: RecoveryPoint | null;
  pushed: boolean;
  warnings: string[];
};

export type GitSyncStatus = {
  repoPath: string;
  gitAvailable: boolean;
  repoInitialized: boolean;
  currentBranch: string | null;
  remoteName: string;
  remoteUrl: string | null;
  provider: string | null;
  authMode: string;
  authConfigured: boolean;
  repoPrivate: boolean | null;
  remoteOwner: string | null;
  remoteRepo: string | null;
  remoteHost: string | null;
  remoteWebUrl: string | null;
  accountUsername: string | null;
  hasChanges: boolean;
  changedFiles: string[];
  stageableChangedFiles: string[];
  skippedEmbeddedRepos: string[];
  canCommit: boolean;
  canPush: boolean;
  canSync: boolean;
  commitReasons: string[];
  pushReasons: string[];
  reasons: string[];
  state: {
    lastSyncAt: string | null;
    lastCommitAt: string | null;
    authMode: string;
    oauth?: {
      phase?: string;
      message?: string | null;
      error?: string | null;
      authorizeUrl?: string | null;
    };
  };
  cache?: {
    generatedAt: string | null;
    refreshing: boolean;
    stale: boolean;
  };
};

export type GitIgnorePreview = {
  mode: 'smart' | 'exact';
  repoPath: string;
  gitignorePath: string;
  embeddedRepos: string[];
  existingEntries: string[];
  suggestedEntries: string[];
  missingEntries: string[];
  willChange: boolean;
  suggestedBlock: string;
  appendBlock: string;
  cache?: {
    generatedAt: string | null;
    refreshing: boolean;
    stale: boolean;
  };
};

export type GitActionResult = {
  success: boolean;
  message: string;
  output?: string;
  status: GitSyncStatus;
};

export async function loadRecoverySnapshot() {
  const [overview, points, gitStatus, gitIgnorePreview] = await Promise.all([
    fetchJson<RecoveryOverview>('/api/recovery/overview'),
    fetchJson<{ items: RecoveryPoint[] }>('/api/recovery/points?limit=20'),
    fetchJson<GitSyncStatus>('/api/git-sync/status'),
    fetchJson<GitIgnorePreview>('/api/git-sync/gitignore-preview?mode=smart'),
  ]);

  return {
    overview,
    points: points.items || [],
    gitStatus,
    gitIgnorePreview,
  };
}

export function createRecoveryPoint(label?: string) {
  return postJson<RecoverySaveResult>('/api/recovery/save', { label: label || '' });
}

export function restoreRecoveryPoint(commitSha: string) {
  return postJson<RestoreActionResult>('/api/recovery/restore', { commitSha });
}

export function initializeProtection() {
  return postJson<GitActionResult>('/api/git-sync/init', {});
}

export function checkPrivateRemote() {
  return postJson<GitActionResult>('/api/git-sync/check-private', {});
}

export function createLocalCheckpoint(message?: string) {
  return postJson<GitActionResult>('/api/git-sync/commit', { message: message || '' });
}

export function pushProtectionLine() {
  return postJson<GitActionResult>('/api/git-sync/push', {});
}

export function syncProtectionLine(message?: string) {
  return postJson<GitActionResult>('/api/git-sync/sync', { message: message || '' });
}

export function applyGitIgnoreRules(mode: 'smart' | 'exact' = 'smart') {
  return postJson<GitActionResult>('/api/git-sync/gitignore-apply', { mode });
}
