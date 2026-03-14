import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { getAuthStatus, initAuth, isAuthEnabled, type AuthStatusInfo } from './auth.js';
import { ensureDir } from './guard-state.js';
import {
  detectOpenClaw,
  getOpenClawManagedBinDir,
  resolveManagedPrefix,
  runOpenClawTask,
  type OpenClawStatus,
} from './openclaw.js';
import { detectPlatform, type Platform } from './platform.js';
import {
  getWebBackgroundReport,
  startWebBackgroundService,
  type WebBackgroundReport,
} from './web-background.js';

export type MachineInitStepId =
  | 'detect-platform'
  | 'resolve-managed-prefix'
  | 'validate-node-npm'
  | 'install-guard'
  | 'validate-path'
  | 'install-openclaw'
  | 'start-web';

export type MachineInitStepStatus = 'completed' | 'skipped' | 'failed' | 'dry-run';

export interface MachineInitStepResult {
  id: MachineInitStepId;
  title: string;
  status: MachineInitStepStatus;
  message: string;
  command?: string;
  details?: Record<string, unknown>;
}

export interface MachineInitOptions {
  installOpenClaw?: boolean;
  startWeb?: boolean;
  port?: number;
  managedPrefix?: string;
  dryRun?: boolean;
}

export interface MachineInitResult {
  ok: boolean;
  dryRun: boolean;
  platform: Platform;
  distro: string | null;
  port: number;
  installOpenClaw: boolean;
  startWeb: boolean;
  managedPrefix: string;
  managedBinDir: string;
  guardVersion: string;
  steps: MachineInitStepResult[];
  openclaw: OpenClawStatus;
  webReport: WebBackgroundReport;
  auth: AuthStatusInfo & { initializedNow: boolean };
  nextAction: string | null;
  notes: string[];
}

interface LinuxDistroInfo {
  id: string | null;
  label: string;
  supported: boolean;
  family: 'debian' | 'fedora' | 'arch' | 'unsupported' | 'unknown';
}

interface NodeBootstrapPlan {
  summary: string;
  supported: boolean;
  commands: string[];
  manualHint: string;
}

function getProjectRoot(): string {
  const modulePath = fileURLToPath(import.meta.url);
  return path.resolve(path.dirname(modulePath), '..');
}

function readGuardVersion(): string {
  try {
    const packagePath = path.join(getProjectRoot(), 'package.json');
    const parsed = JSON.parse(fs.readFileSync(packagePath, 'utf-8')) as { version?: string };
    return parsed.version || 'unknown';
  } catch {
    return 'unknown';
  }
}

function runTextCommand(command: string, args: string[]): string | null {
  try {
    const result = spawnSync(command, args, {
      encoding: 'utf-8',
      stdio: 'pipe',
      shell: process.platform === 'win32',
      windowsHide: true,
    });
    if (result.error || result.status !== 0) return null;
    return String(result.stdout || '').trim() || null;
  } catch {
    return null;
  }
}

function detectLinuxDistro(): LinuxDistroInfo {
  if (detectPlatform() !== 'linux') {
    return {
      id: null,
      label: '',
      supported: true,
      family: 'unknown',
    };
  }

  try {
    const filePath = '/etc/os-release';
    if (!fs.existsSync(filePath)) {
      return {
        id: null,
        label: 'unknown-linux',
        supported: false,
        family: 'unknown',
      };
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    const entries = Object.fromEntries(content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const index = line.indexOf('=');
        const key = line.slice(0, index);
        const rawValue = line.slice(index + 1).replace(/^"/, '').replace(/"$/, '');
        return [key, rawValue];
      }));
    const id = String(entries.ID || '').toLowerCase() || null;
    const like = String(entries.ID_LIKE || '').toLowerCase();
    const label = String(entries.PRETTY_NAME || entries.NAME || id || 'linux');

    if (id === 'debian' || id === 'ubuntu' || like.includes('debian')) {
      return { id, label, supported: true, family: 'debian' };
    }
    if (id === 'fedora' || id === 'rhel' || id === 'centos' || like.includes('fedora') || like.includes('rhel')) {
      return { id, label, supported: true, family: 'fedora' };
    }
    if (id === 'arch' || like.includes('arch')) {
      return { id, label, supported: true, family: 'arch' };
    }
    return { id, label, supported: false, family: 'unsupported' };
  } catch {
    return {
      id: null,
      label: 'unknown-linux',
      supported: false,
      family: 'unknown',
    };
  }
}

