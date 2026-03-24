import { fetchJson } from './client';

export type GuardInfo = {
  guardVersion?: string;
  platform?: string;
  user?: string;
  nodeVersion?: string;
  openclaw?: {
    installed?: boolean;
    version?: string;
    detectedSource?: string;
  };
};

export type DashboardOverview = {
  availability?: Record<string, string>;
  nextActions?: Array<{ title?: string; description?: string; route?: string }>;
  risks?: Array<{ title?: string; severity?: string; detail?: string }>;
};

export type ServiceStatus = Record<string, unknown>;
export type WebBackgroundReport = Record<string, unknown>;
export type OpenClawStatus = Record<string, unknown>;
export type OpenClawTargetCatalog = Record<string, unknown>;

export async function loadDashboardSnapshot() {
  const [info, overview, services, openclaw] = await Promise.all([
    fetchJson<GuardInfo>('/api/info'),
    fetchJson<DashboardOverview>('/api/dashboard/overview'),
    fetchJson<ServiceStatus>('/api/service/status'),
    fetchJson<OpenClawStatus>('/api/openclaw/status'),
  ]);

  return { info, overview, services, openclaw };
}

export async function loadOperationsSnapshot() {
  const [services, webReport] = await Promise.all([
    fetchJson<ServiceStatus>('/api/service/status'),
    fetchJson<WebBackgroundReport>('/api/web-background/report'),
  ]);
  return { services, webReport };
}

export async function loadOpenClawSnapshot() {
  const [status, targets] = await Promise.all([
    fetchJson<OpenClawStatus>('/api/openclaw/status'),
    fetchJson<OpenClawTargetCatalog>('/api/openclaw/targets'),
  ]);
  return { status, targets };
}
