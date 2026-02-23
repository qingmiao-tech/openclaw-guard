#!/usr/bin/env node
/**
 * OpenClaw Guard - 权限管理、安全审计、服务管理 CLI
 * 跨平台支持 Windows / macOS / Linux
 */
import { Command } from 'commander';
import chalk from 'chalk';
import { runFullAudit, type AuditResult } from './audit.js';
import { listProfiles, getProfile, applyProfile, PROFILES } from './profiles.js';
import { generateHardenScript, getAllHardenSteps } from './harden.js';
import { detectPlatform, getCurrentUser, getOpenClawDir } from './platform.js';
import { detectOpenClaw } from './openclaw.js';
import { getConfigPath, getEnvPath, loadConfig, readAllEnv, readEnvValue, writeEnvValue, getDashboardUrl } from './config.js';
import { getChannels, getFeishuConfig, saveFeishuConfig, checkFeishuPlugin, type FeishuConfig } from './channels.js';
import { getAIConfig, saveProvider, deleteProvider, setPrimaryModel, PROVIDERS as AI_PROVIDERS } from './models.js';
import { getServiceStatus, startService, stopService, restartService, getLogs } from './service-mgr.js';
import fs from 'node:fs';
import { startServer } from './server.js';

const program = new Command();

program
  .name('openclaw-guard')
  .description('OpenClaw 管理工具 - 安全审计、服务管理、渠道配置')
  .version('2.0.0');

// ========== audit 命令 ==========
program
  .command('audit')
  .description('执行安全审计，检查当前系统的安全状态')
  .option('--json', '以 JSON 格式输出')
  .action((opts) => {
    const results = runFullAudit();
    if (opts.json) { console.log(JSON.stringify(results, null, 2)); return; }

    console.log(chalk.bold('\n🔍 OpenClaw Guard 安全审计报告\n'));
    console.log(`平台: ${detectPlatform()} | 用户: ${getCurrentUser()}`);
    console.log(`时间: ${new Date().toLocaleString()}\n`);

    const grouped = new Map<string, AuditResult[]>();
    for (const r of results) {
      const list = grouped.get(r.category) || [];
      list.push(r);
      grouped.set(r.category, list);
    }

    let passCount = 0, warnCount = 0, failCount = 0;
    for (const [category, items] of grouped) {
      console.log(chalk.bold.underline(`📂 ${category}`));
      for (const item of items) {
        const icon = item.status === 'pass' ? chalk.green('✅') : item.status === 'warn' ? chalk.yellow('⚠️') : chalk.red('❌');
        console.log(`  ${icon} ${item.item}`);
        console.log(`     ${item.message}`);
        if (item.fix) console.log(chalk.dim(`     修复: ${item.fix}`));
        if (item.status === 'pass') passCount++;
        else if (item.status === 'warn') warnCount++;
        else failCount++;
      }
      console.log();
    }

    console.log(chalk.bold('📊 审计摘要'));
    console.log(`  ${chalk.green(`✅ 通过: ${passCount}`)}  ${chalk.yellow(`⚠️ 警告: ${warnCount}`)}  ${chalk.red(`❌ 失败: ${failCount}`)}`);
    if (failCount > 0) console.log(chalk.red('\n⚠️ 存在安全问题，请尽快修复！'));
    else if (warnCount > 0) console.log(chalk.yellow('\n💡 存在可优化项，建议处理。'));
    else console.log(chalk.green('\n🎉 安全状态良好！'));
  });

// ========== profile 命令 ==========
const profileCmd = program.command('profile').description('管理安全配置 Profile');

profileCmd.command('list').description('列出所有可用的安全 Profile').action(() => {
  console.log(chalk.bold('\n📋 可用安全 Profile\n'));
  for (const [key, p] of Object.entries(PROFILES)) {
    console.log(`  ${chalk.bold(key)} - ${p.name} ${p.riskLevel}`);
    console.log(`    ${chalk.dim(p.description)}`);
    for (const r of p.recommendations) console.log(`    ${chalk.dim('•')} ${chalk.dim(r)}`);
    console.log();
  }
});

