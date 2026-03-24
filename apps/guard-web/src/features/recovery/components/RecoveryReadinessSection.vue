<script setup lang="ts">
import { formatDateTime } from '@/features/common/display';
import PageCard from '@/features/common/PageCard.vue';
import type {
  AdvancedAction,
  BlockerSection,
  GitSignal,
  ReadinessItem,
  RecoverySnapshot,
} from '@/features/recovery/useRecoveryPageState';
import { useUiStore } from '@/stores/ui';

const props = defineProps<{
  gitStatus: RecoverySnapshot['gitStatus'];
  syncReadinessItems: ReadinessItem[];
  blockerSections: BlockerSection[];
  latestGitSignals: GitSignal[];
  runningAction: string;
  advancedMessage: string;
}>();

const emit = defineEmits<{
  (event: 'copy-repo-path'): void;
  (event: 'copy-remote-url'): void;
  (event: 'check-and-sync'): void;
  (event: 'run-action', action: AdvancedAction): void;
}>();

const ui = useUiStore();
</script>

<template>
  <PageCard :title="ui.label('现在能不能同步？', 'Can you sync now?')" eyebrow="Readiness">
    <p class="muted-copy">
      {{ ui.label('这里会按步骤告诉你当前卡在哪里，先处理待办项，再继续提交、推送或一键同步。', 'This section shows where the flow is blocked right now, so you can resolve the pending item before committing, pushing, or syncing.') }}
    </p>
    <div class="list-stack">
      <article v-for="item in syncReadinessItems" :key="item.key" class="action-row">
        <div>
          <h3>{{ item.label }}</h3>
          <p>{{ item.detail }}</p>
        </div>
        <span class="pill" :class="item.ok ? 'pill--success' : 'pill--warning'">
          {{ item.ok ? ui.label('就绪', 'Ready') : ui.label('待处理', 'Needs action') }}
        </span>
      </article>
    </div>
    <div class="page-actions">
      <button class="inline-link" type="button" @click="emit('copy-repo-path')">
        {{ ui.label('复制本地目录', 'Copy repo path') }}
      </button>
      <button class="inline-link" type="button" @click="emit('copy-remote-url')">
        {{ ui.label('复制远端地址', 'Copy remote URL') }}
      </button>
      <a
        v-if="gitStatus.remoteWebUrl"
        class="inline-link"
        :href="gitStatus.remoteWebUrl"
        target="_blank"
        rel="noreferrer"
      >
        {{ ui.label('打开远端仓库', 'Open remote') }}
      </a>
      <button
        data-testid="recovery-check-sync"
        class="inline-link inline-link--primary"
        type="button"
        :disabled="runningAction === 'private' || runningAction === 'sync'"
        @click="emit('check-and-sync')"
      >
        {{
          runningAction === 'private' || runningAction === 'sync'
            ? ui.label('检查并同步中…', 'Checking and syncing…')
            : ui.label('检查并同步', 'Check and sync')
        }}
      </button>
    </div>
  </PageCard>

  <PageCard :title="ui.label('为什么现在还不能提交 / 推送？', 'Why commit or push is still blocked')" eyebrow="Blockers">
    <p class="muted-copy">
      {{ ui.label('如果按钮现在还是灰的，先看这里。它会分别告诉你提交、推送和一键同步卡在什么地方。', 'If the actions are still disabled, start here. This card explains what is blocking commit, push, or one-click sync.') }}
    </p>
    <div v-if="gitStatus.state.lastError" class="status-banner status-banner--warning">
      {{ ui.label('最近错误：', 'Last error: ') }}{{ gitStatus.state.lastError }}
    </div>
    <div class="list-stack">
      <article v-for="section in blockerSections" :key="section.key" class="provider-card">
        <header class="provider-card__header">
          <strong>{{ section.title }}</strong>
          <span class="pill" :class="section.items.length ? 'pill--warning' : 'pill--success'">
            {{ section.items.length ? ui.label('存在阻塞', 'Blocked') : ui.label('已就绪', 'Ready') }}
          </span>
        </header>
        <div class="list-stack">
          <template v-if="section.items.length">
            <article v-for="reason in section.items" :key="reason" class="risk-row">
              <strong>{{ ui.label('原因', 'Reason') }}</strong>
              <span>{{ reason }}</span>
            </article>
          </template>
          <p v-else class="muted-copy">{{ section.empty }}</p>
        </div>
      </article>
    </div>
    <div class="stat-grid">
      <article v-for="signal in latestGitSignals" :key="signal.key" class="stat-card">
        <p class="stat-card__label">{{ signal.label }}</p>
        <strong>{{ signal.value }}</strong>
        <span>{{ ui.label('帮助你判断最近一次动作停在了哪里。', 'Use this to understand where the latest action stopped.') }}</span>
      </article>
    </div>
  </PageCard>

  <PageCard :title="ui.label('当前仓库状态', 'Current repository status')" eyebrow="Status">
    <div class="stat-grid">
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('仓库初始化', 'Repository') }}</p>
        <strong>{{ gitStatus.repoInitialized ? ui.label('已初始化', 'Initialized') : ui.label('未初始化', 'Not initialized') }}</strong>
        <span>{{ gitStatus.repoPath }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('远端仓库', 'Remote') }}</p>
        <strong>{{ gitStatus.remoteName || '-' }}</strong>
        <span>{{ gitStatus.remoteUrl || ui.label('还没绑定远端', 'No remote connected yet') }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('认证方式', 'Auth mode') }}</p>
        <strong>{{ gitStatus.authMode || '-' }}</strong>
        <span>{{ gitStatus.authConfigured ? ui.label('当前已配置认证', 'Authentication is configured') : ui.label('当前还没配置认证', 'Authentication is not configured yet') }}</span>
      </article>
      <article class="stat-card">
        <p class="stat-card__label">{{ ui.label('私有检查', 'Private check') }}</p>
        <strong>
          {{
            gitStatus.repoPrivate === true
              ? ui.label('已通过', 'Passed')
              : gitStatus.repoPrivate === false
                ? ui.label('未通过', 'Failed')
                : ui.label('未检查', 'Pending')
          }}
        </strong>
        <span>{{ gitStatus.state.lastSyncAt ? `${ui.label('最近同步', 'Last sync')} ${formatDateTime(gitStatus.state.lastSyncAt)}` : ui.label('还没有成功同步记录', 'No successful sync record yet') }}</span>
      </article>
    </div>

    <div class="page-actions">
      <button class="inline-link inline-link--primary" type="button" :disabled="runningAction === 'init'" @click="emit('run-action', 'init')">
        {{ runningAction === 'init' ? ui.label('初始化中…', 'Initializing…') : ui.label('初始化保护仓库', 'Initialize protection repo') }}
      </button>
      <button class="inline-link" type="button" :disabled="runningAction === 'private'" @click="emit('run-action', 'private')">
        {{ runningAction === 'private' ? ui.label('检查中…', 'Checking…') : ui.label('检查私有仓库', 'Check private remote') }}
      </button>
      <button class="inline-link" type="button" :disabled="runningAction === 'checkpoint'" @click="emit('run-action', 'checkpoint')">
        {{ runningAction === 'checkpoint' ? ui.label('提交中…', 'Committing…') : ui.label('创建本地 checkpoint', 'Create local checkpoint') }}
      </button>
      <button class="inline-link" type="button" :disabled="runningAction === 'push'" @click="emit('run-action', 'push')">
        {{ runningAction === 'push' ? ui.label('推送中…', 'Pushing…') : ui.label('推送到云端', 'Push to cloud') }}
      </button>
      <button class="inline-link" type="button" :disabled="runningAction === 'sync'" @click="emit('run-action', 'sync')">
        {{ runningAction === 'sync' ? ui.label('同步中…', 'Syncing…') : ui.label('提交并同步', 'Commit and sync') }}
      </button>
    </div>

    <p v-if="advancedMessage" class="muted-copy">{{ advancedMessage }}</p>
  </PageCard>
</template>
