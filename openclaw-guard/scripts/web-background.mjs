import fs from 'node:fs';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const runtimeDir = path.join(rootDir, '.guard-runtime');
const pidFile = path.join(runtimeDir, 'guard-web.pid.json');
const outLog = path.join(runtimeDir, 'guard-web.out.log');
const errLog = path.join(runtimeDir, 'guard-web.err.log');
const portRetryWindow = 10;

function ensureRuntimeDir() {
  fs.mkdirSync(runtimeDir, { recursive: true });
}

function readPidRecord() {
  if (!fs.existsSync(pidFile)) return null;
  try {
    return JSON.parse(fs.readFileSync(pidFile, 'utf-8'));
  } catch {
    return null;
  }
}

function writePidRecord(record) {
  ensureRuntimeDir();
  fs.writeFileSync(pidFile, JSON.stringify(record, null, 2), 'utf-8');
}

function clearPidRecord() {
  if (fs.existsSync(pidFile)) fs.unlinkSync(pidFile);
}

function isPidAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function listListeningSockets() {
  try {
    if (process.platform === 'win32') {
      const output = execFileSync('netstat', ['-ano'], { encoding: 'utf-8', windowsHide: true });
      const rows = [];
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

    const output = execFileSync('lsof', ['-nP', '-iTCP', '-sTCP:LISTEN'], { encoding: 'utf-8' });
    const rows = [];
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

function findPidByPort(port) {
  const entry = listListeningSockets().find((item) => item.port === port);
  return entry ? entry.pid : null;
}

function findPortsByPid(pid) {
  const ports = listListeningSockets()
    .filter((item) => item.pid === pid)
    .map((item) => item.port);
  return [...new Set(ports)].sort((a, b) => a - b);
}

function resolvePortForPid(pid, preferredPort) {
  const ports = findPortsByPid(pid);
  if (!ports.length) return null;
  const preferred = ports.find((port) => port >= preferredPort && port <= preferredPort + portRetryWindow);
  return preferred ?? ports[0];
}

function killPid(pid) {
  try {
    if (process.platform === 'win32') {
      execFileSync('taskkill', ['/PID', String(pid), '/T', '/F'], { encoding: 'utf-8', windowsHide: true });
      return true;
    }
    process.kill(pid, 'SIGTERM');
    return true;
  } catch {
    return false;
  }
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function capturePortSnapshot(basePort) {
  const snapshot = new Map();
  for (let current = basePort; current <= basePort + portRetryWindow; current += 1) {
    const pid = findPidByPort(current);
    if (pid) snapshot.set(current, pid);
  }
  return snapshot;
}

function findNewPortBinding(basePort, beforeSnapshot) {
  for (let current = basePort; current <= basePort + portRetryWindow; current += 1) {
    const pid = findPidByPort(current);
    if (!pid) continue;
    if (!beforeSnapshot.has(current) || beforeSnapshot.get(current) !== pid) {
      return { pid, port: current };
    }
  }
  return null;
}

function resolveLaunchCommand(port) {
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

  throw new Error('No runnable Guard Web entry was found. Run npm install and npm run build first.');
}

function launchBackgroundProcess(port) {
  ensureRuntimeDir();
  const launch = resolveLaunchCommand(port);
  const outFd = fs.openSync(outLog, 'a');
  const errFd = fs.openSync(errLog, 'a');
  const child = spawn(launch.command, launch.args, {
    cwd: launch.cwd,
    detached: true,
    stdio: ['ignore', outFd, errFd],
    windowsHide: true,
    env: {
      ...process.env,
      OPENCLAW_GUARD_BACKGROUND: '1',
    },
  });
  child.unref();
  return child.pid;
}

function getStatus(port) {
  const record = readPidRecord();
  if (record?.pid) {
    if (isPidAlive(record.pid)) {
      const fallbackPort = record.port || port;
      const actualPort = resolvePortForPid(record.pid, fallbackPort) ?? fallbackPort;
      return { running: true, pid: record.pid, port: actualPort, source: 'pid-file', managed: true };
    }

    const pidFromRecordedPort = findPidByPort(record.port || port);
    if (pidFromRecordedPort) {
      return { running: true, pid: pidFromRecordedPort, port: record.port || port, source: 'pid-file', managed: true };
    }

    clearPidRecord();
  }

  const portPid = findPidByPort(port);
  if (portPid) {
    return { running: true, pid: portPid, port, source: 'port-scan', managed: false };
  }

  return { running: false, pid: null, port, source: 'none', managed: false };
}

function start(port) {
  const status = getStatus(port);
  if (status.running) {
    console.log(`Guard Web already running: PID ${status.pid}, port ${status.port} (${status.source})`);
    process.exit(0);
  }

  const startedAt = new Date().toISOString();
  const beforeSnapshot = capturePortSnapshot(port);
  let pid = null;
  try {
    pid = launchBackgroundProcess(port);
  } catch (error) {
    console.error(`Guard Web background start failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }

  for (let index = 0; index < 40; index += 1) {
    sleep(500);

    if (pid) {
      const actualPort = resolvePortForPid(pid, port);
      if (actualPort) {
        writePidRecord({ pid, port: actualPort, managed: true, startedAt });
        console.log(`Guard Web background started: http://localhost:${actualPort} (PID ${pid})`);
        console.log(`Logs: ${outLog}`);
        process.exit(0);
      }
      if (index >= 3 && !isPidAlive(pid)) break;
      continue;
    }

    const binding = findNewPortBinding(port, beforeSnapshot);
    if (binding) {
      writePidRecord({ pid: binding.pid, port: binding.port, managed: true, startedAt });
      console.log(`Guard Web background started: http://localhost:${binding.port} (PID ${binding.pid})`);
      console.log(`Logs: ${outLog}`);
      process.exit(0);
    }
  }

  clearPidRecord();
  console.error('Guard Web background start timed out. Check logs for details.');
  process.exit(1);
}

function stop(port) {
  const status = getStatus(port);
  if (!status.running || !status.pid) {
    console.log('当前没有检测到 Guard Web 后台服务。');
    process.exit(0);
  }

  if (!killPid(status.pid)) {
    console.error(`停止失败: PID ${status.pid}`);
    process.exit(1);
  }

  clearPidRecord();
  console.log(`已停止 Guard Web 后台服务: PID ${status.pid}`);
}

function printStatus(port) {
  const status = getStatus(port);
  console.log(JSON.stringify({ ...status, pidFile }, null, 2));
}

function resolvePortArg(args) {
  let resolved = 18088;
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--port') {
      const next = Number(args[index + 1]);
      if (Number.isFinite(next) && next > 0) resolved = next;
      index += 1;
    }
  }
  return resolved;
}

const args = process.argv.slice(2);
const command = args[0] || 'status';
const port = resolvePortArg(args);

if (command === 'start') {
  start(port);
} else if (command === 'stop') {
  stop(port);
} else if (command === 'status') {
  printStatus(port);
} else {
  console.error('Usage: node scripts/web-background.mjs <start|stop|status> [--port 18088]');
  process.exit(1);
}
