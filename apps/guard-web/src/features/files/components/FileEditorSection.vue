<script setup lang="ts">
import PageCard from '@/features/common/PageCard.vue';
import type { ManagedFileContent } from '@/services/api/files';
import { useUiStore } from '@/stores/ui';

const props = defineProps<{
  editorLoading: boolean;
  currentFile: ManagedFileContent | null;
  draft: string;
  fileDirty: boolean;
  saving: boolean;
}>();

const emit = defineEmits<{
  (event: 'reload'): void;
  (event: 'save'): void;
  (event: 'update:draft', value: string): void;
}>();

const ui = useUiStore();

function updateDraft(event: Event) {
  emit('update:draft', (event.target as HTMLTextAreaElement).value);
}
</script>

<template>
  <PageCard :title="ui.label('文件编辑器', 'File editor')" eyebrow="Editor">
    <template v-if="editorLoading">
      <div class="page-empty">
        {{ ui.label('正在读取文件内容…', 'Loading file content…') }}
      </div>
    </template>
    <template v-else-if="currentFile">
      <div class="mini-list">
        <div class="mini-list__item mini-list__item--stack">
          <div class="provider-card__header">
            <strong>{{ currentFile.relativePath || currentFile.path }}</strong>
            <span data-testid="file-editor-state" class="pill" :class="fileDirty ? 'pill--warning' : 'pill--success'">
              {{ fileDirty ? ui.label('未保存', 'Unsaved') : ui.label('已保存', 'Saved') }}
            </span>
          </div>
          <p>{{ currentFile.path }}</p>
          <p v-if="currentFile.truncated">{{ ui.label('文件内容过长，当前只预览了前一部分。', 'This file is large, so only the first portion is loaded for preview and editing.') }}</p>
        </div>
      </div>

      <div class="page-actions">
        <button class="inline-link" type="button" @click="$emit('reload')">
          {{ ui.label('重新读取', 'Reload') }}
        </button>
        <button class="inline-link inline-link--primary" type="button" :disabled="saving" @click="$emit('save')">
          {{ saving ? ui.label('保存中…', 'Saving…') : ui.label('保存文件', 'Save file') }}
        </button>
      </div>

      <textarea
        :value="draft"
        data-testid="file-editor-textarea"
        class="settings-textarea settings-textarea--editor"
        rows="22"
        @input="updateDraft"
      />
    </template>
    <div v-else class="page-empty">
      {{ ui.label('先从左侧选择一个文件，再在这里查看或编辑。', 'Select a file from the left side first, then view or edit it here.') }}
    </div>
  </PageCard>
</template>
