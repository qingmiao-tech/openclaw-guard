/**
 * OpenClaw 检测、安装、更新模块
 */
import { execSync, spawn } from 'node:child_process';
import { detectPlatform } from './platform.js';

export interface OpenClawStatus {
  installed: boolean;
  version: string | null;
  latestVersion: string | null;
  updateAvailable: boolean;
  binPath: string | null;
  nodeVersion: string;
  npmVersion: string | null;
}

/** 检测 OpenClaw 安装状态 */
export function detectOpenClaw(): OpenClawStatus {
  const nodeVersion = process.version;
  let npmVersion: string | null = null;
  try {
    npmVersion = execSync('npm --version', { stdio: 'pipe', encoding: 'utf-8' }).trim();
  } catch { /* npm not found */ }

  let installed = false;
  let version: string | null = null;
  let binPath: string | null = null;

  // 检测 openclaw 是否已安装
  try {
    const versionOutput = execSync('openclaw --version', { stdio: 'pipe', encoding: 'utf-8', timeout: 10000 }).trim();
    // 版本输出可能是 "openclaw/1.2.3" 或 "1.2.3" 等格式
    const match = versionOutput.match(/(\d+\.\d+\.\d+[\w.-]*)/);
    if (match) {
      version = match[1];
      installed = true;
    } else if (versionOutput) {
      version = versionOutput;
      installed = true;
    }
  } catch { /* not installed */ }

  // 获取 bin 路径
  if (installed) {
    try {
      const platform = detectPlatform();
      const cmd = platform === 'windows' ? 'where openclaw' : 'which openclaw';
      binPath = execSync(cmd, { stdio: 'pipe', encoding: 'utf-8', timeout: 5000 }).trim().split(/[\r\n]/)[0].trim();
    } catch { /* ignore */ }
  }

  // 查询最新版本
  let latestVersion: string | null = null;
  try {
    const npmInfo = execSync('npm view openclaw version', { stdio: 'pipe', encoding: 'utf-8', timeout: 15000 }).trim();
    if (npmInfo) latestVersion = npmInfo;
  } catch { /* registry unreachable */ }

  const updateAvailable = !!(installed && version && latestVersion && version !== latestVersion);

  return { installed, version, latestVersion, updateAvailable, binPath, nodeVersion, npmVersion };
}

export interface TaskProgress {
  stage: string;
  message: string;
  done: boolean;
  error?: string;
}

/** 执行安装/更新，通过回调报告进度 */
export function installOrUpdateOpenClaw(
  mode: 'install' | 'update',
  onProgress: (p: TaskProgress) => void,
): void {
  const cmd = 'npm';
  const args = ['install', '-g', 'openclaw@latest'];

  onProgress({ stage: mode, message: mode === 'install' ? '正在安装 OpenClaw...' : '正在更新 OpenClaw...', done: false });

  const child = spawn(cmd, args, {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
  });

  let stdout = '';
  let stderr = '';

  child.stdout.on('data', (data: Buffer) => {
    stdout += data.toString();
    onProgress({ stage: mode, message: data.toString().trim(), done: false });
  });

  child.stderr.on('data', (data: Buffer) => {
    stderr += data.toString();
  });

  child.on('close', (code) => {
    if (code === 0) {
      onProgress({ stage: mode, message: mode === 'install' ? '✅ OpenClaw 安装成功' : '✅ OpenClaw 更新成功', done: true });
    } else {
      onProgress({ stage: mode, message: '安装失败', done: true, error: stderr || stdout || 'exit code ' + code });
    }
  });

  child.on('error', (err) => {
    onProgress({ stage: mode, message: '执行失败', done: true, error: err.message });
  });
}

/** 同步执行安装/更新（用于 API） */
export function installOrUpdateSync(mode: 'install' | 'update'): { success: boolean; message: string; output: string } {
  try {
    const output = execSync('npm install -g openclaw@latest', {
      stdio: 'pipe',
      encoding: 'utf-8',
      timeout: 120000,
    });
    // 验证安装结果
    let newVersion = '';
    try {
      newVersion = execSync('openclaw --version', { stdio: 'pipe', encoding: 'utf-8', timeout: 10000 }).trim();
    } catch { /* ignore */ }

    const action = mode === 'install' ? '安装' : '更新';
    return {
      success: true,
      message: `${action}成功${newVersion ? '，当前版本: ' + newVersion : ''}`,
      output: output.trim(),
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      message: `${mode === 'install' ? '安装' : '更新'}失败: ${msg}`,
      output: msg,
    };
  }
}
