export type GuardRuntimeMode = 'web' | 'desktop';

export type GuardRuntimeBootstrap = {
  mode?: GuardRuntimeMode;
  defaultApiBaseUrl?: string;
  docsUrl?: string;
};

export const DESKTOP_API_BASE_STORAGE_KEY = 'openclaw-guard.desktop.api-base-url';

const DEFAULT_DESKTOP_API_BASE_URL = 'http://127.0.0.1:18088';
const DEFAULT_SUPPORT_DOCS_URL = 'https://qingmiao-tech.github.io/openclaw-guard/getting-started';

type TauriInvoke = <T = unknown>(command: string, args?: Record<string, unknown>) => Promise<T>;

type TauriInternalWindow = Window & {
  __TAURI_INTERNALS__?: {
    invoke?: TauriInvoke;
  };
};

function isAbsoluteHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function resolveExternalUrl(raw: string): string {
  if (isAbsoluteHttpUrl(raw)) {
    return raw;
  }
  if (typeof window === 'undefined') {
    return raw;
  }
  return new URL(raw, window.location.href).toString();
}

function getTauriInvoke(): TauriInvoke | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const invoke = (window as TauriInternalWindow).__TAURI_INTERNALS__?.invoke;
  return typeof invoke === 'function' ? invoke : null;
}

export function getRuntimeBootstrap(): GuardRuntimeBootstrap {
  if (typeof window === 'undefined') {
    return { mode: 'web' };
  }
  return window.__OPENCLAW_GUARD_RUNTIME__ || { mode: 'web' };
}

export function getRuntimeMode(): GuardRuntimeMode {
  return getRuntimeBootstrap().mode === 'desktop' ? 'desktop' : 'web';
}

export function getDefaultDesktopApiBaseUrl(): string {
  const candidate = getRuntimeBootstrap().defaultApiBaseUrl;
  if (!candidate) {
    return DEFAULT_DESKTOP_API_BASE_URL;
  }
  try {
    return normalizeApiBaseUrl(candidate);
  } catch {
    return DEFAULT_DESKTOP_API_BASE_URL;
  }
}

export function resolveSupportDocsUrl(): string {
  return getRuntimeBootstrap().docsUrl || DEFAULT_SUPPORT_DOCS_URL;
}

export function normalizeApiBaseUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) {
    return DEFAULT_DESKTOP_API_BASE_URL;
  }

  const candidate = isAbsoluteHttpUrl(trimmed) ? trimmed : `http://${trimmed}`;
  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    throw new Error('请输入有效的 http(s) 地址，例如 127.0.0.1:18088。');
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('目前只支持 http(s) 地址。');
  }

  parsed.hash = '';
  parsed.search = '';
  return trimTrailingSlash(parsed.toString());
}

export function readStoredDesktopApiBaseUrl(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const stored = window.localStorage.getItem(DESKTOP_API_BASE_STORAGE_KEY);
  if (!stored) {
    return null;
  }
  try {
    return normalizeApiBaseUrl(stored);
  } catch {
    return null;
  }
}

export function writeStoredDesktopApiBaseUrl(value: string) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(DESKTOP_API_BASE_STORAGE_KEY, normalizeApiBaseUrl(value));
}

export function clearStoredDesktopApiBaseUrl() {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem(DESKTOP_API_BASE_STORAGE_KEY);
}

function resolveDesktopApiBaseUrl(overrideBaseUrl?: string): string {
  return normalizeApiBaseUrl(
    overrideBaseUrl || readStoredDesktopApiBaseUrl() || getDefaultDesktopApiBaseUrl(),
  );
}

export function resolveRuntimeUrl(path: string, overrideBaseUrl?: string): string {
  if (isAbsoluteHttpUrl(path)) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (getRuntimeMode() !== 'desktop' && !overrideBaseUrl) {
    return normalizedPath;
  }

  const baseUrl = resolveDesktopApiBaseUrl(overrideBaseUrl);
  return new URL(normalizedPath, `${baseUrl}/`).toString();
}

export function resolveApiRequestUrl(path: string, overrideBaseUrl?: string): string {
  return resolveRuntimeUrl(path, overrideBaseUrl);
}

export async function openExternalUrl(raw: string): Promise<void> {
  const url = resolveExternalUrl(raw);
  if (getRuntimeMode() === 'desktop') {
    const invoke = getTauriInvoke();
    if (invoke) {
      await invoke('open_external_url', { url });
      return;
    }
  }

  if (typeof window === 'undefined') {
    return;
  }

  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) {
    window.location.assign(url);
  }
}
