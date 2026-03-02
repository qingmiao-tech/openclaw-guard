import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { saveProvider, getAIConfig, setFallbackModels, deleteProvider } from '../models.js';

describe('saveProvider', () => {
  let tmpDir: string;
  let configPath: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'openclaw-test-'));
    configPath = path.join(tmpDir, 'openclaw.json');
    vi.stubEnv('OPENCLAW_CONFIG_PATH', configPath);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('apiType 未提供时默认使用 openai-completions', () => {
    const result = saveProvider({
      name: 'custom-provider',
      baseUrl: 'https://api.example.com',
      models: [{ id: 'model-1', name: 'Model 1' }],
    });

    expect(result.success).toBe(true);
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const provider = config.models.providers['custom-provider'];
    expect(provider.apiType).toBe('openai-completions');
    expect(provider.models[0].api).toBe('openai-completions');
  });

  it('提供 apiType 时使用用户指定值', () => {
    const result = saveProvider({
      name: 'anthropic-custom',
      baseUrl: 'https://api.anthropic.com',
      apiType: 'anthropic-messages',
      models: [{ id: 'claude-3', name: 'Claude 3' }],
    });

    expect(result.success).toBe(true);
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const provider = config.models.providers['anthropic-custom'];
    expect(provider.apiType).toBe('anthropic-messages');
    expect(provider.models[0].api).toBe('anthropic-messages');
  });

  it('apiType 持久化到配置文件中', () => {
    saveProvider({
      name: 'test-provider',
      baseUrl: 'https://api.test.com',
      apiType: 'custom-api-type',
      models: [{ id: 'm1', name: 'M1' }],
    });

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(config.models.providers['test-provider'].apiType).toBe('custom-api-type');
  });

  it('空字符串 apiKey 不覆盖已有值', () => {
    // First save with a real apiKey
    saveProvider({
      name: 'my-provider',
      baseUrl: 'https://api.example.com',
      apiKey: 'sk-secret-key-12345',
      models: [{ id: 'm1', name: 'M1' }],
    });

    // Save again with empty apiKey
    saveProvider({
      name: 'my-provider',
      baseUrl: 'https://api.example.com',
      apiKey: '',
      models: [{ id: 'm1', name: 'M1' }],
    });

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(config.models.providers['my-provider'].apiKey).toBe('sk-secret-key-12345');
  });

  it('undefined apiKey 不覆盖已有值', () => {
    saveProvider({
      name: 'my-provider',
      baseUrl: 'https://api.example.com',
      apiKey: 'sk-existing-key',
      models: [{ id: 'm1', name: 'M1' }],
    });

    saveProvider({
      name: 'my-provider',
      baseUrl: 'https://api.example.com',
      models: [{ id: 'm1', name: 'M1' }],
    });

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(config.models.providers['my-provider'].apiKey).toBe('sk-existing-key');
  });

  it('模型使用用户指定的 contextWindow 和 maxTokens', () => {
    saveProvider({
      name: 'test-provider',
      baseUrl: 'https://api.test.com',
      models: [{ id: 'm1', name: 'M1', contextWindow: 4096, maxTokens: 1024 }],
    });

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const model = config.models.providers['test-provider'].models[0];
    expect(model.contextWindow).toBe(4096);
    expect(model.maxTokens).toBe(1024);
  });

  it('模型 contextWindow 和 maxTokens 为 0 时不被默认值覆盖', () => {
    saveProvider({
      name: 'test-provider',
      baseUrl: 'https://api.test.com',
      models: [{ id: 'm1', name: 'M1', contextWindow: 0, maxTokens: 0 }],
    });

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const model = config.models.providers['test-provider'].models[0];
    expect(model.contextWindow).toBe(0);
    expect(model.maxTokens).toBe(0);
  });

  it('模型未提供 contextWindow 和 maxTokens 时使用默认值', () => {
    saveProvider({
      name: 'test-provider',
      baseUrl: 'https://api.test.com',
      models: [{ id: 'm1', name: 'M1' }],
    });

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const model = config.models.providers['test-provider'].models[0];
    expect(model.contextWindow).toBe(200000);
    expect(model.maxTokens).toBe(8192);
  });

  it('支持自定义 Provider 的完整 round-trip', () => {
    saveProvider({
      name: 'custom-ai',
      baseUrl: 'https://custom.ai/v1',
      apiKey: 'key-123',
      apiType: 'custom-type',
      models: [
        { id: 'fast', name: 'Fast Model', contextWindow: 8000, maxTokens: 2000 },
        { id: 'smart', name: 'Smart Model', contextWindow: 128000, maxTokens: 4096 },
      ],
    });

    const overview = getAIConfig();
    const provider = overview.providers.find(p => p.name === 'custom-ai');
    expect(provider).toBeDefined();
    expect(provider!.baseUrl).toBe('https://custom.ai/v1');
    expect(provider!.hasApiKey).toBe(true);
    expect(provider!.models).toHaveLength(2);
    expect(provider!.models[0].id).toBe('fast');
    expect(provider!.models[1].id).toBe('smart');
  });

  it('saveProvider 不影响其他配置节点', () => {
    // Write initial config with multiple providers and other config nodes
    const initialConfig = {
      gateway: { port: 9999, auth: { token: 'abc123' } },
      models: {
        providers: {
          'existing-provider': {
            baseUrl: 'https://existing.com',
            apiKey: 'existing-key',
            apiType: 'openai-completions',
            models: [{ id: 'e1', name: 'E1', api: 'openai-completions', input: ['text'], contextWindow: 4096, maxTokens: 512 }],
          },
        },
      },
      agents: { defaults: { model: { primary: 'existing-provider/e1' }, models: { 'existing-provider/e1': {} } } },
      customSection: { data: 'should-not-change' },
    };
    fs.writeFileSync(configPath, JSON.stringify(initialConfig), 'utf-8');

    // Save a new provider
    const result = saveProvider({
      name: 'new-provider',
      baseUrl: 'https://new.com',
      apiKey: 'new-key',
      models: [{ id: 'n1', name: 'N1' }],
    });

    expect(result.success).toBe(true);
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    // Verify other config nodes are preserved
    expect(config.gateway).toEqual({ port: 9999, auth: { token: 'abc123' } });
    expect(config.customSection).toEqual({ data: 'should-not-change' });
    expect(config.agents.defaults.model.primary).toBe('existing-provider/e1');

    // Verify existing provider is unchanged
    expect(config.models.providers['existing-provider'].baseUrl).toBe('https://existing.com');
    expect(config.models.providers['existing-provider'].apiKey).toBe('existing-key');
    expect(config.models.providers['existing-provider'].models[0].id).toBe('e1');
    expect(config.models.providers['existing-provider'].models[0].contextWindow).toBe(4096);
    expect(config.models.providers['existing-provider'].models[0].maxTokens).toBe(512);

    // Verify new provider was added correctly
    expect(config.models.providers['new-provider']).toBeDefined();
    expect(config.models.providers['new-provider'].baseUrl).toBe('https://new.com');
    expect(config.models.providers['new-provider'].apiKey).toBe('new-key');
  });
});


