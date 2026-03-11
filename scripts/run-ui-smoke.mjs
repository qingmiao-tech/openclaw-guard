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
    suite: 'all',
    lang: 'both',
    keepRunning: false,
    password: '',
    help: false,
    extra: [],
  };

  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];
    if (current === '--port' && argv[i + 1]) {
      args.port = Number(argv[++i]) || 18088;
      continue;
    }
    if (current === '--suite' && argv[i + 1]) {
      args.suite = argv[++i];
      continue;
    }
    if (current === '--lang' && argv[i + 1]) {
      args.lang = argv[++i];
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
  console.log(`OpenClaw Guard UI 一键校验

用法:
  npm run ui:smoke:with-web -- [--suite all|basic|interactions] [--lang zh|en|both] [--port 18088] [--password <pwd>] [--keep-running] [--headed]

说明:
  1. 默认先构建 Guard
  2. 如果目标端口没有正在运行的 Guard Web，会临时以 GUARD_NO_AUTH=1 启动后台服务
  3. 依次执行基础 smoke 与交互 smoke
  4. 如果服务是本脚本临时拉起的，结束后会自动关闭

示例:
  npm run ui:smoke:with-web
  npm run ui:smoke:with-web -- --suite interactions --lang zh
  npm run ui:smoke:with-web -- --password your-guard-password --keep-running
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
  runCommand(nodeBin, ['scripts/web-background.mjs', 'start', '--port', String(port)], {
    env: {
      ...process.env,
      GUARD_NO_AUTH: '1',
    },
  });
}

function stopBackground(port) {
  try {
    runCommand(nodeBin, ['scripts/web-background.mjs', 'stop', '--port', String(port)]);
  } catch {
    // 停止阶段不再抛出，避免覆盖主失败原因
  }
}

function buildPythonArgs(scriptName, options, url) {
  const args = [path.join('scripts', scriptName), '--url', url, '--lang', options.lang, ...options.extra];
  if (options.password) {
    args.push('--password', options.password);
  }
  return args;
}

function runSuites(options, url) {
  const runners = [];
  if (options.suite === 'all' || options.suite === 'basic') {
    runners.push(buildPythonArgs('guard-ui-smoke.py', options, url));
  }
  if (options.suite === 'all' || options.suite === 'interactions') {
    runners.push(buildPythonArgs('guard-ui-interactions.py', options, url));
  }
  for (const args of runners) {
    runCommand('python', args, {
      env: {
        ...process.env,
        PYTHONUTF8: '1',
      },
    });
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  const url = `http://127.0.0.1:${options.port}/`;
  const statusBefore = readStatus(options.port);
  const shouldStart = !statusBefore?.running;

  runCommand(npmBin, ['run', 'build']);

  if (shouldStart) {
    console.log(`[guard-ui-smoke] Starting temporary Guard Web on port ${options.port} with GUARD_NO_AUTH=1`);
    startBackground(options.port);
  } else {
    console.log(`[guard-ui-smoke] Reusing existing Guard Web on port ${statusBefore.port || options.port}`);
  }

  try {
    runSuites(options, url);
  } finally {
    if (shouldStart && !options.keepRunning) {
      console.log('[guard-ui-smoke] Stopping temporary Guard Web');
      stopBackground(options.port);
    }
  }
}

try {
  main();
} catch (error) {
  console.error(`[guard-ui-smoke] ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
