import { loadConfig, saveConfig, readEnvValue, writeEnvValue, removeEnvValue } from './config.js';

export interface ChannelInfo {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  configured: boolean;
  config: Record<string, any>;
}

export interface ChannelDefinition {
  id: string;
  name: string;
  icon: string;
  fields: string[];
  envFields: string[];
}

const CHANNEL_DEFS: ChannelDefinition[] = [
  {
    id: 'feishu',
    name: '飞书 / Lark',
    icon: '🪁',
    fields: ['appId', 'appSecret', 'encryptKey', 'verificationToken', 'domain', 'connectionMode', 'webhookPath', 'webhookHost', 'webhookPort', 'dmPolicy', 'groupPolicy', 'requireMention', 'streaming', 'renderMode', 'whisperModel'],
    envFields: [],
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: '✈️',
    fields: ['botToken', 'dmPolicy', 'groupPolicy', 'requireMention'],
    envFields: ['TELEGRAM_BOT_TOKEN'],
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: '🎮',
    fields: ['botToken', 'dmPolicy', 'groupPolicy', 'requireMention'],
    envFields: ['DISCORD_BOT_TOKEN'],
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: '💬',
    fields: ['botToken', 'appToken', 'dmPolicy', 'groupPolicy'],
    envFields: ['SLACK_BOT_TOKEN', 'SLACK_APP_TOKEN'],
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '📱',
    fields: ['dmPolicy'],
    envFields: [],
  },
  {
    id: 'imessage',
    name: 'iMessage',
    icon: '💚',
    fields: ['dmPolicy'],
    envFields: [],
  },
];

function getPluginsConfig(config: Record<string, any>): { allow: string[]; entries: Record<string, any> } {
  if (!config.plugins || typeof config.plugins !== 'object') {
    config.plugins = { allow: [], entries: {} };
  }
  if (!Array.isArray(config.plugins.allow)) {
    config.plugins.allow = [];
  }
  if (!config.plugins.entries || typeof config.plugins.entries !== 'object') {
    config.plugins.entries = {};
  }
  return config.plugins;
}

export function getChannelDefinitions(): ChannelDefinition[] {
  return CHANNEL_DEFS.map((item) => ({ ...item, fields: [...item.fields], envFields: [...item.envFields] }));
}

export function getChannels(): ChannelInfo[] {
  const config = loadConfig();
  const channels = config.channels || {};

  return CHANNEL_DEFS.map((def) => {
    const chCfg = channels[def.id] || {};
    const enabled = chCfg.enabled === true;
    const output: Record<string, any> = {};

    for (const [key, value] of Object.entries(chCfg)) {
      if (key !== 'enabled') output[key] = value;
    }

    let hasEnvConfig = false;
    for (const envKey of def.envFields) {
      const value = readEnvValue(envKey);
      if (value) {
        output[`env:${envKey}`] = value;
        hasEnvConfig = true;
      }
    }

    return {
      id: def.id,
      name: def.name,
      icon: def.icon,
      enabled,
      configured: Object.keys(output).length > 0 || hasEnvConfig || enabled,
      config: output,
    };
  });
}

export function getChannel(channelId: string): ChannelInfo | undefined {
  return getChannels().find((channel) => channel.id === channelId);
}

export function saveChannel(channelId: string, channelConfig: Record<string, any>): { success: boolean; message: string } {
  const def = CHANNEL_DEFS.find((item) => item.id === channelId);
  if (!def) {
    return { success: false, message: `未知渠道：${channelId}` };
  }

  const config = loadConfig();
  if (!config.channels || typeof config.channels !== 'object') {
    config.channels = {};
  }

  const enabled = channelConfig.enabled !== false;
  const nextConfig: Record<string, any> = { enabled };

  for (const [key, value] of Object.entries(channelConfig || {})) {
    if (key.startsWith('env:')) {
      const envKey = key.slice(4);
      const envValue = String(value ?? '').trim();
      if (envValue) {
        writeEnvValue(envKey, envValue);
      } else {
        removeEnvValue(envKey);
      }
      continue;
    }

    if (key === 'enabled') continue;
    if (value === '' || value === null || value === undefined) continue;
    nextConfig[key] = value;
  }

  config.channels[channelId] = nextConfig;

  const plugins = getPluginsConfig(config);
  if (!plugins.allow.includes(channelId)) {
    plugins.allow.push(channelId);
  }
  plugins.entries[channelId] = { enabled };

  try {
    saveConfig(config);
    return {
      success: true,
      message: enabled ? `${def.name} 配置已保存并启用。` : `${def.name} 配置已保存为停用状态。`,
    };
  } catch (error) {
    return { success: false, message: `保存失败：${error}` };
  }
}

export function clearChannel(channelId: string): { success: boolean; message: string } {
  const def = CHANNEL_DEFS.find((item) => item.id === channelId);
  if (!def) {
    return { success: false, message: `未知渠道：${channelId}` };
  }

  const config = loadConfig();
  if (config.channels && typeof config.channels === 'object') {
    delete config.channels[channelId];
  }

  const plugins = getPluginsConfig(config);
  plugins.allow = plugins.allow.filter((id: string) => id !== channelId);
  delete plugins.entries[channelId];

  for (const envKey of def.envFields) {
    removeEnvValue(envKey);
  }

  try {
    saveConfig(config);
    return { success: true, message: `${def.name} 配置已清空。` };
  } catch (error) {
    return { success: false, message: `清空失败：${error}` };
  }
}

export interface FeishuConfig {
  appId?: string;
  appSecret?: string;
  encryptKey?: string;
  verificationToken?: string;
  domain?: string;
  connectionMode?: string;
  webhookPath?: string;
  webhookHost?: string;
  webhookPort?: number;
  dmPolicy?: string;
  groupPolicy?: string;
  requireMention?: boolean;
  streaming?: boolean;
  renderMode?: string;
  whisperModel?: string;
  enabled?: boolean;
}

export function getFeishuConfig(): FeishuConfig {
  const config = loadConfig();
  return config.channels?.feishu || {};
}

export function saveFeishuConfig(feishuCfg: FeishuConfig): { success: boolean; message: string } {
  const config = loadConfig();
  if (!config.channels || typeof config.channels !== 'object') {
    config.channels = {};
  }

  const existing = config.channels.feishu || {};
  config.channels.feishu = { ...existing, ...feishuCfg, enabled: feishuCfg.enabled !== false };

  for (const [key, value] of Object.entries(config.channels.feishu)) {
    if (value === '' || value === null || value === undefined) {
      delete config.channels.feishu[key];
    }
  }

  const plugins = getPluginsConfig(config);
  if (!plugins.allow.includes('feishu')) {
    plugins.allow.push('feishu');
  }
  plugins.entries.feishu = { enabled: config.channels.feishu.enabled !== false };

  try {
    saveConfig(config);
    return { success: true, message: '飞书配置已保存。' };
  } catch (error) {
    return { success: false, message: `保存失败：${error}` };
  }
}

export function checkFeishuPlugin(): { installed: boolean; version?: string } {
  const config = loadConfig();
  const feishuEntry = config.plugins?.entries?.feishu;
  if (feishuEntry) {
    return { installed: true, version: feishuEntry.version };
  }
  if (Array.isArray(config.plugins?.allow) && config.plugins.allow.includes('feishu')) {
    return { installed: true };
  }
  return { installed: false };
}
