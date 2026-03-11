import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const runtimeDir = path.join(rootDir, '.guard-runtime');
const pidFile = path.join(runtimeDir, 'guard-web.pid.json');
const outLog = path.join(runtimeDir, 'guard-web.out.log');
const errLog = path.join(runtimeDir, 'guard-web.err.log');
const nodeBin = process.execPath;

function parseArgs(argv) {
  const args = {
    port: 18088,
    help: false,
    json: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];
    if ((current === '--port' || current === '-p') && argv[i + 1]) {
      args.port = Number(argv[++i]) || 18088;
      continue;
    }
    if (current === '--json') {
      args.json = true;
      continue;
    }
    if (current === '--help' || current === '-h') {
      args.help = true;
    }
  }

  return args;
}

function printHelp() {
  console.log(`OpenClaw Guard Web status launcher

Usage:
  node scripts/status-web.mjs [--port 18088] [--json]

What it does:
  1. Read the current Guard Web background state
  2. Show whether the target port is running
  3. Print the current URL, PID, pid file and log locations
  4. Optionally return the raw JSON result with --json
`);
}

function readStatus(port) {
  const output = execFileSync(nodeBin, ['scripts/web-background.mjs', 'status', '--port', String(port)], {
    cwd: rootDir,
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const text = output.trim();
  const jsonStart = text.indexOf('{');
  if (jsonStart === -1) {
    throw new Error('Guard Web status output is not valid JSON.');
  }
  return JSON.parse(text.slice(jsonStart));
}

function printLines(lines) {
  for (const line of lines) {
    console.log(line);
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const status = readStatus(options.port);
  if (options.json) {
    console.log(JSON.stringify(status, null, 2));
    return;
  }

  const pidFileExists = fs.existsSync(pidFile);
  const outLogExists = fs.existsSync(outLog);
  const errLogExists = fs.existsSync(errLog);

  if (!status.running) {
    printLines([
      '[INFO] 当前未检测到 Guard Web 后台服务。',
      `[INFO] 目标端口: ${options.port}`,
      `[INFO] PID 记录文件: ${pidFile}${pidFileExists ? '' : '（当前不存在）'}`,
      `[INFO] 输出日志: ${outLog}${outLogExists ? '' : '（当前不存在）'}`,
      `[INFO] 错误日志: ${errLog}${errLogExists ? '' : '（当前不存在）'}`,
      '[INFO] 如需启动，可执行 start-web.bat / start-web.sh / start-web.command',
    ]);
    return;
  }

  const managedText = status.managed ? '是' : '否（当前为端口探测结果）';
  const sourceText = status.source === 'pid-file' ? 'PID 记录文件' : status.source === 'port-scan' ? '端口扫描' : status.source;
  printLines([
    '[INFO] Guard Web 正在后台运行。',
    `[INFO] 当前地址: http://127.0.0.1:${status.port}/`,
    `[INFO] 工作台地址: http://127.0.0.1:${status.port}/workbench`,
    `[INFO] 监听端口: ${status.port}`,
    `[INFO] 进程 PID: ${status.pid}`,
    `[INFO] 是否由虾护卫托管: ${managedText}`,
    `[INFO] 状态来源: ${sourceText}`,
    `[INFO] PID 记录文件: ${status.pidFile || pidFile}`,
    `[INFO] 输出日志: ${outLog}${outLogExists ? '' : '（当前不存在）'}`,
    `[INFO] 错误日志: ${errLog}${errLogExists ? '' : '（当前不存在）'}`,
  ]);
}

try {
  main();
} catch (error) {
  console.error(`[status-web] ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
