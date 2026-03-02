/**
 * tenacitOS (Mission Control) integration manager.
 * Provides install/sync/bootstrap/start/stop/restart/logs/health operations.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync, spawn, spawnSync } from 'node:child_process';
import { detectPlatform, getOpenClawDir } from './platform.js';

const TENACITOS_REPO_URL = 'https://github.com/carlosazaustre/tenacitOS.git';
const DEFAULT_PORT = 8089;
const START_WAIT_RETRIES = 40;
const START_WAIT_INTERVAL_MS = 500;

const DATA_FILES = [
  'activities',
  'configured-skills',
  'cron-jobs',
  'notifications',
  'tasks',
];

export type MissionRunMode = 'dev' | 'prod';

export interface MissionPaths {
  missionDir: string;
  missionWorkspaceDir: string;
  stateDir: string;
  pidFile: string;
  metaFile: string;
  logFile: string;
  envLocalFile: string;
  envExampleFile: string;
  dataDir: string;
}

export interface MissionStatus {
  installed: boolean;
  running: boolean;
  portOccupied: boolean;
  pid: number | null;
  port: number;
  url: string;
  healthUrl: string;
  missionDir: string;
  branch: string | null;
  head: string | null;
  envReady: boolean;
  dataReady: boolean;
  nodeVersion: string;
  npmVersion: string | null;
  repoUrl: string;
  logFile: string;
  runMode: MissionRunMode | null;
  startedAt: string | null;
}

export interface MissionActionResult {
  success: boolean;
  message: string;
  output?: string;
  details?: Record<string, unknown>;
}

export interface MissionHealthResult {
  success: boolean;
  reachable: boolean;
  statusCode?: number;
  body?: unknown;
  error?: string;
}

export interface MissionCredentialsResult {
  success: boolean;
  message: string;
  envLocalFile: string;
  adminPassword?: string;
}

interface MissionMeta {
  pid: number;
  port: number;
  mode: MissionRunMode;
  startedAt: string;
  command: string;
}

function sleepMs(ms: number) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function runCommand(cmd: string, args: string[], cwd?: string, timeoutMs = 120000): MissionActionResult {
  const result = spawnSync(cmd, args, {
    cwd,
    encoding: 'utf-8',
    shell: true,
    timeout: timeoutMs,
  });

  const output = `${result.stdout || ''}${result.stderr || ''}`.trim();
  if (result.status === 0) {
    return { success: true, message: `${cmd} ok`, output };
  }
  return {
    success: false,
    message: `${cmd} failed (code=${result.status ?? 'unknown'})`,
    output,
  };
}

function getNpmVersion(): string | null {
  try {
    return execSync('npm --version', { encoding: 'utf-8', stdio: 'pipe', timeout: 8000 }).trim();
  } catch {
    return null;
  }
}

function checkPortListening(port: number): number | null {
  const platform = detectPlatform();
  try {
    if (platform === 'windows') {
      const output = execSync('netstat -ano', { stdio: 'pipe', encoding: 'utf-8', timeout: 6000 });
      for (const line of output.split('\n')) {
        if (!line.includes(`:${port}`) || !line.includes('LISTENING')) continue;
        const parts = line.trim().split(/\s+/);
        const pid = parseInt(parts[parts.length - 1], 10);
        if (!Number.isNaN(pid)) return pid;
      }
      return null;
    }

    const output = execSync(`lsof -ti :${port}`, { stdio: 'pipe', encoding: 'utf-8', timeout: 6000 }).trim();
    const firstLine = output.split('\n')[0];
    const pid = parseInt(firstLine, 10);
    return Number.isNaN(pid) ? null : pid;
  } catch {
    return null;
  }
}

function processExists(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function tailLines(filePath: string, lines: number): string[] {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, 'utf-8');
  const all = text.split(/\r?\n/).filter(Boolean);
  return all.slice(Math.max(0, all.length - lines));
}

function parseEnvFile(filePath: string): Record<string, string> {
  const result: Record<string, string> = {};
  if (!fs.existsSync(filePath)) return result;
  const lines = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const idx = trimmed.indexOf('=');
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    result[key] = value;
  }
  return result;
}

function writeEnvFile(filePath: string, envMap: Record<string, string>) {
  const lines = Object.entries(envMap).map(([k, v]) => `${k}=${v}`);
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf-8');
}

function randomPassword(length = 18): string {
  return crypto.randomBytes(Math.ceil(length * 0.75)).toString('base64url').slice(0, length);
}

function randomSecret(): string {
  return crypto.randomBytes(32).toString('base64url');
}

function isPlaceholder(value: string | undefined, placeholders: string[]): boolean {
  if (!value) return true;
  const normalized = value.trim().toLowerCase();
  return placeholders.some(p => normalized === p.toLowerCase());
}

function parseMode(mode?: string): MissionRunMode {
  return mode === 'prod' ? 'prod' : 'dev';
}

export function getMissionPort(): number {
  const fromEnv = process.env.OPENCLAW_GUARD_MISSION_PORT || process.env.MISSION_CONTROL_PORT;
  const parsed = fromEnv ? parseInt(fromEnv, 10) : NaN;
  return Number.isInteger(parsed) && parsed > 0 ? parsed : DEFAULT_PORT;
}

export function getMissionPaths(): MissionPaths {
  const openclawDir = getOpenClawDir();
  const missionWorkspaceDir = path.join(openclawDir, 'workspace');
  const missionDir = process.env.OPENCLAW_GUARD_MISSION_DIR?.trim()
    ? path.resolve(process.env.OPENCLAW_GUARD_MISSION_DIR.trim())
    : path.join(missionWorkspaceDir, 'mission-control');
  const stateDir = path.join(openclawDir, 'guard', 'mission-control');
  const pidFile = path.join(stateDir, 'mission-control.pid');
  const metaFile = path.join(stateDir, 'mission-control.meta.json');
  const logFile = path.join(stateDir, 'mission-control.log');
  const envLocalFile = path.join(missionDir, '.env.local');
  const envExampleFile = path.join(missionDir, '.env.example');
  const dataDir = path.join(missionDir, 'data');

  return {
    missionDir,
    missionWorkspaceDir,
    stateDir,
    pidFile,
    metaFile,
    logFile,
    envLocalFile,
    envExampleFile,
    dataDir,
  };
}

function ensureStateDir(paths: MissionPaths) {
  if (!fs.existsSync(paths.stateDir)) {
    fs.mkdirSync(paths.stateDir, { recursive: true });
  }
}

function readMeta(metaFile: string): MissionMeta | null {
  if (!fs.existsSync(metaFile)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(metaFile, 'utf-8')) as MissionMeta;
    if (typeof data?.pid !== 'number' || typeof data?.port !== 'number') return null;
    const mode = parseMode(data.mode);
    return { ...data, mode };
  } catch {
    return null;
  }
}

function writeMeta(metaFile: string, meta: MissionMeta) {
  fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2), 'utf-8');
}

function readPid(pidFile: string): number | null {
  if (!fs.existsSync(pidFile)) return null;
  const raw = fs.readFileSync(pidFile, 'utf-8').trim();
  const pid = parseInt(raw, 10);
  return Number.isNaN(pid) ? null : pid;
}

function removeRuntimeFiles(paths: MissionPaths) {
  if (fs.existsSync(paths.pidFile)) {
    try { fs.unlinkSync(paths.pidFile); } catch { /* ignore */ }
  }
  if (fs.existsSync(paths.metaFile)) {
    try { fs.unlinkSync(paths.metaFile); } catch { /* ignore */ }
  }
}

