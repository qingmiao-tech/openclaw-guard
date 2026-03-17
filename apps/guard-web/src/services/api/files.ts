import { fetchJson, postJson } from './client';

export type ManagedRoot = {
  id: string;
  label: string;
  path: string;
  type: 'default-workspace' | 'agent-workspace' | 'detected-workspace';
};

export type ManagedFileEntry = {
  name: string;
  path: string;
  relativePath: string;
  isDirectory: boolean;
  size: number;
  modifiedAt: string | null;
};

export type ManagedFileContent = {
  path: string;
  relativePath: string;
  size: number;
  truncated: boolean;
  content: string;
};

export type MemoryFileRecord = {
  agentId: string;
  type: 'SOUL.md' | 'USER.md' | 'AGENTS.md' | 'MEMORY.md' | 'memory';
  path: string;
  relativePath: string;
  size: number;
  modifiedAt: string | null;
};

export type ManagedFileListResponse = {
  roots: ManagedRoot[];
  currentPath: string;
  parentPath: string | null;
  entries: ManagedFileEntry[];
};

export type FileMutationResult = {
  success: boolean;
  path?: string;
  message: string;
};

export function loadManagedFiles(targetPath?: string) {
  const query = new URLSearchParams();
  if (targetPath) {
    query.set('path', targetPath);
  }
  const suffix = query.size ? `?${query.toString()}` : '';
  return fetchJson<ManagedFileListResponse>(`/api/files${suffix}`);
}

export function loadManagedFileContent(targetPath: string) {
  const query = new URLSearchParams({ path: targetPath });
  return fetchJson<ManagedFileContent>(`/api/files/content?${query.toString()}`);
}

export function saveManagedFileContent(targetPath: string, content: string) {
  return postJson<FileMutationResult>('/api/files/content', {
    path: targetPath,
    content,
  });
}

export function createManagedItem(parentPath: string, name: string, kind: 'file' | 'directory') {
  return postJson<FileMutationResult>('/api/files/create', {
    parentPath,
    name,
    kind,
  });
}

export function loadMemoryFiles() {
  return fetchJson<{ files: MemoryFileRecord[] }>('/api/memory');
}
