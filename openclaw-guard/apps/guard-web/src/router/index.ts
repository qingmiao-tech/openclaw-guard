import { createRouter, createWebHashHistory } from 'vue-router';
import DashboardPage from '@/features/dashboard/pages/DashboardPage.vue';
import ChannelsPage from '@/features/channels/pages/ChannelsPage.vue';
import ModelsPage from '@/features/models/pages/ModelsPage.vue';
import OpenClawPage from '@/features/openclaw/pages/OpenClawPage.vue';
import OperationsPage from '@/features/operations/pages/OperationsPage.vue';
import PlaceholderPage from '@/features/placeholder/pages/PlaceholderPage.vue';
import RecoveryPage from '@/features/recovery/pages/RecoveryPage.vue';
import SecurityPage from '@/features/security/pages/SecurityPage.vue';

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
    placeholderRoute('/roles', '角色', 'Roles', '浏览角色配置与工作区角色视图。', 'Browse role definitions and workspace role views.', '#agents'),
    placeholderRoute('/files', '文件', 'Files', '管理记忆、文件与当前工作区内容。', 'Manage memory files, documents, and workspace content.', '#files'),
    placeholderRoute('/search', '搜索', 'Search', '统一搜索工作区中的关键信息与记忆。', 'Search across workspace documents and memory files.', '#search'),
    placeholderRoute('/sessions', '会话', 'Sessions', '查看会话状态与用量估算。', 'Inspect session health and usage estimates.', '#sessions'),
    placeholderRoute('/logs', '日志', 'Logs', '查看运行日志与排障信息。', 'Inspect runtime logs and troubleshooting output.', '#logs'),
    placeholderRoute('/notifications', '通知', 'Notifications', '查看提醒与时间线事件。', 'Review alerts and timeline activity.', '#notifications'),
    placeholderRoute('/cron', 'Cron', 'Cron', '管理自动化任务与定时执行计划。', 'Manage automation tasks and scheduled execution.', '#cron'),
    { path: '/ai', redirect: '/models' },
    { path: '/git-sync', redirect: '/recovery' },
    { path: '/memory', redirect: '/files' },
    { path: '/activity', redirect: '/notifications' },
    { path: '/costs', redirect: '/sessions' },
  ],
});