function getNodeBootstrapPlan(platform: Platform, distro: LinuxDistroInfo): NodeBootstrapPlan {
  if (platform === 'windows') {
    return {
      summary: 'Windows: winget -> choco -> Node.js LTS MSI',
      supported: true,
      commands: [
        'winget install OpenJS.NodeJS.LTS',
        'choco install nodejs-lts -y',
        'msiexec /i node-v<lts>-x64.msi /qn',
      ],
      manualHint: '如果 winget 和 choco 都不可用，请手动安装 Node.js LTS MSI，然后重新运行安装脚本。',
    };
  }
  if (platform === 'macos') {
    return {
      summary: 'macOS: brew -> install Homebrew -> brew install node',
      supported: true,
      commands: [
        'brew install node',
        '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
      ],
      manualHint: '如果 Homebrew 不可用，请先安装 Homebrew，再执行 brew install node。',
    };
  }
  if (distro.family === 'debian') {
    return {
      summary: `${distro.label}: apt-get install nodejs npm`,
      supported: true,
      commands: [
        'sudo apt-get update',
        'sudo apt-get install -y nodejs npm',
      ],
      manualHint: '如果系统源里的 Node 版本过旧，可改用官方 NodeSource 源安装 Node LTS。',
    };
  }
  if (distro.family === 'fedora') {
    return {
      summary: `${distro.label}: dnf install nodejs npm`,
      supported: true,
      commands: [
        'sudo dnf install -y nodejs npm',
      ],
      manualHint: '如果 dnf 源未提供 npm，请先启用标准仓库或手动安装 Node.js LTS。',
    };
  }
  if (distro.family === 'arch') {
    return {
      summary: `${distro.label}: pacman -S nodejs npm`,
      supported: true,
      commands: [
        'sudo pacman -Sy --noconfirm nodejs npm',
      ],
      manualHint: '如果 pacman 不可用，请手动安装 Node.js LTS 后重新运行。',
    };
  }
  return {
    summary: `${distro.label}: unsupported auto bootstrap`,
    supported: false,
    commands: [],
    manualHint: '当前 Linux 发行版不在自动安装支持矩阵内，请先手动安装 Node.js 与 npm，然后重新运行。',
  };
}

function pathContains(dirPath: string): boolean {
  const currentPath = process.env.PATH || '';
  const separator = detectPlatform() === 'windows' ? ';' : ':';
  const normalize = detectPlatform() === 'windows'
    ? (value: string) => path.resolve(value).toLowerCase()
    : (value: string) => path.resolve(value);
  return currentPath
    .split(separator)
    .filter(Boolean)
    .some((item) => normalize(item) === normalize(dirPath));
}

function prependPath(dirPath: string): void {
  if (!dirPath || pathContains(dirPath)) return;
  const separator = detectPlatform() === 'windows' ? ';' : ':';
  process.env.PATH = process.env.PATH ? `${dirPath}${separator}${process.env.PATH}` : dirPath;
}

function createStep(
  id: MachineInitStepId,
  title: string,
  status: MachineInitStepStatus,
  message: string,
  extras: Partial<MachineInitStepResult> = {},
): MachineInitStepResult {
  return {
    id,
    title,
    status,
    message,
    ...extras,
  };
}

function buildNotes(result: MachineInitResult): string[] {
  const notes: string[] = [];
  if (!result.openclaw.installed) {
    notes.push('当前还没有可复用的 OpenClaw CLI。');
  }
  if (result.webReport.running) {
    notes.push(`Guard Web 地址: ${result.webReport.workbenchUrl}`);
  } else if (result.startWeb) {
    notes.push(`Guard Web 尚未运行，请检查日志文件: ${result.webReport.logPaths.stdout}`);
  }
  if (result.auth.enabled) {
    if (result.auth.initializedNow) {
      notes.push(`首次登录密码已生成，可在本机执行 ${result.auth.revealCommand} 再次查看。`);
    } else if (result.auth.initialPasswordAvailable) {
      notes.push(`如果忘记初始化密码，可在本机执行 ${result.auth.revealCommand} 再次查看。`);
    } else if (result.auth.configured) {
      notes.push('如果你已经修改过登录密码，请使用当前密码登录；初始化密码不会通过网页直接显示。');
    }
  }
  return notes;
}

