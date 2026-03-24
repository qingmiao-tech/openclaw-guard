<script setup lang="ts">
import CronEditorSection from '@/features/cron/components/CronEditorSection.vue';
import CronJobsSection from '@/features/cron/components/CronJobsSection.vue';
import CronOverviewSection from '@/features/cron/components/CronOverviewSection.vue';
import { useCronPageState } from '@/features/cron/useCronPageState';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
const {
  resource,
  searchQuery,
  filter,
  editorMode,
  editingJobId,
  runningAction,
  lastAction,
  draft,
  jobs,
  enabledJobs,
  disabledJobs,
  filteredJobs,
  refresh,
  setSearchQuery,
  setFilter,
  resetEditor,
  handleSubmit,
  startEdit,
  handleJobAction,
} = useCronPageState();
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('自动化 / Cron', 'Automation / Cron') }}</p>
        <h2 class="page-header__title">{{ ui.label('自动化任务', 'Automation jobs') }}</h2>
        <p class="page-header__description">
          {{
            ui.label(
              '把当前 Cron 的创建、编辑、运行、启停和删除能力迁进新壳层里，同时保持旧接口合同不变，让自动化真正进入模块化前端。',
              'Move cron create, edit, run, enable, disable, and remove flows into the new shell while keeping the existing backend contract unchanged, so automation is fully part of the modular frontend.',
            )
          }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="refresh">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新任务状态', 'Refresh jobs') }}
      </button>
    </header>

    <div v-if="resource.loading && !resource.data" class="page-empty">
      {{ ui.label('正在读取 Cron 状态与任务列表…', 'Loading cron status and jobs…') }}
    </div>
    <div v-else-if="resource.error && !resource.data" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>
    <template v-else-if="resource.data">
      <CronOverviewSection
        :overview="resource.data"
        :enabled-count="enabledJobs.length"
        :disabled-count="disabledJobs.length"
        :error="resource.error"
        :last-action="lastAction"
      />

      <div class="page-split">
        <CronEditorSection
          :draft="draft"
          :editor-mode="editorMode"
          :editing-job-id="editingJobId"
          :running-action="runningAction"
          @submit="handleSubmit"
          @reset="resetEditor"
        />

        <CronJobsSection
          :jobs="jobs"
          :enabled-jobs="enabledJobs"
          :disabled-jobs="disabledJobs"
          :filtered-jobs="filteredJobs"
          :search-query="searchQuery"
          :filter="filter"
          :running-action="runningAction"
          @update:search-query="setSearchQuery"
          @update:filter="setFilter"
          @edit="startEdit"
          @action="handleJobAction($event.action, $event.job)"
        />
      </div>
    </template>
  </div>
</template>
