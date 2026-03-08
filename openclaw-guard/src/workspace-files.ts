import fs from 'node:fs';
import path from 'node:path';
import { loadConfig, getNested } from './config.js';
import { resolveUserPath, statSafe } from './guard-state.js';

export interface AgentWorkspaceDocStatus {
  soul: boolean;
  user: boolean;
  agents: boolean;
  memory: boolean;
}

export interface AgentSummary {
  id: string;
  name: string;
  isDefault: boolean;
  modelId: string | null;
  workspace: string;
  resolvedWorkspace: string;
  workspaceExists: boolean;
  docStatus: AgentWorkspaceDocStatus;
}

export interface ManagedRoot {
  id: string;
  label: string;
  path: string;
  type: 'default-workspace' | 'agent-workspace';
}

export interface ManagedFileEntry {
  name: string;
  path: string;
  relativePath: string;
  isDirectory: boolean;
  size: number;
  modifiedAt: string | null;
}

export interface ManagedFileContent {
  path: string;
  relativePath: string;
  size: number;
  truncated: boolean;
  content: string;
}

export interface MemoryFileRecord {
  agentId: string;
  type: 'SOUL.md' | 'USER.md' | 'AGENTS.md' | 'MEMORY.md' | 'memory';
  path: string;
  relativePath: string;
  size: number;
  modifiedAt: string | null;
}

export interface SearchHit {
  path: string;
  relativePath: string;
  line: number;
  preview: string;
}

export interface CreateManagedEntryResult {
  success: boolean;
  path?: string;
  message: string;
}

const EDITABLE_EXTENSIONS = new Set(['.md', '.txt', '.json', '.json5', '.yml', '.yaml', '.log', '.csv']);
const PREVIEWABLE_EXTENSIONS = new Set([...Array.from(EDITABLE_EXTENSIONS), '.ts', '.js', '.mjs', '.cjs', '.tsx', '.jsx']);
const MEMORY_FILE_NAMES = new Set(['SOUL.md', 'USER.md', 'AGENTS.md', 'MEMORY.md']);

function buildDocStatus(workspacePath: string): AgentWorkspaceDocStatus {
  return {
    soul: fs.existsSync(path.join(workspacePath, 'SOUL.md')),
    user: fs.existsSync(path.join(workspacePath, 'USER.md')),
    agents: fs.existsSync(path.join(workspacePath, 'AGENTS.md')),
    memory: fs.existsSync(path.join(workspacePath, 'MEMORY.md')) || fs.existsSync(path.join(workspacePath, 'memory')),
  };
}

export function getAgentCatalog(): AgentSummary[] {
  const config = loadConfig();
  const defaults = toObject(getNested(config, ['agents', 'defaults'])) || {};
  const defaultWorkspace = typeof defaults.workspace === 'string' ? defaults.workspace : '~/.openclaw/workspace';
  const defaultModel = normalizeModelNode(getNested(defaults, ['model']));
  const list = Array.isArray(getNested(config, ['agents', 'list']))
    ? getNested(config, ['agents', 'list']) as unknown[]
    : [];

  const agents = list
    .map((item) => toObject(item))
    .filter((item): item is Record<string, unknown> => item !== null)
    .map((item) => {
      const resolvedWorkspace = resolveUserPath(String(item.workspace || defaultWorkspace));
      const isDefault = item.default === true;
      return {
        id: String(item.id || ''),
        name: String(item.name || item.id || 'Unnamed Agent'),
        isDefault,
        modelId: typeof item.model === 'string' ? item.model : defaultModel,
        workspace: String(item.workspace || defaultWorkspace),
        resolvedWorkspace,
        workspaceExists: fs.existsSync(resolvedWorkspace),
        docStatus: buildDocStatus(resolvedWorkspace),
      } satisfies AgentSummary;
    });

  if (agents.length === 0) {
    const resolvedWorkspace = resolveUserPath(defaultWorkspace);
    return [{
      id: 'default',
      name: 'Default Agent',
      isDefault: true,
      modelId: defaultModel,
      workspace: defaultWorkspace,
      resolvedWorkspace,
      workspaceExists: fs.existsSync(resolvedWorkspace),
      docStatus: buildDocStatus(resolvedWorkspace),
    }];
  }

  return agents;
}

function normalizeModelNode(node: unknown): string | null {
  if (typeof node === 'string' && node.trim()) return node.trim();
  const object = toObject(node);
  if (!object) return null;
  return typeof object.primary === 'string' && object.primary.trim() ? object.primary.trim() : null;
}

