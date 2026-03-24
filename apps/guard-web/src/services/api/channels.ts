import { deleteJson, fetchJson, postJson } from './client';

export type ChannelInfo = {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  configured: boolean;
  config: Record<string, unknown>;
};

export type ChannelDefinition = {
  id: string;
  name: string;
  icon: string;
  fields: string[];
  envFields: string[];
};

export type ChannelMutationResult = {
  success: boolean;
  message: string;
};

export type FeishuPluginStatus = {
  installed: boolean;
  version?: string;
};

export async function loadChannelsSnapshot() {
  const [channels, definitions, feishuPlugin] = await Promise.all([
    fetchJson<ChannelInfo[]>('/api/channels'),
    fetchJson<ChannelDefinition[]>('/api/channels/meta'),
    fetchJson<FeishuPluginStatus>('/api/feishu/plugin').catch(() => ({ installed: false })),
  ]);

  return {
    channels,
    definitions,
    feishuPlugin,
  };
}

export function saveChannelConfig(channelId: string, payload: Record<string, unknown>) {
  return postJson<ChannelMutationResult>(`/api/channels/${encodeURIComponent(channelId)}`, payload);
}

export function clearChannelConfig(channelId: string) {
  return deleteJson<ChannelMutationResult>(`/api/channels/${encodeURIComponent(channelId)}`);
}
