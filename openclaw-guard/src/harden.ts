/**
 * 系统加固模块 - 生成跨平台的加固脚本
 */
import { detectPlatform, getSensitivePaths, getHomeDir, type Platform } from './platform.js';

export interface HardenStep {
  title: string;
  description: string;
  commands: Record<Platform, string[]>;
  optional: boolean;
}

/** 生成创建专用用户的步骤 */
function createUserSteps(): HardenStep {
  return {
    title: '创建专用用户 openclaw-agent',
    description: '隔离 OpenClaw 运行环境，限制其系统权限',
    optional: false,
    commands: {
      linux: [
        'sudo adduser --disabled-password --gecos "OpenClaw Agent" openclaw-agent',
        'sudo chown -R openclaw-agent:openclaw-agent /home/openclaw-agent',
      ],
      macos: [
        'sudo dscl . -create /Users/openclaw-agent',
        'sudo dscl . -create /Users/openclaw-agent UserShell /bin/bash',
        'sudo dscl . -create /Users/openclaw-agent NFSHomeDirectory /Users/openclaw-agent',
        'sudo mkdir -p /Users/openclaw-agent',
        'sudo chown -R openclaw-agent /Users/openclaw-agent',
      ],
      windows: [
        'net user openclaw-agent * /add',
        ':: 注意：不要将此用户加入 Administrators 组',
      ],
    },
  };
}

/** 生成保护敏感目录的步骤 */
function protectSensitiveDirsSteps(): HardenStep {
  return {
    title: '保护敏感目录',
    description: '确保 openclaw-agent 无法访问 SSH 密钥、Git 凭证、浏览器数据等',
    optional: false,
    commands: {
      linux: [
        `chmod 700 ${getHomeDir()}/.ssh`,
        `chmod 600 ${getHomeDir()}/.ssh/*`,
        `chmod 700 ${getHomeDir()}/.gnupg 2>/dev/null || true`,
        `chmod 600 ${getHomeDir()}/.git-credentials 2>/dev/null || true`,
      ],
      macos: [
        `chmod 700 ${getHomeDir()}/.ssh`,
        `chmod 600 ${getHomeDir()}/.ssh/*`,
        `chmod 700 ${getHomeDir()}/.gnupg 2>/dev/null || true`,
        `chmod 600 ${getHomeDir()}/.git-credentials 2>/dev/null || true`,
      ],
      windows: [
        `icacls "%USERPROFILE%\\.ssh" /deny openclaw-agent:(OI)(CI)(R)`,
        `icacls "%USERPROFILE%\\.gnupg" /deny openclaw-agent:(OI)(CI)(R)`,
        `icacls "%USERPROFILE%\\.git-credentials" /deny openclaw-agent:(R)`,
      ],
    },
  };
}

/** 生成工作目录配置步骤 */
function setupWorkspaceSteps(): HardenStep {
  return {
    title: '配置工作目录白名单',
    description: '只将需要 AI 操作的项目目录链接到 openclaw-agent 的 home 下',
    optional: false,
    commands: {
      linux: [
        'sudo -u openclaw-agent mkdir -p /home/openclaw-agent/workspace',
        'sudo -u openclaw-agent ln -s /path/to/your/project /home/openclaw-agent/workspace/project',
        '# 替换 /path/to/your/project 为实际项目路径',
      ],
      macos: [
        'sudo -u openclaw-agent mkdir -p /Users/openclaw-agent/workspace',
        'sudo -u openclaw-agent ln -s /path/to/your/project /Users/openclaw-agent/workspace/project',
        '# 替换 /path/to/your/project 为实际项目路径',
      ],
      windows: [
        'runas /user:openclaw-agent "mkdir C:\\Users\\openclaw-agent\\workspace"',
        'mklink /D C:\\Users\\openclaw-agent\\workspace\\project "C:\\path\\to\\your\\project"',
        ':: 替换路径为实际项目路径',
      ],
    },
  };
}

