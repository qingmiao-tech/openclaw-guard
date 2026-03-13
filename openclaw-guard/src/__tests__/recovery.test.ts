import fs from 'node:fs';
import https from 'node:https';
import os from 'node:os';
import path from 'node:path';
import { EventEmitter } from 'node:events';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  checkGitRemotePrivate,
  connectGitRemote,
  initGitSync,
  saveGitTokenAuth,
} from '../git-sync.js';
import {
  getRecoveryOverview,
  listRecoveryPoints,
  restoreRecoveryPoint,
  saveRecoveryPoint,
} from '../recovery.js';

function configureGitIdentity(repoRoot: string) {
  execFileSync('git', ['-C', repoRoot, 'config', 'user.name', 'OpenClaw Guard Test'], { stdio: 'ignore' });
  execFileSync('git', ['-C', repoRoot, 'config', 'user.email', 'guard@example.com'], { stdio: 'ignore' });
}

function getHeadMessage(repoRoot: string): string {
  return execFileSync('git', ['-C', repoRoot, 'log', '-1', '--pretty=%s'], {
    encoding: 'utf-8',
  }).trim();
}

function normalizeLineEndings(value: string): string {
  return value.replace(/\r\n/g, '\n');
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

describe('recovery', () => {
  let tempRoot: string;

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'guard-recovery-'));
    vi.stubEnv('OPENCLAW_STATE_DIR', tempRoot);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it('creates a local recovery point when cloud protection is not ready', () => {
    initGitSync();
    configureGitIdentity(tempRoot);
    fs.writeFileSync(path.join(tempRoot, 'README.md'), '# guard\n', 'utf-8');

    const result = saveRecoveryPoint('first-state');

    expect(result.success).toBe(true);
    expect(result.pushed).toBe(false);
    expect(result.createdPoint?.kind).toBe('manual');
    expect(result.createdPoint?.title).toBe('first-state');
    expect(result.overview.protected).toBe(true);
    expect(result.overview.remoteReady).toBe(false);
    expect(getHeadMessage(tempRoot)).toBe('guard: checkpoint first-state');
    expect(listRecoveryPoints(5)[0]?.commitSha).toBe(result.createdPoint?.commitSha);
  }, 15000);

  it('pushes a saved recovery point when the private remote is ready', async () => {
    initGitSync();
    configureGitIdentity(tempRoot);

    const bareRemotePath = path.join(tempRoot, 'remote.git');
    execFileSync('git', ['init', '--bare', bareRemotePath], { stdio: 'ignore' });

    connectGitRemote({ provider: 'github', remoteUrl: 'https://github.com/acme/demo.git' });
    saveGitTokenAuth({ provider: 'github', token: 'token-demo', username: 'octocat' });
    const httpsSpy = mockHttpsResponses([
      {
        match: '/repos/acme/demo',
        body: { private: true },
      },
    ]);
    const privateCheck = await checkGitRemotePrivate();
    expect(privateCheck.success).toBe(true);
    expect(httpsSpy).toHaveBeenCalled();

    const bareRemoteUrl = pathToFileURL(bareRemotePath).href;
    execFileSync('git', ['-C', tempRoot, 'config', `url.${bareRemoteUrl}.insteadOf`, 'https://x-access-token:token-demo@github.com/acme/demo.git'], { stdio: 'ignore' });
    fs.writeFileSync(path.join(tempRoot, 'README.md'), '# synced\n', 'utf-8');

    const result = saveRecoveryPoint('synced-state');

    expect(result.success).toBe(true);
    expect(result.pushed).toBe(true);
    expect(result.createdPoint?.pushed).toBe(true);
    expect(getRecoveryOverview().remoteReady).toBe(true);

    const branch = execFileSync('git', ['-C', tempRoot, 'branch', '--show-current'], { encoding: 'utf-8' }).trim() || 'master';
    const remoteHeadMessage = execFileSync('git', [`--git-dir=${bareRemotePath}`, 'log', '-1', '--pretty=%s', branch], { encoding: 'utf-8' }).trim();
    expect(remoteHeadMessage).toBe('guard: checkpoint synced-state');
  }, 20000);

  it('restores an older point on the same branch and records auto protection first', () => {
    initGitSync();
    configureGitIdentity(tempRoot);

    const documentPath = path.join(tempRoot, 'memory.md');

    fs.writeFileSync(documentPath, 'version-1\n', 'utf-8');
    const firstSave = saveRecoveryPoint('version-1');
    expect(firstSave.success).toBe(true);

    fs.writeFileSync(documentPath, 'version-2\n', 'utf-8');
    const secondSave = saveRecoveryPoint('version-2');
    expect(secondSave.success).toBe(true);

    fs.writeFileSync(documentPath, 'dirty-before-restore\n', 'utf-8');
    const branchBeforeRestore = execFileSync('git', ['-C', tempRoot, 'branch', '--show-current'], { encoding: 'utf-8' }).trim() || 'master';

    const restoreResult = restoreRecoveryPoint(firstSave.createdPoint?.commitSha || '');

    expect(restoreResult.success).toBe(true);
    expect(restoreResult.branch).toBe(branchBeforeRestore);
    expect(normalizeLineEndings(fs.readFileSync(documentPath, 'utf-8'))).toBe('version-1\n');

    const recentPoints = listRecoveryPoints(6);
    expect(recentPoints[0]?.kind).toBe('restore');
    expect(recentPoints[0]?.sourceCommitSha).toBe(firstSave.createdPoint?.commitSha);
    expect(recentPoints.some((point) => point.kind === 'auto')).toBe(true);

    const recentSubjects = execFileSync('git', ['-C', tempRoot, 'log', '-4', '--pretty=%s'], {
      encoding: 'utf-8',
    }).trim().split(/\r?\n/);
    expect(recentSubjects[0]).toBe(`guard: restore to ${firstSave.createdPoint?.shortSha}`);
    expect(recentSubjects).toContain('guard: auto checkpoint before restore');
    expect(recentSubjects).toContain('guard: checkpoint version-2');
    expect(getRecoveryOverview().nextAction).toBe('review-restored-state');
  }, 20000);
});