function killPid(pid: number) {
  const platform = detectPlatform();
  try {
    if (platform === 'windows') {
      runCommand('taskkill', ['/PID', String(pid), '/T', '/F'], undefined, 10000);
    } else {
      process.kill(pid, 'SIGTERM');
    }
  } catch {
    // ignore
  }
}

function ensureMissionEnv(paths: MissionPaths): MissionActionResult {
  if (!fs.existsSync(paths.missionDir)) {
    return { success: false, message: 'Mission Control 目录不存在，无法初始化环境。' };
  }

  if (!fs.existsSync(paths.envLocalFile)) {
    if (fs.existsSync(paths.envExampleFile)) {
      fs.copyFileSync(paths.envExampleFile, paths.envLocalFile);
    } else {
      fs.writeFileSync(paths.envLocalFile, '', 'utf-8');
    }
  }

  if (!fs.existsSync(paths.dataDir)) {
    fs.mkdirSync(paths.dataDir, { recursive: true });
  }

  const envMap = parseEnvFile(paths.envLocalFile);
  const generated: string[] = [];
  const openclawDir = getOpenClawDir();
  const workspaceDir = path.join(openclawDir, 'workspace');

  if (isPlaceholder(envMap.ADMIN_PASSWORD, ['change-me-to-a-strong-password', ''])) {
    envMap.ADMIN_PASSWORD = randomPassword(20);
    generated.push('ADMIN_PASSWORD');
  }
  if (isPlaceholder(envMap.AUTH_SECRET, ['generate-a-random-32-char-string-here', ''])) {
    envMap.AUTH_SECRET = randomSecret();
    generated.push('AUTH_SECRET');
  }
  if (!envMap.OPENCLAW_DIR) envMap.OPENCLAW_DIR = openclawDir;
  if (!envMap.OPENCLAW_WORKSPACE) envMap.OPENCLAW_WORKSPACE = workspaceDir;

  writeEnvFile(paths.envLocalFile, envMap);

  for (const name of DATA_FILES) {
    const target = path.join(paths.dataDir, `${name}.json`);
    const example = path.join(paths.dataDir, `${name}.example.json`);
    if (!fs.existsSync(target)) {
      if (fs.existsSync(example)) {
        fs.copyFileSync(example, target);
      } else {
        fs.writeFileSync(target, '[]\n', 'utf-8');
      }
    }
  }

  return {
    success: true,
    message: generated.length > 0
      ? `Mission Control 环境初始化完成（已生成: ${generated.join(', ')}）。`
      : 'Mission Control 环境已就绪。',
    details: {
      generatedKeys: generated,
      envLocalFile: paths.envLocalFile,
      dataDir: paths.dataDir,
    },
  };
}

