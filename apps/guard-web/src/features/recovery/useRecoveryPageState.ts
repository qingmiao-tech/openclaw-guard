import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useAsyncResource } from '@/composables/useAsyncResource';
import { buildPathTree } from '@/features/recovery/path-tree';
import { normalizeProvider } from '@/features/recovery/recovery-helpers';
import {
  applyGitIgnoreRules,
  checkPrivateRemote,
  connectProtectionRemote,
  createLocalCheckpoint,
  createRecoveryPoint,
  initializeProtection,
  loadRecoverySnapshot,
  pushProtectionLine,
  restoreRecoveryPoint as restoreRecoveryPointApi,
  saveProtectionTokenAuth,
  startProtectionOAuth,
  syncProtectionLine,
  type GitActionResult,
  type GitProvider,
  type GitSyncStatus,
  type RecoveryPoint,
} from '@/services/api/recovery';
import { useFeedbackStore } from '@/stores/feedback';
import { useUiStore } from '@/stores/ui';
import { formatDateTime, formatNumber } from '@/features/common/display';

export type RecoveryView = 'center' | 'advanced';
export type AdvancedAction =
  | 'init'
  | 'connect'
  | 'token'
  | 'oauth'
  | 'private'
  | 'checkpoint'
  | 'push'
  | 'sync'
  | 'gitignore';

export type RecoverySnapshot = Awaited<ReturnType<typeof loadRecoverySnapshot>>;

export type GitProviderOption = {
  value: GitProvider;
  zh: string;
  en: string;
};

export type ConnectDraft = {
  provider: GitProvider;
  remoteUrl: string;
  remoteName: string;
};

export type TokenDraft = {
  provider: GitProvider;
  token: string;
  username: string;
};

export type OAuthDraft = {
  provider: GitProvider;
  clientId: string;
  clientSecret: string;
  scope: string;
  redirectPort: string;
};

export type OAuthState = NonNullable<GitSyncStatus['state']['oauth']> | null;

export type ReadinessItem = {
  key: string;
  label: string;
  ok: boolean;
  detail: string;
};

export type BlockerSection = {
  key: string;
  title: string;
  items: string[];
  empty: string;
};

export type GitSignal = {
  key: string;
  label: string;
  value: string;
};

export type ScopeSummaryItem = {
  key: string;
  label: string;
  value: string;
  detail: string;
  tone: string;
};

export type GuidanceItem = {
  key: string;
  title: string;
  detail: string;
};

export const GIT_PROVIDER_OPTIONS: GitProviderOption[] = [
  { value: 'github', zh: 'GitHub', en: 'GitHub' },
  { value: 'gitee', zh: 'Gitee', en: 'Gitee' },
];

let recoveryCache: RecoverySnapshot | null = null;

