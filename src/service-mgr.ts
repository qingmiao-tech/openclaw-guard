import { spawn, spawnSync } from 'node:child_process';
import { detectPlatform } from './platform.js';
import { loadConfig, getNested } from './config.js';
import { getPersistentCachedValue, invalidatePersistentCache } from './persistent-cache.js';

export interface ServiceStatus {
  running: boolean;
  pid: number | null;
  port: number;
}

const SERVICE_STATUS_CACHE_KEY = 'gateway-service-status-v1';

function sleepMs(ms: number) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

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

function invalidateServiceStatusCache(): void {
  invalidatePersistentCache(SERVICE_STATUS_CACHE_KEY);
}

export function getGatewayPort(): number {
  const config = loadConfig();
  const port = getNested(config, ['gateway', 'port']);
  return typeof port === 'number' && port > 0 ? port : 18789;
}

function checkPortListening(port: number): number | null {
  const platform = detectPlatform();
  try {
    if (platform === 'windows') {
      const output = runTextCommand('netstat', ['-ano'], 5_000);
      for (const line of output.split(/\r?\n/)) {
        if (!line.includes(`:${port}`) || !line.includes('LISTENING')) continue;
        const parts = line.trim().split(/\s+/);
        const pid = Number(parts[parts.length - 1]);
        if (Number.isInteger(pid) && pid > 0) return pid;
      }
      return null;
    }

    const output = runTextCommand('lsof', ['-ti', `:${port}`], 5_000);
    const pid = Number(output.split(/\r?\n/)[0]?.trim());
    return Number.isInteger(pid) && pid > 0 ? pid : null;
  } catch {
    return null;
  }
}

function findOpenClawBin(): string | null {
  try {
    const locatorCommand = detectPlatform() === 'windows' ? 'where' : 'which';
    return runTextCommand(locatorCommand, ['openclaw'], 5_000).split(/\r?\n/)[0]?.trim() || null;
  } catch {
    return null;
  }
}

function runOpenClaw(args: string[]): { success: boolean; output: string } {
  const result = spawnSync('openclaw', args, {
    stdio: 'pipe',
    encoding: 'utf-8',
    timeout: 30_000,
    shell: process.platform === 'win32',
    windowsHide: true,
  });
  if (result.error || result.status !== 0) {
    const message = result.error?.message || result.stderr || result.stdout || `exit code ${result.status}`;
    return { success: false, output: String(message).trim() };
  }
  return { success: true, output: String(result.stdout || '').trim() };
}

function computeServiceStatus(): ServiceStatus {
  const port = getGatewayPort();
  const pid = checkPortListening(port);
  return { running: pid !== null, pid, port };
}

export function getServiceStatus(): ServiceStatus {
  return getPersistentCachedValue(SERVICE_STATUS_CACHE_KEY, {
    ttlMs: 2_500,
    staleIfErrorMs: 10_000,
    loader: computeServiceStatus,
  });
}

export function startService(): { success: boolean; message: string } {
  const status = computeServiceStatus();
  if (status.running) {
    return { success: false, message: `Gateway 已在运行中 (PID: ${status.pid})。` };
  }

  const bin = findOpenClawBin();
  if (!bin) {
    return { success: false, message: '未检测到 openclaw 命令，请先完成安装。' };
  }

  try {
    const child = spawn('openclaw', ['gateway', 'start'], {
      stdio: 'ignore',
      detached: true,
      shell: process.platform === 'win32',
      windowsHide: true,
    });
    child.unref();
  } catch (error) {
    return { success: false, message: `启动失败: ${error}` };
  }

  for (let index = 0; index < 15; index += 1) {
    sleepMs(1000);
    const pid = checkPortListening(getGatewayPort());
    if (pid) {
      invalidateServiceStatusCache();
      return { success: true, message: `Gateway 已启动 (PID: ${pid})。` };
    }
  }

  invalidateServiceStatusCache();
  return { success: false, message: 'Gateway 启动超时，请检查 openclaw gateway 日志。' };
}

export function stopService(): { success: boolean; message: string } {
  const result = runOpenClaw(['gateway', 'stop']);
  if (!result.success) {
    runOpenClaw(['gateway', 'stop', '--force']);
  }

  invalidateServiceStatusCache();
  const status = computeServiceStatus();
  if (!status.running) {
    return { success: true, message: 'Gateway 已停止。' };
  }

  return { success: false, message: `Gateway 停止失败，当前 PID: ${status.pid}` };
}

export function restartService(): { success: boolean; message: string } {
  const result = runOpenClaw(['gateway', 'restart']);
  sleepMs(2000);

  invalidateServiceStatusCache();
  const status = computeServiceStatus();
  if (status.running) {
    return { success: true, message: `Gateway 已重启 (PID: ${status.pid})。` };
  }

  if (!result.success) {
    stopService();
    sleepMs(1000);
    return startService();
  }

  stopService();
  sleepMs(1000);
  return startService();
}

export function getLogs(lines = 100): string[] {
  const result = runOpenClaw(['logs', '--lines', String(lines)]);
  if (result.success) {
    return result.output.split(/\r?\n/).filter(Boolean);
  }
  return [`获取日志失败: ${result.output}`];
}