function spawnMission(mode: MissionRunMode, port: number, paths: MissionPaths): MissionActionResult {
  if (mode === 'prod') {
    const build = runCommand('npm', ['run', 'build'], paths.missionDir, 300000);
    if (!build.success) {
      return {
        success: false,
        message: 'Mission Control 生产构建失败。',
        output: build.output,
      };
    }
  }

  const outFd = fs.openSync(paths.logFile, 'a');
  const env = {
    ...process.env,
    PORT: String(port),
    NODE_ENV: mode === 'prod' ? 'production' : (process.env.NODE_ENV || 'development'),
    OPENCLAW_DIR: getOpenClawDir(),
    OPENCLAW_WORKSPACE: path.join(getOpenClawDir(), 'workspace'),
  };

  const args = mode === 'prod'
    ? ['run', 'start', '--', '-p', String(port)]
    : ['run', 'dev', '--', '-p', String(port)];

  const child = spawn('npm', args, {
    cwd: paths.missionDir,
    detached: true,
    shell: true,
    stdio: ['ignore', outFd, outFd],
    env,
  });
  fs.closeSync(outFd);
  const childPid = child.pid;
  if (!childPid) {
    return {
      success: false,
      message: 'Mission Control 启动失败：未获取到进程 PID。',
    };
  }
  child.unref();

  fs.writeFileSync(paths.pidFile, String(childPid), 'utf-8');
  writeMeta(paths.metaFile, {
    pid: childPid,
    port,
    mode,
    startedAt: new Date().toISOString(),
    command: `npm ${args.join(' ')}`,
  });

  for (let i = 0; i < START_WAIT_RETRIES; i++) {
    sleepMs(START_WAIT_INTERVAL_MS);
    const pid = checkPortListening(port);
    if (pid) {
      return {
        success: true,
        message: `Mission Control 已启动 (PID: ${pid}, Port: ${port}, Mode: ${mode})`,
      };
    }
  }

  return {
    success: false,
    message: `Mission Control 启动超时，请检查日志: ${paths.logFile}`,
  };
}

export function getMissionStatus(): MissionStatus {
  const paths = getMissionPaths();
  const port = getMissionPort();
  const listeningPid = checkPortListening(port);
  const pidFromFile = readPid(paths.pidFile);
  const meta = readMeta(paths.metaFile);
  const installed = fs.existsSync(path.join(paths.missionDir, 'package.json'));

  const managedPid = meta?.pid ?? pidFromFile;
  const managedAlive = managedPid ? processExists(managedPid) : false;
  const running = installed && (managedAlive || (managedPid !== null && listeningPid === managedPid));
  const pid = running ? (managedPid ?? listeningPid) : null;

  let branch: string | null = null;
  let head: string | null = null;
  if (fs.existsSync(path.join(paths.missionDir, '.git'))) {
    const b = runCommand('git', ['rev-parse', '--abbrev-ref', 'HEAD'], paths.missionDir, 8000);
    const h = runCommand('git', ['rev-parse', '--short', 'HEAD'], paths.missionDir, 8000);
    if (b.success) branch = b.output?.split(/\r?\n/)[0] || null;
    if (h.success) head = h.output?.split(/\r?\n/)[0] || null;
  }

  const envMap = parseEnvFile(paths.envLocalFile);
  const envReady = !!(envMap.ADMIN_PASSWORD && envMap.AUTH_SECRET);
  const dataReady = DATA_FILES.every(name => fs.existsSync(path.join(paths.dataDir, `${name}.json`)));

  return {
    installed,
    running,
    portOccupied: listeningPid !== null,
    pid,
    port,
    url: `http://localhost:${port}`,
    healthUrl: `http://localhost:${port}/api/health`,
    missionDir: paths.missionDir,
    branch,
    head,
    envReady,
    dataReady,
    nodeVersion: process.version,
    npmVersion: getNpmVersion(),
    repoUrl: TENACITOS_REPO_URL,
    logFile: paths.logFile,
    runMode: meta?.mode || null,
    startedAt: meta?.startedAt || null,
  };
}

