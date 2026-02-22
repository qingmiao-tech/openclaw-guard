/**
 * 安全审计模块 - 检查当前系统的安全状态
 */
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

/** 检查敏感目录的权限 */
function auditSensitivePaths(platform: Platform): AuditResult[] {
  const results: AuditResult[] = [];
  const paths = getSensitivePaths(platform);

  for (const p of paths) {
    if (!fs.existsSync(p)) continue;

    try {
      const stat = fs.statSync(p);
      if (platform !== 'windows') {
        // Unix: 检查是否 group/other 可读
        const mode = stat.mode & 0o777;
        const groupRead = mode & 0o040;
        const otherRead = mode & 0o004;

        if (groupRead || otherRead) {
          results.push({
            category: '文件权限',
            item: p,
            status: 'warn',
            message: `权限过宽 (${mode.toString(8)})，其他用户可读取`,
            fix: `chmod 700 "${p}"`,
          });
        } else {
          results.push({
            category: '文件权限',
            item: p,
            status: 'pass',
            message: `权限正常 (${mode.toString(8)})`,
          });
        }
      } else {
        // Windows: 只检查目录是否存在，提示需要手动检查 ACL
        results.push({
          category: '文件权限',
          item: p,
          status: 'warn',
          message: '敏感目录存在，请确认 openclaw-agent 用户无访问权限',
          fix: `icacls "${p}" /deny openclaw-agent:(OI)(CI)(R)`,
        });
      }
    } catch {
      // 无法访问，可能权限已经很严格
      results.push({
        category: '文件权限',
        item: p,
        status: 'pass',
        message: '无法访问（权限已限制）',
      });
    }
  }
  return results;
}

/** 检查是否存在专用用户 */
function auditDedicatedUser(platform: Platform): AuditResult[] {
  const results: AuditResult[] = [];
  const currentUser = getCurrentUser();

  if (currentUser === 'root' || currentUser === 'Administrator') {
    results.push({
      category: '用户隔离',
      item: '运行用户',
      status: 'fail',
      message: `当前以 ${currentUser} 身份运行，风险极高`,
      fix: platform === 'windows'
        ? 'net user openclaw-agent 密码 /add'
        : 'sudo adduser openclaw-agent',
    });
  } else {
    results.push({
      category: '用户隔离',
      item: '运行用户',
      status: 'pass',
      message: `当前用户: ${currentUser}（非 root/Administrator）`,
    });
  }

  // 检查是否存在 openclaw-agent 用户
  try {
    if (platform === 'windows') {
      execSync('net user openclaw-agent', { stdio: 'pipe' });
      results.push({
        category: '用户隔离',
        item: '专用用户',
        status: 'pass',
        message: 'openclaw-agent 用户已创建',
      });
    } else {
      execSync('id openclaw-agent', { stdio: 'pipe' });
      results.push({
        category: '用户隔离',
        item: '专用用户',
        status: 'pass',
        message: 'openclaw-agent 用户已创建',
      });
    }
  } catch {
    results.push({
      category: '用户隔离',
      item: '专用用户',
      status: 'warn',
      message: '未检测到 openclaw-agent 专用用户',
      fix: platform === 'windows'
        ? 'net user openclaw-agent 密码 /add'
        : 'sudo adduser openclaw-agent',
    });
  }

  return results;
}

/** 检查 .env 文件是否在 .gitignore 中 */
function auditEnvFiles(): AuditResult[] {
  const results: AuditResult[] = [];
  const home = getHomeDir();

  // 搜索常见位置的 .env 文件
  const envLocations = [
    path.join(home, '.env'),
    '.env',
  ];

  for (const envPath of envLocations) {
    if (fs.existsSync(envPath)) {
      try {
        const stat = fs.statSync(envPath);
        const mode = stat.mode & 0o777;
        if (mode & 0o044) {
          results.push({
            category: '凭证安全',
            item: envPath,
            status: 'warn',
            message: '.env 文件其他用户可读',
            fix: `chmod 600 "${envPath}"`,
          });
        } else {
          results.push({
            category: '凭证安全',
            item: envPath,
            status: 'pass',
            message: '.env 文件权限正常',
          });
        }
      } catch {
        // ignore
      }
    }
  }

  // 检查 .gitignore 是否包含 .env
  if (fs.existsSync('.gitignore')) {
    const gitignore = fs.readFileSync('.gitignore', 'utf-8');
    if (!gitignore.includes('.env')) {
      results.push({
        category: '凭证安全',
        item: '.gitignore',
        status: 'fail',
        message: '.gitignore 中未包含 .env，可能导致凭证泄露',
        fix: '在 .gitignore 中添加 .env',
      });
    }
  }

  return results;
}

/** 检查 OpenClaw 配置中的权限设置 */
function auditOpenClawConfig(): AuditResult[] {
  const results: AuditResult[] = [];

  // 尝试找到 openclaw.json
  const possiblePaths = [
    'openclaw.json',
    path.join(getHomeDir(), '.openclaw', 'openclaw.json'),
  ];

  let configPath: string | null = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      configPath = p;
      break;
    }
  }

  if (!configPath) {
    results.push({
      category: 'OpenClaw 配置',
      item: 'openclaw.json',
      status: 'warn',
      message: '未找到 openclaw.json 配置文件',
    });
    return results;
  }

  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    // 检查是否配置了 tools.deny
    if (!config.tools?.deny || config.tools.deny.length === 0) {
      results.push({
        category: 'OpenClaw 配置',
        item: '工具权限',
        status: 'warn',
        message: '未配置 tools.deny，Agent 拥有全部工具权限',
        fix: '在 openclaw.json 中添加 "tools": { "deny": ["group:runtime"] }',
      });
    } else {
      results.push({
        category: 'OpenClaw 配置',
        item: '工具权限',
        status: 'pass',
        message: `已配置 ${config.tools.deny.length} 条拒绝规则`,
      });
    }

    // 检查 API Key 是否硬编码
    const configStr = JSON.stringify(config);
    const keyPatterns = [/sk-[a-zA-Z0-9]{20,}/, /key-[a-zA-Z0-9]{20,}/];
    const hasHardcodedKey = keyPatterns.some(p => p.test(configStr));

    if (hasHardcodedKey) {
      results.push({
        category: 'OpenClaw 配置',
        item: 'API Key',
        status: 'fail',
        message: '检测到硬编码的 API Key，存在泄露风险',
        fix: '将 API Key 迁移到环境变量',
      });
    }
  } catch {
    results.push({
      category: 'OpenClaw 配置',
      item: 'openclaw.json',
      status: 'warn',
      message: '配置文件解析失败',
    });
  }

  return results;
}

/** 执行完整安全审计 */
export function runFullAudit(): AuditResult[] {
  const platform = detectPlatform();
  return [
    ...auditDedicatedUser(platform),
    ...auditSensitivePaths(platform),
    ...auditEnvFiles(),
    ...auditOpenClawConfig(),
  ];
}
