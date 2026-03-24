import type { MemoryFileRecord } from '@/services/api/files';
import { useUiStore } from '@/stores/ui';
import type { MemoryKindFilter } from '@/stores/workspace';

type UiStore = ReturnType<typeof useUiStore>;

export type EditorKind = 'file' | 'memory';
export type MemoryFileKind = 'docs' | 'notes';

export type MemoryGroup = {
  agentId: string;
  label: string;
  files: MemoryFileRecord[];
  docsCount: number;
  notesCount: number;
};

export function normalizeEditorText(value: string) {
  return value.replace(/\r\n/g, '\n');
}

export function getMemoryFileKind(file: MemoryFileRecord): MemoryFileKind {
  return file.type === 'memory' ? 'notes' : 'docs';
}

export function getMemoryFilterLabel(ui: UiStore, kind: MemoryKindFilter) {
  if (kind === 'docs') return ui.label('核心文档', 'Core docs');
  if (kind === 'notes') return ui.label('记忆片段', 'Memory notes');
  return ui.label('全部', 'All');
}

export function getMemoryAgentLabel(ui: UiStore, agentId: string) {
  if (!agentId) return ui.label('未分组', 'Ungrouped');
  if (!agentId.startsWith('detected:')) return agentId;
  const suffix = agentId.slice('detected:'.length) || 'workspace';
  return ui.label(`自动发现：${suffix}`, `Auto-detected: ${suffix}`);
}

export function renderMemoryLabel(file: MemoryFileRecord) {
  if (file.type === 'memory') {
    const parts = file.relativePath.split(/[\\/]/);
    return parts[parts.length - 1] || file.relativePath;
  }
  return file.type;
}
