import { onMounted, ref } from 'vue';

type ExecuteOptions = {
  silent?: boolean;
};

export function useAsyncResource<T>(loader: () => Promise<T>, initialValue: T | null = null) {
  const data = ref<T | null>(initialValue);
  const loading = ref(initialValue === null);
  const refreshing = ref(false);
  const error = ref<string | null>(null);

  async function execute(options: ExecuteOptions = {}) {
    const silent = options.silent === true;
    if (silent) {
      refreshing.value = true;
    } else {
      loading.value = true;
    }
    error.value = null;
    try {
      data.value = await loader();
    } catch (loaderError) {
      error.value = loaderError instanceof Error ? loaderError.message : String(loaderError);
    } finally {
      loading.value = false;
      refreshing.value = false;
    }
  }

  onMounted(() => {
    void execute();
  });

  return {
    data,
    loading,
    refreshing,
    error,
    execute,
  };
}
