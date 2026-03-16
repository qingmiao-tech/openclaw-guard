#!/usr/bin/env node
import fs from 'node:fs';
import { Command } from 'commander';
import chalk from 'chalk';
import { getAuthStatus, getInitialPasswordRecord } from './auth.js';
import { runFullAudit, type AuditResult } from './audit.js';
import { applyProfile, getProfile, PROFILES } from './profiles.js';
import { generateHardenScript, getAllHardenSteps } from './harden.js';
import { detectPlatform, getCurrentUser, getOpenClawDir, getHomeDir } from './platform.js';
import { detectOpenClaw, getOpenClawTargets, runOpenClawTask, type OpenClawTaskMode } from './openclaw.js';
import { getConfigPath, getEnvPath, readAllEnv, readEnvValue, writeEnvValue, getDashboardUrl } from './config.js';
import { getChannels, getFeishuConfig, saveFeishuConfig, checkFeishuPlugin, type FeishuConfig } from './channels.js';
import { getAIConfig, setPrimaryModel, setFallbackModels, PROVIDERS as AI_PROVIDERS } from './models.js';
import { getServiceStatus, startService, stopService, restartService, getLogs, runServiceActionTask, type ServiceActionName } from './service-mgr.js';
import { startServer } from './server.js';
import { getDashboardOverview, captureSessionOverview, getRecentActivity } from './dashboard.js';
import { getAgentCatalog, getManagedRoots, listManagedFiles, readManagedFile, writeManagedFile, listMemoryFiles, searchManagedFiles } from './workspace-files.js';
import { getCronOverview, enableCronJob, disableCronJob, runCronJob, removeCronJob, createCronJob, updateCronJob, type CronJobInput } from './cron-ui.js';
import { getGitSyncStatus, initGitSync, connectGitRemote, saveGitTokenAuth, checkGitRemotePrivate, commitGitSync, pushGitSync, syncGitSync, startOAuthLogin } from './git-sync.js';
import { summarizeCosts } from './costs.js';
import { getCachePrewarmStatus, runCachePrewarm } from './cache-prewarm.js';
import { getGuardRestartStatus, runGuardRestartTask, scheduleGuardRestart } from './guard-restart.js';
import { getGuardSelfStatus, getGuardSelfUpdateState, runGuardSelfUpdateTask, scheduleGuardSelfUpdate } from './guard-self-update.js';
import { formatMachineInitResult, runMachineInit } from './machine-init.js';
import { formatWebBackgroundReport, getWebBackgroundReport, getWebBackgroundStatus, startWebBackgroundService, stopWebBackgroundService } from './web-background.js';

function rewriteTargetVersionArg(argv: string[]): string[] {
  const nextArgv = [...argv];
  const rewriteAfter = (anchor: string) => {
    const anchorIndex = nextArgv.indexOf(anchor);
    if (anchorIndex === -1) return;
    const versionIndex = nextArgv.indexOf('--version', anchorIndex + 1);
    if (versionIndex !== -1) {
      nextArgv[versionIndex] = '--target-version';
    }
  };
  rewriteAfter('rollback');
  rewriteAfter('openclaw-task');
  return nextArgv;
}

process.argv.splice(0, process.argv.length, ...rewriteTargetVersionArg(process.argv));

const program = new Command();

function printJson(data: unknown) {
  console.log(JSON.stringify(data, null, 2));
}

function printAction(result: { success: boolean; message: string }) {
  console.log(result.success ? chalk.green(result.message) : chalk.red(result.message));
}

function parseOptionalNumber(value?: string): number | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function buildCronInputFromCli(opts: Record<string, unknown>, jobId?: string): CronJobInput {
  return {
    jobId,
    name: typeof opts.name === 'string' ? opts.name : undefined,
    description: typeof opts.description === 'string' ? opts.description : undefined,
    agentId: typeof opts.agentId === 'string' ? opts.agentId : undefined,
    prompt: typeof opts.prompt === 'string' ? opts.prompt : undefined,
    scheduleMode: typeof opts.scheduleMode === 'string' ? opts.scheduleMode as CronJobInput['scheduleMode'] : 'cron',
    scheduleValue: typeof opts.scheduleValue === 'string' ? opts.scheduleValue : '',
    enabled: typeof opts.enabled === 'boolean' ? opts.enabled : undefined,
    timezone: typeof opts.timezone === 'string' ? opts.timezone : undefined,
    model: typeof opts.model === 'string' ? opts.model : undefined,
    thinking: typeof opts.thinking === 'string' ? opts.thinking as CronJobInput['thinking'] : undefined,
    session: typeof opts.session === 'string' ? opts.session as CronJobInput['session'] : undefined,
    wake: typeof opts.wake === 'string' ? opts.wake as CronJobInput['wake'] : undefined,
    timeoutMs: parseOptionalNumber(typeof opts.timeoutMs === 'string' ? opts.timeoutMs : undefined),
    timeoutSeconds: parseOptionalNumber(typeof opts.timeoutSeconds === 'string' ? opts.timeoutSeconds : undefined),
    stagger: typeof opts.stagger === 'string' ? opts.stagger : undefined,
    announce: typeof opts.announce === 'boolean' ? opts.announce : undefined,
    bestEffortDeliver: typeof opts.bestEffortDeliver === 'boolean' ? opts.bestEffortDeliver : undefined,
    deleteAfterRun: typeof opts.deleteAfterRun === 'boolean' ? opts.deleteAfterRun : undefined,
  };
}

function printAuditSummary(results: AuditResult[]) {
  const grouped = new Map<string, AuditResult[]>();
  for (const item of results) {
    const group = grouped.get(item.category) || [];
    group.push(item);
    grouped.set(item.category, group);
  }

  let pass = 0;
  let warn = 0;
  let fail = 0;

  console.log(chalk.bold('\nOpenClaw Guard 安全审计\n'));
  for (const [category, items] of grouped) {
    console.log(chalk.bold(category));
    for (const item of items) {
      const badge = item.status === 'pass' ? chalk.green('PASS') : item.status === 'warn' ? chalk.yellow('WARN') : chalk.red('FAIL');
      console.log(`  ${badge} ${item.item}`);
      console.log(`    ${item.message}`);
      if (item.fix) console.log(chalk.dim(`    修复建议: ${item.fix}`));
      if (item.status === 'pass') pass += 1;
      if (item.status === 'warn') warn += 1;
      if (item.status === 'fail') fail += 1;
    }
    console.log('');
  }

  console.log(chalk.bold(`汇总: PASS ${pass} / WARN ${warn} / FAIL ${fail}`));
}

