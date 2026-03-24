<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRuntimeStore } from '@/stores/runtime';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
const auth = useAuthStore();
const runtime = useRuntimeStore();
const logoUrl = computed(() => runtime.resolveUrl('/ui/logo.png'));

const password = ref('');
const submitting = ref(false);
const errorMessage = ref('');

const helperText = computed(() => {
  if (!auth.initialPasswordAvailable) {
    return ui.label(
      '如果这是较早版本初始化的环境，密码回看记录可能已经不存在；这时请直接使用你当前设置过的密码。',
      'If this environment was initialized by an older version, the password reveal record may no longer exist. In that case, use the current password you already set.',
    );
  }
  return ui.label(
    '如果你忘了当前密码，可以在同一台机器的本地终端重新回看。',
    'If you forget the current password, you can reveal it again from a local terminal on the same machine.',
  );
});

async function submit() {
  if (!password.value.trim()) {
    errorMessage.value = ui.label('请输入访问密码。', 'Enter the access password.');
    return;
  }

  submitting.value = true;
  errorMessage.value = '';
  try {
    await auth.login(password.value.trim());
    password.value = '';
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error);
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="login-screen">
    <section class="login-card">
      <div class="login-card__brand">
        <img class="login-card__logo" :src="logoUrl" alt="OpenClaw Guard" />
        <div>
          <p class="brand-lockup__eyebrow">{{ ui.label('安全控制台', 'Security console') }}</p>
          <h1 class="brand-lockup__title">OpenClaw Guard</h1>
        </div>
      </div>

      <div class="login-card__copy">
        <p class="page-card__eyebrow">{{ ui.label('安全登录', 'Secure sign-in') }}</p>
        <h2 class="page-card__title">{{ ui.label('输入本机访问密码', 'Enter the local access password') }}</h2>
        <p class="muted-copy">
          {{
            ui.label(
              '登录后即可进入当前默认控制台。主题、语言、开发者模式等本地偏好会继续保留。',
              'Sign in to enter the default Guard console. Theme, language, and developer-mode preferences stay local to this device.',
            )
          }}
        </p>
        <p v-if="runtime.isDesktop" class="muted-copy">
          {{ ui.label('当前连接地址：', 'Current target: ') }}<code>{{ runtime.apiBaseUrl }}</code>
        </p>
      </div>

      <form class="login-form" @submit.prevent="submit">
        <label class="field-stack">
          <span>{{ ui.label('访问密码', 'Access password') }}</span>
          <input
            v-model="password"
            class="input-field"
            type="password"
            autocomplete="current-password"
            :placeholder="ui.label('请输入 Guard 登录密码', 'Enter the Guard password')"
          />
        </label>

        <p class="login-note">
          {{ helperText }}
        </p>

        <div v-if="auth.initialPasswordAvailable" class="login-command">
          <span>{{ ui.label('回看命令', 'Reveal command') }}</span>
          <code>{{ auth.revealCommand }}</code>
        </div>

        <p v-if="errorMessage" class="login-error">{{ errorMessage }}</p>

        <button class="inline-link inline-link--primary login-submit" type="submit" :disabled="submitting">
          {{ submitting ? ui.label('登录中…', 'Signing in…') : ui.label('进入控制台', 'Open console') }}
        </button>
      </form>
    </section>
  </div>
</template>
