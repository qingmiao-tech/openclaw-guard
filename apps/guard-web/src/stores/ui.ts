import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export type ThemePreference = 'auto' | 'light' | 'dark';
export type LanguagePreference = 'zh' | 'en';

const STORAGE_THEME = 'openclaw-guard.theme';
const STORAGE_LANG = 'openclaw-guard.lang';

function getSystemTheme(): Exclude<ThemePreference, 'auto'> {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export const useUiStore = defineStore('ui', () => {
  const themePreference = ref<ThemePreference>('auto');
  const language = ref<LanguagePreference>('zh');
  const hydrated = ref(false);
  const resolvedTheme = computed(() => themePreference.value === 'auto' ? getSystemTheme() : themePreference.value);

  function applyDocumentState() {
    if (typeof document === 'undefined') {
      return;
    }
    document.documentElement.dataset.theme = resolvedTheme.value;
    document.documentElement.lang = language.value === 'zh' ? 'zh-CN' : 'en';
  }

  function hydrate() {
    if (hydrated.value || typeof window === 'undefined') {
      applyDocumentState();
      return;
    }
    const storedTheme = window.localStorage.getItem(STORAGE_THEME);
    const storedLanguage = window.localStorage.getItem(STORAGE_LANG);
    if (storedTheme === 'auto' || storedTheme === 'light' || storedTheme === 'dark') {
      themePreference.value = storedTheme;
    }
    if (storedLanguage === 'zh' || storedLanguage === 'en') {
      language.value = storedLanguage;
    }
    hydrated.value = true;
    applyDocumentState();
  }

  function setThemePreference(value: ThemePreference) {
    themePreference.value = value;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_THEME, value);
    }
    applyDocumentState();
  }

  function setLanguage(value: LanguagePreference) {
    language.value = value;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_LANG, value);
    }
    applyDocumentState();
  }

  function label(zh: string, en: string) {
    return language.value === 'zh' ? zh : en;
  }

  return {
    themePreference,
    language,
    resolvedTheme,
    hydrate,
    setThemePreference,
    setLanguage,
    applyDocumentState,
    label,
  };
});