function getCliVersion(): string {
  try {
    const packageJsonPath = new URL('../package.json', import.meta.url);
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as { version?: string };
    if (typeof packageJson.version === 'string' && packageJson.version.trim()) {
      return packageJson.version.trim();
    }
  } catch {
    // Fall back to the current public release line if package metadata is unavailable.
  }
  return '0.9.3';
}

program
  .name('openclaw-guard')
  .description('OpenClaw Guard：安全审计、配置管理、原生工作台与备份恢复中心')
  .version(getCliVersion());

program.command('audit')
  .description('运行安全审计')
  .option('--json', '输出 JSON')
  .action((opts: { json?: boolean }) => {
    const results = runFullAudit();
    if (opts.json) {
      printJson(results);
      return;
    }
    printAuditSummary(results);
  });

const profileCmd = program.command('profile').description('安全预设管理');
profileCmd.command('list').description('列出可用预设').action(() => {
  console.log(chalk.bold('\n可用 Profile\n'));
  for (const [key, profile] of Object.entries(PROFILES)) {
    console.log(`${chalk.bold(key)} - ${profile.name} ${profile.riskLevel}`);
    console.log(`  ${profile.description}`);
    for (const item of profile.recommendations) {
      console.log(`  - ${item}`);
    }
    console.log('');
  }
});
profileCmd.command('show <name>').description('查看预设详情').action((name: string) => {
  const profile = getProfile(name);
  if (!profile) {
    console.log(chalk.red(`未找到 Profile: ${name}`));
    return;
  }
  printJson(profile);
});
profileCmd.command('apply <name>').description('应用预设').option('-c, --config <path>', '配置文件路径').action((name: string, opts: { config?: string }) => {
  printAction(applyProfile(name, opts.config));
});

program.command('harden')
  .description('生成系统加固脚本')
  .option('-p, --platform <platform>', '指定平台')
  .option('-o, --output <file>', '输出到文件')
  .option('--steps', '只显示加固步骤')
  .action((opts: { platform?: string; output?: string; steps?: boolean }) => {
    const platform = (opts.platform || detectPlatform()) as 'windows' | 'macos' | 'linux';
    if (opts.steps) {
      printJson(getAllHardenSteps().map((item) => ({
        ...item,
        commands: item.commands[platform],
      })));
      return;
    }
    const script = generateHardenScript(platform);
    if (opts.output) {
      fs.writeFileSync(opts.output, script, 'utf-8');
      console.log(chalk.green(`已输出到 ${opts.output}`));
      return;
    }
    console.log(script);
  });

program.command('info').description('查看系统与 OpenClaw 基础信息').action(() => {
  const openclaw = detectOpenClaw();
  console.log(chalk.bold('\n系统信息\n'));
  console.log(`平台: ${detectPlatform()}`);
  console.log(`用户: ${getCurrentUser()}`);
  console.log(`Home: ${getHomeDir()}`);
  console.log(`OpenClaw 目录: ${getOpenClawDir()}`);
  console.log(`配置文件: ${getConfigPath()}`);
  console.log(`env 文件: ${getEnvPath()}`);
  console.log(`Node.js: ${process.version}`);
  console.log(`架构: ${process.arch}`);
  console.log('');
  console.log(chalk.bold('OpenClaw 状态'));
  console.log(`已安装: ${openclaw.installed ? `是 (${openclaw.version || 'unknown'})` : '否'}`);
  console.log(`最新版本: ${openclaw.latestVersion || '-'}`);
  console.log(`安装路径: ${openclaw.binPath || '-'}`);
  console.log(`检测来源: ${openclaw.detectedSource}`);
  console.log(`托管前缀: ${openclaw.managedPrefix}`);
});

const authCmd = program.command('auth').description('本机访问密码与登录状态');
authCmd.command('status').description('查看访问密码是否已初始化').option('--json', '输出 JSON').action((opts: { json?: boolean }) => {
  const status = getAuthStatus();
  if (opts.json) {
    printJson(status);
    return;
  }
  console.log(chalk.bold('\nGuard Auth 状态\n'));
  console.log(`鉴权启用: ${status.enabled ? '是' : '否'}`);
  console.log(`已初始化密码: ${status.configured ? '是' : '否'}`);
  console.log(`初始化密码可回看: ${status.initialPasswordAvailable ? '是' : '否'}`);
  console.log(`本机查看命令: ${status.revealCommand}`);
  if (status.initialPasswordCreatedAt) {
    console.log(`初始化时间: ${status.initialPasswordCreatedAt}`);
  }
});
authCmd.command('show-password').description('显示当前仍可回看的初始化密码').option('--json', '输出 JSON').action((opts: { json?: boolean }) => {
  const status = getAuthStatus();
  const record = getInitialPasswordRecord();
  const result = !status.enabled
    ? {
        success: false,
        available: false,
        message: '当前已关闭鉴权（GUARD_NO_AUTH=1），无需访问密码。',
        revealCommand: status.revealCommand,
      }
    : !status.configured
      ? {
          success: false,
          available: false,
          message: '当前还没有初始化访问密码。请先启动 Guard Web 或运行 init-machine。',
          revealCommand: status.revealCommand,
        }
      : !record
        ? {
            success: false,
            available: false,
            message: '当前环境没有可回看的初始化密码记录。通常表示密码已经被修改，或该环境早于此功能创建。',
            revealCommand: status.revealCommand,
          }
        : {
            success: true,
            available: true,
            password: record.password,
            createdAt: record.createdAt,
            message: '这是当前仍可回看的初始化密码。建议登录后尽快改成你自己的密码。',
            revealCommand: status.revealCommand,
          };

  if (opts.json) {
    printJson(result);
    if (!result.success) process.exitCode = 1;
    return;
  }

  if (!result.success) {
    console.log(chalk.yellow(`\n${result.message}\n`));
    process.exitCode = 1;
    return;
  }

  console.log(chalk.bold('\nGuard 初始访问密码\n'));
  console.log(`密码: ${result.password}`);
  console.log(`生成时间: ${result.createdAt}`);
  console.log(`说明: ${result.message}\n`);
});

