<script setup lang="ts">
import PageCard from '@/features/common/PageCard.vue';
import { formatDateTime, formatNumber } from '@/features/common/display';
import type { MemoryGroup } from '@/features/files/files-helpers';
import { useWorkspaceStore, type MemoryKindFilter } from '@/stores/workspace';
import { useUiStore } from '@/stores/ui';

const props = defineProps<{
  groups: MemoryGroup[];
  filteredCount: number;
  totalCount: number;
  currentMemoryPath: string;
  loading: boolean;
  getMemoryFilterLabel: (kind: MemoryKindFilter) => string;
  getMemoryFileKind: (file: MemoryGroup['files'][number]) => 'docs' | 'notes';
  renderMemoryLabel: (file: MemoryGroup['files'][number]) => string;
}>();

const emit = defineEmits<{
  (event: 'update-kind', value: string): void;
  (event: 'open-memory-file', path: string): void;
}>();

const ui = useUiStore();
const workspace = useWorkspaceStore();

function updateFilterQuery(event: Event) {
  workspace.setMemoryFilterQuery((event.target as HTMLInputElement).value);
}
</script>

<template>
  <PageCard :title="ui.label('记忆目录', 'Memory catalog')" eyebrow="Catalog">
    <div class="settings-field">
      <span>{{ ui.label('筛选', 'Filter') }}</span>
      <input
        :value="workspace.memoryFilterQuery"
        class="settings-input"
        type="text"
        :placeholder="ui.label('搜索 Agent / 文件名 / 路径', 'Filter by agent / file / path')"
        @input="updateFilterQuery"
      />
    </div>

    <div class="pill-row">
      <button
        v-for="kind in ['all', 'docs', 'notes']"
        :key="kind"
        class="pill-button"
        :class="{ 'pill-button--active': workspace.memoryKindFilter === kind }"
        type="button"
        @click="emit('update-kind', kind)"
      >
        <span>{{ getMemoryFilterLabel(kind as MemoryKindFilter) }}</span>
      </button>
    </div>

    <p class="muted-copy">
      {{
        ui.label(
          `当前显示 ${formatNumber(filteredCount)} / ${formatNumber(totalCount)} 个记忆文件。`,
          `Showing ${formatNumber(filteredCount)} of ${formatNumber(totalCount)} memory files.`,
        )
      }}
    </p>

    <div v-if="loading" class="page-empty">
      {{ ui.label('正在读取记忆目录…', 'Loading the memory catalog…') }}
    </div>
    <div v-else-if="groups.length" class="provider-stack">
      <article v-for="group in groups" :key="group.agentId" class="provider-card">
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
            :class="{ 'entry-button--active': currentMemoryPath === file.path }"
            data-entry-kind="memory"
            type="button"
            @click="emit('open-memory-file', file.path)"
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
</template>