function toObject(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function makeRootId(kind: string, label: string): string {
  return `${kind}:${label}`.toLowerCase().replace(/[^a-z0-9:-]+/g, '-');
}

export function getManagedRoots(): ManagedRoot[] {
  const agents = getAgentCatalog();
  const config = loadConfig();
  const defaults = toObject(getNested(config, ['agents', 'defaults'])) || {};
  const defaultWorkspace = typeof defaults.workspace === 'string' ? defaults.workspace : '~/.openclaw/workspace';
  const resolvedDefault = resolveUserPath(defaultWorkspace);

  const roots: ManagedRoot[] = [{
    id: makeRootId('default', 'workspace'),
    label: 'Default Workspace',
    path: resolvedDefault,
    type: 'default-workspace',
  }];

  for (const agent of agents) {
    if (!roots.some((root) => root.path === agent.resolvedWorkspace)) {
      roots.push({
        id: makeRootId('agent', agent.id),
        label: `${agent.name} (${agent.id})`,
        path: agent.resolvedWorkspace,
        type: 'agent-workspace',
      });
    }
  }

  return roots;
}

function getManagedRootForPath(targetPath: string): ManagedRoot | null {
  const resolved = resolveUserPath(targetPath);
  const roots = getManagedRoots()
    .filter((root) => resolved === root.path || resolved.startsWith(`${root.path}${path.sep}`))
    .sort((a, b) => b.path.length - a.path.length);
  return roots[0] || null;
}

function ensureManagedPath(targetPath: string): string {
  const resolved = resolveUserPath(targetPath);
  const matched = getManagedRootForPath(resolved);
  if (!matched) {
    throw new Error('Target path is outside Guard managed roots');
  }
  return resolved;
}

function ensureManagedDirectory(targetPath: string): string {
  const resolved = ensureManagedPath(targetPath);
  if (!fs.existsSync(resolved)) {
    fs.mkdirSync(resolved, { recursive: true });
  }
  const stats = fs.statSync(resolved);
  if (!stats.isDirectory()) {
    throw new Error('Target directory is invalid');
  }
  return resolved;
}

function relativeToManagedRoot(targetPath: string): string {
  const matched = getManagedRootForPath(targetPath);
  if (!matched) return path.basename(targetPath);
  const relative = path.relative(matched.path, targetPath);
  return relative && relative !== '.' ? relative : path.basename(targetPath);
}

function validateNewEntryName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error('Entry name cannot be empty');
  }
  if (trimmed.includes('/') || trimmed.includes('\\') || trimmed === '.' || trimmed === '..') {
    throw new Error('Entry name cannot contain path separators');
  }
  return trimmed;
}

export function listManagedFiles(targetPath?: string): ManagedFileEntry[] {
  const roots = getManagedRoots();
  const resolved = targetPath ? ensureManagedDirectory(targetPath) : roots[0]?.path;
  if (!resolved || !fs.existsSync(resolved)) return [];

  const entries = fs.readdirSync(resolved, { withFileTypes: true })
    .map((entry) => {
      const absolutePath = path.join(resolved, entry.name);
      const stats = statSafe(absolutePath);
      return {
        name: entry.name,
        path: absolutePath,
        relativePath: relativeToManagedRoot(absolutePath),
        isDirectory: entry.isDirectory(),
        size: stats?.size || 0,
        modifiedAt: stats?.mtime.toISOString() || null,
      } satisfies ManagedFileEntry;
    })
    .sort((a, b) => Number(b.isDirectory) - Number(a.isDirectory) || a.name.localeCompare(b.name));

  return entries;
}

export function readManagedFile(targetPath: string, maxBytes = 64 * 1024): ManagedFileContent {
  const resolved = ensureManagedPath(targetPath);
  const extension = path.extname(resolved).toLowerCase();
  if (!PREVIEWABLE_EXTENSIONS.has(extension) && !MEMORY_FILE_NAMES.has(path.basename(resolved))) {
    throw new Error('This file type is not previewable in Guard');
  }
  const buffer = fs.readFileSync(resolved);
  const truncated = buffer.byteLength > maxBytes;
  const content = buffer.subarray(0, maxBytes).toString('utf-8');
  return {
    path: resolved,
    relativePath: relativeToManagedRoot(resolved),
    size: buffer.byteLength,
    truncated,
    content,
  };
}

