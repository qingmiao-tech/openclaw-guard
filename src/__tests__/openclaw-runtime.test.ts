import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getCronSnapshot, getRuntimeSnapshot, parseOpenClawJsonOutput } from '../openclaw-runtime.js';

describe('openclaw-runtime', () => {
  beforeEach(() => {
    vi.stubEnv('OPENCLAW_GUARD_MOCK_STATUS_JSON', JSON.stringify({
      os: {
        platform: 'win32',
        arch: 'x64',
        release: '10.0.26200',
        label: 'windows 10.0.26200 (x64)',
      },
      update: {
        root: 'C:/Program Files/openclaw',
        installKind: 'package',
        packageManager: 'pnpm',
        deps: {
          status: 'unknown',
          reason: 'lockfile missing',
        },
        registry: {
          latestVersion: '2026.3.8',
        },
      },
      updateChannel: 'stable',
      updateChannelSource: 'default',
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
        paths: [
          'C:/Users/demo/.openclaw/agents/main/sessions/sessions.json',
        ],
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
        byAgent: [
          {
            agentId: 'main',
            path: 'C:/Users/demo/.openclaw/agents/main/sessions/sessions.json',
            count: 1,
            recent: [
              {
                sessionId: '49d7df99-5cb6-43d0-baa6-ac01bd3e9799',
                agentId: 'main',
                key: 'agent:main:feishu:direct:demo',
                kind: 'direct',
                updatedAt: 1772707272073,
                inputTokens: 120,
                outputTokens: 80,
                totalTokens: 215,
                model: 'gpt-5.3-codex',
                contextTokens: 272000,
              },
            ],
          },
        ],
      },
      memory: {
        agentId: 'main',
        backend: 'builtin',
        provider: 'none',
        requestedProvider: 'auto',
        files: 0,
        chunks: 0,
        dirty: false,
        workspaceDir: 'C:/Users/demo/.openclaw/workspace',
        dbPath: 'C:/Users/demo/.openclaw/memory/main.sqlite',
        sources: ['memory'],
        extraPaths: [],
        custom: {
          searchMode: 'fts-only',
          providerUnavailableReason: 'no api key',
        },
      },
      memoryPlugin: {
        enabled: true,
        slot: 'memory-core',
      },
      gateway: {
        mode: 'local',
        url: 'ws://127.0.0.1:18789',
        reachable: false,
        error: 'timeout',
        self: {
          host: 'demo-host',
          ip: '198.18.0.1',
          version: '2026.2.21-2',
          platform: 'windows 10.0.26200',
        },
      },
      gatewayService: {
        label: 'Scheduled Task',
        installed: true,
        loadedText: 'registered',
        runtimeShort: 'unknown',
      },
      nodeService: {
        label: 'Scheduled Task',
        installed: false,
        loadedText: 'missing',
        runtimeShort: 'unknown (missing)',
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
      jobs: 1,
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
    expect(snapshot.summary?.defaultContextTokens).toBe(200000);
    expect(snapshot.sessionsMeta?.paths).toEqual([
      'C:/Users/demo/.openclaw/agents/main/sessions/sessions.json',
    ]);
    expect(snapshot.sessionsMeta?.byAgent[0]?.count).toBe(1);
    expect(snapshot.sessionsMeta?.byAgent[0]?.recent[0]?.modelId).toBe('gpt-5.3-codex');
    expect(snapshot.memory?.provider).toBe('none');
    expect(snapshot.memory?.searchMode).toBe('fts-only');
    expect(snapshot.memoryPlugin?.slot).toBe('memory-core');
    expect(snapshot.os?.label).toBe('windows 10.0.26200 (x64)');
    expect(snapshot.update?.latestVersion).toBe('2026.3.8');
    expect(snapshot.update?.channel).toBe('stable');
    expect(snapshot.gateway?.reachable).toBe(false);
    expect(snapshot.gateway?.error).toBe('timeout');
    expect(snapshot.gateway?.self?.version).toBe('2026.2.21-2');
    expect(snapshot.gatewayService?.installed).toBe(true);
    expect(snapshot.nodeService?.loadedText).toBe('missing');
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
    expect(snapshot.total).toBe(1);
    expect(snapshot.offset).toBe(0);
    expect(snapshot.limit).toBe(1);
    expect(snapshot.hasMore).toBe(false);
    expect(snapshot.nextOffset).toBeNull();
    expect(snapshot.status?.enabled).toBe(true);
    expect(snapshot.status?.jobsCount).toBe(1);
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
    expect(snapshot.total).toBe(0);
    expect(snapshot.offset).toBe(0);
    expect(snapshot.limit).toBe(50);
    expect(snapshot.hasMore).toBe(false);
    expect(snapshot.nextOffset).toBeNull();
    expect(snapshot.status?.enabled).toBe(true);
  });
});
