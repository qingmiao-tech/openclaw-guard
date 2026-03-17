import { fetchJson } from './client';

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
  modelId: string | null;
  workspace: string;
  resolvedWorkspace: string;
  workspaceExists: boolean;
  docStatus: AgentWorkspaceDocStatus;
};

export function loadRolesSnapshot() {
  return fetchJson<{ agents: AgentSummary[] }>('/api/agents');
}
