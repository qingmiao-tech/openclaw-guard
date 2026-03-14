/**
 * OpenClaw Guard 密码鉴权模块
 *
 * - 密码使用 PBKDF2-SHA256 哈希存储于 ~/.openclaw/guard/secrets/auth.json
 * - 首次启动自动生成随机初始密码并打印到控制台
 * - 会话令牌（Bearer Token）存储在内存中，8 小时过期
 * - 环境变量 GUARD_NO_AUTH=1 可禁用鉴权（本地开发用）
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import type http from 'node:http';
import path from 'node:path';
import { ensureGuardLayout } from './guard-state.js';

const AUTH_FILENAME = 'auth.json';
const INITIAL_PASSWORD_FILENAME = 'initial-password.json';
const TOKEN_EXPIRY_MS = 8 * 60 * 60 * 1000; // 8 小时
const MAX_SESSIONS = 20;
const MIN_PASSWORD_LENGTH = 6;
const PBKDF2_ITERATIONS = 100_000;
const PBKDF2_KEYLEN = 32;
const PBKDF2_DIGEST = 'sha256';
export const AUTH_SHOW_PASSWORD_COMMAND = 'openclaw-guard auth show-password';

interface AuthData {
  passwordHash: string;
  salt: string;
  createdAt: string;
}

export interface InitialPasswordRecord {
  password: string;
  createdAt: string;
  authCreatedAt: string;
}

export interface AuthStatusInfo {
  enabled: boolean;
  configured: boolean;
  initialPasswordAvailable: boolean;
  initialPasswordCreatedAt: string | null;
  revealCommand: string;
}

/** 内存会话表：token -> 过期时间戳 */
const activeSessions = new Map<string, number>();

// ── 内部工具 ─────────────────────────────────────────────────────────────────

function getAuthFilePath(): string {
  const { secretsDir } = ensureGuardLayout();
  return path.join(secretsDir, AUTH_FILENAME);
}

function getInitialPasswordFilePath(): string {
  const { secretsDir } = ensureGuardLayout();
  return path.join(secretsDir, INITIAL_PASSWORD_FILENAME);
}

function hashPassword(password: string, salt: string): string {
  return crypto
    .pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, PBKDF2_KEYLEN, PBKDF2_DIGEST)
    .toString('hex');
}

/** 生成易读的随机初始密码（排除易混淆字符 0/O/l/I/1） */
function generateRandomPassword(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  return Array.from(crypto.randomBytes(12))
    .map((b) => chars[b % chars.length])
    .join('');
}

function readAuthData(): AuthData | null {
  const filePath = getAuthFilePath();
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as AuthData;
  } catch {
    return null;
  }
}

function writeAuthData(data: AuthData): void {
  fs.writeFileSync(getAuthFilePath(), JSON.stringify(data, null, 2), { encoding: 'utf-8', mode: 0o600 });
}

function readInitialPasswordRecordFile(): InitialPasswordRecord | null {
  const filePath = getInitialPasswordFilePath();
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as InitialPasswordRecord;
  } catch {
    return null;
  }
}

function writeInitialPasswordRecord(record: InitialPasswordRecord): void {
  fs.writeFileSync(getInitialPasswordFilePath(), JSON.stringify(record, null, 2), { encoding: 'utf-8', mode: 0o600 });
}

function removeInitialPasswordRecord(): void {
  const filePath = getInitialPasswordFilePath();
  if (!fs.existsSync(filePath)) return;
  try {
    fs.rmSync(filePath, { force: true });
  } catch {
    // ignore cleanup failure and let the runtime keep going
  }
}

// ── 公开 API ──────────────────────────────────────────────────────────────────

/**
 * 初始化鉴权。首次调用时自动生成随机密码并存储。
 * 返回 { isNew: true, password } 表示首次生成，调用方应将密码打印给用户。
 */
export function initAuth(): { isNew: boolean; password?: string } {
  if (readAuthData()) return { isNew: false };

  const password = generateRandomPassword();
  const salt = crypto.randomBytes(16).toString('hex');
  const createdAt = new Date().toISOString();
  writeAuthData({
    passwordHash: hashPassword(password, salt),
    salt,
    createdAt,
  });
  writeInitialPasswordRecord({
    password,
    createdAt,
    authCreatedAt: createdAt,
  });
  return { isNew: true, password };
}

/** 是否已配置密码（auth.json 存在） */
export function hasAuthConfigured(): boolean {
  return readAuthData() !== null;
}

export function getInitialPasswordRecord(): InitialPasswordRecord | null {
  const authData = readAuthData();
  if (!authData) return null;
  const record = readInitialPasswordRecordFile();
  if (!record) return null;
  if (record.authCreatedAt !== authData.createdAt) {
    removeInitialPasswordRecord();
    return null;
  }
  return record;
}

export function getAuthStatus(): AuthStatusInfo {
  const enabled = isAuthEnabled();
  const configured = hasAuthConfigured();
  const record = enabled ? getInitialPasswordRecord() : null;
  return {
    enabled,
    configured,
    initialPasswordAvailable: record !== null,
    initialPasswordCreatedAt: record?.createdAt || null,
    revealCommand: AUTH_SHOW_PASSWORD_COMMAND,
  };
}

