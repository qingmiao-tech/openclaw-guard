import { spawnSync } from 'node:child_process';
import { addNotification } from './notifications.js';
import { getOpenClawDir } from './platform.js';
import {
  commitGitSync,
  getGitSyncStatus,
  pushGitSync,
  type GitSyncStatus,
} from './git-sync.js';

export type RecoveryPointKind = 'manual' | 'auto' | 'restore';

export interface RecoveryPoint {
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
}

export interface RecoveryOverview {
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
}

export interface RecoverySaveResult {
  success: boolean;
  message: string;
  createdPoint: RecoveryPoint | null;
  pushed: boolean;
  warnings: string[];
  overview: RecoveryOverview;
}

export interface RestoreActionResult {
  success: boolean;
  message: string;
  branch: string | null;
  restoredFrom: RecoveryPoint | null;
  createdPoint: RecoveryPoint | null;
  pushed: boolean;
  warnings: string[];
}

interface GitCommandResult {
  success: boolean;
  stdout: string;
  stderr: string;
  error?: string;
}

interface ParsedRecoveryCommit {
  commitSha: string;
  shortSha: string;
  createdAt: string;
  subject: string;
  body: string;
}

const RECOVERY_LOG_DELIMITER = '\u001e';
const RECOVERY_FIELD_DELIMITER = '\u001f';

function repoPath(): string {
  return getOpenClawDir();
}

function runGit(args: string[]): GitCommandResult {
  const result = spawnSync('git', args, {
    encoding: 'utf-8',
    timeout: 60_000,
    shell: false,
    windowsHide: true,
  });

  return {
    success: result.status === 0 && !result.error,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
    error: result.error?.message,
  };
}

function isGitAvailable(): boolean {
  return runGit(['--version']).success;
}

function isRepoInitialized(): boolean {
  return runGit(['-C', repoPath(), 'rev-parse', '--git-dir']).success;
}

function getCurrentHeadSha(): string | null {
  const result = runGit(['-C', repoPath(), 'rev-parse', 'HEAD']);
  if (!result.success) return null;
  const value = result.stdout.trim();
  return value || null;
}

function resolveCommitSha(input: string): string | null {
  const trimmed = String(input || '').trim();
  if (!trimmed) return null;
  const result = runGit(['-C', repoPath(), 'rev-parse', trimmed]);
  if (!result.success) return null;
  const value = result.stdout.trim();
  return value || null;
}

function isCommitReachableFromHead(commitSha: string): boolean {
  const result = spawnSync('git', ['-C', repoPath(), 'merge-base', '--is-ancestor', commitSha, 'HEAD'], {
    encoding: 'utf-8',
    timeout: 60_000,
    shell: false,
    windowsHide: true,
  });
  return result.status === 0;
}

function parseRecoveryKind(subject: string): RecoveryPointKind {
  if (subject.startsWith('guard: auto checkpoint before restore')) return 'auto';
  if (subject.startsWith('guard: restore to ')) return 'restore';
  return 'manual';
}

function extractRestoreSource(body: string): string | null {
  const match = body.match(/(?:^|\n)source-commit:\s*([0-9a-f]{7,40})/i);
  return match?.[1] || null;
}

function buildPointTitle(subject: string, kind: RecoveryPointKind): string {
  if (kind === 'auto') return 'Automatic protection before restore';
  if (kind === 'restore') return 'Returned to an earlier protected state';
  if (subject.startsWith('guard: checkpoint ')) {
    const label = subject.slice('guard: checkpoint '.length).trim();
    return label || 'Manual save';
  }
  return subject.trim() || 'Manual save';
}

function buildPointSummary(commit: ParsedRecoveryCommit, kind: RecoveryPointKind): string {
  if (kind === 'auto') {
    return 'Guard created this point automatically before restoring an older state.';
  }
  if (kind === 'restore') {
    const sourceCommitSha = extractRestoreSource(commit.body);
    return sourceCommitSha
      ? `A new point was created after restoring ${sourceCommitSha.slice(0, 7)} on the current branch.`
      : 'A new point was created after restoring an earlier state on the current branch.';
  }
  const trimmedBody = commit.body.trim();
  if (trimmedBody) {
    const firstLine = trimmedBody.split(/\r?\n/).map((line) => line.trim()).find(Boolean);
    if (firstLine) return firstLine;
  }
  if (commit.subject.startsWith('guard: checkpoint ')) {
    return 'Saved by Guard as a recovery point.';
  }
  return 'Saved in the current protection timeline.';
}

