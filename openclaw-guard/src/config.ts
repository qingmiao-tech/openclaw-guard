/**
 * OpenClaw 配置管理模块
 * 读写 ~/.openclaw/openclaw.json 和 ~/.openclaw/env
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { getOpenClawDir } from './platform.js';

/** 获取 openclaw 配置文件路径（兼容旧版文件名） */
export function getConfigPath(): string {
  // 1. 环境变量直接指定配置文件
  const configOverride = process.env.OPENCLAW_CONFIG_PATH?.trim() || process.env.CLAWDBOT_CONFIG_PATH?.trim();
  if (configOverride) {
    const home = path.dirname(path.dirname(getOpenClawDir())); // ~ dir
    return path.resolve(configOverride.startsWith('~') ? configOverride.replace('~', home) : configOverride);
  }

  const dir = getOpenClawDir();
  const candidates = [
    path.join(dir, 'openclaw.json'),
    path.join(dir, 'clawdbot.json'),
    path.join(dir, 'moldbot.json'),
    path.join(dir, 'moltbot.json'),
  ];

  // 返回第一个存在的配置文件
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  // 默认返回新文件名
  return path.join(dir, 'openclaw.json');
}

/** 获取 env 文件路径 */
export function getEnvPath(): string {
  return path.join(getOpenClawDir(), 'env');
}

function stripLegacyProviderApiTypes(config: Record<string, any>): boolean {
  const providers = config?.models?.providers;
  if (!providers || typeof providers !== 'object' || Array.isArray(providers)) return false;

  let changed = false;
  for (const providerConfig of Object.values(providers as Record<string, any>)) {
    if (providerConfig && typeof providerConfig === 'object' && !Array.isArray(providerConfig) && 'apiType' in providerConfig) {
      delete providerConfig.apiType;
      changed = true;
    }
  }
  return changed;
}

/** 加载 openclaw.json，不存在则返回空对象 */
export function loadConfig(): Record<string, any> {
  const p = getConfigPath();
  if (!fs.existsSync(p)) return {};
  try {
    const config = JSON.parse(fs.readFileSync(p, 'utf-8'));
    if (stripLegacyProviderApiTypes(config)) {
      fs.writeFileSync(p, JSON.stringify(config, null, 2), 'utf-8');
    }
    return config;
  } catch {
    return {};
  }
}

/** 保存 openclaw.json（深度合并 + 备份） */
export function saveConfig(config: Record<string, any>, options?: { merge?: boolean }): { success: boolean; error?: string } {
  const p = getConfigPath();
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // 创建备份
  createBackup();

  // 深度合并
  const merged = options?.merge === false ? config : deepMerge(loadConfig(), config);

  try {
    fs.writeFileSync(p, JSON.stringify(merged, null, 2), 'utf-8');
    return { success: true };
  } catch (err: any) {
    // I/O 错误时保留原文件不变，返回错误结果
    return { success: false, error: err.message || String(err) };
  }
}


