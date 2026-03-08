import { execSync, spawn } from 'node:child_process';
import { detectPlatform } from './platform.js';
import { loadConfig, getNested } from './config.js';

function sleepMs(ms: number) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

export function getGatewayPort(): number {
  const config = loadConfig();
  const port = getNested(config, ['gateway', 'port']);
  return typeof port === 'number' && port > 0 ? port : 18789;
}

export interface ServiceStatus {
  running: boolean;
  pid: number | null;
  port: number;
}

function checkPortListening(port: number): number | null {
  const platform = detectPlatform();
  try {
    if (platform === 'windows') {
      const output = execSync('netstat -ano', { stdio: 'pipe', encoding: 'utf-8', timeout: 5000 });
      for (const line of output.split(/\r?\n/)) {
        if (!line.includes(`:${port}`) || !line.includes('LISTENING')) continue;
        const parts = line.trim().split(/\s+/);
        const pid = Number(parts[parts.length - 1]);
        if (Number.isInteger(pid) && pid > 0) return pid;
      }
      return null;
    }

    const output = execSync(`lsof -ti :${port}`, { stdio: 'pipe', encoding: 'utf-8', timeout: 5000 });
    const pid = Number(output.trim().split(/\r?\n/)[0]);
    return Number.isInteger(pid) && pid > 0 ? pid : null;
  } catch {
    return null;
  }
}

function findOpenClawBin(): string | null {
  try {
    const platform = detectPlatform();
    const cmd = platform === 'windows' ? 'where openclaw' : 'which openclaw';
    return execSync(cmd, { stdio: 'pipe', encoding: 'utf-8', timeout: 5000 })
      .trim()
      .split(/[\r\n]/)[0]
      .trim() || null;
  } catch {
    return null;
  }
}

function runOpenClaw(args: string[]): { success: boolean; output: string } {
  try {
    const output = execSync(`openclaw ${args.join(' ')}`, {
      stdio: 'pipe',
      encoding: 'utf-8',
      timeout: 30000,
    });
    return { success: true, output: output.trim() };
  } catch (error: any) {
    const message = error?.stderr || error?.stdout || error?.message || String(error);
    return { success: false, output: String(message).trim() };
  }
}

export function getServiceStatus(): ServiceStatus {
  const port = getGatewayPort();
  const pid = checkPortListening(port);
  return { running: pid !== null, pid, port };
}

export function startService(): { success: boolean; message: string } {
  const status = getServiceStatus();
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
      shell: true,
    });
    child.unref();
  } catch (error) {
    return { success: false, message: `启动失败: ${error}` };
  }

  for (let index = 0; index < 15; index += 1) {
    sleepMs(1000);
    const pid = checkPortListening(getGatewayPort());
    if (pid) {
      return { success: true, message: `Gateway 已启动 (PID: ${pid})。` };
    }
  }

  return { success: false, message: 'Gateway 启动超时，请检查 openclaw gateway 日志。' };
}

export function stopService(): { success: boolean; message: string } {
  const result = runOpenClaw(['gateway', 'stop']);
  if (!result.success) {
    runOpenClaw(['gateway', 'stop', '--force']);
  }

  const status = getServiceStatus();
  if (!status.running) {
    return { success: true, message: 'Gateway 已停止。' };
  }

  return { success: false, message: `Gateway 停止失败，当前 PID: ${status.pid}` };
}

export function restartService(): { success: boolean; message: string } {
  const result = runOpenClaw(['gateway', 'restart']);
  sleepMs(2000);

  const status = getServiceStatus();
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
