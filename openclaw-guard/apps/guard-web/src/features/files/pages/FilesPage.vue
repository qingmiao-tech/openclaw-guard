<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import PageCard from '@/features/common/PageCard.vue';
import PageTabs from '@/features/common/PageTabs.vue';
import {
  formatBytes,
  formatDateTime,
  formatNumber,
} from '@/features/common/display';
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

type EditorKind = 'file' | 'memory';

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

const currentError = computed(() => workspace.mode === 'memory' ? memoryError.value : directoryError.value);
const roots = computed(() => filesResponse.value?.roots || []);
const entries = computed(() => filesResponse.value?.entries || []);
const currentPath = computed(() => filesResponse.value?.currentPath || workspace.currentPath);
const parentPath = computed(() => filesResponse.value?.parentPath || null);
const selectedRoot = computed(() => {
  return roots.value
    .filter((root) => currentPath.value === root.path || currentPath.value.startsWith(`${root.path}\\`) || currentPath.value.startsWith(`${root.path}/`))
    .sort((left, right) => right.path.length - left.path.length)[0] || null;
});
const directoryCount = computed(() => entries.value.filter((entry) => entry.isDirectory).length);
const regularFileCount = computed(() => entries.value.length - directoryCount.value);
const memoryFiles = computed(() => memoryCatalog.value);
const filteredMemoryFiles = computed(() => {
  const query = workspace.memoryFilterQuery.trim().toLowerCase();
  return memoryFiles.value
    .filter((file) => {
      if (workspace.memoryKindFilter !== 'all' && getMemoryFileKind(file) !== workspace.memoryKindFilter) {
        return false;
      }
      if (!query) return true;
      return [
        file.agentId,
        file.type,
        file.relativePath,
        file.path,
      ].join(' ').toLowerCase().includes(query);
    })
    .sort((left, right) => {
      const agentCompare = String(left.agentId || '').localeCompare(String(right.agentId || ''));
      if (agentCompare !== 0) return agentCompare;
      const kindCompare = getMemoryFileKind(left).localeCompare(getMemoryFileKind(right));
      if (kindCompare !== 0) return kindCompare;
      return renderMemoryLabel(left).localeCompare(renderMemoryLabel(right));
    });
});
const memoryGroups = computed(() => {
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
      label: getMemoryAgentLabel(agentId),
      files,
      docsCount: files.filter((item) => getMemoryFileKind(item) === 'docs').length,
      notesCount: files.filter((item) => getMemoryFileKind(item) === 'notes').length,
    }))
    .sort((left, right) => left.label.localeCompare(right.label));
});

function normalizeEditorText(value: string) {
  return value.replace(/\r\n/g, '\n');
}

function getMemoryFileKind(file: MemoryFileRecord) {
  return file.type === 'memory' ? 'notes' : 'docs';
}

function getMemoryFilterLabel(kind: MemoryKindFilter) {
  if (kind === 'docs') return ui.label('核心文档', 'Core docs');
  if (kind === 'notes') return ui.label('记忆片段', 'Memory notes');
  return ui.label('全部', 'All');
}

function getMemoryAgentLabel(agentId: string) {
  if (!agentId) return ui.label('未分组', 'Ungrouped');
  if (!agentId.startsWith('detected:')) return agentId;
  const suffix = agentId.slice('detected:'.length) || 'workspace';
  return ui.label(`自动发现：${suffix}`, `Auto-detected: ${suffix}`);
}

function renderMemoryLabel(file: MemoryFileRecord) {
  if (file.type === 'memory') {
    const parts = file.relativePath.split(/[\\/]/);
    return parts[parts.length - 1] || file.relativePath;
  }
  return file.type;
}

function hasDirtyEditor(kind: EditorKind) {
  if (kind === 'file') {
    return currentFile.value !== null && normalizeEditorText(currentFileDraft.value) !== currentFileOriginal.value;
  }
  return currentMemoryFile.value !== null && normalizeEditorText(currentMemoryDraft.value) !== currentMemoryOriginal.value;
}

