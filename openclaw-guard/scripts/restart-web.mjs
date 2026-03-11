import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const nodeBin = process.execPath;
const npmBin = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function parseArgs(argv) {
  const args = {
    port: 18088,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];
    if ((current === '--port' || current === '-p') && argv[i + 1]) {
      args.port = Number(argv[++i]) || 18088;
      continue;
    }
    if (current === '--help' || current === '-h') {
      args.help = true;
    }
  }

  return args;
}

function printHelp() {
  console.log(`OpenClaw Guard Web restart launcher

Usage:
  node scripts/restart-web.mjs [--port 18088]

What it does:
  1. Install dependencies when node_modules is missing
  2. Stop any existing Guard Web background process on the target port
  3. Build the latest version
  4. Start a fresh Guard Web background instance
  5. Print the final service status and common URLs
`);
}

function runCommand(command, args, options = {}) {
  const isWindowsCmd = process.platform === 'win32' && /\.cmd$/i.test(command);
  const finalCommand = isWindowsCmd ? 'cmd.exe' : command;
  const finalArgs = isWindowsCmd ? ['/d', '/s', '/c', command, ...args] : args;
  const result = spawnSync(finalCommand, finalArgs, {
    cwd: rootDir,
    stdio: 'inherit',
    shell: false,
    env: options.env || process.env,
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`Command failed: ${[finalCommand, ...finalArgs].join(' ')}`);
  }
}

function readStatus(port) {
  try {
    const output = execFileSync(nodeBin, ['scripts/web-background.mjs', 'status', '--port', String(port)], {
      cwd: rootDir,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    const text = output.trim();
    const jsonStart = text.indexOf('{');
    if (jsonStart === -1) return null;
    return JSON.parse(text.slice(jsonStart));
  } catch {
    return null;
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

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function waitForPortRelease(port, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (!findPidByPort(port)) return true;
    sleep(250);
  }
  return !findPidByPort(port);
}

function ensureDependencies() {
  if (!fs.existsSync(path.join(rootDir, 'node_modules'))) {
    console.log('[INFO] node_modules not found. Running npm install...');
    runCommand(npmBin, ['install']);
    console.log('');
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const portArgs = ['--port', String(options.port)];
  const before = readStatus(options.port);

  ensureDependencies();

  if (before?.running) {
    console.log(`[INFO] Existing Guard Web detected on port ${before.port || options.port} (PID ${before.pid}). Restarting it now...`);
  } else {
    console.log(`[INFO] No existing Guard Web detected on port ${options.port}. Starting a fresh instance...`);
  }

  console.log('[INFO] Stopping any existing Guard Web background service...');
  runCommand(nodeBin, ['scripts/web-background.mjs', 'stop', ...portArgs]);
  if (!waitForPortRelease(options.port)) {
    throw new Error(`Port ${options.port} is still occupied after stop. Restart was aborted.`);
  }
  console.log('');

  console.log('[INFO] Building the latest version...');
  runCommand(npmBin, ['run', 'build']);
  console.log('');

  console.log('[INFO] Starting Guard Web background service...');
  runCommand(nodeBin, ['scripts/web-background.mjs', 'start', ...portArgs]);
  console.log('');

  const after = readStatus(options.port);
  if (!after?.running) {
    throw new Error(`Guard Web did not come back on port ${options.port}.`);
  }
  if (Number(after.port) !== Number(options.port)) {
    throw new Error(`Guard Web restarted on unexpected port ${after.port} instead of ${options.port}.`);
  }

  console.log('[INFO] Current status:');
  runCommand(nodeBin, ['scripts/web-background.mjs', 'status', ...portArgs]);
  console.log('');
  console.log('[INFO] Common URLs:');
  console.log(`  http://127.0.0.1:${options.port}/`);
  console.log(`  http://127.0.0.1:${options.port}/workbench`);
}

try {
  main();
} catch (error) {
  console.error(`[restart-web] ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
