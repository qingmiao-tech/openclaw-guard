import { beforeEach, describe, expect, it, vi } from 'vitest';

const spawnMock = vi.fn();
const spawnSyncMock = vi.fn();
const execFileSyncMock = vi.fn();
const writeJsonFileMock = vi.fn();
const readJsonFileMock = vi.fn(() => null);
const detectPlatformMock = vi.fn(() => (process.platform === 'win32' ? 'windows' : 'linux'));

vi.mock('node:child_process', () => ({
  spawn: spawnMock,
  spawnSync: spawnSyncMock,
  execFileSync: execFileSyncMock,
}));

vi.mock('../openclaw.js', () => ({
  getOpenClawBinPath: vi.fn(() => 'C:/mock/openclaw'),
  getOpenClawCommand: vi.fn(() => 'C:/mock/openclaw'),
}));

vi.mock('../config.js', () => ({
  loadConfig: vi.fn(() => ({})),
  getNested: vi.fn(() => undefined),
}));

vi.mock('../guard-state.js', () => ({
  ensureGuardLayout: vi.fn(() => ({ stateDir: 'C:/mock/state' })),
  readJsonFile: readJsonFileMock,
  writeJsonFile: writeJsonFileMock,
}));

vi.mock('../platform.js', () => ({
  detectPlatform: detectPlatformMock,
}));

vi.mock('../persistent-cache.js', () => ({
  getPersistentCachedValue: vi.fn((_: string, options: { loader: () => unknown }) => options.loader()),
  invalidatePersistentCache: vi.fn(),
}));

describe('service-mgr', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    readJsonFileMock.mockReturnValue(null);
    detectPlatformMock.mockReturnValue(process.platform === 'win32' ? 'windows' : 'linux');
  });

  it('uses the plain no-color log command before returning parsed lines', async () => {
    spawnSyncMock.mockReturnValue({
      status: 0,
      stdout: 'line one\nline two\n',
      stderr: '',
      error: undefined,
    });

    const { getLogs } = await import('../service-mgr.js');
    const lines = getLogs(25);

    expect(lines).toEqual(['line one', 'line two']);
    expect(spawnSyncMock).toHaveBeenCalledTimes(1);
    expect(spawnSyncMock).toHaveBeenCalledWith(
      'C:/mock/openclaw',
      ['logs', '--plain', '--no-color', '--limit', '25'],
      expect.objectContaining({
        encoding: 'utf-8',
        shell: process.platform === 'win32',
        stdio: 'pipe',
        timeout: 30_000,
        windowsHide: true,
      }),
    );
  });

  it('falls back through supported candidates without using deprecated --lines', async () => {
    spawnSyncMock
      .mockReturnValueOnce({
        status: 1,
        stdout: '',
        stderr: "error: unknown option '--plain'",
        error: undefined,
      })
      .mockReturnValueOnce({
        status: 1,
        stdout: '',
        stderr: "error: unknown option '--no-color'",
        error: undefined,
      })
      .mockReturnValueOnce({
        status: 0,
        stdout: 'tail line',
        stderr: '',
        error: undefined,
      });

    const { getLogs } = await import('../service-mgr.js');
    const lines = getLogs(10);

    expect(lines).toEqual(['tail line']);
    expect(spawnSyncMock).toHaveBeenCalledTimes(3);
    expect(spawnSyncMock.mock.calls.map(([, args]) => args)).toEqual([
      ['logs', '--plain', '--no-color', '--limit', '10'],
      ['logs', '--no-color', '--limit', '10'],
      ['logs', '--limit', '10'],
    ]);
    expect(
      spawnSyncMock.mock.calls.some(([, args]) => Array.isArray(args) && args.includes('--lines')),
    ).toBe(false);
  });

  it('kills a lingering OpenClaw gateway process after official stop leaves the same pid behind', async () => {
    const atomicsWaitSpy = vi.spyOn(Atomics, 'wait').mockReturnValue('timed-out');
    const dateNowSpy = vi.spyOn(Date, 'now');
    detectPlatformMock.mockReturnValue('windows');
    dateNowSpy
      .mockImplementationOnce(() => 0)
      .mockImplementationOnce(() => 1_000)
      .mockImplementationOnce(() => 16_000)
      .mockImplementationOnce(() => 20_000)
      .mockImplementationOnce(() => 29_000);

    spawnSyncMock
      .mockReturnValueOnce({
        status: 0,
        stdout: [
          '  TCP    127.0.0.1:18789        0.0.0.0:0              LISTENING       17232',
          '  TCP    [::1]:18789            [::]:0                 LISTENING       17232',
        ].join('\n'),
        stderr: '',
        error: undefined,
      })
      .mockReturnValueOnce({
        status: 0,
        stdout: 'Stopped Scheduled Task: OpenClaw Gateway',
        stderr: '',
        error: undefined,
      })
      .mockReturnValueOnce({
        status: 0,
        stdout: [
          '  TCP    127.0.0.1:18789        0.0.0.0:0              LISTENING       17232',
          '  TCP    [::1]:18789            [::]:0                 LISTENING       17232',
        ].join('\n'),
        stderr: '',
        error: undefined,
      })
      .mockReturnValueOnce({
        status: 0,
        stdout: [
          '  TCP    127.0.0.1:18789        0.0.0.0:0              LISTENING       17232',
          '  TCP    [::1]:18789            [::]:0                 LISTENING       17232',
        ].join('\n'),
        stderr: '',
        error: undefined,
      })
      .mockReturnValueOnce({
        status: 0,
        stdout: 'C:/mock/openclaw gateway --port 18789',
        stderr: '',
        error: undefined,
      })
      .mockReturnValueOnce({
        status: 0,
        stdout: '  TCP    127.0.0.1:12345        0.0.0.0:0              LISTENING       9999',
        stderr: '',
        error: undefined,
      });

    const { runServiceActionTask } = await import('../service-mgr.js');
    const result = runServiceActionTask('stop');

    expect(result.phase).toBe('completed');
    expect(result.message).toBe('Gateway 已停止（已清理残留 Gateway 进程）。');
    expect(execFileSyncMock).toHaveBeenCalledWith(
      'taskkill',
      ['/PID', '17232', '/T', '/F'],
      expect.objectContaining({
        encoding: 'utf-8',
        windowsHide: true,
      }),
    );

    atomicsWaitSpy.mockRestore();
    dateNowSpy.mockRestore();
  });
});
