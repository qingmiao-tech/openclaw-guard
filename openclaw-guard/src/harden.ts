import { detectPlatform, getHomeDir, type Platform } from './platform.js';

export interface HardenStep {
  title: string;
  description: string;
  commands: Record<Platform, string[]>;
  optional: boolean;
}

function getWorkspaceRoot(platform: Platform) {
  const home = getHomeDir();
  if (platform === 'windows') {
    return `${home}\\openclaw-workspace`;
  }
  return `${home}/openclaw-workspace`;
}

function createBaselineAccountStep(): HardenStep {
  return {
    title: '使用非管理员账户运行 Guard',
    description: '所有平台的第一原则都一样：先避免用 root / Administrator 直接运行。独立低权限账户属于高级选项，不是每台机器的默认硬要求。',
    optional: false,
    commands: {
      linux: [
        'whoami',
        '# 确认当前输出不是 root；若是 root，请切回普通用户后再启动 openclaw-guard',
      ],
      macos: [
        'whoami',
        '# 确认当前输出不是 root；若是 root，请切回普通用户后再启动 openclaw-guard',
      ],
      windows: [
        'whoami',
        ':: 确认当前不是 Administrator；请优先使用普通本地账户启动 openclaw-guard',
      ],
    },
  };
}

function createWorkspaceBoundaryStep(): HardenStep {
  const linuxWorkspace = getWorkspaceRoot('linux');
  const macWorkspace = getWorkspaceRoot('macos');
  const winWorkspace = getWorkspaceRoot('windows');
  return {
    title: '收紧工作区边界',
    description: '只把需要让 Agent 接触的项目目录放进工作区，不要直接把整个 Home 目录暴露给 Guard。',
    optional: false,
    commands: {
      linux: [
        `mkdir -p "${linuxWorkspace}"`,
        `ln -s /path/to/your/project "${linuxWorkspace}/project"`,
        '# 只链接需要交给 Agent 操作的项目目录',
      ],
      macos: [
        `mkdir -p "${macWorkspace}"`,
        `ln -s /path/to/your/project "${macWorkspace}/project"`,
        '# 只链接需要交给 Agent 操作的项目目录',
      ],
      windows: [
        `mkdir "${winWorkspace}"`,
        `mklink /D "${winWorkspace}\\project" "C:\\path\\to\\your\\project"`,
        ':: 仅把需要让 Agent 接触的目录放入工作区',
      ],
    },
  };
}

function createSecretsBoundaryStep(): HardenStep {
  const home = getHomeDir();
  return {
    title: '把凭证和浏览器数据排除在工作区之外',
    description: '基础安全并不要求你立刻改 ACL，而是先确保 SSH、Git 凭证、云凭证和浏览器数据没有被纳入 Agent 工作区。',
    optional: false,
    commands: {
      linux: [
        `ls -ld "${home}/.ssh" "${home}/.gnupg" "${home}/.aws" "${home}/.kube" 2>/dev/null`,
        '# 确认这些目录不在 Guard 工作区或链接目录之下',
      ],
      macos: [
        `ls -ld "${home}/.ssh" "${home}/.gnupg" "${home}/.aws" "${home}/.kube" 2>/dev/null`,
        `ls -ld "${home}/Library/Application Support/Google/Chrome" 2>/dev/null`,
        '# 确认敏感目录和浏览器数据不在 Guard 工作区或链接目录之下',
      ],
      windows: [
        'dir "%USERPROFILE%\\.ssh" "%USERPROFILE%\\.aws" "%USERPROFILE%\\.kube"',
        'dir "%USERPROFILE%\\AppData\\Local\\Google\\Chrome\\User Data"',
        ':: 确认这些目录没有被作为工作区暴露给 Guard',
      ],
    },
  };
}

function createDedicatedAccountStep(): HardenStep {
  return {
    title: '为长期运行准备独立低权限账户（高级）',
    description: '如果你计划把 Guard 长时间放在后台运行，或者机器会被多人共用，可以额外准备一个独立低权限账户。',
    optional: true,
    commands: {
      linux: [
        'sudo adduser --disabled-password --gecos "OpenClaw Guard" openclaw-agent',
        'sudo -u openclaw-agent mkdir -p /home/openclaw-agent',
      ],
      macos: [
        'sudo dscl . -create /Users/openclaw-agent',
        'sudo dscl . -create /Users/openclaw-agent UserShell /bin/bash',
        'sudo dscl . -create /Users/openclaw-agent NFSHomeDirectory /Users/openclaw-agent',
        'sudo mkdir -p /Users/openclaw-agent',
      ],
      windows: [
        'net user openclaw-agent * /add',
        ':: 不要把此账号加入 Administrators 组',
      ],
    },
  };
}

