<script setup lang="ts">
import PageCard from '@/features/common/PageCard.vue';
import { formatBytes, formatDateTime } from '@/features/common/display';
import type { ManagedFileEntry, ManagedRoot } from '@/services/api/files';
import { useUiStore } from '@/stores/ui';

const props = defineProps<{
  roots: ManagedRoot[];
  currentPath: string;
  parentPath: string | null;
  currentFilePath: string;
  entries: ManagedFileEntry[];
  createKind: 'file' | 'directory';
  createName: string;
  directoryLoading: boolean;
  creating: boolean;
}>();

const emit = defineEmits<{
  (event: 'open-root', path: string): void;
  (event: 'open-entry', entry: ManagedFileEntry): void;
  (event: 'go-up'): void;
  (event: 'reload'): void;
  (event: 'update:createKind', value: 'file' | 'directory'): void;
  (event: 'update:createName', value: string): void;
  (event: 'create'): void;
}>();

const ui = useUiStore();

function isRootActive(root: ManagedRoot) {
  return (
    props.currentPath === root.path ||
    props.currentPath.startsWith(`${root.path}\\`) ||
    props.currentPath.startsWith(`${root.path}/`)
  );
}

function updateCreateKind(event: Event) {
  emit('update:createKind', (event.target as HTMLSelectElement).value === 'directory' ? 'directory' : 'file');
}

function updateCreateName(event: Event) {
  emit('update:createName', (event.target as HTMLInputElement).value);
}
</script>

<template>
  <PageCard :title="ui.label('工作区浏览器', 'Workspace browser')" eyebrow="Browser">
    <div class="list-stack">
      <div class="catalog-list">
        <button
          v-for="root in roots"
          :key="root.id"
          class="catalog-list__item"
          :class="{ 'catalog-list__item--active': isRootActive(root) }"
          :data-root-id="root.id"
          type="button"
          @click="$emit('open-root', root.path)"
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
        <button class="inline-link" type="button" :disabled="!parentPath" @click="$emit('go-up')">
          {{ ui.label('返回上一级', 'Go up') }}
        </button>
        <button class="inline-link" type="button" @click="$emit('reload')">
          {{ directoryLoading ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新目录', 'Reload list') }}
        </button>
      </div>

      <div class="create-row">
        <select :value="createKind" class="settings-input create-row__kind" @change="updateCreateKind">
          <option value="file">{{ ui.label('文件', 'File') }}</option>
          <option value="directory">{{ ui.label('目录', 'Directory') }}</option>
        </select>
        <input
          :value="createName"
          class="settings-input"
          type="text"
          :placeholder="ui.label('例如：README-local.md 或 drafts', 'Example: README-local.md or drafts')"
          @input="updateCreateName"
          @keydown.enter.prevent="$emit('create')"
        />
        <button class="inline-link inline-link--primary" type="button" :disabled="creating" @click="$emit('create')">
          {{ creating ? ui.label('创建中…', 'Creating…') : ui.label('创建', 'Create') }}
        </button>
      </div>

      <div v-if="entries.length" class="directory-list">
        <button
          v-for="entry in entries"
          :key="entry.path"
          class="entry-button"
          :class="{ 'entry-button--active': currentFilePath === entry.path }"
          :data-entry-kind="entry.isDirectory ? 'directory' : 'file'"
          type="button"
          @click="$emit('open-entry', entry)"
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
</template>
