import fs from 'node:fs';
import path from 'node:path';
import { getNested, loadConfig, saveConfig } from './config.js';
import { buildWorkspacePathFromName } from './agent-workspace.js';
import { resolveUserPath } from './guard-state.js';
import { getAgentCatalog, type AgentSummary } from './workspace-files.js';

export interface AgentDefaultsSummary {
  workspace: string;
  modelId: string | null;
}

export interface AgentsSnapshot {
  defaults: AgentDefaultsSummary;
  agents: AgentSummary[];
}

export interface AgentMutationInput {
  originalId?: string;
  id: string;
  name?: string;
  workspaceName?: string;
  workspace?: string;
  modelId?: string | null;
  isDefault?: boolean;
  ensureWorkspace?: boolean;
  bootstrapWorkspaceDocs?: boolean;
}

export interface AgentMutationResult {
  success: boolean;
  message: string;
}

type AgentConfigRecord = Record<string, unknown> & {
  id: string;
  name?: string;
  workspace?: string;
  model?: string;
  default?: boolean;
};
const AGENT_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;
const WORKSPACE_BOOTSTRAP_FILES = ['SOUL.md', 'USER.md', 'AGENTS.md'] as const;

type WorkspaceBootstrapResult = {
  created: string[];
  skipped: string[];
};