function createGitCredentialStep(): HardenStep {
  return {
    title: '为 Git 同步准备最小权限凭证（高级）',
    description: '如果要启用 Git Sync，建议使用 deploy key 或最小权限 token，不要直接复用个人主账号凭证。',
    optional: true,
    commands: {
      linux: [
        'ssh-keygen -t ed25519 -C "openclaw-guard" -f ~/.ssh/openclaw_guard_ed25519 -N ""',
        'cat ~/.ssh/openclaw_guard_ed25519.pub',
        '# 将公钥添加到目标仓库的 deploy key（只读或最小写入权限）',
      ],
      macos: [
        'ssh-keygen -t ed25519 -C "openclaw-guard" -f ~/.ssh/openclaw_guard_ed25519 -N ""',
        'cat ~/.ssh/openclaw_guard_ed25519.pub',
        '# 将公钥添加到目标仓库的 deploy key（只读或最小写入权限）',
      ],
      windows: [
        'ssh-keygen -t ed25519 -C openclaw-guard -f "%USERPROFILE%\\.ssh\\openclaw_guard_ed25519" -N ""',
        'type "%USERPROFILE%\\.ssh\\openclaw_guard_ed25519.pub"',
        ':: 将公钥添加到目标仓库的 deploy key（只读或最小写入权限）',
      ],
    },
  };
}

function createSandboxStep(): HardenStep {
  return {
    title: '使用容器或沙箱隔离（高级）',
    description: '当你需要更强的主机隔离时，再进入容器、虚拟机或系统沙箱。这一步是增强项，不是所有用户的基础门槛。',
    optional: true,
    commands: {
      linux: [
        'docker run -it --rm \\',
        '  -v /path/to/projects:/workspace \\',
        '  -e OPENCLAW_STATE_DIR=/workspace/.openclaw \\',
        '  --user 1001:1001 \\',
        '  node:22-slim bash',
      ],
      macos: [
        'docker run -it --rm \\',
        '  -v /path/to/projects:/workspace \\',
        '  -e OPENCLAW_STATE_DIR=/workspace/.openclaw \\',
        '  --user 1001:1001 \\',
        '  node:22-slim bash',
      ],
      windows: [
        'docker run -it --rm ^',
        '  -v C:\\path\\to\\projects:/workspace ^',
        '  -e OPENCLAW_STATE_DIR=/workspace/.openclaw ^',
        '  --user 1001:1001 ^',
        '  node:22-slim cmd',
        ':: 也可以考虑 Windows Sandbox 或独立开发虚拟机',
      ],
    },
  };
}

export function getAllHardenSteps(): HardenStep[] {
  return [
    createBaselineAccountStep(),
    createWorkspaceBoundaryStep(),
    createSecretsBoundaryStep(),
    createDedicatedAccountStep(),
    createGitCredentialStep(),
    createSandboxStep(),
  ];
}

export function generateHardenScript(platform?: Platform): string {
  const resolvedPlatform = platform || detectPlatform();
  const steps = getAllHardenSteps();
  const comment = resolvedPlatform === 'windows' ? '::' : '#';
  const lines: string[] = [];

  lines.push(resolvedPlatform === 'windows' ? '@echo off' : '#!/usr/bin/env bash');
  lines.push(`${comment} OpenClaw Guard - Host Hardening Guide`);
  lines.push(`${comment} Platform: ${resolvedPlatform}`);
  lines.push(`${comment} Generated: ${new Date().toISOString()}`);
  lines.push(`${comment} Review every command before running it on your machine.`);
  lines.push('');

  steps.forEach((step) => {
    lines.push(`${comment} ========================================`);
    lines.push(`${comment} ${step.title}${step.optional ? ' (Optional)' : ''}`);
    lines.push(`${comment} ${step.description}`);
    lines.push(`${comment} ========================================`);
    step.commands[resolvedPlatform].forEach((command) => lines.push(command));
    lines.push('');
  });

  return lines.join('\n');
}
