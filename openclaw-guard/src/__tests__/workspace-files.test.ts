import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getAgentCatalog, listMemoryFiles, readManagedFile, searchManagedFiles, writeManagedFile } from '../workspace-files.js';

describe('workspace-files', () => {
  let tempRoot: string;
  let configPath: string;
  let agentWorkspace: string;

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'guard-files-'));
    configPath = path.join(tempRoot, 'openclaw.json');
    agentWorkspace = path.join(tempRoot, 'workspace-agent-a');
    fs.mkdirSync(agentWorkspace, { recursive: true });
    fs.writeFileSync(path.join(agentWorkspace, 'SOUL.md'), '# soul', 'utf-8');
    fs.writeFileSync(path.join(agentWorkspace, 'USER.md'), '# user', 'utf-8');
    fs.writeFileSync(path.join(agentWorkspace, 'AGENTS.md'), '# agents', 'utf-8');
    fs.mkdirSync(path.join(agentWorkspace, 'memory'), { recursive: true });
    fs.writeFileSync(path.join(agentWorkspace, 'memory', 'notes.md'), 'hello failover world', 'utf-8');

    fs.writeFileSync(configPath, JSON.stringify({
      agents: {
        defaults: {
          workspace: agentWorkspace,
          model: { primary: 'demo/model-a' },
        },
        list: [
          {
            id: 'agent-a',
            name: 'Agent A',
            default: true,
            workspace: agentWorkspace,
          },
        ],
      },
    }), 'utf-8');

    vi.stubEnv('OPENCLAW_CONFIG_PATH', configPath);
    vi.stubEnv('OPENCLAW_STATE_DIR', tempRoot);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it('reads agent catalog and document availability', () => {
    const agents = getAgentCatalog();
    expect(agents).toHaveLength(1);
    expect(agents[0].id).toBe('agent-a');
    expect(agents[0].docStatus.soul).toBe(true);
    expect(agents[0].docStatus.user).toBe(true);
    expect(agents[0].docStatus.agents).toBe(true);
    expect(agents[0].docStatus.memory).toBe(true);
  });

  it('lists memory files and supports safe read/write in workspace scope', () => {
    const memoryFiles = listMemoryFiles();
    expect(memoryFiles.some((item) => item.relativePath === 'memory\\notes.md' || item.relativePath === 'memory/notes.md')).toBe(true);

    const writeResult = writeManagedFile(path.join(agentWorkspace, 'notes.md'), 'updated content');
    expect(writeResult.success).toBe(true);
    expect(readManagedFile(path.join(agentWorkspace, 'notes.md')).content).toContain('updated content');
  });

  it('prevents reading outside managed roots and supports search', () => {
    expect(() => readManagedFile(path.join(tempRoot, 'outside.md'))).toThrow(/outside Guard managed roots/);

    const results = searchManagedFiles('failover');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].preview).toContain('failover');
  });
});