/** 校验密码是否正确 */
export function validatePassword(password: string): boolean {
  const data = readAuthData();
  if (!data) return false;
  return hashPassword(password, data.salt) === data.passwordHash;
}

/** 创建新会话，返回 Bearer Token */
export function createSession(): string {
  const now = Date.now();
  // 清理过期会话
  for (const [token, expiry] of activeSessions) {
    if (expiry <= now) activeSessions.delete(token);
  }
  // 超出容量时逐出最旧的会话
  if (activeSessions.size >= MAX_SESSIONS) {
    const [oldest] = activeSessions.keys();
    activeSessions.delete(oldest);
  }
  const token = crypto.randomBytes(32).toString('hex');
  activeSessions.set(token, now + TOKEN_EXPIRY_MS);
  return token;
}

/** 校验 Token 是否有效且未过期 */
export function validateSession(token: string): boolean {
  const expiry = activeSessions.get(token);
  if (!expiry) return false;
  if (expiry <= Date.now()) {
    activeSessions.delete(token);
    return false;
  }
  return true;
}

/** 使指定 Token 立即失效 */
export function revokeSession(token: string): void {
  activeSessions.delete(token);
}

/**
 * 修改密码。修改成功后，所有现有会话全部失效，用户需重新登录。
 */
export function changePassword(
  currentPassword: string,
  newPassword: string,
): { success: boolean; error?: string } {
  if (!validatePassword(currentPassword)) {
    return { success: false, error: '当前密码错误' };
  }
  if (!newPassword || newPassword.length < MIN_PASSWORD_LENGTH) {
    return { success: false, error: `新密码至少 ${MIN_PASSWORD_LENGTH} 位` };
  }
  const salt = crypto.randomBytes(16).toString('hex');
  writeAuthData({
    passwordHash: hashPassword(newPassword, salt),
    salt,
    createdAt: new Date().toISOString(),
  });
  removeInitialPasswordRecord();
  activeSessions.clear(); // 使所有现有会话失效
  return { success: true };
}

/** 从 HTTP 请求头提取 Bearer Token */
export function extractBearerToken(req: http.IncomingMessage): string | undefined {
  const header = req.headers['authorization'];
  const value = Array.isArray(header) ? header[0] : header;
  if (typeof value === 'string' && value.startsWith('Bearer ')) {
    return value.slice(7);
  }
  return undefined;
}

/**
 * 鉴权是否启用。
 * 环境变量 GUARD_NO_AUTH=1 时禁用，用于本地开发调试。
 */
export function isAuthEnabled(): boolean {
  return process.env.GUARD_NO_AUTH !== '1';
}

// ── IP 登录速率限制 ──────────────────────────────────────────────────────────

const RATE_WINDOW_MS = 60_000;       // 1 分钟窗口
const RATE_MAX_ATTEMPTS = 5;         // 窗口内最多 5 次
const RATE_LOCKOUT_MS = 60_000;      // 超限后锁定 60 秒

interface RateEntry {
  attempts: number;
  windowStart: number;
  lockedUntil: number;
}

const ipRateMap = new Map<string, RateEntry>();

/** 定期清理过期条目，防止内存泄漏 */
const rateCleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of ipRateMap) {
    if (now - entry.windowStart > RATE_WINDOW_MS * 3 && now > entry.lockedUntil) {
      ipRateMap.delete(ip);
    }
  }
}, 120_000);
rateCleanupTimer.unref?.();

/**
 * 检查 IP 是否允许登录尝试。
 * 返回 { allowed: true } 或 { allowed: false, retryAfter: 剩余秒数 }
 */
export function checkLoginRate(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  let entry = ipRateMap.get(ip);

  if (!entry) {
    entry = { attempts: 0, windowStart: now, lockedUntil: 0 };
    ipRateMap.set(ip, entry);
  }

  // 处于锁定期
  if (now < entry.lockedUntil) {
    return { allowed: false, retryAfter: Math.ceil((entry.lockedUntil - now) / 1000) };
  }

  // 窗口过期，重置
  if (now - entry.windowStart > RATE_WINDOW_MS) {
    entry.attempts = 0;
    entry.windowStart = now;
    entry.lockedUntil = 0;
  }

  if (entry.attempts >= RATE_MAX_ATTEMPTS) {
    entry.lockedUntil = now + RATE_LOCKOUT_MS;
    return { allowed: false, retryAfter: Math.ceil(RATE_LOCKOUT_MS / 1000) };
  }

  return { allowed: true };
}

/** 记录一次登录失败 */
export function recordLoginFailure(ip: string): void {
  const entry = ipRateMap.get(ip);
  if (entry) {
    entry.attempts += 1;
  }
}

/** 登录成功后重置计数 */
export function resetLoginRate(ip: string): void {
  ipRateMap.delete(ip);
}

/** 从请求中提取客户端 IP */
export function getClientIp(req: http.IncomingMessage): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  if (Array.isArray(forwarded) && forwarded.length > 0) return forwarded[0].split(',')[0].trim();
  return req.socket.remoteAddress || '127.0.0.1';
}
