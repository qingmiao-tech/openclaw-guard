<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useAsyncResource } from '@/composables/useAsyncResource';
import {
  formatCost,
  formatDateTime,
  formatNumber,
  formatPercent,
} from '@/features/common/display';
import PageCard from '@/features/common/PageCard.vue';
import { loadSessionsSnapshot, type SessionRecord } from '@/services/api/sessions';
import { useUiStore } from '@/stores/ui';

type SessionsSnapshot = Awaited<ReturnType<typeof loadSessionsSnapshot>>;

let sessionsCache: SessionsSnapshot | null = null;

const ui = useUiStore();
const resource = useAsyncResource(() => loadSessionsSnapshot(), sessionsCache, { immediate: false });

const snapshot = computed(() => resource.data?.snapshot);
const sessions = computed(() => snapshot.value?.sessions || []);
const byAgent = computed(() => snapshot.value?.sessionsMeta?.byAgent || []);
const activeSessions = computed(() => sessions.value.filter((session) => !['ended', 'finished', 'closed'].includes(session.status)));
const usageEstimateAvailable = computed(() => {
  const summary = resource.data?.costSummary;
  if (!summary) return false;
  return Number.isFinite(summary.totalEstimatedCost)
    && ((summary.pricingUnit ? true : false) || summary.totalEstimatedCost > 0);
});

function usageEstimateLabel() {
  const summary = resource.data?.costSummary;
  if (!summary || !usageEstimateAvailable.value) {
    return ui.label('无法估算', 'Unavailable');
  }
  return formatCost(summary.totalEstimatedCost, summary.pricingUnit || 'USD');
}

function usageEstimateHint() {
  if (usageEstimateAvailable.value) {
    return ui.label('仅供本地观察，不代表官方账单', 'For local observation only, not an official bill');
  }
  return ui.label('缺少可靠单价或用量数据，当前不显示金额', 'Pricing or usage data is incomplete, so no amount is shown');
}

function sessionTone(session: SessionRecord) {
  if (['ended', 'finished', 'closed'].includes(session.status)) return 'pill--muted';
  if (['error', 'failed', 'aborted'].includes(session.status)) return 'pill--danger';
  return 'pill--success';
}

watch(() => resource.data, (value) => {
  if (value) sessionsCache = value;
});

