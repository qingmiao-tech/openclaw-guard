import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const isWindows = process.platform === 'win32';

function run(command, args) {
  return new Promise((resolve) => {
    const actualCommand = isWindows ? 'cmd.exe' : command;
    const actualArgs = isWindows ? ['/d', '/s', '/c', [command, ...args].join(' ')] : args;
    const child = spawn(actualCommand, actualArgs, {
      cwd: rootDir,
      stdio: 'inherit',
      shell: false,
      windowsHide: true,
    });

    child.on('error', (error) => {
      resolve({ code: null, error });
    });

    child.on('exit', (code) => {
      resolve({ code, error: null });
    });
  });
}

async function runBuiltVersion(webArgs) {
  console.warn('[Guard] Using Windows-safe dev mode: build + node dist.');
  const buildResult = await run(isWindows ? 'npm.cmd' : 'npm', ['run', 'build']);
  if ((buildResult.code ?? 1) !== 0) {
    process.exit(buildResult.code ?? 1);
  }

  const nodeResult = await run(process.execPath, ['dist/index.js', ...webArgs]);
  process.exit(nodeResult.code ?? 0);
}

async function main() {
  const args = process.argv.slice(2);
  const webArgs = args.length > 0 ? args : ['web', '--port', '18088'];

  if (isWindows) {
    await runBuiltVersion(webArgs);
    return;
  }

  console.log('[Guard] Trying tsx dev runner...');
  const tsxResult = await run('npx', ['tsx', 'src/index.ts', ...webArgs]);

  if ((tsxResult.code ?? 1) === 0 && !tsxResult.error) {
    process.exit(0);
  }

  console.warn('[Guard] tsx dev runner is unavailable on this machine. Falling back to build + node dist.');
  if (tsxResult.error) {
    console.warn(`[Guard] tsx error: ${tsxResult.error}`);
  } else {
    console.warn(`[Guard] tsx exited with code ${tsxResult.code}.`);
  }

  await runBuiltVersion(webArgs);
}

main().catch((error) => {
  console.error('[Guard] dev runner failed:', error);
  process.exit(1);
});
