import path from 'node:path';
import { runFullAudit } from './audit.js';
import { getChannels } from './channels.js';
import { getConfigPath, getEnvPath, readAllEnv } from './config.js';
import { getGitSyncStatus } from './git-sync.js';
import { getAIConfig } from './models.js';
import { getNotificationSummary } from './notifications.js';
import { detectOpenClaw } from './openclaw.js';
import { detectPlatform, getHomeDir, getOpenClawDir } from './platform.js';
import { getRecoveryOverview, listRecoveryPoints } from './recovery.js';
import { getCachedDashboardOverview, getCachedSessionOverview } from './runtime-view-store.js';
import { getLogs, getServiceStatus } from './service-mgr.js';
import { getWebBackgroundReport } from './web-background.js';
import { getAgentCatalog, getManagedRoots, listMemoryFiles } from './workspace-files.js';

export interface SupportDiagnosticsBundle {
  generatedAt: string;
  redacted: true;
  support: {
    repoUrl: string;
    issuesUrl: string;
    issueGuide: string;
  };
  machine: {
    platform: string;
    user: string;
    homeDir: string;
    openclawDir: string;
    configPath: string;
    envPath: string;
    nodeVersion: string;
    arch: string;
    cwd: string;
  };
  overview: ReturnType<typeof getCachedDashboardOverview>;
  services: {
    guardWeb: ReturnType<typeof getWebBackgroundReport>;
    gateway: ReturnType<typeof getServiceStatus>;
    openclaw: ReturnType<typeof detectOpenClaw>;
  };
  recovery: {
    overview: ReturnType<typeof getRecoveryOverview>;
    recentPoints: ReturnType<typeof listRecoveryPoints>;
  };
  gitSync: {
    repoInitialized: boolean;
    currentBranch: string | null;
    remoteName: string;
    remoteUrl: string | null;
    remoteWebUrl: string | null;
    provider: string | null;
    authMode: string;
    authConfigured: boolean;
    repoPrivate: boolean | null;
    hasChanges: boolean;
    changedFiles: string[];
    skippedEmbeddedRepos: string[];
    reasons: string[];
    oauth: {
      phase: string;
      provider: string | null;
      authorizeUrl: string | null;
      redirectUrl: string | null;
      message: string | null;
      error: string | null;
    };
  };
  workspace: {
    agentCount: number;
    defaultAgentId: string | null;
    managedRoots: Array<{
      id?: string;
      label?: string;
      kind?: string;
      path: string;
    }>;
    memoryFiles: Array<{
      path: string;
      relativePath?: string;
      size?: number;
      agentId?: string | null;
      kind?: string | null;
      modifiedAt?: string | null;
    }>;
  };
  models: ReturnType<typeof getAIConfig>;
  channels: Array<{
    id: string;
    name: string;
    enabled: boolean;
    configured: boolean;
    configuredFields: string[];
    sensitiveFields: string[];
  }>;
  env: {
    keys: string[];
    total: number;
  };
  notifications: ReturnType<typeof getNotificationSummary>;
  sessions: ReturnType<typeof getCachedSessionOverview>;
  audit: {
    summary: {
      pass: number;
      warn: number;
      fail: number;
    };
    results: Array<{
      id?: string;
      title?: string;
      description?: string;
      status?: string;
      recommendation?: string;
    }>;
  };
  logs: {
    service: string[];
  };
}

const SUPPORT_REPO_URL = 'https://github.com/qingmiao-tech/openclaw-guard';
const SUPPORT_ISSUES_URL = 'https://github.com/qingmiao-tech/openclaw-guard/issues/new/choose';
const HOME_PLACEHOLDER = '<HOME>';
const OPENCLAW_PLACEHOLDER = '<OPENCLAW_DIR>';
const CWD_PLACEHOLDER = '<CURRENT_WORKDIR>';
const CURRENT_USER_PLACEHOLDER = '<CURRENT_USER>';

function isSensitiveKey(value: string): boolean {
  return /token|secret|password|api[_-]?key|authorization|cookie/i.test(String(value || ''));
}

function replaceAllText(input: string, search: string, replacement: string): string {
  if (!search) return input;
  return input.split(search).join(replacement);
}

