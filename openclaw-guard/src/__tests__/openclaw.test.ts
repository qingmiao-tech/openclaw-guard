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
  let managedPrefix = '';
  let managedBinary = '';
  let npmPrefix = '';
  let npmPrefixBinary = '';
  let pnpmBinary = '';
  let pnpmRoot = '';
  let gitRoot = '';
  let processKillSpy: ReturnType<typeof vi.spyOn> | null = null;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    processKillSpy = vi.spyOn(process, 'kill').mockImplementation(() => true as never);

    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'openclaw-guard-openclaw-'));
    externalBinary = path.join(tempRoot, 'external', 'openclaw.cmd');
    managedPrefix = path.join(tempRoot, '.openclaw', 'guard', 'npm-global');
    managedBinary = path.join(managedPrefix, 'openclaw.cmd');
    npmPrefix = path.join(tempRoot, 'npm-global');
    npmPrefixBinary = path.join(npmPrefix, 'openclaw');
    pnpmRoot = path.join(tempRoot, 'pnpm-global', 'package');
    pnpmBinary = path.join(tempRoot, 'pnpm-home', 'openclaw.cmd');
    gitRoot = path.join(tempRoot, 'openclaw-git');
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
        return { status: 0, stdout: npmPrefix, stderr: '', error: null };
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
              root: path.join(npmPrefix, 'node_modules', 'openclaw'),
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
      if (path.resolve(command) === path.resolve(externalBinary) && args[0] === 'update' && args[1] === '--json') {
        return {
          status: 0,
          stdout: JSON.stringify({
            status: 'updated',
            mode: 'package',
            before: { version: '2026.2.25' },
            after: { version: '2026.3.12' },
          }),
          stderr: '',
          error: null,
        };
      }
      if (path.resolve(command) === path.resolve(externalBinary) && args[0] === 'gateway' && args[1] === 'stop') {
        return { status: 0, stdout: 'stopped', stderr: '', error: null };
      }
      if (path.resolve(command) === path.resolve(managedBinary) && args[0] === '--version') {
        if (!fs.existsSync(managedBinary)) {
          return { status: 1, stdout: '', stderr: 'missing', error: null };
        }
        return { status: 0, stdout: 'openclaw 2026.2.20', stderr: '', error: null };
      }
      if (path.resolve(command) === path.resolve(managedBinary) && args[0] === 'update' && args[1] === 'status' && args[2] === '--json') {
        return { status: 1, stdout: '', stderr: 'official status unavailable', error: null };
      }
      if (path.resolve(command) === path.resolve(managedBinary) && args[0] === 'gateway' && args[1] === 'stop') {
        return { status: 0, stdout: 'stopped', stderr: '', error: null };
      }
      if (path.resolve(command) === path.resolve(npmPrefixBinary) && args[0] === '--version') {
        return { status: 0, stdout: 'openclaw 2026.2.25', stderr: '', error: null };
      }
      if (path.resolve(command) === path.resolve(npmPrefixBinary) && args[0] === 'gateway' && args[1] === 'stop') {
        return { status: 0, stdout: 'stopped', stderr: '', error: null };
      }
      if (path.resolve(command) === path.resolve(npmPrefixBinary) && args[0] === 'update' && args[1] === 'status' && args[2] === '--json') {
        return {
          status: 0,
          stdout: JSON.stringify({
            update: {
              root: path.join(npmPrefix, 'node_modules', 'openclaw'),
              installKind: 'unknown',
              packageManager: 'unknown',
            },
            availability: {
              available: true,
              latestVersion: '2026.3.12',
              hasRegistryUpdate: true,
            },
          }),
          stderr: '',
          error: null,
        };
      }
      if (path.resolve(command) === path.resolve(pnpmBinary) && args[0] === '--version') {
        return { status: 0, stdout: 'openclaw 2026.2.30', stderr: '', error: null };
      }
      if (path.resolve(command) === path.resolve(pnpmBinary) && args[0] === 'gateway' && args[1] === 'stop') {
        return { status: 0, stdout: 'stopped', stderr: '', error: null };
      }
      if (path.resolve(command) === path.resolve(pnpmBinary) && args[0] === 'update' && args[1] === 'status' && args[2] === '--json') {
        return {
          status: 0,
          stdout: JSON.stringify({
            update: {
              root: pnpmRoot,
              installKind: 'package',
              packageManager: 'pnpm',
            },
            channel: {
              value: 'stable',
              source: 'default',
              label: 'stable (default)',
            },
            availability: {
              available: false,
              latestVersion: '2026.2.30',
              hasRegistryUpdate: false,
            },
          }),
          stderr: '',
          error: null,
        };
      }
      if (command === 'npm' && args[0] === 'uninstall' && args[1] === '-g' && args[2] === 'openclaw' && args.includes('--prefix')) {
        const prefix = args[args.indexOf('--prefix') + 1];
        if (path.resolve(prefix) === path.resolve(managedPrefix)) {
          return { status: 0, stdout: 'removed', stderr: '', error: null };
        }
        if (path.resolve(prefix) === path.resolve(npmPrefix)) {
          return { status: 0, stdout: 'removed npm global', stderr: '', error: null };
        }
      }
      if (command === 'pnpm' && args[0] === 'remove' && args[1] === '-g' && args[2] === 'openclaw') {
        fs.rmSync(pnpmBinary, { force: true });
        return { status: 0, stdout: 'removed pnpm global', stderr: '', error: null };
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
  it('falls back to npm when the official updater cannot detect the package manager for a global install', async () => {
    const baseImpl = mocks.spawnSync.getMockImplementation();
    mocks.spawnSync.mockImplementation((command: string, args: string[] = []) => {
      if (path.resolve(command) === path.resolve(externalBinary) && args[0] === 'update' && args[1] === 'status' && args[2] === '--json') {
        return {
          status: 0,
          stdout: JSON.stringify({
            update: {
              root: path.join(npmPrefix, 'node_modules', 'openclaw'),
              installKind: 'unknown',
              packageManager: 'unknown',
            },
            availability: {
              available: true,
              latestVersion: '2026.3.12',
              hasRegistryUpdate: true,
            },
          }),
          stderr: '',
          error: null,
        };
      }
      if (path.resolve(command) === path.resolve(externalBinary) && args[0] === 'update' && args[1] === '--json') {
        return {
          status: 0,
          stdout: JSON.stringify({
            status: 'skipped',
            mode: 'unknown',
            root: path.join(npmPrefix, 'node_modules', 'openclaw'),
            reason: 'not-git-install',
            before: { version: '2026.2.25' },
            steps: [],
            durationMs: 440,
          }),
          stderr: "Skipped: this OpenClaw install isn't a git checkout, and the package manager couldn't be detected.",
          error: null,
        };
      }
      if (command === 'npm' && args[0] === 'install' && args[1] === '-g' && args[2] === 'openclaw@latest' && args.includes('--prefix')) {
        return {
          status: 0,
          stdout: 'updated via npm',
          stderr: '',
          error: null,
        };
      }
      return baseImpl ? baseImpl(command, args) : { status: 1, stdout: '', stderr: 'unexpected', error: null };
    });

    const { detectOpenClaw, runOpenClawTask } = await import('../openclaw.js');

    const status = detectOpenClaw({ bypassCache: true });
    const result = runOpenClawTask('update');

    expect(status.installKind).toBe('package');
    expect(status.packageManager).toBe('npm');
    expect(result.phase).toBe('completed');
    expect(result.logTail.join('\n')).toContain('updated via npm');
    expect(mocks.spawnSync).toHaveBeenCalledWith(
      'npm',
      expect.arrayContaining(['install', '-g', 'openclaw@latest', '--prefix', npmPrefix]),
      expect.any(Object),
    );
  });

  it('uninstalls a Guard-managed OpenClaw install end-to-end', async () => {
    fs.mkdirSync(path.dirname(managedBinary), { recursive: true });
    fs.writeFileSync(managedBinary, '@echo off\r\n', 'utf-8');

    const { detectOpenClaw, runOpenClawTask } = await import('../openclaw.js');

    const result = runOpenClawTask('uninstall');
    const status = detectOpenClaw({ bypassCache: true });

    expect(result.phase).toBe('completed');
    expect(result.message).toContain('卸载');
    expect(status.installed).toBe(false);
    expect(fs.existsSync(managedPrefix)).toBe(false);
  });
  it('uninstalls an npm-global OpenClaw install through the original package-manager flow', async () => {
    fs.mkdirSync(path.dirname(npmPrefixBinary), { recursive: true });
    fs.writeFileSync(npmPrefixBinary, '', 'utf-8');
    vi.stubEnv('OPENCLAW_GUARD_OPENCLAW_BIN', npmPrefixBinary);

    const { detectOpenClaw, runOpenClawTask } = await import('../openclaw.js');

    const before = detectOpenClaw({ bypassCache: true });
    const result = runOpenClawTask('uninstall');

    expect(before.detectedSource).toBe('npm-prefix');
    expect(before.installKind).toBe('package');
    expect(before.packageManager).toBe('npm');
    expect(before.uninstallPlan.mode).toBe('package-manager');
    expect(before.uninstallPlan.command).toContain('npm uninstall -g openclaw');
    expect(result.phase).toBe('completed');
    expect(mocks.spawnSync).toHaveBeenCalledWith(
      'npm',
      expect.arrayContaining(['uninstall', '-g', 'openclaw', '--prefix', npmPrefix]),
      expect.any(Object),
    );
    expect(fs.existsSync(npmPrefixBinary)).toBe(false);
  });

  it('uninstalls a pnpm-managed OpenClaw install through pnpm', async () => {
    fs.mkdirSync(path.dirname(pnpmBinary), { recursive: true });
    fs.writeFileSync(pnpmBinary, '@echo off\r\n', 'utf-8');
    vi.stubEnv('OPENCLAW_GUARD_OPENCLAW_BIN', pnpmBinary);

    const { detectOpenClaw, runOpenClawTask } = await import('../openclaw.js');

    const before = detectOpenClaw({ bypassCache: true });
    const result = runOpenClawTask('uninstall');

    expect(before.packageManager).toBe('pnpm');
    expect(before.uninstallPlan.mode).toBe('package-manager');
    expect(before.uninstallPlan.command).toBe('pnpm remove -g openclaw');
    expect(result.phase).toBe('completed');
    expect(mocks.spawnSync).toHaveBeenCalledWith(
      'pnpm',
      ['remove', '-g', 'openclaw'],
      expect.any(Object),
    );
    expect(fs.existsSync(pnpmBinary)).toBe(false);
  });

  it('keeps source checkouts in manual mode instead of deleting the repository automatically', async () => {
    fs.mkdirSync(path.join(gitRoot, '.git'), { recursive: true });
    const baseImpl = mocks.spawnSync.getMockImplementation();
    mocks.spawnSync.mockImplementation((command: string, args: string[] = []) => {
      if (path.resolve(command) === path.resolve(externalBinary) && args[0] === 'update' && args[1] === 'status' && args[2] === '--json') {
        return {
          status: 0,
          stdout: JSON.stringify({
            update: {
              root: gitRoot,
              installKind: 'unknown',
              packageManager: 'unknown',
            },
            availability: {
              available: false,
              latestVersion: null,
              hasGitUpdate: false,
              hasRegistryUpdate: false,
            },
          }),
          stderr: '',
          error: null,
        };
      }
      return baseImpl ? baseImpl(command, args) : { status: 1, stdout: '', stderr: 'unexpected', error: null };
    });

    const { detectOpenClaw, runOpenClawTask } = await import('../openclaw.js');

    const before = detectOpenClaw({ bypassCache: true });
    const result = runOpenClawTask('uninstall');

    expect(before.installKind).toBe('git');
    expect(before.uninstallPlan.mode).toBe('git-manual');
    expect(before.uninstallPlan.autoSupported).toBe(false);
    expect(result.phase).toBe('error');
    expect(result.error).toContain('manual');
    expect(fs.existsSync(gitRoot)).toBe(true);
  });
});