function parseRecoveryLog(limit: number): ParsedRecoveryCommit[] {
  if (!isGitAvailable() || !isRepoInitialized()) return [];
  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 100) : 20;
  const format = ['%H', '%h', '%cI', '%s', '%b'].join(RECOVERY_FIELD_DELIMITER) + RECOVERY_LOG_DELIMITER;
  const result = runGit(['-C', repoPath(), 'log', `-n${safeLimit}`, `--format=${format}`, 'HEAD']);
  if (!result.success) return [];

  return result.stdout
    .split(RECOVERY_LOG_DELIMITER)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [commitSha = '', shortSha = '', createdAt = '', subject = '', ...bodyParts] = entry.split(RECOVERY_FIELD_DELIMITER);
      return {
        commitSha: commitSha.trim(),
        shortSha: shortSha.trim(),
        createdAt: createdAt.trim(),
        subject: subject.trim(),
        body: bodyParts.join(RECOVERY_FIELD_DELIMITER).trim(),
      };
    })
    .filter((entry) => entry.commitSha && entry.createdAt);
}

function isPointPushed(pointCreatedAt: string, lastPushedAt: string | null): boolean {
  if (!lastPushedAt) return false;
  const pointMs = Date.parse(pointCreatedAt);
  const pushedMs = Date.parse(lastPushedAt);
  if (!Number.isFinite(pointMs) || !Number.isFinite(pushedMs)) return false;
  return pointMs <= pushedMs;
}

function toRecoveryPoint(commit: ParsedRecoveryCommit, lastPushedAt: string | null, headSha: string | null): RecoveryPoint {
  const kind = parseRecoveryKind(commit.subject);
  return {
    id: commit.commitSha,
    commitSha: commit.commitSha,
    shortSha: commit.shortSha,
    createdAt: commit.createdAt,
    kind,
    title: buildPointTitle(commit.subject, kind),
    summary: buildPointSummary(commit, kind),
    pushed: isPointPushed(commit.createdAt, lastPushedAt),
    restorable: !!headSha && commit.commitSha !== headSha,
    sourceCommitSha: kind === 'restore' ? extractRestoreSource(commit.body) : null,
  };
}

function hasUnsyncedProtectionPoint(latestPoint: RecoveryPoint | null, lastPushedAt: string | null): boolean {
  if (!latestPoint) return false;
  if (!lastPushedAt) return true;
  const latestMs = Date.parse(latestPoint.createdAt);
  const pushedMs = Date.parse(lastPushedAt);
  if (!Number.isFinite(latestMs) || !Number.isFinite(pushedMs)) return true;
  return latestMs > pushedMs;
}

function getRemoteReady(status: GitSyncStatus): boolean {
  return !!status.remoteUrl && !!status.authConfigured && status.repoPrivate === true;
}

function buildWarnings(status: GitSyncStatus, latestPoint: RecoveryPoint | null): string[] {
  const warnings: string[] = [];
  if (!status.gitAvailable) {
    warnings.push('Git is not available on this machine yet.');
    return warnings;
  }
  if (!status.repoInitialized) {
    warnings.push('Protection has not been set up for this .openclaw directory yet.');
    return warnings;
  }
  if (!latestPoint) {
    warnings.push('No recovery point has been created yet.');
  }
  if (status.hasChanges) {
    warnings.push('There are local changes that are not protected yet.');
  }
  if (!getRemoteReady(status)) {
    if (!status.remoteUrl) warnings.push('A private remote repository has not been connected yet.');
    else if (!status.authConfigured) warnings.push('Cloud protection is not ready because authentication is still missing.');
    else if (status.repoPrivate !== true) warnings.push('Cloud protection is waiting for a successful private-repository check.');
  } else if (hasUnsyncedProtectionPoint(latestPoint, status.state.lastSyncAt)) {
    warnings.push('The latest recovery point has not reached the cloud yet.');
  }
  if (Array.isArray(status.skippedEmbeddedRepos) && status.skippedEmbeddedRepos.length > 0) {
    warnings.push('Embedded Git repositories are outside the root protection line and need separate handling.');
  }
  return warnings;
}

export function listRecoveryPoints(limit = 20): RecoveryPoint[] {
  const status = getGitSyncStatus();
  const lastPushedAt = status.state.lastSyncAt;
  const headSha = getCurrentHeadSha();
  return parseRecoveryLog(limit).map((commit) => toRecoveryPoint(commit, lastPushedAt, headSha));
}

