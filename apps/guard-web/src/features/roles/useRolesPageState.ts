import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useAsyncResource } from '@/composables/useAsyncResource';
import { buildWorkspacePathFromName, deriveWorkspaceName } from '@/features/roles/workspace-name';
import {
  deleteAgent,
  loadRolesSnapshot,
  saveAgent,
  type AgentSummary,
  type RolesSnapshot,
} from '@/services/api/roles';
import { useFeedbackStore } from '@/stores/feedback';
import { useUiStore } from '@/stores/ui';

export type AgentDraft = {
  originalId: string;
  id: string;
  name: string;
  workspaceMode: 'named' | 'custom';
  workspaceName: string;
  workspace: string;
  modelId: string;
  isDefault: boolean;
  ensureWorkspace: boolean;
  bootstrapWorkspaceDocs: boolean;
  canDelete: boolean;
};

let rolesCache: RolesSnapshot | null = null;

export function hasCoreDocs(agent: AgentSummary) {
  return agent.docStatus.soul
    && agent.docStatus.user
    && agent.docStatus.agents
    && agent.docStatus.memory;
}

function fillDraftFromAgent(draft: AgentDraft, agent: AgentSummary) {
  draft.originalId = agent.isConfigured ? agent.id : '';
  draft.id = agent.isConfigured ? agent.id : '';
  draft.name = agent.isConfigured ? agent.name : '';
  draft.workspaceMode = agent.workspaceName !== null ? 'named' : 'custom';
  draft.workspaceName = agent.workspaceName ?? '';
  draft.workspace = agent.workspace;
  draft.modelId = agent.modelId || '';
  draft.isDefault = agent.isDefault;
  draft.ensureWorkspace = !agent.workspaceExists;
  draft.bootstrapWorkspaceDocs = false;
  draft.canDelete = agent.isConfigured;
}

function fillDraftForCreate(draft: AgentDraft, snapshot: RolesSnapshot | null, agentCount: number) {
  draft.originalId = '';
  draft.id = '';
  draft.name = '';
  draft.workspaceMode = 'named';
  draft.workspaceName = '';
  draft.workspace = snapshot?.defaults.workspace || '~/.openclaw/workspace';
  draft.modelId = snapshot?.defaults.modelId || '';
  draft.isDefault = agentCount === 0;
  draft.ensureWorkspace = true;
  draft.bootstrapWorkspaceDocs = false;
  draft.canDelete = false;
}