function sanitizeUrl(rawValue: string | null | undefined): string | null {
  const value = typeof rawValue === 'string' ? rawValue.trim() : '';
  if (!value) return null;
  try {
    const parsed = new URL(value);
    if (parsed.username || parsed.password) {
      parsed.username = '';
      parsed.password = '';
    }
    return parsed.toString();
  } catch {
    return value.replace(/\/\/([^/@:\s]+):([^/@\s]+)@/g, '//[REDACTED]:[REDACTED]@');
  }
}

function redactSensitiveText(input: string): string {
  return String(input || '')
    .replace(/(Bearer\s+)[A-Za-z0-9._-]+/gi, '$1[REDACTED]')
    .replace(/((?:token|secret|password|api[_-]?key|authorization|cookie)\s*[:=]\s*)(["']?)[^\s"']+/gi, '$1$2[REDACTED]')
    .replace(/((?:token|secret|password|api[_-]?key|authorization|cookie)\s*:\s*)(["']?).+?(\2)(?=,|\s|$)/gi, '$1$2[REDACTED]$3');
}

function sanitizePath(rawValue: string | null | undefined): string {
  const value = redactSensitiveText(String(rawValue || ''));
  if (!value) return value;
  const replacements = [
    { source: getOpenClawDir(), replacement: OPENCLAW_PLACEHOLDER },
    { source: getHomeDir(), replacement: HOME_PLACEHOLDER },
    { source: path.resolve(process.cwd()), replacement: CWD_PLACEHOLDER },
  ]
    .map((item) => ({ ...item, source: String(item.source || '').trim() }))
    .filter((item) => item.source)
    .sort((a, b) => b.source.length - a.source.length);

  return replacements.reduce((output, item) => {
    const slashVariant = item.source.replace(/\//g, '\\');
    const normalizedVariant = item.source.replace(/\\/g, '/');
    let nextOutput = replaceAllText(output, item.source, item.replacement);
    nextOutput = replaceAllText(nextOutput, slashVariant, item.replacement);
    nextOutput = replaceAllText(nextOutput, normalizedVariant, item.replacement);
    return nextOutput;
  }, value);
}

function sanitizeUnknown<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeUnknown(item)) as T;
  }
  if (value && typeof value === 'object') {
    const output: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      output[key] = isSensitiveKey(key) ? '[REDACTED]' : sanitizeUnknown(entry);
    }
    return output as T;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return value;
    if (/^https?:\/\//i.test(trimmed)) {
      return (sanitizeUrl(trimmed) || '') as T;
    }
    return sanitizePath(trimmed) as T;
  }
  return value;
}

function sanitizeStringArray(values: string[], limit = 200): string[] {
  return (Array.isArray(values) ? values : [])
    .map((value) => sanitizePath(String(value || '')))
    .filter(Boolean)
    .slice(0, limit);
}

function buildAuditSummary() {
  const results = runFullAudit();
  return {
    summary: {
      pass: results.filter((item) => item.status === 'pass').length,
      warn: results.filter((item) => item.status === 'warn').length,
      fail: results.filter((item) => item.status === 'fail').length,
    },
    results: results.slice(0, 50).map((item) => ({
      id: 'id' in item ? String(item.id || '') : undefined,
      title: 'title' in item ? String(item.title || '') : undefined,
      description: 'description' in item ? redactSensitiveText(String(item.description || '')) : undefined,
      status: 'status' in item ? String(item.status || '') : undefined,
      recommendation: 'recommendation' in item ? redactSensitiveText(String(item.recommendation || '')) : undefined,
    })),
  };
}

function buildChannelSummary() {
  return getChannels().map((channel) => {
    const configuredFields = Object.keys(channel.config || {}).sort();
    return {
      id: channel.id,
      name: channel.name,
      enabled: channel.enabled,
      configured: channel.configured,
      configuredFields,
      sensitiveFields: configuredFields.filter((field) => isSensitiveKey(field)),
    };
  });
}

function buildWorkspaceSummary() {
  const agents = getAgentCatalog();
  const defaultAgent = agents.find((agent) => agent.isDefault) || null;
  return {
    agentCount: agents.length,
    defaultAgentId: defaultAgent?.id || null,
    managedRoots: getManagedRoots().map((root) => ({
      id: 'id' in root ? String(root.id || '') : undefined,
      label: 'label' in root ? String(root.label || '') : undefined,
      kind: 'kind' in root ? String(root.kind || '') : undefined,
      path: sanitizePath(String(root.path || '')),
    })),
    memoryFiles: listMemoryFiles().map((file) => ({
      path: sanitizePath(String(file.path || '')),
      relativePath: 'relativePath' in file ? String(file.relativePath || '') : undefined,
      size: typeof file.size === 'number' ? file.size : undefined,
      agentId: 'agentId' in file ? (file.agentId ? String(file.agentId) : null) : undefined,
      kind: 'type' in file ? (file.type ? String(file.type) : null) : undefined,
      modifiedAt: 'modifiedAt' in file ? (file.modifiedAt ? String(file.modifiedAt) : null) : undefined,
    })),
  };
}

function buildGitSyncSummary() {
  const status = getGitSyncStatus();
  return {
    repoInitialized: status.repoInitialized,
    currentBranch: status.currentBranch,
    remoteName: status.remoteName,
    remoteUrl: sanitizeUrl(status.remoteUrl),
    remoteWebUrl: sanitizeUrl(status.remoteWebUrl),
    provider: status.provider,
    authMode: status.authMode,
    authConfigured: status.authConfigured,
    repoPrivate: status.repoPrivate,
    hasChanges: status.hasChanges,
    changedFiles: sanitizeStringArray(status.changedFiles, 200),
    skippedEmbeddedRepos: sanitizeStringArray(status.skippedEmbeddedRepos, 50),
    reasons: sanitizeStringArray(status.reasons, 50),
    oauth: {
      phase: status.oauth?.phase || 'idle',
      provider: status.oauth?.provider || null,
      authorizeUrl: sanitizeUrl(status.oauth?.authorizeUrl || null),
      redirectUrl: sanitizeUrl(status.oauth?.redirectUrl || null),
      message: status.oauth?.message ? redactSensitiveText(status.oauth.message) : null,
      error: status.oauth?.error ? redactSensitiveText(status.oauth.error) : null,
    },
  };
}

function buildNotificationSummary() {
  const summary = getNotificationSummary(30);
  return {
    ...summary,
    items: summary.items.map((item) => ({
      ...item,
      message: sanitizePath(String(item.message || '')),
      meta: item.meta ? sanitizeUnknown(item.meta) as Record<string, unknown> : undefined,
    })),
  };
}

function buildModelSummary() {
  const config = getAIConfig();
  return {
    ...config,
    providers: config.providers.map((provider) => ({
      ...provider,
      baseUrl: sanitizeUrl(provider.baseUrl) || '',
      models: provider.models.map((model) => ({ ...model })),
    })),
  };
}

export function buildSupportDiagnosticsBundle(currentPort: number): SupportDiagnosticsBundle {
  const envMap = readAllEnv();
  const logs = getLogs(120);
  return {
    generatedAt: new Date().toISOString(),
    redacted: true,
    support: {
      repoUrl: SUPPORT_REPO_URL,
      issuesUrl: SUPPORT_ISSUES_URL,
      issueGuide: 'Attach this diagnostics bundle, describe what you expected, what happened instead, and the exact steps to reproduce the problem.',
    },
    machine: {
      platform: detectPlatform(),
      user: CURRENT_USER_PLACEHOLDER,
      homeDir: HOME_PLACEHOLDER,
      openclawDir: OPENCLAW_PLACEHOLDER,
      configPath: sanitizePath(getConfigPath()),
      envPath: sanitizePath(getEnvPath()),
      nodeVersion: process.version,
      arch: process.arch,
      cwd: sanitizePath(path.resolve(process.cwd())),
    },
    overview: sanitizeUnknown(getCachedDashboardOverview()),
    services: {
      guardWeb: sanitizeUnknown(getWebBackgroundReport(currentPort)),
      gateway: sanitizeUnknown(getServiceStatus()),
      openclaw: sanitizeUnknown(detectOpenClaw()),
    },
    recovery: {
      overview: sanitizeUnknown(getRecoveryOverview()),
      recentPoints: sanitizeUnknown(listRecoveryPoints(20)),
    },
    gitSync: buildGitSyncSummary(),
    workspace: buildWorkspaceSummary(),
    models: buildModelSummary(),
    channels: buildChannelSummary(),
    env: {
      keys: Object.keys(envMap).sort(),
      total: Object.keys(envMap).length,
    },
    notifications: buildNotificationSummary(),
    sessions: sanitizeUnknown(getCachedSessionOverview()),
    audit: buildAuditSummary(),
    logs: {
      service: sanitizeStringArray(logs, 120),
    },
  };
}
