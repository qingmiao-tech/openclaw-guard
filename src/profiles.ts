import fs from 'node:fs';
import path from 'node:path';
import { getOpenClawDir } from './platform.js';

export interface ToolsConfig {
  allow?: string[];
  deny?: string[];
}

export interface SecurityProfile {
  name: string;
  description: string;
  riskLevel: '🟢 无风险' | '🟡 低风险' | '🟠 中风险' | '🔴 需防护' | '⛔ 高风险';
  tools: ToolsConfig;
  recommendations: string[];
}

export const PROFILES: Record<string, SecurityProfile> = {
  chat: {
    name: '纯聊天模式',
    description: '仅允许对话，不允许任何文件操作、命令执行或自动化动作。',
    riskLevel: '🟢 无风险',
    tools: {
      deny: ['group:fs', 'group:runtime', 'group:ui', 'group:automation'],
      allow: ['group:web', 'group:memory'],
    },
    recommendations: [
      '适合问答、头脑风暴和说明文档解读。',
      '一般不需要额外的系统级安全动作。',
    ],
  },
  readonly: {
    name: '只读辅助模式',
    description: '允许读取文件和搜索内容，但不允许写入、命令执行或自动化动作。',
    riskLevel: '🟡 低风险',
    tools: {
      deny: ['group:fs:write', 'group:runtime', 'group:ui', 'group:automation'],
      allow: ['group:fs:read', 'group:web', 'group:memory'],
    },
    recommendations: [
      '适合代码审查、文档查阅和只读检索场景。',
      '建议同时收紧可读取的工作区范围。',
    ],
  },
  coding: {
    name: '开发辅助模式',
    description: '允许读写工作区文件，但不允许命令执行和浏览器自动化。',
    riskLevel: '🟠 中风险',
    tools: {
      deny: ['group:runtime', 'group:ui'],
      allow: ['group:fs', 'group:web', 'group:memory'],
    },
    recommendations: [
      '适合文档整理、配置修改和轻量代码编辑。',
      '建议限制工作区范围，不要把整个 Home 目录暴露给 Guard。',
      '请把 ~/.ssh、浏览器数据、云凭证等敏感目录排除在工作区之外。',
    ],
  },
  devops: {
    name: '全能开发模式',
    description: '允许文件操作和命令执行，适合受控的开发、构建与部署场景。',
    riskLevel: '🔴 需防护',
    tools: {
      allow: ['group:fs', 'group:runtime', 'group:web', 'group:memory'],
    },
    recommendations: [
      '更适合短时、受控的排障或交付场景，不建议长期默认开启。',
      '如果需要长期后台运行，建议结合容器或独立低权限账户。',
      '建议为 Git 同步使用 deploy key 或最小权限 token。',
    ],
  },
  full: {
    name: '完全信任模式',
    description: '开放全部工具权限，包括浏览器操作和自动化任务。',
    riskLevel: '⛔ 高风险',
    tools: {
      allow: ['group:fs', 'group:runtime', 'group:web', 'group:memory', 'group:ui', 'group:automation'],
    },
    recommendations: [
      '仅建议在完全信任且具备隔离条件的环境中使用。',
      '更适合容器、虚拟机或独立测试机，不建议在日常主力开发机上长期启用。',
      '启用前请确认网络、凭证和工作区边界都已单独收紧。',
    ],
  },
};

export function applyProfile(profileName: string, configPath?: string): { success: boolean; message: string } {
  const profile = PROFILES[profileName];
  if (!profile) {
    return { success: false, message: `未知的权限模式: ${profileName}` };
  }

  const targetPath = configPath || path.join(getOpenClawDir(), 'openclaw.json');
  let config: Record<string, unknown> = {};

  if (fs.existsSync(targetPath)) {
    try {
      config = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));
    } catch {
      return { success: false, message: `配置文件解析失败: ${targetPath}` };
    }
  }

  config.tools = profile.tools;

  try {
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(targetPath, JSON.stringify(config, null, 2), 'utf-8');
    return { success: true, message: `已将“${profile.name}”写入 ${targetPath}` };
  } catch (error) {
    return { success: false, message: `写入配置失败: ${error}` };
  }
}

export function listProfiles(): SecurityProfile[] {
  return Object.values(PROFILES);
}

export function getProfile(name: string): SecurityProfile | undefined {
  return PROFILES[name];
}
