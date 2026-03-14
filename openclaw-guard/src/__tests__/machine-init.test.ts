import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const detectPlatformMock = vi.fn(() => 'windows');
const resolveManagedPrefixMock = vi.fn((managedPrefix?: string) => managedPrefix || 'C:/Users/demo/.openclaw/guard/npm-global');
const getOpenClawManagedBinDirMock = vi.fn((managedPrefix?: string) => resolveManagedPrefixMock(managedPrefix));
const detectOpenClawMock = vi.fn();
const runOpenClawTaskMock = vi.fn();
const getWebBackgroundReportMock = vi.fn();
const startWebBackgroundServiceMock = vi.fn();
const ensureDirMock = vi.fn();
const getAuthStatusMock = vi.fn();
const initAuthMock = vi.fn();
const isAuthEnabledMock = vi.fn(() => true);

vi.mock('../platform.js', () => ({
  detectPlatform: detectPlatformMock,
}));

vi.mock('../guard-state.js', () => ({
  ensureDir: ensureDirMock,
}));

vi.mock('../auth.js', () => ({
  getAuthStatus: getAuthStatusMock,
  initAuth: initAuthMock,
  isAuthEnabled: isAuthEnabledMock,
}));

vi.mock('../openclaw.js', () => ({
  detectOpenClaw: detectOpenClawMock,
  getOpenClawManagedBinDir: getOpenClawManagedBinDirMock,
  resolveManagedPrefix: resolveManagedPrefixMock,
  runOpenClawTask: runOpenClawTaskMock,
}));

vi.mock('../web-background.js', () => ({
  getWebBackgroundReport: getWebBackgroundReportMock,
  startWebBackgroundService: startWebBackgroundServiceMock,
}));

function buildOpenClawStatus(overrides: Record<string, unknown> = {}) {
  const managedPrefix = String(overrides.managedPrefix || 'C:/custom/prefix');
  return {
    installed: false,
    version: null,
    latestVersion: '2026.3.12',
    updateAvailable: false,
    binPath: null,
    detectedSource: 'none',
    managedPrefix,
    managedBinDir: managedPrefix,
    managedBinaryPath: `${managedPrefix}/openclaw.cmd`,
    nodeVersion: process.version,
    npmVersion: '10.9.0',
    npmPrefix: 'C:/Users/demo/AppData/Roaming/npm',
    installReady: true,
    installCommand: `npm install -g openclaw@latest --prefix "${managedPrefix}"`,
    installBlockers: [],
    installTargetBinDir: managedPrefix,
    installTargetBinaryPath: `${managedPrefix}/openclaw.cmd`,
    platformNotes: [],
    action: {
      mode: null,
      phase: 'idle',
      pid: null,
      startedAt: null,
      finishedAt: null,
      lastUpdatedAt: null,
      message: null,
      error: null,
      logTail: [],
    },
    ...overrides,
  };
}

function buildWebReport(port: number, overrides: Record<string, unknown> = {}) {
  return {
    running: false,
    pid: null,
    port,
    managed: false,
    source: 'none',
    primaryUrl: `http://127.0.0.1:${port}/`,
    workbenchUrl: `http://127.0.0.1:${port}/workbench`,
    nextAction: 'start-web',
    scenario: 'stopped',
    pidFile: 'C:/custom/prefix/guard-web.pid.json',
    logPaths: {
      stdout: 'C:/custom/prefix/guard-web.out.log',
      stderr: 'C:/custom/prefix/guard-web.err.log',
    },
    ...overrides,
  };
}

