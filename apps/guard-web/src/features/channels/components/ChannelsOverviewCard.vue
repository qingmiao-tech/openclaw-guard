<script setup lang="ts">
import PageCard from '@/features/common/PageCard.vue';
import { useUiStore } from '@/stores/ui';
import type { FeishuPluginStatus } from '@/services/api/channels';

defineProps<{
  definitionsCount: number;
  enabledCount: number;
  configuredCount: number;
  feishuPlugin: FeishuPluginStatus;
}>();

const ui = useUiStore();
</script>

<template>
  <PageCard :title="ui.label('当前概览', 'Current overview')" eyebrow="Summary">
    <div class="stat-grid">
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('可管理渠道', 'Channels') }}</p>
        <strong>{{ definitionsCount }}</strong>
        <span>{{ ui.label('当前内置和官方入口总数', 'Built-in and official entry points available now') }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('已启用', 'Enabled') }}</p>
        <strong>{{ enabledCount }}</strong>
        <span>{{ ui.label('运行态会接收消息', 'Receives traffic at runtime') }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('已配置', 'Configured') }}</p>
        <strong>{{ configuredCount }}</strong>
        <span>{{ ui.label('已经填写了字段或本机变量', 'Fields or local values already exist') }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('飞书插件', 'Feishu plugin') }}</p>
        <strong>{{ feishuPlugin.installed ? ui.label('已识别', 'Detected') : ui.label('未识别', 'Not detected') }}</strong>
        <span>{{ feishuPlugin.version || ui.label('官方渠道仍可直接维护', 'Official channel still remains manageable') }}</span>
      </article>
    </div>
  </PageCard>
</template>
