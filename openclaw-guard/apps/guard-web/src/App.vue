<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import ChangePasswordDialog from '@/features/auth/ChangePasswordDialog.vue';
import LoginPage from '@/features/auth/LoginPage.vue';
import ConfirmDialog from '@/features/common/ConfirmDialog.vue';
import ToastViewport from '@/features/common/ToastViewport.vue';
import GuardShell from '@/features/shell/GuardShell.vue';
import { subscribeUnauthorized } from '@/services/auth-session';
import { useAuthStore } from '@/stores/auth';
import { useFeedbackStore } from '@/stores/feedback';
import { useUiStore } from '@/stores/ui';

const auth = useAuthStore();
const feedback = useFeedbackStore();
const ui = useUiStore();

let unsubscribeUnauthorized = () => undefined;

onMounted(() => {
  void auth.hydrate();
  unsubscribeUnauthorized = subscribeUnauthorized(() => {
    auth.handleUnauthorized();
    feedback.pushToast({
      tone: 'warning',
      title: ui.label('登录已失效', 'Session expired'),
      message: ui.label('请重新登录后继续使用新的模块化控制台。', 'Sign in again to keep using the modular console.'),
    });
  });
});

onBeforeUnmount(() => {
  unsubscribeUnauthorized();
});
</script>

<template>
  <div v-if="!auth.ready" class="shell-loading">
    <div class="page-empty shell-loading__card">
      Loading Guard Next…
    </div>
  </div>
  <LoginPage v-else-if="auth.requiresLogin" />
  <GuardShell v-else />
  <ToastViewport />
  <ConfirmDialog />
  <ChangePasswordDialog />
</template>
