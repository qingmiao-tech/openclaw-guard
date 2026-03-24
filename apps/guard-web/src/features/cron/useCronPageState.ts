import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useAsyncResource } from '@/composables/useAsyncResource';
import {
  createCronJob,
  disableCronJob,
  enableCronJob,
  loadCronOverview,
  removeCronJob,
  runCronJob,
  updateCronJob,
  type CronActionResult,
  type CronJobRecord,
  type CronOverviewWithCache,
} from '@/services/api/cron';
import { useFeedbackStore } from '@/stores/feedback';
import { useUiStore } from '@/stores/ui';
import {
  buildDraftFromJob,
  buildPayload,
  createDefaultCronDraft,
  type CronDraft,
  type CronEditorMode,
  type CronFilter,
  type CronJobAction,
  type LastActionState,
} from '@/features/cron/cron-helpers';

let cronOverviewCache: CronOverviewWithCache | null = null;

export function useCronPageState() {
  const ui = useUiStore();
  const feedback = useFeedbackStore();

  const searchQuery = ref('');
  const filter = ref<CronFilter>('all');
  const editorMode = ref<CronEditorMode>('create');
  const editingJobId = ref('');
  const runningAction = ref('');
  const lastAction = ref<LastActionState>(null);
  const resource = useAsyncResource(() => loadCronOverview(), cronOverviewCache, {
    immediate: false,
  });
  const draft = reactive<CronDraft>(createDefaultCronDraft());

  watch(
    () => resource.data,
    (value) => {
      if (value) cronOverviewCache = value;
    },
  );

  onMounted(() => {
    void resource.execute({ silent: !!resource.data });
  });

  const jobs = computed(() => resource.data?.jobs || []);
  const enabledJobs = computed(() => jobs.value.filter((job) => job.enabled));
  const disabledJobs = computed(() => jobs.value.filter((job) => !job.enabled));
  const filteredJobs = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    return jobs.value.filter((job) => {
      if (filter.value === 'enabled' && !job.enabled) return false;
      if (filter.value === 'disabled' && job.enabled) return false;
      if (!query) return true;
      return [job.name, job.id, job.agentId, job.schedule, job.prompt, job.status]
        .join(' ')
        .toLowerCase()
        .includes(query);
    });
  });

  watch(jobs, () => {
    if (
      editorMode.value === 'edit' &&
      !jobs.value.find((job) => job.id === editingJobId.value)
    ) {
      resetEditor();
    }
  });

  function resetEditor() {
    editorMode.value = 'create';
    editingJobId.value = '';
    Object.assign(draft, createDefaultCronDraft());
  }

  async function refresh() {
    await resource.execute({ silent: !!resource.data });
  }

  function setSearchQuery(value: string) {
    searchQuery.value = value;
  }

  function setFilter(value: CronFilter) {
    filter.value = value;
  }

  function markLastAction(result: CronActionResult, tone: 'success' | 'error') {
    lastAction.value = {
      tone,
      message: result.message,
      detail: result.output,
      at: new Date().toISOString(),
    };
  }

  async function finishAction(result: CronActionResult, resetAfterSuccess = false) {
    const tone = result.success ? 'success' : 'error';
    markLastAction(result, tone);
    feedback.pushToast({
      tone,
      message: result.message,
    });
    if (result.success && resetAfterSuccess) {
      resetEditor();
    }
    await refresh();
  }

  async function handleSubmit() {
    const actionKey = editorMode.value === 'edit' ? 'update' : 'create';
    runningAction.value = actionKey;
    try {
      const payload = buildPayload(draft);
      const result =
        editorMode.value === 'edit'
          ? await updateCronJob({ jobId: editingJobId.value, ...payload })
          : await createCronJob(payload);
      await finishAction(result, result.success);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      lastAction.value = {
        tone: 'error',
        message,
        at: new Date().toISOString(),
      };
      feedback.pushToast({
        tone: 'error',
        message,
      });
    } finally {
      runningAction.value = '';
    }
  }

  function startEdit(job: CronJobRecord) {
    editorMode.value = 'edit';
    editingJobId.value = job.id;
    Object.assign(draft, buildDraftFromJob(job));
  }

  async function handleJobAction(action: CronJobAction, job: CronJobRecord) {
    if (action === 'remove') {
      const confirmed = await feedback.confirm({
        title: ui.label('删除 Cron 任务', 'Delete cron job'),
        message: ui.label(`确认删除任务 ${job.id}？`, `Delete cron job ${job.id}?`),
        confirmLabel: ui.label('确认删除', 'Delete job'),
        cancelLabel: ui.label('取消', 'Cancel'),
        tone: 'danger',
      });
      if (!confirmed) return;
    }

    const actionKey = `${action}:${job.id}`;
    runningAction.value = actionKey;

    try {
      const result =
        action === 'run'
          ? await runCronJob(job.id)
          : action === 'enable'
            ? await enableCronJob(job.id)
            : action === 'disable'
              ? await disableCronJob(job.id)
              : await removeCronJob(job.id);

      await finishAction(
        result,
        action === 'remove' &&
          editorMode.value === 'edit' &&
          editingJobId.value === job.id,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      lastAction.value = {
        tone: 'error',
        message,
        at: new Date().toISOString(),
      };
      feedback.pushToast({
        tone: 'error',
        message,
      });
    } finally {
      runningAction.value = '';
    }
  }

  return {
    resource,
    searchQuery,
    filter,
    editorMode,
    editingJobId,
    runningAction,
    lastAction,
    draft,
    jobs,
    enabledJobs,
    disabledJobs,
    filteredJobs,
    refresh,
    setSearchQuery,
    setFilter,
    resetEditor,
    handleSubmit,
    startEdit,
    handleJobAction,
  };
}