async function confirmEditorSwitch(kind: EditorKind) {
  if (!hasDirtyEditor(kind)) return true;
  const isMemory = kind === 'memory';
  return feedback.confirm({
    title: ui.label(isMemory ? '切换记忆文件' : '切换文件', isMemory ? 'Switch memory file' : 'Switch file'),
    message: ui.label(
      isMemory ? '当前记忆编辑器里有未保存修改，继续切换会丢失这些内容。' : '当前文件编辑器里有未保存修改，继续切换会丢失这些内容。',
      isMemory ? 'There are unsaved changes in the memory editor. Switching now discards them.' : 'There are unsaved changes in the file editor. Switching now discards them.',
    ),
    confirmLabel: ui.label('放弃并继续', 'Discard and continue'),
    cancelLabel: ui.label('取消', 'Cancel'),
    tone: 'danger',
  });
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
  const targetPath = workspace.currentPath || getParentDirectory(workspace.selectedFilePath) || undefined;
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
  await loadDirectory(getParentDirectory(targetPath) || workspace.currentPath || undefined, true);
  if (targetPath) {
    await openRegularFile(targetPath, false);
  }
}

async function switchMode(nextMode: string) {
  const normalized = nextMode === 'memory' ? 'memory' : 'all';
  if (normalized === workspace.mode) return;

  const nextTarget = normalized === 'memory'
    ? (workspace.selectedMemoryFilePath || currentMemoryFile.value?.path || '')
    : (workspace.selectedFilePath || currentFile.value?.path || '');
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
  const draft = kind === 'file' ? currentFileDraft.value : currentMemoryDraft.value;
  if (!target?.path) return;

  saving.value = true;
  try {
    const result = await saveManagedFileContent(target.path, draft);
    feedback.pushToast({
      tone: result.success ? 'success' : 'error',
      message: result.message,
    });
    if (result.success) {
      if (kind === 'file') {
        currentFileOriginal.value = normalizeEditorText(draft);
        if (currentFile.value) currentFile.value.content = draft;
        await loadDirectory(currentPath.value || undefined, true);
      } else {
        currentMemoryOriginal.value = normalizeEditorText(draft);
        if (currentMemoryFile.value) currentMemoryFile.value.content = draft;
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
  workspace.setMemoryKindFilter(kind === 'docs' || kind === 'notes' ? kind : 'all');
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

onMounted(() => {
  void bootstrap();
});
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('文件 / Third slice', 'Files / Third slice') }}</p>
        <h2 class="page-header__title">{{ ui.label('文件与记忆', 'Files and memory') }}</h2>
        <p class="page-header__description">
          {{ ui.label('保留“全部文件”和“核心记忆”双视图，让搜索、角色工作区和实际编辑动作都能在新壳层里接得上。', 'Keep both the All Files and Core Memory views so search results, role workspaces, and real editing actions can all land cleanly in the new shell.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="bootstrap">
        {{ modeLoading || directoryLoading || memoryCatalogLoading ? ui.label('刷新中…', 'Refreshing…') : ui.label('Refresh', 'Refresh') }}
      </button>
    </header>

    <PageTabs :items="fileTabs" :active-id="workspace.mode" @change="switchMode" />

    <div v-if="modeLoading" class="page-empty">
      {{ ui.label('正在恢复文件视图…', 'Restoring the workspace view…') }}
    </div>
    <div v-else-if="currentError && ((workspace.mode === 'all' && !filesResponse) || (workspace.mode === 'memory' && !memoryCatalog.length))" class="page-empty page-empty--error">
      {{ currentError }}
    </div>
    <template v-else-if="workspace.mode === 'all'">
      <PageCard :title="ui.label('当前目录概览', 'Current directory overview')" eyebrow="Summary">
        <div class="stat-grid">
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('受控根目录', 'Managed roots') }}</p>
            <strong>{{ formatNumber(roots.length) }}</strong>
            <span>{{ selectedRoot?.label || ui.label('当前正在受控范围内浏览', 'Browsing inside the managed scope now') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('当前目录内容', 'Current entries') }}</p>
            <strong>{{ formatNumber(entries.length) }}</strong>
            <span>{{ `${formatNumber(directoryCount)} ${ui.label('个目录', 'dirs')} / ${formatNumber(regularFileCount)} ${ui.label('个文件', 'files')}` }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('当前打开文件', 'Open file') }}</p>
            <strong>{{ currentFile ? '1' : '0' }}</strong>
            <span>{{ currentFile?.relativePath || ui.label('还没有打开文件', 'No file opened yet') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('当前路径', 'Current path') }}</p>
            <strong>{{ selectedRoot?.type === 'detected-workspace' ? ui.label('自动发现', 'Auto-detected') : ui.label('受控目录', 'Managed') }}</strong>
            <span>{{ currentPath || ui.label('等待路径返回', 'Waiting for a resolved path') }}</span>
          </article>
        </div>
      </PageCard>

      <div class="page-two-column">
        <PageCard :title="ui.label('工作区浏览器', 'Workspace browser')" eyebrow="Browser">
          <div class="list-stack">
            <div class="catalog-list">
              <button
                v-for="root in roots"
                :key="root.id"
                class="catalog-list__item"
                :class="{ 'catalog-list__item--active': currentPath === root.path || currentPath.startsWith(`${root.path}\\`) || currentPath.startsWith(`${root.path}/`) }"
                type="button"
                @click="openRoot(root.path)"
              >
                <div class="catalog-list__title">
                  <strong>{{ root.label }}</strong>
                </div>
                <div class="pill-row">
                  <span class="pill pill--info">{{ root.type }}</span>
                </div>
              </button>
            </div>

            <div class="mini-list">
              <div class="mini-list__item mini-list__item--stack">
                <strong>{{ ui.label('当前路径', 'Current path') }}</strong>
                <p>{{ currentPath || '-' }}</p>
              </div>
            </div>

            <div class="page-actions">
              <button class="inline-link" type="button" :disabled="!parentPath" @click="goToParentDirectory">
                {{ ui.label('返回上一级', 'Go up') }}
              </button>
              <button class="inline-link" type="button" @click="reloadCurrentDirectory">
                {{ directoryLoading ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新目录', 'Reload list') }}
              </button>
            </div>

            <div class="create-row">
              <select v-model="createKind" class="settings-input create-row__kind">
                <option value="file">{{ ui.label('文件', 'File') }}</option>
                <option value="directory">{{ ui.label('目录', 'Directory') }}</option>
              </select>
              <input
                v-model="createName"
                class="settings-input"
                type="text"
                :placeholder="ui.label('例如：README-local.md 或 drafts', 'Example: README-local.md or drafts')"
                @keydown.enter.prevent="createEntry"
              />
              <button class="inline-link inline-link--primary" type="button" :disabled="creating" @click="createEntry">
                {{ creating ? ui.label('创建中…', 'Creating…') : ui.label('创建', 'Create') }}
              </button>
            </div>

            <div v-if="entries.length" class="directory-list">
              <button
                v-for="entry in entries"
                :key="entry.path"
                class="entry-button"
                :class="{ 'entry-button--active': currentFile?.path === entry.path }"
                type="button"
                @click="openEntry(entry)"
              >
                <div class="entry-button__title">
                  <strong>{{ entry.isDirectory ? `${ui.label('[目录]', '[DIR]')} ${entry.name}` : entry.name }}</strong>
                </div>
                <p>{{ entry.relativePath || entry.path }}</p>
                <div class="pill-row">
                  <span class="pill" :class="entry.isDirectory ? 'pill--info' : 'pill--muted'">
                    {{ entry.isDirectory ? ui.label('目录', 'Directory') : formatBytes(entry.size) }}
                  </span>
                  <span class="pill pill--muted">{{ formatDateTime(entry.modifiedAt) }}</span>
                </div>
              </button>
            </div>
            <div v-else class="page-empty">
              {{ ui.label('当前目录下还没有可展示内容。', 'The current directory does not contain any visible entries yet.') }}
            </div>
          </div>
        </PageCard>

        <PageCard :title="ui.label('文件编辑器', 'File editor')" eyebrow="Editor">
          <template v-if="editorLoading">
            <div class="page-empty">
              {{ ui.label('正在读取文件内容…', 'Loading file content…') }}
            </div>
          </template>
          <template v-else-if="currentFile">
            <div class="mini-list">
              <div class="mini-list__item mini-list__item--stack">
                <strong>{{ currentFile.relativePath || currentFile.path }}</strong>
                <p>{{ currentFile.path }}</p>
                <p v-if="currentFile.truncated">{{ ui.label('文件内容过长，当前只预览了前一部分。', 'This file is large, so only the first portion is loaded for preview and editing.') }}</p>
              </div>
            </div>

            <div class="page-actions">
              <button class="inline-link" type="button" @click="reloadCurrentFile">
                {{ ui.label('重新读取', 'Reload') }}
              </button>
              <button class="inline-link inline-link--primary" type="button" :disabled="saving" @click="saveCurrent('file')">
                {{ saving ? ui.label('保存中…', 'Saving…') : ui.label('保存文件', 'Save file') }}
              </button>
            </div>

            <textarea v-model="currentFileDraft" class="settings-textarea settings-textarea--editor" rows="22" />
          </template>
          <div v-else class="page-empty">
            {{ ui.label('先从左侧选择一个文件，再在这里查看或编辑。', 'Select a file from the left side first, then view or edit it here.') }}
          </div>
        </PageCard>
      </div>
    </template>
    <template v-else>
      <PageCard :title="ui.label('核心记忆概览', 'Core memory overview')" eyebrow="Summary">
        <div class="stat-grid">
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('记忆文件数', 'Memory files') }}</p>
            <strong>{{ formatNumber(memoryFiles.length) }}</strong>
            <span>{{ `${formatNumber(memoryFiles.filter((file) => file.type !== 'memory').length)} ${ui.label('个核心文档', 'core docs')} / ${formatNumber(memoryFiles.filter((file) => file.type === 'memory').length)} ${ui.label('个记忆片段', 'memory notes')}` }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('覆盖角色', 'Covered roles') }}</p>
            <strong>{{ formatNumber(memoryGroups.length) }}</strong>
            <span>{{ ui.label('包含可管理记忆文件的角色或工作区', 'Roles or workspaces that already have managed memory files') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('当前显示', 'Visible now') }}</p>
            <strong>{{ formatNumber(filteredMemoryFiles.length) }}</strong>
            <span>{{ `${getMemoryFilterLabel(workspace.memoryKindFilter)} / ${workspace.memoryFilterQuery || ui.label('未设置搜索词', 'No search query')}` }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('当前打开', 'Current file') }}</p>
            <strong>{{ currentMemoryFile ? '1' : '0' }}</strong>
            <span>{{ currentMemoryFile?.relativePath || ui.label('还没有打开记忆文件', 'No memory file opened yet') }}</span>
          </article>
        </div>
      </PageCard>

      <div class="page-two-column">
        <PageCard :title="ui.label('记忆目录', 'Memory catalog')" eyebrow="Catalog">
          <div class="settings-field">
            <span>{{ ui.label('筛选', 'Filter') }}</span>
            <input
              :value="workspace.memoryFilterQuery"
              class="settings-input"
              type="text"
              :placeholder="ui.label('搜索 Agent / 文件名 / 路径', 'Filter by agent / file / path')"
              @input="workspace.setMemoryFilterQuery(($event.target as HTMLInputElement).value)"
            />
          </div>

          <div class="pill-row">
            <button
              v-for="kind in ['all', 'docs', 'notes']"
              :key="kind"
              class="pill-button"
              :class="{ 'pill-button--active': workspace.memoryKindFilter === kind }"
              type="button"
              @click="updateMemoryKind(kind)"
            >
              <span>{{ getMemoryFilterLabel(kind as MemoryKindFilter) }}</span>
            </button>
          </div>

          <p class="muted-copy">
            {{ ui.label(`当前显示 ${formatNumber(filteredMemoryFiles.length)} / ${formatNumber(memoryFiles.length)} 个记忆文件。`, `Showing ${formatNumber(filteredMemoryFiles.length)} of ${formatNumber(memoryFiles.length)} memory files.`) }}
          </p>

          <div v-if="memoryCatalogLoading" class="page-empty">
            {{ ui.label('正在读取记忆目录…', 'Loading the memory catalog…') }}
          </div>
          <div v-else-if="memoryGroups.length" class="provider-stack">
            <article v-for="group in memoryGroups" :key="group.agentId" class="provider-card">
              <header class="provider-card__header">
                <div>
                  <strong>{{ group.label }}</strong>
                  <p v-if="group.label !== group.agentId">{{ group.agentId }}</p>
                </div>
                <div class="pill-row">
                  <span class="pill pill--info">{{ formatNumber(group.files.length) }}</span>
                  <span class="pill pill--muted">{{ `${getMemoryFilterLabel('docs')} ${formatNumber(group.docsCount)}` }}</span>
                  <span class="pill pill--muted">{{ `${getMemoryFilterLabel('notes')} ${formatNumber(group.notesCount)}` }}</span>
                </div>
              </header>

              <div class="directory-list">
                <button
                  v-for="file in group.files"
                  :key="file.path"
                  class="entry-button"
                  :class="{ 'entry-button--active': currentMemoryFile?.path === file.path }"
                  type="button"
                  @click="openMemoryFile(file.path)"
                >
                  <div class="entry-button__title">
                    <strong>{{ renderMemoryLabel(file) }}</strong>
                  </div>
                  <p>{{ file.relativePath || file.path }}</p>
                  <div class="pill-row">
                    <span class="pill" :class="getMemoryFileKind(file) === 'docs' ? 'pill--info' : 'pill--success'">
                      {{ getMemoryFilterLabel(getMemoryFileKind(file)) }}
                    </span>
                    <span class="pill pill--muted">{{ formatDateTime(file.modifiedAt) }}</span>
                  </div>
                </button>
              </div>
            </article>
          </div>
          <div v-else class="page-empty">
            {{ ui.label('当前筛选条件下没有匹配的核心记忆文件。', 'No core memory files match the current filter.') }}
          </div>
        </PageCard>

        <PageCard :title="ui.label('记忆编辑器', 'Memory editor')" eyebrow="Editor">
          <template v-if="editorLoading">
            <div class="page-empty">
              {{ ui.label('正在读取记忆文件…', 'Loading the memory file…') }}
            </div>
          </template>
          <template v-else-if="currentMemoryFile">
            <div class="mini-list">
              <div class="mini-list__item mini-list__item--stack">
                <strong>{{ currentMemoryFile.relativePath || currentMemoryFile.path }}</strong>
                <p>{{ currentMemoryFile.path }}</p>
                <p>{{ ui.label('修改后记得保存，这些内容会直接影响对应角色的行为、人格和长期记忆。', 'Save after editing. These files directly affect role behavior, persona, and long-term memory.') }}</p>
              </div>
            </div>

            <div class="page-actions">
              <button class="inline-link" type="button" @click="reloadCurrentMemoryFile">
                {{ ui.label('重新读取', 'Reload') }}
              </button>
              <button class="inline-link" type="button" @click="revealMemoryInAllFiles">
                {{ ui.label('在全部文件中定位', 'Reveal in all files') }}
              </button>
              <button class="inline-link inline-link--primary" type="button" :disabled="saving" @click="saveCurrent('memory')">
                {{ saving ? ui.label('保存中…', 'Saving…') : ui.label('保存记忆文件', 'Save memory file') }}
              </button>
            </div>

            <textarea v-model="currentMemoryDraft" class="settings-textarea settings-textarea--editor" rows="22" />
          </template>
          <div v-else class="page-empty">
            {{ ui.label('先从左侧选择一个记忆文件，再在这里查看或编辑。', 'Select a memory file from the left side first, then view or edit it here.') }}
          </div>
        </PageCard>
      </div>
    </template>
  </div>
</template>
