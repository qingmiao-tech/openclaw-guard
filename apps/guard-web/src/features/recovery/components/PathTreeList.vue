<script setup lang="ts">
import { computed } from 'vue';
import { formatNumber } from '@/features/common/display';
import type { PathTreeNode } from '@/features/recovery/path-tree';
import { useUiStore } from '@/stores/ui';

const props = withDefaults(defineProps<{
  nodes: PathTreeNode[];
  depth?: number;
  expandDepth?: number;
  emptyLabel?: string;
}>(), {
  depth: 0,
  expandDepth: 0,
  emptyLabel: '',
});

const ui = useUiStore();

const sortedNodes = computed(() => props.nodes);

function nodeMeta(node: PathTreeNode) {
  if (node.kind === 'folder') {
    return ui.label(`${formatNumber(node.leafCount)} 项路径`, `${formatNumber(node.leafCount)} paths`);
  }
  return ui.label('文件', 'File');
}
</script>

<template>
  <div v-if="!sortedNodes.length" class="muted-copy">
    {{ emptyLabel }}
  </div>
  <ul v-else class="path-tree">
    <li v-for="node in sortedNodes" :key="`${depth}-${node.path}`" class="path-tree__item">
      <details v-if="node.kind === 'folder'" class="path-tree__details" :open="depth < expandDepth">
        <summary class="path-tree__summary" :style="{ paddingLeft: `${depth * 18}px` }">
          <span class="path-tree__label">
            <span class="path-tree__icon">{{ depth < expandDepth ? '▾' : '▸' }}</span>
            <span>{{ node.name }}/</span>
          </span>
          <span class="path-tree__meta">{{ nodeMeta(node) }}</span>
        </summary>
        <PathTreeList
          :nodes="node.children"
          :depth="depth + 1"
          :expand-depth="expandDepth"
          :empty-label="emptyLabel"
        />
      </details>

      <div v-else class="path-tree__file" :style="{ paddingLeft: `${depth * 18 + 24}px` }">
        <span class="path-tree__label">
          <span class="path-tree__icon">•</span>
          <span>{{ node.name }}</span>
        </span>
        <span class="path-tree__meta">{{ nodeMeta(node) }}</span>
      </div>
    </li>
  </ul>
</template>
