import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export interface WebRuntimeRecord {
  pid: number;
  port: number;
  managed: boolean;
  startedAt: string;
}

export interface WebBackgroundStatus {
  running: boolean;
  pid: number | null;
  port: number;
  source: 'pid-file' | 'port-scan' | 'none';
  managed: boolean;
  pidFile: string;
}

export interface WebBackgroundActionResult {
  success: boolean;
  message: string;
  pid?: number | null;
  status: WebBackgroundStatus;
  selfExit?: boolean;
}

function getProjectRoot(): string {
  const modulePath = fileURLToPath(import.meta.url);
  return path.resolve(path.dirname(modulePath), '..');
}

function getRuntimeDir(): string {
  const runtimeDir = path.join(getProjectRoot(), '.guard-runtime');
  fs.mkdirSync(runtimeDir, { recursive: true });
  return runtimeDir;
}

function getPidFile(): string {
  return path.join(getRuntimeDir(), 'guard-web.pid.json');
}

function readRuntimeRecord(): WebRuntimeRecord | null {
  const filePath = getPidFile();
  if (!fs.existsSync(filePath)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Partial<WebRuntimeRecord>;
    if (typeof parsed.pid !== 'number' || typeof parsed.port !== 'number') return null;
    return {
      pid: parsed.pid,
      port: parsed.port,
      managed: parsed.managed === true,
      startedAt: typeof parsed.startedAt === 'string' ? parsed.startedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

function isPidAlive(pid: number): boolean {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function findPidByPort(port: number): number | null {
  if (!Number.isFinite(port) || port <= 0) return null;
  try {
    if (process.platform === 'win32') {
      const output = execFileSync('netstat', ['-ano'], {
        encoding: 'utf-8',
        windowsHide: true,
      });
      for (const line of output.split(/\r?\n/)) {
        if (!line.includes(`:${port}`) || !line.includes('LISTENING')) continue;
        const parts = line.trim().split(/\s+/);
        const pid = Number(parts[parts.length - 1]);
        if (Number.isInteger(pid) && pid > 0) return pid;
      }
      return null;
    }

    const output = execFileSync('lsof', ['-ti', `tcp:${port}`], {
      encoding: 'utf-8',
    }).trim();
    const pid = Number(output.split(/\r?\n/)[0]);
    return Number.isInteger(pid) && pid > 0 ? pid : null;
  } catch {
    return null;
  }
}

function killPid(pid: number): boolean {
  try {
    if (process.platform === 'win32') {
      execFileSync('taskkill', ['/PID', String(pid), '/T', '/F'], {
        encoding: 'utf-8',
        windowsHide: true,
      });
      return true;
    }

    process.kill(pid, 'SIGTERM');
    return true;
  } catch {
    return false;
  }
}

export function writeWebRuntimeRecord(record: WebRuntimeRecord): void {
  fs.writeFileSync(getPidFile(), JSON.stringify(record, null, 2), 'utf-8');
}

export function clearWebRuntimeRecord(expectedPid?: number): void {
  const filePath = getPidFile();
  if (!fs.existsSync(filePath)) return;
  if (expectedPid) {
    const current = readRuntimeRecord();
    if (current && current.pid !== expectedPid) return;
  }
  fs.unlinkSync(filePath);
}

export function registerBackgroundProcess(port: number): void {
  const record: WebRuntimeRecord = {
    pid: process.pid,
    port,
    managed: true,
    startedAt: new Date().toISOString(),
  };
  writeWebRuntimeRecord(record);

  const cleanup = () => clearWebRuntimeRecord(process.pid);
  process.once('exit', cleanup);
  process.once('SIGINT', cleanup);
  process.once('SIGTERM', cleanup);
}

export function getWebBackgroundStatus(port: number): WebBackgroundStatus {
  const pidFile = getPidFile();
  const record = readRuntimeRecord();

  if (record) {
    if (isPidAlive(record.pid)) {
      return {
        running: true,
        pid: record.pid,
        port: record.port,
        source: 'pid-file',
        managed: record.managed,
        pidFile,
      };
    }

    const pidFromRecordedPort = findPidByPort(record.port);
    if (pidFromRecordedPort) {
      return {
        running: true,
        pid: pidFromRecordedPort,
        port: record.port,
        source: 'pid-file',
        managed: record.managed,
        pidFile,
      };
    }

    clearWebRuntimeRecord(record.pid);
  }

  const portPid = findPidByPort(port);
  if (portPid) {
    return {
      running: true,
      pid: portPid,
      port,
      source: 'port-scan',
      managed: false,
      pidFile,
    };
  }

  return {
    running: false,
    pid: null,
    port,
    source: 'none',
    managed: false,
    pidFile,
  };
}

export function stopWebBackgroundService(options: {
  port: number;
  currentPid?: number;
}): WebBackgroundActionResult {
  const status = getWebBackgroundStatus(options.port);
  if (!status.running || !status.pid) {
    return {
      success: false,
      message: '当前没有检测到 Guard Web 后台服务。',
      status,
    };
  }

  if (options.currentPid && status.pid === options.currentPid) {
    clearWebRuntimeRecord(options.currentPid);
    return {
      success: true,
      message: `准备停止当前 Guard Web 进程 (PID ${status.pid})。`,
      pid: status.pid,
      status: {
        ...status,
        running: false,
      },
      selfExit: true,
    };
  }

  const stopped = killPid(status.pid);
  if (!stopped) {
    return {
      success: false,
      message: `无法停止 Guard Web 进程 (PID ${status.pid})。`,
      pid: status.pid,
      status: getWebBackgroundStatus(options.port),
    };
  }

  clearWebRuntimeRecord(status.pid);
  return {
    success: true,
    message: `已停止 Guard Web 后台服务 (PID ${status.pid})。`,
    pid: status.pid,
    status: getWebBackgroundStatus(options.port),
  };
}