export function getRecoveryOverview(): RecoveryOverview {
  const status = getGitSyncStatus();
  const latestPoint = listRecoveryPoints(1)[0] || null;
  const remoteReady = getRemoteReady(status);
  const repoReady = status.gitAvailable && status.repoInitialized;
  const warnings = buildWarnings(status, latestPoint);
  const unsyncedChanges = status.hasChanges || hasUnsyncedProtectionPoint(latestPoint, status.state.lastSyncAt);

  let nextAction = 'protected';
  if (!status.gitAvailable) nextAction = 'install-git';
  else if (!status.repoInitialized) nextAction = 'setup-protection';
  else if (!latestPoint) nextAction = 'save-first-point';
  else if (status.hasChanges) nextAction = 'save-current-state';
  else if (latestPoint.kind === 'restore') nextAction = 'review-restored-state';
  else if (!remoteReady) nextAction = 'connect-private-remote';
  else if (hasUnsyncedProtectionPoint(latestPoint, status.state.lastSyncAt)) nextAction = 'sync-latest-point';

  return {
    protected: !!latestPoint,
    repoReady,
    remoteReady,
    currentBranch: status.currentBranch,
    lastSavedAt: latestPoint?.createdAt || null,
    lastPushedAt: status.state.lastSyncAt,
    unsyncedChanges,
    nextAction,
    warnings,
    latestPoint,
  };
}

function getLatestRecoveryPoint(): RecoveryPoint | null {
  return listRecoveryPoints(1)[0] || null;
}