export function useRolesPageState() {
  const ui = useUiStore();
  const feedback = useFeedbackStore();
  const resource = useAsyncResource(() => loadRolesSnapshot(), rolesCache, { immediate: false });
  const selectedAgentId = ref('');
  const initialized = ref(false);
  const saving = ref(false);
  const deleting = ref(false);
  const draft = reactive<AgentDraft>({
    originalId: '',
    id: '',
    name: '',
    workspaceMode: 'named',
    workspaceName: '',
    workspace: '~/.openclaw/workspace',
    modelId: '',
    isDefault: true,
    ensureWorkspace: true,
    bootstrapWorkspaceDocs: false,
    canDelete: false,
  });

  const agents = computed(() => resource.data?.agents || []);
  const defaults = computed(() => resource.data?.defaults || {
    workspace: '~/.openclaw/workspace',
    modelId: null,
  });
  const defaultCount = computed(() => agents.value.filter((agent) => agent.isDefault).length);
  const workspaceReadyCount = computed(() => agents.value.filter((agent) => agent.workspaceExists).length);
  const docReadyCount = computed(() => agents.value.filter((agent) => hasCoreDocs(agent)).length);
  const selectedAgent = computed(() =>
    agents.value.find((agent) => agent.id === selectedAgentId.value && agent.isConfigured) || null,
  );
  const isCreateMode = computed(() => !draft.originalId);
  const workspacePreview = computed(() =>
    draft.workspaceMode === 'named'
      ? buildWorkspacePathFromName(defaults.value.workspace, draft.workspaceName)
      : (draft.workspace.trim() || defaults.value.workspace),
  );
  const editorModeLabel = computed(() =>
    draft.originalId
      ? ui.label('编辑现有 Agent', 'Edit existing agent')
      : ui.label('新增 Agent', 'Create agent'),
  );

  watch(
    () => resource.data,
    (snapshot) => {
      if (snapshot) {
        rolesCache = snapshot;
      }
      if (!snapshot) {
        return;
      }

      const configuredCount = snapshot.agents.filter((agent) => agent.isConfigured).length;
      if (!initialized.value) {
        fillDraftForCreate(draft, snapshot, configuredCount);
        initialized.value = true;
        return;
      }

      if (selectedAgent.value) {
        fillDraftFromAgent(draft, selectedAgent.value);
        return;
      }

      if (!draft.originalId) {
        fillDraftForCreate(draft, snapshot, configuredCount);
      }
    },
    { immediate: true },
  );

  onMounted(() => {
    void resource.execute({ silent: !!resource.data });
  });

  async function refresh() {
    await resource.execute({ silent: true });
  }

  function beginCreateAgent() {
    selectedAgentId.value = '';
    fillDraftForCreate(draft, resource.data, agents.value.filter((agent) => agent.isConfigured).length);
  }

  function editAgent(agent: AgentSummary) {
    if (!agent.isConfigured) {
      beginCreateAgent();
      return;
    }
    selectedAgentId.value = agent.id;
    fillDraftFromAgent(draft, agent);
  }

  function resetDraft() {
    if (selectedAgent.value) {
      fillDraftFromAgent(draft, selectedAgent.value);
      return;
    }
    fillDraftForCreate(draft, resource.data, agents.value.filter((agent) => agent.isConfigured).length);
  }

  function setWorkspaceMode(mode: 'named' | 'custom') {
    if (draft.workspaceMode === mode) {
      return;
    }

    if (mode === 'named') {
      draft.workspaceName = deriveWorkspaceName(defaults.value.workspace, draft.workspace) ?? draft.workspaceName;
      draft.workspaceMode = 'named';
      return;
    }

    draft.workspace = workspacePreview.value;
    draft.workspaceMode = 'custom';
  }

  async function handleSaveAgent() {
    saving.value = true;
    try {
      const useWorkspaceName = draft.workspaceMode === 'named';
      const result = await saveAgent({
        originalId: draft.originalId || undefined,
        id: draft.id.trim(),
        name: draft.name.trim() || undefined,
        workspaceName: useWorkspaceName ? draft.workspaceName.trim() : undefined,
        workspace: useWorkspaceName ? undefined : (draft.workspace.trim() || undefined),
        modelId: draft.modelId.trim() || undefined,
        isDefault: draft.isDefault,
        ensureWorkspace: draft.ensureWorkspace,
        bootstrapWorkspaceDocs: !draft.originalId ? draft.bootstrapWorkspaceDocs : undefined,
      });

      feedback.pushToast({
        tone: result.success ? 'success' : 'error',
        message: result.message,
      });

      if (result.success) {
        draft.workspace = workspacePreview.value;
        selectedAgentId.value = draft.id.trim();
        await refresh();
      }
    } catch (error) {
      feedback.pushToast({
        tone: 'error',
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      saving.value = false;
    }
  }

  async function handleDeleteAgent() {
    if (!draft.canDelete || !draft.originalId) {
      return;
    }

    const confirmed = await feedback.confirm({
      title: ui.label('删除 Agent', 'Delete agent'),
      message: ui.label(
        `确认删除 ${draft.originalId} 吗？这会从当前生效的 openclaw.json 中移除这条 Agent 配置。`,
        `Delete ${draft.originalId}? This removes the agent entry from the active openclaw.json.`,
      ),
      confirmLabel: ui.label('确认删除', 'Delete'),
      cancelLabel: ui.label('取消', 'Cancel'),
      tone: 'danger',
    });
    if (!confirmed) {
      return;
    }

    deleting.value = true;
    try {
      const result = await deleteAgent(draft.originalId);
      feedback.pushToast({
        tone: result.success ? 'success' : 'error',
        message: result.message,
      });

      if (result.success) {
        selectedAgentId.value = '';
        await refresh();
        fillDraftForCreate(draft, resource.data, agents.value.filter((agent) => agent.isConfigured).length);
      }
    } catch (error) {
      feedback.pushToast({
        tone: 'error',
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      deleting.value = false;
    }
  }

  async function handleSetDefault(agent: AgentSummary) {
    if (!agent.isConfigured || agent.isDefault) {
      return;
    }

    try {
      const result = await saveAgent({
        originalId: agent.id,
        id: agent.id,
        name: agent.name,
        workspaceName: agent.workspaceName ?? undefined,
        workspace: agent.workspaceName !== null ? undefined : agent.workspace,
        modelId: agent.modelId || undefined,
        isDefault: true,
      });

      feedback.pushToast({
        tone: result.success ? 'success' : 'error',
        message: result.message,
      });

      if (result.success) {
        await refresh();
      }
    } catch (error) {
      feedback.pushToast({
        tone: 'error',
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return {
    resource,
    agents,
    defaults,
    draft,
    saving,
    deleting,
    defaultCount,
    workspaceReadyCount,
    docReadyCount,
    isCreateMode,
    workspacePreview,
    editorModeLabel,
    beginCreateAgent,
    editAgent,
    resetDraft,
    setWorkspaceMode,
    refresh,
    handleSaveAgent,
    handleDeleteAgent,
    handleSetDefault,
  };
}
