import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('guard-restart', () => {
  let tempRoot: string;
  let guardRestart: typeof import('../guard-restart.js');

  beforeEach(async () => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'guard-restart-'));
    vi.resetModules();
    vi.stubEnv('OPENCLAW_STATE_DIR', tempRoot);
    vi.stubEnv('OPENCLAW_GUARD_PROJECT_ROOT', path.resolve(process.cwd()));
    guardRestart = await import('../guard-restart.js');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it('marks a stale running restart task as error', () => {
    const stateDir = path.join(tempRoot, 'guard', 'state');
    fs.mkdirSync(stateDir, { recursive: true });
    fs.writeFileSync(path.join(stateDir, 'guard-restart.json'), JSON.stringify({
      phase: 'running',
      pid: 999999,
      port: 18088,
      targetPid: 1234,
      newPid: null,
      restartGateway: false,
      startedAt: '2026-03-10T00:00:00.000Z',
      finishedAt: null,
      lastUpdatedAt: '2026-03-10T00:00:01.000Z',
      message: 'running',
      error: null,
    }, null, 2), 'utf-8');

    const status = guardRestart.getGuardRestartStatus();
    expect(status.phase).toBe('error');
    expect(status.finishedAt).not.toBeNull();
    expect(status.message).toContain('意外结束');
  });

  it('restarts Guard by stopping the old pid and starting a new background instance', async () => {
    const clearRuntimeRecord = vi.fn();
    const stopPid = vi.fn().mockReturnValue(true);
    const isPidAlive = vi.fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);
    const startBackground = vi.fn().mockResolvedValue({
      success: true,
      message: 'started',
      pid: 5678,
      status: {
        running: true,
        pid: 5678,
        port: 18088,
        source: 'pid-file',
        managed: true,
        pidFile: path.join(tempRoot, 'guard-web.pid.json'),
      },
    });

    const result = await guardRestart.runGuardRestartTask({
      port: 18088,
      currentPid: 4321,
      responseGraceMs: 0,
    }, {
      wait: async () => undefined,
      isPidAlive,
      stopPid,
      clearRuntimeRecord,
      startBackground,
      runGatewayRestart: () => ({
        phase: 'completed',
        message: 'gateway restarted',
        error: null,
      }),
    });

    expect(stopPid).toHaveBeenCalledWith(4321);
    expect(clearRuntimeRecord).toHaveBeenCalledWith(4321);
    expect(startBackground).toHaveBeenCalledWith({ port: 18088 });
    expect(result.phase).toBe('completed');
    expect(result.newPid).toBe(5678);
    expect(result.message).toContain('Guard 已完整重启');
  });

  it('surfaces gateway restart failure after the new Guard instance is up', async () => {
    const result = await guardRestart.runGuardRestartTask({
      port: 18088,
      currentPid: 4321,
      restartGateway: true,
      responseGraceMs: 0,
    }, {
      wait: async () => undefined,
      isPidAlive: vi.fn()
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false),
      stopPid: vi.fn().mockReturnValue(true),
      clearRuntimeRecord: vi.fn(),
      startBackground: vi.fn().mockResolvedValue({
        success: true,
        message: 'started',
        pid: 6789,
        status: {
          running: true,
          pid: 6789,
          port: 18088,
          source: 'pid-file',
          managed: true,
          pidFile: path.join(tempRoot, 'guard-web.pid.json'),
        },
      }),
      runGatewayRestart: () => ({
        phase: 'error',
        message: 'Gateway 重启失败',
        error: 'gateway failed',
      }),
    });

    expect(result.phase).toBe('error');
    expect(result.newPid).toBe(6789);
    expect(result.error).toContain('gateway failed');
  });
});
