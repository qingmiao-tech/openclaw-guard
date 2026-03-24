import { fetchJson, postJson } from './client';

export type AuthStatus = {
  enabled: boolean;
  configured: boolean;
  initialPasswordAvailable: boolean;
  initialPasswordCreatedAt: string | null;
  revealCommand: string;
};

export type LoginResult = {
  success: boolean;
  token: string;
  expiresIn: number;
};

export type PasswordChangeResult = {
  success: boolean;
  error?: string;
};

export async function loadAuthStatus() {
  return fetchJson<AuthStatus>('/api/auth/status');
}

export async function validateCurrentSession() {
  return fetchJson<{ guardVersion?: string }>('/api/info');
}

export async function loginWithPassword(password: string) {
  return postJson<LoginResult>('/api/auth/login', { password });
}

export async function logoutCurrentSession() {
  return postJson<{ success: boolean }>('/api/auth/logout', {});
}

export async function changeGuardPassword(currentPassword: string, newPassword: string) {
  return postJson<PasswordChangeResult>('/api/auth/change-password', {
    currentPassword,
    newPassword,
  });
}