export function useRecoveryPageState() {
  const ui = useUiStore();
  const feedback = useFeedbackStore();

  const view = ref<RecoveryView>('center');
  const saveLabel = ref('');
  const advancedMessage = ref('');
  const savingPoint = ref(false);
  const restoringCommit = ref('');
  const runningAction = ref<AdvancedAction | ''>('');
  const resource = useAsyncResource(() => loadRecoverySnapshot(), recoveryCache, {
    immediate: false,
  });

  const connectDraft = reactive<ConnectDraft>({
    provider: 'github',
    remoteUrl: '',
    remoteName: 'origin',
  });
  const tokenDraft = reactive<TokenDraft>({
    provider: 'github',
    token: '',
    username: '',
  });
  const oauthDraft = reactive<OAuthDraft>({
    provider: 'github',
    clientId: '',
    clientSecret: '',
    scope: 'repo read:user',
    redirectPort: '43189',
  });

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

  const oauthState = computed<OAuthState>(
    () => resource.data?.gitStatus.state.oauth || null,
  );
  const oauthAuthorizeUrl = computed(() => oauthState.value?.authorizeUrl || '');
  const oauthTone = computed(() => {
    if (oauthState.value?.phase === 'success') return 'pill--success';
    if (oauthState.value?.phase === 'error') return 'pill--warning';
    if (oauthState.value?.phase === 'authorizing') return 'pill--info';
    return 'pill--muted';
  });

  const authSummary = computed(() => {
    const status = resource.data?.gitStatus;
    if (!status) return '';
    if (status.authConfigured) {
      const suffix = status.accountUsername ? `，账号 ${status.accountUsername}` : '';
      return ui.label(
        `当前已配置 ${status.authMode || 'token'} 认证${suffix}。`,
        `Authentication is configured with ${status.authMode || 'token'}${status.accountUsername ? ` for ${status.accountUsername}` : ''}.`,
      );
    }
    return ui.label('当前还没有配置远端认证。', 'Remote authentication is not configured yet.');
  });

  const syncReadinessItems = computed<ReadinessItem[]>(() => {
    const status = resource.data?.gitStatus;
    if (!status) return [];
    return [
      {
        key: 'commit',
        label: ui.label('本地提交', 'Commit ready'),
        ok: !!status.canCommit,
        detail: status.canCommit
          ? ui.label('可以执行本地 commit。', 'Ready for local commit.')
          : ui.label('当前仍有提交阻塞项。', 'Commit is still blocked.'),
      },
      {
        key: 'push',
        label: ui.label('远端推送', 'Push ready'),
        ok: !!status.canPush,
        detail: status.canPush
          ? ui.label('可以执行远端 push。', 'Ready for remote push.')
          : ui.label('当前仍有推送阻塞项。', 'Push is still blocked.'),
      },
      {
        key: 'sync',
        label: ui.label('一键同步', 'Sync ready'),
        ok: !!status.canSync,
        detail: status.canSync
          ? ui.label('可以执行检查并同步。', 'Ready for check and sync.')
          : ui.label('当前仍有同步阻塞项。', 'Sync is still blocked.'),
      },
    ];
  });

  const blockerSections = computed<BlockerSection[]>(() => {
    const status = resource.data?.gitStatus;
    if (!status) return [];
    return [
      {
        key: 'commit',
        title: ui.label('提交阻塞', 'Commit blockers'),
        items: status.commitReasons,
        empty: ui.label('本地提交链路已就绪。', 'Commit path is ready.'),
      },
      {
        key: 'push',
        title: ui.label('推送阻塞', 'Push blockers'),
        items: status.pushReasons,
        empty: ui.label('远端推送链路已就绪。', 'Push path is ready.'),
      },
      {
        key: 'sync',
        title: ui.label('同步阻塞', 'Sync blockers'),
        items: status.reasons,
        empty: ui.label('当前没有同步阻塞项。', 'No sync blockers detected.'),
      },
    ];
  });

  const latestGitSignals = computed<GitSignal[]>(() => {
    const status = resource.data?.gitStatus;
    if (!status) return [];
    return [
      {
        key: 'check',
        label: ui.label('最近检查', 'Last check'),
        value: formatDateTime(status.state.lastCheckedAt || null),
      },
      {
        key: 'commit',
        label: ui.label('最近提交', 'Last commit'),
        value: formatDateTime(status.state.lastCommitAt || null),
      },
      {
        key: 'push',
        label: ui.label('最近推送', 'Last push'),
        value: formatDateTime(status.state.lastSyncAt || null),
      },
    ];
  });

  const scopeSummaryItems = computed<ScopeSummaryItem[]>(() => {
    const status = resource.data?.gitStatus;
    if (!status) return [];
    return [
      {
        key: 'all',
        label: ui.label('全部变更', 'All changes'),
        value: formatNumber(status.changedFiles.length),
        detail: ui.label(
          '当前工作树里所有已检测到的变更路径。',
          'All changed paths detected in the current worktree.',
        ),
        tone: status.changedFiles.length ? 'pill--warning' : 'pill--muted',
      },
      {
        key: 'stageable',
        label: ui.label('会进入本次提交', 'Included in this commit'),
        value: formatNumber(status.stageableChangedFiles.length),
        detail: ui.label(
          '这些路径会纳入外层保护仓库的本次提交。',
          'These paths will enter the current root protection commit.',
        ),
        tone: status.stageableChangedFiles.length ? 'pill--success' : 'pill--muted',
      },
      {
        key: 'embedded',
        label: ui.label('已自动跳过', 'Skipped embedded repos'),
        value: formatNumber(status.skippedEmbeddedRepos.length),
        detail: ui.label(
          '带独立 .git 的子仓库不会被外层提交直接接管。',
          'Child repositories with their own .git stay outside the root commit.',
        ),
        tone: status.skippedEmbeddedRepos.length ? 'pill--warning' : 'pill--success',
      },
    ];
  });

  const stageableTreeNodes = computed(() =>
    buildPathTree(resource.data?.gitStatus.stageableChangedFiles || []),
  );
  const allChangedTreeNodes = computed(() =>
    buildPathTree(resource.data?.gitStatus.changedFiles || []),
  );

  const embeddedRepoGuidance = computed<GuidanceItem[]>(() => [
    {
      key: 'independent',
      title: ui.label('方案 1：继续独立维护', 'Option 1: Keep it independent'),
      detail: ui.label(
        '推荐做法。把子仓库路径加入外层 .gitignore，之后外层保护仓库只管理主仓内容。',
        'Recommended. Add child-repository paths to the root .gitignore so the root protection repository only manages the main repository.',
      ),
    },
    {
      key: 'flatten',
      title: ui.label('方案 2：并入主仓', 'Option 2: Flatten into the root repo'),
      detail: ui.label(
        '如果你想把内容并入主仓，需要先移除子目录里的 .git，再重新 add / commit。',
        'If you want the content to live inside the root repository, remove the child .git directory first and then add and commit again.',
      ),
    },
    {
      key: 'separate',
      title: ui.label('方案 3：继续单独同步', 'Option 3: Sync separately'),
      detail: ui.label(
        '保持子仓库不变，但请到对应子目录里独立执行它自己的 commit / push。',
        'Leave the child repository untouched, but commit and push from inside that child directory separately.',
      ),
    },
  ]);

  function hydrateAdvancedDrafts() {
    const status = resource.data?.gitStatus;
    if (!status) return;
    const provider = normalizeProvider(status.provider);

    connectDraft.provider = provider;
    connectDraft.remoteUrl = status.remoteUrl || '';
    connectDraft.remoteName = status.remoteName || 'origin';

    tokenDraft.provider = provider;
    tokenDraft.username = status.accountUsername || '';
    tokenDraft.token = '';

    oauthDraft.provider = provider;
  }

  async function refreshPage() {
    await resource.execute({ silent: !!resource.data });
  }

  function setView(value: string) {
    view.value = value === 'advanced' ? 'advanced' : 'center';
  }

  function setSaveLabel(value: string) {
    saveLabel.value = value;
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
      const result =
        action === 'init'
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

  async function runGitAction(
    action: AdvancedAction,
    request: () => Promise<GitActionResult>,
  ) {
    runningAction.value = action;
    advancedMessage.value = '';
    try {
      const result = await request();
      advancedMessage.value = result.message;
      feedback.pushToast({
        tone: result.success ? 'success' : 'error',
        message: result.message,
      });
      await refreshPage();
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      advancedMessage.value = message;
      feedback.pushToast({
        tone: 'error',
        message,
      });
      return null;
    } finally {
      runningAction.value = '';
    }
  }

  async function followWithPrivateCheck(previous: GitActionResult | null, shouldRun: boolean) {
    if (!previous?.success || !shouldRun) return previous;
    const followUp = await runGitAction('private', () => checkPrivateRemote());
    if (!followUp) return previous;
    advancedMessage.value = [previous.message, followUp.message]
      .filter(Boolean)
      .join('；');
    return followUp;
  }

  async function handleConnectRemote() {
    if (!connectDraft.remoteUrl.trim()) {
      feedback.pushToast({
        tone: 'error',
        message: ui.label('请先填写远端仓库地址。', 'Remote URL is required.'),
      });
      return;
    }
    const result = await runGitAction('connect', () =>
      connectProtectionRemote({
        provider: connectDraft.provider,
        remoteUrl: connectDraft.remoteUrl.trim(),
        remoteName: connectDraft.remoteName.trim() || 'origin',
      }),
    );
    await followWithPrivateCheck(result, Boolean(result?.status?.authConfigured));
  }

  async function handleTokenAuth() {
    if (!tokenDraft.token.trim()) {
      feedback.pushToast({
        tone: 'error',
        message: ui.label('请先粘贴 Token。', 'Token is required.'),
      });
      return;
    }

    const result = await runGitAction('token', () =>
      saveProtectionTokenAuth({
        provider: tokenDraft.provider,
        token: tokenDraft.token.trim(),
        username: tokenDraft.username.trim() || undefined,
      }),
    );
    if (result?.success) {
      tokenDraft.token = '';
    }
    await followWithPrivateCheck(result, Boolean(result?.status?.remoteUrl));
  }

  async function handleOAuthStart() {
    if (!oauthDraft.clientId.trim() || !oauthDraft.clientSecret.trim()) {
      feedback.pushToast({
        tone: 'error',
        message: ui.label(
          '请先填写 Client ID 和 Client Secret。',
          'Client ID and Client Secret are required.',
        ),
      });
      return;
    }

    const result = await runGitAction('oauth', () =>
      startProtectionOAuth({
        provider: oauthDraft.provider,
        clientId: oauthDraft.clientId.trim(),
        clientSecret: oauthDraft.clientSecret.trim(),
        scope: oauthDraft.scope.trim() || undefined,
        redirectPort: Number(oauthDraft.redirectPort) || undefined,
        openBrowser: true,
      }),
    );
    if (result?.output && typeof window !== 'undefined') {
      window.open(result.output, '_blank', 'noopener,noreferrer');
    }
  }

  async function copyAuthorizeUrl() {
    if (
      !oauthAuthorizeUrl.value ||
      typeof navigator === 'undefined' ||
      !navigator.clipboard?.writeText
    ) {
      return;
    }
    await navigator.clipboard.writeText(oauthAuthorizeUrl.value);
    feedback.pushToast({
      tone: 'success',
      message: ui.label('授权链接已复制。', 'Authorization URL copied.'),
    });
  }

  async function copyTextValue(
    value: string | null | undefined,
    successMessage: string,
    emptyMessage: string,
  ) {
    if (!value || typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      feedback.pushToast({
        tone: 'error',
        message: emptyMessage,
      });
      return;
    }
    await navigator.clipboard.writeText(value);
    feedback.pushToast({
      tone: 'success',
      message: successMessage,
    });
  }

  async function handleCopyRepoPath() {
    await copyTextValue(
      resource.data?.gitStatus.repoPath,
      ui.label('本地目录已复制。', 'Repository path copied.'),
      ui.label('当前没有可复制的本地目录。', 'No repository path is available yet.'),
    );
  }

  async function handleCopyRemoteUrl() {
    await copyTextValue(
      resource.data?.gitStatus.remoteUrl,
      ui.label('远端地址已复制。', 'Remote URL copied.'),
      ui.label('当前还没有远端地址可复制。', 'No remote URL is available yet.'),
    );
  }

  async function handleCheckAndSync() {
    const checkResult = await runGitAction('private', () => checkPrivateRemote());
    if (!checkResult?.success) return;
    const syncResult = await runGitAction('sync', () => syncProtectionLine());
    if (!syncResult) return;
    advancedMessage.value = [checkResult.message, syncResult.message]
      .filter(Boolean)
      .join('；');
  }

  async function handleCopyStageableList() {
    await copyTextValue(
      (resource.data?.gitStatus.stageableChangedFiles || []).join('\n'),
      ui.label('待提交清单已复制。', 'Stageable file list copied.'),
      ui.label('当前没有可复制的待提交清单。', 'No stageable file list is available right now.'),
    );
  }

  async function handleCopySkippedRepos() {
    await copyTextValue(
      (resource.data?.gitStatus.skippedEmbeddedRepos || []).join('\n'),
      ui.label('嵌套仓库列表已复制。', 'Skipped repository list copied.'),
      ui.label('当前没有被跳过的嵌套仓库。', 'No skipped embedded repositories are available right now.'),
    );
  }

  async function copyPoint(commitSha: string) {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) return;
    await navigator.clipboard.writeText(commitSha);
    feedback.pushToast({
      tone: 'success',
      message: ui.label('恢复点哈希已复制。', 'Recovery point hash copied.'),
    });
  }

  watch(
    () => resource.data,
    (value) => {
      if (value) recoveryCache = value;
      if (value) hydrateAdvancedDrafts();
    },
  );

  watch(
    () => [view.value, oauthState.value?.phase] as const,
    ([activeView, phase], _, onCleanup) => {
      if (
        typeof window === 'undefined' ||
        activeView !== 'advanced' ||
        phase !== 'authorizing'
      ) {
        return;
      }
      const timer = window.setInterval(() => {
        void refreshPage();
      }, 3000);
      onCleanup(() => window.clearInterval(timer));
    },
  );

  onMounted(() => {
    void resource.execute({ silent: !!resource.data });
  });

  return {
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
    gitProviderOptions: GIT_PROVIDER_OPTIONS,
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
  };
}
