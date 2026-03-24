<script setup lang="ts">
import { computed } from 'vue';
import { formatDateTime, formatNumber } from '@/features/common/display';
import PageCard from '@/features/common/PageCard.vue';
import {
  schedulerDetailLabel,
  schedulerStateLabel,
  type LastActionState,
} from '@/features/cron/cron-helpers';
import type { CronOverviewWithCache } from '@/services/api/cron';
import { useUiStore } from '@/stores/ui';

const props = defineProps<{
  overview: CronOverviewWithCache;
  enabledCount: number;
  disabledCount: number;
  error: string | null;
  lastAction: LastActionState;
}>();

const ui = useUiStore();
const schedulerState = computed(() =>
  schedulerStateLabel(ui, props.overview.status.enabled),
);
const schedulerDetail = computed(() =>
  schedulerDetailLabel(ui, ui.developerMode, props.overview.status),
);
</script>

<template>
  <PageCard :title="ui.label('运行概览', 'Runtime overview')" eyebrow="Overview">
    <div class="stat-grid">
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('任务总数', 'Jobs') }}</p>
        <strong>{{ formatNumber(overview.jobs.length) }} / {{ formatNumber(overview.total) }}</strong>
        <span>{{ ui.label('当前已加载任务 / 运行态汇总总量', 'Loaded jobs / runtime total') }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('已启用', 'Enabled') }}</p>
        <strong>{{ formatNumber(enabledCount) }}</strong>
        <span>{{ ui.label('这些任务会按计划自动执行', 'These jobs run on their schedule') }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('已停用', 'Disabled') }}</p>
        <strong>{{ formatNumber(disabledCount) }}</strong>
        <span>{{ ui.label('停用后仍会保留，之后可以重新开启', 'Disabled jobs stay available and can be resumed later') }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('调度器状态', 'Scheduler') }}</p>
        <strong>{{ schedulerState }}</strong>
        <span>{{ schedulerDetail }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('运行态任务数', 'Runtime job count') }}</p>
        <strong>{{ formatNumber(overview.status.jobsCount) }}</strong>
        <span>{{ ui.label('来自 openclaw cron status 的运行态统计', 'Reported directly by openclaw cron status') }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('分页窗口', 'Pagination window') }}</p>
        <strong>{{ formatNumber(overview.offset) }} / {{ formatNumber(overview.limit) }}</strong>
        <span>
          {{
            overview.hasMore
              ? ui.label(
                  `还有更多任务未加载，nextOffset=${overview.nextOffset ?? '-'}`,
                  `More jobs remain, nextOffset=${overview.nextOffset ?? '-'}`,
                )
              : ui.label('当前页已经完整。', 'The current page is complete.')
          }}
        </span>
      </article>
    </div>

    <div v-if="error" class="status-banner status-banner--warning">
      {{
        ui.label(
          '已保留上一版成功结果，同时后台刷新失败：',
          'The last successful result is still on screen, but the background refresh failed: ',
        )
      }}{{ error }}
    </div>
  </PageCard>

  <PageCard
    v-if="lastAction"
    :title="ui.label('最近一次任务动作', 'Latest task action')"
    eyebrow="Action"
  >
    <div
      class="status-banner"
      :class="lastAction.tone === 'success' ? 'status-banner--success' : 'status-banner--error'"
    >
      <strong>{{ lastAction.message }}</strong>
      <span>{{ formatDateTime(lastAction.at) }}</span>
    </div>
    <pre v-if="ui.developerMode && lastAction.detail" class="code-panel">{{ lastAction.detail }}</pre>
    <p v-else-if="lastAction.detail" class="muted-copy">
      {{
        ui.label(
          '最近一次任务动作的原始 detail 已收纳到开发者模式里。需要查看底层返回内容时，请先到 Settings 打开开发者模式。',
          'The raw detail from the latest task action now stays behind developer mode. Enable it from Settings if you need the underlying payload.',
        )
      }}
    </p>
  </PageCard>

  <PageCard
    v-if="overview.warnings.length || overview.hasMore"
    :title="ui.label('当前提醒', 'Current warnings')"
    eyebrow="Warnings"
  >
    <div class="list-stack">
      <article v-for="warning in overview.warnings" :key="warning" class="risk-row">
        <strong>{{ ui.label('注意事项', 'Warning') }}</strong>
        <span>{{ warning }}</span>
      </article>
      <article v-if="overview.hasMore" class="risk-row">
        <strong>{{ ui.label('尚未完整加载', 'More jobs exist') }}</strong>
        <span>
          {{
            ui.label(
              `当前只拉取到 ${overview.jobs.length} 条任务，运行态汇总显示总量为 ${overview.total}。`,
              `Only ${overview.jobs.length} jobs are loaded while the runtime reports ${overview.total} in total.`,
            )
          }}
        </span>
      </article>
    </div>
  </PageCard>
</template>
