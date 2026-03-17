import { fetchJson, postJson } from './client';

export type NotificationSeverity = 'info' | 'success' | 'warning' | 'error';

export type GuardNotification = {
  id: string;
  type: string;
  source: string;
  title: string;
  message: string;
  severity: NotificationSeverity;
  createdAt: string;
  read: boolean;
  meta?: Record<string, unknown>;
};

export type NotificationSummary = {
  items: GuardNotification[];
  total: number;
  unread: number;
  read: number;
};

export type ActivityEvent = {
  id: string;
  type: string;
  createdAt: string;
  title: string;
  description: string;
  sessionId?: string;
  agentId?: string;
  modelId?: string;
  status?: string;
};

export type NotificationsSnapshot = {
  summary: NotificationSummary;
  events: ActivityEvent[];
};

export type NotificationReadResult = {
  success: boolean;
  summary: NotificationSummary;
};

export type NotificationBulkAction = 'read-all' | 'unread-all' | 'clear-read' | 'clear-all';

export type NotificationBulkResult = {
  success: boolean;
  changed: number;
  message: string;
  summary: NotificationSummary;
};

export async function loadNotificationsSnapshot(limit = 200, activityLimit = 80): Promise<NotificationsSnapshot> {
  const [summary, activity] = await Promise.all([
    fetchJson<NotificationSummary>(`/api/notifications?limit=${encodeURIComponent(String(limit))}`),
    fetchJson<{ events?: ActivityEvent[] }>(`/api/activity?limit=${encodeURIComponent(String(activityLimit))}`),
  ]);

  return {
    summary: {
      items: Array.isArray(summary.items) ? summary.items : [],
      total: summary.total || 0,
      unread: summary.unread || 0,
      read: summary.read || 0,
    },
    events: Array.isArray(activity.events) ? activity.events : [],
  };
}

export function updateNotificationRead(id: string, read: boolean) {
  return postJson<NotificationReadResult>('/api/notifications/read', { id, read });
}

export function runNotificationBulkAction(action: NotificationBulkAction) {
  return postJson<NotificationBulkResult>('/api/notifications/bulk', { action });
}
