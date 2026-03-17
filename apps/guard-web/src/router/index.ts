import { createRouter, createWebHashHistory } from 'vue-router';
import ChannelsPage from '@/features/channels/pages/ChannelsPage.vue';
import DashboardPage from '@/features/dashboard/pages/DashboardPage.vue';
import FilesPage from '@/features/files/pages/FilesPage.vue';
import ModelsPage from '@/features/models/pages/ModelsPage.vue';
import OpenClawPage from '@/features/openclaw/pages/OpenClawPage.vue';
import OperationsPage from '@/features/operations/pages/OperationsPage.vue';
import PlaceholderPage from '@/features/placeholder/pages/PlaceholderPage.vue';
import RecoveryPage from '@/features/recovery/pages/RecoveryPage.vue';
import RolesPage from '@/features/roles/pages/RolesPage.vue';
import SearchPage from '@/features/search/pages/SearchPage.vue';
import SecurityPage from '@/features/security/pages/SecurityPage.vue';
import SessionsPage from '@/features/sessions/pages/SessionsPage.vue';

function placeholderRoute(
  path: string,
  titleZh: string,
  titleEn: string,
  descriptionZh: string,
  descriptionEn: string,
  legacyHash: string,
) {
  return {
    path,
    component: PlaceholderPage,
    props: {
      titleZh,
      titleEn,
      descriptionZh,
      descriptionEn,
      legacyHash,
    },
  };
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'overview', component: DashboardPage },
    { path: '/operations', name: 'operations', component: OperationsPage },
    { path: '/openclaw', name: 'openclaw', component: OpenClawPage },
    { path: '/channels', name: 'channels', component: ChannelsPage },
    { path: '/models', name: 'models', component: ModelsPage },
    { path: '/security', name: 'security', component: SecurityPage },
    { path: '/recovery', name: 'recovery', component: RecoveryPage },
    { path: '/roles', name: 'roles', component: RolesPage },
    { path: '/files', name: 'files', component: FilesPage },
    { path: '/search', name: 'search', component: SearchPage },
    { path: '/sessions', name: 'sessions', component: SessionsPage },
    placeholderRoute(
      '/logs',
      '日志',
      'Logs',
      '继续保留原有日志与排障能力，下一批会把分页、筛选和详情读取迁进新壳层。',
      'Keep the current logging and troubleshooting flow for now. Pagination, filtering, and detail reads move into the new shell in a later slice.',
      '#logs',
    ),
    placeholderRoute(
      '/notifications',
      '通知',
      'Notifications',
      '提醒和时间线会在后续切片里继续迁移，目前仍可通过正式控制台完成完整查看。',
      'Alerts and timeline views move over in a later slice. The production console still provides the full experience for now.',
      '#notifications',
    ),
    placeholderRoute(
      '/cron',
      'Cron',
      'Cron',
      '自动化任务编辑器还保留在正式控制台里，等工作区与排查视图稳定后再迁移。',
      'The automation editor remains in the production console for now and moves later once the workspace and troubleshooting views are stable.',
      '#cron',
    ),
    { path: '/ai', redirect: '/models' },
    { path: '/git-sync', redirect: '/recovery' },
    { path: '/memory', redirect: '/files' },
    { path: '/activity', redirect: '/notifications' },
    { path: '/costs', redirect: '/sessions' },
  ],
});
