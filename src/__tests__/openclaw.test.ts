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
  let processKillSpy: ReturnType<typeof vi.spyOn> | null = null;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    processKillSpy = vi.spyOn(process, 'kill').mockImplementation(() => true as never);

    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'openclaw-guard-openclaw-'));
    externalBinary = path.join(tempRoot, 'external', 'openclaw.cmd');
    fs.mkdirSync(path.dirname(externalBinary), { recursive: true });
    fs.writeFileSync(externalBinary, '@echo off\r\n', 'utf-8');

    mocks.detectPlatform.mockReturnValue('windows');
    mocks.getHomeDir.mockImplementation(() => tempRoot);
    mocks.getOpenClawDir.mockImplementation(() => path.join(tempRoot, '.openclaw'));
    mocks.spawn.mockImplementation(() => ({
      pid: 43210,
      unref: vi.fn(),
    }));
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
      if (path.resolve(command) === path.resolve(externalBinary) && args[0] === 'update' && args[1] === 'status' && args[2] === '--json') {
        return {
          status: 0,
          stdout: JSON.stringify({
            update: {
              root: 'E:\\ProgramFiles\\nvm\\node_global\\node_modules\\openclaw',
              installKind: 'package',
              packageManager: 'pnpm',
            },
            channel: {
              value: 'stable',
              source: 'default',
              label: 'stable (default)',
            },
            availability: {
              available: true,
              latestVersion: '2026.3.12',
              hasGitUpdate: false,
              hasRegistryUpdate: true,
              gitBehind: null,
            },
          }),
          stderr: '',
          error: null,
        };
      }
      throw new Error(`unexpected spawnSync call: ${command} ${args.join(' ')}`);
    });

    vi.stubEnv('OPENCLAW_GUARD_OPENCLAW_BIN', externalBinary);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    processKillSpy?.mockRestore();
    processKillSpy = null;
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it('schedules an official in-place update for a PATH-managed install', async () => {
    const { scheduleOpenClawTask } = await import('../openclaw.js');

    const result = scheduleOpenClawTask('update');

    expect(result.success).toBe(true);
    expect(result.scheduled).toBe(true);
    expect(result.status.installed).toBe(true);
    expect(result.status.version).toBe('2026.2.25');
    expect(result.status.detectedSource).toBe('path');
    expect(result.status.installKind).toBe('package');
    expect(result.status.packageManager).toBe('pnpm');
    expect(result.status.updateChannel).toBe('stable');
    expect(result.status.officialStatusAvailable).toBe(true);
    expect(result.status.effectiveUpdater).toBe('official-cli');
    expect(result.action.phase).toBe('running');
    expect(result.action.pid).toBe(43210);
    expect(result.message).toContain('后台发起');
    expect(mocks.spawn).toHaveBeenCalledTimes(1);
  });
});
