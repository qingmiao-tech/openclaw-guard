<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAsyncResource } from '@/composables/useAsyncResource';
import { formatDateTime, shortSha } from '@/features/common/display';
import PageCard from '@/features/common/PageCard.vue';
import PageTabs from '@/features/common/PageTabs.vue';
import {
  applyGitIgnoreRules,
  checkPrivateRemote,
  createLocalCheckpoint,
  createRecoveryPoint,
  initializeProtection,
  loadRecoverySnapshot,
  pushProtectionLine,
  restoreRecoveryPoint as restoreRecoveryPointApi,
  syncProtectionLine,
  type RecoveryPoint,
} from '@/services/api/recovery';
import { useFeedbackStore } from '@/stores/feedback';
import { useUiStore } from '@/stores/ui';

type RecoveryView = 'center' | 'advanced';
type AdvancedAction = 'init' | 'private' | 'checkpoint' | 'push' | 'sync' | 'gitignore';

const ui = useUiStore();
const feedback = useFeedbackStore();
const view = ref<RecoveryView>('center');
const saveLabel = ref('');
const advancedMessage = ref('');
const savingPoint = ref(false);
const restoringCommit = ref('');
const runningAction = ref<AdvancedAction | ''>('');
const resource = useAsyncResource(() => loadRecoverySnapshot());

const recoveryTabs = computed(() => [
  { id: 'center', label: ui.label('恢复中心', 'Recovery center') },
  { id: 'advanced', label: ui.label('高级 Git', 'Advanced Git') },
]);

const overviewTone = computed(() => {
  const overview = resource.data?.overview;
  if (!overview) return 'pill--muted';
  if (!overview.repoReady || overview.warnings.length > 0) return 'pill--warning';
  if (overview.remoteReady) return 'pill--success';
  return 'pill--info';
});

function protectionStateLabel() {
  const overview = resource.data?.overview;
  if (!overview) return ui.label('读取中', 'Loading');
  if (!overview.protected) return ui.label('尚未建立保护', 'Protection not set up');
  if (overview.remoteReady) return ui.label('已上云保护', 'Cloud protection ready');
  return ui.label('当前仅本机可恢复', 'Local recovery only');
}

function nextActionLabel(nextAction: string | undefined) {
  const labels: Record<string, { zh: string; en: string }> = {
    'install-git': { zh: '先安装 Git', en: 'Install Git first' },
    'setup-protection': { zh: '先完成保护设置', en: 'Complete protection setup first' },
    'save-first-point': { zh: '创建首个恢复点', en: 'Create the first recovery point' },
    'save-current-state': { zh: '先保存当前状态', en: 'Save the current state first' },
    'review-restored-state': { zh: '检查刚恢复的状态', en: 'Review the restored state' },
    'connect-private-remote': { zh: '连接私有仓库', en: 'Connect a private remote' },
    'sync-latest-point': { zh: '把最新保护点同步到云端', en: 'Sync the latest point to the cloud' },
    protected: { zh: '当前已经受保护', en: 'Protection is already in place' },
  };
  const match = labels[nextAction || ''];
  return match ? ui.label(match.zh, match.en) : (nextAction || '-');
}

function recoveryKindLabel(point: RecoveryPoint) {
  if (point.kind === 'auto') return ui.label('自动保护', 'Auto protection');
  if (point.kind === 'restore') return ui.label('已恢复到此状态', 'Restore point');
  return ui.label('手动保存', 'Manual save');
}

async function refreshPage() {
  await resource.execute({ silent: !!resource.data });
}

async function handleSavePoint() {
  savingPoint.value = true;
  try {
    const result = await createRecoveryPoint(saveLabel.value.trim() || undefined);
    feedback.pushToast({
      tone: result.success ? 'success' : 'error',
      message: result.message,
    });
    if (result.success) {
      saveLabel.value = '';
      await refreshPage();
    }
  } catch (error) {
    feedback.pushToast({
      tone: 'error',
      message: error instanceof Error ? error.message : String(error),
    });
  } finally {
    savingPoint.value = false;
  }
}