export function installMissionControl(): MissionActionResult {
  const paths = getMissionPaths();
  if (!fs.existsSync(paths.missionWorkspaceDir)) {
    fs.mkdirSync(paths.missionWorkspaceDir, { recursive: true });
  }

  let output = '';

  if (!fs.existsSync(path.join(paths.missionDir, '.git'))) {
    const clone = runCommand('git', ['clone', TENACITOS_REPO_URL, paths.missionDir], paths.missionWorkspaceDir, 180000);
    if (!clone.success) {
      return { success: false, message: '克隆 tenacitOS 失败。', output: clone.output };
    }
    output += `${clone.output || ''}\n`;
  } else {
    const pull = runCommand('git', ['pull', '--ff-only'], paths.missionDir, 120000);
    if (!pull.success) {
      return { success: false, message: '同步 tenacitOS 失败。', output: pull.output };
    }
    output += `${pull.output || ''}\n`;
  }

  const npmInstall = runCommand('npm', ['install'], paths.missionDir, 240000);
  if (!npmInstall.success) {
    return { success: false, message: '安装 tenacitOS 依赖失败。', output: `${output}${npmInstall.output || ''}` };
  }
  output += `${npmInstall.output || ''}\n`;

  const envResult = ensureMissionEnv(paths);
  if (!envResult.success) {
    return { success: false, message: envResult.message, output };
  }

  return {
    success: true,
    message: 'tenacitOS 已完成安装与初始化。',
    output: output.trim(),
    details: envResult.details,
  };
}

export function syncMissionControl(): MissionActionResult {
  const paths = getMissionPaths();
  if (!fs.existsSync(path.join(paths.missionDir, '.git'))) {
    return { success: false, message: 'Mission Control 尚未安装，请先执行 install。' };
  }
  let output = '';

  const pull = runCommand('git', ['pull', '--ff-only'], paths.missionDir, 120000);
  if (!pull.success) {
    return { success: false, message: '同步 tenacitOS 代码失败。', output: pull.output };
  }
  output += `${pull.output || ''}\n`;

  const npmInstall = runCommand('npm', ['install'], paths.missionDir, 240000);
  if (!npmInstall.success) {
    return { success: false, message: '同步后依赖安装失败。', output: `${output}${npmInstall.output || ''}` };
  }
  output += `${npmInstall.output || ''}\n`;

  const envResult = ensureMissionEnv(paths);
  if (!envResult.success) {
    return { success: false, message: envResult.message, output };
  }

  return {
    success: true,
    message: 'tenacitOS 同步完成。',
    output: output.trim(),
  };
}

export function bootstrapMissionControl(): MissionActionResult {
  const paths = getMissionPaths();
  ensureStateDir(paths);
  return ensureMissionEnv(paths);
}

export function getMissionCredentials(): MissionCredentialsResult {
  const paths = getMissionPaths();
  if (!fs.existsSync(paths.envLocalFile)) {
    return {
      success: false,
      message: '未找到 .env.local，请先执行 mission install 或 mission bootstrap。',
      envLocalFile: paths.envLocalFile,
    };
  }
  const envMap = parseEnvFile(paths.envLocalFile);
  const password = envMap.ADMIN_PASSWORD;
  if (!password) {
    return {
      success: false,
      message: 'ADMIN_PASSWORD 未设置，请执行 mission reset-password。',
      envLocalFile: paths.envLocalFile,
    };
  }
  return {
    success: true,
    message: '已读取 Mission Control 登录密码。',
    envLocalFile: paths.envLocalFile,
    adminPassword: password,
  };
}

