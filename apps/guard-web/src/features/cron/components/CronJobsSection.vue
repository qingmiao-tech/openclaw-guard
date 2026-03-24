<script setup lang="ts">
import { formatDateTime } from '@/features/common/display';
import PageCard from '@/features/common/PageCard.vue';
import {
  cronJobStatusLabel,
  cronJobTone,
  type CronFilter,
  type CronJobAction,
} from '@/features/cron/cron-helpers';
import type { CronJobRecord } from '@/services/api/cron';
import { useUiStore } from '@/stores/ui';

const props = defineProps<{
  jobs: CronJobRecord[];
  enabledJobs: CronJobRecord[];
  disabledJobs: CronJobRecord[];
  filteredJobs: CronJobRecord[];
  searchQuery: string;
  filter: CronFilter;
  runningAction: string;
}>();

const emit = defineEmits<{
  (event: 'update:searchQuery', value: string): void;
  (event: 'update:filter', value: CronFilter): void;
  (event: 'edit', job: CronJobRecord): void;
  (event: 'action', payload: { action: CronJobAction; job: CronJobRecord }): void;
}>();

const ui = useUiStore();

function updateSearchQuery(event: Event) {
  emit('update:searchQuery', (event.target as HTMLInputElement).value);
}

function requestAction(action: CronJobAction, job: CronJobRecord) {
  emit('action', { action, job });
}
</script>

<template>
  <PageCard :title="ui.label('任务列表', 'Job list')" eyebrow="Jobs">
    <div class="control-grid">
      <label class="settings-field">
        <span>{{ ui.label('搜索', 'Search') }}</span>
        <input
          :value="searchQuery"
          data-testid="cron-search-input"
          class="settings-input"
          type="text"
          :placeholder="ui.label('搜索任务名、Agent、调度表达式', 'Search by name, agent, or schedule')"
          @input="updateSearchQuery"
        />
      </label>
    </div>

    <div class="pill-row">
      <button
        data-testid="cron-filter-all"
        class="pill-button"
        :class="{ 'pill-button--active': filter === 'all' }"
        type="button"
        @click="$emit('update:filter', 'all')"
      >
        {{ ui.label(`全部 (${jobs.length})`, `All (${jobs.length})`) }}
      </button>
      <button
        data-testid="cron-filter-enabled"
        class="pill-button"
        :class="{ 'pill-button--active': filter === 'enabled' }"
        type="button"
        @click="$emit('update:filter', 'enabled')"
      >
        {{ ui.label(`启用中 (${enabledJobs.length})`, `Enabled (${enabledJobs.length})`) }}
      </button>
      <button
        data-testid="cron-filter-disabled"
        class="pill-button"
        :class="{ 'pill-button--active': filter === 'disabled' }"
        type="button"
        @click="$emit('update:filter', 'disabled')"
      >
        {{ ui.label(`已停用 (${disabledJobs.length})`, `Disabled (${disabledJobs.length})`) }}
      </button>
    </div>

    <div v-if="filteredJobs.length" class="provider-stack">
      <article
        v-for="job in filteredJobs"
        :key="job.id"
        class="provider-card"
        data-testid="cron-job-card"
        :data-job-id="job.id"
      >
        <header class="provider-card__header">
          <div>
            <strong>{{ job.name || job.id }}</strong>
            <p>{{ `${job.id} · ${job.agentId}` }}</p>
          </div>
          <span class="pill" :class="cronJobTone(job)">{{ cronJobStatusLabel(ui, job) }}</span>
        </header>

        <div class="mini-list">
          <div class="mini-list__item mini-list__item--stack">
            <strong>{{ ui.label('调度', 'Schedule') }}</strong>
            <p>{{ job.schedule || '-' }}</p>
          </div>
          <div class="mini-list__item mini-list__item--stack">
            <strong>{{ ui.label('任务消息', 'Prompt') }}</strong>
            <p>{{ job.prompt || '-' }}</p>
          </div>
          <div class="mini-list__item mini-list__item--stack">
            <strong>{{ ui.label('最近执行', 'Last run') }}</strong>
            <p>{{ formatDateTime(job.lastRunAt) }}</p>
            <p>{{ ui.label('下次执行：', 'Next run: ') }}{{ formatDateTime(job.nextRunAt) }}</p>
          </div>
        </div>

        <div class="page-actions">
          <button
            data-testid="cron-job-edit"
            class="inline-link"
            type="button"
            @click="$emit('edit', job)"
          >
            {{ ui.label('编辑', 'Edit') }}
          </button>
          <button
            class="inline-link"
            type="button"
            :disabled="runningAction === `run:${job.id}`"
            @click="requestAction('run', job)"
          >
            {{
              runningAction === `run:${job.id}`
                ? ui.label('执行中…', 'Running…')
                : ui.label('立即运行', 'Run now')
            }}
          </button>
          <button
            class="inline-link"
            type="button"
            :disabled="runningAction === `enable:${job.id}` || runningAction === `disable:${job.id}`"
            @click="requestAction(job.enabled ? 'disable' : 'enable', job)"
          >
            {{
              runningAction === `enable:${job.id}` || runningAction === `disable:${job.id}`
                ? ui.label('处理中…', 'Working…')
                : job.enabled
                  ? ui.label('停用', 'Disable')
                  : ui.label('启用', 'Enable')
            }}
          </button>
          <button
            class="inline-link inline-link--danger"
            type="button"
            :disabled="runningAction === `remove:${job.id}`"
            @click="requestAction('remove', job)"
          >
            {{
              runningAction === `remove:${job.id}`
                ? ui.label('删除中…', 'Deleting…')
                : ui.label('删除', 'Delete')
            }}
          </button>
        </div>
      </article>
    </div>
    <div v-else class="page-empty">
      {{ ui.label('当前筛选条件下没有匹配的任务。', 'No cron jobs match the current filters.') }}
    </div>
  </PageCard>
</template>
