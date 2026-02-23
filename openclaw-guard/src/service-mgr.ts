/**
 * Gateway 服务管理模块
 * 启动/停止/重启 OpenClaw Gateway，查看日志
 */
import { execSync, spawn } from 'node:child_process';
import { detectPlatform } from './platform.js';

const SERVICE_PORT = 18789;

export interface ServiceStatus {
  running: boolean;
  pid: number | null;
  port: number;
}

/** 检测端口是否有服务在监听 */
function checkPortListening(port: number): number | null {
  const platform = detectPlatform();
  try {
    if (platform === 'windows') {
      const output = execSync(`netstat -ano`, { stdio: 'pipe', encoding: 'utf-8', timeout: 5000 });
      for (const line of output.split('\n')) {
        if (line.includes(`:${port}`) && line.includes('LISTENING')) {
          const parts = line.trim().split(/\s+/);
          const pid = parseInt(parts[parts.length - 1], 10);
          if (!isNaN(pid)) return pid;
        }
      }
    } else {
      const output = execSync(`lsof -ti :${port}`, { stdio: 'pipe', encoding: 'utf-8', timeout: 5000 });
      const pid = parseInt(output.trim().split('\n')[0], 10);
      if (!isNaN(pid)) return pid;
    }
  } catch { /* port not in use */ }
  return null;
}

/** 查找 openclaw 可执行文件路径 */
function findOpenClawBin(): string | null {
  try {
    const platform = detectPlatform();
    const cmd = platform === 'windows' ? 'where openclaw' : 'which openclaw';
    return execSync(cmd, { stdio: 'pipe', encoding: 'utf-8', timeout: 5000 }).trim().split(/[\r\n]/)[0].trim() || null;
  } catch {
    return null;
  }
}

/** 执行 openclaw 命令 */
function runOpenClaw(args: string[]): { success: boolean; output: string } {
  try {
    const output = execSync(`openclaw ${args.join(' ')}`, {
      stdio: 'pipe', encoding: 'utf-8', timeout: 30000,
    });
    return { success: true, output: output.trim() };
  } catch (err: any) {
    const msg = err.stderr || err.stdout || err.message || String(err);
    return { success: false, output: msg };
  }
}

/** 获取服务状态 */
export function getServiceStatus(): ServiceStatus {
  const pid = checkPortListening(SERVICE_PORT);
  return { running: pid !== null, pid, port: SERVICE_PORT };
}

/** 启动服务 */
export function startService(): { success: boolean; message: string } {
  const status = getServiceStatus();
  if (status.running) {
    return { success: false, message: `服务已在运行中 (PID: ${status.pid})` };
  }

  const bin = findOpenClawBin();
  if (!bin) {
    return { success: false, message: '找不到 openclaw 命令，请先安装' };
  }

  // 后台启动 gateway
  try {
    const child = spawn('openclaw', ['gateway', 'start'], {
      stdio: 'ignore',
      detached: true,
      shell: true,
    });
    child.unref();
  } catch (err) {
    return { success: false, message: `启动失败: ${err}` };
  }

  // 等待端口就绪（最多 15 秒）
  for (let i = 0; i < 15; i++) {
    execSync('ping -n 1 127.0.0.1 >nul 2>&1 || sleep 1', { stdio: 'ignore', shell: true, timeout: 2000 }).toString();
    const pid = checkPortListening(SERVICE_PORT);
    if (pid) {
      return { success: true, message: `服务已启动 (PID: ${pid})` };
    }
  }

  return { success: false, message: '启动超时（15秒），请检查 openclaw 日志' };
}

/** 停止服务 */
export function stopService(): { success: boolean; message: string } {
  const result = runOpenClaw(['gateway', 'stop']);
  if (!result.success) {
    // 尝试强制停止
    runOpenClaw(['gateway', 'stop', '--force']);
  }

  // 验证
  const status = getServiceStatus();
  if (!status.running) {
    return { success: true, message: '服务已停止' };
  }
  return { success: false, message: `无法停止服务 (PID: ${status.pid})` };
}

/** 重启服务 */
export function restartService(): { success: boolean; message: string } {
  const result = runOpenClaw(['gateway', 'restart']);

  // 等待 2 秒后检查
  try { execSync('ping -n 2 127.0.0.1 >nul 2>&1 || sleep 2', { stdio: 'ignore', shell: true, timeout: 3000 }); } catch {}

  const status = getServiceStatus();
  if (status.running) {
    return { success: true, message: `服务已重启 (PID: ${status.pid})` };
  }

  // 手动停止再启动
  stopService();
  try { execSync('ping -n 1 127.0.0.1 >nul 2>&1 || sleep 1', { stdio: 'ignore', shell: true, timeout: 2000 }); } catch {}
  return startService();
}

/** 获取日志 */
export function getLogs(lines: number = 100): string[] {
  const result = runOpenClaw(['logs', '--lines', String(lines)]);
  if (result.success) {
    return result.output.split('\n');
  }
  return [`获取日志失败: ${result.output}`];
}