profileCmd.command('apply <name>').description('应用指定的安全 Profile').option('-c, --config <path>', '指定配置路径').action((name, opts) => {
  const profile = getProfile(name);
  if (!profile) { console.log(chalk.red(`\n❌ 未知的 Profile: ${name}`)); return; }
  console.log(chalk.bold(`\n🔧 应用 Profile: ${profile.name} ${profile.riskLevel}\n`));
  const result = applyProfile(name, opts.config);
  console.log(result.success ? chalk.green(`✅ ${result.message}`) : chalk.red(`❌ ${result.message}`));
});

profileCmd.command('show <name>').description('查看 Profile 详细配置').action((name) => {
  const profile = getProfile(name);
  if (!profile) { console.log(chalk.red(`\n❌ 未知的 Profile: ${name}`)); return; }
  console.log(chalk.bold(`\n📋 Profile: ${profile.name}\n`));
  console.log(`风险等级: ${profile.riskLevel}\n描述: ${profile.description}\n`);
  console.log(chalk.bold('工具配置:'));
  console.log(JSON.stringify(profile.tools, null, 2));
});


// ========== harden 命令 ==========
program.command('harden').description('生成系统安全加固脚本')
  .option('-p, --platform <platform>', '指定平台')
  .option('-o, --output <file>', '输出到文件')
  .option('--steps', '仅显示加固步骤')
  .action((opts) => {
    const platform = opts.platform || detectPlatform();
    if (opts.steps) {
      const steps = getAllHardenSteps();
      console.log(chalk.bold(`\n🛡️ 系统安全加固步骤 (${platform})\n`));
      steps.forEach((step, i) => {
        console.log(`  ${i + 1}. ${chalk.bold(step.title)}${step.optional ? chalk.dim(' （可选）') : ''}`);
        console.log(`     ${chalk.dim(step.description)}`);
        for (const cmd of step.commands[platform as keyof typeof step.commands]) console.log(`       ${chalk.cyan(cmd)}`);
        console.log();
      });
      return;
    }
    const script = generateHardenScript(platform as 'windows' | 'macos' | 'linux');
    if (opts.output) {
      fs.writeFileSync(opts.output, script, 'utf-8');
      console.log(chalk.green(`\n✅ 加固脚本已保存到: ${opts.output}`));
    } else { console.log(script); }
  });

// ========== info 命令 ==========
program.command('info').description('显示当前系统环境信息').action(() => {
  const oc = detectOpenClaw();
  console.log(chalk.bold('\n📊 系统环境信息\n'));
  console.log(`  平台:       ${detectPlatform()}`);
  console.log(`  用户:       ${getCurrentUser()}`);
  console.log(`  Home:       ${process.env.HOME || process.env.USERPROFILE}`);
  console.log(`  OpenClaw:   ${getOpenClawDir()}`);
  console.log(`  配置文件:   ${getConfigPath()}`);
  console.log(`  环境文件:   ${getEnvPath()}`);
  console.log(`  Node.js:    ${process.version}`);
  console.log(`  架构:       ${process.arch}`);
  console.log();
  console.log(chalk.bold('  OpenClaw 状态'));
  console.log(`  已安装:     ${oc.installed ? chalk.green('✅ ' + oc.version) : chalk.red('❌ 未安装')}`);
  if (oc.updateAvailable) console.log(`  可更新:     ${chalk.yellow(oc.latestVersion)}`);
  if (oc.binPath) console.log(`  路径:       ${oc.binPath}`);
});

// ========== service 命令 ==========
const serviceCmd = program.command('service').description('管理 OpenClaw Gateway 服务');

serviceCmd.command('status').description('查看服务状态').action(() => {
  const s = getServiceStatus();
  console.log(chalk.bold('\n⚡ Gateway 服务状态\n'));
  console.log(`  状态:  ${s.running ? chalk.green('🟢 运行中') : chalk.red('🔴 已停止')}`);
  console.log(`  端口:  ${s.port}`);
  if (s.pid) console.log(`  PID:   ${s.pid}`);
  if (s.running) {
    try { console.log(`  面板:  ${getDashboardUrl()}`); } catch {}
  }
});

serviceCmd.command('start').description('启动服务').action(() => {
  console.log(chalk.dim('正在启动 Gateway...'));
  const r = startService();
  console.log(r.success ? chalk.green(`✅ ${r.message}`) : chalk.red(`❌ ${r.message}`));
});

