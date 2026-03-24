import { fetchJson } from './client';

export type ServiceLogsResponse = {
  logs: string[];
  requestedLines: number;
};

export async function loadServiceLogs(lines = 200): Promise<ServiceLogsResponse> {
  const response = await fetchJson<{ logs?: string[] }>(`/api/service/logs?lines=${encodeURIComponent(String(lines))}`);
  return {
    logs: Array.isArray(response.logs) ? response.logs.map((item) => String(item)) : [],
    requestedLines: lines,
  };
}
