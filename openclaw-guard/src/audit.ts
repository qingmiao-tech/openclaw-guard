import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import {
  detectPlatform,
  getCurrentUser,
  getHomeDir,
  getOpenClawDir,
  getSensitivePaths,
  type Platform,
} from './platform.js';

export interface AuditResult {
  category: string;
  item: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  fix?: string;
}

const DEDICATED_USER = 'openclaw-agent';
const HIGH_RISK_TOOL_GROUPS = ['group:runtime', 'group:ui', 'group:automation'];

function quotePath(targetPath: string) {
  return `"${targetPath}"`;
}

function commandExists(command: string) {
  try {
    execSync(command, { stdio: 'pipe', windowsHide: true });
    return true;
  } catch {
    return false;
  }
}

function collectRuntimeUserAudit(platform: Platform): AuditResult[] {
  const currentUser = getCurrentUser();
  const isPrivileged = currentUser === 'root' || /^administrator$/i.test(currentUser);
  const results: AuditResult[] = [];

  results.push({
    category: '用户隔离',
    item: '当前运行账号',
    status: isPrivileged ? 'fail' : 'pass',
    message: isPrivileged
      ? `当前正在以 ${currentUser} 运行 Guard，越权风险较高。`
      : `当前运行账号为 ${currentUser}，符合“非 root / 非 Administrator”基线。`,
    fix: isPrivileged
      ? (platform === 'windows'
        ? '请改用普通本地账户启动 Guard；若计划长期后台运行，再额外创建独立低权限账户。'
        : '请改用普通用户启动 Guard；若计划长期托管，再额外创建独立低权限账户。')
      : undefined,
  });

  const dedicatedUserExists = platform === 'windows'
    ? commandExists(`net user ${DEDICATED_USER}`)
    : commandExists(`id ${DEDICATED_USER}`);

  results.push({
    category: '用户隔离',
    item: '独立低权限账户（高级）',
    status: dedicatedUserExists ? 'pass' : 'warn',
    message: dedicatedUserExists
      ? `已检测到 ${DEDICATED_USER}，适合长期后台运行或共享机器场景。`
      : (platform === 'windows'
        ? '尚未检测到独立低权限账户。对单人机器这不是基础阻塞项，但若要长期后台运行或多人共用设备，建议补齐。'
        : '尚未检测到独立低权限账户。对日常单机开发这不是基础阻塞项，但若要长期托管或共享机器，建议补齐。'),
    fix: dedicatedUserExists
      ? undefined
      : (platform === 'windows'
        ? `net user ${DEDICATED_USER} * /add`
        : `sudo adduser ${DEDICATED_USER}`),
  });

  return results;
}

function collectSensitivePathAudit(platform: Platform): AuditResult[] {
  const sensitivePaths = getSensitivePaths(platform).filter((targetPath) => fs.existsSync(targetPath));
  if (!sensitivePaths.length) {
    return [{
      category: '文件权限',
      item: '常见敏感目录',
      status: 'pass',
      message: '当前未发现常见敏感目录，或这些目录尚未在当前账号下创建。',
    }];
  }

  if (platform === 'windows') {
    const preview = sensitivePaths.slice(0, 4).map((targetPath) => path.basename(targetPath)).join('、');
    return [{
      category: '文件权限',
      item: '敏感目录 ACL（Windows）',
      status: 'warn',
      message: `检测到 ${sensitivePaths.length} 处常见敏感目录（例如 ${preview}）。当前不会自动解析 Windows ACL，请确认 Guard 运行账号对这些目录没有读取权限。`,
      fix: '优先确保当前 Guard 不是以 Administrator 运行；如需长期后台运行，再为独立低权限账户显式收紧 ACL。',
    }];
  }

  return sensitivePaths.map((targetPath) => {
    try {
      const stat = fs.statSync(targetPath);
      const mode = stat.mode & 0o777;
      const groupOrOtherBits = mode & 0o077;
      return {
        category: '文件权限',
        item: targetPath,
        status: groupOrOtherBits ? 'warn' : 'pass',
        message: groupOrOtherBits
          ? `权限偏宽 (${mode.toString(8)})，组用户或其他用户仍可能访问该路径。`
          : `权限正常 (${mode.toString(8)})。`,
        fix: groupOrOtherBits ? `chmod 700 ${quotePath(targetPath)}` : undefined,
      } satisfies AuditResult;
    } catch {
      return {
        category: '文件权限',
        item: targetPath,
        status: 'warn',
        message: '当前无法可靠读取该路径权限，请手动确认它没有暴露给其他账号。',
      } satisfies AuditResult;
    }
  });
}

