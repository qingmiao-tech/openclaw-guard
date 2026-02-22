/**
 * 权限配置 Profile 管理
 * 根据使用场景生成对应的 openclaw.json 权限配置
 */
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
  riskLevel: '🟢 无风险' | '🟢 低风险' | '🟡 中风险' | '🟠 需防护' | '🔴 高风险';
  tools: ToolsConfig;
  recommendations: string[];
}

export const PROFILES: Record<string, SecurityProfile> = {
  chat: {
    name: '纯聊天模式',
    description: '仅允许对话，不允许任何文件或命令操作',
    riskLevel: '🟢 无风险',
    tools: {
      deny: ['group:fs', 'group:runtime', 'group:ui', 'group:automation'],
      allow: ['group:web', 'group:memory'],
    },
    recommendations: [
      '适合纯问答、头脑风暴场景',
      '无需额外安全配置',
    ],
  },
  readonly: {
    name: '只读辅助模式',
    description: '允许读取文件和搜索，不允许写入和执行命令',
    riskLevel: '🟢 低风险',
    tools: {
      deny: ['group:fs:write', 'group:runtime', 'group:ui', 'group:automation'],
      allow: ['group:fs:read', 'group:web', 'group:memory'],
    },
    recommendations: [
      '适合代码审查、文档查阅场景',
      '建议限定可读取的目录范围',
    ],
  },
  coding: {
    name: '开发辅助模式',
    description: '允许文件读写，不允许命令执行',
    riskLevel: '🟡 中风险',
    tools: {
      deny: ['group:runtime', 'group:ui'],
      allow: ['group:fs', 'group:web', 'group:memory'],
    },
    recommendations: [
      '建议创建专用用户运行 OpenClaw',
      '限定文件操作的工作目录',
      '保护 ~/.ssh、~/.gnupg 等敏感目录',
    ],
  },
  devops: {
    name: '全能开发模式',
    description: '允许文件操作和命令执行，适合开发部署场景',
    riskLevel: '🟠 需防护',
    tools: {
      allow: ['group:fs', 'group:runtime', 'group:web', 'group:memory'],
    },
    recommendations: [
      '强烈建议使用 Docker 沙箱部署',
      '必须创建专用低权限用户',
      '使用专用 deploy key 替代个人 Git 凭证',
      '配置网络隔离，限制对本地服务的访问',
      '定期审查命令执行日志',
    ],
  },
  full: {
    name: '完全信任模式',
    description: '开放全部权限，包括浏览器操作和自动化',
    riskLevel: '🔴 高风险',
    tools: {
      allow: ['group:fs', 'group:runtime', 'group:web', 'group:memory', 'group:ui', 'group:automation'],
    },
    recommendations: [
      '⚠️ 仅在完全信任且隔离的环境中使用',
      '必须使用 Docker 沙箱 + 独立用户',
      '必须配置网络隔离',
      '必须定期审计所有操作日志',
      '不建议在日常开发机上使用此模式',
    ],
  },
};

/** 将 profile 应用到 openclaw.json */
export function applyProfile(profileName: string, configPath?: string): { success: boolean; message: string } {
  const profile = PROFILES[profileName];
  if (!profile) {
    return { success: false, message: `未知的 profile: ${profileName}` };
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

  // 更新 tools 配置
  config.tools = profile.tools;

  // 添加 guard 元数据
  (config as Record<string, unknown>)._guard = {
    profile: profileName,
    appliedAt: new Date().toISOString(),
    version: '1.0.0',
  };

  try {
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(targetPath, JSON.stringify(config, null, 2), 'utf-8');
    return { success: true, message: `已应用 "${profile.name}" 配置到 ${targetPath}` };
  } catch (err) {
    return { success: false, message: `写入配置失败: ${err}` };
  }
}

/** 列出所有可用 profile */
export function listProfiles(): SecurityProfile[] {
  return Object.values(PROFILES);
}

/** 获取指定 profile */
export function getProfile(name: string): SecurityProfile | undefined {
  return PROFILES[name];
}
