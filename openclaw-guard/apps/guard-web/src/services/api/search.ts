import { fetchJson } from './client';

export type SearchHit = {
  path: string;
  relativePath: string;
  line: number;
  preview: string;
};

export function searchManagedFiles(query: string, limit = 100) {
  const params = new URLSearchParams({
    q: query,
    limit: String(limit),
  });
  return fetchJson<{ results: SearchHit[] }>(`/api/search?${params.toString()}`);
}
