import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  runOpenClawCommand: vi.fn(),
  getCronSnapshot: vi.fn(),
  addNotification: vi.fn(),
}));

vi.mock('../openclaw-runtime.js', () => ({
  runOpenClawCommand: mocks.runOpenClawCommand,
  getCronSnapshot: mocks.getCronSnapshot,
}));

vi.mock('../notifications.js', () => ({
  addNotification: mocks.addNotification,
}));

import { createCronJob, getCronOverview, updateCronJob } from '../cron-ui.js';

describe('cron-ui', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getCronSnapshot.mockReturnValue({
      capturedAt: '2026-03-09T00:00:00.000Z',
      jobs: [],
      total: 0,
      offset: 0,
      limit: 50,
      hasMore: false,
      nextOffset: null,
      warnings: ['list warning'],
      status: {
        enabled: true,
        storePath: '/tmp/cron/jobs.json',
        jobsCount: 0,
        schedulerNextWakeAt: '2026-03-09T01:00:00.000Z',
        warnings: ['status warning'],
        raw: null,
      },
    });
    mocks.runOpenClawCommand.mockReturnValue({
      success: true,
      stdout: '{"ok":true}',
      stderr: '',
      error: '',
    });
  });

  it('creates cron jobs with the expected add arguments', () => {
    const result = createCronJob({
      name: '每日汇总',
      agentId: 'task-hub',
      prompt: '整理今天的销售线索',
      scheduleMode: 'every',
      scheduleValue: '15m',
      enabled: false,
      timezone: 'Asia/Shanghai',
      session: 'isolated',
      wake: 'next-heartbeat',
      timeoutSeconds: 90,
      stagger: '0',
      announce: true,
      bestEffortDeliver: true,
      deleteAfterRun: true,
    });

    expect(result.success).toBe(true);
    expect(mocks.runOpenClawCommand).toHaveBeenCalledWith([
      'cron',
      'add',
      '--every', '15m',
      '--name', '每日汇总',
      '--message', '整理今天的销售线索',
      '--tz', 'Asia/Shanghai',
      '--session', 'isolated',
      '--wake', 'next-heartbeat',
      '--agent', 'task-hub',
      '--timeout-seconds', '90',
      '--exact',
      '--disabled',
      '--announce',
      '--best-effort-deliver',
      '--delete-after-run',
    ]);
    expect(mocks.addNotification).toHaveBeenCalled();
  });

  it('updates cron jobs with edit arguments and negative flags', () => {
    const result = updateCronJob({
      jobId: 'cron-1',
      scheduleMode: 'cron',
      scheduleValue: '0 9 * * *',
      agentId: '',
      prompt: '改成新的日报模板',
      enabled: false,
      announce: false,
      bestEffortDeliver: false,
      deleteAfterRun: false,
      stagger: '5m',
    });

    expect(result.success).toBe(true);
    expect(mocks.runOpenClawCommand).toHaveBeenCalledWith([
      'cron',
      'edit', 'cron-1',
      '--cron', '0 9 * * *',
      '--message', '改成新的日报模板',
      '--clear-agent',
      '--stagger', '5m',
      '--disable',
      '--no-deliver',
      '--no-best-effort-deliver',
      '--keep-after-run',
    ]);
  });

  it('merges snapshot warnings and scheduler warnings in overview', () => {
    const overview = getCronOverview();
    expect(overview.jobs).toEqual([]);
    expect(overview.total).toBe(0);
    expect(overview.limit).toBe(50);
    expect(overview.warnings).toEqual(['list warning', 'status warning']);
    expect(overview.status.enabled).toBe(true);
    expect(overview.status.jobsCount).toBe(0);
  });
});