function collectEnvAudit(platform: Platform): AuditResult[] {
  const results: AuditResult[] = [];
  const envLocations = [
    path.join(getHomeDir(), '.env'),
    path.resolve(process.cwd(), '.env'),
  ].filter((targetPath, index, list) => list.indexOf(targetPath) === index);

  const existingEnvFiles = envLocations.filter((targetPath) => fs.existsSync(targetPath));
  if (!existingEnvFiles.length) {
    results.push({
      category: '凭证安全',
      item: '.env 文件',
      status: 'pass',
      message: '当前未发现常见 .env 文件。',
    });
  } else {
    existingEnvFiles.forEach((envPath) => {
      if (platform === 'windows') {
        results.push({
          category: '凭证安全',
          item: envPath,
          status: 'warn',
          message: '已发现 .env 文件。当前不会自动解析 Windows ACL，请确认只有当前用户或受控账号可读。',
          fix: '确认仓库已忽略 .env，并在需要时用“属性 -> 安全”或 icacls 收紧权限。',
        });
        return;
      }

      try {
        const mode = fs.statSync(envPath).mode & 0o777;
        const groupOrOtherBits = mode & 0o077;
        results.push({
          category: '凭证安全',
          item: envPath,
          status: groupOrOtherBits ? 'warn' : 'pass',
          message: groupOrOtherBits
            ? `.env 文件权限偏宽 (${mode.toString(8)})。`
            : '.env 文件权限正常。',
          fix: groupOrOtherBits ? `chmod 600 ${quotePath(envPath)}` : undefined,
        });
      } catch {
        results.push({
          category: '凭证安全',
          item: envPath,
          status: 'warn',
          message: '无法读取 .env 权限信息，请手动检查访问范围。',
        });
      }
    });
  }

  const gitignorePath = path.resolve(process.cwd(), '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    results.push({
      category: '凭证安全',
      item: '.gitignore',
      status: existingEnvFiles.length ? 'warn' : 'pass',
      message: existingEnvFiles.length
        ? '当前目录存在 .env 文件，但未检测到 .gitignore，请确认不会误提交凭证。'
        : '当前目录未检测到 .gitignore，也未发现常见 .env 文件。',
      fix: existingEnvFiles.length ? '建议在 .gitignore 中加入 .env' : undefined,
    });
    return results;
  }

  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
  const ignoresEnv = /(^|[\r\n])\.env($|[\r\n])/.test(gitignoreContent) || /(^|[\r\n])\.env\.\*($|[\r\n])/.test(gitignoreContent);
  results.push({
    category: '凭证安全',
    item: '.gitignore',
    status: ignoresEnv ? 'pass' : 'fail',
    message: ignoresEnv
      ? '.gitignore 已覆盖 .env，凭证误提交风险较低。'
      : '.gitignore 未覆盖 .env，存在凭证误提交风险。',
    fix: ignoresEnv ? undefined : '请在 .gitignore 中加入 .env',
  });

  return results;
}

function collectOpenClawConfigAudit(): AuditResult[] {
  const configCandidates = [
    path.resolve(process.cwd(), 'openclaw.json'),
    path.join(getOpenClawDir(), 'openclaw.json'),
  ].filter((targetPath, index, list) => list.indexOf(targetPath) === index);

  const configPath = configCandidates.find((candidate) => fs.existsSync(candidate));
  if (!configPath) {
    return [{
      category: 'OpenClaw 配置',
      item: 'openclaw.json',
      status: 'warn',
      message: '未找到 openclaw.json，无法确认工具权限边界。',
      fix: '请先生成 openclaw.json，再根据你的使用场景配置 tools.allow / tools.deny。',
    }];
  }

  try {
    const raw = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(raw) as {
      tools?: {
        allow?: unknown;
        deny?: unknown;
      };
    };

    const allow = Array.isArray(config.tools?.allow) ? config.tools?.allow.map(String) : [];
    const deny = Array.isArray(config.tools?.deny) ? config.tools?.deny.map(String) : [];

    const results: AuditResult[] = [{
      category: 'OpenClaw 配置',
      item: '工具权限基线',
      status: allow.length || deny.length ? 'pass' : 'warn',
      message: allow.length || deny.length
        ? `已检测到 tools.allow (${allow.length}) / tools.deny (${deny.length}) 规则。`
        : '当前没有显式的 tools.allow / tools.deny 规则，工具边界不够清晰。',
      fix: allow.length || deny.length ? undefined : '建议先套用一个权限模式，再按需要微调 openclaw.json。',
    }];

    const enabledHighRiskGroups = HIGH_RISK_TOOL_GROUPS.filter((group) => allow.includes(group));
    results.push({
      category: 'OpenClaw 配置',
      item: '高风险工具组',
      status: enabledHighRiskGroups.length ? 'warn' : 'pass',
      message: enabledHighRiskGroups.length
        ? `已放开 ${enabledHighRiskGroups.join('、')}。这适合受控场景，但不建议作为默认长期配置。`
        : '未发现 runtime / ui / automation 这些高风险工具组被显式放开。',
      fix: enabledHighRiskGroups.length
        ? '若当前并不需要执行命令、浏览器自动化或自动任务，请回退到更严格的权限模式。'
        : undefined,
    });

    const hasHardcodedKey = [
      /sk-[a-zA-Z0-9]{20,}/,
      /key-[a-zA-Z0-9]{20,}/,
      /Bearer\s+[A-Za-z0-9._-]{20,}/,
    ].some((pattern) => pattern.test(raw));

    results.push({
      category: 'OpenClaw 配置',
      item: '硬编码凭证',
      status: hasHardcodedKey ? 'fail' : 'pass',
      message: hasHardcodedKey
        ? '检测到疑似硬编码凭证，请尽快迁移到环境变量或受控凭证文件。'
        : '未发现明显的硬编码凭证痕迹。',
      fix: hasHardcodedKey ? '请把 API Key / Token 移出 openclaw.json，改用环境变量注入。' : undefined,
    });

    return results;
  } catch {
    return [{
      category: 'OpenClaw 配置',
      item: 'openclaw.json',
      status: 'warn',
      message: '配置文件解析失败，无法确认当前工具权限与凭证风险。',
      fix: '请检查 openclaw.json 是否为有效 JSON。',
    }];
  }
}

export function runFullAudit(): AuditResult[] {
  const platform = detectPlatform();
  return [
    ...collectRuntimeUserAudit(platform),
    ...collectSensitivePathAudit(platform),
    ...collectEnvAudit(platform),
    ...collectOpenClawConfigAudit(),
  ];
}
