import { fetchJson, postJson } from './client';

export type AuditStatus = 'pass' | 'warn' | 'fail';

export type AuditResult = {
  category: string;
  item: string;
  status: AuditStatus;
  message: string;
  fix?: string;
};

export type AuditSnapshot = {
  results: AuditResult[];
  summary: {
    pass: number;
    warn: number;
    fail: number;
  };
};

export type SecurityProfile = {
  key: string;
  name: string;
  description: string;
  riskLevel?: string;
  tools?: {
    allow?: string[];
    deny?: string[];
  };
  recommendations?: string[];
};

export type HardenStep = {
  id: string;
  title: string;
  description: string;
  optional?: boolean;
  commands?: string[];
};

export type HardeningSnapshot = {
  platform: 'windows' | 'macos' | 'linux' | string;
  steps: HardenStep[];
};

export type SecurityMutationResult = {
  success: boolean;
  message: string;
};

export function loadSecurityAudit() {
  return fetchJson<AuditSnapshot>('/api/audit');
}

export function loadSecurityProfiles() {
  return fetchJson<SecurityProfile[]>('/api/profiles');
}

export function applySecurityProfile(profile: string) {
  return postJson<SecurityMutationResult>('/api/profiles/apply', { profile });
}

export function loadHardeningSteps(platform: string) {
  return fetchJson<HardeningSnapshot>(`/api/harden/steps?platform=${encodeURIComponent(platform)}`);
}
