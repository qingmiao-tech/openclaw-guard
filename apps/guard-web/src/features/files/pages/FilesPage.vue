<script setup lang="ts">
import PageTabs from '@/features/common/PageTabs.vue';
import FileEditorSection from '@/features/files/components/FileEditorSection.vue';
import FilesOverviewSection from '@/features/files/components/FilesOverviewSection.vue';
import MemoryCatalogSection from '@/features/files/components/MemoryCatalogSection.vue';
import MemoryEditorSection from '@/features/files/components/MemoryEditorSection.vue';
import WorkspaceBrowserSection from '@/features/files/components/WorkspaceBrowserSection.vue';
import { getMemoryFileKind } from '@/features/files/files-helpers';
import { useFilesPageState } from '@/features/files/useFilesPageState';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
const {
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
  getMemoryFilterLabel,
  renderMemoryLabel,
} = useFilesPageState();
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('文件 / 资产', 'Files / Assets') }}</p>
        <h2 class="page-header__title">{{ ui.label('文件与记忆', 'Files and memory') }}</h2>
        <p class="page-header__description">
          {{
            ui.label(
              '保留“全部文件”和“核心记忆”双视图，让搜索、角色工作区和实际编辑动作都能在新壳层里接得上。',
              'Keep both the All Files and Core Memory views so search results, role workspaces, and real editing actions can all land cleanly in the new shell.',
            )
          }}
        </p>
      </div>
      <button
        data-testid="files-soft-refresh"
        class="page-header__action"
        type="button"
        @click="softRefreshCurrentView"
      >
        {{
          modeLoading || directoryLoading || memoryCatalogLoading
            ? ui.label('刷新中…', 'Refreshing…')
            : ui.label('Refresh', 'Refresh')
        }}
      </button>
    </header>

    <PageTabs :items="fileTabs" :active-id="workspace.mode" @change="switchMode" />

    <div v-if="modeLoading" class="page-empty">
      {{ ui.label('正在恢复文件视图…', 'Restoring the workspace view…') }}
    </div>
    <div
      v-else-if="
        currentError &&
        ((workspace.mode === 'all' && !filesResponse) || (workspace.mode === 'memory' && !memoryFiles.length))
      "
      class="page-empty page-empty--error"
    >
      {{ currentError }}
    </div>
    <template v-else>
      <FilesOverviewSection
        :mode="workspace.mode"
        :roots-count="roots.length"
        :selected-root-label="selectedRoot?.label || ''"
        :entries-count="entries.length"
        :directory-count="directoryCount"
        :regular-file-count="regularFileCount"
        :current-file-label="currentFile?.relativePath || ''"
        :current-path="currentPath"
        :selected-root-type="selectedRoot?.type || null"
        :memory-files-count="memoryFiles.length"
        :memory-docs-count="memoryFiles.filter((file) => getMemoryFileKind(file) === 'docs').length"
        :memory-notes-count="memoryFiles.filter((file) => getMemoryFileKind(file) === 'notes').length"
        :memory-groups-count="memoryGroups.length"
        :filtered-memory-files-count="filteredMemoryFiles.length"
        :memory-filter-label="getMemoryFilterLabel(workspace.memoryKindFilter)"
        :memory-filter-query="workspace.memoryFilterQuery"
        :current-memory-label="currentMemoryFile?.relativePath || ''"
      />

      <div v-if="workspace.mode === 'all'" class="page-two-column">
        <WorkspaceBrowserSection
          :roots="roots"
          :current-path="currentPath"
          :parent-path="parentPath"
          :current-file-path="currentFile?.path || ''"
          :entries="entries"
          :create-kind="createKind"
          :create-name="createName"
          :directory-loading="directoryLoading"
          :creating="creating"
          @open-root="openRoot"
          @open-entry="openEntry"
          @go-up="goToParentDirectory"
          @reload="reloadCurrentDirectory"
          @update:create-kind="setCreateKind"
          @update:create-name="setCreateName"
          @create="createEntry"
        />

        <FileEditorSection
          :editor-loading="editorLoading"
          :current-file="currentFile"
          :draft="currentFileDraft"
          :file-dirty="fileDirty"
          :saving="saving"
          @reload="reloadCurrentFile"
          @save="saveCurrent('file')"
          @update:draft="setCurrentFileDraft"
        />
      </div>

      <div v-else class="page-two-column">
        <MemoryCatalogSection
          :groups="memoryGroups"
          :filtered-count="filteredMemoryFiles.length"
          :total-count="memoryFiles.length"
          :current-memory-path="currentMemoryFile?.path || ''"
          :loading="memoryCatalogLoading"
          :get-memory-filter-label="getMemoryFilterLabel"
          :get-memory-file-kind="getMemoryFileKind"
          :render-memory-label="renderMemoryLabel"
          @update-kind="updateMemoryKind"
          @open-memory-file="openMemoryFile"
        />

        <MemoryEditorSection
          :editor-loading="editorLoading"
          :current-memory-file="currentMemoryFile"
          :draft="currentMemoryDraft"
          :memory-dirty="memoryDirty"
          :saving="saving"
          @reload="reloadCurrentMemoryFile"
          @reveal="revealMemoryInAllFiles"
          @save="saveCurrent('memory')"
          @update:draft="setCurrentMemoryDraft"
        />
      </div>
    </template>
  </div>
</template>
