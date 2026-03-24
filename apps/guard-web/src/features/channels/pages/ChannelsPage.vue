<script setup lang="ts">
import ChannelsOverviewCard from '@/features/channels/components/ChannelsOverviewCard.vue';
import ChannelsWorkspace from '@/features/channels/components/ChannelsWorkspace.vue';
import { useChannelsPageState } from '@/features/channels/useChannelsPageState';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
const {
  resource,
  selectedId,
  saving,
  clearing,
  textDraft,
  boolDraft,
  catalogItems,
  selectedDefinition,
  selectedChannel,
  enabledCount,
  configuredCount,
  fieldDescriptors,
  statusMessage,
  draftPreview,
  refresh,
  hydrateDraft,
  handleSave,
  handleClear,
} = useChannelsPageState();
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('渠道 / 接入', 'Channels / Connections') }}</p>
        <h2 class="page-header__title">{{ ui.label('渠道管理', 'Channel management') }}</h2>
        <p class="page-header__description">
          {{ ui.label('先把官方渠道和内置入口迁入模块化外壳，保持真实配置读写，后续再承接插件扩展。', 'Move official channels and built-in entry points into the modular shell with real read-write behavior, then extend from here later.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="refresh">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新', 'Refresh') }}
      </button>
    </header>

    <div v-if="resource.loading && !resource.data" class="page-empty">
      {{ ui.label('正在读取渠道配置…', 'Loading channel configuration…') }}
    </div>
    <div v-else-if="resource.error && !resource.data" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>
    <template v-else-if="resource.data && selectedChannel">
      <div v-if="resource.error" class="status-banner status-banner--warning">
        {{ ui.label('已保留上一版渠道快照，但后台刷新失败：', 'The last channel snapshot is still on screen, but the background refresh failed: ') }}{{ resource.error }}
      </div>

      <ChannelsOverviewCard
        :definitions-count="resource.data.definitions.length"
        :enabled-count="enabledCount"
        :configured-count="configuredCount"
        :feishu-plugin="resource.data.feishuPlugin"
      />

      <ChannelsWorkspace
        :catalog-items="catalogItems"
        :selected-id="selectedId"
        :selected-definition="selectedDefinition"
        :selected-channel="selectedChannel"
        :field-descriptors="fieldDescriptors"
        :text-draft="textDraft"
        :bool-draft="boolDraft"
        :saving="saving"
        :clearing="clearing"
        :status-message="statusMessage"
        :draft-preview="draftPreview"
        @update:selected-id="selectedId = $event"
        @save="handleSave"
        @reset="hydrateDraft"
        @clear="handleClear"
      />
    </template>
  </div>
</template>
