import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import {
  changeGuardPassword,
  loadAuthStatus,
  loginWithPassword,
  logoutCurrentSession,
  validateCurrentSession,
} from '@/services/api/auth';
import {
  clearStoredAuthToken,
  getStoredAuthToken,
  setStoredAuthToken,
} from '@/services/auth-session';

export const useAuthStore = defineStore('auth', () => {
  const ready = ref(false);
  const bootstrapping = ref(false);
  const authEnabled = ref(true);
  const configured = ref(false);
  const initialPasswordAvailable = ref(false);
  const initialPasswordCreatedAt = ref<string | null>(null);
  const revealCommand = ref('openclaw-guard auth show-password');
  const authenticated = ref(false);
  const changePasswordOpen = ref(false);

  const requiresLogin = computed(() => ready.value && authEnabled.value && !authenticated.value);

  function clearSession() {
    clearStoredAuthToken();
    authenticated.value = false;
    changePasswordOpen.value = false;
  }

  async function hydrate() {
    if (bootstrapping.value || ready.value) {
      return;
    }
    bootstrapping.value = true;
    try {
      const status = await loadAuthStatus();
      authEnabled.value = status.enabled;
      configured.value = status.configured;
      initialPasswordAvailable.value = status.initialPasswordAvailable;
      initialPasswordCreatedAt.value = status.initialPasswordCreatedAt;
      revealCommand.value = status.revealCommand || revealCommand.value;

      if (!status.enabled) {
        authenticated.value = true;
        return;
      }

      const token = getStoredAuthToken();
      if (!token) {
        clearSession();
        return;
      }

      try {
        await validateCurrentSession();
        authenticated.value = true;
      } catch {
        clearSession();
      }
    } finally {
      ready.value = true;
      bootstrapping.value = false;
    }
  }

  async function login(password: string) {
    const result = await loginWithPassword(password);
    if (result.token) {
      setStoredAuthToken(result.token);
      authenticated.value = true;
    }
    return result;
  }

  async function logout() {
    try {
      await logoutCurrentSession();
    } catch {
      // Best effort logout: the local session should still be cleared.
    } finally {
      clearSession();
    }
  }

  async function changePassword(currentPassword: string, newPassword: string) {
    const result = await changeGuardPassword(currentPassword, newPassword);
    if (!result.success) {
      throw new Error(result.error || 'Password update failed');
    }
    clearSession();
    return result;
  }

  function openChangePassword() {
    changePasswordOpen.value = true;
  }

  function closeChangePassword() {
    changePasswordOpen.value = false;
  }

  function handleUnauthorized() {
    if (authEnabled.value) {
      clearSession();
    }
  }

  return {
    ready,
    bootstrapping,
    authEnabled,
    configured,
    initialPasswordAvailable,
    initialPasswordCreatedAt,
    revealCommand,
    authenticated,
    requiresLogin,
    changePasswordOpen,
    hydrate,
    login,
    logout,
    changePassword,
    openChangePassword,
    closeChangePassword,
    handleUnauthorized,
  };
});
