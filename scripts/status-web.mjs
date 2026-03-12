import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function resolveCliInvocation(subcommandArgs) {
  const distEntry = path.join(rootDir, 'dist', 'index.js');
  if (fs.existsSync(distEntry)) {
    return {
      command: process.execPath,
      args: [distEntry, 'web-status', ...subcommandArgs],
    };
  }

  const tsxCli = path.join(rootDir, 'node_modules', 'tsx', 'dist', 'cli.mjs');
  const srcEntry = path.join(rootDir, 'src', 'index.ts');
  if (fs.existsSync(tsxCli) && fs.existsSync(srcEntry)) {
    return {
      command: process.execPath,
      args: [tsxCli, srcEntry, 'web-status', ...subcommandArgs],
    };
  }

  throw new Error('No runnable Guard CLI entry was found. Run npm install first.');
}

function printHelp() {
  console.log(`OpenClaw Guard Web status launcher

Usage:
  node scripts/status-web.mjs [--port 18088] [--lang zh|en] [--json]

What it does:
  1. Delegates status rendering to the core web-status CLI
  2. Reuses the shared WebBackgroundReport and localized summary output
`);
}

function main() {
  const forwardedArgs = process.argv.slice(2);
  if (forwardedArgs.includes('--help') || forwardedArgs.includes('-h')) {
    printHelp();
    return;
  }

  const invocation = resolveCliInvocation(forwardedArgs);
  const result = spawnSync(invocation.command, invocation.args, {
    cwd: rootDir,
    stdio: 'inherit',
    shell: false,
    windowsHide: true,
    env: process.env,
  });
  if (result.error) {
    throw result.error;
  }
  if (typeof result.status === 'number' && result.status !== 0) {
    process.exit(result.status);
  }
}

try {
  main();
} catch (error) {
  console.error(`[status-web] ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
