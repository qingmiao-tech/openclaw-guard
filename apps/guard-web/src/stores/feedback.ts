import { ref } from 'vue';
import { defineStore } from 'pinia';

export type ToastTone = 'info' | 'success' | 'warning' | 'error';

export type ToastItem = {
  id: number;
  title?: string;
  message: string;
  tone: ToastTone;
};

export type ConfirmTone = 'default' | 'danger';

export type ConfirmRequest = {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  tone: ConfirmTone;
};

let toastSeed = 0;

export const useFeedbackStore = defineStore('feedback', () => {
  const toasts = ref<ToastItem[]>([]);
  const confirmRequest = ref<ConfirmRequest | null>(null);
  let confirmResolver: ((result: boolean) => void) | null = null;

  function pushToast(input: {
    title?: string;
    message: string;
    tone?: ToastTone;
    durationMs?: number;
  }) {
    const item: ToastItem = {
      id: ++toastSeed,
      title: input.title,
      message: input.message,
      tone: input.tone || 'info',
    };
    toasts.value.push(item);

    const duration = typeof input.durationMs === 'number' ? input.durationMs : 3600;
    if (typeof window !== 'undefined' && duration > 0) {
      window.setTimeout(() => dismissToast(item.id), duration);
    }

    return item.id;
  }

  function dismissToast(id: number) {
    toasts.value = toasts.value.filter((item) => item.id !== id);
  }

  function confirm(options: Partial<ConfirmRequest> & Pick<ConfirmRequest, 'title' | 'message'>) {
    if (confirmResolver) {
      confirmResolver(false);
      confirmResolver = null;
    }

    confirmRequest.value = {
      title: options.title,
      message: options.message,
      confirmLabel: options.confirmLabel || 'Confirm',
      cancelLabel: options.cancelLabel || 'Cancel',
      tone: options.tone || 'default',
    };

    return new Promise<boolean>((resolve) => {
      confirmResolver = resolve;
    });
  }

  function resolveConfirm(result: boolean) {
    const resolver = confirmResolver;
    confirmResolver = null;
    confirmRequest.value = null;
    resolver?.(result);
  }

  return {
    toasts,
    confirmRequest,
    pushToast,
    dismissToast,
    confirm,
    resolveConfirm,
  };
});