const openclawCmd = program.command('openclaw').description('OpenClaw 生命周期管理');
openclawCmd.command('status').description('查看 OpenClaw 状态').option('--json', '输出 JSON').action((opts: { json?: boolean }) => {
  const status = detectOpenClaw({ bypassCache: true });
  if (opts.json) {
    printJson(status);
    return;
  }
  console.log(chalk.bold('\nOpenClaw 状态\n'));
  console.log(`已安装: ${status.installed ? '是' : '否'}`);
  console.log(`当前版本: ${status.version || '-'}`);
  console.log(`最新版本: ${status.latestVersion || '-'}`);
  console.log(`更新方式: ${status.effectiveUpdater}`);
  console.log(`安装类型: ${status.installKind}`);
  console.log(`渠道: ${status.updateChannel || '-'}`);
  console.log(`路径: ${status.binPath || '-'}`);
  if (status.lastHistoryEntry) {
    console.log(`最近动作: ${status.lastHistoryEntry.kind} @ ${status.lastHistoryEntry.finishedAt}`);
  }
});
openclawCmd.command('targets').description('查看可用更新目标和回退目标').option('--json', '输出 JSON').action((opts: { json?: boolean }) => {
  const targets = getOpenClawTargets();
  if (opts.json) {
    printJson(targets);
    return;
  }
  console.log(chalk.bold('\nOpenClaw 目标目录\n'));
  console.log(`安装类型: ${targets.installKind}`);
  console.log(`更新方式: ${targets.effectiveUpdater}`);
  console.log(`渠道: ${targets.channels.join(', ')}`);
  if (targets.quickRollbackTarget) {
    console.log(`快速回退: ${targets.quickRollbackTarget.label}`);
  }
  if (targets.packageVersions.length) {
    console.log(`可选版本: ${targets.packageVersions.slice(0, 8).join(', ')}`);
  }
  if (targets.recentGitTags.length) {
    console.log(`近期标签: ${targets.recentGitTags.slice(0, 8).join(', ')}`);
  }
});
openclawCmd.command('update').description('更新 OpenClaw').option('--channel <channel>', 'stable | beta | dev').option('--tag <tag>', '指定版本或 dist-tag').option('--no-restart', '跳过自动重启').option('--dry-run', '只预演，不真正更新').option('--json', '输出 JSON').action((opts: { channel?: string; tag?: string; restart?: boolean; dryRun?: boolean; json?: boolean }) => {
  const result = runOpenClawTask('update', {
    channel: opts.channel === 'stable' || opts.channel === 'beta' || opts.channel === 'dev' ? opts.channel : undefined,
    tag: opts.tag,
    restart: opts.restart,
    dryRun: opts.dryRun,
  });
  if (opts.json) {
    printJson({ success: result.phase === 'completed', action: result, status: detectOpenClaw({ bypassCache: true }) });
    return;
  }
  printAction({ success: result.phase === 'completed', message: result.message || (result.phase === 'completed' ? '更新完成。' : '更新失败。') });
  if (result.error) console.log(chalk.dim(result.error));
});
openclawCmd.command('rollback').description('回退 OpenClaw').option('--target-version <version>', 'package 安装回退到指定版本（兼容 --version）').option('--history-id <id>', '使用 Guard 历史记录回退').option('--ref <gitRef>', 'git 检出回退到指定 ref/tag/sha').option('--date <date>', 'git 检出回退到指定日期前的提交').option('--no-restart', '跳过自动重启').option('--dry-run', '只预演，不真正回退').option('--json', '输出 JSON').action((opts: { targetVersion?: string; historyId?: string; ref?: string; date?: string; restart?: boolean; dryRun?: boolean; json?: boolean }) => {
  const result = runOpenClawTask('rollback', {
    version: opts.targetVersion,
    historyId: opts.historyId,
    gitRef: opts.ref,
    gitDate: opts.date,
    restart: opts.restart,
    dryRun: opts.dryRun,
  });
  if (opts.json) {
    printJson({ success: result.phase === 'completed', action: result, status: detectOpenClaw({ bypassCache: true }) });
    return;
  }
  printAction({ success: result.phase === 'completed', message: result.message || (result.phase === 'completed' ? '回退完成。' : '回退失败。') });
  if (result.error) console.log(chalk.dim(result.error));
});
openclawCmd.command('uninstall').description('彻底卸载当前检测到的 OpenClaw 程序文件').option('--dry-run', '只预演，不真正卸载').option('--json', '输出 JSON').action((opts: { dryRun?: boolean; json?: boolean }) => {
  const result = runOpenClawTask('uninstall', {
    dryRun: opts.dryRun,
  });
  if (opts.json) {
    printJson({ success: result.phase === 'completed', action: result, status: detectOpenClaw({ bypassCache: true }) });
    return;
  }
  printAction({ success: result.phase === 'completed', message: result.message || (result.phase === 'completed' ? '卸载完成。' : '卸载失败。') });
  if (result.error) console.log(chalk.dim(result.error));
});

const serviceCmd = program.command('service').description('Gateway 服务管理');
serviceCmd.command('status').description('查看服务状态').action(() => printJson(getServiceStatus()));
serviceCmd.command('start').description('启动 Gateway').action(() => printAction(startService()));
serviceCmd.command('stop').description('停止 Gateway').action(() => printAction(stopService()));
serviceCmd.command('restart').description('重启 Gateway').action(() => printAction(restartService()));
serviceCmd.command('logs').description('查看 Gateway 日志').option('-n, --lines <n>', '显示行数', '50').action((opts: { lines: string }) => {
  getLogs(Number(opts.lines || 50)).forEach((line) => console.log(line));
});

const channelCmd = program.command('channel').description('渠道配置概览');
channelCmd.command('list').description('列出所有渠道').action(() => printJson(getChannels()));
channelCmd.command('show <id>').description('查看指定渠道').action((id: string) => {
  const channel = getChannels().find((item) => item.id === id);
  if (!channel) {
    console.log(chalk.red(`未找到渠道: ${id}`));
    return;
  }
  printJson(channel);
});

const feishuCmd = program.command('feishu').description('飞书插件配置');
feishuCmd.command('status').description('查看飞书状态').action(() => {
  printJson({ config: getFeishuConfig(), plugin: checkFeishuPlugin() });
});
feishuCmd.command('setup').description('设置飞书参数')
  .option('--app-id <id>')
  .option('--app-secret <secret>')
  .option('--encrypt-key <key>')
  .option('--verification-token <token>')
  .option('--domain <domain>', 'feishu / lark', 'feishu')
  .option('--mode <mode>', 'websocket / webhook', 'websocket')
  .option('--streaming', '开启流式')
  .option('--no-streaming', '关闭流式')
  .option('--whisper-model <model>', 'Whisper 模型')
  .action((opts: Record<string, unknown>) => {
    const cfg: FeishuConfig = {};
    if (typeof opts.appId === 'string') cfg.appId = opts.appId;
    if (typeof opts.appSecret === 'string') cfg.appSecret = opts.appSecret;
    if (typeof opts.encryptKey === 'string') cfg.encryptKey = opts.encryptKey;
    if (typeof opts.verificationToken === 'string') cfg.verificationToken = opts.verificationToken;
    if (typeof opts.domain === 'string') cfg.domain = opts.domain;
    if (typeof opts.mode === 'string') cfg.connectionMode = opts.mode;
    if (typeof opts.streaming === 'boolean') cfg.streaming = opts.streaming;
    if (typeof opts.whisperModel === 'string') cfg.whisperModel = opts.whisperModel;
    printAction(saveFeishuConfig(cfg));
  });

