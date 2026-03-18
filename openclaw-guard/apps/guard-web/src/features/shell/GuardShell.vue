<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useFeedbackStore } from '@/stores/feedback';
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
const route = useRoute();
const router = useRouter();
const logoUrl = '/ui/logo.png';

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

const themeMenu: Array<{ value: ThemePreference; icon: string; zh: string; en: string }> = [
  { value: 'auto', icon: '⌘', zh: '跟随系统', en: 'Auto' },
  { value: 'light', icon: '☀', zh: '浅色', en: 'Light' },
  { value: 'dark', icon: '☾', zh: '深色', en: 'Dark' },
];

const themeIcon = computed(() => {
  if (ui.themePreference === 'light') return '☀';
  if (ui.themePreference === 'dark') return '☾';
  return '⌘';
});

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

onMounted(() => {
  ui.hydrate();
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
    message: ui.label('你已经退出新的模块化控制台。', 'You have signed out of the modular console.'),
  });
}
</script>

<template>
  <div class="guard-shell">
    <header class="guard-shell__topbar">
      <div class="brand-lockup">
        <img class="brand-lockup__logo" :src="logoUrl" alt="OpenClaw Guard" />
        <div>
          <p class="brand-lockup__eyebrow">OpenClaw Guard Next</p>
          <h1 class="brand-lockup__title">OpenClaw Guard</h1>
        </div>
      </div>

      <div class="topbar-actions">
        <div class="toolbar-menu">
          <button class="toolbar-icon" type="button" :title="ui.label('主题', 'Theme')">
            {{ themeIcon }}
          </button>
          <div class="toolbar-popover">
            <button
              v-for="option in themeMenu"
              :key="option.value"
              class="toolbar-popover__item"
              type="button"
              @click="ui.setThemePreference(option.value)"
            >
              <span>{{ option.icon }}</span>
              <span>{{ ui.label(option.zh, option.en) }}</span>
            </button>
          </div>
        </div>

        <div class="toolbar-menu">
          <button class="toolbar-icon" type="button" :title="ui.label('语言', 'Language')">
            🌐
          </button>
          <div class="toolbar-popover">
            <button class="toolbar-popover__item" type="button" @click="ui.setLanguage('zh')">
              <span>中</span>
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
            ⚙
          </button>
          <div class="toolbar-popover">
            <button class="toolbar-popover__item" type="button" @click="openSettings">
              <span>⟡</span>
              <span>{{ ui.label('设置', 'Settings') }}</span>
            </button>
            <button class="toolbar-popover__item" type="button" @click="auth.openChangePassword()">
              <span>🔑</span>
              <span>{{ ui.label('修改密码', 'Change password') }}</span>
            </button>
            <button class="toolbar-popover__item toolbar-popover__item--danger" type="button" @click="handleLogout">
              <span>↩</span>
              <span>{{ ui.label('退出登录', 'Sign out') }}</span>
            </button>
          </div>
        </div>

        <a class="toolbar-link" href="/legacy" target="_blank" rel="noreferrer">
          {{ ui.label('打开旧版控制台', 'Open legacy console') }}
        </a>
      </div>
    </header>

    <div class="guard-shell__body">
      <aside class="guard-shell__sidebar">
        <div class="sidebar-current">
          <p class="sidebar-current__label">{{ ui.label('当前页面', 'Current page') }}</p>
          <p class="sidebar-current__title">{{ activeLabel }}</p>
          <p class="sidebar-current__meta">
            {{ ui.label('这里是 dev-rust 分支上的模块化预览壳层。当前继续迁移真实业务页面，但不会替换正式运行时。', 'This is the modular preview shell on the dev-rust line. We keep migrating real product pages here without replacing the production runtime yet.') }}
          </p>
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
      </aside>

      <main class="guard-shell__content">
        <RouterView />
      </main>
    </div>
  </div>
</template>
