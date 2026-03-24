<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue';
import ChangePasswordDialog from '@/features/auth/ChangePasswordDialog.vue';
import LoginPage from '@/features/auth/LoginPage.vue';
import ConfirmDialog from '@/features/common/ConfirmDialog.vue';
import ToastViewport from '@/features/common/ToastViewport.vue';
import DesktopConnectionPage from '@/features/runtime/DesktopConnectionPage.vue';
import GuardShell from '@/features/shell/GuardShell.vue';
import { subscribeUnauthorized } from '@/services/auth-session';
import { useAuthStore } from '@/stores/auth';
import { useFeedbackStore } from '@/stores/feedback';
import { useRuntimeStore } from '@/stores/runtime';
import { useUiStore } from '@/stores/ui';

const auth = useAuthStore();
const feedback = useFeedbackStore();
const runtime = useRuntimeStore();
const ui = useUiStore();

let unsubscribeUnauthorized = () => undefined;

onMounted(() => {
  ui.hydrate();
  void runtime.hydrate();
  unsubscribeUnauthorized = subscribeUnauthorized(() => {
    auth.handleUnauthorized();
    feedback.pushToast({
      tone: 'warning',
      title: ui.label('登录已失效', 'Session expired'),
      message: ui.label('请重新登录后继续使用 Guard 控制台。', 'Sign in again to keep using Guard.'),
    });
  });
});

onBeforeUnmount(() => {
  unsubscribeUnauthorized();
});

watch(
  [() => runtime.ready, () => runtime.canUseApi],
  ([ready, canUseApi]) => {
    if (ready && canUseApi) {
      void auth.hydrate();
    }
  },
  { immediate: true },
);
</script>

<template>
  <div v-if="!runtime.ready || (runtime.requiresConnection && runtime.checking)" class="shell-loading">
    <div class="page-empty shell-loading__card">
      {{ ui.label('正在准备 Guard 控制台…', 'Preparing Guard…') }}
    </div>
  </div>
  <DesktopConnectionPage v-else-if="runtime.requiresConnection" />
  <div v-else-if="!auth.ready" class="shell-loading">
    <div class="page-empty shell-loading__card">
      {{ ui.label('正在同步认证状态…', 'Checking authentication…') }}
    </div>
  </div>
  <LoginPage v-else-if="auth.requiresLogin" />
  <GuardShell v-else />
  <ToastViewport />
  <ConfirmDialog />
  <ChangePasswordDialog />
</template>
