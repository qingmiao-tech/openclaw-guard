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

function findPidByPort(port) {
  try {
    if (process.platform === 'win32') {
      const output = execFileSync('netstat', ['-ano'], { encoding: 'utf-8', windowsHide: true });
      for (const line of output.split(/\r?\n/)) {
        if (!line.includes(`:${port}`) || !line.includes('LISTENING')) continue;
        const parts = line.trim().split(/\s+/);
        const pid = Number(parts[parts.length - 1]);
        if (Number.isInteger(pid) && pid > 0) return pid;
      }
      return null;
    }

    const output = execFileSync('lsof', ['-ti', `tcp:${port}`], { encoding: 'utf-8' }).trim();
    const pid = Number(output.split(/\r?\n/)[0]);
    return Number.isInteger(pid) && pid > 0 ? pid : null;
  } catch {
    return null;
  }
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

function getStatus(port) {
  const record = readPidRecord();
  if (record?.pid) {
    if (isPidAlive(record.pid)) {
      return { running: true, pid: record.pid, port: record.port || port, source: 'pid-file', managed: true };
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
    console.log(`Guard Web 已在运行: PID ${status.pid}, port ${status.port} (${status.source})`);
    process.exit(0);
  }

  ensureRuntimeDir();
  const outFd = fs.openSync(outLog, 'a');
  const errFd = fs.openSync(errLog, 'a');
  const child = spawn(process.execPath, ['dist/index.js', 'web', '--port', String(port)], {
    cwd: rootDir,
    detached: true,
    stdio: ['ignore', outFd, errFd],
    windowsHide: true,
    env: {
      ...process.env,
      OPENCLAW_GUARD_BACKGROUND: '1',
    },
  });

  child.unref();
  writePidRecord({ pid: child.pid, port, managed: true, startedAt: new Date().toISOString() });

  for (let index = 0; index < 20; index += 1) {
    sleep(500);
    const current = getStatus(port);
    if (current.running) {
      console.log(`Guard Web 已在后台启动: http://localhost:${current.port} (PID ${current.pid})`);
      console.log(`日志: ${outLog}`);
      process.exit(0);
    }
  }

  console.error('Guard Web 后台启动超时，请查看日志。');
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
  console.log(JSON.stringify(status, null, 2));
}

const args = process.argv.slice(2);
const command = args[0] || 'status';
const portIndex = args.indexOf('--port');
const port = portIndex >= 0 ? Number(args[portIndex + 1]) || 18088 : 18088;

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
