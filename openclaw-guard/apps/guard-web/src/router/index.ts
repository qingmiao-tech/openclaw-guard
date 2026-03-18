import { createRouter, createWebHashHistory } from 'vue-router';
import ChannelsPage from '@/features/channels/pages/ChannelsPage.vue';
import CronPage from '@/features/cron/pages/CronPage.vue';
import DashboardPage from '@/features/dashboard/pages/DashboardPage.vue';
import FilesPage from '@/features/files/pages/FilesPage.vue';
import LogsPage from '@/features/logs/pages/LogsPage.vue';
import ModelsPage from '@/features/models/pages/ModelsPage.vue';
import NotificationsPage from '@/features/notifications/pages/NotificationsPage.vue';
import OpenClawPage from '@/features/openclaw/pages/OpenClawPage.vue';
import OperationsPage from '@/features/operations/pages/OperationsPage.vue';
import RecoveryPage from '@/features/recovery/pages/RecoveryPage.vue';
import RolesPage from '@/features/roles/pages/RolesPage.vue';
import SearchPage from '@/features/search/pages/SearchPage.vue';
import SecurityPage from '@/features/security/pages/SecurityPage.vue';
import SessionsPage from '@/features/sessions/pages/SessionsPage.vue';
import SettingsPage from '@/features/settings/pages/SettingsPage.vue';

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
    { path: '/logs', name: 'logs', component: LogsPage },
    { path: '/notifications', name: 'notifications', component: NotificationsPage },
    { path: '/cron', name: 'cron', component: CronPage },
    { path: '/settings', name: 'settings', component: SettingsPage },
    { path: '/ai', redirect: '/models' },
    { path: '/git-sync', redirect: '/recovery' },
    { path: '/memory', redirect: '/files' },
    { path: '/activity', redirect: '/notifications' },
    { path: '/costs', redirect: '/sessions' },
  ],
});