describe('machine-init', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    detectPlatformMock.mockReturnValue('windows');
    resolveManagedPrefixMock.mockImplementation((managedPrefix?: string) => managedPrefix || 'C:/Users/demo/.openclaw/guard/npm-global');
    getOpenClawManagedBinDirMock.mockImplementation((managedPrefix?: string) => resolveManagedPrefixMock(managedPrefix));
    ensureDirMock.mockImplementation((value?: string) => value);
    isAuthEnabledMock.mockReturnValue(true);
    initAuthMock.mockReturnValue({ isNew: false });
    getAuthStatusMock.mockReturnValue({
      enabled: true,
      configured: true,
      initialPasswordAvailable: true,
      initialPasswordCreatedAt: '2026-03-14T00:00:00.000Z',
      revealCommand: 'openclaw-guard auth show-password',
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns structured dry-run steps without mutating OpenClaw or web state', async () => {
    detectOpenClawMock.mockImplementation(({ managedPrefix }: { managedPrefix?: string }) => buildOpenClawStatus({
      managedPrefix: resolveManagedPrefixMock(managedPrefix),
    }));
    getWebBackgroundReportMock.mockImplementation((port: number) => buildWebReport(port));

    const { runMachineInit } = await import('../machine-init.js');
    const result = await runMachineInit({
      installOpenClaw: true,
      startWeb: true,
      port: 18090,
      managedPrefix: 'C:/demo/guard-prefix',
      dryRun: true,
    });

    expect(result.ok).toBe(true);
    expect(result.managedPrefix).toBe('C:/demo/guard-prefix');
    expect(result.steps.map((step) => step.id)).toEqual([
      'detect-platform',
      'resolve-managed-prefix',
      'validate-node-npm',
      'install-guard',
      'validate-path',
      'install-openclaw',
      'start-web',
    ]);
    expect(result.steps.find((step) => step.id === 'install-openclaw')?.status).toBe('dry-run');
    expect(result.steps.find((step) => step.id === 'start-web')?.status).toBe('dry-run');
    expect(runOpenClawTaskMock).not.toHaveBeenCalled();
    expect(startWebBackgroundServiceMock).not.toHaveBeenCalled();
    expect(initAuthMock).not.toHaveBeenCalled();
    expect(result.auth.initializedNow).toBe(false);
  });

  it('installs OpenClaw into the managed prefix and starts Guard Web when requested', async () => {
    let installed = false;
    let webRunning = false;

    detectOpenClawMock.mockImplementation(({ managedPrefix }: { managedPrefix?: string }) => {
      const resolvedPrefix = resolveManagedPrefixMock(managedPrefix);
      return installed
        ? buildOpenClawStatus({
          installed: true,
          version: '2026.3.12',
          binPath: `${resolvedPrefix}/openclaw.cmd`,
          detectedSource: 'managed-prefix',
          managedPrefix: resolvedPrefix,
        })
        : buildOpenClawStatus({
          managedPrefix: resolvedPrefix,
        });
    });
    runOpenClawTaskMock.mockImplementation(() => {
      installed = true;
      return {
        mode: 'install',
        phase: 'completed',
        pid: process.pid,
        startedAt: '2026-03-12T10:00:00.000Z',
        finishedAt: '2026-03-12T10:00:05.000Z',
        lastUpdatedAt: '2026-03-12T10:00:05.000Z',
        message: 'OpenClaw 安装成功。',
        error: null,
        logTail: [],
      };
    });
    getWebBackgroundReportMock.mockImplementation((port: number) => buildWebReport(port, webRunning ? {
      running: true,
      pid: 4321,
      managed: true,
      source: 'pid-file',
      scenario: 'managed-running',
      nextAction: 'open-workbench',
    } : {}));
    startWebBackgroundServiceMock.mockImplementation(async ({ port }: { port: number }) => {
      webRunning = true;
      return {
        success: true,
        message: `Guard Web 后台服务已启动，PID 4321，端口 ${port}。`,
        status: {
          running: true,
          pid: 4321,
          port,
          managed: true,
          source: 'pid-file',
          pidFile: 'C:/custom/prefix/guard-web.pid.json',
        },
      };
    });
    initAuthMock.mockReturnValue({ isNew: true, password: 'DemoInitPwd' });

    const { runMachineInit } = await import('../machine-init.js');
    const result = await runMachineInit({
      installOpenClaw: true,
      startWeb: true,
      managedPrefix: 'C:/demo/guard-prefix',
    });

    expect(result.ok).toBe(true);
    expect(runOpenClawTaskMock).toHaveBeenCalledWith('install', { managedPrefix: 'C:/demo/guard-prefix' });
    expect(startWebBackgroundServiceMock).toHaveBeenCalledWith({ port: 18088 });
    expect(result.steps.find((step) => step.id === 'install-openclaw')?.status).toBe('completed');
    expect(result.steps.find((step) => step.id === 'start-web')?.status).toBe('completed');
    expect(result.openclaw.detectedSource).toBe('managed-prefix');
    expect(result.webReport.running).toBe(true);
    expect(result.webReport.nextAction).toBe('open-workbench');
    expect(initAuthMock).toHaveBeenCalledTimes(1);
    expect(result.auth.initializedNow).toBe(true);
  });
});
