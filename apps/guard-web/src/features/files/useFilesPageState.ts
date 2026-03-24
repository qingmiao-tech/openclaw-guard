import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import {
  createManagedItem,
  loadManagedFileContent,
  loadManagedFiles,
  loadMemoryFiles,
  saveManagedFileContent,
  type ManagedFileContent,
  type ManagedFileEntry,
  type ManagedFileListResponse,
  type MemoryFileRecord,
} from '@/services/api/files';
import { useFeedbackStore } from '@/stores/feedback';
import { useUiStore } from '@/stores/ui';
import {
  getParentDirectory,
  useWorkspaceStore,
  type MemoryKindFilter,
  type WorkspaceMode,
} from '@/stores/workspace';
import {
  getMemoryAgentLabel,
  getMemoryFileKind,
  getMemoryFilterLabel,
  normalizeEditorText,
  renderMemoryLabel,
  type EditorKind,
  type MemoryGroup,
} from '@/features/files/files-helpers';

export function useFilesPageState() {
  const ui = useUiStore();
  const feedback = useFeedbackStore();
  const workspace = useWorkspaceStore();

  const modeLoading = ref(true);
  const directoryLoading = ref(false);
  const memoryCatalogLoading = ref(false);
  const editorLoading = ref(false);
  const directoryError = ref<string | null>(null);
  const memoryError = ref<string | null>(null);
  const filesResponse = ref<ManagedFileListResponse | null>(null);
  const memoryCatalog = ref<MemoryFileRecord[]>([]);
  const currentFile = ref<ManagedFileContent | null>(null);
  const currentFileDraft = ref('');
  const currentFileOriginal = ref('');
  const currentMemoryFile = ref<ManagedFileContent | null>(null);
  const currentMemoryDraft = ref('');
  const currentMemoryOriginal = ref('');
  const saving = ref(false);
  const creating = ref(false);
  const createKind = ref<'file' | 'directory'>('file');
  const createName = ref('');

  const fileTabs = computed(() => [
    {
      id: 'all',
      label: ui.label('全部文件', 'All files'),
      hint: ui.label('浏览受 Guard 管理的工作区目录', 'Browse Guard-managed workspace directories'),
    },
    {
      id: 'memory',
      label: ui.label('核心记忆', 'Core memory'),
      hint: ui.label('集中查看 SOUL / USER / AGENTS / MEMORY 与 memory/', 'Focus on SOUL / USER / AGENTS / MEMORY and memory/'),
    },
  ]);

  const currentError = computed(() =>
    workspace.mode === 'memory' ? memoryError.value : directoryError.value,
  );
  const roots = computed(() => filesResponse.value?.roots || []);
  const entries = computed(() => filesResponse.value?.entries || []);
  const currentPath = computed(() => filesResponse.value?.currentPath || workspace.currentPath);
  const parentPath = computed(() => filesResponse.value?.parentPath || null);
  const selectedRoot = computed(
    () =>
      roots.value
        .filter(
          (root) =>
            currentPath.value === root.path ||
            currentPath.value.startsWith(`${root.path}\\`) ||
            currentPath.value.startsWith(`${root.path}/`),
        )
        .sort((left, right) => right.path.length - left.path.length)[0] || null,
  );
  const directoryCount = computed(
    () => entries.value.filter((entry) => entry.isDirectory).length,
  );
  const regularFileCount = computed(() => entries.value.length - directoryCount.value);
  const memoryFiles = computed(() => memoryCatalog.value);
  const filteredMemoryFiles = computed(() => {
    const query = workspace.memoryFilterQuery.trim().toLowerCase();
    return memoryFiles.value
      .filter((file) => {
        if (
          workspace.memoryKindFilter !== 'all' &&
          getMemoryFileKind(file) !== workspace.memoryKindFilter
        ) {
          return false;
        }
        if (!query) return true;
        return [file.agentId, file.type, file.relativePath, file.path]
          .join(' ')
          .toLowerCase()
          .includes(query);
      })
      .sort((left, right) => {
        const agentCompare = String(left.agentId || '').localeCompare(
          String(right.agentId || ''),
        );
        if (agentCompare !== 0) return agentCompare;
        const kindCompare = getMemoryFileKind(left).localeCompare(
          getMemoryFileKind(right),
        );
        if (kindCompare !== 0) return kindCompare;
        return renderMemoryLabel(left).localeCompare(renderMemoryLabel(right));
      });
  });
  const memoryGroups = computed<MemoryGroup[]>(() => {
    const groups = new Map<string, MemoryFileRecord[]>();
    for (const file of filteredMemoryFiles.value) {
      const key = String(file.agentId || '');
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)?.push(file);
    }

    return Array.from(groups.entries())
      .map(([agentId, files]) => ({
        agentId,
        label: getMemoryAgentLabel(ui, agentId),
        files,
        docsCount: files.filter((item) => getMemoryFileKind(item) === 'docs').length,
        notesCount: files.filter((item) => getMemoryFileKind(item) === 'notes').length,
      }))
      .sort((left, right) => left.label.localeCompare(right.label));
  });

  const fileDirty = computed(() => hasDirtyEditor('file'));
  const memoryDirty = computed(() => hasDirtyEditor('memory'));
  const hasAnyDirtyEditor = computed(() => fileDirty.value || memoryDirty.value);

  async function confirmLeaveFilesPage() {
    if (!hasAnyDirtyEditor.value) return true;
    return feedback.confirm({
      title: ui.label('离开文件页', 'Leave Files'),
      message: ui.label(
        '当前仍有未保存的文件或记忆改动。现在离开会丢失这些修改。',
        'There are still unsaved file or memory edits. Leaving now will discard those changes.',
      ),
      confirmLabel: ui.label('放弃并离开', 'Discard and leave'),
      cancelLabel: ui.label('留在当前页', 'Stay here'),
      tone: 'danger',
    });
  }

  async function confirmEditorSwitch(kind: EditorKind) {
    if (!hasDirtyEditor(kind)) return true;
    const isMemory = kind === 'memory';
    return feedback.confirm({
      title: ui.label(
        isMemory ? '切换记忆文件' : '切换文件',
        isMemory ? 'Switch memory file' : 'Switch file',
      ),
      message: ui.label(
        isMemory
          ? '当前记忆编辑器里有未保存修改，继续切换会丢失这些内容。'
          : '当前文件编辑器里有未保存修改，继续切换会丢失这些内容。',
        isMemory
          ? 'There are unsaved changes in the memory editor. Switching now discards them.'
          : 'There are unsaved changes in the file editor. Switching now discards them.',
      ),
      confirmLabel: ui.label('放弃并继续', 'Discard and continue'),
      cancelLabel: ui.label('取消', 'Cancel'),
      tone: 'danger',
    });
  }

  function hasDirtyEditor(kind: EditorKind) {
    if (kind === 'file') {
      return (
        currentFile.value !== null &&
        normalizeEditorText(currentFileDraft.value) !== currentFileOriginal.value
      );
    }
    return (
      currentMemoryFile.value !== null &&
      normalizeEditorText(currentMemoryDraft.value) !== currentMemoryOriginal.value
    );
  }

  async function loadDirectory(targetPath?: string, silent = false) {
    if (!silent) directoryLoading.value = true;
    directoryError.value = null;
    try {
      const data = await loadManagedFiles(targetPath);
      filesResponse.value = data;
      workspace.setCurrentPath(data.currentPath);
    } catch (error) {
      directoryError.value = error instanceof Error ? error.message : String(error);
    } finally {
      directoryLoading.value = false;
    }
  }

  async function loadMemoryCatalogData(silent = false) {
    if (!silent) memoryCatalogLoading.value = true;
    memoryError.value = null;
    try {
      const data = await loadMemoryFiles();
      memoryCatalog.value = data.files || [];
    } catch (error) {
      memoryError.value = error instanceof Error ? error.message : String(error);
    } finally {
      memoryCatalogLoading.value = false;
    }
  }

  async function openRegularFile(targetPath: string, confirm = true) {
    if (confirm && !(await confirmEditorSwitch('file'))) return false;
    editorLoading.value = true;
    try {
      const data = await loadManagedFileContent(targetPath);
      currentFile.value = data;
      currentFileDraft.value = data.content || '';
      currentFileOriginal.value = normalizeEditorText(data.content || '');
      workspace.setSelectedFilePath(targetPath);
      return true;
    } catch (error) {
      feedback.pushToast({
        tone: 'error',
        message: error instanceof Error ? error.message : String(error),
      });
      return false;
    } finally {
      editorLoading.value = false;
    }
  }

  async function openMemoryFile(targetPath: string, confirm = true) {
    if (confirm && !(await confirmEditorSwitch('memory'))) return false;
    editorLoading.value = true;
    try {
      const data = await loadManagedFileContent(targetPath);
      currentMemoryFile.value = data;
      currentMemoryDraft.value = data.content || '';
      currentMemoryOriginal.value = normalizeEditorText(data.content || '');
      workspace.setSelectedMemoryFilePath(targetPath);
      return true;
    } catch (error) {
      feedback.pushToast({
        tone: 'error',
        message: error instanceof Error ? error.message : String(error),
      });
      return false;
    } finally {
      editorLoading.value = false;
    }
  }

  async function ensureAllViewReady() {
    const targetPath =
      workspace.currentPath || getParentDirectory(workspace.selectedFilePath) || undefined;
    await loadDirectory(targetPath, true);
    if (workspace.selectedFilePath) {
      await openRegularFile(workspace.selectedFilePath, false);
    }
  }

  async function ensureMemoryViewReady() {
    await loadMemoryCatalogData(true);
    if (workspace.selectedMemoryFilePath) {
      await openMemoryFile(workspace.selectedMemoryFilePath, false);
    }
  }

  async function revealPath(targetPath: string, mode: WorkspaceMode, confirm = true) {
    if (mode === 'memory') {
      if (workspace.mode === 'all' && confirm && !(await confirmEditorSwitch('file'))) return;
      workspace.setMode('memory');
      await loadMemoryCatalogData(true);
      if (targetPath) {
        await openMemoryFile(targetPath, false);
      }
      return;
    }

    if (workspace.mode === 'memory' && confirm && !(await confirmEditorSwitch('memory'))) return;
    workspace.setMode('all');
    await loadDirectory(
      getParentDirectory(targetPath) || workspace.currentPath || undefined,
      true,
    );
    if (targetPath) {
      await openRegularFile(targetPath, false);
    }
  }

  async function switchMode(nextMode: string) {
    const normalized = nextMode === 'memory' ? 'memory' : 'all';
    if (normalized === workspace.mode) return;

    const nextTarget =
      normalized === 'memory'
        ? workspace.selectedMemoryFilePath || currentMemoryFile.value?.path || ''
        : workspace.selectedFilePath || currentFile.value?.path || '';

    await revealPath(nextTarget, normalized, true);
    if (normalized === 'all' && !nextTarget) {
      workspace.setMode('all');
      await loadDirectory(workspace.currentPath || undefined, true);
    }
    if (normalized === 'memory' && !nextTarget) {
      workspace.setMode('memory');
      await loadMemoryCatalogData(true);
    }
  }

  async function openEntry(entry: ManagedFileEntry) {
    if (entry.isDirectory) {
      if (!(await confirmEditorSwitch('file'))) return;
      currentFile.value = null;
      currentFileDraft.value = '';
      currentFileOriginal.value = '';
      workspace.setSelectedFilePath('');
      await loadDirectory(entry.path);
      return;
    }

    await openRegularFile(entry.path, true);
  }

  async function openRoot(targetPath: string) {
    if (!(await confirmEditorSwitch('file'))) return;
    currentFile.value = null;
    currentFileDraft.value = '';
    currentFileOriginal.value = '';
    workspace.setSelectedFilePath('');
    await loadDirectory(targetPath);
  }

  async function goToParentDirectory() {
    if (!parentPath.value) return;
    if (!(await confirmEditorSwitch('file'))) return;
    currentFile.value = null;
    currentFileDraft.value = '';
    currentFileOriginal.value = '';
    workspace.setSelectedFilePath('');
    await loadDirectory(parentPath.value);
  }

  async function reloadCurrentDirectory() {
    await loadDirectory(currentPath.value || undefined, true);
  }

  async function reloadCurrentFile() {
    if (!currentFile.value?.path) return;
    await openRegularFile(currentFile.value.path, true);
  }

  async function reloadCurrentMemoryFile() {
    if (!currentMemoryFile.value?.path) return;
    await openMemoryFile(currentMemoryFile.value.path, true);
  }

  async function saveCurrent(kind: EditorKind) {
    const target = kind === 'file' ? currentFile.value : currentMemoryFile.value;
    const draftValue = kind === 'file' ? currentFileDraft.value : currentMemoryDraft.value;
    if (!target?.path) return;

    saving.value = true;
    try {
      const result = await saveManagedFileContent(target.path, draftValue);
      feedback.pushToast({
        tone: result.success ? 'success' : 'error',
        message: result.message,
      });
      if (result.success) {
        if (kind === 'file') {
          currentFileOriginal.value = normalizeEditorText(draftValue);
          if (currentFile.value) currentFile.value.content = draftValue;
          await loadDirectory(currentPath.value || undefined, true);
        } else {
          currentMemoryOriginal.value = normalizeEditorText(draftValue);
          if (currentMemoryFile.value) currentMemoryFile.value.content = draftValue;
          await loadMemoryCatalogData(true);
        }
      }
    } catch (error) {
      feedback.pushToast({
        tone: 'error',
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      saving.value = false;
    }
  }

  async function createEntry() {
    const parent = currentPath.value;
    if (!parent) return;
    const trimmed = createName.value.trim();
    if (!trimmed) {
      feedback.pushToast({
        tone: 'warning',
        message: ui.label('请输入要创建的文件名或目录名。', 'Enter the file or directory name first.'),
      });
      return;
    }

    creating.value = true;
    try {
      const result = await createManagedItem(parent, trimmed, createKind.value);
      feedback.pushToast({
        tone: result.success ? 'success' : 'error',
        message: result.message,
      });
      if (result.success) {
        createName.value = '';
        await loadDirectory(parent, true);
        if (createKind.value === 'file' && result.path) {
          await openRegularFile(result.path, false);
        }
      }
    } catch (error) {
      feedback.pushToast({
        tone: 'error',
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      creating.value = false;
    }
  }

  function updateMemoryKind(kind: string) {
    workspace.setMemoryKindFilter(
      kind === 'docs' || kind === 'notes' ? kind : 'all',
    );
  }

  async function revealMemoryInAllFiles() {
    if (!currentMemoryFile.value?.path) return;
    await revealPath(currentMemoryFile.value.path, 'all', true);
  }

  async function bootstrap() {
    modeLoading.value = true;
    const pending = workspace.consumeReveal();
    if (pending?.path) {
      await revealPath(pending.path, pending.mode, false);
      modeLoading.value = false;
      return;
    }

    if (workspace.mode === 'memory') {
      await ensureMemoryViewReady();
    } else {
      await ensureAllViewReady();
    }
    modeLoading.value = false;
  }

  async function softRefreshCurrentView() {
    if (workspace.mode === 'memory') {
      await loadMemoryCatalogData(true);
      if (currentMemoryFile.value?.path && !memoryDirty.value) {
        await openMemoryFile(currentMemoryFile.value.path, false);
        return;
      }
      if (currentMemoryFile.value?.path && memoryDirty.value) {
        feedback.pushToast({
          tone: 'info',
          message: ui.label(
            '已刷新记忆目录，但为避免覆盖未保存改动，当前编辑器内容保持不变。',
            'The memory catalog was refreshed, but the current editor content was kept to avoid overwriting unsaved changes.',
          ),
          durationMs: 2600,
        });
      }
      return;
    }

    await loadDirectory(currentPath.value || undefined, true);
    if (currentFile.value?.path && !fileDirty.value) {
      await openRegularFile(currentFile.value.path, false);
      return;
    }
    if (currentFile.value?.path && fileDirty.value) {
      feedback.pushToast({
        tone: 'info',
        message: ui.label(
          '已刷新目录列表，但为避免覆盖未保存改动，当前编辑器内容保持不变。',
          'The directory list was refreshed, but the current editor content was kept to avoid overwriting unsaved changes.',
        ),
        durationMs: 2600,
      });
    }
  }

  function setCreateKind(value: 'file' | 'directory') {
    createKind.value = value;
  }

  function setCreateName(value: string) {
    createName.value = value;
  }

  function setCurrentFileDraft(value: string) {
    currentFileDraft.value = value;
  }

  function setCurrentMemoryDraft(value: string) {
    currentMemoryDraft.value = value;
  }

  function handleBeforeUnload(event: BeforeUnloadEvent) {
    if (!hasAnyDirtyEditor.value) return;
    event.preventDefault();
    event.returnValue = '';
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }
    void bootstrap();
  });

  onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  });

  onBeforeRouteLeave(async () => confirmLeaveFilesPage());

  return {
    workspace,
    fileTabs,
    modeLoading,
    directoryLoading,
    memoryCatalogLoading,
    editorLoading,
    currentError,
    filesResponse,
    roots,
    entries,
    currentPath,
    parentPath,
    selectedRoot,
    directoryCount,
    regularFileCount,
    memoryFiles,
    filteredMemoryFiles,
    memoryGroups,
    fileDirty,
    memoryDirty,
    currentFile,
    currentFileDraft,
    currentMemoryFile,
    currentMemoryDraft,
    saving,
    creating,
    createKind,
    createName,
    switchMode,
    openEntry,
    openRoot,
    goToParentDirectory,
    reloadCurrentDirectory,
    reloadCurrentFile,
    reloadCurrentMemoryFile,
    saveCurrent,
    setCreateKind,
    setCreateName,
    createEntry,
    updateMemoryKind,
    openMemoryFile,
    revealMemoryInAllFiles,
    softRefreshCurrentView,
    setCurrentFileDraft,
    setCurrentMemoryDraft,
    getMemoryFilterLabel: (kind: MemoryKindFilter) => getMemoryFilterLabel(ui, kind),
    getMemoryFileKind,
    renderMemoryLabel,
  };
}