export function writeManagedFile(targetPath: string, content: string): { success: boolean; message: string } {
  const resolved = ensureManagedPath(targetPath);
  const extension = path.extname(resolved).toLowerCase();
  if (!EDITABLE_EXTENSIONS.has(extension) && !MEMORY_FILE_NAMES.has(path.basename(resolved))) {
    return { success: false, message: 'This file type cannot be edited in Guard' };
  }

  fs.mkdirSync(path.dirname(resolved), { recursive: true });
  fs.writeFileSync(resolved, content, 'utf-8');
  return { success: true, message: `Saved ${resolved}` };
}

export function createManagedEntry(parentPath: string, name: string, kind: 'file' | 'directory' = 'file'): CreateManagedEntryResult {
  try {
    const resolvedParent = ensureManagedDirectory(parentPath);
    const safeName = validateNewEntryName(name);
    const targetPath = ensureManagedPath(path.join(resolvedParent, safeName));
    if (fs.existsSync(targetPath)) {
      return { success: false, message: 'A file or directory with the same name already exists' };
    }

    if (kind === 'directory') {
      fs.mkdirSync(targetPath, { recursive: true });
    } else {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, '', 'utf-8');
    }

    return {
      success: true,
      path: targetPath,
      message: kind === 'directory' ? `Created directory ${targetPath}` : `Created file ${targetPath}`,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

function walkDirectory(rootPath: string, collector: string[]): void {
  if (!fs.existsSync(rootPath)) return;
  const entries = fs.readdirSync(rootPath, { withFileTypes: true });
  for (const entry of entries) {
    const absolutePath = path.join(rootPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'node_modules') continue;
      walkDirectory(absolutePath, collector);
      continue;
    }
    collector.push(absolutePath);
  }
}

export function listMemoryFiles(): MemoryFileRecord[] {
  const agents = getAgentCatalog();
  const results: MemoryFileRecord[] = [];

  for (const agent of agents) {
    const files = [
      { file: 'SOUL.md', type: 'SOUL.md' as const },
      { file: 'USER.md', type: 'USER.md' as const },
      { file: 'AGENTS.md', type: 'AGENTS.md' as const },
      { file: 'MEMORY.md', type: 'MEMORY.md' as const },
    ];

    for (const item of files) {
      const absolutePath = path.join(agent.resolvedWorkspace, item.file);
      const stats = statSafe(absolutePath);
      if (!stats) continue;
      results.push({
        agentId: agent.id,
        type: item.type,
        path: absolutePath,
        relativePath: item.file,
        size: stats.size,
        modifiedAt: stats.mtime.toISOString(),
      });
    }

    const memoryDir = path.join(agent.resolvedWorkspace, 'memory');
    const memoryFiles: string[] = [];
    walkDirectory(memoryDir, memoryFiles);
    for (const absolutePath of memoryFiles.filter((filePath) => path.extname(filePath).toLowerCase() === '.md')) {
      const stats = statSafe(absolutePath);
      if (!stats) continue;
      results.push({
        agentId: agent.id,
        type: 'memory',
        path: absolutePath,
        relativePath: path.relative(agent.resolvedWorkspace, absolutePath),
        size: stats.size,
        modifiedAt: stats.mtime.toISOString(),
      });
    }
  }

  return results.sort((a, b) => (b.modifiedAt || '').localeCompare(a.modifiedAt || ''));
}

export function searchManagedFiles(query: string, limit = 100): SearchHit[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  const files: string[] = [];
  for (const root of getManagedRoots()) {
    walkDirectory(root.path, files);
  }

  const results: SearchHit[] = [];
  for (const absolutePath of files) {
    const baseName = path.basename(absolutePath);
    const extension = path.extname(absolutePath).toLowerCase();
    if (!PREVIEWABLE_EXTENSIONS.has(extension) && !MEMORY_FILE_NAMES.has(baseName)) continue;
    const stats = statSafe(absolutePath);
    if (!stats || stats.size > 1024 * 1024) continue;

    const content = fs.readFileSync(absolutePath, 'utf-8');
    const lines = content.split(/\r?\n/);
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      if (!line.toLowerCase().includes(normalizedQuery)) continue;
      results.push({
        path: absolutePath,
        relativePath: relativeToManagedRoot(absolutePath),
        line: index + 1,
        preview: line.trim(),
      });
      if (results.length >= limit) return results;
    }
  }

  return results;
}