export async function runMachineInit(options: MachineInitOptions = {}): Promise<MachineInitResult> {
  const port = Number(options.port || 18088);
  const dryRun = options.dryRun === true;
  const installOpenClaw = options.installOpenClaw === true;
  const startWeb = options.startWeb === true;
  const shouldPrepareAuth = startWeb && !dryRun && isAuthEnabled();
  const platform = detectPlatform();
  const distro = detectLinuxDistro();
  const bootstrapPlan = getNodeBootstrapPlan(platform, distro);
  const managedPrefix = resolveManagedPrefix(options.managedPrefix);
  const managedBinDir = getOpenClawManagedBinDir(managedPrefix);
  const guardVersion = readGuardVersion();
  let authInitializedNow = false;
  let auth = {
    ...getAuthStatus(),
    initializedNow: authInitializedNow,
  };
  const steps: MachineInitStepResult[] = [];

  steps.push(createStep(
    'detect-platform',
    '检测平台',
    'completed',
    platform === 'linux' && distro.label ? `${platform} / ${distro.label}` : platform,
    {
      details: {
        bootstrapPlan,
      },
    },
  ));

  if (!dryRun) {
    ensureDir(managedPrefix);
    ensureDir(managedBinDir);
  }
  steps.push(createStep(
    'resolve-managed-prefix',
    '解析托管前缀',
    dryRun ? 'dry-run' : 'completed',
    `Guard 将使用 ${managedPrefix} 作为用户级托管前缀。`,
    {
      details: {
        managedPrefix,
        managedBinDir,
      },
    },
  ));

  const npmVersion = runTextCommand('npm', ['--version']);
  if (!npmVersion) {
    steps.push(createStep(
      'validate-node-npm',
      '校验 Node / npm',
      'failed',
      bootstrapPlan.manualHint,
      {
        details: {
          nodeVersion: process.version,
          bootstrapPlan,
        },
      },
    ));
    steps.push(createStep('install-guard', '安装或更新 Guard', 'skipped', '由于 npm 不可用，后续步骤已停止。'));
    steps.push(createStep('validate-path', '校验 PATH', 'skipped', '由于 npm 不可用，未继续处理 PATH。'));
    steps.push(createStep('install-openclaw', '安装或修复 OpenClaw', 'skipped', '由于 npm 不可用，未继续执行。'));
    steps.push(createStep('start-web', '启动 Guard Web', 'skipped', '由于 npm 不可用，未继续执行。'));
    const openclaw = detectOpenClaw({ managedPrefix, bypassCache: true });
    const webReport = getWebBackgroundReport(port);
    const result: MachineInitResult = {
      ok: false,
      dryRun,
      platform,
      distro: distro.label || null,
      port,
      installOpenClaw,
      startWeb,
      managedPrefix,
      managedBinDir,
      guardVersion,
      steps,
      openclaw,
      webReport,
      auth,
      nextAction: bootstrapPlan.manualHint,
      notes: [],
    };
    result.notes = buildNotes(result);
    return result;
  }

  steps.push(createStep(
    'validate-node-npm',
    '校验 Node / npm',
    'completed',
    `Node ${process.version} / npm ${npmVersion}`,
    {
      details: {
        nodeVersion: process.version,
        npmVersion,
        bootstrapPlan,
      },
    },
  ));

  steps.push(createStep(
    'install-guard',
    '安装或更新 Guard',
    dryRun ? 'dry-run' : 'completed',
    dryRun
      ? `已预留 Guard 安装步骤，当前包版本 ${guardVersion}。`
      : `当前进程已在运行 openclaw-guard ${guardVersion}，外部安装脚本可在调用 init-machine 前完成 npm 安装。`,
    {
      command: 'npm install -g @qingmiao-tech/openclaw-guard@<version>',
    },
  ));

  const pathWasPresent = pathContains(managedBinDir);
  if (!dryRun) {
    prependPath(managedBinDir);
  }
  steps.push(createStep(
    'validate-path',
    '校验 PATH',
    dryRun ? 'dry-run' : 'completed',
    pathWasPresent
      ? `${managedBinDir} 已存在于当前进程 PATH。`
      : `${managedBinDir}${dryRun ? ' 将被加入' : ' 已加入'}当前进程 PATH。`,
    {
      details: {
        managedBinDir,
        alreadyPresent: pathWasPresent,
      },
    },
  ));

  let openclaw = detectOpenClaw({ managedPrefix, bypassCache: true });
  if (!installOpenClaw) {
    steps.push(createStep(
      'install-openclaw',
      '安装或修复 OpenClaw',
      'skipped',
      '未指定 --install-openclaw，本轮只做环境校验。',
    ));
  } else if (openclaw.installed) {
    steps.push(createStep(
      'install-openclaw',
      '安装或修复 OpenClaw',
      'completed',
      openclaw.detectedSource === 'managed-prefix'
        ? `已检测到 Guard 托管的 OpenClaw${openclaw.version ? ` ${openclaw.version}` : ''}。`
        : `已复用现有 OpenClaw 安装${openclaw.version ? ` ${openclaw.version}` : ''}，来源 ${openclaw.detectedSource}。`,
      {
        details: {
          detectedSource: openclaw.detectedSource,
          binPath: openclaw.binPath,
        },
      },
    ));
  } else if (dryRun) {
    steps.push(createStep(
      'install-openclaw',
      '安装或修复 OpenClaw',
      'dry-run',
      '当前未检测到 OpenClaw，预演阶段不会写入系统。',
      {
        command: openclaw.installCommand,
        details: {
          managedPrefix,
          installTargetBinaryPath: openclaw.installTargetBinaryPath,
        },
      },
    ));
  } else {
    const task = runOpenClawTask('install', { managedPrefix });
    openclaw = detectOpenClaw({ managedPrefix, bypassCache: true });
    steps.push(createStep(
      'install-openclaw',
      '安装或修复 OpenClaw',
      task.phase === 'completed' ? 'completed' : 'failed',
      task.message || 'OpenClaw 安装任务已完成。',
      {
        command: openclaw.installCommand,
        details: {
          logTail: task.logTail,
          error: task.error,
          detectedSource: openclaw.detectedSource,
          binPath: openclaw.binPath,
        },
      },
    ));
  }

  if (shouldPrepareAuth) {
    authInitializedNow = initAuth().isNew;
    auth = {
      ...getAuthStatus(),
      initializedNow: authInitializedNow,
    };
  }

  let webReport = getWebBackgroundReport(port);
  if (!startWeb) {
    steps.push(createStep(
      'start-web',
      '启动 Guard Web',
      'skipped',
      '未指定 --start-web，本轮不自动启动 Guard Web。',
    ));
  } else if (dryRun) {
    steps.push(createStep(
      'start-web',
      '启动 Guard Web',
      'dry-run',
      `预演完成后将尝试在端口 ${port} 启动 Guard Web。`,
      {
        details: {
          primaryUrl: webReport.primaryUrl,
          workbenchUrl: webReport.workbenchUrl,
        },
      },
    ));
  } else {
    const started = await startWebBackgroundService({ port });
    webReport = getWebBackgroundReport(port);
    steps.push(createStep(
      'start-web',
      '启动 Guard Web',
      started.success ? 'completed' : 'failed',
      started.message,
      {
        details: {
          report: webReport,
        },
      },
    ));
  }

  openclaw = detectOpenClaw({ managedPrefix, bypassCache: true });
  webReport = getWebBackgroundReport(port);
  const result: MachineInitResult = {
    ok: steps.every((step) => step.status !== 'failed'),
    dryRun,
    platform,
    distro: distro.label || null,
    port,
    installOpenClaw,
    startWeb,
    managedPrefix,
    managedBinDir,
    guardVersion,
    steps,
    openclaw,
    webReport,
    auth,
    nextAction: webReport.nextAction,
    notes: [],
  };
  result.notes = buildNotes(result);
  return result;
}

