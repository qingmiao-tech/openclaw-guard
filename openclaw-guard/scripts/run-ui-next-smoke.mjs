import { execFileSync, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const nodeBin = process.execPath;
const npmBin = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function parseArgs(argv) {
  const args = {
    port: 18088,
    password: '',
    keepRunning: false,
    help: false,
    extra: [],
  };

  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];
    if (current === '--port' && argv[i + 1]) {
      args.port = Number(argv[++i]) || 18088;
      continue;
    }
    if (current === '--password' && argv[i + 1]) {
      args.password = argv[++i];
      continue;
    }
    if (current === '--keep-running') {
      args.keepRunning = true;
      continue;
    }
    if (current === '--help' || current === '-h') {
      args.help = true;
      continue;
    }
    args.extra.push(current);
  }

  return args;
}

function runCommand(command, args, options = {}) {
  const isWindowsCmd = process.platform === 'win32' && /\.cmd$/i.test(command);
  const finalCommand = isWindowsCmd ? 'cmd.exe' : command;
  const finalArgs = isWindowsCmd ? ['/d', '/s', '/c', command, ...args] : args;
  const result = spawnSync(finalCommand, finalArgs, {
    cwd: rootDir,
    stdio: 'inherit',
    env: options.env || process.env,
    shell: false,
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    const rendered = [finalCommand, ...finalArgs].join(' ');
    throw new Error(`Command failed: ${rendered}`);
  }
}

function printHelp() {
  console.log(`OpenClaw Guard /next smoke runner

Usage:
  npm run ui:smoke:next:with-web -- --password <pwd> [--port 18088] [--keep-running] [--headed]

Notes:
  1. Builds Guard before smoke.
  2. Reuses current Guard Web if already running on target port.
  3. If not running, starts Guard Web on the target port.
  4. Runs dedicated /next smoke (login, route checks, theme/lang, logout).
  5. Stops temporary Guard Web after run unless --keep-running is set.
`);
}

function readStatus(port) {
  try {
    const output = execFileSync(nodeBin, ['scripts/web-background.mjs', 'status', '--port', String(port)], {
      cwd: rootDir,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
      env: process.env,
    });
    const trimmed = output.trim();
    const jsonStart = trimmed.indexOf('{');
    if (jsonStart === -1) return null;
    return JSON.parse(trimmed.slice(jsonStart));
  } catch {
    return null;
  }
}

function startBackground(port) {
  runCommand(nodeBin, ['scripts/web-background.mjs', 'start', '--port', String(port)]);
}

function stopBackground(port) {
  try {
    runCommand(nodeBin, ['scripts/web-background.mjs', 'stop', '--port', String(port)]);
  } catch {
    // Keep original smoke failure if stop command itself fails.
  }
}

function buildSmokeArgs(options, url) {
  const args = [path.join('scripts', 'guard-ui-next-smoke.py'), '--url', url, ...options.extra];
  if (options.password) {
    args.push('--password', options.password);
  }
  return args;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  if (!options.password) {
    throw new Error('Missing required --password for /next smoke login flow.');
  }

  const url = `http://127.0.0.1:${options.port}/next`;
  const statusBefore = readStatus(options.port);
  const shouldStart = !statusBefore?.running;

  runCommand(npmBin, ['run', 'build']);

  if (shouldStart) {
    console.log(`[guard-next-smoke] Starting temporary Guard Web on port ${options.port}`);
    startBackground(options.port);
  } else {
    console.log(`[guard-next-smoke] Reusing existing Guard Web on port ${statusBefore.port || options.port}`);
  }

  try {
    runCommand('python', buildSmokeArgs(options, url), {
      env: {
        ...process.env,
        PYTHONUTF8: '1',
      },
    });
  } finally {
    if (shouldStart && !options.keepRunning) {
      console.log('[guard-next-smoke] Stopping temporary Guard Web');
      stopBackground(options.port);
    }
  }
}

try {
  main();
} catch (error) {
  console.error(`[guard-next-smoke] ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
