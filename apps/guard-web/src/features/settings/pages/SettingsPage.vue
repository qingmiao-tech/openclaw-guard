<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import PageCard from '@/features/common/PageCard.vue';
import { useRuntimeStore } from '@/stores/runtime';
import { useUiStore, type LanguagePreference, type ThemePreference } from '@/stores/ui';

const ui = useUiStore();
const runtime = useRuntimeStore();
const desktopApiBaseDraft = ref(runtime.apiBaseUrl);

const themeOptions: Array<{
  value: ThemePreference;
  zh: string;
  en: string;
  descriptionZh: string;
  descriptionEn: string;
}> = [
  {
    value: 'auto',
    zh: '跟随系统',
    en: 'Auto',
    descriptionZh: '跟随当前设备的浅色或深色外观。',
    descriptionEn: 'Follow the current system light or dark appearance.',
  },
  {
    value: 'light',
    zh: '浅色',
    en: 'Light',
    descriptionZh: '适合白天工作或浅色背景下阅读。',
    descriptionEn: 'Best for daytime work and bright reading environments.',
  },
  {
    value: 'dark',
    zh: '深色',
    en: 'Dark',
    descriptionZh: '适合长时间盯屏或低光环境。',
    descriptionEn: 'Best for long sessions and low-light environments.',
  },
];

const languageOptions: Array<{
  value: LanguagePreference;
  zh: string;
  en: string;
  descriptionZh: string;
  descriptionEn: string;
}> = [
  {
    value: 'zh',
    zh: '中文',
    en: 'Chinese',
    descriptionZh: '默认面向中文使用者的完整文案。',
    descriptionEn: 'Full product copy tuned for Chinese-speaking operators.',
  },
  {
    value: 'en',
    zh: 'English',
    en: 'English',
    descriptionZh: '切到英文界面，便于国际协作或录屏演示。',
    descriptionEn: 'Switch to English for collaboration, demos, or documentation.',
  },
];

const developerSurfaces = [
  {
    zh: '日志页会显示完整原始输出，并恢复复制日志等排障动作。',
    en: 'Logs can show the full raw output and restore troubleshooting actions like copy.',
  },
  {
    zh: '恢复、安全、运维等页面会展示更多原始配置、诊断区和状态细节。',
    en: 'Recovery, security, and operations expose more raw configuration, diagnostics, and state detail.',
  },
  {
    zh: '后台刷新提示和调试信息会重新出现，更适合定位问题。',
    en: 'Background refresh hints and debugging details reappear for deeper troubleshooting.',
  },
];

const currentThemeLabel = computed(() => (
  ui.themePreference === 'auto'
    ? ui.label('跟随系统', 'Auto')
    : ui.themePreference === 'light'
      ? ui.label('浅色', 'Light')
      : ui.label('深色', 'Dark')
));

const currentLanguageLabel = computed(() => (
  ui.language === 'zh' ? '中文' : 'English'
));

const runtimeStatusLabel = computed(() => (
  runtime.connected
    ? ui.label('已连接', 'Connected')
    : ui.label('未连接', 'Offline')
));

async function saveDesktopConnection() {
  runtime.setApiBaseUrl(desktopApiBaseDraft.value);
  await runtime.probeConnection();
}

