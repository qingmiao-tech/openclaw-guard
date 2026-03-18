import crypto from 'node:crypto';
import fs from 'node:fs';
import type http from 'node:http';
import path from 'node:path';
import { ensureGuardLayout } from './guard-state.js';

const AUTH_FILENAME = 'auth.json';
const INITIAL_PASSWORD_FILENAME = 'initial-password.json';
const TOKEN_EXPIRY_MS = 8 * 60 * 60 * 1000;
const MAX_SESSIONS = 20;
const MIN_PASSWORD_LENGTH = 6;
const PBKDF2_ITERATIONS = 100_000;
const PBKDF2_KEYLEN = 32;
const PBKDF2_DIGEST = 'sha256';

const RATE_WINDOW_MS = 60_000;
const RATE_MAX_ATTEMPTS = 5;
const RATE_LOCKOUT_MS = 60_000;

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
  kind?: 'initial' | 'changed';
}

export type PasswordRevealRecord = InitialPasswordRecord;

export interface AuthStatusInfo {
  enabled: boolean;
  configured: boolean;
  initialPasswordAvailable: boolean;
  initialPasswordCreatedAt: string | null;
  revealCommand: string;
  revealPasswordAvailable?: boolean;
  revealPasswordCreatedAt?: string | null;
  revealPasswordKind?: 'initial' | 'changed' | null;
}

interface RateEntry {
  attempts: number;
  windowStart: number;
  lockedUntil: number;
}

const activeSessions = new Map<string, number>();
const ipRateMap = new Map<string, RateEntry>();

const rateCleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of ipRateMap) {
    if (now - entry.windowStart > RATE_WINDOW_MS * 3 && now > entry.lockedUntil) {
      ipRateMap.delete(ip);
    }
  }
}, 120_000);
rateCleanupTimer.unref?.();

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

function generateRandomPassword(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  return Array.from(crypto.randomBytes(12))
    .map((byte) => chars[byte % chars.length])
    .join('');
}

function readAuthData(): AuthData | null {
  const filePath = getAuthFilePath();
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as AuthData;
  } catch {
    return null;
  }
}

function writeAuthData(data: AuthData): void {
  fs.writeFileSync(getAuthFilePath(), JSON.stringify(data, null, 2), {
    encoding: 'utf-8',
    mode: 0o600,
  });
}

function readInitialPasswordRecordFile(): PasswordRevealRecord | null {
  const filePath = getInitialPasswordFilePath();
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    const record = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as PasswordRevealRecord;
    return {
      ...record,
      kind: record.kind === 'changed' ? 'changed' : 'initial',
    };
  } catch {
    return null;
  }
}

function writeInitialPasswordRecord(record: PasswordRevealRecord): void {
  fs.writeFileSync(getInitialPasswordFilePath(), JSON.stringify(record, null, 2), {
    encoding: 'utf-8',
    mode: 0o600,
  });
}

function removeInitialPasswordRecord(): void {
  const filePath = getInitialPasswordFilePath();
  if (!fs.existsSync(filePath)) {
    return;
  }
  try {
    fs.rmSync(filePath, { force: true });
  } catch {
    // Ignore cleanup failures and keep the runtime going.
  }
}

export function initAuth(): { isNew: boolean; password?: string } {
  if (readAuthData()) {
    return { isNew: false };
  }

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
    kind: 'initial',
  });

  return { isNew: true, password };
}

export function hasAuthConfigured(): boolean {
  return readAuthData() !== null;
}

export function getPasswordRevealRecord(): PasswordRevealRecord | null {
  const authData = readAuthData();
  if (!authData) {
    return null;
  }

  const record = readInitialPasswordRecordFile();
  if (!record) {
    return null;
  }

  if (record.authCreatedAt !== authData.createdAt) {
    removeInitialPasswordRecord();
    return null;
  }

  return record;
}

export function getInitialPasswordRecord(): PasswordRevealRecord | null {
  return getPasswordRevealRecord();
}

export function getAuthStatus(): AuthStatusInfo {
  const enabled = isAuthEnabled();
  const configured = hasAuthConfigured();
  const record = enabled ? getPasswordRevealRecord() : null;

  return {
    enabled,
    configured,
    initialPasswordAvailable: record !== null,
    initialPasswordCreatedAt: record?.createdAt || null,
    revealCommand: AUTH_SHOW_PASSWORD_COMMAND,
    revealPasswordAvailable: record !== null,
    revealPasswordCreatedAt: record?.createdAt || null,
    revealPasswordKind: record?.kind || null,
  };
}

export function validatePassword(password: string): boolean {
  const data = readAuthData();
  if (!data) {
    return false;
  }
  return hashPassword(password, data.salt) === data.passwordHash;
}

export function createSession(): string {
  const now = Date.now();

  for (const [token, expiry] of activeSessions) {
    if (expiry <= now) {
      activeSessions.delete(token);
    }
  }

  if (activeSessions.size >= MAX_SESSIONS) {
    const [oldestToken] = activeSessions.keys();
    activeSessions.delete(oldestToken);
  }

  const token = crypto.randomBytes(32).toString('hex');
  activeSessions.set(token, now + TOKEN_EXPIRY_MS);
  return token;
}

export function validateSession(token: string): boolean {
  const expiry = activeSessions.get(token);
  if (!expiry) {
    return false;
  }
  if (expiry <= Date.now()) {
    activeSessions.delete(token);
    return false;
  }
  return true;
}

export function revokeSession(token: string): void {
  activeSessions.delete(token);
}

export function changePassword(
  currentPassword: string,
  newPassword: string,
): { success: boolean; error?: string } {
  if (!validatePassword(currentPassword)) {
    return { success: false, error: 'Current password is incorrect' };
  }

  if (!newPassword || newPassword.length < MIN_PASSWORD_LENGTH) {
    return {
      success: false,
      error: `New password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
    };
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const createdAt = new Date().toISOString();

  writeAuthData({
    passwordHash: hashPassword(newPassword, salt),
    salt,
    createdAt,
  });
  writeInitialPasswordRecord({
    password: newPassword,
    createdAt,
    authCreatedAt: createdAt,
    kind: 'changed',
  });

  activeSessions.clear();
  return { success: true };
}

export function extractBearerToken(req: http.IncomingMessage): string | undefined {
  const header = req.headers.authorization;
  const value = Array.isArray(header) ? header[0] : header;
  if (typeof value === 'string' && value.startsWith('Bearer ')) {
    return value.slice(7);
  }
  return undefined;
}

export function isAuthEnabled(): boolean {
  return process.env.GUARD_NO_AUTH !== '1';
}

export function checkLoginRate(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  let entry = ipRateMap.get(ip);

  if (!entry) {
    entry = { attempts: 0, windowStart: now, lockedUntil: 0 };
    ipRateMap.set(ip, entry);
  }

  if (now < entry.lockedUntil) {
    return { allowed: false, retryAfter: Math.ceil((entry.lockedUntil - now) / 1000) };
  }

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

export function recordLoginFailure(ip: string): void {
  const entry = ipRateMap.get(ip);
  if (entry) {
    entry.attempts += 1;
  }
}

export function resetLoginRate(ip: string): void {
  ipRateMap.delete(ip);
}

export function getClientIp(req: http.IncomingMessage): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].split(',')[0].trim();
  }
  return req.socket.remoteAddress || '127.0.0.1';
}