export function formatMachineInitResult(result: MachineInitResult): string {
  const lines = [
    `[INFO] Platform: ${result.platform}${result.distro ? ` (${result.distro})` : ''}`,
    `[INFO] Guard version: ${result.guardVersion}`,
    `[INFO] Managed prefix: ${result.managedPrefix}`,
    `[INFO] Managed bin dir: ${result.managedBinDir}`,
    `[INFO] Port: ${result.port}`,
  ];

  for (const step of result.steps) {
    const badge = step.status === 'completed'
      ? 'OK'
      : step.status === 'dry-run'
        ? 'DRY'
        : step.status === 'skipped'
          ? 'SKIP'
          : 'ERR';
    lines.push(`[${badge}] ${step.title}: ${step.message}`);
    if (step.command) {
      lines.push(`       command: ${step.command}`);
    }
  }

  lines.push(`[INFO] OpenClaw source: ${result.openclaw.detectedSource}`);
  lines.push(`[INFO] OpenClaw binary: ${result.openclaw.binPath || '-'}`);
  lines.push(`[INFO] Guard Web URL: ${result.webReport.workbenchUrl}`);
  lines.push(`[INFO] Auth enabled: ${result.auth.enabled ? 'yes' : 'no'}`);
  if (result.auth.enabled) {
    lines.push(`[INFO] Auth configured: ${result.auth.configured ? 'yes' : 'no'}`);
    lines.push(`[INFO] Initial password available: ${result.auth.initialPasswordAvailable ? 'yes' : 'no'}`);
    lines.push(`[INFO] Reveal command: ${result.auth.revealCommand}`);
  }
  lines.push(`[INFO] Next action: ${result.nextAction || '-'}`);
  if (result.notes.length) {
    for (const note of result.notes) {
      lines.push(`[INFO] Note: ${note}`);
    }
  }
  return lines.join('\n');
}
