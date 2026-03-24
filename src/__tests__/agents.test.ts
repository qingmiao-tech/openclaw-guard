import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { deleteAgentConfig, getAgentsSnapshot, saveAgentConfig } from '../agents.js';

describe('agents config mutations', () => {
  let tempRoot: string;
  let configPath: string;

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'guard-agents-'));
    configPath = path.join(tempRoot, 'openclaw.json');

    fs.writeFileSync(configPath, JSON.stringify({
      agents: {
        defaults: {
          workspace: path.join(tempRoot, 'workspace-default'),
          model: { primary: 'demo/default-model' },
        },
        list: [],
      },
    }), 'utf-8');

    vi.stubEnv('OPENCLAW_CONFIG_PATH', configPath);
    vi.stubEnv('OPENCLAW_STATE_DIR', tempRoot);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it('creates the first configured agent and ensures its workspace when requested', () => {
    const workspace = path.join(tempRoot, 'workspace-agent-a');
    const result = saveAgentConfig({
      id: 'agent-a',
      name: 'Agent A',
      workspace,
      modelId: 'demo/model-a',
      isDefault: true,
      ensureWorkspace: true,
    });

    expect(result.success).toBe(true);
    expect(fs.existsSync(workspace)).toBe(true);

    const snapshot = getAgentsSnapshot();
    expect(snapshot.defaults.modelId).toBe('demo/default-model');
    expect(snapshot.agents).toHaveLength(1);
    expect(snapshot.agents[0].id).toBe('agent-a');
    expect(snapshot.agents[0].isConfigured).toBe(true);
    expect(snapshot.agents[0].isDefault).toBe(true);
    expect(snapshot.agents[0].workspaceExists).toBe(true);
  });

  it('bootstraps core workspace docs for a new agent without overwriting missing paths', () => {
    const workspace = path.join(tempRoot, 'workspace-agent-bootstrap');
    const result = saveAgentConfig({
      id: 'agent-bootstrap',
      name: 'Bootstrap Agent',
      workspace,
      bootstrapWorkspaceDocs: true,
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain('Bootstrapped workspace docs');
    expect(fs.readFileSync(path.join(workspace, 'SOUL.md'), 'utf-8')).toContain('# Bootstrap Agent');
    expect(fs.readFileSync(path.join(workspace, 'USER.md'), 'utf-8')).toContain('# User context');
    expect(fs.readFileSync(path.join(workspace, 'AGENTS.md'), 'utf-8')).toContain('# Agent workspace guide');
    expect(fs.statSync(path.join(workspace, 'memory')).isDirectory()).toBe(true);

    const snapshot = getAgentsSnapshot();
    const agent = snapshot.agents.find((item) => item.id === 'agent-bootstrap');
    expect(agent?.docStatus.soul).toBe(true);
    expect(agent?.docStatus.user).toBe(true);
    expect(agent?.docStatus.agents).toBe(true);
    expect(agent?.docStatus.memory).toBe(true);
  });

  it('keeps existing workspace docs intact while bootstrapping missing ones', () => {
    const workspace = path.join(tempRoot, 'workspace-agent-existing-docs');
    fs.mkdirSync(workspace, { recursive: true });
    fs.writeFileSync(path.join(workspace, 'SOUL.md'), '# Existing soul\n', 'utf-8');
    fs.writeFileSync(path.join(workspace, 'USER.md'), '# Existing user\n', 'utf-8');

    const result = saveAgentConfig({
      id: 'agent-existing-docs',
      name: 'Existing Docs Agent',
      workspace,
      bootstrapWorkspaceDocs: true,
    });

    expect(result.success).toBe(true);
    expect(fs.readFileSync(path.join(workspace, 'SOUL.md'), 'utf-8')).toBe('# Existing soul\n');
    expect(fs.readFileSync(path.join(workspace, 'USER.md'), 'utf-8')).toBe('# Existing user\n');
    expect(fs.existsSync(path.join(workspace, 'AGENTS.md'))).toBe(true);
    expect(fs.statSync(path.join(workspace, 'memory')).isDirectory()).toBe(true);
  });

  it('does not bootstrap docs while editing an existing agent', () => {
    const workspace = path.join(tempRoot, 'workspace-agent-edit-only');
    const created = saveAgentConfig({
      id: 'agent-edit-only',
      name: 'Edit Only Agent',
      workspace,
    });
    expect(created.success).toBe(true);

    const updated = saveAgentConfig({
      originalId: 'agent-edit-only',
      id: 'agent-edit-only',
      name: 'Edit Only Agent',
      workspace,
      bootstrapWorkspaceDocs: true,
    });

    expect(updated.success).toBe(true);
    expect(fs.existsSync(path.join(workspace, 'SOUL.md'))).toBe(false);
    expect(fs.existsSync(path.join(workspace, 'USER.md'))).toBe(false);
    expect(fs.existsSync(path.join(workspace, 'AGENTS.md'))).toBe(false);
    expect(fs.existsSync(path.join(workspace, 'memory'))).toBe(false);
  });

  it('updates an existing agent, supports rename, and keeps a single default', () => {
    saveAgentConfig({
      id: 'agent-a',
      name: 'Agent A',
      workspace: path.join(tempRoot, 'workspace-agent-a'),
      isDefault: true,
    });
    saveAgentConfig({
      id: 'agent-b',
      name: 'Agent B',
      workspace: path.join(tempRoot, 'workspace-agent-b'),
      isDefault: false,
    });

    const result = saveAgentConfig({
      originalId: 'agent-b',
      id: 'agent-c',
      name: 'Agent C',
      workspace: path.join(tempRoot, 'workspace-agent-c'),
      modelId: 'demo/model-c',
      isDefault: true,
    });

    expect(result.success).toBe(true);

    const snapshot = getAgentsSnapshot();
    expect(snapshot.agents).toHaveLength(2);
    expect(snapshot.agents.find((item) => item.id === 'agent-b')).toBeUndefined();
    expect(snapshot.agents.find((item) => item.id === 'agent-c')?.isDefault).toBe(true);
    expect(snapshot.agents.find((item) => item.id === 'agent-a')?.isDefault).toBe(false);
  });

  it('promotes the remaining agent to default after deleting the current default', () => {
    saveAgentConfig({
      id: 'agent-a',
      name: 'Agent A',
      workspace: path.join(tempRoot, 'workspace-agent-a'),
      isDefault: true,
    });
    saveAgentConfig({
      id: 'agent-b',
      name: 'Agent B',
      workspace: path.join(tempRoot, 'workspace-agent-b'),
      isDefault: false,
    });

    const result = deleteAgentConfig('agent-a');
    expect(result.success).toBe(true);

    const snapshot = getAgentsSnapshot();
    expect(snapshot.agents).toHaveLength(1);
    expect(snapshot.agents[0].id).toBe('agent-b');
    expect(snapshot.agents[0].isDefault).toBe(true);
  });

  it('falls back to the implicit default agent when the configured list becomes empty', () => {
    saveAgentConfig({
      id: 'agent-a',
      name: 'Agent A',
      workspace: path.join(tempRoot, 'workspace-agent-a'),
      isDefault: true,
    });

    const result = deleteAgentConfig('agent-a');
    expect(result.success).toBe(true);

    const snapshot = getAgentsSnapshot();
    expect(snapshot.agents).toHaveLength(1);
    expect(snapshot.agents[0].id).toBe('default');
    expect(snapshot.agents[0].isConfigured).toBe(false);
    expect(snapshot.agents[0].isDefault).toBe(true);
  });
});
