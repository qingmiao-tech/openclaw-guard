import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  packageRoot: '',
  packageName: '@qingmiao-tech/openclaw-guard',
  packageVersion: '0.9.3',
  spawn: vi.fn(),
  spawnSync: vi.fn(),
}));

vi.mock('../app-meta.js', () => ({
  GUARD_PACKAGE_NAME: mocks.packageName,
  GUARD_PACKAGE_ROOT: mocks.packageRoot,
  GUARD_VERSION: mocks.packageVersion,
}));

vi.mock('node:child_process', () => ({
  spawn: mocks.spawn,
  spawnSync: mocks.spawnSync,
}));

describe('guard-self-update', () => {
  let tempRoot = '';
  let globalNodeModules = '';
  let packageRoot = '';
  let guardSelfUpdate: typeof import('../guard-self-update.js');

  beforeEach(async () => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'guard-self-update-'));
    globalNodeModules = path.join(tempRoot, 'global-node-modules');
    packageRoot = path.join(globalNodeModules, '@qingmiao-tech', 'openclaw-guard');
    fs.mkdirSync(packageRoot, { recursive: true });
    fs.writeFileSync(path.join(packageRoot, 'package.json'), JSON.stringify({
      name: mocks.packageName,
      version: '0.9.3',
    }, null, 2), 'utf-8');

    mocks.packageRoot = packageRoot;
    mocks.packageVersion = '0.9.3';

    vi.resetModules();
    vi.clearAllMocks();
    vi.stubEnv('OPENCLAW_STATE_DIR', tempRoot);

    mocks.spawn.mockImplementation(() => ({
      pid: 45678,
      unref: vi.fn(),
    }));
    mocks.spawnSync.mockImplementation((command: string, argsOrOptions: string[] | Record<string, unknown> = []) => {
      const args = Array.isArray(argsOrOptions) ? argsOrOptions : [];
      const commandLine = [command, ...args].join(' ').trim();
      if (command === 'npm' && args[0] === '--version' || commandLine === 'npm --version') {
        return { status: 0, stdout: '10.9.3', stderr: '', error: null };
      }
      if (command === 'npm' && args[0] === 'root' && args[1] === '-g' || commandLine === 'npm root -g') {
        return { status: 0, stdout: globalNodeModules, stderr: '', error: null };
      }
      if (command === 'npm' && args[0] === 'view' && args[1] === mocks.packageName && args[2] === 'version'
        || commandLine.startsWith(`npm view ${mocks.packageName} version`)) {
        return { status: 0, stdout: '0.9.4', stderr: '', error: null };
      }
      if (command === 'npm' && args[0] === 'install' && args[1] === '-g' || commandLine.startsWith(`npm install -g ${mocks.packageName}@`)) {
        fs.writeFileSync(path.join(packageRoot, 'package.json'), JSON.stringify({
          name: mocks.packageName,
          version: '0.9.4',
        }, null, 2), 'utf-8');
        return { status: 0, stdout: 'installed', stderr: '', error: null };
      }
      throw new Error(`unexpected spawnSync call: ${command} ${args.join(' ')}`);
    });

    guardSelfUpdate = await import('../guard-self-update.js');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it('detects a globally installed Guard package and reports update availability', () => {
    const status = guardSelfUpdate.getGuardSelfStatus({ bypassCache: true });

    expect(status.currentVersion).toBe('0.9.3');
    expect(status.latestVersion).toBe('0.9.4');
    expect(status.installSource).toBe('npm-global');
    expect(status.updateSupported).toBe(true);
    expect(status.updateAvailable).toBe(true);
    expect(status.nextAction).toBe('update-now');
    expect(status.updateCommand).toContain('@0.9.4');
  });

  it('updates Guard in place and restarts the background workbench', async () => {
    const clearRuntimeRecord = vi.fn();
    const stopPid = vi.fn().mockReturnValue(true);
    const isPidAlive = vi.fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);
    const startBackground = vi.fn().mockResolvedValue({
      success: true,
      message: 'started',
      pid: 8765,
      status: {
        running: true,
        pid: 8765,
        port: 18088,
        source: 'pid-file',
        managed: true,
        pidFile: path.join(tempRoot, 'guard-web.pid.json'),
      },
    });
    const readStatus = vi.fn()
      .mockReturnValueOnce({
        packageName: mocks.packageName,
        currentVersion: '0.9.3',
        latestVersion: '0.9.4',
        updateAvailable: true,
        installSource: 'npm-global',
        updateSupported: true,
        nextAction: 'update-now',
        packageRoot,
        binPath: path.join(packageRoot, 'dist', 'index.js'),
        nodeVersion: process.version,
        npmVersion: '10.9.3',
        globalNodeModules,
        updateCommand: `npm install -g ${mocks.packageName}@0.9.4`,
        releaseUrl: 'https://github.com/qingmiao-tech/openclaw-guard/releases',
        docsUrl: 'https://qingmiao-tech.github.io/openclaw-guard/',
        action: { phase: 'idle' },
      })
      .mockReturnValueOnce({
        packageName: mocks.packageName,
        currentVersion: '0.9.4',
        latestVersion: '0.9.4',
        updateAvailable: false,
        installSource: 'npm-global',
        updateSupported: true,
        nextAction: 'manual',
        packageRoot,
        binPath: path.join(packageRoot, 'dist', 'index.js'),
        nodeVersion: process.version,
        npmVersion: '10.9.3',
        globalNodeModules,
        updateCommand: `npm install -g ${mocks.packageName}@latest`,
        releaseUrl: 'https://github.com/qingmiao-tech/openclaw-guard/releases',
        docsUrl: 'https://qingmiao-tech.github.io/openclaw-guard/',
        action: { phase: 'idle' },
      });

    const result = await guardSelfUpdate.runGuardSelfUpdateTask({
      port: 18088,
      currentPid: 4321,
      responseGraceMs: 0,
    }, {
      wait: async () => undefined,
      isPidAlive,
      stopPid,
      clearRuntimeRecord,
      startBackground,
      readStatus,
    });

    expect(stopPid).toHaveBeenCalledWith(4321);
    expect(clearRuntimeRecord).toHaveBeenCalledWith(4321);
    expect(startBackground).toHaveBeenCalledWith({ port: 18088 });
    expect(result.phase).toBe('completed');
    expect(result.newPid).toBe(8765);
    expect(result.message).toContain('v0.9.4');
  });
});