function toObject(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function normalizeModelNode(node: unknown): string | null {
  if (typeof node === 'string' && node.trim()) return node.trim();
  const object = toObject(node);
  if (!object) return null;
  return typeof object.primary === 'string' && object.primary.trim() ? object.primary.trim() : null;
}

function getAgentDefaultsConfig(config: Record<string, unknown>): AgentDefaultsSummary {
  const defaults = toObject(getNested(config, ['agents', 'defaults'])) || {};
  return {
    workspace: typeof defaults.workspace === 'string' && defaults.workspace.trim()
      ? defaults.workspace.trim()
      : buildWorkspacePathFromName(undefined),
    modelId: normalizeModelNode(getNested(defaults, ['model'])),
  };
}

function getConfiguredAgentList(config: Record<string, unknown>): AgentConfigRecord[] {
  const list = Array.isArray(getNested(config, ['agents', 'list']))
    ? getNested(config, ['agents', 'list']) as unknown[]
    : [];

  return list
    .map((item) => toObject(item))
    .filter((item): item is AgentConfigRecord => item !== null && typeof item.id === 'string' && item.id.trim().length > 0)
    .map((item) => ({ ...item, id: String(item.id).trim() }));
}

function ensureSingleDefault(records: AgentConfigRecord[]) {
  if (!records.length) {
    return;
  }

  let defaultIndex = records.findIndex((item) => item.default === true);
  if (defaultIndex === -1) {
    defaultIndex = 0;
  }

  records.forEach((item, index) => {
    if (index === defaultIndex) {
      item.default = true;
    } else {
      delete item.default;
    }
  });
}

function validateAgentId(raw: string): string {
  const trimmed = String(raw || '').trim();
  if (!trimmed) {
    throw new Error('Agent id is required.');
  }
  if (!AGENT_ID_PATTERN.test(trimmed)) {
    throw new Error('Agent id may only contain letters, numbers, ".", "_" or "-".');
  }
  return trimmed;
}

function buildAgentRecord(
  input: AgentMutationInput,
  defaults: AgentDefaultsSummary,
  previous?: AgentConfigRecord,
): AgentConfigRecord {
  const id = validateAgentId(input.id);
  const workspace = typeof input.workspace === 'string' && input.workspace.trim()
    ? input.workspace.trim()
    : buildWorkspacePathFromName(defaults.workspace, input.workspaceName);
  const name = typeof input.name === 'string' && input.name.trim()
    ? input.name.trim()
    : id;
  const modelId = typeof input.modelId === 'string' && input.modelId.trim()
    ? input.modelId.trim()
    : null;

  const preserved = { ...(previous || {}) };
  delete preserved.id;
  delete preserved.name;
  delete preserved.workspace;
  delete preserved.model;
  delete preserved.default;

  const record: AgentConfigRecord = {
    ...preserved,
    id,
    name,
    workspace,
  };

  if (modelId) {
    record.model = modelId;
  }
  if (input.isDefault === true) {
    record.default = true;
  }

  return record;
}

function ensureWorkspaceDirectory(workspace: string): string {
  const resolved = resolveUserPath(workspace);
  fs.mkdirSync(resolved, { recursive: true });
  return resolved;
}

function buildWorkspaceBootstrapContent(fileName: typeof WORKSPACE_BOOTSTRAP_FILES[number], agentName: string): string {
  switch (fileName) {
    case 'SOUL.md':
      return `# ${agentName}

Describe the long-term identity, mission, and operating principles for this agent.
`;
    case 'USER.md':
      return `# User context

Capture user preferences, expectations, and collaboration style for ${agentName} here.
`;
    case 'AGENTS.md':
      return `# Agent workspace guide

List active sub-agents, responsibilities, and workspace conventions for ${agentName} here.
`;
    default:
      return '';
  }
}

function bootstrapWorkspaceDocs(workspace: string, agentName: string): WorkspaceBootstrapResult {
  const resolvedWorkspace = ensureWorkspaceDirectory(workspace);
  const result: WorkspaceBootstrapResult = {
    created: [],
    skipped: [],
  };

  for (const fileName of WORKSPACE_BOOTSTRAP_FILES) {
    const targetPath = path.join(resolvedWorkspace, fileName);
    if (fs.existsSync(targetPath)) {
      result.skipped.push(fileName);
      continue;
    }
    fs.writeFileSync(targetPath, buildWorkspaceBootstrapContent(fileName, agentName), 'utf-8');
    result.created.push(fileName);
  }

  const memoryPath = path.join(resolvedWorkspace, 'memory');
  if (fs.existsSync(memoryPath)) {
    result.skipped.push('memory/');
  } else {
    fs.mkdirSync(memoryPath, { recursive: true });
    result.created.push('memory/');
  }

  return result;
}

function formatWorkspaceBootstrapMessage(result: WorkspaceBootstrapResult): string {
  if (result.created.length === 0) {
    return 'Workspace docs already existed.';
  }
  if (result.skipped.length === 0) {
    return `Bootstrapped workspace docs (${result.created.join(', ')}).`;
  }
  return `Bootstrapped workspace docs (${result.created.join(', ')}; kept ${result.skipped.join(', ')}).`;
}

export function getAgentsSnapshot(): AgentsSnapshot {
  const config = loadConfig();
  return {
    defaults: getAgentDefaultsConfig(config),
    agents: getAgentCatalog(),
  };
}

export function saveAgentConfig(input: AgentMutationInput): AgentMutationResult {
  try {
    const config = loadConfig();
    const defaults = getAgentDefaultsConfig(config);
    const list = getConfiguredAgentList(config);
    const originalId = typeof input.originalId === 'string' ? input.originalId.trim() : '';
    const nextId = validateAgentId(input.id);
    const existingIndex = originalId
      ? list.findIndex((item) => item.id === originalId)
      : -1;

    if (originalId && existingIndex === -1) {
      return { success: false, message: `Agent ${originalId} was not found.` };
    }

    if (!originalId && list.some((item) => item.id === nextId)) {
      return { success: false, message: `Agent ${nextId} already exists.` };
    }

    if (list.some((item, index) => index !== existingIndex && item.id === nextId)) {
      return { success: false, message: `Agent ${nextId} already exists.` };
    }

    const previous = existingIndex >= 0 ? list[existingIndex] : undefined;
    const nextRecord = buildAgentRecord(input, defaults, previous);
    const isCreate = existingIndex === -1;

    if (existingIndex >= 0) {
      list[existingIndex] = nextRecord;
    } else {
      list.push(nextRecord);
    }

    if (input.isDefault === true) {
      list.forEach((item) => {
        if (item.id !== nextRecord.id) {
          delete item.default;
        }
      });
    }
    ensureSingleDefault(list);

    let workspaceBootstrapMessage = '';
    if (isCreate && input.bootstrapWorkspaceDocs === true) {
      workspaceBootstrapMessage = formatWorkspaceBootstrapMessage(
        bootstrapWorkspaceDocs(
          String(nextRecord.workspace || defaults.workspace),
          typeof nextRecord.name === 'string' && nextRecord.name.trim() ? nextRecord.name : nextId,
        ),
      );
    } else if (input.ensureWorkspace === true) {
      ensureWorkspaceDirectory(String(nextRecord.workspace || defaults.workspace));
    }

    const nextAgents = toObject(config.agents) || {};
    nextAgents.list = list;
    config.agents = nextAgents;

    const result = saveConfig(config, { merge: false });
    if (!result.success) {
      return { success: false, message: result.error || 'Failed to save agent config.' };
    }

    return {
      success: true,
      message: `${existingIndex >= 0 ? `Saved agent ${nextId}.` : `Created agent ${nextId}.`}${workspaceBootstrapMessage ? ` ${workspaceBootstrapMessage}` : ''}`,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

export function deleteAgentConfig(id: string): AgentMutationResult {
  try {
    const targetId = validateAgentId(id);
    const config = loadConfig();
    const list = getConfiguredAgentList(config);
    const nextList = list.filter((item) => item.id !== targetId);

    if (nextList.length === list.length) {
      return { success: false, message: `Agent ${targetId} was not found.` };
    }

    ensureSingleDefault(nextList);

    const nextAgents = toObject(config.agents) || {};
    nextAgents.list = nextList;
    config.agents = nextAgents;

    const result = saveConfig(config, { merge: false });
    if (!result.success) {
      return { success: false, message: result.error || 'Failed to delete agent config.' };
    }

    return {
      success: true,
      message: `Deleted agent ${targetId}.`,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
