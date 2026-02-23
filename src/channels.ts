/**
 * 渠道配置管理模块
 * 管理飞书、Telegram、Discord 等消息渠道的配置
 */
import { loadConfig, saveConfig, setNested, readEnvValue, writeEnvValue, removeEnvValue } from './config.js';

export interface ChannelInfo {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  configured: boolean;
  config: Record<string, any>;
}

/** 支持的渠道定义 */
const CHANNEL_DEFS: Array<{ id: string; name: string; icon: string; fields: string[]; envFields: string[] }> = [
  {
    id: 'feishu', name: '飞书 / Lark', icon: '🐦',
    fields: ['appId', 'appSecret', 'encryptKey', 'verificationToken', 'domain', 'connectionMode', 'webhookPath', 'webhookHost', 'webhookPort', 'dmPolicy', 'groupPolicy', 'requireMention', 'streaming', 'renderMode', 'whisperModel'],
    envFields: [],
  },
  {
    id: 'telegram', name: 'Telegram', icon: '✈️',
    fields: ['botToken', 'dmPolicy', 'groupPolicy', 'requireMention'],
    envFields: ['TELEGRAM_BOT_TOKEN'],
  },
  {
    id: 'discord', name: 'Discord', icon: '🎮',
    fields: ['botToken', 'dmPolicy', 'groupPolicy', 'requireMention'],
    envFields: ['DISCORD_BOT_TOKEN'],
  },
  {
    id: 'slack', name: 'Slack', icon: '💬',
    fields: ['botToken', 'appToken', 'dmPolicy', 'groupPolicy'],
    envFields: ['SLACK_BOT_TOKEN', 'SLACK_APP_TOKEN'],
  },
  {
    id: 'whatsapp', name: 'WhatsApp', icon: '📱',
    fields: ['dmPolicy'],
    envFields: [],
  },
  {
    id: 'imessage', name: 'iMessage', icon: '🍎',
    fields: ['dmPolicy'],
    envFields: [],
  },
];

/** 获取所有渠道配置 */
export function getChannels(): ChannelInfo[] {
  const config = loadConfig();
  const channels = config.channels || {};

  return CHANNEL_DEFS.map(def => {
    const chCfg = channels[def.id] || {};
    const enabled = chCfg.enabled === true;
    const hasAnyConfig = Object.keys(chCfg).filter(k => k !== 'enabled').length > 0;

    // 收集配置（排除 enabled）
    const cfgOut: Record<string, any> = {};
    for (const [k, v] of Object.entries(chCfg)) {
      if (k !== 'enabled') cfgOut[k] = v;
    }

    // 读取 env 中的敏感字段
    for (const envKey of def.envFields) {
      const val = readEnvValue(envKey);
      if (val) cfgOut[`env:${envKey}`] = val;
    }

    return {
      id: def.id,
      name: def.name,
      icon: def.icon,
      enabled,
      configured: hasAnyConfig || enabled,
      config: cfgOut,
    };
  });
}

/** 获取单个渠道配置 */
export function getChannel(channelId: string): ChannelInfo | undefined {
  return getChannels().find(c => c.id === channelId);
}

/** 保存渠道配置 */
export function saveChannel(channelId: string, channelConfig: Record<string, any>): { success: boolean; message: string } {
  const def = CHANNEL_DEFS.find(d => d.id === channelId);
  if (!def) return { success: false, message: `未知渠道: ${channelId}` };

  const config = loadConfig();

  // 确保 channels 和 plugins 路径存在
  if (!config.channels) config.channels = {};
  if (!config.plugins) config.plugins = { allow: [], entries: {} };
  if (!config.plugins.allow) config.plugins.allow = [];
  if (!config.plugins.entries) config.plugins.entries = {};

  // 分离 env 字段和 config 字段
  const configFields: Record<string, any> = { enabled: true };
  for (const [k, v] of Object.entries(channelConfig)) {
    if (k.startsWith('env:')) {
      // 写入 env 文件
      const envKey = k.slice(4);
      if (v && String(v).trim()) {
        writeEnvValue(envKey, String(v));
      } else {
        removeEnvValue(envKey);
      }
    } else if (k !== 'enabled') {
      configFields[k] = v;
    }
  }

  // 更新 channels 配置
  config.channels[channelId] = configFields;

  // 更新 plugins.allow
  if (!config.plugins.allow.includes(channelId)) {
    config.plugins.allow.push(channelId);
  }
  config.plugins.entries[channelId] = { enabled: true };

  try {
    saveConfig(config);
    return { success: true, message: `${def.name} 配置已保存` };
  } catch (err) {
    return { success: false, message: `保存失败: ${err}` };
  }
}

/** 清空渠道配置 */
export function clearChannel(channelId: string): { success: boolean; message: string } {
  const def = CHANNEL_DEFS.find(d => d.id === channelId);
  if (!def) return { success: false, message: `未知渠道: ${channelId}` };

  const config = loadConfig();

  // 删除 channels 中的配置
  if (config.channels) delete config.channels[channelId];

  // 从 plugins.allow 中移除
  if (Array.isArray(config.plugins?.allow)) {
    config.plugins.allow = config.plugins.allow.filter((id: string) => id !== channelId);
  }
  if (config.plugins?.entries) delete config.plugins.entries[channelId];

  // 清除 env 变量
  for (const envKey of def.envFields) {
    removeEnvValue(envKey);
  }

  try {
    saveConfig(config);
    return { success: true, message: `${def.name} 配置已清空` };
  } catch (err) {
    return { success: false, message: `清空失败: ${err}` };
  }
}

// ========== 飞书专用配置 ==========

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

/** 获取飞书配置 */
export function getFeishuConfig(): FeishuConfig {
  const config = loadConfig();
  return config.channels?.feishu || {};
}

/** 保存飞书配置 */
export function saveFeishuConfig(feishuCfg: FeishuConfig): { success: boolean; message: string } {
  const config = loadConfig();
  if (!config.channels) config.channels = {};

  // 合并配置，保留未传入的字段
  const existing = config.channels.feishu || {};
  config.channels.feishu = { ...existing, ...feishuCfg, enabled: true };

  // 清理空值
  for (const [k, v] of Object.entries(config.channels.feishu)) {
    if (v === '' || v === null || v === undefined) {
      delete config.channels.feishu[k];
    }
  }
  config.channels.feishu.enabled = true;

  // 确保 plugins 配置
  if (!config.plugins) config.plugins = { allow: [], entries: {} };
  if (!config.plugins.allow) config.plugins.allow = [];
  if (!config.plugins.entries) config.plugins.entries = {};
  if (!config.plugins.allow.includes('feishu')) config.plugins.allow.push('feishu');
  config.plugins.entries.feishu = { enabled: true };

  try {
    saveConfig(config);
    return { success: true, message: '飞书配置已保存' };
  } catch (err) {
    return { success: false, message: `保存失败: ${err}` };
  }
}

/** 检查飞书插件安装状态 */
export function checkFeishuPlugin(): { installed: boolean; version?: string } {
  const config = loadConfig();
  // 检查 plugins.entries 中是否有 feishu
  const feishuEntry = config.plugins?.entries?.feishu;
  if (feishuEntry) {
    return { installed: true, version: feishuEntry.version };
  }
  // 检查 plugins.allow 中是否有 feishu
  if (Array.isArray(config.plugins?.allow) && config.plugins.allow.includes('feishu')) {
    return { installed: true };
  }
  return { installed: false };
}