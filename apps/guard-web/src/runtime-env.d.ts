import type { GuardRuntimeBootstrap } from '@/services/runtime';

declare global {
  interface Window {
    __OPENCLAW_GUARD_RUNTIME__?: GuardRuntimeBootstrap;
  }
}

export {};