function resetDesktopConnection() {
  runtime.resetApiBaseUrl();
  desktopApiBaseDraft.value = runtime.defaultApiBaseUrl;
}
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('设置 / Local only', 'Settings / Local only') }}</p>
        <h2 class="page-header__title">{{ ui.label('本地偏好与开发者模式', 'Local preferences and developer mode') }}</h2>
        <p class="page-header__description">
          {{
            ui.label(
              '这些设置只保存在当前浏览器或桌面本地，用来调整控制台的显示、调试方式与桌面连接目标，不会直接改动 Guard 服务器。',
              'These preferences stay in the current browser or desktop shell. They shape the console experience and the desktop connection target without directly rewriting the Guard server.',
            )
          }}
        </p>
      </div>
    </header>

    <PageCard :title="ui.label('界面偏好', 'Interface preferences')" eyebrow="Preferences">
      <div class="settings-grid">
        <section class="settings-panel">
          <div class="settings-panel__header">
            <div>
              <strong>{{ ui.label('主题', 'Theme') }}</strong>
              <p>{{ ui.label('直接在这里切换外观，不用回到右上角菜单。', 'Change the appearance directly here without going back to the top-right menu.') }}</p>
            </div>
            <span class="pill pill--info">{{ currentThemeLabel }}</span>
          </div>
          <div class="settings-choice-grid">
            <button
              v-for="option in themeOptions"
              :key="option.value"
              class="settings-choice"
              :class="{ 'settings-choice--active': ui.themePreference === option.value }"
              type="button"
              @click="ui.setThemePreference(option.value)"
            >
              <strong>{{ ui.label(option.zh, option.en) }}</strong>
              <span>{{ ui.label(option.descriptionZh, option.descriptionEn) }}</span>
            </button>
          </div>
        </section>

        <section class="settings-panel">
          <div class="settings-panel__header">
            <div>
              <strong>{{ ui.label('语言', 'Language') }}</strong>
              <p>{{ ui.label('切换控制台显示语言，文案会立即生效。', 'Switch the console language here and apply the copy immediately.') }}</p>
            </div>
            <span class="pill pill--info">{{ currentLanguageLabel }}</span>
          </div>
          <div class="settings-choice-grid settings-choice-grid--compact">
            <button
              v-for="option in languageOptions"
              :key="option.value"
              class="settings-choice"
              :class="{ 'settings-choice--active': ui.language === option.value }"
              type="button"
              @click="ui.setLanguage(option.value)"
            >
              <strong>{{ ui.label(option.zh, option.en) }}</strong>
              <span>{{ ui.label(option.descriptionZh, option.descriptionEn) }}</span>
            </button>
          </div>
        </section>
      </div>
    </PageCard>

    <PageCard :title="ui.label('开发者模式', 'Developer mode')" eyebrow="Developer">
      <label class="settings-toggle">
        <div class="settings-toggle__copy">
          <strong>{{ ui.label('显示调试与原始视图', 'Show debug and raw views') }}</strong>
          <span>
            {{
              ui.label(
                '开启后会显示原始 JSON、诊断区和后台刷新提示，更适合排查接口、状态或配置问题。',
                'When enabled, the console reveals raw JSON, diagnostic sections, and background refresh hints so API, state, or configuration issues are easier to inspect.',
              )
            }}
          </span>
        </div>
        <input
          :checked="ui.developerMode"
          type="checkbox"
          @change="ui.setDeveloperMode(($event.target as HTMLInputElement).checked)"
        />
      </label>

      <div class="page-inline-status">
        <span class="pill" :class="ui.developerMode ? 'pill--warning' : 'pill--muted'">
          {{ ui.developerMode ? ui.label('当前已开启', 'Currently on') : ui.label('当前已关闭', 'Currently off') }}
        </span>
        <span class="pill pill--info">{{ ui.label('仅影响当前浏览器', 'Browser-local only') }}</span>
      </div>

      <ul class="settings-list">
        <li v-for="item in developerSurfaces" :key="item.en">
          {{ ui.label(item.zh, item.en) }}
        </li>
      </ul>

      <div class="settings-links">
        <RouterLink class="inline-link" to="/logs">{{ ui.label('去日志页查看原始输出', 'Open Logs for raw output') }}</RouterLink>
        <RouterLink class="inline-link" to="/recovery">{{ ui.label('去恢复页查看诊断区', 'Open Recovery diagnostics') }}</RouterLink>
        <RouterLink class="inline-link" to="/operations">{{ ui.label('去运维页检查运行状态', 'Open Operations status') }}</RouterLink>
      </div>

      <div class="settings-note">
        {{
          ui.label(
            '默认建议关闭，这样更适合普通使用。只在排障、校验接口返回，或者需要查看原始配置时再打开。',
            'Keep this off by default for a cleaner operator experience. Turn it on only when you need troubleshooting, raw API output, or configuration inspection.',
          )
        }}
      </div>
    </PageCard>

    <PageCard v-if="runtime.isDesktop" :title="ui.label('桌面连接设置', 'Desktop connection settings')" eyebrow="Desktop">
      <div class="settings-grid settings-grid--wide">
        <label class="settings-field settings-field--full">
          <span>{{ ui.label('Guard API 地址', 'Guard API base URL') }}</span>
          <input
            v-model="desktopApiBaseDraft"
            class="settings-input"
            type="text"
            spellcheck="false"
            :placeholder="runtime.defaultApiBaseUrl"
          />
          <small>
            {{
              ui.label(
                '桌面薄壳会把所有 /api/* 请求和控制台导航都指向这个地址。默认值是 http://127.0.0.1:18088。',
                'The desktop shell points /api/* requests and console navigation at this address. The default is http://127.0.0.1:18088.',
              )
            }}
          </small>
        </label>
      </div>

      <div class="page-inline-status">
        <span class="pill" :class="runtime.connected ? 'pill--success' : 'pill--warning'">
          {{ runtimeStatusLabel }}
        </span>
        <span class="pill pill--info">{{ runtime.apiBaseUrl }}</span>
      </div>

      <div class="settings-links">
        <button class="inline-link inline-link--primary" type="button" @click="saveDesktopConnection">
          {{ ui.label('保存并检测', 'Save and test') }}
        </button>
        <button class="inline-link" type="button" @click="runtime.probeConnection()">
          {{ ui.label('重新检测', 'Retry connection') }}
        </button>
        <button class="inline-link" type="button" @click="resetDesktopConnection">
          {{ ui.label('恢复默认地址', 'Reset to default') }}
        </button>
      </div>

      <div class="settings-note">
        {{
          ui.label(
            '桌面版第一阶段不会代你拉起 Guard 服务；如果这里显示未连接，请先在本机终端启动 Guard，再回来重试。',
            'The first desktop preview does not boot Guard for you. If this shows offline, start Guard in a local terminal first, then retry here.',
          )
        }}
      </div>
    </PageCard>
  </div>
</template>