serviceCmd.command('stop').description('停止服务').action(() => {
  console.log(chalk.dim('正在停止 Gateway...'));
  const r = stopService();
  console.log(r.success ? chalk.green(`✅ ${r.message}`) : chalk.red(`❌ ${r.message}`));
});

serviceCmd.command('restart').description('重启服务').action(() => {
  console.log(chalk.dim('正在重启 Gateway...'));
  const r = restartService();
  console.log(r.success ? chalk.green(`✅ ${r.message}`) : chalk.red(`❌ ${r.message}`));
});

serviceCmd.command('logs').description('查看日志').option('-n, --lines <n>', '行数', '50').action((opts) => {
  const logs = getLogs(parseInt(opts.lines, 10));
  for (const line of logs) console.log(line);
});


// ========== channel 命令 ==========
const channelCmd = program.command('channel').description('管理消息渠道配置');

channelCmd.command('list').description('列出所有渠道').action(() => {
  const channels = getChannels();
  console.log(chalk.bold('\n📱 消息渠道\n'));
  for (const ch of channels) {
    const status = ch.enabled ? chalk.green('✅ 已启用') : ch.configured ? chalk.yellow('⚙️ 已配置') : chalk.dim('未配置');
    console.log(`  ${ch.icon} ${chalk.bold(ch.name.padEnd(16))} ${status}`);
  }
  console.log();
});

channelCmd.command('show <id>').description('查看渠道配置').action((id) => {
  const channels = getChannels();
  const ch = channels.find(c => c.id === id);
  if (!ch) { console.log(chalk.red(`\n❌ 未知渠道: ${id}`)); return; }
  console.log(chalk.bold(`\n${ch.icon} ${ch.name}\n`));
  console.log(`  状态: ${ch.enabled ? chalk.green('已启用') : chalk.dim('未启用')}`);
  if (Object.keys(ch.config).length > 0) {
    console.log(chalk.bold('\n  配置:'));
    for (const [k, v] of Object.entries(ch.config)) {
      const display = (k.includes('Secret') || k.includes('Token') || k.includes('Key')) && typeof v === 'string' && v.length > 8
        ? `${v.slice(0, 4)}...${v.slice(-4)}` : String(v);
      console.log(`    ${k}: ${display}`);
    }
  }
});

// ========== feishu 命令 ==========
const feishuCmd = program.command('feishu').description('飞书插件配置');

feishuCmd.command('status').description('查看飞书配置状态').action(() => {
  const cfg = getFeishuConfig();
  const plugin = checkFeishuPlugin();
  console.log(chalk.bold('\n🐦 飞书插件状态\n'));
  console.log(`  插件: ${plugin.installed ? chalk.green('✅ 已安装') : chalk.red('❌ 未安装')}`);
  console.log(`  启用: ${cfg.enabled ? chalk.green('是') : chalk.dim('否')}`);
  if (cfg.appId) console.log(`  App ID: ${cfg.appId}`);
  if (cfg.appSecret) console.log(`  App Secret: ${cfg.appSecret.slice(0, 4)}...${cfg.appSecret.slice(-4)}`);
  if (cfg.domain) console.log(`  域名: ${cfg.domain}`);
  if (cfg.connectionMode) console.log(`  连接模式: ${cfg.connectionMode}`);
  if (cfg.streaming !== undefined) console.log(`  流式卡片: ${cfg.streaming}`);
  if (cfg.renderMode) console.log(`  渲染模式: ${cfg.renderMode}`);
  if (cfg.whisperModel) console.log(`  Whisper 模型: ${cfg.whisperModel}`);
});

