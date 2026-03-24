<script setup lang="ts">
import PageTabs from '@/features/common/PageTabs.vue';
import RecoveryOverviewSection from '@/features/recovery/components/RecoveryOverviewSection.vue';
import RecoveryReadinessSection from '@/features/recovery/components/RecoveryReadinessSection.vue';
import RecoveryRemoteSection from '@/features/recovery/components/RecoveryRemoteSection.vue';
import RecoveryScopeSection from '@/features/recovery/components/RecoveryScopeSection.vue';
import { useRecoveryPageState } from '@/features/recovery/useRecoveryPageState';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
const {
  resource,
  view,
  recoveryTabs,
  saveLabel,
  advancedMessage,
  savingPoint,
  restoringCommit,
  runningAction,
  connectDraft,
  tokenDraft,
  oauthDraft,
  overviewTone,
  oauthState,
  oauthAuthorizeUrl,
  authSummary,
  oauthTone,
  syncReadinessItems,
  blockerSections,
  latestGitSignals,
  scopeSummaryItems,
  stageableTreeNodes,
  allChangedTreeNodes,
  embeddedRepoGuidance,
  gitProviderOptions,
  refreshPage,
  setView,
  setSaveLabel,
  handleSavePoint,
  handleRestore,
  runAdvancedAction,
  handleConnectRemote,
  handleTokenAuth,
  handleOAuthStart,
  copyAuthorizeUrl,
  handleCopyRepoPath,
  handleCopyRemoteUrl,
  handleCheckAndSync,
  handleCopyStageableList,
  handleCopySkippedRepos,
  copyPoint,
} = useRecoveryPageState();
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('备份 / 恢复', 'Backup / Recovery') }}</p>
        <h2 class="page-header__title">{{ ui.label('备份与恢复', 'Backup & Recovery') }}</h2>
        <p class="page-header__description">
          {{ ui.label('把“先保存当前状态、需要时安全回退、然后继续往前走”的主流程留在当前控制台里；只有更底层的仓库排障才进入高级 Git 视图。', 'Keep the main flow of saving the current state, rolling back safely when needed, and continuing forward in this console; use the advanced Git view only for deeper repository troubleshooting.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="refreshPage">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新', 'Refresh') }}
      </button>
    </header>

    <PageTabs :items="recoveryTabs" :active-id="view" @change="setView" />

    <div v-if="resource.loading && !resource.data" class="page-empty">
      {{ ui.label('正在读取保护状态…', 'Loading protection status…') }}
    </div>
    <div v-else-if="resource.error && !resource.data" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>
    <template v-else-if="resource.data">
      <div v-if="resource.error" class="status-banner status-banner--warning">
        {{ ui.label('已保留上一版备份与恢复快照，但后台刷新失败：', 'The last backup and recovery snapshot is still on screen, but the background refresh failed: ') }}{{ resource.error }}
      </div>

      <RecoveryOverviewSection
        v-if="view === 'center'"
        :overview="resource.data.overview"
        :points="resource.data.points"
        :overview-tone="overviewTone"
        :save-label="saveLabel"
        :saving-point="savingPoint"
        :restoring-commit="restoringCommit"
        @update:save-label="setSaveLabel"
        @save="handleSavePoint"
        @restore="handleRestore"
        @copy-point="copyPoint"
      />

      <template v-else>
        <RecoveryRemoteSection
          :overview="resource.data.overview"
          :git-status="resource.data.gitStatus"
          :git-provider-options="gitProviderOptions"
          :connect-draft="connectDraft"
          :token-draft="tokenDraft"
          :oauth-draft="oauthDraft"
          :auth-summary="authSummary"
          :oauth-tone="oauthTone"
          :oauth-authorize-url="oauthAuthorizeUrl"
          :oauth-state="oauthState"
          :running-action="runningAction"
          @connect-remote="handleConnectRemote"
          @check-private="runAdvancedAction('private')"
          @token-auth="handleTokenAuth"
          @oauth-start="handleOAuthStart"
          @copy-auth-url="copyAuthorizeUrl"
        />

        <RecoveryReadinessSection
          :git-status="resource.data.gitStatus"
          :sync-readiness-items="syncReadinessItems"
          :blocker-sections="blockerSections"
          :latest-git-signals="latestGitSignals"
          :running-action="runningAction"
          :advanced-message="advancedMessage"
          @copy-repo-path="handleCopyRepoPath"
          @copy-remote-url="handleCopyRemoteUrl"
          @check-and-sync="handleCheckAndSync"
          @run-action="runAdvancedAction"
        />

        <RecoveryScopeSection
          :git-status="resource.data.gitStatus"
          :git-ignore-preview="resource.data.gitIgnorePreview"
          :scope-summary-items="scopeSummaryItems"
          :stageable-tree-nodes="stageableTreeNodes"
          :all-changed-tree-nodes="allChangedTreeNodes"
          :embedded-repo-guidance="embeddedRepoGuidance"
          :running-action="runningAction"
          @copy-stageable-list="handleCopyStageableList"
          @copy-skipped-repos="handleCopySkippedRepos"
          @apply-gitignore="runAdvancedAction('gitignore')"
        />
      </template>
    </template>
  </div>
</template>