const aiCmd = program.command('ai').description('AI 模型配置');
aiCmd.command('status').description('查看当前 AI 配置').action(() => printJson(getAIConfig()));
aiCmd.command('providers').description('查看预设 Provider').action(() => printJson(AI_PROVIDERS));
aiCmd.command('set-primary <modelId>').description('设置主模型').action((modelId: string) => printAction(setPrimaryModel(modelId)));
aiCmd.command('set-fallbacks <modelIds>').description('设置回退模型，多个用逗号分隔').action((modelIds: string) => {
  printAction(setFallbackModels(modelIds.split(',').map((item) => item.trim()).filter(Boolean)));
});
aiCmd.command('clear-fallbacks').description('清空回退链').action(() => printAction(setFallbackModels([])));

const envCmd = program.command('env').description('本地 env 文件管理');
envCmd.command('list').description('列出所有 env').action(() => printJson(readAllEnv()));
envCmd.command('get <key>').description('读取 env').action((key: string) => {
  const value = readEnvValue(key);
  console.log(value === undefined ? '(not set)' : value);
});
envCmd.command('set <key> <value>').description('写入 env').action((key: string, value: string) => {
  writeEnvValue(key, value);
  console.log(chalk.green(`已保存 ${key}`));
});

program.command('dashboard').description('查看 Guard 工作台概览').option('--json', '输出 JSON').action((opts: { json?: boolean }) => {
  const overview = getDashboardOverview();
  if (opts.json) {
    printJson(overview);
    return;
  }
  console.log(chalk.bold('\nGuard 概览\n'));
  console.log(`平台: ${overview.platform}`);
  console.log(`用户: ${overview.user}`);
  console.log(`Gateway: ${overview.gateway.running ? '运行中' : '未运行'} (port ${overview.gateway.port})`);
  console.log(`Agent: ${overview.agents.total}`);
  console.log(`会话: ${overview.sessions.active}/${overview.sessions.total}`);
  console.log(`内存文件: ${overview.memoryFiles}`);
  console.log(`未读通知: ${overview.notifications.unread}`);
});

const agentsCmd = program.command('agents').description('Agent 工作台');
agentsCmd.command('list').description('列出 Agent').option('--json', '输出 JSON').action((opts: { json?: boolean }) => {
  const agents = getAgentCatalog();
  if (opts.json) {
    printJson(agents);
    return;
  }
  console.log(chalk.bold('\nAgent 列表\n'));
  for (const agent of agents) {
    console.log(`${agent.isDefault ? '*' : ' '} ${agent.id} - ${agent.name}`);
    console.log(`  workspace: ${agent.workspace}`);
    console.log(`  model: ${agent.modelId || '-'}`);
  }
});

const sessionsCmd = program.command('sessions').description('会话工作台');
sessionsCmd.command('list').description('查看运行态会话').option('--json', '输出 JSON').action((opts: { json?: boolean }) => {
  const overview = captureSessionOverview();
  if (opts.json) {
    printJson(overview.snapshot.sessions);
    return;
  }
  console.log(chalk.bold('\n会话列表\n'));
  if (overview.snapshot.sessions.length === 0) {
    console.log('(暂无会话)');
    return;
  }
  for (const session of overview.snapshot.sessions) {
    console.log(`${session.id} [${session.status}] ${session.agentId} -> ${session.modelId}`);
    console.log(`  tokens: ${session.usage.totalTokens} (in=${session.usage.inputTokens}, out=${session.usage.outputTokens})`);
  }
});

const activityCmd = program.command('activity').description('活动时间线');
activityCmd.command('list').description('查看最近活动').option('-n, --limit <n>', '数量', '20').option('--json', '输出 JSON').action((opts: { limit: string; json?: boolean }) => {
  const events = getRecentActivity(Number(opts.limit || 20));
  if (opts.json) {
    printJson(events);
    return;
  }
  console.log(chalk.bold('\n最近活动\n'));
  if (events.length === 0) {
    console.log('(暂无活动)');
    return;
  }
  for (const event of events) {
    console.log(`${event.createdAt} ${event.type} ${event.title}`);
    console.log(`  ${event.description}`);
  }
});

const filesCmd = program.command('files').description('受控工作区文件管理');
filesCmd.command('roots').description('列出受控根目录').action(() => printJson(getManagedRoots()));
filesCmd.command('list').description('列出目录内容').option('-p, --path <path>', '目录路径').option('--json', '输出 JSON').action((opts: { path?: string; json?: boolean }) => {
  const entries = listManagedFiles(opts.path);
  if (opts.json) {
    printJson(entries);
    return;
  }
  entries.forEach((entry) => console.log(`${entry.isDirectory ? '[DIR]' : '     '} ${entry.path}`));
});
filesCmd.command('read <path>').description('读取文件').option('--json', '输出 JSON').action((filePath: string, opts: { json?: boolean }) => {
  const data = readManagedFile(filePath);
  if (opts.json) {
    printJson(data);
    return;
  }
  console.log(data.content);
  if (data.truncated) console.log(chalk.yellow('\n[文件较大，以上内容已截断预览]'));
});
filesCmd.command('write <path>').description('写入文件').requiredOption('--content <content>', '文件内容').action((filePath: string, opts: { content: string }) => {
  printAction(writeManagedFile(filePath, opts.content));
});

const memoryCmd = program.command('memory').description('记忆文件工作台');
memoryCmd.command('list').description('列出记忆类文件').option('--json', '输出 JSON').action((opts: { json?: boolean }) => {
  const files = listMemoryFiles();
  if (opts.json) {
    printJson(files);
    return;
  }
  if (files.length === 0) {
    console.log('(暂无记忆文件)');
    return;
  }
  for (const file of files) {
    console.log(`${file.agentId} ${file.type} ${file.path}`);
  }
});

