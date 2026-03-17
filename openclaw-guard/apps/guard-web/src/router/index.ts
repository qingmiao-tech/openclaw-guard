import { createRouter, createWebHashHistory } from 'vue-router';
import DashboardPage from '@/features/dashboard/pages/DashboardPage.vue';
import OpenClawPage from '@/features/openclaw/pages/OpenClawPage.vue';
import OperationsPage from '@/features/operations/pages/OperationsPage.vue';
import PlaceholderPage from '@/features/placeholder/pages/PlaceholderPage.vue';

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
    placeholderRoute('/channels', '渠道', 'Channels', '对接官方渠道与后续扩展入口。', 'Connect official channels and future extensions.', '#channels'),
    placeholderRoute('/models', '模型', 'Models', '配置模型提供方、主模型与回退策略。', 'Configure model providers, primary routing, and fallbacks.', '#models'),
    placeholderRoute('/security', '安全', 'Security', '查看权限模式、安全检查与主机加固建议。', 'Review permission modes, security checks, and hardening guidance.', '#security'),
    placeholderRoute('/recovery', '备份与恢复', 'Backup & Recovery', '管理恢复点、保护状态与高级 Git 能力。', 'Manage recovery points, protection status, and advanced Git controls.', '#recovery'),
    placeholderRoute('/roles', '角色', 'Roles', '浏览角色配置与工作区角色视图。', 'Browse role definitions and workspace role views.', '#agents'),
    placeholderRoute('/files', '文件', 'Files', '管理记忆、文件与当前工作区内容。', 'Manage memory files, documents, and workspace content.', '#files'),
    placeholderRoute('/search', '搜索', 'Search', '统一搜索工作区中的关键资料与记忆。', 'Search across workspace documents and memory files.', '#search'),
    placeholderRoute('/sessions', '会话', 'Sessions', '查看会话状态与用量估算。', 'Inspect session health and usage estimates.', '#sessions'),
    placeholderRoute('/logs', '日志', 'Logs', '聚合查看运行日志与排障信息。', 'Inspect runtime logs and troubleshooting output.', '#logs'),
    placeholderRoute('/notifications', '通知', 'Notifications', '查看提醒与时间线事件。', 'Review alerts and timeline activity.', '#notifications'),
    placeholderRoute('/cron', 'Cron', 'Cron', '管理自动化任务与定时执行计划。', 'Manage automation tasks and scheduled execution.', '#cron'),
    { path: '/ai', redirect: '/models' },
    { path: '/git-sync', redirect: '/recovery' },
    { path: '/memory', redirect: '/files' },
    { path: '/activity', redirect: '/notifications' },
    { path: '/costs', redirect: '/sessions' },
  ],
});
