import fs from 'node:fs';
import path from 'node:path';
import { ensureDir, ensureGuardLayout, readJsonFile, sanitizeFileName, writeJsonFile } from './guard-state.js';

interface PersistentCacheEntry<T> {
  key: string;
  updatedAt: string;
  expiresAt: string;
  value: T;
}

export interface PersistentCacheOptions<T> {
  ttlMs: number;
  staleIfErrorMs?: number;
  loader: () => T;
  isValid?: (value: T) => boolean;
}

const memoryCache = new Map<string, PersistentCacheEntry<unknown>>();

function getCacheDir(): string {
  return ensureDir(path.join(ensureGuardLayout().stateDir, 'cache'));
}

function getCacheFile(key: string): string {
  return path.join(getCacheDir(), `${sanitizeFileName(key)}.json`);
}

function getScopedMemoryKey(key: string): string {
  return `${getCacheFile(key)}::${key}`;
}

function readEntry<T>(key: string): PersistentCacheEntry<T> | null {
  const scopedKey = getScopedMemoryKey(key);
  const cached = memoryCache.get(scopedKey);
  if (cached) return cached as PersistentCacheEntry<T>;

  const filePath = getCacheFile(key);
  if (!fs.existsSync(filePath)) return null;

  const entry = readJsonFile<PersistentCacheEntry<T> | null>(filePath, null);
  if (!entry || typeof entry.updatedAt !== 'string' || typeof entry.expiresAt !== 'string') {
    return null;
  }
  memoryCache.set(scopedKey, entry as PersistentCacheEntry<unknown>);
  return entry;
}

function writeEntry<T>(key: string, value: T, ttlMs: number): T {
  const now = Date.now();
  const entry: PersistentCacheEntry<T> = {
    key,
    updatedAt: new Date(now).toISOString(),
    expiresAt: new Date(now + Math.max(0, ttlMs)).toISOString(),
    value,
  };
  memoryCache.set(getScopedMemoryKey(key), entry as PersistentCacheEntry<unknown>);
  writeJsonFile(getCacheFile(key), entry);
  return value;
}

export function invalidatePersistentCache(key: string): void {
  memoryCache.delete(getScopedMemoryKey(key));
  const filePath = getCacheFile(key);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch {
      // ignore cache cleanup failures
    }
  }
}

export function getPersistentCachedValue<T>(key: string, options: PersistentCacheOptions<T>): T {
  const ttlMs = Math.max(0, Number(options.ttlMs) || 0);
  const staleIfErrorMs = Math.max(0, Number(options.staleIfErrorMs) || 0);
  const now = Date.now();
  const existing = readEntry<T>(key);

  if (existing) {
    const expiresAt = Date.parse(existing.expiresAt);
    const existingValid = options.isValid ? options.isValid(existing.value) : true;
    if (existingValid && Number.isFinite(expiresAt) && expiresAt > now) {
      return existing.value;
    }
  }

  try {
    const value = options.loader();
    if (options.isValid && !options.isValid(value)) {
      if (existing && staleIfErrorMs > 0) {
        const updatedAt = Date.parse(existing.updatedAt);
        if (Number.isFinite(updatedAt) && now - updatedAt <= staleIfErrorMs) {
          return existing.value;
        }
      }
      return value;
    }
    return writeEntry(key, value, ttlMs);
  } catch (error) {
    if (existing && staleIfErrorMs > 0) {
      const updatedAt = Date.parse(existing.updatedAt);
      if (Number.isFinite(updatedAt) && now - updatedAt <= staleIfErrorMs) {
        return existing.value;
      }
    }
    throw error;
  }
}
