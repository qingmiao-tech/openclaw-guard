<script setup lang="ts">
import PageCard from '@/features/common/PageCard.vue';
import { useUiStore } from '@/stores/ui';
import type { ChannelDefinition, ChannelInfo } from '@/services/api/channels';
import type {
  CatalogChannelItem,
  ChannelDraftPreview,
  FieldDescriptor,
} from '../useChannelsPageState';

defineProps<{
  catalogItems: CatalogChannelItem[];
  selectedId: string;
  selectedDefinition: ChannelDefinition | null;
  selectedChannel: ChannelInfo | null;
  fieldDescriptors: FieldDescriptor[];
  textDraft: Record<string, string>;
  boolDraft: Record<string, boolean>;
  saving: boolean;
  clearing: boolean;
  statusMessage: string;
  draftPreview: ChannelDraftPreview;
}>();

const emit = defineEmits<{
  'update:selectedId': [value: string];
  save: [];
  reset: [];
  clear: [];
}>();

const ui = useUiStore();
</script>

<template>
  <div class="page-two-column">
    <PageCard :title="ui.label('渠道目录', 'Channel catalog')" eyebrow="Catalog">
      <div class="catalog-list">
        <button
          v-for="item in catalogItems"
          :key="item.definition.id"
          class="catalog-list__item"
          :class="{ 'catalog-list__item--active': selectedId === item.definition.id }"
          type="button"
          @click="emit('update:selectedId', item.definition.id)"
        >
          <div class="catalog-list__title">
            <strong>{{ `${item.definition.icon} ${item.definition.name}` }}</strong>
          </div>
          <div class="pill-row">
            <span class="pill" :class="item.enabled ? 'pill--success' : 'pill--warning'">
              {{ item.enabled ? ui.label('已启用', 'Enabled') : ui.label('停用', 'Disabled') }}
            </span>
            <span class="pill" :class="item.configured ? 'pill--success' : 'pill--muted'">
              {{ item.configured ? ui.label('已配置', 'Configured') : ui.label('未配置', 'Empty') }}
            </span>
          </div>
        </button>
      </div>
    </PageCard>

    <div class="page-stack" v-if="selectedChannel">
      <PageCard :title="selectedChannel.name" eyebrow="Editor">
        <div class="page-inline-status">
          <span class="pill" :class="selectedChannel.enabled ? 'pill--success' : 'pill--warning'">
            {{ selectedChannel.enabled ? ui.label('正在接收消息', 'Receiving traffic') : ui.label('当前停用', 'Currently disabled') }}
          </span>
          <span class="pill" :class="selectedChannel.configured ? 'pill--success' : 'pill--muted'">
            {{ selectedChannel.configured ? ui.label('配置已完成', 'Configured') : ui.label('还未配置', 'Not configured') }}
          </span>
        </div>
        <p class="muted-copy">{{ statusMessage }}</p>

        <div class="settings-grid">
          <template v-for="field in fieldDescriptors" :key="field.key">
            <label class="settings-field">
              <span>{{ field.label }}</span>
              <small v-if="field.help">{{ field.help }}</small>

              <input
                v-if="field.kind === 'text' && field.inputType !== 'select'"
                v-model="textDraft[field.key]"
                class="settings-input"
                :type="field.inputType || 'text'"
              />

              <select
                v-else-if="field.kind === 'text' && field.inputType === 'select'"
                v-model="textDraft[field.key]"
                class="settings-input"
              >
                <option v-for="option in field.options" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>

              <label v-else class="checkbox-row">
                <input v-model="boolDraft[field.key]" type="checkbox" />
                <span>{{ field.help || ui.label('勾选即启用。', 'Checked means enabled.') }}</span>
              </label>
            </label>
          </template>
        </div>

        <div class="page-actions">
          <button class="inline-link inline-link--primary" type="button" :disabled="saving" @click="emit('save')">
            {{ saving ? ui.label('保存中…', 'Saving…') : ui.label('保存渠道配置', 'Save channel configuration') }}
          </button>
          <button class="inline-link" type="button" @click="emit('reset')">
            {{ ui.label('恢复当前值', 'Reset draft') }}
          </button>
          <button class="inline-link inline-link--danger" type="button" :disabled="clearing" @click="emit('clear')">
            {{ clearing ? ui.label('清空中…', 'Clearing…') : ui.label('清空配置', 'Clear configuration') }}
          </button>
        </div>
      </PageCard>

      <PageCard :title="ui.label('配置摘要', 'Configuration summary')" eyebrow="Summary">
        <div class="list-stack" v-if="selectedDefinition">
          <article class="action-row">
            <div>
              <h3>{{ ui.label('普通字段', 'Regular fields') }}</h3>
              <p>{{ ui.label('优先看这里就能知道这个渠道是否已经具备基本接入条件。', 'Start here to see whether the channel has the basic information required to connect.') }}</p>
            </div>
            <strong>{{ selectedDefinition.fields.length }}</strong>
          </article>
          <article class="action-row">
            <div>
              <h3>{{ ui.label('本机变量', 'Local secrets') }}</h3>
              <p>{{ ui.label('敏感值优先以本机变量方式保存，便于后续替换或清空。', 'Sensitive values are best stored as local variables so they can be rotated or cleared later.') }}</p>
            </div>
            <strong>{{ selectedDefinition.envFields.length }}</strong>
          </article>
          <article class="action-row">
            <div>
              <h3>{{ ui.label('当前草稿', 'Current draft') }}</h3>
              <p>{{ ui.label('这里只显示你现在编辑中的内容，不会自动写入运行态。', 'This only shows the values you are editing now. Nothing reaches runtime until you save.') }}</p>
            </div>
            <strong>{{ selectedChannel.id }}</strong>
          </article>
        </div>

        <pre v-if="ui.developerMode" class="code-panel">{{ JSON.stringify(draftPreview, null, 2) }}</pre>
        <p v-else class="muted-copy">
          {{ ui.label('当前草稿的原始配置预览已收纳到开发者模式里。需要排查字段写入结果时，请先到 Settings 打开开发者模式。', 'The raw draft preview now stays behind developer mode. Enable it from Settings when you need to inspect the exact payload.') }}
        </p>
      </PageCard>
    </div>
  </div>
</template>
