import { spawn, spawnSync } from 'node:child_process';
import { detectPlatform } from './platform.js';
import { getPersistentCachedValue, invalidatePersistentCache } from './persistent-cache.js';

export interface OpenClawStatus {
  installed: boolean;
  version: string | null;
  latestVersion: string | null;
  updateAvailable: boolean;
  binPath: string | null;
  nodeVersion: string;
  npmVersion: string | null;
}

export interface TaskProgress {
  stage: string;
  message: string;
  done: boolean;
  error?: string;
}

const OPENCLAW_LOCAL_CACHE_KEY = 'openclaw-status-local-v1';
const OPENCLAW_REGISTRY_CACHE_KEY = 'openclaw-status-registry-v1';

function runTextCommand(command: string, args: string[], timeout = 10_000): string {
  const result = spawnSync(command, args, {
    stdio: 'pipe',
    encoding: 'utf-8',
    timeout,
    shell: process.platform === 'win32',
    windowsHide: true,
  });

  if (result.error || result.status !== 0) {
    throw new Error(result.error?.message || result.stderr || result.stdout || `exit code ${result.status}`);
  }

  return String(result.stdout || '').trim();
}

function detectLocalOpenClawState(): Omit<OpenClawStatus, 'latestVersion' | 'updateAvailable'> {
  const nodeVersion = process.version;
  let npmVersion: string | null = null;
  try {
    npmVersion = runTextCommand('npm', ['--version'], 8_000);
  } catch {
    npmVersion = null;
  }

  let installed = false;
  let version: string | null = null;
  let binPath: string | null = null;

  try {
    const versionOutput = runTextCommand('openclaw', ['--version'], 10_000);
    const match = versionOutput.match(/(\d+\.\d+\.\d+[\w.-]*)/);
    if (match) {
      version = match[1];
      installed = true;
    } else if (versionOutput) {
      version = versionOutput;
      installed = true;
    }
  } catch {
    installed = false;
  }

  if (installed) {
    try {
      const locatorCommand = detectPlatform() === 'windows' ? 'where' : 'which';
      binPath = runTextCommand(locatorCommand, ['openclaw'], 5_000).split(/\r?\n/)[0]?.trim() || null;
    } catch {
      binPath = null;
    }
  }

  return { installed, version, binPath, nodeVersion, npmVersion };
}

function detectLatestOpenClawVersion(): string | null {
  try {
    return runTextCommand('npm', ['view', 'openclaw', 'version'], 4_000) || null;
  } catch {
    return null;
  }
}

export function detectOpenClaw(): OpenClawStatus {
  const local = getPersistentCachedValue(OPENCLAW_LOCAL_CACHE_KEY, {
    ttlMs: 15 * 60 * 1000,
    staleIfErrorMs: 7 * 24 * 60 * 60 * 1000,
    loader: detectLocalOpenClawState,
  });
  const latestVersion = getPersistentCachedValue(OPENCLAW_REGISTRY_CACHE_KEY, {
    ttlMs: 6 * 60 * 60 * 1000,
    staleIfErrorMs: 7 * 24 * 60 * 60 * 1000,
    loader: detectLatestOpenClawVersion,
  });

  return {
    ...local,
    latestVersion,
    updateAvailable: !!(local.installed && local.version && latestVersion && local.version !== latestVersion),
  };
}

export function installOrUpdateOpenClaw(
  mode: 'install' | 'update',
  onProgress: (p: TaskProgress) => void,
): void {
  const child = spawn('npm', ['install', '-g', 'openclaw@latest'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: process.platform === 'win32',
    windowsHide: true,
  });

  onProgress({
    stage: mode,
    message: mode === 'install' ? '正在安装 OpenClaw...' : '正在更新 OpenClaw...',
    done: false,
  });

  let stdout = '';
  let stderr = '';

  child.stdout.on('data', (data: Buffer) => {
    const chunk = data.toString();
    stdout += chunk;
    onProgress({ stage: mode, message: chunk.trim(), done: false });
  });

  child.stderr.on('data', (data: Buffer) => {
    stderr += data.toString();
  });

  child.on('close', (code) => {
    invalidatePersistentCache(OPENCLAW_LOCAL_CACHE_KEY);
    invalidatePersistentCache(OPENCLAW_REGISTRY_CACHE_KEY);
    if (code === 0) {
      onProgress({
        stage: mode,
        message: mode === 'install' ? 'OpenClaw 安装成功。' : 'OpenClaw 更新成功。',
        done: true,
      });
      return;
    }
    onProgress({
      stage: mode,
      message: '安装失败',
      done: true,
      error: stderr || stdout || `exit code ${code}`,
    });
  });

  child.on('error', (err) => {
    onProgress({ stage: mode, message: '执行失败', done: true, error: err.message });
  });
}

export function installOrUpdateSync(mode: 'install' | 'update'): { success: boolean; message: string; output: string } {
  try {
    const output = runTextCommand('npm', ['install', '-g', 'openclaw@latest'], 120_000);
    let newVersion = '';
    try {
      newVersion = runTextCommand('openclaw', ['--version'], 10_000);
    } catch {
      newVersion = '';
    }

    invalidatePersistentCache(OPENCLAW_LOCAL_CACHE_KEY);
    invalidatePersistentCache(OPENCLAW_REGISTRY_CACHE_KEY);

    const action = mode === 'install' ? '安装' : '更新';
    return {
      success: true,
      message: `${action}成功${newVersion ? `，当前版本 ${newVersion}` : ''}`,
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
