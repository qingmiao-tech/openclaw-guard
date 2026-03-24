<script setup lang="ts">
import PageCard from '@/features/common/PageCard.vue';
import type { ManagedFileContent } from '@/services/api/files';
import { useUiStore } from '@/stores/ui';

const props = defineProps<{
  editorLoading: boolean;
  currentMemoryFile: ManagedFileContent | null;
  draft: string;
  memoryDirty: boolean;
  saving: boolean;
}>();

const emit = defineEmits<{
  (event: 'reload'): void;
  (event: 'reveal'): void;
  (event: 'save'): void;
  (event: 'update:draft', value: string): void;
}>();

const ui = useUiStore();

function updateDraft(event: Event) {
  emit('update:draft', (event.target as HTMLTextAreaElement).value);
}
</script>

<template>
  <PageCard :title="ui.label('记忆编辑器', 'Memory editor')" eyebrow="Editor">
    <template v-if="editorLoading">
      <div class="page-empty">
        {{ ui.label('正在读取记忆文件…', 'Loading the memory file…') }}
      </div>
    </template>
    <template v-else-if="currentMemoryFile">
      <div class="mini-list">
        <div class="mini-list__item mini-list__item--stack">
          <div class="provider-card__header">
            <strong>{{ currentMemoryFile.relativePath || currentMemoryFile.path }}</strong>
            <span data-testid="memory-editor-state" class="pill" :class="memoryDirty ? 'pill--warning' : 'pill--success'">
              {{ memoryDirty ? ui.label('未保存', 'Unsaved') : ui.label('已保存', 'Saved') }}
            </span>
          </div>
          <p>{{ currentMemoryFile.path }}</p>
          <p>{{ ui.label('修改后记得保存，这些内容会直接影响对应角色的行为、人格和长期记忆。', 'Save after editing. These files directly affect role behavior, persona, and long-term memory.') }}</p>
        </div>
      </div>

      <div class="page-actions">
        <button class="inline-link" type="button" @click="$emit('reload')">
          {{ ui.label('重新读取', 'Reload') }}
        </button>
        <button class="inline-link" type="button" @click="$emit('reveal')">
          {{ ui.label('在全部文件中定位', 'Reveal in all files') }}
        </button>
        <button class="inline-link inline-link--primary" type="button" :disabled="saving" @click="$emit('save')">
          {{ saving ? ui.label('保存中…', 'Saving…') : ui.label('保存记忆文件', 'Save memory file') }}
        </button>
      </div>

      <textarea
        :value="draft"
        data-testid="memory-editor-textarea"
        class="settings-textarea settings-textarea--editor"
        rows="22"
        @input="updateDraft"
      />
    </template>
    <div v-else class="page-empty">
      {{ ui.label('先从左侧选择一个记忆文件，再在这里查看或编辑。', 'Select a memory file from the left side first, then view or edit it here.') }}
    </div>
  </PageCard>
</template>
