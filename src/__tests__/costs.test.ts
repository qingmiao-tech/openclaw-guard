import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { summarizeCosts } from '../costs.js';
import type { RuntimeSnapshot } from '../openclaw-runtime.js';

describe('costs', () => {
  let tempRoot: string;
  let configPath: string;

  beforeEach(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'guard-costs-'));
    configPath = path.join(tempRoot, 'openclaw.json');
    fs.writeFileSync(configPath, JSON.stringify({
      models: {
        providers: {
          demo: {
            models: [
              {
                id: 'model-a',
                cost: {
                  input: 3,
                  output: 15,
                  cacheRead: 1,
                  cacheWrite: 2,
                },
              },
            ],
          },
        },
      },
    }), 'utf-8');
    vi.stubEnv('OPENCLAW_CONFIG_PATH', configPath);
    vi.stubEnv('OPENCLAW_STATE_DIR', tempRoot);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it('aggregates cost by model and agent using per-million rates', () => {
    const snapshot: RuntimeSnapshot = {
      ok: true,
      source: 'test',
      capturedAt: '2026-03-08T10:00:00.000Z',
      warnings: [],
      raw: {},
      sessions: [
        {
          id: 's1',
          agentId: 'agent-a',
          modelId: 'demo/model-a',
          channel: 'feishu',
          status: 'running',
          startedAt: '2026-03-08T09:00:00.000Z',
          updatedAt: '2026-03-08T09:05:00.000Z',
          estimatedCost: 0,
          raw: {},
          usage: {
            inputTokens: 1000,
            outputTokens: 500,
            cacheReadTokens: 100,
            cacheWriteTokens: 50,
            totalTokens: 1650,
          },
        },
      ],
    };

    const summary = summarizeCosts(snapshot);
    expect(summary.totalTokens).toBe(1650);
    expect(summary.byModel[0].id).toBe('demo/model-a');
    expect(summary.byAgent[0].id).toBe('agent-a');
    expect(summary.totalEstimatedCost).toBeCloseTo((1000 * 3 + 500 * 15 + 100 * 1 + 50 * 2) / 1_000_000, 12);
  });
});
