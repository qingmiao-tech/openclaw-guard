import type {
  GitProvider,
  RecoveryOverview,
  RecoveryPoint,
} from '@/services/api/recovery';
import { useUiStore } from '@/stores/ui';

type UiStore = ReturnType<typeof useUiStore>;

export function normalizeProvider(value: string | null | undefined): GitProvider {
  return value === 'gitee' ? 'gitee' : 'github';
}

export function formatProtectionStateLabel(
  ui: UiStore,
  overview: RecoveryOverview | null | undefined,
) {
  if (!overview) return ui.label('读取中', 'Loading');
  if (!overview.protected) return ui.label('尚未建立保护', 'Protection not set up');
  if (overview.remoteReady) return ui.label('云端保护已就绪', 'Cloud protection ready');
  return ui.label('当前仅本机可恢复', 'Local recovery only');
}

export function formatNextActionLabel(ui: UiStore, nextAction: string | undefined) {
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

export function formatRecoveryKindLabel(ui: UiStore, point: RecoveryPoint) {
  if (point.kind === 'auto') return ui.label('自动保护', 'Auto protection');
  if (point.kind === 'restore') return ui.label('恢复点', 'Restore point');
  return ui.label('手动保存', 'Manual save');
}

export function formatOAuthPhaseLabel(ui: UiStore, phase: string | null | undefined) {
  if (phase === 'success') return ui.label('已完成', 'Completed');
  if (phase === 'error') return ui.label('失败', 'Failed');
  if (phase === 'authorizing') return ui.label('授权中', 'Authorizing');
  return ui.label('未开始', 'Idle');
}
