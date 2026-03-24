<script setup lang="ts">
import { formatDateTime, shortSha } from '@/features/common/display';
import PageCard from '@/features/common/PageCard.vue';
import {
  formatNextActionLabel,
  formatProtectionStateLabel,
  formatRecoveryKindLabel,
} from '@/features/recovery/recovery-helpers';
import type { RecoverySnapshot } from '@/features/recovery/useRecoveryPageState';
import type { RecoveryPoint } from '@/services/api/recovery';
import { useUiStore } from '@/stores/ui';

const props = defineProps<{
  overview: RecoverySnapshot['overview'];
  points: RecoverySnapshot['points'];
  overviewTone: string;
  saveLabel: string;
  savingPoint: boolean;
  restoringCommit: string;
}>();

const emit = defineEmits<{
  (event: 'update:save-label', value: string): void;
  (event: 'save'): void;
  (event: 'restore', point: RecoveryPoint): void;
  (event: 'copy-point', commitSha: string): void;
}>();

const ui = useUiStore();

function updateSaveLabel(event: Event) {
  emit('update:save-label', (event.target as HTMLInputElement).value);
}
</script>

<template>
  <PageCard :title="ui.label('当前保护状态', 'Current protection state')" eyebrow="Overview">
    <div class="provider-card__header">
      <p class="muted-copy">
        {{ ui.label('先看这里就能知道现在是否已经受保护、是否已经上云，以及下一步最建议做什么。', 'Start here to see whether protection is already in place, whether it has reached the cloud, and what the next recommended action is.') }}
      </p>
      <span class="pill" :class="overviewTone">
        {{ formatProtectionStateLabel(ui, overview) }}
      </span>
    </div>
    <div class="stat-grid">
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('当前主线', 'Current branch') }}</p>
        <strong>{{ overview.currentBranch || '-' }}</strong>
        <span>{{ ui.label('恢复后仍会继续写在这条主线上', 'Future saves continue on the same main line after a restore') }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('最近保存', 'Last saved') }}</p>
        <strong>{{ formatDateTime(overview.lastSavedAt) }}</strong>
        <span>{{ overview.latestPoint?.title || ui.label('还没有恢复点', 'No recovery point yet') }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('最近上云', 'Last pushed') }}</p>
        <strong>{{ formatDateTime(overview.lastPushedAt) }}</strong>
        <span>{{ overview.remoteReady ? ui.label('云端保护已就绪', 'Cloud protection is ready') : ui.label('当前还没完成云端接线', 'Cloud protection is not ready yet') }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('下一步建议', 'Recommended next step') }}</p>
        <strong>{{ formatNextActionLabel(ui, overview.nextAction) }}</strong>
        <span>{{ overview.unsyncedChanges ? ui.label('当前存在未同步变更', 'There are unsynced changes right now') : ui.label('当前没有额外待处理变更', 'No extra pending changes right now') }}</span>
      </article>
    </div>
  </PageCard>

  <PageCard :title="ui.label('下一步建议', 'Recommended next actions')" eyebrow="Guide">
    <div class="list-stack">
      <article class="action-row">
        <div>
          <h3>{{ ui.label('先保住现在', 'Protect the current state') }}</h3>
          <p>{{ ui.label('当你刚完成一轮配置、修复或工作区整理时，就立刻保存一个恢复点。', 'Whenever you finish a round of setup, fixes, or workspace cleanup, save a recovery point right away.') }}</p>
        </div>
        <span class="pill pill--info">{{ formatNextActionLabel(ui, overview.nextAction) }}</span>
      </article>
      <article class="action-row">
        <div>
          <h3>{{ ui.label('回退不会删历史', 'Restoring does not delete history') }}</h3>
          <p>{{ ui.label('Guard 会在当前主线上追加一个 restore commit，后面的版本会继续接在它后面。', 'Guard adds a restore commit on the current main line, and future versions continue after that point.') }}</p>
        </div>
        <span class="pill pill--success">{{ ui.label('同一主线继续', 'Continue on the same main line') }}</span>
      </article>
      <article v-for="warning in overview.warnings" :key="warning" class="risk-row">
        <strong>{{ ui.label('注意事项', 'Warning') }}</strong>
        <span>{{ warning }}</span>
      </article>
    </div>
  </PageCard>

  <PageCard :title="ui.label('立即保存', 'Save now')" eyebrow="Checkpoint">
    <div class="settings-grid settings-grid--wide">
      <label class="settings-field settings-field--full">
        <span>{{ ui.label('恢复点说明（可选）', 'Recovery point label (optional)') }}</span>
        <small>{{ ui.label('不写也可以，Guard 会自动生成一个带时间的恢复点标题。', 'This is optional. Guard can generate a timestamped title automatically.') }}</small>
        <input
          :value="saveLabel"
          data-testid="recovery-save-input"
          class="settings-input"
          type="text"
          @input="updateSaveLabel"
        />
      </label>
    </div>
    <div class="page-actions">
      <button
        data-testid="recovery-save-button"
        class="inline-link inline-link--primary"
        type="button"
        :disabled="savingPoint"
        @click="$emit('save')"
      >
        {{ savingPoint ? ui.label('保存中…', 'Saving…') : ui.label('保存当前状态', 'Save current state') }}
      </button>
    </div>
  </PageCard>

  <PageCard :title="ui.label('恢复点时间线', 'Recovery point timeline')" eyebrow="Timeline">
    <div v-if="points.length" class="provider-stack">
      <article
        v-for="point in points"
        :key="point.id"
        data-testid="recovery-point-card"
        class="provider-card"
      >
        <header class="provider-card__header">
          <div>
            <strong>{{ point.title }}</strong>
            <p>{{ formatDateTime(point.createdAt) }} | {{ shortSha(point.commitSha) }}</p>
          </div>
          <div class="pill-row">
            <span class="pill pill--info">{{ formatRecoveryKindLabel(ui, point) }}</span>
            <span class="pill" :class="point.pushed ? 'pill--success' : 'pill--warning'">
              {{ point.pushed ? ui.label('已上云', 'Synced') : ui.label('仅本机', 'Local only') }}
            </span>
          </div>
        </header>
        <p>{{ point.summary }}</p>
        <p v-if="point.sourceCommitSha" class="muted-copy">
          {{ ui.label('来源节点：', 'Source commit: ') }}{{ shortSha(point.sourceCommitSha) }}
        </p>
        <div class="page-actions">
          <button class="inline-link" type="button" @click="$emit('copy-point', point.commitSha)">
            {{ ui.label('复制节点', 'Copy point') }}
          </button>
          <button
            data-testid="recovery-restore-button"
            class="inline-link inline-link--primary"
            type="button"
            :disabled="!point.restorable || restoringCommit === point.commitSha"
            @click="$emit('restore', point)"
          >
            {{
              restoringCommit === point.commitSha
                ? ui.label('恢复中…', 'Restoring…')
                : ui.label('回到这个状态', 'Restore this state')
            }}
          </button>
        </div>
      </article>
    </div>
    <div v-else class="page-empty">
      {{ ui.label('当前还没有恢复点。建议先完成一次手动保存。', 'No recovery points exist yet. Create a manual save first.') }}
    </div>
  </PageCard>
</template>
