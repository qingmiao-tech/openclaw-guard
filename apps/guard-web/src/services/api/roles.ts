import { deleteJson, fetchJson, postJson } from './client';

export type AgentWorkspaceDocStatus = {
  soul: boolean;
  user: boolean;
  agents: boolean;
  memory: boolean;
};

export type AgentSummary = {
  id: string;
  name: string;
  isDefault: boolean;
  isConfigured: boolean;
  modelId: string | null;
  workspace: string;
  resolvedWorkspace: string;
  workspaceExists: boolean;
  docStatus: AgentWorkspaceDocStatus;
};

export type AgentDefaultsSummary = {
  workspace: string;
  modelId: string | null;
};

export type RolesSnapshot = {
  defaults: AgentDefaultsSummary;
  agents: AgentSummary[];
};

export type AgentMutationPayload = {
  originalId?: string;
  id: string;
  name?: string;
  workspace?: string;
  modelId?: string;
  isDefault?: boolean;
  ensureWorkspace?: boolean;
  bootstrapWorkspaceDocs?: boolean;
};

export type AgentMutationResult = {
  success: boolean;
  message: string;
};

export function loadRolesSnapshot() {
  return fetchJson<RolesSnapshot>('/api/agents');
}

export function saveAgent(payload: AgentMutationPayload) {
  return postJson<AgentMutationResult>('/api/agents', payload);
}

export function deleteAgent(agentId: string) {
  return deleteJson<AgentMutationResult>(`/api/agents/${encodeURIComponent(agentId)}`);
}