/** 生成 Docker 沙箱部署步骤 */
function dockerSandboxSteps(): HardenStep {
  return {
    title: 'Docker 沙箱部署（推荐）',
    description: '使用 Docker 容器隔离 OpenClaw，最安全的方案',
    optional: true,
    commands: {
      linux: [
        'docker run -d \\',
        '  --name openclaw-guard \\',
        '  -v /path/to/projects:/workspace \\',
        '  -v /path/to/.env:/app/.env:ro \\',
        '  --user 1001:1001 \\',
        '  --network=bridge \\',
        '  --memory=2g \\',
        '  --cpus=2 \\',
        '  node:22-slim',
      ],
      macos: [
        'docker run -d \\',
        '  --name openclaw-guard \\',
        '  -v /path/to/projects:/workspace \\',
        '  -v /path/to/.env:/app/.env:ro \\',
        '  --user 1001:1001 \\',
        '  --network=bridge \\',
        '  --memory=2g \\',
        '  --cpus=2 \\',
        '  node:22-slim',
      ],
      windows: [
        'docker run -d ^',
        '  --name openclaw-guard ^',
        '  -v C:\\path\\to\\projects:/workspace ^',
        '  -v C:\\path\\to\\.env:/app/.env:ro ^',
        '  --user 1001:1001 ^',
        '  --network=bridge ^',
        '  --memory=2g ^',
        '  --cpus=2 ^',
        '  node:22-slim',
      ],
    },
  };
}

/** 生成 Git 凭证保护步骤 */
function gitCredentialSteps(): HardenStep {
  return {
    title: 'Git 凭证保护',
    description: '为 AI 创建专用的受限 Git 凭证，不使用个人 token',
    optional: false,
    commands: {
      linux: [
        '# 为 openclaw-agent 生成专用 SSH key（仅用于特定仓库）',
        'sudo -u openclaw-agent ssh-keygen -t ed25519 -C "openclaw-agent" -f /home/openclaw-agent/.ssh/id_ed25519 -N ""',
        '# 将公钥添加为 GitHub/GitLab 的 deploy key（只读权限）',
        'cat /home/openclaw-agent/.ssh/id_ed25519.pub',
      ],
      macos: [
        'sudo -u openclaw-agent ssh-keygen -t ed25519 -C "openclaw-agent" -f /Users/openclaw-agent/.ssh/id_ed25519 -N ""',
        'cat /Users/openclaw-agent/.ssh/id_ed25519.pub',
      ],
      windows: [
        'runas /user:openclaw-agent "ssh-keygen -t ed25519 -C openclaw-agent"',
        'type C:\\Users\\openclaw-agent\\.ssh\\id_ed25519.pub',
        ':: 将公钥添加为仓库的 deploy key',
      ],
    },
  };
}

/** 获取所有加固步骤 */
export function getAllHardenSteps(): HardenStep[] {
  return [
    createUserSteps(),
    protectSensitiveDirsSteps(),
    setupWorkspaceSteps(),
    gitCredentialSteps(),
    dockerSandboxSteps(),
  ];
}

/** 生成当前平台的加固脚本 */
export function generateHardenScript(platform?: Platform): string {
  const p = platform || detectPlatform();
  const steps = getAllHardenSteps();
  const lines: string[] = [];

  const comment = p === 'windows' ? '::' : '#';
  const shebang = p === 'windows' ? '@echo off' : '#!/bin/bash';

  lines.push(shebang);
  lines.push(`${comment} OpenClaw Guard - 系统安全加固脚本`);
  lines.push(`${comment} 平台: ${p}`);
  lines.push(`${comment} 生成时间: ${new Date().toISOString()}`);
  lines.push('');

  for (const step of steps) {
    lines.push(`${comment} ========================================`);
    lines.push(`${comment} ${step.title}${step.optional ? '（可选）' : ''}`);
    lines.push(`${comment} ${step.description}`);
    lines.push(`${comment} ========================================`);
    for (const cmd of step.commands[p]) {
      lines.push(cmd);
    }
    lines.push('');
  }

  return lines.join('\n');
}