feishuCmd.command('setup').description('配置飞书插件密钥')
  .option('--app-id <id>', 'App ID')
  .option('--app-secret <secret>', 'App Secret')
  .option('--encrypt-key <key>', 'Encrypt Key')
  .option('--verification-token <token>', 'Verification Token')
  .option('--domain <domain>', '域名 (feishu/lark)', 'feishu')
  .option('--mode <mode>', '连接模式 (websocket/webhook)', 'websocket')
  .option('--streaming', '启用流式卡片')
  .option('--no-streaming', '禁用流式卡片')
  .option('--whisper-model <model>', 'Whisper 模型大小')
  .action((opts) => {
    const cfg: FeishuConfig = {};
    if (opts.appId) cfg.appId = opts.appId;
    if (opts.appSecret) cfg.appSecret = opts.appSecret;
    if (opts.encryptKey) cfg.encryptKey = opts.encryptKey;
    if (opts.verificationToken) cfg.verificationToken = opts.verificationToken;
    if (opts.domain) cfg.domain = opts.domain;
    if (opts.mode) cfg.connectionMode = opts.mode;
    if (opts.streaming !== undefined) cfg.streaming = opts.streaming;
    if (opts.whisperModel) cfg.whisperModel = opts.whisperModel;

    if (Object.keys(cfg).length === 0) {
      console.log(chalk.yellow('\n请提供至少一个配置项，例如:'));
      console.log(chalk.dim('  openclaw-guard feishu setup --app-id cli_xxx --app-secret xxx'));
      return;
    }

    const result = saveFeishuConfig(cfg);
    console.log(result.success ? chalk.green(`\n✅ ${result.message}`) : chalk.red(`\n❌ ${result.message}`));
  });

// ========== ai 命令 ==========
const aiCmd = program.command('ai').description('AI 模型配置');

aiCmd.command('status').description('查看 AI 配置').action(() => {
  const ai = getAIConfig();
  console.log(chalk.bold('\n🤖 AI 配置概览\n'));
  console.log(`  主模型: ${ai.primaryModel ? chalk.green(ai.primaryModel) : chalk.dim('未设置')}`);
  console.log(`  可用模型: ${ai.availableModels.length} 个`);
  console.log(`  Provider: ${ai.providers.length} 个\n`);
  for (const p of ai.providers) {
    console.log(`  ${chalk.bold(p.name)} (${p.baseUrl})`);
    console.log(`    API Key: ${p.hasApiKey ? chalk.green(p.apiKeyMasked || '已设置') : chalk.dim('未设置')}`);
    for (const m of p.models) {
      const primary = m.isPrimary ? chalk.green(' ★ 主模型') : '';
      console.log(`    - ${m.name} (${m.id})${primary}`);
    }
  }
});

aiCmd.command('providers').description('列出预设 Provider').action(() => {
  console.log(chalk.bold('\n🤖 预设 AI Provider\n'));
  for (const p of AI_PROVIDERS) {
    console.log(`  ${p.icon} ${chalk.bold(p.name)} (${p.id})`);
    console.log(`    API: ${p.defaultBaseUrl}`);
    console.log(`    类型: ${p.apiType} | 需要 Key: ${p.requiresApiKey ? '是' : '否'}`);
    for (const m of p.suggestedModels) {
      const rec = m.recommended ? chalk.green(' ★') : '';
      console.log(`    - ${m.name} (${m.id})${rec}`);
    }
    console.log();
  }
});

aiCmd.command('set-primary <modelId>').description('设置主模型').action((modelId) => {
  const r = setPrimaryModel(modelId);
  console.log(r.success ? chalk.green(`\n✅ ${r.message}`) : chalk.red(`\n❌ ${r.message}`));
});

// ========== env 命令 ==========
const envCmd = program.command('env').description('环境变量管理');

envCmd.command('list').description('列出所有环境变量').action(() => {
  const env = readAllEnv();
  console.log(chalk.bold('\n🔑 环境变量\n'));
  if (Object.keys(env).length === 0) { console.log(chalk.dim('  (空)')); return; }
  for (const [k, v] of Object.entries(env)) {
    const masked = (k.includes('KEY') || k.includes('SECRET') || k.includes('TOKEN')) && v.length > 8
      ? `${v.slice(0, 4)}...${v.slice(-4)}` : v;
    console.log(`  ${k}=${masked}`);
  }
});

envCmd.command('get <key>').description('获取环境变量').action((key) => {
  const v = readEnvValue(key);
  if (v !== undefined) console.log(v);
  else console.log(chalk.dim('(未设置)'));
});

envCmd.command('set <key> <value>').description('设置环境变量').action((key, value) => {
  writeEnvValue(key, value);
  console.log(chalk.green(`✅ ${key} 已保存`));
});

// ========== web 命令 ==========
program.command('web').description('启动 Web 管理界面')
  .option('-p, --port <port>', '指定端口号', '3000')
  .action((opts) => { startServer(parseInt(opts.port, 10)); });

program.parse();