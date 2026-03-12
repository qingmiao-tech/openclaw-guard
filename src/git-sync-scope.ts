import fs from 'node:fs';
import path from 'node:path';
import { getOpenClawDir } from './platform.js';
import { getDetectedWorkspaceCandidates, getManagedRoots } from './workspace-files.js';

export type GitSyncScopeLevel = 'core' | 'optional' | 'separate' | 'exclude';
export type GitSyncScopeKind =
  | 'workspace'
  | 'config'
  | 'cron'
  | 'canvas'
  | 'extensions'
  | 'skills'
  | 'runtime'
  | 'identity'
  | 'browser-cache'
  | 'session-history';

export interface GitSyncScopeEntry {
  id: string;
  kind: GitSyncScopeKind;
  level: GitSyncScopeLevel;
  label: string;
  paths: string[];
  exists: boolean;
  fileCount: number;
  totalBytes: number;
  statsTruncated: boolean;
  autoDetected: boolean;
  hasGitRepo: boolean;
}

export interface GitSyncScopeWorkspaceCandidate {
  id: string;
  name: string;
  path: string;
  relativePath: string;
  reason: 'named-workspace' | 'workspace-markers';
  docStatus: {
    soul: boolean;
    user: boolean;
    agents: boolean;
    memory: boolean;
  };
  hasGitRepo: boolean;
}

export interface GitSyncScopeSummary {
  coreCount: number;
  optionalCount: number;
  separateCount: number;
  excludeCount: number;
  workspaceCandidateCount: number;
  missingIgnoreCount: number;
}

export interface GitSyncScopeReport {
  repoPath: string;
  entries: GitSyncScopeEntry[];
  workspaceCandidates: GitSyncScopeWorkspaceCandidate[];
  recommendedIgnoreEntries: string[];
  existingIgnoreEntries: string[];
  missingIgnoreEntries: string[];
  recommendedIgnoreBlock: string;
  summary: GitSyncScopeSummary;
}

interface PathSummary {
  exists: boolean;
  fileCount: number;
  totalBytes: number;
  truncated: boolean;
}

const STATS_FILE_LIMIT = 600;
const STATS_DIR_LIMIT = 400;

function normalizeGitIgnoreEntry(input: string): string {
  return input.trim().replace(/\\/g, '/').replace(/^\.\/+/, '').replace(/\/+/g, '/');
}

function parseGitIgnoreEntries(content: string): string[] {
  return Array.from(new Set(content
    .split(/\r?\n/)
    .map((line) => normalizeGitIgnoreEntry(line))
    .filter((line) => line.length > 0 && !line.startsWith('#'))));
}

function buildRecommendedIgnoreBlock(entries: string[]): string {
  if (entries.length === 0) return '';
  return [
    '# Guard: recommended exclusions for root .openclaw sync',
    ...entries,
  ].join('\n');
}

