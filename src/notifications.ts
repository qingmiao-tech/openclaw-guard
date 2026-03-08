import path from 'node:path';
import { ensureGuardLayout, isoNow, readJsonFile, writeJsonFile } from './guard-state.js';

export type NotificationSeverity = 'info' | 'success' | 'warning' | 'error';

export interface GuardNotification {
  id: string;
  type: string;
  source: string;
  title: string;
  message: string;
  severity: NotificationSeverity;
  createdAt: string;
  read: boolean;
  meta?: Record<string, unknown>;
}

export interface CreateNotificationInput {
  type: string;
  source: string;
  title: string;
  message: string;
  severity?: NotificationSeverity;
  meta?: Record<string, unknown>;
}

function getNotificationsFile(): string {
  return path.join(ensureGuardLayout().stateDir, 'notifications.json');
}

export function listNotifications(limit = 100): GuardNotification[] {
  const items = readJsonFile<GuardNotification[]>(getNotificationsFile(), []);
  const sorted = items.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return limit > 0 ? sorted.slice(0, limit) : sorted;
}

export function saveNotifications(items: GuardNotification[]): void {
  writeJsonFile(getNotificationsFile(), items.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
}

function isRecentDuplicate(items: GuardNotification[], input: CreateNotificationInput, dedupeWindowMs: number): boolean {
  const latest = items[0];
  if (!latest) return false;
  if (latest.type !== input.type || latest.source !== input.source || latest.title !== input.title || latest.message !== input.message) {
    return false;
  }
  const createdAt = Date.parse(latest.createdAt);
  if (!Number.isFinite(createdAt)) return false;
  return Date.now() - createdAt < dedupeWindowMs;
}

export function addNotification(input: CreateNotificationInput, dedupeWindowMs = 30_000): GuardNotification {
  const items = listNotifications(0);
  if (isRecentDuplicate(items, input, dedupeWindowMs)) {
    return items[0];
  }

  const notification: GuardNotification = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`,
    type: input.type,
    source: input.source,
    title: input.title,
    message: input.message,
    severity: input.severity || 'info',
    createdAt: isoNow(),
    read: false,
    meta: input.meta,
  };
  items.unshift(notification);
  saveNotifications(items.slice(0, 500));
  return notification;
}

export function markNotificationRead(id: string, read = true): boolean {
  const items = listNotifications(0);
  const target = items.find((item) => item.id === id);
  if (!target) return false;
  target.read = read;
  saveNotifications(items);
  return true;
}

export function clearNotifications(): void {
  saveNotifications([]);
}

export function getUnreadNotificationCount(): number {
  return listNotifications(0).filter((item) => !item.read).length;
}