function buildCheckpointMessage(label?: string): string {
  const trimmed = String(label || '').trim();
  if (trimmed) return `guard: checkpoint ${trimmed}`;

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = `${now.getMonth() + 1}`.padStart(2, '0');
  const dd = `${now.getDate()}`.padStart(2, '0');
  const hh = `${now.getHours()}`.padStart(2, '0');
  const mi = `${now.getMinutes()}`.padStart(2, '0');
  return `guard: checkpoint ${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}

function buildRestoreCommitMessage(sourceCommitSha: string): { subject: string; body: string } {
  const shortSha = sourceCommitSha.slice(0, 7);
  return {
    subject: `guard: restore to ${shortSha}`,
    body: `source-commit: ${sourceCommitSha}`,
  };
}

function buildSaveOverviewMessage(pushed: boolean): string {
  return pushed
    ? 'The current state was saved and synced to the private remote.'
    : 'The current state was saved locally. Cloud protection is not ready yet.';
}

function addRecoveryNotification(title: string, message: string, severity: 'success' | 'warning' | 'error' = 'success', meta?: Record<string, unknown>) {
  addNotification({
    type: 'git-sync',
    source: 'git-sync',
    title,
    message,
    severity,
    meta,
  });
}

export function saveRecoveryPoint(label?: string): RecoverySaveResult {
  const status = getGitSyncStatus();
  if (!status.gitAvailable) {
    return {
      success: false,
      message: 'Git is not available on this machine yet.',
      createdPoint: null,
      pushed: false,
      warnings: ['Install Git before creating recovery points.'],
      overview: getRecoveryOverview(),
    };
  }
  if (!status.repoInitialized) {
    return {
      success: false,
      message: 'Protection has not been set up yet. Open Advanced Git to prepare the repository first.',
      createdPoint: null,
      pushed: false,
      warnings: ['Prepare the repository before creating the first recovery point.'],
      overview: getRecoveryOverview(),
    };
  }
  if (!status.hasChanges) {
    return {
      success: false,
      message: 'There are no new changes to protect right now.',
      createdPoint: getLatestRecoveryPoint(),
      pushed: false,
      warnings: buildWarnings(status, getLatestRecoveryPoint()),
      overview: getRecoveryOverview(),
    };
  }

  const commitResult = commitGitSync(buildCheckpointMessage(label));
  if (!commitResult.success) {
    return {
      success: false,
      message: commitResult.message,
      createdPoint: null,
      pushed: false,
      warnings: buildWarnings(commitResult.status, getLatestRecoveryPoint()),
      overview: getRecoveryOverview(),
    };
  }

  let pushed = false;
  const warnings: string[] = [];
  if (getRemoteReady(commitResult.status)) {
    const pushResult = pushGitSync();
    if (pushResult.success) {
      pushed = true;
    } else {
      warnings.push('The point was saved locally, but syncing to the cloud failed.');
      warnings.push(pushResult.message);
      addRecoveryNotification(
        'Recovery point saved locally',
        'A new recovery point was created locally, but Guard could not push it to the private remote.',
        'warning',
      );
      return {
        success: true,
        message: 'The current state was saved locally, but cloud sync still needs attention.',
        createdPoint: getLatestRecoveryPoint(),
        pushed,
        warnings,
        overview: getRecoveryOverview(),
      };
    }
  } else {
    warnings.push('Cloud protection is not ready yet, so this point is only available on the current machine.');
  }

  addRecoveryNotification(
    pushed ? 'Recovery point saved and synced' : 'Recovery point saved locally',
    pushed
      ? 'A new recovery point was created and pushed to the private remote.'
      : 'A new recovery point was created locally. Cloud sync is not ready yet.',
    pushed ? 'success' : 'warning',
  );

  return {
    success: true,
    message: buildSaveOverviewMessage(pushed),
    createdPoint: getLatestRecoveryPoint(),
    pushed,
    warnings,
    overview: getRecoveryOverview(),
  };
}

export function restoreRecoveryPoint(commitSha: string): RestoreActionResult {
  const status = getGitSyncStatus();
  const resolvedCommitSha = resolveCommitSha(commitSha);
  if (!status.gitAvailable || !resolvedCommitSha) {
    return {
      success: false,
      message: 'The selected recovery point could not be found.',
      branch: status.currentBranch,
      restoredFrom: null,
      createdPoint: null,
      pushed: false,
      warnings: ['Refresh the recovery timeline and choose a valid point again.'],
    };
  }
  if (!status.repoInitialized) {
    return {
      success: false,
      message: 'Protection has not been set up yet, so there is nothing to restore from.',
      branch: status.currentBranch,
      restoredFrom: null,
      createdPoint: null,
      pushed: false,
      warnings: ['Prepare the repository first from Advanced Git.'],
    };
  }
  if (!isCommitReachableFromHead(resolvedCommitSha)) {
    return {
      success: false,
      message: 'The selected point is outside the current protection line.',
      branch: status.currentBranch,
      restoredFrom: null,
      createdPoint: null,
      pushed: false,
      warnings: ['Only points from the current branch can be restored in the beginner flow.'],
    };
  }

  const restoredFrom = listRecoveryPoints(100).find((point) => point.commitSha === resolvedCommitSha) || null;
  const currentHeadSha = getCurrentHeadSha();
  if (currentHeadSha === resolvedCommitSha) {
    return {
      success: true,
      message: 'This recovery point is already the current state.',
      branch: status.currentBranch,
      restoredFrom,
      createdPoint: restoredFrom,
      pushed: restoredFrom?.pushed === true,
      warnings: [],
    };
  }

  if (status.hasChanges) {
    if (!status.stageableChangedFiles.length && status.changedFiles.length > 0) {
      return {
        success: false,
        message: 'Guard found embedded repositories or non-stageable changes and cannot auto-protect them before restoring.',
        branch: status.currentBranch,
        restoredFrom,
        createdPoint: null,
        pushed: false,
        warnings: ['Handle embedded Git repositories separately before restoring an older point.'],
      };
    }
    const autoCheckpoint = commitGitSync('guard: auto checkpoint before restore');
    if (!autoCheckpoint.success) {
      return {
        success: false,
        message: `Guard could not create the safety checkpoint before restoring: ${autoCheckpoint.message}`,
        branch: autoCheckpoint.status.currentBranch,
        restoredFrom,
        createdPoint: null,
        pushed: false,
        warnings: ['Finish protecting the current changes before trying to restore an older point again.'],
      };
    }
  }

  const restoreResult = runGit(['-C', repoPath(), 'restore', '--source', resolvedCommitSha, '--staged', '--worktree', '--', '.']);
  if (!restoreResult.success) {
    return {
      success: false,
      message: `Guard could not restore the selected point: ${restoreResult.error || restoreResult.stderr || restoreResult.stdout}`.trim(),
      branch: getGitSyncStatus().currentBranch,
      restoredFrom,
      createdPoint: null,
      pushed: false,
      warnings: ['Review local repository health and try again.'],
    };
  }

  const restoreCommit = buildRestoreCommitMessage(resolvedCommitSha);
  const commitResult = runGit(['-C', repoPath(), 'commit', '-m', restoreCommit.subject, '-m', restoreCommit.body]);
  if (!commitResult.success) {
    return {
      success: false,
      message: `Guard restored the files but could not record the restore point: ${commitResult.error || commitResult.stderr || commitResult.stdout}`.trim(),
      branch: getGitSyncStatus().currentBranch,
      restoredFrom,
      createdPoint: null,
      pushed: false,
      warnings: ['Check Git user.name / user.email and repository write health before trying again.'],
    };
  }

  let pushed = false;
  const nextStatus = getGitSyncStatus();
  const warnings: string[] = [];
  if (getRemoteReady(nextStatus)) {
    const pushResult = pushGitSync();
    if (pushResult.success) {
      pushed = true;
    } else {
      warnings.push('The restore succeeded locally, but Guard could not sync the new restore point to the cloud.');
      warnings.push(pushResult.message);
    }
  } else {
    warnings.push('The restore succeeded locally. Cloud protection is not ready yet for this branch.');
  }

  addRecoveryNotification(
    'Restore completed',
    `Guard returned the current branch to ${resolvedCommitSha.slice(0, 7)} and created a new restore point.`,
    warnings.length ? 'warning' : 'success',
    { restoredFrom: resolvedCommitSha },
  );

  return {
    success: true,
    message: warnings.length
      ? 'The selected state was restored locally, but cloud sync still needs attention.'
      : 'The selected state was restored on the current branch.',
    branch: getGitSyncStatus().currentBranch,
    restoredFrom,
    createdPoint: getLatestRecoveryPoint(),
    pushed,
    warnings,
  };
}
