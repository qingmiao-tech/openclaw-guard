import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  detectPlatform: vi.fn(() => 'windows'),
  getHomeDir: vi.fn(() => ''),
  getOpenClawDir: vi.fn(() => ''),
  spawn: vi.fn(),
  spawnSync: vi.fn(),
}));

vi.mock('../platform.js', () => ({
  detectPlatform: mocks.detectPlatform,
  getHomeDir: mocks.getHomeDir,
  getOpenClawDir: mocks.getOpenClawDir,
}));

vi.mock('node:child_process', () => ({
  spawn: mocks.spawn,
  spawnSync: mocks.spawnSync,
}));

describe('openclaw', () => {
  let tempRoot = '';
  let externalBinary = '';

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'openclaw-guard-openclaw-'));
    externalBinary = path.join(tempRoot, 'external', 'openclaw.cmd');
    fs.mkdirSync(path.dirname(externalBinary), { recursive: true });
    fs.writeFileSync(externalBinary, '@echo off\r\n', 'utf-8');

    mocks.detectPlatform.mockReturnValue('windows');
    mocks.getHomeDir.mockImplementation(() => tempRoot);
    mocks.getOpenClawDir.mockImplementation(() => path.join(tempRoot, '.openclaw'));
    mocks.spawn.mockImplementation(() => {
      throw new Error('spawn should not be called for skipped update');
    });
    mocks.spawnSync.mockImplementation((command: string, args: string[] = []) => {
      if (command === 'npm' && args[0] === '--version') {
        return { status: 0, stdout: '10.9.3', stderr: '', error: null };
      }
      if (command === 'npm' && args[0] === 'config' && args[1] === 'get' && args[2] === 'prefix') {
        return { status: 0, stdout: 'E:\\ProgramFiles\\nvm\\node_global', stderr: '', error: null };
      }
      if (command === 'npm' && args[0] === 'view' && args[1] === 'openclaw' && args[2] === 'version') {
        return { status: 0, stdout: '2026.3.12', stderr: '', error: null };
      }
      if (path.resolve(command) === path.resolve(externalBinary) && args[0] === '--version') {
        return { status: 0, stdout: 'openclaw 2026.2.25', stderr: '', error: null };
      }
      throw new Error(`unexpected spawnSync call: ${command} ${args.join(' ')}`);
    });

    vi.stubEnv('OPENCLAW_GUARD_OPENCLAW_BIN', externalBinary);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it('returns a final error state when update is skipped for a PATH-managed install', async () => {
    const { scheduleOpenClawTask } = await import('../openclaw.js');

    const result = scheduleOpenClawTask('update');

    expect(result.success).toBe(false);
    expect(result.scheduled).toBe(false);
    expect(result.status.installed).toBe(true);
    expect(result.status.version).toBe('2026.2.25');
    expect(result.status.detectedSource).toBe('path');
    expect(result.message).toContain('PATH');
    expect(result.message).toContain('OpenClaw');
    expect(result.message).toContain('Guard');
    expect(result.action.phase).toBe('error');
    expect(result.action.error).toContain('Guard');
    expect(result.status.action.phase).toBe('error');
    expect(result.status.action.error).toBe(result.action.error);
    expect(result.action).toEqual(result.status.action);
    expect(result.action.pid).toBeNull();
    expect(result.action.logTail).toEqual([result.action.error]);
    expect(mocks.spawn).not.toHaveBeenCalled();
  });
});