program.command('search <query>').description('跨工作区全文搜索').option('-n, --limit <n>', '数量', '50').option('--json', '输出 JSON').action((query: string, opts: { limit: string; json?: boolean }) => {
  const results = searchManagedFiles(query, Number(opts.limit || 50));
  if (opts.json) {
    printJson(results);
    return;
  }
  if (results.length === 0) {
    console.log('(未找到结果)');
    return;
  }
  for (const item of results) {
    console.log(`${item.path}:${item.line}`);
    console.log(`  ${item.preview}`);
  }
});

const costsCmd = program.command('costs').description('成本统计');
costsCmd.command('show').description('查看当前成本概览').option('--json', '输出 JSON').action((opts: { json?: boolean }) => {
  const summary = summarizeCosts(captureSessionOverview().snapshot);
  if (opts.json) {
    printJson(summary);
    return;
  }
  console.log(chalk.bold('\n成本概览\n'));
  console.log(`总成本: ${summary.totalEstimatedCost.toFixed(6)}`);
  console.log(`总 Tokens: ${summary.totalTokens}`);
  console.log(`按模型: ${summary.byModel.length} 项`);
  console.log(`按 Agent: ${summary.byAgent.length} 项`);
});

const cronCmd = program.command('cron-ui').description('Cron 管理');
cronCmd.command('list').description('列出定时任务').option('--json', '输出 JSON').action((opts: { json?: boolean }) => {
  const data = getCronOverview();
  if (opts.json) {
    printJson(data);
    return;
  }
  if (data.jobs.length === 0) {
    console.log('(暂无定时任务)');
    return;
  }
  for (const job of data.jobs) {
    console.log(`${job.id} ${job.enabled ? '[enabled]' : '[disabled]'} ${job.schedule}`);
    console.log(`  agent=${job.agentId} prompt=${job.prompt}`);
  }
});
cronCmd.command('create').description('创建定时任务')
  .requiredOption('--schedule-mode <mode>', 'cron | every | at')
  .requiredOption('--schedule-value <value>', 'cron 表达式、every 持续时间或 at 时间')
  .requiredOption('--prompt <text>', '任务消息')
  .option('--name <name>', '任务名称')
  .option('--description <text>', '任务描述')
  .option('--agent-id <id>', 'Agent ID')
  .option('--enabled', '创建后启用')
  .option('--disabled', '创建后保持停用')
  .option('--timezone <iana>', '时区')
  .option('--model <model>', '模型覆盖')
  .option('--thinking <level>', 'off|minimal|low|medium|high')
  .option('--session <target>', 'main|isolated')
  .option('--wake <mode>', 'now|next-heartbeat')
  .option('--timeout-ms <ms>', '超时毫秒')
  .option('--timeout-seconds <n>', '超时秒数')
  .option('--stagger <duration>', '抖动窗口，例如 30s/5m；填 0 表示 exact')
  .option('--announce', '推送摘要到聊天')
  .option('--best-effort-deliver', '投递失败不阻断任务')
  .option('--delete-after-run', '一次性任务执行成功后删除')
  .action((opts: Record<string, unknown>) => {
    const enabled = opts.disabled ? false : (opts.enabled ? true : undefined);
    printAction(createCronJob(buildCronInputFromCli({ ...opts, enabled })));
  });
cronCmd.command('edit <jobId>').description('编辑定时任务')
  .requiredOption('--schedule-mode <mode>', 'cron | every | at')
  .requiredOption('--schedule-value <value>', 'cron 表达式、every 持续时间或 at 时间')
  .option('--prompt <text>', '任务消息')
  .option('--name <name>', '任务名称')
  .option('--description <text>', '任务描述')
  .option('--agent-id <id>', 'Agent ID；留空会清空绑定')
  .option('--enable', '启用任务')
  .option('--disable', '停用任务')
  .option('--timezone <iana>', '时区')
  .option('--model <model>', '模型覆盖')
  .option('--thinking <level>', 'off|minimal|low|medium|high')
  .option('--session <target>', 'main|isolated')
  .option('--wake <mode>', 'now|next-heartbeat')
  .option('--timeout-ms <ms>', '超时毫秒')
  .option('--timeout-seconds <n>', '超时秒数')
  .option('--stagger <duration>', '抖动窗口，例如 30s/5m；填 0 表示 exact')
  .option('--announce', '开启摘要投递')
  .option('--no-announce', '关闭摘要投递')
  .option('--best-effort-deliver', '投递失败不阻断任务')
  .option('--no-best-effort-deliver', '投递失败视为失败')
  .option('--delete-after-run', '一次性任务执行成功后删除')
  .option('--keep-after-run', '一次性任务执行成功后保留')
  .action((jobId: string, opts: Record<string, unknown>) => {
    const enabled = opts.enable ? true : (opts.disable ? false : undefined);
    const deleteAfterRun = opts.keepAfterRun ? false : (typeof opts.deleteAfterRun === 'boolean' ? opts.deleteAfterRun : undefined);
    printAction(updateCronJob(buildCronInputFromCli({
      ...opts,
      enabled,
      deleteAfterRun,
    }, jobId)));
  });
cronCmd.command('enable <jobId>').description('启用定时任务').action((jobId: string) => printAction(enableCronJob(jobId)));
cronCmd.command('disable <jobId>').description('停用定时任务').action((jobId: string) => printAction(disableCronJob(jobId)));
cronCmd.command('run <jobId>').description('手动触发定时任务').action((jobId: string) => printAction(runCronJob(jobId)));
cronCmd.command('remove <jobId>').description('删除定时任务').action((jobId: string) => printAction(removeCronJob(jobId)));