function isPathInsideRepo(repoPath: string, candidatePath: string): boolean {
  const relative = path.relative(repoPath, candidatePath);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function toRelativeRepoPath(repoPath: string, candidatePath: string): string {
  const relative = path.relative(repoPath, candidatePath);
  if (!relative || relative === '.') return path.basename(candidatePath);
  return relative.replace(/\\/g, '/');
}

function summarizePath(candidatePath: string): PathSummary {
  if (!fs.existsSync(candidatePath)) {
    return { exists: false, fileCount: 0, totalBytes: 0, truncated: false };
  }

  const queue = [candidatePath];
  let fileCount = 0;
  let dirCount = 0;
  let totalBytes = 0;
  let truncated = false;

  while (queue.length > 0) {
    const currentPath = queue.shift()!;
    const stats = fs.statSync(currentPath);
    if (stats.isDirectory()) {
      dirCount += 1;
      if (dirCount > STATS_DIR_LIMIT) {
        truncated = true;
        break;
      }
      for (const entry of fs.readdirSync(currentPath, { withFileTypes: true })) {
        if (entry.name === '.git' || entry.name === 'node_modules') continue;
        queue.push(path.join(currentPath, entry.name));
      }
      continue;
    }

    fileCount += 1;
    totalBytes += stats.size;
    if (fileCount >= STATS_FILE_LIMIT) {
      truncated = true;
      break;
    }
  }

  return {
    exists: true,
    fileCount,
    totalBytes,
    truncated,
  };
}

function mergeSummaries(paths: string[]): PathSummary {
  let exists = false;
  let fileCount = 0;
  let totalBytes = 0;
  let truncated = false;

  for (const candidatePath of paths) {
    const summary = summarizePath(candidatePath);
    exists = exists || summary.exists;
    fileCount += summary.fileCount;
    totalBytes += summary.totalBytes;
    truncated = truncated || summary.truncated;
  }

  return { exists, fileCount, totalBytes, truncated };
}

function collectChildPaths(parentPath: string, filter: (candidatePath: string, name: string, isDirectory: boolean) => boolean): string[] {
  if (!fs.existsSync(parentPath)) return [];
  return fs.readdirSync(parentPath, { withFileTypes: true })
    .filter((entry) => filter(path.join(parentPath, entry.name), entry.name, entry.isDirectory()))
    .map((entry) => path.join(parentPath, entry.name));
}

function buildEntry(input: {
  id: string;
  kind: GitSyncScopeKind;
  level: GitSyncScopeLevel;
  label: string;
  repoPath: string;
  absolutePaths: string[];
  autoDetected?: boolean;
  hasGitRepo?: boolean;
}): GitSyncScopeEntry {
  const summary = mergeSummaries(input.absolutePaths);
  return {
    id: input.id,
    kind: input.kind,
    level: input.level,
    label: input.label,
    paths: input.absolutePaths
      .filter((candidatePath) => isPathInsideRepo(input.repoPath, candidatePath))
      .map((candidatePath) => toRelativeRepoPath(input.repoPath, candidatePath)),
    exists: summary.exists,
    fileCount: summary.fileCount,
    totalBytes: summary.totalBytes,
    statsTruncated: summary.truncated,
    autoDetected: input.autoDetected === true,
    hasGitRepo: input.hasGitRepo === true,
  };
}

export function getGitSyncScopeReport(): GitSyncScopeReport {
  const repoPath = getOpenClawDir();
  const entries: GitSyncScopeEntry[] = [];
  const recommendedIgnoreEntries = [
    'guard/secrets/',
    'guard/state/',
    'credentials/',
    'identity/',
    'devices/',
    'browser/',
    'browser-profiles/',
    'delivery-queue/',
    'media/',
    '.clawhub/',
    'agents/*/sessions/',
    'memory/*.sqlite',
    'logs/',
    '*.log',
    'env',
    'exec-approvals.json',
    'update-check.json',
    'openclaw.json.bak*',
    'openclaw.json.backup-*',
  ];

  const workspaceEntries = getManagedRoots()
    .filter((root) => isPathInsideRepo(repoPath, root.path))
    .map((root) => buildEntry({
      id: `workspace:${root.id}`,
      kind: 'workspace',
      level: 'core',
      label: root.label,
      repoPath,
      absolutePaths: [root.path],
      autoDetected: root.type === 'detected-workspace',
      hasGitRepo: fs.existsSync(path.join(root.path, '.git')),
    }));
  entries.push(...workspaceEntries);

  const configPath = path.join(repoPath, 'openclaw.json');
  entries.push(buildEntry({
    id: 'config:openclaw',
    kind: 'config',
    level: 'core',
    label: 'openclaw.json',
    repoPath,
    absolutePaths: [configPath],
  }));

  const cronJobsPath = path.join(repoPath, 'cron', 'jobs.json');
  entries.push(buildEntry({
    id: 'cron:jobs',
    kind: 'cron',
    level: 'core',
    label: 'cron/jobs.json',
    repoPath,
    absolutePaths: [cronJobsPath],
  }));

  const canvasPath = path.join(repoPath, 'canvas');
  if (fs.existsSync(canvasPath)) {
    entries.push(buildEntry({
      id: 'optional:canvas',
      kind: 'canvas',
      level: 'optional',
      label: 'canvas/',
      repoPath,
      absolutePaths: [canvasPath],
    }));
  }

  const extensionsPath = path.join(repoPath, 'extensions');
  if (fs.existsSync(extensionsPath)) {
    entries.push(buildEntry({
      id: 'separate:extensions',
      kind: 'extensions',
      level: 'separate',
      label: 'extensions/',
      repoPath,
      absolutePaths: [extensionsPath],
    }));
  }

  const skillsPath = path.join(repoPath, 'skills');
  if (fs.existsSync(skillsPath)) {
    entries.push(buildEntry({
      id: 'separate:skills',
      kind: 'skills',
      level: 'separate',
      label: 'skills/',
      repoPath,
      absolutePaths: [skillsPath],
    }));
  }

  const excludeGroups: Array<{
    id: string;
    kind: GitSyncScopeKind;
    label: string;
    absolutePaths: string[];
  }> = [
    {
      id: 'exclude:runtime',
      kind: 'runtime',
      label: 'Runtime state and secrets',
      absolutePaths: [
        path.join(repoPath, 'guard', 'state'),
        path.join(repoPath, 'guard', 'secrets'),
        path.join(repoPath, 'env'),
        path.join(repoPath, 'logs'),
      ],
    },
    {
      id: 'exclude:identity',
      kind: 'identity',
      label: 'Credentials and device identity',
      absolutePaths: [
        path.join(repoPath, 'credentials'),
        path.join(repoPath, 'identity'),
        path.join(repoPath, 'devices'),
        path.join(repoPath, 'exec-approvals.json'),
      ],
    },
    {
      id: 'exclude:browser',
      kind: 'browser-cache',
      label: 'Browser, media, and queue caches',
      absolutePaths: [
        path.join(repoPath, 'browser'),
        path.join(repoPath, 'browser-profiles'),
        path.join(repoPath, 'delivery-queue'),
        path.join(repoPath, 'media'),
        path.join(repoPath, '.clawhub'),
      ],
    },
    {
      id: 'exclude:history',
      kind: 'session-history',
      label: 'Session history and generated indexes',
      absolutePaths: [
        ...collectChildPaths(path.join(repoPath, 'agents'), (candidatePath, _name, isDirectory) => isDirectory && fs.existsSync(path.join(candidatePath, 'sessions'))).map((candidatePath) => path.join(candidatePath, 'sessions')),
        ...collectChildPaths(path.join(repoPath, 'memory'), (_candidatePath, name, isDirectory) => !isDirectory && /\.sqlite$/i.test(name)),
        path.join(repoPath, 'update-check.json'),
        ...collectChildPaths(repoPath, (_candidatePath, name, isDirectory) => !isDirectory && /^openclaw\.json\.(?:bak|backup-)/i.test(name)),
      ],
    },
  ];

  for (const group of excludeGroups) {
    entries.push(buildEntry({
      id: group.id,
      kind: group.kind,
      level: 'exclude',
      label: group.label,
      repoPath,
      absolutePaths: group.absolutePaths,
    }));
  }

  const gitignorePath = path.join(repoPath, '.gitignore');
  const existingIgnoreEntries = fs.existsSync(gitignorePath)
    ? parseGitIgnoreEntries(fs.readFileSync(gitignorePath, 'utf-8'))
    : [];
  const existingIgnoreSet = new Set(existingIgnoreEntries);
  const missingIgnoreEntries = recommendedIgnoreEntries.filter((entry) => !existingIgnoreSet.has(normalizeGitIgnoreEntry(entry)));

  const workspaceCandidates = getDetectedWorkspaceCandidates()
    .filter((candidate) => isPathInsideRepo(repoPath, candidate.path))
    .map((candidate) => ({
      id: candidate.id,
      name: candidate.name,
      path: candidate.path,
      relativePath: candidate.relativePath.replace(/\\/g, '/'),
      reason: candidate.reason,
      docStatus: candidate.docStatus,
      hasGitRepo: candidate.hasGitRepo,
    }));

  const summary: GitSyncScopeSummary = {
    coreCount: entries.filter((entry) => entry.level === 'core' && entry.exists).length,
    optionalCount: entries.filter((entry) => entry.level === 'optional' && entry.exists).length,
    separateCount: entries.filter((entry) => entry.level === 'separate' && entry.exists).length,
    excludeCount: entries.filter((entry) => entry.level === 'exclude' && entry.exists).length,
    workspaceCandidateCount: workspaceCandidates.length,
    missingIgnoreCount: missingIgnoreEntries.length,
  };

  return {
    repoPath,
    entries: entries.filter((entry) => entry.exists || entry.level !== 'optional'),
    workspaceCandidates,
    recommendedIgnoreEntries,
    existingIgnoreEntries,
    missingIgnoreEntries,
    recommendedIgnoreBlock: buildRecommendedIgnoreBlock(missingIgnoreEntries),
    summary,
  };
}
