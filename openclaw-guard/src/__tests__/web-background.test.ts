import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearWebRuntimeRecord, getWebBackgroundStatus, registerBackgroundProcess, stopWebBackgroundService } from '../web-background.js';

describe('web-background', () => {
  let tempRoot: string;

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'guard-web-bg-'));
    vi.stubEnv('OPENCLAW_GUARD_RUNTIME_DIR', tempRoot);
    vi.stubEnv('OPENCLAW_GUARD_PROJECT_ROOT', tempRoot);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    clearWebRuntimeRecord();
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it('reports a managed background process from the pid file', () => {
    vi.stubEnv('OPENCLAW_GUARD_MOCK_LISTENING_JSON', JSON.stringify([
      { pid: process.pid, port: 18088 },
    ]));
    registerBackgroundProcess(18088, process.pid);

    const status = getWebBackgroundStatus(18088);
    expect(status.running).toBe(true);
    expect(status.pid).toBe(process.pid);
    expect(status.source).toBe('pid-file');
    expect(status.managed).toBe(true);
  });

  it('falls back to port scan when the pid file is missing', () => {
    vi.stubEnv('OPENCLAW_GUARD_MOCK_LISTENING_JSON', JSON.stringify([
      { pid: process.pid, port: 18088 },
    ]));

    const status = getWebBackgroundStatus(18088);
    expect(status.running).toBe(true);
    expect(status.pid).toBe(process.pid);
    expect(status.source).toBe('port-scan');
    expect(status.managed).toBe(false);
  });

  it('returns self-exit when stopping the current managed process', () => {
    vi.stubEnv('OPENCLAW_GUARD_MOCK_LISTENING_JSON', JSON.stringify([
      { pid: process.pid, port: 18088 },
    ]));
    registerBackgroundProcess(18088, process.pid);

    const result = stopWebBackgroundService({
      port: 18088,
      currentPid: process.pid,
    });

    expect(result.success).toBe(true);
    expect(result.selfExit).toBe(true);
    expect(result.status.running).toBe(false);
  });
});
