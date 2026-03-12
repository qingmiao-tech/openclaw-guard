import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getGitSyncScopeReport } from '../git-sync-scope.js';

describe('git-sync-scope', () => {
  let tempRoot: string;
  let configPath: string;
  let defaultWorkspace: string;

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'guard-sync-scope-'));
    configPath = path.join(tempRoot, 'openclaw.json');
    defaultWorkspace = path.join(tempRoot, 'workspace');

    fs.mkdirSync(defaultWorkspace, { recursive: true });
    fs.writeFileSync(path.join(defaultWorkspace, 'AGENTS.md'), '# default workspace', 'utf-8');

    fs.mkdirSync(path.join(tempRoot, 'workspace-nanfeng', 'memory'), { recursive: true });
    fs.writeFileSync(path.join(tempRoot, 'workspace-nanfeng', 'SOUL.md'), '# soul', 'utf-8');
    fs.writeFileSync(path.join(tempRoot, 'workspace-nanfeng', 'AGENTS.md'), '# agents', 'utf-8');
    fs.writeFileSync(path.join(tempRoot, 'workspace-nanfeng', 'memory', 'notes.md'), 'hello', 'utf-8');

    fs.mkdirSync(path.join(tempRoot, 'canvas'), { recursive: true });
    fs.writeFileSync(path.join(tempRoot, 'canvas', 'index.html'), '<html></html>', 'utf-8');

    fs.mkdirSync(path.join(tempRoot, 'extensions', 'feishu-enhanced'), { recursive: true });
    fs.writeFileSync(path.join(tempRoot, 'extensions', 'feishu-enhanced', 'README.md'), '# extension', 'utf-8');

    fs.mkdirSync(path.join(tempRoot, 'cron'), { recursive: true });
    fs.writeFileSync(path.join(tempRoot, 'cron', 'jobs.json'), '{"jobs":[]}', 'utf-8');

    fs.mkdirSync(path.join(tempRoot, 'credentials'), { recursive: true });
    fs.writeFileSync(path.join(tempRoot, 'credentials', 'token.json'), '{"x":1}', 'utf-8');

    fs.mkdirSync(path.join(tempRoot, 'guard', 'state'), { recursive: true });
    fs.writeFileSync(path.join(tempRoot, 'guard', 'state', 'runtime.json'), '{"ok":true}', 'utf-8');

    fs.mkdirSync(path.join(tempRoot, 'memory'), { recursive: true });
    fs.writeFileSync(path.join(tempRoot, 'memory', 'main.sqlite'), 'sqlite-bytes', 'utf-8');

    fs.writeFileSync(configPath, JSON.stringify({
      agents: {
        defaults: {
          workspace: defaultWorkspace,
        },
        list: [
          {
            id: 'main',
            default: true,
            workspace: defaultWorkspace,
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

  it('categorizes sync scope into core, optional, separate, and exclude layers', () => {
    const report = getGitSyncScopeReport();

    expect(report.workspaceCandidates.some((item) => item.relativePath === 'workspace-nanfeng')).toBe(true);
    expect(report.entries.some((entry) => entry.kind === 'workspace' && entry.autoDetected && entry.paths.includes('workspace-nanfeng'))).toBe(true);
    expect(report.entries.some((entry) => entry.kind === 'canvas' && entry.level === 'optional' && entry.exists)).toBe(true);
    expect(report.entries.some((entry) => entry.kind === 'extensions' && entry.level === 'separate' && entry.exists)).toBe(true);
    expect(report.entries.some((entry) => entry.kind === 'runtime' && entry.level === 'exclude' && entry.exists)).toBe(true);
    expect(report.entries.some((entry) => entry.kind === 'identity' && entry.level === 'exclude' && entry.exists)).toBe(true);
    expect(report.missingIgnoreEntries).toContain('credentials/');
    expect(report.missingIgnoreEntries).toContain('memory/*.sqlite');
  });
});
