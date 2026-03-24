<script setup lang="ts">
import { computed, watch } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useFeedbackStore } from '@/stores/feedback';
import { useRuntimeStore } from '@/stores/runtime';
import { useUiStore, type ThemePreference } from '@/stores/ui';

type NavItem = {
  to: string;
  zh: string;
  en: string;
};

type NavGroup = {
  id: string;
  zh: string;
  en: string;
  items: NavItem[];
};

type HiddenRouteLabel = {
  zh: string;
  en: string;
};

const ui = useUiStore();
const auth = useAuthStore();
const feedback = useFeedbackStore();
const runtime = useRuntimeStore();
const route = useRoute();
const router = useRouter();

const logoUrl = computed(() => runtime.resolveUrl('/ui/logo.png'));
const legacyUrl = computed(() => runtime.resolveUrl('/legacy'));
const languageButtonLabel = computed(() => (ui.language === 'zh' ? 'ZH' : 'EN'));

const navGroups: NavGroup[] = [
  {
    id: 'core',
    zh: '核心控制台',
    en: 'Core Control',
    items: [
      { to: '/', zh: '首页', en: 'Home' },
      { to: '/operations', zh: '运维', en: 'Operations' },
      { to: '/openclaw', zh: 'OpenClaw', en: 'OpenClaw' },
      { to: '/channels', zh: '渠道', en: 'Channels' },
      { to: '/models', zh: '模型', en: 'Models' },
      { to: '/security', zh: '安全', en: 'Security' },
      { to: '/recovery', zh: '备份与恢复', en: 'Backup & Recovery' },
    ],
  },
  {
    id: 'workspace',
    zh: '工作区与角色',
    en: 'Workspace & Roles',
    items: [
      { to: '/roles', zh: '角色', en: 'Roles' },
      { to: '/files', zh: '文件', en: 'Files' },
      { to: '/search', zh: '搜索', en: 'Search' },
    ],
  },
  {
    id: 'runtime',
    zh: '运行与排查',
    en: 'Runtime & Troubleshooting',
    items: [
      { to: '/sessions', zh: '会话', en: 'Sessions' },
      { to: '/logs', zh: '日志', en: 'Logs' },
      { to: '/notifications', zh: '通知', en: 'Notifications' },
    ],
  },
  {
    id: 'automation',
    zh: '自动化',
    en: 'Automation',
    items: [
      { to: '/cron', zh: 'Cron', en: 'Cron' },
    ],
  },
];

const hiddenRouteLabels: Record<string, HiddenRouteLabel> = {
  '/settings': { zh: '设置', en: 'Settings' },
};

const themeMenu: Array<{ value: ThemePreference; shortLabel: string; zh: string; en: string }> = [
  { value: 'auto', shortLabel: 'Auto', zh: '跟随系统', en: 'Auto' },
  { value: 'light', shortLabel: 'Light', zh: '浅色', en: 'Light' },
  { value: 'dark', shortLabel: 'Dark', zh: '深色', en: 'Dark' },
];

const themeButtonLabel = computed(() => themeMenu.find((item) => item.value === ui.themePreference)?.shortLabel || 'Auto');

const activeLabel = computed(() => {
  const item = navGroups.flatMap((group) => group.items).find((entry) => entry.to === route.path);
  if (item) {
    return ui.label(item.zh, item.en);
  }
  const hiddenRoute = hiddenRouteLabels[route.path];
  if (hiddenRoute) {
    return ui.label(hiddenRoute.zh, hiddenRoute.en);
  }
  return ui.label('首页', 'Home');
});

watch(() => ui.themePreference, () => ui.applyDocumentState());
watch(() => ui.language, () => ui.applyDocumentState());
watch(() => ui.developerMode, () => ui.applyDocumentState());

function openSettings() {
  void router.push('/settings');
}

async function handleLogout() {
  const confirmed = await feedback.confirm({
    title: ui.label('退出当前登录？', 'Sign out of the current session?'),
    message: ui.label('退出后需要重新输入本机访问密码。', 'You will need the local access password to sign in again.'),
    confirmLabel: ui.label('退出登录', 'Sign out'),
    cancelLabel: ui.label('取消', 'Cancel'),
  });
  if (!confirmed) {
    return;
  }
  await auth.logout();
  feedback.pushToast({
    tone: 'success',
    title: ui.label('已退出登录', 'Signed out'),
    message: ui.label('你已经退出 Guard 控制台。', 'You have signed out of Guard.'),
  });
}
</script>

