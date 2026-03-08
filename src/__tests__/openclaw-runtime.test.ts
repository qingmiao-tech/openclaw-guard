import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getCronSnapshot, getRuntimeSnapshot } from '../openclaw-runtime.js';

describe('openclaw-runtime', () => {
  beforeEach(() => {
    vi.stubEnv('OPENCLAW_GUARD_MOCK_STATUS_JSON', JSON.stringify({
      sessions: [
        {
          id: 'session-1',
          agentId: 'task-hub',
          modelId: 'demo/model-a',
          channel: 'feishu',
          status: 'running',
          usage: {
            input: 120,
            output: 80,
            cacheRead: 10,
            cacheWrite: 5,
          },
        },
      ],
    }));
    vi.stubEnv('OPENCLAW_GUARD_MOCK_CRON_JSON', JSON.stringify({
      jobs: [
        {
          id: 'cron-1',
          agentId: 'task-hub',
          schedule: '0 8 * * *',
          prompt: 'send report',
          enabled: true,
          lastRunAt: '2026-03-08T00:00:00.000Z',
        },
      ],
    }));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('normalizes runtime sessions from mocked json', () => {
    const snapshot = getRuntimeSnapshot();
    expect(snapshot.ok).toBe(true);
    expect(snapshot.sessions).toHaveLength(1);
    expect(snapshot.sessions[0].id).toBe('session-1');
    expect(snapshot.sessions[0].usage.totalTokens).toBe(215);
  });

  it('normalizes cron jobs from mocked json', () => {
    const snapshot = getCronSnapshot();
    expect(snapshot.ok).toBe(true);
    expect(snapshot.jobs).toHaveLength(1);
    expect(snapshot.jobs[0].id).toBe('cron-1');
    expect(snapshot.jobs[0].enabled).toBe(true);
  });
});
