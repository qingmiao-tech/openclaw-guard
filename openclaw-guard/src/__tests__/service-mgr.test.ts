import { beforeEach, describe, expect, it, vi } from 'vitest';

const spawnSyncMock = vi.fn();

vi.mock('node:child_process', () => ({
  spawn: vi.fn(),
  spawnSync: spawnSyncMock,
}));

vi.mock('../openclaw.js', () => ({
  getOpenClawBinPath: vi.fn(() => 'C:/mock/openclaw'),
  getOpenClawCommand: vi.fn(() => 'C:/mock/openclaw'),
}));

describe('service-mgr getLogs', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
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
});
