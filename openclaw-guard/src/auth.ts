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
const TOKEN_EXPIRY_MS = 8 * 60 * 60 * 1000; // 8 小时
const MAX_SESSIONS = 20;
const MIN_PASSWORD_LENGTH = 6;
const PBKDF2_ITERATIONS = 100_000;
const PBKDF2_KEYLEN = 32;
const PBKDF2_DIGEST = 'sha256';

interface AuthData {
  passwordHash: string;
  salt: string;
  createdAt: string;
}

/** 内存会话表：token -> 过期时间戳 */
const activeSessions = new Map<string, number>();

// ── 内部工具 ─────────────────────────────────────────────────────────────────

function getAuthFilePath(): string {
  const { secretsDir } = ensureGuardLayout();
  return path.join(secretsDir, AUTH_FILENAME);
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

// ── 公开 API ──────────────────────────────────────────────────────────────────

/**
 * 初始化鉴权。首次调用时自动生成随机密码并存储。
 * 返回 { isNew: true, password } 表示首次生成，调用方应将密码打印给用户。
 */
export function initAuth(): { isNew: boolean; password?: string } {
  if (readAuthData()) return { isNew: false };

  const password = generateRandomPassword();
  const salt = crypto.randomBytes(16).toString('hex');
  writeAuthData({
    passwordHash: hashPassword(password, salt),
    salt,
    createdAt: new Date().toISOString(),
  });
  return { isNew: true, password };
}

/** 是否已配置密码（auth.json 存在） */
export function hasAuthConfigured(): boolean {
  return readAuthData() !== null;
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
