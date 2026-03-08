import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { connectGitRemote, getGitSyncStatus, initGitSync, parseGitRemote, saveGitTokenAuth } from '../git-sync.js';

describe('git-sync', () => {
  let tempRoot: string;

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'guard-git-sync-'));
    vi.stubEnv('OPENCLAW_STATE_DIR', tempRoot);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it('parses github and gitee remote urls', () => {
    expect(parseGitRemote('https://github.com/acme/demo.git')).toMatchObject({ provider: 'github', owner: 'acme', repo: 'demo' });
    expect(parseGitRemote('git@gitee.com:team/demo.git')).toMatchObject({ provider: 'gitee', owner: 'team', repo: 'demo' });
  });

  it('initializes repo metadata and gitignore entries', () => {
    const result = initGitSync();
    expect(result.success).toBe(true);
    const gitignore = fs.readFileSync(path.join(tempRoot, '.gitignore'), 'utf-8');
    expect(gitignore).toContain('guard/secrets/');
    expect(gitignore).toContain('guard/state/');
    expect(fs.existsSync(path.join(tempRoot, '.git'))).toBe(true);
  });

  it('stores remote and auth state and blocks sync before private check', () => {
    initGitSync();
    const connectResult = connectGitRemote({ provider: 'github', remoteUrl: 'https://github.com/acme/demo.git' });
    expect(connectResult.success).toBe(true);

    const authResult = saveGitTokenAuth({ provider: 'github', token: 'token-demo' });
    expect(authResult.success).toBe(true);

    const status = getGitSyncStatus();
    expect(status.remoteUrl).toBe('https://github.com/acme/demo.git');
    expect(status.authConfigured).toBe(true);
    expect(status.reasons.join(' ')).toContain('private');
  });
});
