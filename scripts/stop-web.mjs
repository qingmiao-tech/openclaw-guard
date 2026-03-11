import { execFileSync, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const nodeBin = process.execPath;

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
  console.log(`OpenClaw Guard Web stop launcher

Usage:
  node scripts/stop-web.mjs [--port 18088]

What it does:
  1. Stop the Guard Web background instance for the target port
  2. Wait for the managed process to exit
  3. Print the final status so you can confirm it is no longer running
`);
}

function runCommand(command, args) {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    stdio: 'inherit',
    shell: false,
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`Command failed: ${[command, ...args].join(' ')}`);
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

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const portArgs = ['--port', String(options.port)];
  const before = readStatus(options.port);
  if (before?.running) {
    console.log(`[INFO] Guard Web detected on port ${before.port} (PID ${before.pid}). Stopping it now...`);
  } else {
    console.log(`[INFO] No Guard Web is currently managed on port ${options.port}.`);
  }

  runCommand(nodeBin, ['scripts/web-background.mjs', 'stop', ...portArgs]);
  console.log('');
  console.log('[INFO] Current status:');
  runCommand(nodeBin, ['scripts/web-background.mjs', 'status', ...portArgs]);
}

try {
  main();
} catch (error) {
  console.error(`[stop-web] ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