const gitSyncCmd = program.command('git-sync').description('备份与恢复控制台（含高级 Git 能力）');
gitSyncCmd.command('status').description('查看备份与恢复状态').option('--json', '输出 JSON').action((opts: { json?: boolean }) => {
  const status = getGitSyncStatus();
  if (opts.json) {
    printJson(status);
    return;
  }
  console.log(chalk.bold('\n备份与恢复状态\n'));
  console.log(`仓库目录: ${status.repoPath}`);
  console.log(`已初始化: ${status.repoInitialized ? '是' : '否'}`);
  console.log(`远程仓库: ${status.remoteUrl || '-'}`);
  console.log(`Provider: ${status.provider || '-'}`);
  console.log(`远程页面: ${status.remoteWebUrl || '-'}`);
  console.log(`认证账号: ${status.accountUsername || '-'}`);
  console.log(`私有仓: ${status.repoPrivate === true ? '已确认' : status.repoPrivate === false ? '否' : '未校验'}`);
  console.log(`认证: ${status.authConfigured ? `已配置 (${status.authMode})` : '未配置'}`);
  console.log(`本地变更: ${status.changedFiles.length}`);
  console.log(`可本地提交: ${status.canCommit ? '是' : '否'}`);
  console.log(`可远程推送: ${status.canPush ? '是' : '否'}`);
  console.log(`可一键同步: ${status.canSync ? '是' : '否'}`);
  if (status.commitReasons.length) {
    console.log(chalk.yellow(`提交阻断: ${status.commitReasons.join('；')}`));
  }
  if (status.pushReasons.length) {
    console.log(chalk.yellow(`推送阻断: ${status.pushReasons.join('；')}`));
  }
  if (status.reasons.length) {
    console.log(chalk.yellow(`阻断原因: ${status.reasons.join('；')}`));
  }
});
gitSyncCmd.command('init').description('初始化 .openclaw 保护仓库').action(() => printAction(initGitSync()));
gitSyncCmd.command('connect').description('绑定远程私有仓库')
  .requiredOption('--remote-url <url>', '远程仓库地址')
  .option('--provider <provider>', 'github | gitee')
  .option('--remote-name <name>', '远程名', 'origin')
  .action((opts: { remoteUrl: string; provider?: string; remoteName?: string }) => {
    printAction(connectGitRemote({
      provider: opts.provider === 'github' || opts.provider === 'gitee' ? opts.provider : undefined,
      remoteUrl: opts.remoteUrl,
      remoteName: opts.remoteName,
    }));
  });
const gitAuthCmd = gitSyncCmd.command('auth').description('云端保护认证管理');
gitAuthCmd.command('token').description('保存 HTTPS Token')
  .requiredOption('--token <token>', 'HTTPS Token')
  .option('--provider <provider>', 'github | gitee')
  .option('--username <username>', 'Gitee 建议填写用户名')
  .action((opts: { token: string; provider?: string; username?: string }) => {
    printAction(saveGitTokenAuth({
      provider: opts.provider === 'github' || opts.provider === 'gitee' ? opts.provider : undefined,
      token: opts.token,
      username: opts.username,
    }));
  });
gitAuthCmd.command('login').description('通过浏览器发起 OAuth 授权')
  .requiredOption('--provider <provider>', 'github | gitee')
  .requiredOption('--client-id <clientId>', 'OAuth Client ID')
  .requiredOption('--client-secret <clientSecret>', 'OAuth Client Secret')
  .option('--scope <scope>', '授权范围')
  .option('--redirect-port <port>', '本地回调端口')
  .action(async (opts: { provider: string; clientId: string; clientSecret: string; scope?: string; redirectPort?: string }) => {
    if (opts.provider !== 'github' && opts.provider !== 'gitee') {
      console.log(chalk.red('provider 仅支持 github 或 gitee'));
      return;
    }
    const result = await startOAuthLogin({
      provider: opts.provider,
      clientId: opts.clientId,
      clientSecret: opts.clientSecret,
      scope: opts.scope,
      redirectPort: opts.redirectPort ? Number(opts.redirectPort) : undefined,
    });
    printAction(result);
  });
gitSyncCmd.command('check').description('校验远程仓库是否 private').action(async () => printAction(await checkGitRemotePrivate()));
gitSyncCmd.command('commit').description('提交当前保护点（高级 Git）')
  .option('-m, --message <message>', '提交说明')
  .action((opts: { message?: string }) => printAction(commitGitSync(opts.message)));
gitSyncCmd.command('push').description('推送到远程 private 仓库').action(() => printAction(pushGitSync()));
gitSyncCmd.command('sync').description('提交并推送当前保护点')
  .option('-m, --message <message>', '提交说明')
  .action((opts: { message?: string }) => printAction(syncGitSync(opts.message)));

program.command('init-machine')
  .description('初始化当前机器的 Guard 运行环境')
  .option('--install-openclaw', '安装或修复 OpenClaw CLI')
  .option('--start-web', '在完成初始化后启动 Guard Web')
  .option('-p, --port <port>', 'Guard Web 端口', '18088')
  .option('--managed-prefix <path>', '指定 Guard 托管 npm 前缀')
  .option('--json', '输出 JSON')
  .option('--dry-run', '只预演步骤，不写入系统')
  .action(async (opts: {
    installOpenclaw?: boolean;
    startWeb?: boolean;
    port?: string;
    managedPrefix?: string;
    json?: boolean;
    dryRun?: boolean;
  }) => {
    const result = await runMachineInit({
      installOpenClaw: opts.installOpenclaw === true,
      startWeb: opts.startWeb === true,
      port: Number(opts.port || 18088),
      managedPrefix: opts.managedPrefix,
      dryRun: opts.dryRun === true,
    });
    if (opts.json) {
      printJson(result);
      if (!result.ok) process.exitCode = 1;
      return;
    }
    console.log(formatMachineInitResult(result));
    if (result.auth.initializedNow) {
      const record = getInitialPasswordRecord();
      if (record) {
        console.log('');
        console.log(chalk.yellow('[Guard] 首次启动访问密码'));
        console.log(`  密码: ${record.password}`);
        console.log(`  稍后查看: ${result.auth.revealCommand}`);
        console.log('  建议首次登录后尽快通过「修改密码」换成你自己的密码。');
      }
    }
    if (!result.ok) process.exitCode = 1;
  });

program.command('web').description('启动 Web 管理界面').option('-p, --port <port>', '端口', '18088').action((opts: { port: string }) => {
  startServer(Number(opts.port || 18088));
});

program.command('web-status')
  .description('查看 Guard Web 后台运行报告')
  .option('-p, --port <port>', '端口', '18088')
  .option('--lang <lang>', 'zh | en', 'zh')
  .option('--json', '输出 JSON')
  .action((opts: { port?: string; lang?: string; json?: boolean }) => {
    const report = getWebBackgroundReport(Number(opts.port || 18088));
    if (opts.json) {
      printJson(report);
      return;
    }
    const lang = opts.lang === 'en' ? 'en' : 'zh';
    console.log(formatWebBackgroundReport(report, lang));
  });

const webBackgroundCmd = program.command('web-background').description('内部 Guard Web 后台运行管理');
webBackgroundCmd.command('status')
  .description('查看原始后台状态')
  .option('-p, --port <port>', '端口', '18088')
  .option('--json', '输出 JSON')
  .action((opts: { port?: string; json?: boolean }) => {
    const status = getWebBackgroundStatus(Number(opts.port || 18088));
    if (opts.json) {
      printJson(status);
      return;
    }
    printJson(status);
  });
