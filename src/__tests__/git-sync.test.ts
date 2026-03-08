import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { connectGitRemote, getGitSyncStatus, initGitSync, parseGitRemote, saveGitTokenAuth, startOAuthLogin } from '../git-sync.js';


function httpGetText(targetUrl: string): Promise<{ statusCode: number; body: string }> {
  return new Promise((resolve, reject) => {
    http.get(targetUrl, (response) => {
      const chunks: Buffer[] = [];
      response.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      response.on('end', () => {
        resolve({
          statusCode: response.statusCode || 0,
          body: Buffer.concat(chunks).toString('utf-8'),
        });
      });
    }).on('error', reject);
  });
}
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

  it('starts OAuth locally and records callback verification failures for github and gitee', async () => {
    initGitSync();

    for (const provider of ['github', 'gitee'] as const) {
      const result = await startOAuthLogin({
        provider,
        clientId: 'demo-client-id',
        clientSecret: 'demo-client-secret',
        openBrowser: false,
      });

      expect(result.success).toBe(true);
      expect(result.status.oauth.phase).toBe('authorizing');
      expect(result.status.oauth.authorizeUrl).toContain(provider === 'github' ? 'github.com/login/oauth/authorize' : 'gitee.com/oauth/authorize');
      expect(result.status.oauth.redirectUrl).toContain('http://127.0.0.1:');

      const callbackUrl = `${result.status.oauth.redirectUrl}?code=fake-code&state=wrong-state`;
      const response = await httpGetText(callbackUrl);
      expect(response.statusCode).toBe(400);
      expect(response.body).toContain('OpenClaw Guard OAuth verification failed');

      const status = getGitSyncStatus();
      expect(status.oauth.phase).toBe('error');
      expect(status.oauth.provider).toBe(provider);
      expect(status.oauth.error).toBe('callback-state-mismatch');
    }
  }, 15000);
});



