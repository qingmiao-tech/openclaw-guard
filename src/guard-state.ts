import fs from 'node:fs';
import path from 'node:path';
import { getOpenClawDir, getHomeDir } from './platform.js';

export interface GuardLayout {
  guardDir: string;
  stateDir: string;
  secretsDir: string;
  sessionsDir: string;
  activityDir: string;
  costsDir: string;
}

let cachedLayout: GuardLayout | null = null;

export function resolveUserPath(inputPath: string): string {
  const trimmed = String(inputPath || '').trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith('~')) {
    return path.resolve(path.join(getHomeDir(), trimmed.slice(1)));
  }
  return path.resolve(trimmed);
}

export function ensureDir(dirPath: string): string {
  fs.mkdirSync(dirPath, { recursive: true });
  return dirPath;
}

export function getGuardDir(): string {
  return path.join(getOpenClawDir(), 'guard');
}

export function getGuardStateDir(): string {
  return path.join(getGuardDir(), 'state');
}

export function getGuardSecretsDir(): string {
  return path.join(getGuardDir(), 'secrets');
}

function createLayout(baseDir: string): GuardLayout {
  const guardDir = ensureDir(baseDir);
  const stateDir = ensureDir(path.join(guardDir, 'state'));
  const secretsDir = ensureDir(path.join(guardDir, 'secrets'));
  const sessionsDir = ensureDir(path.join(stateDir, 'sessions'));
  const activityDir = ensureDir(path.join(stateDir, 'activity'));
  const costsDir = ensureDir(path.join(stateDir, 'costs'));

  return {
    guardDir,
    stateDir,
    secretsDir,
    sessionsDir,
    activityDir,
    costsDir,
  };
}

export function ensureGuardLayout(): GuardLayout {
  if (cachedLayout) return cachedLayout;

  const preferredDir = getGuardDir();
  try {
    cachedLayout = createLayout(preferredDir);
    return cachedLayout;
  } catch {
    const fallbackDir = path.resolve(process.cwd(), '.guard-runtime', 'openclaw-state');
    cachedLayout = createLayout(fallbackDir);
    return cachedLayout;
  }
}

export function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
  } catch {
    return fallback;
  }
}

export function writeJsonFile(filePath: string, data: unknown): void {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function appendJsonl(filePath: string, entry: unknown): void {
  ensureDir(path.dirname(filePath));
  fs.appendFileSync(filePath, `${JSON.stringify(entry)}\n`, 'utf-8');
}

export function readJsonl<T>(filePath: string, limit = 200): T[] {
  try {
    if (!fs.existsSync(filePath)) return [];
    const lines = fs.readFileSync(filePath, 'utf-8')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    const sliced = limit > 0 ? lines.slice(-limit) : lines;
    return sliced
      .map((line) => {
        try {
          return JSON.parse(line) as T;
        } catch {
          return null;
        }
      })
      .filter((item): item is T => item !== null);
  } catch {
    return [];
  }
}

export function sanitizeFileName(input: string): string {
  return String(input || '')
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'untitled';
}

export function isoNow(): string {
  return new Date().toISOString();
}

export function statSafe(targetPath: string): fs.Stats | null {
  try {
    return fs.statSync(targetPath);
  } catch {
    return null;
  }
}
