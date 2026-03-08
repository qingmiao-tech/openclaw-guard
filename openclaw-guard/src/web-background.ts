import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
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

interface ListeningSocket {
  pid: number;
  port: number;
}

const BACKGROUND_START_TIMEOUT_MS = 10_000;
let cleanupHooksRegistered = false;

function getProjectRoot(): string {
  const override = process.env.OPENCLAW_GUARD_PROJECT_ROOT;
  if (override) return path.resolve(override);
  const modulePath = fileURLToPath(import.meta.url);
  return path.resolve(path.dirname(modulePath), '..');
}

function getRuntimeDir(): string {
  const runtimeDir = process.env.OPENCLAW_GUARD_RUNTIME_DIR
    ? path.resolve(process.env.OPENCLAW_GUARD_RUNTIME_DIR)
    : path.join(getProjectRoot(), '.guard-runtime');
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

function listListeningSockets(): ListeningSocket[] {
  const mock = process.env.OPENCLAW_GUARD_MOCK_LISTENING_JSON;
  if (mock) {
    try {
      const parsed = JSON.parse(mock);
      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => ({ pid: Number(item?.pid), port: Number(item?.port) }))
          .filter((item) => Number.isInteger(item.pid) && item.pid > 0 && Number.isInteger(item.port) && item.port > 0);
      }
    } catch {
      return [];
    }
  }

  try {
    if (process.platform === 'win32') {
      const output = execFileSync('netstat', ['-ano'], {
        encoding: 'utf-8',
        windowsHide: true,
      });
      const rows: ListeningSocket[] = [];
      for (const line of output.split(/\r?\n/)) {
        if (!line.includes('LISTENING')) continue;
        const parts = line.trim().split(/\s+/);
        if (parts.length < 5) continue;
        const localAddress = parts[1];
        const pid = Number(parts[parts.length - 1]);
        const match = localAddress.match(/:(\d+)$/);
        if (!match || !Number.isInteger(pid) || pid <= 0) continue;
        rows.push({ pid, port: Number(match[1]) });
      }
      return rows;
    }

    const output = execFileSync('lsof', ['-nP', '-iTCP', '-sTCP:LISTEN'], {
      encoding: 'utf-8',
    });
    const rows: ListeningSocket[] = [];
    for (const line of output.split(/\r?\n/).slice(1)) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const parts = trimmed.split(/\s+/);
      const pid = Number(parts[1]);
      const match = trimmed.match(/:(\d+)\s*\(LISTEN\)$/);
      if (!match || !Number.isInteger(pid) || pid <= 0) continue;
      rows.push({ pid, port: Number(match[1]) });
    }
    return rows;
  } catch {
    return [];
  }
}

function findPidByPort(port: number): number | null {
  if (!Number.isFinite(port) || port <= 0) return null;
  const entry = listListeningSockets().find((item) => item.port === port);
  return entry ? entry.pid : null;
}

function findListeningPortsByPid(pid: number): number[] {
  if (!Number.isInteger(pid) || pid <= 0) return [];
  const ports = listListeningSockets()
    .filter((item) => item.pid === pid)
    .map((item) => item.port);
  return [...new Set(ports)].sort((a, b) => a - b);
}

function resolveTrackedPort(pid: number, fallbackPort: number): number {
  const ports = findListeningPortsByPid(pid);
  if (!ports.length) return fallbackPort;
  if (ports.includes(fallbackPort)) return fallbackPort;
  return ports[0];
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

function ensureCleanupHooks(): void {
  if (cleanupHooksRegistered) return;
  const cleanup = () => clearWebRuntimeRecord(process.pid);
  process.once('exit', cleanup);
  process.once('SIGINT', cleanup);
  process.once('SIGTERM', cleanup);
  cleanupHooksRegistered = true;
}

export function registerBackgroundProcess(port: number, pid = process.pid): void {
  const record: WebRuntimeRecord = {
    pid,
    port,
    managed: true,
    startedAt: new Date().toISOString(),
  };
  writeWebRuntimeRecord(record);
  if (pid === process.pid) ensureCleanupHooks();
}

export function getWebBackgroundStatus(port: number): WebBackgroundStatus {
  const pidFile = getPidFile();
  const record = readRuntimeRecord();

  if (record) {
    if (isPidAlive(record.pid)) {
      return {
        running: true,
        pid: record.pid,
        port: resolveTrackedPort(record.pid, record.port),
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

function resolveStartCommand(port: number): { command: string; args: string[]; cwd: string } | null {
  const rootDir = getProjectRoot();
  const distEntry = path.join(rootDir, 'dist', 'index.js');
  if (fs.existsSync(distEntry)) {
    return {
      command: process.execPath,
      args: [distEntry, 'web', '--port', String(port)],
      cwd: rootDir,
    };
  }

  const tsxCli = path.join(rootDir, 'node_modules', 'tsx', 'dist', 'cli.mjs');
  const sourceEntry = path.join(rootDir, 'src', 'index.ts');
  if (fs.existsSync(tsxCli) && fs.existsSync(sourceEntry)) {
    return {
      command: process.execPath,
      args: [tsxCli, sourceEntry, 'web', '--port', String(port)],
      cwd: rootDir,
    };
  }

  return null;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForBackgroundPort(port: number, timeoutMs: number): Promise<WebBackgroundStatus> {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const status = getWebBackgroundStatus(port);
    if (status.running && status.pid) return status;
    await wait(250);
  }
  return getWebBackgroundStatus(port);
}

export async function startWebBackgroundService(options: {
  port: number;
  currentPid?: number;
}): Promise<WebBackgroundActionResult> {
  const status = getWebBackgroundStatus(options.port);

  if (status.running && status.pid) {
    if (options.currentPid && status.pid === options.currentPid) {
      const wasManaged = status.managed && status.source === 'pid-file';
      registerBackgroundProcess(status.port, status.pid);
      return {
        success: true,
        message: wasManaged
          ? '当前 Guard Web 已处于 Guard 托管状态。'
          : '已将当前 Guard Web 实例纳入后台托管。',
        pid: status.pid,
        status: getWebBackgroundStatus(status.port),
      };
    }

    return {
      success: false,
      message: `端口 ${status.port} 已被其他进程占用 (PID ${status.pid})，请先停止该实例后再启动。`,
      pid: status.pid,
      status,
    };
  }

  const command = resolveStartCommand(options.port);
  if (!command) {
    return {
      success: false,
      message: '未找到可用的 Guard Web 启动入口，请先执行构建或安装依赖。',
      status,
    };
  }

  try {
    const child = spawn(command.command, command.args, {
      cwd: command.cwd,
      detached: true,
      stdio: 'ignore',
      windowsHide: true,
      env: {
        ...process.env,
        OPENCLAW_GUARD_BACKGROUND: '1',
      },
    });
    child.unref();

    const nextStatus = await waitForBackgroundPort(options.port, BACKGROUND_START_TIMEOUT_MS);
    if (nextStatus.running && nextStatus.pid) {
      return {
        success: true,
        message: `Guard Web 后台服务已启动，PID ${nextStatus.pid}，端口 ${nextStatus.port}。`,
        pid: nextStatus.pid,
        status: nextStatus,
      };
    }

    return {
      success: false,
      message: 'Guard Web 后台启动超时，请检查日志或端口占用情况。',
      status: nextStatus,
    };
  } catch (error) {
    return {
      success: false,
      message: `Guard Web 后台启动失败: ${error instanceof Error ? error.message : String(error)}`,
      status: getWebBackgroundStatus(options.port),
    };
  }
}
