<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
const auth = useAuthStore();
const logoUrl = '/ui/logo.png';

const password = ref('');
const submitting = ref(false);
const errorMessage = ref('');

const helperText = computed(() => {
  if (!auth.initialPasswordAvailable) {
    return ui.label(
      '如果这是较早版本创建的环境，旧版本可能已经删掉了密码回看记录。',
      'If this environment was created by an older Guard version, the reveal record may already have been removed.',
    );
  }
  return ui.label(
    '如果忘记当前登录密码，可以在本机终端重新查看。',
    'If you forget the current password, you can reveal it again from a local terminal.',
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
          <p class="brand-lockup__eyebrow">OpenClaw Guard Next</p>
          <h1 class="brand-lockup__title">OpenClaw Guard</h1>
        </div>
      </div>

      <div class="login-card__copy">
        <p class="page-card__eyebrow">{{ ui.label('安全登录', 'Secure Sign-in') }}</p>
        <h2 class="page-card__title">{{ ui.label('输入本机访问密码', 'Enter the local access password') }}</h2>
        <p class="muted-copy">
          {{ ui.label('先完成登录，再进入新的模块化控制台。主题、语言和页面结构会沿用到后续生产替换。', 'Sign in first to enter the modular console. Theme, language, and structure here are the base for the production cutover.') }}
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
