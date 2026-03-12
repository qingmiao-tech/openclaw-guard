import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  clearWebRuntimeRecord,
  formatWebBackgroundReport,
  getWebBackgroundReport,
  getWebBackgroundStatus,
  registerBackgroundProcess,
  stopWebBackgroundService,
} from '../web-background.js';

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
    const report = getWebBackgroundReport(18088);
    expect(status.running).toBe(true);
    expect(status.pid).toBe(process.pid);
    expect(status.source).toBe('pid-file');
    expect(status.managed).toBe(true);
    expect(report.scenario).toBe('managed-running');
    expect(report.nextAction).toBe('open-workbench');
    expect(report.primaryUrl).toBe('http://127.0.0.1:18088/');
    expect(report.workbenchUrl).toBe('http://127.0.0.1:18088/workbench');
    expect(report.logPaths.stdout).toContain('guard-web.out.log');
    expect(report.logPaths.stderr).toContain('guard-web.err.log');
  });

  it('falls back to port scan when the pid file is missing', () => {
    vi.stubEnv('OPENCLAW_GUARD_MOCK_LISTENING_JSON', JSON.stringify([
      { pid: process.pid, port: 18088 },
    ]));

    const status = getWebBackgroundStatus(18088);
    const report = getWebBackgroundReport(18088);
    expect(status.running).toBe(true);
    expect(status.pid).toBe(process.pid);
    expect(status.source).toBe('port-scan');
    expect(status.managed).toBe(false);
    expect(report.scenario).toBe('unmanaged-running');
    expect(report.nextAction).toBe('adopt-or-stop');
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

  it('reports stopped scenario and renders localized text from the standard report', () => {
    vi.stubEnv('OPENCLAW_GUARD_MOCK_LISTENING_JSON', '[]');

    const report = getWebBackgroundReport(28188);
    const zh = formatWebBackgroundReport(report, 'zh');
    const en = formatWebBackgroundReport(report, 'en');

    expect(report.running).toBe(false);
    expect(report.scenario).toBe('stopped');
    expect(report.nextAction).toBe('start-web');
    expect(zh).toContain('当前未检测到 Guard Web 后台服务');
    expect(zh).toContain('下一步建议');
    expect(en).toContain('No Guard Web background service is currently running.');
    expect(en).toContain('Recommended next step');
  });
});
