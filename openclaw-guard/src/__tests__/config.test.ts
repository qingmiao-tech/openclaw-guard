import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { deepMerge, createBackup, saveConfig, loadConfig } from '../config.js';

describe('deepMerge', () => {
  it('合并两个扁平对象', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    expect(deepMerge(target, source)).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('递归合并嵌套对象', () => {
    const target = { a: { x: 1, y: 2 }, b: 1 };
    const source = { a: { y: 3, z: 4 } };
    expect(deepMerge(target, source)).toEqual({ a: { x: 1, y: 3, z: 4 }, b: 1 });
  });

  it('数组直接覆盖而非合并', () => {
    const target = { a: [1, 2, 3] };
    const source = { a: [4, 5] };
    expect(deepMerge(target, source)).toEqual({ a: [4, 5] });
  });

  it('原始值直接覆盖', () => {
    const target = { a: 'old', b: { nested: true } };
    const source = { a: 'new', b: 'replaced' };
    expect(deepMerge(target, source)).toEqual({ a: 'new', b: 'replaced' });
  });

  it('不修改原始 target 对象', () => {
    const target = { a: { x: 1 } };
    const source = { a: { y: 2 } };
    deepMerge(target, source);
    expect(target).toEqual({ a: { x: 1 } });
  });

  it('source 为空对象时返回 target 的副本', () => {
    const target = { a: 1, b: { c: 2 } };
    expect(deepMerge(target, {})).toEqual({ a: 1, b: { c: 2 } });
  });

  it('target 为空对象时返回 source 的副本', () => {
    const source = { a: 1, b: { c: 2 } };
    expect(deepMerge({}, source)).toEqual({ a: 1, b: { c: 2 } });
  });

  it('处理 null 值覆盖', () => {
    const target = { a: { x: 1 } };
    const source = { a: null };
    expect(deepMerge(target, source)).toEqual({ a: null });
  });

  it('多层嵌套递归合并', () => {
    const target = { a: { b: { c: 1, d: 2 }, e: 3 } };
    const source = { a: { b: { c: 10, f: 4 } } };
    expect(deepMerge(target, source)).toEqual({ a: { b: { c: 10, d: 2, f: 4 }, e: 3 } });
  });
});


describe('createBackup', () => {
  let tmpDir: string;
  let configPath: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'openclaw-test-'));
    configPath = path.join(tmpDir, 'openclaw.json');
    // Point getConfigPath to our temp dir
    vi.stubEnv('OPENCLAW_CONFIG_PATH', configPath);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    // Clean up temp dir
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('配置文件不存在时不创建备份', () => {
    createBackup();
    const files = fs.readdirSync(tmpDir);
    expect(files.filter(f => f.includes('.bak.'))).toHaveLength(0);
  });

  it('创建备份文件，命名格式为 openclaw.json.bak.{timestamp}', () => {
    fs.writeFileSync(configPath, JSON.stringify({ test: true }), 'utf-8');
    createBackup();
    const files = fs.readdirSync(tmpDir);
    const backups = files.filter(f => f.startsWith('openclaw.json.bak.'));
    expect(backups).toHaveLength(1);
    expect(backups[0]).toMatch(/^openclaw\.json\.bak\.\d+$/);
  });

  it('备份文件内容与原文件一致', () => {
    const content = JSON.stringify({ key: 'value', nested: { a: 1 } });
    fs.writeFileSync(configPath, content, 'utf-8');
    createBackup();
    const files = fs.readdirSync(tmpDir);
    const backupFile = files.find(f => f.startsWith('openclaw.json.bak.'))!;
    const backupContent = fs.readFileSync(path.join(tmpDir, backupFile), 'utf-8');
    expect(backupContent).toBe(content);
  });

  it('保留最近 5 个备份，清理旧备份', async () => {
    fs.writeFileSync(configPath, JSON.stringify({ v: 0 }), 'utf-8');

    // Create 7 backups with distinct timestamps
    for (let i = 0; i < 7; i++) {
      createBackup();
      // Small delay to ensure unique timestamps
      await new Promise(r => setTimeout(r, 5));
    }

    const files = fs.readdirSync(tmpDir);
    const backups = files.filter(f => f.startsWith('openclaw.json.bak.'));
    expect(backups).toHaveLength(5);
  });

  it('清理时保留的是最近的 5 个备份', async () => {
    fs.writeFileSync(configPath, JSON.stringify({ v: 0 }), 'utf-8');

    const timestamps: string[] = [];
    for (let i = 0; i < 7; i++) {
      createBackup();
      const files = fs.readdirSync(tmpDir);
      const latest = files
        .filter(f => f.startsWith('openclaw.json.bak.'))
        .sort()
        .pop()!;
      timestamps.push(latest);
      await new Promise(r => setTimeout(r, 5));
    }

    const files = fs.readdirSync(tmpDir);
    const backups = files.filter(f => f.startsWith('openclaw.json.bak.')).sort();

    // The 5 most recent timestamps should be kept
    const expectedKept = timestamps.slice(-5).sort();
    expect(backups).toEqual(expectedKept);
  });
});


describe('saveConfig', () => {
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

  it('保存时深度合并现有配置', () => {
    // Write initial config
    fs.writeFileSync(configPath, JSON.stringify({ a: 1, b: { x: 10, y: 20 } }), 'utf-8');

    // Save partial config — should merge, not overwrite
    const result = saveConfig({ b: { y: 99, z: 30 }, c: 3 });

    expect(result.success).toBe(true);
    const saved = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(saved).toEqual({ a: 1, b: { x: 10, y: 99, z: 30 }, c: 3 });
  });

  it('保存前创建备份文件', () => {
    fs.writeFileSync(configPath, JSON.stringify({ original: true }), 'utf-8');

    saveConfig({ added: true });

    const files = fs.readdirSync(tmpDir);
    const backups = files.filter(f => f.startsWith('openclaw.json.bak.'));
    expect(backups.length).toBeGreaterThanOrEqual(1);

    // Backup should contain the original content
    const backupContent = fs.readFileSync(path.join(tmpDir, backups[0]), 'utf-8');
    expect(JSON.parse(backupContent)).toEqual({ original: true });
  });

  it('配置文件不存在时正常创建新文件', () => {
    const result = saveConfig({ fresh: true });

    expect(result.success).toBe(true);
    const saved = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(saved).toEqual({ fresh: true });
  });

  it('全量配置保存后与自身合并结果一致', () => {
    const fullConfig = { a: 1, b: { x: 10 }, c: [1, 2] };
    fs.writeFileSync(configPath, JSON.stringify(fullConfig), 'utf-8');

    // Saving the same full config should produce the same result
    saveConfig(fullConfig);

    const saved = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(saved).toEqual(fullConfig);
  });

  it('I/O 错误时返回失败结果并保留原文件', () => {
    const originalContent = JSON.stringify({ keep: 'me' });
    fs.writeFileSync(configPath, originalContent, 'utf-8');

    // Make the config file read-only to simulate I/O write error
    fs.chmodSync(configPath, 0o444);

    const result = saveConfig({ overwrite: true });

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();

    // Original file should be unchanged
    fs.chmodSync(configPath, 0o644); // restore permissions to read
    const content = fs.readFileSync(configPath, 'utf-8');
    expect(content).toBe(originalContent);
  });
});
