import { ref } from 'vue';
import { defineStore } from 'pinia';

export type WorkspaceMode = 'all' | 'memory';
export type MemoryKindFilter = 'all' | 'docs' | 'notes';

type RevealRequest = {
  path: string;
  mode: WorkspaceMode;
  parentPath: string;
};

export function isMemoryManagedPath(targetPath: string) {
  const normalized = String(targetPath || '').replace(/\\/g, '/');
  const baseName = normalized.split('/').pop() || '';
  if (['SOUL.md', 'USER.md', 'AGENTS.md', 'MEMORY.md'].includes(baseName)) return true;
  return /\/memory\/.+\.md$/i.test(normalized);
}

export function getParentDirectory(targetPath: string) {
  const normalized = String(targetPath || '').replace(/[\\/]+$/, '');
  if (!normalized) return '';
  const lastSeparator = Math.max(normalized.lastIndexOf('/'), normalized.lastIndexOf('\\'));
  return lastSeparator >= 0 ? normalized.slice(0, lastSeparator) : '';
}

export const useWorkspaceStore = defineStore('workspace', () => {
  const mode = ref<WorkspaceMode>('all');
  const currentPath = ref('');
  const selectedFilePath = ref('');
  const selectedMemoryFilePath = ref('');
  const memoryKindFilter = ref<MemoryKindFilter>('all');
  const memoryFilterQuery = ref('');
  const searchQuery = ref('');
  const pendingReveal = ref<RevealRequest | null>(null);

  function setMode(value: WorkspaceMode) {
    mode.value = value;
  }

  function setCurrentPath(value: string) {
    currentPath.value = value;
  }

  function setSelectedFilePath(value: string) {
    selectedFilePath.value = value;
    if (value) {
      currentPath.value = getParentDirectory(value) || currentPath.value;
    }
  }

  function setSelectedMemoryFilePath(value: string) {
    selectedMemoryFilePath.value = value;
  }

  function setMemoryKindFilter(value: MemoryKindFilter) {
    memoryKindFilter.value = value;
  }

  function setMemoryFilterQuery(value: string) {
    memoryFilterQuery.value = value;
  }

  function setSearchQuery(value: string) {
    searchQuery.value = value;
  }

  function requestReveal(targetPath: string) {
    const nextMode: WorkspaceMode = isMemoryManagedPath(targetPath) ? 'memory' : 'all';
    pendingReveal.value = {
      path: targetPath,
      mode: nextMode,
      parentPath: getParentDirectory(targetPath),
    };
    mode.value = nextMode;
    if (nextMode === 'memory') {
      selectedMemoryFilePath.value = targetPath;
    } else {
      selectedFilePath.value = targetPath;
      currentPath.value = getParentDirectory(targetPath) || currentPath.value;
    }
  }

  function consumeReveal() {
    const value = pendingReveal.value;
    pendingReveal.value = null;
    return value;
  }

  return {
    mode,
    currentPath,
    selectedFilePath,
    selectedMemoryFilePath,
    memoryKindFilter,
    memoryFilterQuery,
    searchQuery,
    pendingReveal,
    setMode,
    setCurrentPath,
    setSelectedFilePath,
    setSelectedMemoryFilePath,
    setMemoryKindFilter,
    setMemoryFilterQuery,
    setSearchQuery,
    requestReveal,
    consumeReveal,
  };
});
