<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useFeedbackStore } from '@/stores/feedback';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
const auth = useAuthStore();
const feedback = useFeedbackStore();

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const pending = ref(false);
const errorMessage = ref('');

function resetForm() {
  currentPassword.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
  errorMessage.value = '';
  pending.value = false;
}

function closeDialog() {
  resetForm();
  auth.closeChangePassword();
}

async function submit() {
  if (!currentPassword.value || !newPassword.value) {
    errorMessage.value = ui.label('请先填写当前密码和新密码。', 'Enter the current password and the new password first.');
    return;
  }
  if (newPassword.value.length < 6) {
    errorMessage.value = ui.label('新密码至少需要 6 位。', 'The new password must be at least 6 characters long.');
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = ui.label('两次输入的新密码不一致。', 'The new passwords do not match.');
    return;
  }

  pending.value = true;
  errorMessage.value = '';
  try {
    await auth.changePassword(currentPassword.value, newPassword.value);
    closeDialog();
    feedback.pushToast({
      tone: 'success',
      title: ui.label('密码已更新', 'Password updated'),
      message: ui.label('当前会话已失效，请使用新密码重新登录。', 'The current session has been cleared. Sign in again with the new password.'),
    });
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error);
    pending.value = false;
  }
}
</script>

<template>
  <div v-if="auth.changePasswordOpen" class="confirm-backdrop" @click.self="closeDialog">
    <section class="confirm-dialog auth-dialog">
      <header class="confirm-dialog__header">
        <p class="page-card__eyebrow">{{ ui.label('账号安全', 'Account security') }}</p>
        <h2 class="page-card__title">{{ ui.label('修改访问密码', 'Change access password') }}</h2>
      </header>

      <div class="auth-dialog__body">
        <label class="field-stack">
          <span>{{ ui.label('当前密码', 'Current password') }}</span>
          <input v-model="currentPassword" class="input-field" type="password" autocomplete="current-password" />
        </label>

        <label class="field-stack">
          <span>{{ ui.label('新密码', 'New password') }}</span>
          <input v-model="newPassword" class="input-field" type="password" autocomplete="new-password" />
        </label>

        <label class="field-stack">
          <span>{{ ui.label('确认新密码', 'Confirm new password') }}</span>
          <input v-model="confirmPassword" class="input-field" type="password" autocomplete="new-password" />
        </label>

        <p class="login-note">
          {{ ui.label('修改成功后，Guard 会自动让当前登录会话失效，防止旧凭证继续可用。', 'After the password changes, Guard automatically invalidates the current session so the old credential cannot keep running.') }}
        </p>

        <p v-if="errorMessage" class="login-error">{{ errorMessage }}</p>
      </div>

      <footer class="confirm-dialog__footer">
        <button class="inline-link" type="button" @click="closeDialog">
          {{ ui.label('取消', 'Cancel') }}
        </button>
        <button class="inline-link inline-link--primary" type="button" :disabled="pending" @click="submit">
          {{ pending ? ui.label('更新中…', 'Updating…') : ui.label('确认修改', 'Update password') }}
        </button>
      </footer>
    </section>
  </div>
</template>