<template>
  <div class="guard-shell">
    <header class="guard-shell__topbar">
      <div class="brand-lockup">
        <img class="brand-lockup__logo" :src="logoUrl" alt="OpenClaw Guard" />
        <div>
          <p class="brand-lockup__eyebrow">{{ ui.label('安全控制台', 'Security Console') }}</p>
          <h1 class="brand-lockup__title">OpenClaw Guard</h1>
        </div>
      </div>

      <div class="topbar-actions">
        <div class="toolbar-menu">
          <button class="toolbar-icon" type="button" :title="ui.label('主题', 'Theme')">
            {{ themeButtonLabel }}
          </button>
          <div class="toolbar-popover">
            <button
              v-for="option in themeMenu"
              :key="option.value"
              class="toolbar-popover__item"
              type="button"
              @click="ui.setThemePreference(option.value)"
            >
              <span>{{ ui.label(option.zh, option.en) }}</span>
            </button>
          </div>
        </div>

        <div class="toolbar-menu">
          <button class="toolbar-icon" type="button" :title="ui.label('语言', 'Language')">
            {{ languageButtonLabel }}
          </button>
          <div class="toolbar-popover">
            <button class="toolbar-popover__item" type="button" @click="ui.setLanguage('zh')">
              <span>ZH</span>
              <span>中文</span>
            </button>
            <button class="toolbar-popover__item" type="button" @click="ui.setLanguage('en')">
              <span>EN</span>
              <span>English</span>
            </button>
          </div>
        </div>

        <div v-if="auth.authEnabled && auth.authenticated" class="toolbar-menu">
          <button class="toolbar-icon" type="button" :title="ui.label('账号', 'Account')">
            Me
          </button>
          <div class="toolbar-popover">
            <button class="toolbar-popover__item" type="button" @click="openSettings">
              <span>{{ ui.label('设置', 'Settings') }}</span>
            </button>
            <button class="toolbar-popover__item" type="button" @click="auth.openChangePassword()">
              <span>{{ ui.label('修改密码', 'Change password') }}</span>
            </button>
            <button class="toolbar-popover__item toolbar-popover__item--danger" type="button" @click="handleLogout">
              <span>{{ ui.label('退出登录', 'Sign out') }}</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="guard-shell__body">
      <aside class="guard-shell__sidebar">
        <div class="sidebar-current">
          <p class="sidebar-current__label">{{ ui.label('当前页面', 'Current page') }}</p>
          <p class="sidebar-current__title">{{ activeLabel }}</p>
          <p class="sidebar-current__meta">
            {{
              ui.label(
                '在这里集中处理运维、OpenClaw、渠道、安全和恢复。默认入口已经切到这套模块化控制台。',
                'Manage operations, OpenClaw, channels, security, and recovery from one place. This modular console is now the default entry.',
              )
            }}
          </p>
          <div class="page-inline-status">
            <span v-if="runtime.isDesktop" class="pill pill--info">
              {{ ui.label('桌面薄壳', 'Desktop thin shell') }}
            </span>
            <span v-if="runtime.isDesktop" class="pill" :class="runtime.connected ? 'pill--success' : 'pill--warning'">
              {{ runtime.connected ? ui.label('已连接 Guard', 'Guard connected') : ui.label('Guard 未连接', 'Guard offline') }}
            </span>
          </div>
        </div>

        <nav class="sidebar-nav">
          <section v-for="group in navGroups" :key="group.id" class="sidebar-group">
            <p class="sidebar-group__title">{{ ui.label(group.zh, group.en) }}</p>
            <RouterLink
              v-for="item in group.items"
              :key="item.to"
              :to="item.to"
              class="sidebar-link"
              :class="{ 'sidebar-link--active': route.path === item.to }"
            >
              {{ ui.label(item.zh, item.en) }}
            </RouterLink>
          </section>
        </nav>

        <div class="sidebar-footer">
          <p class="sidebar-footer__hint">
            {{
              ui.label(
                '日常工作都留在这里完成。本地偏好、开发者模式和桌面连接设置都集中在 Settings。',
                'Stay here for day-to-day work. Local preferences, developer mode, and desktop connection settings live in Settings.',
              )
            }}
          </p>
          <div class="sidebar-footer__actions">
            <RouterLink class="sidebar-footer__link" to="/settings">
              {{ ui.label('打开本地设置', 'Open local settings') }}
            </RouterLink>
            <a v-if="ui.developerMode" class="sidebar-footer__link sidebar-footer__link--muted" :href="legacyUrl" target="_blank" rel="noreferrer">
              {{ ui.label('开发者回退到 legacy', 'Open legacy rollback in developer mode') }}
            </a>
          </div>
        </div>
      </aside>

      <main class="guard-shell__content">
        <RouterView />
      </main>
    </div>
  </div>
</template>