webBackgroundCmd.command('report')
  .description('查看标准后台状态报告')
  .option('-p, --port <port>', '端口', '18088')
  .option('--json', '输出 JSON')
  .action((opts: { port?: string; json?: boolean }) => {
    const report = getWebBackgroundReport(Number(opts.port || 18088));
    if (opts.json) {
      printJson(report);
      return;
    }
    printJson(report);
  });
webBackgroundCmd.command('start')
  .description('启动 Guard Web 后台服务')
  .option('-p, --port <port>', '端口', '18088')
  .option('--current-pid <pid>', '当前 Guard Web PID')
  .option('--json', '输出 JSON')
  .action(async (opts: { port?: string; currentPid?: string; json?: boolean }) => {
    const beforeAuthStatus = getAuthStatus();
    const result = await startWebBackgroundService({
      port: Number(opts.port || 18088),
      currentPid: parseOptionalNumber(opts.currentPid),
    });
    if (opts.json) {
      printJson(result);
      return;
    }
    printAction(result);
    const afterAuthStatus = getAuthStatus();
    const initializedNow = !beforeAuthStatus.configured && afterAuthStatus.initialPasswordAvailable;
    if (result.success && initializedNow) {
      const record = getInitialPasswordRecord();
      if (record) {
        console.log('');
        console.log(chalk.yellow('[Guard] 首次启动访问密码'));
        console.log(`  密码: ${record.password}`);
        console.log(`  稍后查看: ${afterAuthStatus.revealCommand}`);
        console.log('  建议首次登录后尽快通过「修改密码」换成你自己的密码。');
      }
    }
  });
webBackgroundCmd.command('stop')
  .description('停止 Guard Web 后台服务')
  .option('-p, --port <port>', '端口', '18088')
  .option('--current-pid <pid>', '当前 Guard Web PID')
  .option('--json', '输出 JSON')
  .action((opts: { port?: string; currentPid?: string; json?: boolean }) => {
    const result = stopWebBackgroundService({
      port: Number(opts.port || 18088),
      currentPid: parseOptionalNumber(opts.currentPid),
    });
    if (opts.json) {
      printJson(result);
      return;
    }
    printAction(result);
  });

const guardCmd = program.command('guard').description('Guard Web 运行管理');
guardCmd.command('status').description('查看 Guard 完整重启状态').action(() => {
  printJson(getGuardRestartStatus());
});
guardCmd.command('restart')
  .description('完整重启 Guard Web，可选联动 Gateway')
  .option('-p, --port <port>', 'Guard Web 端口', '18088')
  .option('--current-pid <pid>', '指定要接管的 Guard Web PID')
  .option('--restart-gateway', '同时重启 Gateway')
  .action((opts: { port?: string; currentPid?: string; restartGateway?: boolean }) => {
    const result = scheduleGuardRestart({
      port: Number(opts.port || 18088),
      currentPid: parseOptionalNumber(opts.currentPid),
      restartGateway: opts.restartGateway === true,
    });
    printAction(result);
  });

const selfCmd = program.command('self').description('Guard 自身版本检测与在线更新');
selfCmd.command('status').description('查看 Guard 当前版本与更新状态').option('--json', '输出 JSON').action((opts: { json?: boolean }) => {
  const status = getGuardSelfStatus({ bypassCache: opts.json === true });
  if (opts.json) {
    printJson(status);
    return;
  }
  console.log(chalk.bold('\nGuard 版本状态\n'));
  console.log(`当前版本: ${status.currentVersion}`);
  console.log(`最新版本: ${status.latestVersion || '-'}`);
  console.log(`安装来源: ${status.installSource}`);
  console.log(`可在线更新: ${status.updateSupported ? '是' : '否'}`);
  console.log(`下一步: ${status.nextAction}`);
  if (status.updateCommand) {
    console.log(`建议命令: ${status.updateCommand}`);
  }
});
selfCmd.command('update')
  .description('在线更新 Guard 自身（仅 npm 全局安装支持）')
  .option('-p, --port <port>', 'Guard Web 端口', '18088')
  .option('--current-pid <pid>', '指定要接管的 Guard Web PID')
  .option('--target-version <version>', '指定 Guard 目标版本，默认 latest')
  .option('--dry-run', '只预演，不真正更新')
  .option('--json', '输出 JSON')
  .action((opts: { port?: string; currentPid?: string; targetVersion?: string; dryRun?: boolean; json?: boolean }) => {
    const result = scheduleGuardSelfUpdate({
      port: Number(opts.port || 18088),
      currentPid: parseOptionalNumber(opts.currentPid),
      targetVersion: opts.targetVersion,
      dryRun: opts.dryRun,
    });
    if (opts.json) {
      printJson(result);
      return;
    }
    printAction(result);
    if (!result.success && result.action?.error) {
      console.log(chalk.dim(result.action.error));
    }
  });

program.command('cache-prewarm')
  .description('执行 Guard 缓存预热')
  .option('--trigger <trigger>', '预热触发来源', 'manual')
  .option('--json', '输出 JSON 状态')
  .action((opts: { trigger?: string; json?: boolean }) => {
    const status = runCachePrewarm(opts.trigger || 'manual');
    if (opts.json) {
      printJson(status);
      return;
    }
    const summary = getCachePrewarmStatus();
    const phaseLabel = summary.phase === 'completed' ? '完成' : summary.phase === 'error' ? '完成但有异常' : summary.phase;
    console.log(chalk.bold('\nGuard 缓存预热\n'));
    console.log(`状态: ${phaseLabel}`);
    console.log(`触发来源: ${summary.trigger || '-'}`);
    console.log(`PID: ${summary.pid || '-'}`);
    console.log(`开始时间: ${summary.startedAt || '-'}`);
    console.log(`结束时间: ${summary.finishedAt || '-'}`);
    console.log(`耗时: ${summary.lastDurationMs ?? '-'} ms`);
    if (summary.lastError) {
      console.log(chalk.yellow(`首个异常: ${summary.lastError}`));
    }
    console.log('');
    for (const task of summary.tasks) {
      const badge = task.success === true ? chalk.green('OK') : task.success === false ? chalk.red('ERR') : chalk.gray('PENDING');
      console.log(`${badge} ${task.label} (${task.durationMs ?? '-'} ms)`);
      if (task.error) {
        console.log(chalk.dim(`    ${task.error}`));
      }
    }
  });

