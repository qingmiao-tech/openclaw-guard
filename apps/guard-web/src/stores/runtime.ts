import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import {
  clearStoredDesktopApiBaseUrl,
  getDefaultDesktopApiBaseUrl,
  getRuntimeMode,
  normalizeApiBaseUrl,
  openExternalUrl,
  readStoredDesktopApiBaseUrl,
  resolveApiRequestUrl,
  resolveRuntimeUrl,
  resolveSupportDocsUrl,
  writeStoredDesktopApiBaseUrl,
  type GuardRuntimeMode,
} from '@/services/runtime';

const PROBE_TIMEOUT_MS = 4_000;

async function probeGuardApi(baseUrl: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);

  try {
    const response = await fetch(resolveApiRequestUrl('/api/auth/status', baseUrl), {
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Guard 返回了 HTTP ${response.status}。`);
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('连接超时，请确认本地 Guard 已启动并可访问。');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export const useRuntimeStore = defineStore('runtime', () => {
  const ready = ref(false);
  const hydrating = ref(false);
  const checking = ref(false);
  const mode = ref<GuardRuntimeMode>('web');
  const defaultApiBaseUrl = ref(getDefaultDesktopApiBaseUrl());
  const apiBaseUrl = ref(defaultApiBaseUrl.value);
  const connected = ref(true);
  const connectionError = ref('');
  const docsUrl = ref(resolveSupportDocsUrl());
  const lastCheckedAt = ref<string | null>(null);

  const isDesktop = computed(() => mode.value === 'desktop');
  const canUseApi = computed(() => !isDesktop.value || connected.value);
  const requiresConnection = computed(() => isDesktop.value && !connected.value);

  function setApiBaseUrl(value: string, options: { persist?: boolean } = {}) {
    const normalized = normalizeApiBaseUrl(value || defaultApiBaseUrl.value);
    apiBaseUrl.value = normalized;
    if (isDesktop.value && options.persist !== false) {
      writeStoredDesktopApiBaseUrl(normalized);
    }
    return normalized;
  }

  function resetApiBaseUrl() {
    apiBaseUrl.value = defaultApiBaseUrl.value;
    if (isDesktop.value) {
      clearStoredDesktopApiBaseUrl();
    }
  }

  function resolveUrl(path: string): string {
    return resolveRuntimeUrl(path, isDesktop.value ? apiBaseUrl.value : undefined);
  }

  async function openSupportDocs() {
    await openExternalUrl(docsUrl.value);
  }

  async function probeConnection() {
    if (!isDesktop.value) {
      connected.value = true;
      connectionError.value = '';
      lastCheckedAt.value = new Date().toISOString();
      ready.value = true;
      hydrating.value = false;
      return true;
    }

    checking.value = true;
    try {
      const normalized = setApiBaseUrl(apiBaseUrl.value);
      await probeGuardApi(normalized);
      connected.value = true;
      connectionError.value = '';
      lastCheckedAt.value = new Date().toISOString();
      return true;
    } catch (error) {
      connected.value = false;
      connectionError.value = error instanceof Error ? error.message : String(error);
      lastCheckedAt.value = new Date().toISOString();
      return false;
    } finally {
      checking.value = false;
      ready.value = true;
      hydrating.value = false;
    }
  }

  async function hydrate() {
    if (hydrating.value || ready.value) {
      return;
    }

    hydrating.value = true;
    mode.value = getRuntimeMode();
    defaultApiBaseUrl.value = getDefaultDesktopApiBaseUrl();
    docsUrl.value = resolveSupportDocsUrl();
    apiBaseUrl.value = readStoredDesktopApiBaseUrl() || defaultApiBaseUrl.value;

    if (!isDesktop.value) {
      connected.value = true;
      connectionError.value = '';
      lastCheckedAt.value = new Date().toISOString();
      ready.value = true;
      hydrating.value = false;
      return;
    }

    await probeConnection();
  }

  return {
    ready,
    hydrating,
    checking,
    mode,
    defaultApiBaseUrl,
    apiBaseUrl,
    connected,
    connectionError,
    docsUrl,
    lastCheckedAt,
    isDesktop,
    canUseApi,
    requiresConnection,
    hydrate,
    probeConnection,
    setApiBaseUrl,
    resetApiBaseUrl,
    resolveUrl,
    openSupportDocs,
  };
});
