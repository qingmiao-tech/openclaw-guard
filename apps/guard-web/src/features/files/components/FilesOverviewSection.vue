<script setup lang="ts">
import { computed } from 'vue';
import PageCard from '@/features/common/PageCard.vue';
import { formatNumber } from '@/features/common/display';
import type { WorkspaceMode } from '@/stores/workspace';
import { useUiStore } from '@/stores/ui';

const props = defineProps<{
  mode: WorkspaceMode;
  rootsCount: number;
  selectedRootLabel: string;
  entriesCount: number;
  directoryCount: number;
  regularFileCount: number;
  currentFileLabel: string;
  currentPath: string;
  selectedRootType: string | null;
  memoryFilesCount: number;
  memoryDocsCount: number;
  memoryNotesCount: number;
  memoryGroupsCount: number;
  filteredMemoryFilesCount: number;
  memoryFilterLabel: string;
  memoryFilterQuery: string;
  currentMemoryLabel: string;
}>();

const ui = useUiStore();
const showingAll = computed(() => props.mode === 'all');
</script>

<template>
  <PageCard
    :title="
      showingAll
        ? ui.label('当前目录概览', 'Current directory overview')
        : ui.label('核心记忆概览', 'Core memory overview')
    "
    eyebrow="Summary"
  >
    <div v-if="showingAll" class="stat-grid">
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('受控根目录', 'Managed roots') }}</p>
        <strong>{{ formatNumber(rootsCount) }}</strong>
        <span>{{ selectedRootLabel || ui.label('当前正在受控范围内浏览', 'Browsing inside the managed scope now') }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('当前目录内容', 'Current entries') }}</p>
        <strong>{{ formatNumber(entriesCount) }}</strong>
        <span>{{ `${formatNumber(directoryCount)} ${ui.label('个目录', 'dirs')} / ${formatNumber(regularFileCount)} ${ui.label('个文件', 'files')}` }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('当前打开文件', 'Open file') }}</p>
        <strong>{{ currentFileLabel ? '1' : '0' }}</strong>
        <span>{{ currentFileLabel || ui.label('还没有打开文件', 'No file opened yet') }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('当前路径', 'Current path') }}</p>
        <strong>{{ selectedRootType === 'detected-workspace' ? ui.label('自动发现', 'Auto-detected') : ui.label('受控目录', 'Managed') }}</strong>
        <span>{{ currentPath || ui.label('等待路径返回', 'Waiting for a resolved path') }}</span>
      </article>
    </div>

    <div v-else class="stat-grid">
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('记忆文件数', 'Memory files') }}</p>
        <strong>{{ formatNumber(memoryFilesCount) }}</strong>
        <span>{{ `${formatNumber(memoryDocsCount)} ${ui.label('个核心文档', 'core docs')} / ${formatNumber(memoryNotesCount)} ${ui.label('个记忆片段', 'memory notes')}` }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('覆盖角色', 'Covered roles') }}</p>
        <strong>{{ formatNumber(memoryGroupsCount) }}</strong>
        <span>{{ ui.label('包含可管理记忆文件的角色或工作区', 'Roles or workspaces that already have managed memory files') }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('当前显示', 'Visible now') }}</p>
        <strong>{{ formatNumber(filteredMemoryFilesCount) }}</strong>
        <span>{{ `${memoryFilterLabel} / ${memoryFilterQuery || ui.label('未设置搜索词', 'No search query')}` }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('当前打开', 'Current file') }}</p>
        <strong>{{ currentMemoryLabel ? '1' : '0' }}</strong>
        <span>{{ currentMemoryLabel || ui.label('还没有打开记忆文件', 'No memory file opened yet') }}</span>
      </article>
    </div>
  </PageCard>
</template>
