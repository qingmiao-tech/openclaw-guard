import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getCronSnapshot, getRuntimeSnapshot } from '../openclaw-runtime.js';

describe('openclaw-runtime', () => {
  beforeEach(() => {
    vi.stubEnv('OPENCLAW_GUARD_MOCK_STATUS_JSON', JSON.stringify({
      heartbeat: {
        defaultAgentId: 'main',
        agents: [
          { agentId: 'main', enabled: true, every: '30m', everyMs: 1800000 },
        ],
      },
      queuedSystemEvents: [],
      sessions: {
        count: 1,
        defaults: {
          model: 'gpt-5.3-codex',
          contextTokens: 200000,
        },
        recent: [
          {
            agentId: 'task-hub',
            key: 'agent:task-hub:feishu:direct:demo',
            kind: 'direct',
            sessionId: 'session-1',
            updatedAt: 1772707272073,
            inputTokens: 120,
            outputTokens: 80,
            cacheRead: 10,
            cacheWrite: 5,
            totalTokens: 215,
            model: 'demo/model-a',
            contextTokens: 272000,
            remainingTokens: 211645,
            percentUsed: 22,
            flags: ['system'],
          },
        ],
      },
      gateway: {
        mode: 'local',
        url: 'ws://127.0.0.1:18789',
        reachable: false,
        error: 'connect failed: EPERM',
      },
      agents: {
        defaultId: 'task-hub',
        totalSessions: 1,
        bootstrapPendingCount: 0,
        agents: [{ id: 'task-hub' }],
      },
      securityAudit: {
        summary: {
          critical: 1,
          warn: 2,
          info: 0,
        },
        findings: [{ id: 'a' }],
      },
    }));
    vi.stubEnv('OPENCLAW_GUARD_MOCK_CRON_JSON', JSON.stringify({
      jobs: [
        {
          id: 'cron-1',
          name: 'Daily Report',
          agentId: 'task-hub',
          enabled: true,
          schedule: { kind: 'cron', expr: '0 8 * * *' },
          payload: { kind: 'agentTurn', message: 'send report' },
          state: {
            lastRunAtMs: 1772707200000,
            nextRunAtMs: 1772793600000,
            lastRunStatus: 'ok',
          },
        },
      ],
    }));
    vi.stubEnv('OPENCLAW_GUARD_MOCK_CRON_STATUS_JSON', JSON.stringify({
      enabled: true,
      storePath: '/tmp/openclaw/cron/jobs.json',
      schedulerNextWakeAtMs: 1772793600000,
    }));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('normalizes runtime sessions from real-like status json', () => {
    const snapshot = getRuntimeSnapshot();
    expect(snapshot.ok).toBe(true);
    expect(snapshot.sessions).toHaveLength(1);
    expect(snapshot.sessions[0].id).toBe('session-1');
    expect(snapshot.sessions[0].channel).toBe('feishu');
    expect(snapshot.sessions[0].usage.totalTokens).toBe(215);
    expect(snapshot.summary?.defaultModel).toBe('gpt-5.3-codex');
    expect(snapshot.gateway?.reachable).toBe(false);
    expect(snapshot.alerts?.some((item) => item.code === 'gateway-unreachable')).toBe(true);
  });

  it('normalizes cron jobs and status summary from gateway json', () => {
    const snapshot = getCronSnapshot();
    expect(snapshot.ok).toBe(true);
    expect(snapshot.jobs).toHaveLength(1);
    expect(snapshot.jobs[0].id).toBe('cron-1');
    expect(snapshot.jobs[0].schedule).toBe('cron 0 8 * * *');
    expect(snapshot.jobs[0].prompt).toBe('send report');
    expect(snapshot.jobs[0].enabled).toBe(true);
    expect(snapshot.status?.enabled).toBe(true);
    expect(snapshot.status?.storePath).toContain('jobs.json');
  });
});
