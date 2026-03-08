import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getCronSnapshot, getRuntimeSnapshot, parseOpenClawJsonOutput } from '../openclaw-runtime.js';

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
            sessionId: '49d7df99-5cb6-43d0-baa6-ac01bd3e9799',
            agentId: 'main',
            key: 'agent:main:feishu:direct:demo',
            kind: 'direct',
            updatedAt: 1772707272073,
            inputTokens: 120,
            outputTokens: 80,
            cacheRead: 10,
            cacheWrite: 5,
            totalTokens: 215,
            model: 'gpt-5.3-codex',
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
        error: 'timeout',
      },
      agents: {
        defaultId: 'main',
        totalSessions: 1,
        bootstrapPendingCount: 0,
        agents: [{ id: 'main' }],
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
    expect(snapshot.sessions[0].id).toBe('49d7df99-5cb6-43d0-baa6-ac01bd3e9799');
    expect(snapshot.sessions[0].channel).toBe('feishu');
    expect(snapshot.sessions[0].usage.totalTokens).toBe(215);
    expect(snapshot.summary?.defaultModel).toBe('gpt-5.3-codex');
    expect(snapshot.gateway?.reachable).toBe(false);
    expect(snapshot.gateway?.error).toBe('timeout');
    expect(snapshot.agents?.defaultId).toBe('main');
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

  it('extracts json payload from noisy openclaw output', () => {
    const parsed = parseOpenClawJsonOutput(
      [
        '[plugins] feishu_doc: Registered feishu_doc, feishu_app_scopes',
        '[plugins] feishu_wiki: Registered feishu_wiki tool',
        '{',
        '  "gateway": { "reachable": false },',
        '  "agents": { "totalSessions": 2 }',
        '}',
      ].join('\n'),
      '[plugins] feishu-enhanced: loaded without install/load-path provenance',
    ) as Record<string, any> | null;

    expect(parsed).not.toBeNull();
    expect(parsed?.gateway?.reachable).toBe(false);
    expect(parsed?.agents?.totalSessions).toBe(2);
  });

  it('handles the real cron empty-list shape', () => {
    vi.stubEnv('OPENCLAW_GUARD_MOCK_CRON_JSON', JSON.stringify({
      jobs: [],
      total: 0,
      offset: 0,
      limit: 50,
      hasMore: false,
      nextOffset: null,
    }));

    const snapshot = getCronSnapshot();
    expect(snapshot.ok).toBe(true);
    expect(snapshot.jobs).toEqual([]);
    expect(snapshot.status?.enabled).toBe(true);
  });
});