describe('fallback models', () => {
  let tmpDir: string;
  let configPath: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'openclaw-fallbacks-test-'));
    configPath = path.join(tmpDir, 'openclaw.json');
    vi.stubEnv('OPENCLAW_CONFIG_PATH', configPath);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('setFallbackModels saves normalized list and exposes it in getAIConfig', () => {
    const result = setFallbackModels([
      ' wenwen/claude-opus-4-6 ',
      'custom-127-0-0-1-11434/qwen3:8b',
      'wenwen/claude-opus-4-6',
      '',
    ]);

    expect(result.success).toBe(true);

    const overview = getAIConfig();
    expect(overview.fallbackModels).toEqual([
      'wenwen/claude-opus-4-6',
      'custom-127-0-0-1-11434/qwen3:8b',
    ]);

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(config.agents.defaults.model.fallbacks).toEqual([
      'wenwen/claude-opus-4-6',
      'custom-127-0-0-1-11434/qwen3:8b',
    ]);
    expect(config.agents.defaults.models['wenwen/claude-opus-4-6']).toBeDefined();
    expect(config.agents.defaults.models['custom-127-0-0-1-11434/qwen3:8b']).toBeDefined();
  });

  it('deleteProvider removes provider models from fallbacks', () => {
    saveProvider({
      name: 'wenwen',
      baseUrl: 'https://breakout.wenwen-ai.com',
      apiKey: 'sk-wenwen',
      models: [{ id: 'claude-opus-4-6', name: 'Claude Opus 4.6' }],
    });
    saveProvider({
      name: 'openai-codex',
      baseUrl: 'https://api.openai.com/v1',
      apiKey: 'sk-openai',
      models: [{ id: 'gpt-5.3-codex', name: 'GPT-5.3 Codex' }],
    });

    setFallbackModels(['wenwen/claude-opus-4-6', 'openai-codex/gpt-5.3-codex']);

    const deleted = deleteProvider('wenwen');
    expect(deleted.success).toBe(true);

    const overview = getAIConfig();
    expect(overview.fallbackModels).toEqual(['openai-codex/gpt-5.3-codex']);
  });
});