async function handleRestore(point: RecoveryPoint) {
  const confirmed = await feedback.confirm({
    title: ui.label('恢复到这个状态', 'Restore this state'),
    message: ui.label(
      `确认回到 ${point.title} 吗？Guard 会先保护当前未提交内容，再在同一主线上追加一个 restore commit，不会删除历史。`,
      `Restore ${point.title}? Guard will first protect any uncommitted changes and then add a restore commit on the same main line without deleting history.`,
    ),
    confirmLabel: ui.label('确认恢复', 'Restore now'),
    cancelLabel: ui.label('取消', 'Cancel'),
    tone: 'danger',
  });
  if (!confirmed) return;

  restoringCommit.value = point.commitSha;
  try {
    const result = await restoreRecoveryPointApi(point.commitSha);
    feedback.pushToast({
      tone: result.success ? 'success' : 'error',
      message: result.message,
    });
    await refreshPage();
  } catch (error) {
    feedback.pushToast({
      tone: 'error',
      message: error instanceof Error ? error.message : String(error),
    });
  } finally {
    restoringCommit.value = '';
  }
}

async function runAdvancedAction(action: AdvancedAction) {
  runningAction.value = action;
  advancedMessage.value = '';
  try {
    const result = action === 'init'
      ? await initializeProtection()
      : action === 'private'
        ? await checkPrivateRemote()
        : action === 'checkpoint'
          ? await createLocalCheckpoint()
          : action === 'push'
            ? await pushProtectionLine()
            : action === 'sync'
              ? await syncProtectionLine()
              : await applyGitIgnoreRules('smart');
    advancedMessage.value = result.message;
    feedback.pushToast({
      tone: result.success ? 'success' : 'error',
      message: result.message,
    });
    await refreshPage();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    advancedMessage.value = message;
    feedback.pushToast({
      tone: 'error',
      message,
    });
  } finally {
    runningAction.value = '';
  }
}

function handleRecoveryTabChange(value: string) {
  view.value = value as RecoveryView;
}

