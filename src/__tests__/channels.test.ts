import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getChannelDefinitions, getChannels, saveFeishuConfig } from '../channels.js';

describe('channels metadata', () => {
  let tempDir: string;
  let configPath: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'openclaw-channels-'));
    configPath = path.join(tempDir, 'openclaw.json');
    vi.stubEnv('OPENCLAW_CONFIG_PATH', configPath);
    fs.writeFileSync(configPath, JSON.stringify({ channels: {}, plugins: { allow: [], entries: {} } }, null, 2), 'utf-8');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('keeps Feishu in the official channel catalog', () => {
    const defs = getChannelDefinitions();
    const feishu = defs.find((item) => item.id === 'feishu');
    const telegram = defs.find((item) => item.id === 'telegram');

    expect(feishu?.name).toBe('飞书 / Lark');
    expect(feishu?.fields).toContain('appId');
    expect(telegram?.name).toBe('Telegram');
  });

  it('surfaces Feishu configuration in the shared channel list', () => {
    const result = saveFeishuConfig({
      appId: 'cli_demo',
      domain: 'feishu',
      connectionMode: 'websocket',
      enabled: true,
    });

    expect(result.success).toBe(true);

    const channels = getChannels();
    const feishu = channels.find((item) => item.id === 'feishu');
    const slack = channels.find((item) => item.id === 'slack');

    expect(feishu).toMatchObject({
      enabled: true,
      configured: true,
      config: {
        appId: 'cli_demo',
        domain: 'feishu',
        connectionMode: 'websocket',
      },
    });
    expect(slack?.enabled).toBe(false);
  });
});
