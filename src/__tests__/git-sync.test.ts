import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import os from 'node:os';
import path from 'node:path';
import { EventEmitter } from 'node:events';
import { execFileSync } from 'node:child_process';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  checkGitRemotePrivate,
  commitGitSync,
  connectGitRemote,
  getGitSyncStatus,
  initGitSync,
  parseGitRemote,
  saveGitTokenAuth,
  startOAuthLogin,
} from '../git-sync.js';

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

function mockHttpsResponses(routes: Array<{ match: string; body: Record<string, unknown>; statusCode?: number }>) {
  return vi.spyOn(https, 'request').mockImplementation((target: any, _options: any, callback: any) => {
    const targetUrl = typeof target === 'string'
      ? target
      : target?.href || target?.toString?.() || '';
    const matched = routes.find((route) => targetUrl.includes(route.match));

    const request = new EventEmitter() as any;
    request.write = vi.fn();
    request.end = () => {
      if (!matched) {
        request.emit('error', new Error(`No mocked response for ${targetUrl}`));
        return;
      }

      const response = new EventEmitter() as any;
      response.statusCode = matched.statusCode || 200;
      callback(response);
      queueMicrotask(() => {
        response.emit('data', Buffer.from(JSON.stringify(matched.body)));
        response.emit('end');
      });
    };
    request.destroy = vi.fn();
    return request;
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
    vi.restoreAllMocks();
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
    expect(status.remoteWebUrl).toBe('https://github.com/acme/demo');
    expect(status.authConfigured).toBe(true);
    expect(status.reasons.join(' ')).toContain('private');
  });

  it('allows local commit before private check when the repo has changes', () => {
    initGitSync();
    execFileSync('git', ['-C', tempRoot, 'config', 'user.name', 'OpenClaw Guard Test'], { stdio: 'ignore' });
    execFileSync('git', ['-C', tempRoot, 'config', 'user.email', 'guard@example.com'], { stdio: 'ignore' });
    fs.writeFileSync(path.join(tempRoot, 'README.md'), '# guard\n', 'utf-8');

    const before = getGitSyncStatus();
    expect(before.canCommit).toBe(true);
    expect(before.canPush).toBe(false);

    const result = commitGitSync('本地提交测试');
    expect(result.success).toBe(true);

    const after = getGitSyncStatus();
    expect(after.hasChanges).toBe(false);
    expect(after.state.lastCommitAt).not.toBeNull();
  });

  it('skips embedded repositories during commit and keeps them out of the staged set', () => {
    initGitSync();
    execFileSync('git', ['-C', tempRoot, 'config', 'user.name', 'OpenClaw Guard Test'], { stdio: 'ignore' });
    execFileSync('git', ['-C', tempRoot, 'config', 'user.email', 'guard@example.com'], { stdio: 'ignore' });

    fs.writeFileSync(path.join(tempRoot, 'README.md'), '# guard\n', 'utf-8');
    const embeddedRepoPath = path.join(tempRoot, 'workspace-nanfeng');
    fs.mkdirSync(embeddedRepoPath, { recursive: true });
    execFileSync('git', ['-C', embeddedRepoPath, 'init'], { stdio: 'ignore' });
    fs.writeFileSync(path.join(embeddedRepoPath, 'README.md'), '# nested repo\n', 'utf-8');

    const result = commitGitSync('跳过嵌套仓库提交测试');
    expect(result.success).toBe(true);
    expect(result.message).toContain('workspace-nanfeng/');

    const headMessage = execFileSync('git', ['-C', tempRoot, 'log', '-1', '--pretty=%s'], { encoding: 'utf-8' }).trim();
    expect(headMessage).toBe('跳过嵌套仓库提交测试');

    const trackedFiles = execFileSync('git', ['-C', tempRoot, 'ls-tree', '--name-only', 'HEAD'], { encoding: 'utf-8' });
    expect(trackedFiles).toContain('README.md');
    expect(trackedFiles).not.toContain('workspace-nanfeng');

    const after = getGitSyncStatus();
    expect(after.hasChanges).toBe(true);
    expect(after.changedFiles).toContain('workspace-nanfeng');
    expect(after.canCommit).toBe(false);
    expect(after.commitReasons.join(' ')).toContain('embedded Git repositories');
  });

  it('checks github private repo successfully and enriches status fields', async () => {
    initGitSync();
    connectGitRemote({ provider: 'github', remoteUrl: 'https://github.com/acme/demo.git' });
    saveGitTokenAuth({ provider: 'github', token: 'token-demo', username: 'octocat' });
    const httpsSpy = mockHttpsResponses([
      {
        match: '/repos/acme/demo',
        body: { private: true },
      },
    ]);

    const result = await checkGitRemotePrivate();
    expect(result.success).toBe(true);
    expect(result.status.repoPrivate).toBe(true);
    expect(result.status.remoteWebUrl).toBe('https://github.com/acme/demo');
    expect(result.status.remoteOwner).toBe('acme');
    expect(result.status.remoteRepo).toBe('demo');
    expect(result.status.accountUsername).toBe('octocat');
    expect(result.status.canPush).toBe(true);
    expect(httpsSpy).toHaveBeenCalled();
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

  it('completes github OAuth successfully and saves the authenticated account', async () => {
    initGitSync();
    const httpsSpy = mockHttpsResponses([
      {
        match: '/login/oauth/access_token',
        body: { access_token: 'oauth-demo-token' },
      },
      {
        match: '/user',
        body: { login: 'octocat' },
      },
    ]);

    const result = await startOAuthLogin({
      provider: 'github',
      clientId: 'demo-client-id',
      clientSecret: 'demo-client-secret',
      openBrowser: false,
    });

    expect(result.success).toBe(true);
    expect(result.output).toContain('github.com/login/oauth/authorize');

    const authorizeUrl = new URL(String(result.output));
    const oauthState = authorizeUrl.searchParams.get('state');
    const callbackUrl = `${result.status.oauth.redirectUrl}?code=demo-code&state=${oauthState}`;
    const response = await httpGetText(callbackUrl);
    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('OpenClaw Guard OAuth completed');

    await new Promise((resolve) => setTimeout(resolve, 50));

    const status = getGitSyncStatus();
    expect(status.oauth.phase).toBe('success');
    expect(status.authConfigured).toBe(true);
    expect(status.authMode).toBe('oauth');
    expect(status.accountUsername).toBe('octocat');
    const requestedUrls = httpsSpy.mock.calls.map(([target]) => (
      typeof target === 'string'
        ? target
        : target?.href || target?.toString?.() || ''
    ));
    expect(requestedUrls.some((item) => item.includes('/login/oauth/access_token'))).toBe(true);
    expect(requestedUrls.some((item) => item.includes('/user'))).toBe(true);
  }, 15000);
});
