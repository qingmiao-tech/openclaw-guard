const STORAGE_AUTH_TOKEN = 'openclaw-guard.auth-token';
const AUTH_UNAUTHORIZED_EVENT = 'openclaw-guard:unauthorized';

export function getStoredAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(STORAGE_AUTH_TOKEN);
}

export function setStoredAuthToken(token: string) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(STORAGE_AUTH_TOKEN, token);
}

export function clearStoredAuthToken() {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem(STORAGE_AUTH_TOKEN);
}

export function dispatchUnauthorizedEvent() {
  if (typeof window === 'undefined') {
    return;
  }
  window.dispatchEvent(new CustomEvent(AUTH_UNAUTHORIZED_EVENT));
}

export function subscribeUnauthorized(handler: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined;
  }
  window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handler);
  return () => window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handler);
}