program.command('service-task')
  .description('执行后台 Gateway 运维任务')
  .requiredOption('--action <action>', 'start / stop / restart')
  .option('--json', '输出 JSON 状态')
  .action((opts: { action: string; json?: boolean }) => {
    const action = opts.action === 'start' || opts.action === 'stop' || opts.action === 'restart'
      ? opts.action as ServiceActionName
      : null;
    if (!action) {
      const errorResult = {
        success: false,
        message: `Unsupported action: ${opts.action}`,
      };
      if (opts.json) {
        printJson(errorResult);
        return;
      }
      console.log(chalk.red(errorResult.message));
      process.exitCode = 1;
      return;
    }

    const result = runServiceActionTask(action);
    if (opts.json) {
      printJson(result);
      return;
    }

    const ok = result.phase === 'completed';
    const message = result.message || (ok ? '后台任务已完成。' : '后台任务执行失败。');
    console.log(ok ? chalk.green(message) : chalk.red(message));
    if (result.error) {
      console.log(chalk.dim(result.error));
    }
    if (!ok) process.exitCode = 1;
  });

program.command('openclaw-task')
  .description('执行后台 OpenClaw 安装任务')
  .requiredOption('--mode <mode>', 'install / update / rollback / uninstall')
  .option('--managed-prefix <path>', '指定 Guard 托管 npm 前缀')
  .option('--channel <channel>', 'stable | beta | dev')
  .option('--tag <tag>', '指定版本或 dist-tag')
  .option('--target-version <version>', 'package 安装回退到指定版本（兼容 --version）')
  .option('--history-id <id>', '使用 Guard 历史记录回退')
  .option('--ref <gitRef>', 'git 检出回退到指定 ref/tag/sha')
  .option('--date <date>', 'git 检出回退到指定日期前的提交')
  .option('--no-restart', '跳过自动重启')
  .option('--dry-run', '只预演，不真正执行')
  .option('--json', '输出 JSON 状态')
  .action((opts: { mode: string; managedPrefix?: string; channel?: string; tag?: string; targetVersion?: string; historyId?: string; ref?: string; date?: string; restart?: boolean; dryRun?: boolean; json?: boolean }) => {
    const mode = opts.mode === 'install' || opts.mode === 'update' || opts.mode === 'rollback' || opts.mode === 'uninstall'
      ? opts.mode as OpenClawTaskMode
      : null;
    if (!mode) {
      const errorResult = {
        success: false,
        message: `Unsupported mode: ${opts.mode}`,
      };
      if (opts.json) {
        printJson(errorResult);
        return;
      }
      console.log(chalk.red(errorResult.message));
      process.exitCode = 1;
      return;
    }

    const result = runOpenClawTask(mode, {
      channel: opts.channel === 'stable' || opts.channel === 'beta' || opts.channel === 'dev' ? opts.channel : undefined,
      tag: opts.tag,
      version: opts.targetVersion,
      historyId: opts.historyId,
      gitRef: opts.ref,
      gitDate: opts.date,
      restart: opts.restart,
      dryRun: opts.dryRun,
    }, { managedPrefix: opts.managedPrefix });
    if (opts.json) {
      printJson(result);
      return;
    }

    const ok = result.phase === 'completed';
    const message = result.message || (ok ? '后台安装任务已完成。' : '后台安装任务执行失败。');
    console.log(ok ? chalk.green(message) : chalk.red(message));
    if (result.error) {
      console.log(chalk.dim(result.error));
    }
    if (!ok) process.exitCode = 1;
  });

program.command('guard-task')
  .description('执行后台 Guard 完整重启任务')
  .requiredOption('--port <port>', 'Guard Web 端口')
  .option('--current-pid <pid>', '当前 Guard Web PID')
  .option('--restart-gateway', '同时重启 Gateway')
  .option('--json', '输出 JSON 状态')
  .action(async (opts: { port: string; currentPid?: string; restartGateway?: boolean; json?: boolean }) => {
    const port = Number(opts.port);
    if (!Number.isFinite(port) || port <= 0) {
      const errorResult = {
        success: false,
        message: `Unsupported port: ${opts.port}`,
      };
      if (opts.json) {
        printJson(errorResult);
        return;
      }
      console.log(chalk.red(errorResult.message));
      process.exitCode = 1;
      return;
    }

    const result = await runGuardRestartTask({
      port,
      currentPid: parseOptionalNumber(opts.currentPid),
      restartGateway: opts.restartGateway === true,
    });

    if (opts.json) {
      printJson(result);
      return;
    }

    const ok = result.phase === 'completed';
    const message = result.message || (ok ? 'Guard 重启任务已完成。' : 'Guard 重启任务执行失败。');
    console.log(ok ? chalk.green(message) : chalk.red(message));
    if (result.error) {
      console.log(chalk.dim(result.error));
    }
    if (!ok) process.exitCode = 1;
  });

program.command('self-update-task')
  .description('执行后台 Guard 自更新任务')
  .requiredOption('--port <port>', 'Guard Web 端口')
  .option('--current-pid <pid>', '当前 Guard Web PID')
  .option('--target-version <version>', '指定 Guard 目标版本，默认 latest')
  .option('--dry-run', '只预演，不真正更新')
  .option('--json', '输出 JSON 状态')
  .action(async (opts: { port: string; currentPid?: string; targetVersion?: string; dryRun?: boolean; json?: boolean }) => {
    const port = Number(opts.port);
    if (!Number.isFinite(port) || port <= 0) {
      const errorResult = {
        success: false,
        message: `Unsupported port: ${opts.port}`,
      };
      if (opts.json) {
        printJson(errorResult);
        return;
      }
      console.log(chalk.red(errorResult.message));
      process.exitCode = 1;
      return;
    }

    const result = await runGuardSelfUpdateTask({
      port,
      currentPid: parseOptionalNumber(opts.currentPid),
      targetVersion: opts.targetVersion,
      dryRun: opts.dryRun,
    });

    if (opts.json) {
      printJson(result);
      return;
    }

    const ok = result.phase === 'completed';
    const message = result.message || (ok ? 'Guard 自更新任务已完成。' : 'Guard 自更新任务执行失败。');
    console.log(ok ? chalk.green(message) : chalk.red(message));
    if (result.error) {
      console.log(chalk.dim(result.error));
    }
    if (!ok) process.exitCode = 1;
  });

const keepAliveCommands = new Set(['web']);
const shouldKeepAlive = keepAliveCommands.has(process.argv[2] || '');

program.parseAsync()
  .then(() => {
    if (!shouldKeepAlive) {
      process.exit(process.exitCode ?? 0);
    }
  })
  .catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
