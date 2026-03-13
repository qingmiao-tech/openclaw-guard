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

export interface WebBackgroundLogPaths {
  stdout: string;
  stderr: string;
}

export interface WebBackgroundPaths {
  runtimeDir: string;
  pidFile: string;
  logPaths: WebBackgroundLogPaths;
}

export type WebBackgroundScenario = 'managed-running' | 'unmanaged-running' | 'stopped';
export type WebBackgroundNextAction = 'open-workbench' | 'adopt-or-stop' | 'start-web';

export interface WebBackgroundReport {
  running: boolean;
  pid: number | null;
  port: number;
  managed: boolean;
  source: 'pid-file' | 'port-scan' | 'none';
  primaryUrl: string;
  workbenchUrl: string;
  nextAction: WebBackgroundNextAction;
  scenario: WebBackgroundScenario;
  pidFile: string;
  logPaths: WebBackgroundLogPaths;
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
const STDOUT_LOG_FILE = 'guard-web.out.log';
const STDERR_LOG_FILE = 'guard-web.err.log';
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

function getLogPaths(): WebBackgroundLogPaths {
  const runtimeDir = getRuntimeDir();
  return {
    stdout: path.join(runtimeDir, STDOUT_LOG_FILE),
    stderr: path.join(runtimeDir, STDERR_LOG_FILE),
  };
}

export function getWebBackgroundPaths(): WebBackgroundPaths {
  return {
    runtimeDir: getRuntimeDir(),
    pidFile: getPidFile(),
    logPaths: getLogPaths(),
  };
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
  const portPid = findPidByPort(port);

  if (record) {
    if (isPidAlive(record.pid)) {
      const trackedPort = portPid === record.pid ? port : resolveTrackedPort(record.pid, record.port);
      if (trackedPort === port || record.port === port || portPid === record.pid) {
        return {
          running: true,
          pid: record.pid,
          port: trackedPort,
          source: 'pid-file',
          managed: record.managed,
          pidFile,
        };
      }
    } else {
      const pidFromRecordedPort = findPidByPort(record.port);
      if (pidFromRecordedPort && record.port === port) {
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
  }

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

function resolveWebBackgroundScenario(status: WebBackgroundStatus): WebBackgroundScenario {
  if (status.running && status.managed) return 'managed-running';
  if (status.running) return 'unmanaged-running';
  return 'stopped';
}

function resolveWebBackgroundNextAction(scenario: WebBackgroundScenario): WebBackgroundNextAction {
  if (scenario === 'managed-running') return 'open-workbench';
  if (scenario === 'unmanaged-running') return 'adopt-or-stop';
  return 'start-web';
}

function buildLoopbackUrl(port: number, suffix = ''): string {
  return `http://127.0.0.1:${port}${suffix}`;
}

export function getWebBackgroundReport(port: number): WebBackgroundReport {
  const status = getWebBackgroundStatus(port);
  const paths = getWebBackgroundPaths();
  const scenario = resolveWebBackgroundScenario(status);
  return {
    running: status.running,
    pid: status.pid,
    port: status.port,
    managed: status.managed,
    source: status.source,
    primaryUrl: buildLoopbackUrl(status.port, '/'),
    workbenchUrl: buildLoopbackUrl(status.port, '/workbench'),
    nextAction: resolveWebBackgroundNextAction(scenario),
    scenario,
    pidFile: status.pidFile || paths.pidFile,
    logPaths: paths.logPaths,
  };
}

function getSourceLabel(source: WebBackgroundStatus['source'], lang: 'zh' | 'en'): string {
  const labels = {
    'pid-file': { zh: 'PID 记录文件', en: 'PID record file' },
    'port-scan': { zh: '端口扫描', en: 'Port scan' },
    none: { zh: '未检测到来源', en: 'No source detected' },
  };
  return labels[source][lang];
}

function getNextActionMessage(report: WebBackgroundReport, lang: 'zh' | 'en'): string {
  if (report.nextAction === 'open-workbench') {
    return lang === 'zh'
      ? 'Guard Web 已被托管并正在运行，可直接访问工作台或按需停止后台服务。'
      : 'Guard Web is managed and running. Open the workbench directly or stop the background service if needed.';
  }
  if (report.nextAction === 'adopt-or-stop') {
    return lang === 'zh'
      ? '当前端口上存在未纳入 Guard 托管的实例。请先决定接管它，或先停止后再启动新的实例。'
      : 'An unmanaged instance is already listening on this port. Either adopt it into Guard management or stop it before starting a new one.';
  }
  return lang === 'zh'
    ? '当前未检测到 Guard Web 进程，下一步建议启动后台服务。'
    : 'No Guard Web process is running. The recommended next step is to start the background service.';
}

export function formatWebBackgroundReport(report: WebBackgroundReport, lang: 'zh' | 'en' = 'zh'): string {
  const runningLine = report.running
    ? (lang === 'zh' ? 'Guard Web 正在后台运行。' : 'Guard Web is running in the background.')
    : (lang === 'zh' ? '当前未检测到 Guard Web 后台服务。' : 'No Guard Web background service is currently running.');
  const pidLine = report.pid
    ? (lang === 'zh' ? `进程 PID: ${report.pid}` : `Process PID: ${report.pid}`)
    : (lang === 'zh' ? '进程 PID: -' : 'Process PID: -');
  const managedLine = lang === 'zh'
    ? `是否由虾护卫托管: ${report.managed ? '是' : '否'}`
    : `Managed by Guard: ${report.managed ? 'yes' : 'no'}`;
  const nextActionLabel = lang === 'zh' ? '下一步建议' : 'Recommended next step';
  const sourceLabel = lang === 'zh' ? '状态来源' : 'Status source';
  const primaryLabel = lang === 'zh' ? '当前地址' : 'Primary URL';
  const workbenchLabel = lang === 'zh' ? '工作台地址' : 'Workbench URL';
  const portLabel = lang === 'zh' ? '监听端口' : 'Listening port';
  const pidFileLabel = lang === 'zh' ? 'PID 记录文件' : 'PID record file';
  const stdoutLabel = lang === 'zh' ? '输出日志' : 'Stdout log';
  const stderrLabel = lang === 'zh' ? '错误日志' : 'Stderr log';
  return [
    `[INFO] ${runningLine}`,
    `[INFO] ${primaryLabel}: ${report.primaryUrl}`,
    `[INFO] ${workbenchLabel}: ${report.workbenchUrl}`,
    `[INFO] ${portLabel}: ${report.port}`,
    `[INFO] ${pidLine}`,
    `[INFO] ${managedLine}`,
    `[INFO] ${sourceLabel}: ${getSourceLabel(report.source, lang)}`,
    `[INFO] ${nextActionLabel}: ${getNextActionMessage(report, lang)}`,
    `[INFO] ${pidFileLabel}: ${report.pidFile}`,
    `[INFO] ${stdoutLabel}: ${report.logPaths.stdout}`,
    `[INFO] ${stderrLabel}: ${report.logPaths.stderr}`,
  ].join('\n');
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