onMounted(() => {
  void resource.execute({ silent: !!resource.data });
});
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('会话 / Third slice', 'Sessions / Third slice') }}</p>
        <h2 class="page-header__title">{{ ui.label('会话观察台', 'Session observer') }}</h2>
        <p class="page-header__description">
          {{ ui.label('把运行时快照、按角色会话分布和用量估算迁进新壳层里，同时继续复用现有的共享缓存与后台刷新语义。', 'Move runtime snapshots, per-role session distribution, and usage estimates into the new shell while keeping the current shared cache and background refresh semantics.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="resource.execute({ silent: true })">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('Refresh', 'Refresh') }}
      </button>
    </header>

    <div v-if="resource.loading && !resource.data" class="page-empty">
      {{ ui.label('正在读取会话快照…', 'Loading the session snapshot…') }}
    </div>
    <div v-else-if="resource.error && !resource.data" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>
    <template v-else-if="resource.data && snapshot">
      <div v-if="resource.error" class="status-banner status-banner--warning">
        {{ ui.label('已保留上一版会话快照，但后台刷新失败：', 'The last session snapshot is still on screen, but the background refresh failed: ') }}{{ resource.error }}
      </div>
      <PageCard :title="ui.label('会话总览', 'Session overview')" eyebrow="Summary">
        <div class="stat-grid">
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('会话总数', 'Sessions') }}</p>
            <strong>{{ formatNumber(snapshot.summary?.sessionCount ?? sessions.length) }}</strong>
            <span>{{ snapshot.summary?.defaultModel || ui.label('默认模型未知', 'Default model is unknown') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('活跃会话', 'Active now') }}</p>
            <strong>{{ formatNumber(activeSessions.length) }}</strong>
            <span>{{ ui.label('当前仍在运行或待执行的会话', 'Sessions that are still running or waiting now') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('累计 Tokens', 'Total tokens') }}</p>
            <strong>{{ formatNumber(resource.data.costSummary.totalTokens) }}</strong>
            <span>{{ ui.label('基于共享运行时快照统计', 'Counted from the shared runtime snapshot') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('用量估算', 'Usage estimate') }}</p>
            <strong>{{ usageEstimateLabel() }}</strong>
            <span>{{ usageEstimateHint() }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('会话索引路径', 'Session paths') }}</p>
            <strong>{{ formatNumber(snapshot.sessionsMeta?.paths.length || 0) }}</strong>
            <span>{{ ui.label('被 Guard 识别到的会话目录', 'Session directories detected by Guard') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('待处理系统事件', 'Queued events') }}</p>
            <strong>{{ formatNumber(snapshot.summary?.queuedSystemEvents || 0) }}</strong>
            <span>{{ ui.label('等待处理的系统级事件', 'System events that are still waiting') }}</span>
          </article>
        </div>
      </PageCard>

      <PageCard :title="ui.label('运行环境', 'Runtime context')" eyebrow="Runtime">
        <div class="stat-grid">
          <article class="stat-card">
            <p class="stat-card__label">OS</p>
            <strong>{{ snapshot.os?.label || '-' }}</strong>
            <span>{{ [snapshot.os?.platform, snapshot.os?.arch, snapshot.os?.release].filter(Boolean).join(' / ') || ui.label('系统信息暂缺', 'OS details are missing') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('记忆检索', 'Memory search') }}</p>
            <strong>{{ snapshot.memory?.provider || snapshot.memory?.backend || '-' }}</strong>
            <span>{{ [snapshot.memory?.searchMode, snapshot.memory?.dbPath || snapshot.memory?.workspaceDir].filter(Boolean).join(' / ') || ui.label('记忆运行态信息暂缺', 'Memory runtime details are missing') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('Gateway 服务', 'Gateway service') }}</p>
            <strong>{{ snapshot.gatewayService?.label || '-' }}</strong>
            <span>{{ [snapshot.gatewayService?.loadedText, snapshot.gatewayService?.runtimeShort].filter(Boolean).join(' / ') || ui.label('Gateway 服务信息暂缺', 'Gateway service details are missing') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('Node 服务', 'Node service') }}</p>
            <strong>{{ snapshot.nodeService?.label || '-' }}</strong>
            <span>{{ [snapshot.nodeService?.loadedText, snapshot.nodeService?.runtimeShort].filter(Boolean).join(' / ') || ui.label('Node 服务信息暂缺', 'Node service details are missing') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('更新轨道', 'Update track') }}</p>
            <strong>{{ snapshot.update?.channel || snapshot.update?.installKind || '-' }}</strong>
            <span>{{ [snapshot.update?.packageManager, snapshot.update?.latestVersion].filter(Boolean).join(' / ') || ui.label('更新信息暂缺', 'Update details are missing') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('安全审计', 'Security audit') }}</p>
            <strong>{{ formatNumber(snapshot.securityAudit?.findingsCount || 0) }}</strong>
            <span>{{ `${formatNumber(snapshot.securityAudit?.critical || 0)} critical / ${formatNumber(snapshot.securityAudit?.warn || 0)} warn` }}</span>
          </article>
        </div>
      </PageCard>

      <PageCard :title="ui.label('当前会话', 'Current sessions')" eyebrow="Sessions">
        <div v-if="sessions.length" class="provider-stack">
          <article v-for="session in sessions" :key="session.id" class="provider-card">
            <header class="provider-card__header">
              <div>
                <strong>{{ session.id }}</strong>
                <p>{{ `${session.agentId} / ${session.modelId}` }}</p>
              </div>
              <div class="pill-row">
                <span class="pill" :class="sessionTone(session)">{{ session.status || '-' }}</span>
                <span class="pill pill--info">{{ session.channel || '-' }}</span>
              </div>
            </header>

            <div class="mini-list">
              <div class="mini-list__item mini-list__item--stack">
                <strong>{{ ui.label('时间轴', 'Timeline') }}</strong>
                <p>{{ ui.label('开始：', 'Started: ') }}{{ formatDateTime(session.startedAt) }}</p>
                <p>{{ ui.label('更新：', 'Updated: ') }}{{ formatDateTime(session.updatedAt) }}</p>
              </div>
              <div class="mini-list__item mini-list__item--stack">
                <strong>{{ ui.label('Token 使用', 'Token usage') }}</strong>
                <p>{{ `${formatNumber(session.usage.totalTokens)} tokens` }}</p>
                <p>{{ `${ui.label('输入', 'Input')} ${formatNumber(session.usage.inputTokens)} / ${ui.label('输出', 'Output')} ${formatNumber(session.usage.outputTokens)}` }}</p>
              </div>
              <div class="mini-list__item mini-list__item--stack">
                <strong>{{ ui.label('上下文窗口', 'Context window') }}</strong>
                <p>{{ session.contextTokens != null ? formatNumber(session.contextTokens) : '-' }}</p>
                <p>{{ ui.label('剩余：', 'Remaining: ') }}{{ session.remainingTokens != null ? formatNumber(session.remainingTokens) : '-' }}</p>
              </div>
              <div class="mini-list__item mini-list__item--stack">
                <strong>{{ ui.label('用量估算', 'Usage estimate') }}</strong>
                <p>{{ formatCost(session.estimatedCost, resource.data.costSummary.pricingUnit || 'USD') }}</p>
                <p>{{ ui.label('上下文占比：', 'Context used: ') }}{{ formatPercent(session.percentUsed) }}</p>
              </div>
            </div>
          </article>
        </div>
        <div v-else class="page-empty">
          {{ ui.label('当前还没有会话记录。', 'There are no session records right now.') }}
        </div>
      </PageCard>

      <div class="page-two-column">
        <PageCard :title="ui.label('按角色分布', 'By role')" eyebrow="Roles">
          <div v-if="byAgent.length" class="provider-stack">
            <article v-for="group in byAgent" :key="group.agentId" class="provider-card">
              <header class="provider-card__header">
                <div>
                  <strong>{{ group.agentId }}</strong>
                  <p>{{ group.path || ui.label('没有返回路径信息', 'No path information returned') }}</p>
                </div>
                <span class="pill pill--info">{{ formatNumber(group.count) }}</span>
              </header>
              <div class="mini-list">
                <div v-for="item in group.recent.slice(0, 3)" :key="item.id" class="mini-list__item">
                  <div>
                    <strong>{{ item.modelId }}</strong>
                    <p>{{ item.channel }}</p>
                  </div>
                  <span class="pill" :class="sessionTone(item)">{{ item.status }}</span>
                </div>
              </div>
            </article>
          </div>
          <div v-else class="page-empty">
            {{ ui.label('当前没有按角色聚合的会话数据。', 'No per-role session summary is available right now.') }}
          </div>
        </PageCard>

        <PageCard :title="ui.label('最近活动', 'Recent activity')" eyebrow="Timeline">
          <div v-if="resource.data.recentActivity.length" class="provider-stack">
            <article v-for="event in resource.data.recentActivity.slice(0, 10)" :key="event.id" class="provider-card">
              <header class="provider-card__header">
                <div>
                  <strong>{{ event.title }}</strong>
                  <p>{{ formatDateTime(event.createdAt) }}</p>
                </div>
                <span class="pill pill--muted">{{ event.type }}</span>
              </header>
              <p>{{ event.description }}</p>
            </article>
          </div>
          <div v-else class="page-empty">
            {{ ui.label('当前还没有最近活动记录。', 'There is no recent activity yet.') }}
          </div>
        </PageCard>
      </div>

      <PageCard v-if="snapshot.warnings.length" :title="ui.label('运行提醒', 'Runtime warnings')" eyebrow="Warning">
        <div class="list-stack">
          <article v-for="warning in snapshot.warnings" :key="warning" class="risk-row">
            <strong>{{ ui.label('注意事项', 'Warning') }}</strong>
            <span>{{ warning }}</span>
          </article>
        </div>
      </PageCard>

      <PageCard v-if="snapshot.memory" :title="ui.label('记忆运行态补充', 'Memory runtime details')" eyebrow="Memory">
        <div class="stat-grid">
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('记忆文件', 'Memory files') }}</p>
            <strong>{{ formatNumber(snapshot.memory.files) }}</strong>
            <span>{{ ui.label('当前已接入的记忆文件数量', 'Managed memory files detected now') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('记忆分块', 'Chunks') }}</p>
            <strong>{{ formatNumber(snapshot.memory.chunks) }}</strong>
            <span>{{ ui.label('用于搜索的记忆分块数', 'Memory chunks available for search') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('索引状态', 'Index state') }}</p>
            <strong>{{ snapshot.memory.dirty === true ? ui.label('待刷新', 'Dirty') : snapshot.memory.dirty === false ? ui.label('已同步', 'Clean') : '-' }}</strong>
            <span>{{ snapshot.memory.dbPath || snapshot.memory.workspaceDir || ui.label('没有返回索引路径', 'No index path returned') }}</span>
          </article>
          <article class="stat-card">
            <p class="stat-card__label">{{ ui.label('索引目录', 'Index location') }}</p>
            <strong>{{ snapshot.memory.dbPath ? ui.label('已返回路径', 'Path returned') : ui.label('暂无路径', 'No path') }}</strong>
            <span>{{ snapshot.memory.dbPath || snapshot.memory.workspaceDir || ui.label('没有返回目录信息', 'No directory information returned') }}</span>
          </article>
        </div>
      </PageCard>
    </template>
  </div>
</template>
