const DEFAULT_WORKSPACE = '~/.openclaw/workspace';
const WINDOWS_INVALID_NAME_PATTERN = /[<>:"/\\|?*\u0000-\u001F]/;

function trimTrailingSeparators(value: string): string {
  return value.replace(/[\\/]+$/, '');
}

function normalizePath(value: string): string {
  return trimTrailingSeparators(value.trim()).replace(/\\/g, '/');
}

function pickPreferredSeparator(value: string): '/' | '\\' {
  return value.includes('\\') && !value.includes('/') ? '\\' : '/';
}

function splitPath(value: string) {
  const normalized = normalizePath(value);
  const separator = pickPreferredSeparator(value);
  const lastSeparatorIndex = normalized.lastIndexOf('/');
  const directory = lastSeparatorIndex >= 0 ? normalized.slice(0, lastSeparatorIndex) : '';
  const baseName = lastSeparatorIndex >= 0 ? normalized.slice(lastSeparatorIndex + 1) : normalized;

  return {
    normalized,
    directory,
    baseName,
    separator,
  };
}

export function normalizeWorkspaceBasePath(value: string | null | undefined): string {
  const trimmed = typeof value === 'string' ? trimTrailingSeparators(value.trim()) : '';
  return trimmed || DEFAULT_WORKSPACE;
}

export function validateWorkspaceName(value: string): string {
  const trimmed = String(value || '').trim();
  if (!trimmed) {
    throw new Error('Workspace name is required.');
  }
  if (trimmed === '.' || trimmed === '..') {
    throw new Error('Workspace name is invalid.');
  }
  if (WINDOWS_INVALID_NAME_PATTERN.test(trimmed)) {
    throw new Error('Workspace name contains unsupported path characters.');
  }
  return trimmed;
}

export function buildWorkspacePathFromName(defaultWorkspace: string | null | undefined, workspaceName?: string | null): string {
  const basePath = normalizeWorkspaceBasePath(defaultWorkspace);
  const trimmedName = typeof workspaceName === 'string' ? workspaceName.trim() : '';
  if (!trimmedName) {
    return basePath;
  }

  const safeWorkspaceName = validateWorkspaceName(trimmedName);
  const parts = splitPath(basePath);
  const nextBaseName = `${parts.baseName}-${safeWorkspaceName}`;

  if (!parts.directory) {
    return nextBaseName;
  }

  const directory = parts.directory.replace(/\//g, parts.separator);
  return `${directory}${parts.separator}${nextBaseName}`;
}

export function deriveWorkspaceName(defaultWorkspace: string | null | undefined, workspace: string | null | undefined): string | null {
  const basePath = normalizeWorkspaceBasePath(defaultWorkspace);
  const targetWorkspace = normalizeWorkspaceBasePath(workspace);
  const baseParts = splitPath(basePath);
  const targetParts = splitPath(targetWorkspace);

  if (targetParts.normalized === baseParts.normalized) {
    return '';
  }

  const prefix = `${baseParts.baseName}-`;
  if (targetParts.directory === baseParts.directory && targetParts.baseName.startsWith(prefix)) {
    return targetParts.baseName.slice(prefix.length);
  }

  return null;
}
