<script setup lang="ts">
import PageCard from '@/features/common/PageCard.vue';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
</script>

<template>
  <div class="page-stack">
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ ui.label('Settings', 'Settings') }}</p>
        <h2 class="page-header__title">{{ ui.label('本地偏好与开发者模式', 'Local preferences and developer mode') }}</h2>
        <p class="page-header__description">
          {{ ui.label('这些设置只保存在当前浏览器里，不会改服务器，也不会影响其他使用者。', 'These preferences stay in the current browser only. They do not change the server and do not affect other users.') }}
        </p>
      </div>
    </header>

    <PageCard :title="ui.label('界面偏好', 'Interface preferences')" eyebrow="Preferences">
      <div class="settings-grid">
        <article class="settings-field">
          <div>
            <h3>{{ ui.label('主题', 'Theme') }}</h3>
            <p>{{ ui.label('当前控制台主题模式。', 'The current theme mode used by the console.') }}</p>
          </div>
          <strong class="settings-value">
            {{
              ui.themePreference === 'auto'
                ? ui.label('跟随系统', 'Auto')
                : ui.themePreference === 'light'
                  ? ui.label('浅色', 'Light')
                  : ui.label('深色', 'Dark')
            }}
          </strong>
        </article>

        <article class="settings-field">
          <div>
            <h3>{{ ui.label('语言', 'Language') }}</h3>
            <p>{{ ui.label('当前控制台显示语言。', 'The display language currently used by the console.') }}</p>
          </div>
          <strong class="settings-value">
            {{ ui.language === 'zh' ? '中文' : 'English' }}
          </strong>
        </article>
      </div>
    </PageCard>

    <PageCard :title="ui.label('开发者模式', 'Developer mode')" eyebrow="Developer">
      <label class="settings-toggle">
        <div class="settings-toggle__copy">
          <strong>{{ ui.label('显示调试与原始信息', 'Show debug and raw views') }}</strong>
          <span>
            {{ ui.label('开启后会显示原始 JSON、诊断区和后续的后台刷新提示，适合排查问题时使用。', 'When enabled, the console can reveal raw JSON, diagnostics, and future background refresh hints for troubleshooting.') }}
          </span>
        </div>
        <input
          :checked="ui.developerMode"
          type="checkbox"
          @change="ui.setDeveloperMode(($event.target as HTMLInputElement).checked)"
        />
      </label>

      <div class="settings-note">
        {{ ui.label('默认建议关闭，这样界面更适合普通使用。只有在排障或看原始配置时再打开。', 'Keep this off by default for a cleaner operator experience. Turn it on only when you need diagnostics or raw configuration views.') }}
      </div>
    </PageCard>
  </div>
</template>