async function copyPoint(commitSha: string) {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) return;
  await navigator.clipboard.writeText(commitSha);
  feedback.pushToast({
    tone: 'success',
    message: ui.label('恢复点哈希已复制。', 'Recovery point hash copied.'),
  });
}
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('备份与恢复 / Second slice', 'Backup & Recovery / Second slice') }}</p>
        <h2 class="page-header__title">{{ ui.label('备份与恢复', 'Backup & Recovery') }}</h2>
        <p class="page-header__description">
          {{ ui.label('默认先讲“保存现在、回到某个状态、然后继续往前走”，把 Git 细节下沉到高级视图。', 'Start with save now, go back to a protected state, then keep moving forward, while pushing raw Git details into the advanced view.') }}
        </p>
      </div>
      <button class="page-header__action" type="button" @click="refreshPage">
        {{ resource.refreshing ? ui.label('刷新中…', 'Refreshing…') : ui.label('刷新', 'Refresh') }}
      </button>
    </header>

    <PageTabs :items="recoveryTabs" :active-id="view" @change="handleRecoveryTabChange" />

    <div v-if="resource.loading" class="page-empty">
      {{ ui.label('正在读取保护状态…', 'Loading protection status…') }}
    </div>
    <div v-else-if="resource.error" class="page-empty page-empty--error">
      {{ resource.error }}
    </div>
    <template v-else-if="resource.data">
      <template v-if="view === 'center'">
        <PageCard :title="ui.label('当前保护状态', 'Current protection state')" eyebrow="Overview">
          <div class="provider-card__header">
            <p class="muted-copy">
              {{ ui.label('先看这里就能知道现在是否已经受保护、是否已经上云，以及下一步最建议做什么。', 'Start here to see whether protection is already in place, whether it has reached the cloud, and what the next recommended action is.') }}
            </p>
            <span class="pill" :class="overviewTone">{{ protectionStateLabel() }}</span>
          </div>
          <div class="stat-grid">
            <article class="stat-card">
              <p class="stat-card__label">{{ ui.label('当前主线', 'Current branch') }}</p>
              <strong>{{ resource.data.overview.currentBranch || '-' }}</strong>
              <span>{{ ui.label('恢复后仍会继续写在这条主线上', 'Future saves continue on the same main line after a restore') }}</span>
            </article>
            <article class="stat-card">
              <p class="stat-card__label">{{ ui.label('最近保存', 'Last saved') }}</p>
              <strong>{{ formatDateTime(resource.data.overview.lastSavedAt) }}</strong>
              <span>{{ resource.data.overview.latestPoint?.title || ui.label('还没有恢复点', 'No recovery point yet') }}</span>
            </article>
            <article class="stat-card">
              <p class="stat-card__label">{{ ui.label('最近上云', 'Last pushed') }}</p>
              <strong>{{ formatDateTime(resource.data.overview.lastPushedAt) }}</strong>
              <span>{{ resource.data.overview.remoteReady ? ui.label('云端保护已就绪', 'Cloud protection is ready') : ui.label('当前还没完成云端接线', 'Cloud protection is not ready yet') }}</span>
            </article>
            <article class="stat-card">
              <p class="stat-card__label">{{ ui.label('下一步建议', 'Recommended next step') }}</p>
              <strong>{{ nextActionLabel(resource.data.overview.nextAction) }}</strong>
              <span>{{ resource.data.overview.unsyncedChanges ? ui.label('当前存在未同步变化', 'There are unsynced changes right now') : ui.label('当前没有额外待处理变化', 'No extra pending changes right now') }}</span>
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
              <span class="pill pill--info">{{ nextActionLabel(resource.data.overview.nextAction) }}</span>
            </article>
            <article class="action-row">
              <div>
                <h3>{{ ui.label('回退不会删历史', 'Restoring does not delete history') }}</h3>
                <p>{{ ui.label('Guard 会在当前主线上追加一个 restore commit，后面的版本会继续接在它后面。', 'Guard adds a restore commit on the current main line, and future versions continue after that point.') }}</p>
              </div>
              <span class="pill pill--success">{{ ui.label('同一主线继续', 'Continue on the same main line') }}</span>
            </article>
            <article v-for="warning in resource.data.overview.warnings" :key="warning" class="risk-row">
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
              <input v-model="saveLabel" class="settings-input" type="text" />
            </label>
          </div>
          <div class="page-actions">
            <button class="inline-link inline-link--primary" type="button" :disabled="savingPoint" @click="handleSavePoint">
              {{ savingPoint ? ui.label('保存中…', 'Saving…') : ui.label('保存当前状态', 'Save current state') }}
            </button>
          </div>
        </PageCard>

        <PageCard :title="ui.label('恢复点时间线', 'Recovery point timeline')" eyebrow="Timeline">
          <div v-if="resource.data.points.length" class="provider-stack">
            <article v-for="point in resource.data.points" :key="point.id" class="provider-card">
              <header class="provider-card__header">
                <div>
                  <strong>{{ point.title }}</strong>
                  <p>{{ formatDateTime(point.createdAt) }} · {{ shortSha(point.commitSha) }}</p>
                </div>
                <div class="pill-row">
                  <span class="pill pill--info">{{ recoveryKindLabel(point) }}</span>
                  <span class="pill" :class="point.pushed ? 'pill--success' : 'pill--warning'">
                    {{ point.pushed ? ui.label('已上云', 'Synced') : ui.label('仅本机', 'Local only') }}
                  </span>
                </div>
              </header>
              <p>{{ point.summary }}</p>
              <p v-if="point.sourceCommitSha" class="muted-copy">{{ ui.label('来源节点：', 'Source commit: ') }}{{ shortSha(point.sourceCommitSha) }}</p>
              <div class="page-actions">
                <button class="inline-link" type="button" @click="copyPoint(point.commitSha)">
                  {{ ui.label('复制节点', 'Copy point') }}
                </button>
                <button class="inline-link inline-link--primary" type="button" :disabled="!point.restorable || restoringCommit === point.commitSha" @click="handleRestore(point)">
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

      <template v-else>
        <PageCard :title="ui.label('高级 Git 入口', 'Advanced Git entry')" eyebrow="Advanced">
          <p class="muted-copy">
            {{ ui.label('这里先接入最常用的高级动作和状态读取；更复杂的远端绑定、OAuth 和专家级操作，当前阶段仍保留在正式控制台。', 'This view already brings in the most common advanced actions and status reads. More complex remote binding, OAuth, and expert-level operations still stay in the production console for now.') }}
          </p>
          <div class="page-actions">
            <a class="inline-link" href="/#recovery" target="_blank" rel="noreferrer">
              {{ ui.label('打开正式控制台中的高级 Git', 'Open advanced Git in the production console') }}
            </a>
          </div>
        </PageCard>

        <PageCard :title="ui.label('当前仓库状态', 'Current repository status')" eyebrow="Status">
          <div class="stat-grid">
            <article class="stat-card">
              <p class="stat-card__label">{{ ui.label('仓库初始化', 'Repository') }}</p>
              <strong>{{ resource.data.gitStatus.repoInitialized ? ui.label('已初始化', 'Initialized') : ui.label('未初始化', 'Not initialized') }}</strong>
              <span>{{ resource.data.gitStatus.repoPath }}</span>
            </article>
            <article class="stat-card">
              <p class="stat-card__label">{{ ui.label('远端仓库', 'Remote') }}</p>
              <strong>{{ resource.data.gitStatus.remoteName || '-' }}</strong>
              <span>{{ resource.data.gitStatus.remoteUrl || ui.label('还没绑定远端', 'No remote connected yet') }}</span>
            </article>
            <article class="stat-card">
              <p class="stat-card__label">{{ ui.label('认证方式', 'Auth mode') }}</p>
              <strong>{{ resource.data.gitStatus.authMode || '-' }}</strong>
              <span>{{ resource.data.gitStatus.authConfigured ? ui.label('当前已配置认证', 'Authentication is configured') : ui.label('当前还没配置认证', 'Authentication is not configured yet') }}</span>
            </article>
            <article class="stat-card">
              <p class="stat-card__label">{{ ui.label('私有检查', 'Private check') }}</p>
              <strong>{{ resource.data.gitStatus.repoPrivate === true ? ui.label('已通过', 'Passed') : resource.data.gitStatus.repoPrivate === false ? ui.label('未通过', 'Failed') : ui.label('未检查', 'Pending') }}</strong>
              <span>{{ resource.data.gitStatus.state.lastSyncAt ? `${ui.label('最近同步', 'Last sync')} ${formatDateTime(resource.data.gitStatus.state.lastSyncAt)}` : ui.label('还没有成功同步记录', 'No successful sync record yet') }}</span>
            </article>
          </div>

          <div class="page-actions">
            <button class="inline-link inline-link--primary" type="button" :disabled="runningAction === 'init'" @click="runAdvancedAction('init')">
              {{ runningAction === 'init' ? ui.label('初始化中…', 'Initializing…') : ui.label('初始化保护仓库', 'Initialize protection repo') }}
            </button>
            <button class="inline-link" type="button" :disabled="runningAction === 'private'" @click="runAdvancedAction('private')">
              {{ runningAction === 'private' ? ui.label('检查中…', 'Checking…') : ui.label('检查私有仓库', 'Check private remote') }}
            </button>
            <button class="inline-link" type="button" :disabled="runningAction === 'checkpoint'" @click="runAdvancedAction('checkpoint')">
              {{ runningAction === 'checkpoint' ? ui.label('提交中…', 'Committing…') : ui.label('创建本地 checkpoint', 'Create local checkpoint') }}
            </button>
            <button class="inline-link" type="button" :disabled="runningAction === 'push'" @click="runAdvancedAction('push')">
              {{ runningAction === 'push' ? ui.label('推送中…', 'Pushing…') : ui.label('推送到云端', 'Push to cloud') }}
            </button>
            <button class="inline-link" type="button" :disabled="runningAction === 'sync'" @click="runAdvancedAction('sync')">
              {{ runningAction === 'sync' ? ui.label('同步中…', 'Syncing…') : ui.label('提交并同步', 'Commit and sync') }}
            </button>
          </div>

          <p v-if="advancedMessage" class="muted-copy">{{ advancedMessage }}</p>
        </PageCard>

        <PageCard :title="ui.label('保护范围摘要', 'Protection scope summary')" eyebrow="Scope">
          <div class="list-stack">
            <article class="action-row">
              <div>
                <h3>{{ ui.label('当前工作树变化', 'Current worktree changes') }}</h3>
                <p>{{ ui.label('这些文件会进入根保护线；嵌套仓库会被单独标记，不会被误提交到根线。', 'These files enter the root protection line, while nested repositories are marked separately so they are not committed into the root line by mistake.') }}</p>
              </div>
              <strong>{{ resource.data.gitStatus.changedFiles.length }}</strong>
            </article>
            <article class="action-row">
              <div>
                <h3>{{ ui.label('可直接纳入保护', 'Stageable in root line') }}</h3>
                <p>{{ ui.label('这些改动可以直接由 Guard 提交为恢复点。', 'These changes can be committed directly by Guard as recovery points.') }}</p>
              </div>
              <strong>{{ resource.data.gitStatus.stageableChangedFiles.length }}</strong>
            </article>
            <article class="action-row">
              <div>
                <h3>{{ ui.label('嵌套仓库', 'Nested repositories') }}</h3>
                <p>{{ ui.label('这些目录更适合单独维护，Guard 不会在根保护线里直接接管。', 'These directories are better maintained separately. Guard does not take them over inside the root protection line.') }}</p>
              </div>
              <strong>{{ resource.data.gitStatus.skippedEmbeddedRepos.length }}</strong>
            </article>
          </div>

          <pre class="code-panel">{{ JSON.stringify({
            changedFiles: resource.data.gitStatus.changedFiles,
            stageableChangedFiles: resource.data.gitStatus.stageableChangedFiles,
            skippedEmbeddedRepos: resource.data.gitStatus.skippedEmbeddedRepos,
          }, null, 2) }}</pre>
        </PageCard>

        <PageCard :title="ui.label('.gitignore 建议', '.gitignore suggestions')" eyebrow="Ignore rules">
          <p class="muted-copy">
            {{ ui.label('当检测到新的嵌套仓库时，可以先看建议块，再一键追加推荐规则。', 'When Guard detects new nested repositories, review the suggestion block first and then append the recommended rules with one action.') }}
          </p>
          <div class="stat-grid">
            <article class="stat-card">
              <p class="stat-card__label">{{ ui.label('嵌套仓库', 'Embedded repos') }}</p>
              <strong>{{ resource.data.gitIgnorePreview.embeddedRepos.length }}</strong>
              <span>{{ ui.label('需要单独维护的子仓库', 'Child repositories that should be maintained separately') }}</span>
            </article>
            <article class="stat-card">
              <p class="stat-card__label">{{ ui.label('待追加规则', 'Missing rules') }}</p>
              <strong>{{ resource.data.gitIgnorePreview.missingEntries.length }}</strong>
              <span>{{ resource.data.gitIgnorePreview.gitignorePath }}</span>
            </article>
          </div>
          <pre class="code-panel">{{ resource.data.gitIgnorePreview.appendBlock || ui.label('当前没有需要追加的规则。', 'There are no extra rules to append right now.') }}</pre>
          <div class="page-actions">
            <button class="inline-link" type="button" :disabled="runningAction === 'gitignore'" @click="runAdvancedAction('gitignore')">
              {{ runningAction === 'gitignore' ? ui.label('写入中…', 'Applying…') : ui.label('追加推荐规则', 'Append recommended rules') }}
            </button>
          </div>
        </PageCard>
      </template>
    </template>
  </div>
</template>