/** 深度设置嵌套属性，如 setNested(obj, ['a','b','c'], val) => obj.a.b.c = val */
export function setNested(obj: Record<string, any>, keys: string[], value: any): void {
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (current[keys[i]] === undefined || typeof current[keys[i]] !== 'object') {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

/** 深度获取嵌套属性 */
export function getNested(obj: Record<string, any>, keys: string[]): any {
  let current = obj;
  for (const key of keys) {
    if (current === undefined || current === null) return undefined;
    current = current[key];
  }
  return current;
}

/** 删除嵌套属性 */
export function deleteNested(obj: Record<string, any>, keys: string[]): boolean {
  if (keys.length === 0) return false;
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (current[keys[i]] === undefined) return false;
    current = current[keys[i]];
  }
  const last = keys[keys.length - 1];
  if (last in current) {
    delete current[last];
    return true;
  }
  return false;
}

/** 深度合并两个对象，递归合并嵌套对象，数组和原始值直接覆盖 */
export function deepMerge(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) &&
      result[key] && typeof result[key] === 'object' && !Array.isArray(result[key])
    ) {
      result[key] = deepMerge(result[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

/** 创建配置文件备份，保留最近 5 个备份 */
export function createBackup(): void {
  const configPath = getConfigPath();
  if (!fs.existsSync(configPath)) return;

  const timestamp = Date.now();
  const backupPath = `${configPath}.bak.${timestamp}`;
  fs.copyFileSync(configPath, backupPath);

  // 清理旧备份，保留最近 5 个
  const dir = path.dirname(configPath);
  const baseName = path.basename(configPath);
  const backups = fs.readdirSync(dir)
    .filter(f => f.startsWith(`${baseName}.bak.`))
    .sort()
    .reverse();

  for (const old of backups.slice(5)) {
    fs.unlinkSync(path.join(dir, old));
  }
}

// ========== 环境变量 (.env) 管理 ==========

/** 读取 env 文件中的某个 key */
export function readEnvValue(key: string): string | undefined {
  const p = getEnvPath();
  if (!fs.existsSync(p)) return undefined;
  const lines = fs.readFileSync(p, 'utf-8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const eqIdx = trimmed.indexOf('=');
    const k = trimmed.slice(0, eqIdx).trim();
    if (k === key) {
      let v = trimmed.slice(eqIdx + 1).trim();
      // 去除引号
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      return v;
    }
  }
  return undefined;
}

/** 写入 env 文件中的某个 key */
export function writeEnvValue(key: string, value: string): void {
  const p = getEnvPath();
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  let lines: string[] = [];
  if (fs.existsSync(p)) {
    lines = fs.readFileSync(p, 'utf-8').split(/\r?\n/);
  }

  let found = false;
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const eqIdx = trimmed.indexOf('=');
    const k = trimmed.slice(0, eqIdx).trim();
    if (k === key) {
      lines[i] = `${key}=${value}`;
      found = true;
      break;
    }
  }
  if (!found) {
    lines.push(`${key}=${value}`);
  }

  fs.writeFileSync(p, lines.join('\n'), 'utf-8');
}

/** 删除 env 文件中的某个 key */
export function removeEnvValue(key: string): void {
  const p = getEnvPath();
  if (!fs.existsSync(p)) return;
  const lines = fs.readFileSync(p, 'utf-8').split(/\r?\n/);
  const filtered = lines.filter(line => {
    const trimmed = line.trim();
    if (!trimmed.includes('=')) return true;
    const eqIdx = trimmed.indexOf('=');
    return trimmed.slice(0, eqIdx).trim() !== key;
  });
  fs.writeFileSync(p, filtered.join('\n'), 'utf-8');
}

/** 读取所有 env 变量 */
export function readAllEnv(): Record<string, string> {
  const p = getEnvPath();
  if (!fs.existsSync(p)) return {};
  const result: Record<string, string> = {};
  const lines = fs.readFileSync(p, 'utf-8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const eqIdx = trimmed.indexOf('=');
    const k = trimmed.slice(0, eqIdx).trim();
    let v = trimmed.slice(eqIdx + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    result[k] = v;
  }
  return result;
}

// ========== Gateway Token ==========

/** 生成随机 token */
export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/** 获取或创建 Gateway Token */
export function getOrCreateGatewayToken(): string {
  const config = loadConfig();
  const existing = config?.gateway?.auth?.token;
  if (existing && typeof existing === 'string' && existing.length > 0) {
    return existing;
  }
  const token = generateToken();
  setNested(config, ['gateway', 'auth', 'token'], token);
  setNested(config, ['gateway', 'auth', 'mode'], 'token');
  setNested(config, ['gateway', 'mode'], 'local');
  saveConfig(config);
  return token;
}

/** 获取 Dashboard URL */
export function getDashboardUrl(): string {
  const token = getOrCreateGatewayToken();
  return `http://localhost:18789?token=${token}`;
}
