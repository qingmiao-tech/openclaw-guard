import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { detectPlatform, getSensitivePaths, getHomeDir, getCurrentUser, type Platform } from './platform.js';

export interface AuditResult {
  category: string;
  item: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  fix?: string;
}

function auditSensitivePaths(platform: Platform): AuditResult[] {
  const results: AuditResult[] = [];
  const paths = getSensitivePaths(platform);

  for (const targetPath of paths) {
    if (!fs.existsSync(targetPath)) continue;

    try {
      const stat = fs.statSync(targetPath);
      if (platform !== 'windows') {
        const mode = stat.mode & 0o777;
        const groupRead = mode & 0o040;
        const otherRead = mode & 0o004;

        if (groupRead || otherRead) {
          results.push({
            category: '文件权限',
            item: targetPath,
            status: 'warn',
            message: `权限过宽 (${mode.toString(8)})，其他用户仍可读取。`,
            fix: `chmod 700 "${targetPath}"`,
          });
        } else {
          results.push({
            category: '文件权限',
            item: targetPath,
            status: 'pass',
            message: `权限正常 (${mode.toString(8)})。`,
          });
        }
      } else {
        results.push({
          category: '文件权限',
          item: targetPath,
          status: 'warn',
          message: '敏感目录存在，请确认 openclaw-agent 用户没有读取权限。',
          fix: `icacls "${targetPath}" /deny openclaw-agent:(OI)(CI)(R)`,
        });
      }
    } catch {
      results.push({
        category: '文件权限',
        item: targetPath,
        status: 'pass',
        message: '当前无法访问该路径，通常说明权限已经被额外限制。',
      });
    }
  }

  return results;
}

function auditDedicatedUser(platform: Platform): AuditResult[] {
  const results: AuditResult[] = [];
  const currentUser = getCurrentUser();

  if (currentUser === 'root' || currentUser === 'Administrator') {
    results.push({
      category: '用户隔离',
      item: '运行用户',
      status: 'fail',
      message: `当前正在以 ${currentUser} 身份运行，风险较高。`,
      fix: platform === 'windows'
        ? 'net user openclaw-agent 密码 /add'
        : 'sudo adduser openclaw-agent',
    });
  } else {
    results.push({
      category: '用户隔离',
      item: '运行用户',
      status: 'pass',
      message: `当前运行用户为 ${currentUser}，不是 root / Administrator。`,
    });
  }

  try {
    if (platform === 'windows') {
      execSync('net user openclaw-agent', { stdio: 'pipe', windowsHide: true });
    } else {
      execSync('id openclaw-agent', { stdio: 'pipe', windowsHide: true });
    }

    results.push({
      category: '用户隔离',
      item: '专用用户',
      status: 'pass',
      message: '已检测到 openclaw-agent 专用用户。',
    });
  } catch {
    results.push({
      category: '用户隔离',
      item: '专用用户',
      status: 'warn',
      message: '尚未检测到 openclaw-agent 专用用户。',
      fix: platform === 'windows'
        ? 'net user openclaw-agent 密码 /add'
        : 'sudo adduser openclaw-agent',
    });
  }

  return results;
}

function auditEnvFiles(): AuditResult[] {
  const results: AuditResult[] = [];
  const home = getHomeDir();
  const envLocations = [
    path.join(home, '.env'),
    '.env',
  ];

  for (const envPath of envLocations) {
    if (!fs.existsSync(envPath)) continue;

    try {
      const stat = fs.statSync(envPath);
      const mode = stat.mode & 0o777;
      if (mode & 0o044) {
        results.push({
          category: '凭证安全',
          item: envPath,
          status: 'warn',
          message: '.env 文件仍对其他用户可读。',
          fix: `chmod 600 "${envPath}"`,
        });
      } else {
        results.push({
          category: '凭证安全',
          item: envPath,
          status: 'pass',
          message: '.env 文件权限正常。',
        });
      }
    } catch {
      // ignore invalid stat failure
    }
  }

  if (fs.existsSync('.gitignore')) {
    const gitignore = fs.readFileSync('.gitignore', 'utf-8');
    if (!gitignore.includes('.env')) {
      results.push({
        category: '凭证安全',
        item: '.gitignore',
        status: 'fail',
        message: '.gitignore 中未包含 .env，存在凭证误提交风险。',
        fix: '在 .gitignore 中添加 .env',
      });
    }
  }

  return results;
}

function auditOpenClawConfig(): AuditResult[] {
  const results: AuditResult[] = [];
  const possiblePaths = [
    'openclaw.json',
    path.join(getHomeDir(), '.openclaw', 'openclaw.json'),
  ];

  let configPath: string | null = null;
  for (const candidate of possiblePaths) {
    if (fs.existsSync(candidate)) {
      configPath = candidate;
      break;
    }
  }

  if (!configPath) {
    results.push({
      category: 'OpenClaw 配置',
      item: 'openclaw.json',
      status: 'warn',
      message: '未找到 openclaw.json 配置文件。',
    });
    return results;
  }

  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    if (!config.tools?.deny || config.tools.deny.length === 0) {
      results.push({
        category: 'OpenClaw 配置',
        item: '工具权限',
        status: 'warn',
        message: '未配置 tools.deny，Agent 当前拥有过宽的工具权限。',
        fix: '在 openclaw.json 中添加 "tools": { "deny": ["group:runtime"] }',
      });
    } else {
      results.push({
        category: 'OpenClaw 配置',
        item: '工具权限',
        status: 'pass',
        message: `已配置 ${config.tools.deny.length} 条工具拒绝规则。`,
      });
    }

    const configStr = JSON.stringify(config);
    const keyPatterns = [/sk-[a-zA-Z0-9]{20,}/, /key-[a-zA-Z0-9]{20,}/];
    const hasHardcodedKey = keyPatterns.some((pattern) => pattern.test(configStr));

    if (hasHardcodedKey) {
      results.push({
        category: 'OpenClaw 配置',
        item: 'API Key',
        status: 'fail',
        message: '检测到硬编码 API Key，存在泄露风险。',
        fix: '请把 API Key 迁移到环境变量。',
      });
    }
  } catch {
    results.push({
      category: 'OpenClaw 配置',
      item: 'openclaw.json',
      status: 'warn',
      message: '配置文件解析失败。',
    });
  }

  return results;
}

export function runFullAudit(): AuditResult[] {
  const platform = detectPlatform();
  return [
    ...auditDedicatedUser(platform),
    ...auditSensitivePaths(platform),
    ...auditEnvFiles(),
    ...auditOpenClawConfig(),
  ];
}