export function resetMissionPassword(length = 20): MissionCredentialsResult {
  const paths = getMissionPaths();
  if (!fs.existsSync(paths.envLocalFile)) {
    const boot = bootstrapMissionControl();
    if (!boot.success) {
      return {
        success: false,
        message: boot.message,
        envLocalFile: paths.envLocalFile,
      };
    }
  }
  const envMap = parseEnvFile(paths.envLocalFile);
  envMap.ADMIN_PASSWORD = randomPassword(length);
  if (!envMap.AUTH_SECRET) {
    envMap.AUTH_SECRET = randomSecret();
  }
  writeEnvFile(paths.envLocalFile, envMap);
  return {
    success: true,
    message: 'Mission Control 登录密码已重置。',
    envLocalFile: paths.envLocalFile,
    adminPassword: envMap.ADMIN_PASSWORD,
  };
}

export function startMissionControl(options: { port?: number; prod?: boolean } = {}): MissionActionResult {
  const status = getMissionStatus();
  const port = options.port ?? getMissionPort();
  const mode: MissionRunMode = options.prod ? 'prod' : 'dev';

  if (!status.installed) {
    return { success: false, message: 'Mission Control 未安装，请先执行 install。' };
  }
  if (status.running) {
    return { success: false, message: `Mission Control 已在运行 (PID: ${status.pid ?? '-'}, Mode: ${status.runMode ?? 'unknown'})` };
  }

  const portPid = checkPortListening(port);
  if (portPid !== null) {
    return { success: false, message: `端口 ${port} 已被进程 ${portPid} 占用，请先释放端口或更换端口。` };
  }

  const paths = getMissionPaths();
  ensureStateDir(paths);

  const envResult = ensureMissionEnv(paths);
  if (!envResult.success) return envResult;

  return spawnMission(mode, port, paths);
}

export function stopMissionControl(port = getMissionPort()): MissionActionResult {
  const paths = getMissionPaths();
  const meta = readMeta(paths.metaFile);
  const pidFromFile = readPid(paths.pidFile);
  const portPid = checkPortListening(port);
  const managedPid = meta?.pid ?? pidFromFile;

  if (!managedPid) {
    if (portPid !== null) {
      return {
        success: false,
        message: `端口 ${port} 正被进程 ${portPid} 使用，但并非 Guard 管理的 Mission Control 进程，已拒绝停止。`,
      };
    }
    removeRuntimeFiles(paths);
    return { success: true, message: 'Mission Control 当前未运行。' };
  }

  killPid(managedPid);
  for (let i = 0; i < 20; i++) {
    sleepMs(300);
    if (!processExists(managedPid) && checkPortListening(port) === null) {
      removeRuntimeFiles(paths);
      return { success: true, message: 'Mission Control 已停止。' };
    }
  }

  if (detectPlatform() === 'windows') {
    runCommand('taskkill', ['/PID', String(managedPid), '/T', '/F'], undefined, 10000);
  } else {
    runCommand('kill', ['-9', String(managedPid)], undefined, 10000);
  }

  sleepMs(500);
  if (!processExists(managedPid) && checkPortListening(port) === null) {
    removeRuntimeFiles(paths);
    return { success: true, message: 'Mission Control 已强制停止。' };
  }

  return { success: false, message: '停止 Mission Control 失败，请手动检查进程。' };
}

export function restartMissionControl(options: { port?: number; prod?: boolean } = {}): MissionActionResult {
  const port = options.port ?? getMissionPort();
  const stop = stopMissionControl(port);
  if (!stop.success) return stop;
  return startMissionControl(options);
}

export function getMissionLogs(lines = 200): string[] {
  const paths = getMissionPaths();
  const logs = tailLines(paths.logFile, lines);
  if (logs.length > 0) return logs;
  return ['(Mission Control logs are empty)'];
}

export async function getMissionHealth(timeoutMs = 5000): Promise<MissionHealthResult> {
  const status = getMissionStatus();
  if (!status.running) {
    return { success: false, reachable: false, error: 'Mission Control is not running.' };
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(status.healthUrl, { signal: controller.signal });
    clearTimeout(timer);
    const raw = await res.text();
    let body: unknown = raw;
    try {
      body = JSON.parse(raw);
    } catch {
      // keep plain text body
    }
    return {
      success: true,
      reachable: res.ok || res.status < 500,
      statusCode: res.status,
      body,
    };
  } catch (error: any) {
    return {
      success: false,
      reachable: false,
      error: error?.message || String(error),
    };
  }
}
