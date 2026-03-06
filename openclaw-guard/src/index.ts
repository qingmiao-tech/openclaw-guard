#!/usr/bin/env node
/**
 * OpenClaw Guard - 閺夊啴妾虹粻锛勬倞閵嗕礁鐣ㄩ崗銊ヮ吀鐠伮扳偓浣规箛閸旓紕顓搁悶?CLI
 * 鐠恒劌閽╅崣鐗堟暜閹?Windows / macOS / Linux
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
import { getAIConfig, saveProvider, deleteProvider, setPrimaryModel, setFallbackModels, PROVIDERS as AI_PROVIDERS } from './models.js';
import { getServiceStatus, startService, stopService, restartService, getLogs } from './service-mgr.js';
import {
  getMissionStatus,
  installMissionControl,
  syncMissionControl,
  bootstrapMissionControl,
  getMissionCredentials,
  resetMissionPassword,
  startMissionControl,
  stopMissionControl,
  restartMissionControl,
  getMissionLogs,
  getMissionHealth,
} from './mission-control.js';
import fs from 'node:fs';
import { startServer } from './server.js';

const program = new Command();

program
  .name('openclaw-guard')
  .description('OpenClaw management tool - security audit, service management, channel configuration')
  .version('2.0.0');

// ========== audit 閸涙垝鎶?==========
program
  .command('audit')
  .description('Run security audit and check current system safety status')
  .option('--json', 'Output as JSON')
  .action((opts) => {
    const results = runFullAudit();
    if (opts.json) { console.log(JSON.stringify(results, null, 2)); return; }

    console.log(chalk.bold('\n棣冩敵 OpenClaw Guard 鐎瑰鍙忕€孤ゎ吀閹躲儱鎲n'));
    console.log(`楠炲啿褰? ${detectPlatform()} | 閻劍鍩? ${getCurrentUser()}`);
    console.log(`閺冨爼妫? ${new Date().toLocaleString()}\n`);

    const grouped = new Map<string, AuditResult[]>();
    for (const r of results) {
      const list = grouped.get(r.category) || [];
      list.push(r);
      grouped.set(r.category, list);
    }

    let passCount = 0, warnCount = 0, failCount = 0;
    for (const [category, items] of grouped) {
      console.log(chalk.bold.underline(`棣冩惃 ${category}`));
      for (const item of items) {
        const icon = item.status === 'pass' ? chalk.green('PASS') : item.status === 'warn' ? chalk.yellow('WARN') : chalk.red('FAIL');
        console.log(`  ${icon} ${item.item}`);
        console.log(`     ${item.message}`);
        if (item.fix) console.log(chalk.dim(`     娣囶喖顦? ${item.fix}`));
        if (item.status === 'pass') passCount++;
        else if (item.status === 'warn') warnCount++;
        else failCount++;
      }
      console.log();
    }

    console.log(chalk.bold('Audit Summary'));
    console.log(`  ${chalk.green(`PASS: ${passCount}`)}  ${chalk.yellow(`WARN: ${warnCount}`)}  ${chalk.red(`FAIL: ${failCount}`)}`);
    if (failCount > 0) console.log(chalk.red('\nSecurity issues detected. Please fix them soon.'));
    else if (warnCount > 0) console.log(chalk.yellow('\nWarnings found. Review recommended.'));
    else console.log(chalk.green('\nAll checks passed.'));
  });

// ========== profile 閸涙垝鎶?==========
const profileCmd = program.command('profile').description('缁狅紕鎮婄€瑰鍙忛柊宥囩枂 Profile');

profileCmd.command('list').description('閸掓鍤幍鈧張澶婂讲閻劎娈戠€瑰鍙?Profile').action(() => {
  console.log(chalk.bold('\n棣冩惖 閸欘垳鏁ょ€瑰鍙?Profile\n'));
  for (const [key, p] of Object.entries(PROFILES)) {
    console.log(`  ${chalk.bold(key)} - ${p.name} ${p.riskLevel}`);
    console.log(`    ${chalk.dim(p.description)}`);
    for (const r of p.recommendations) console.log(`    ${chalk.dim('-')} ${chalk.dim(r)}`);
    console.log();
  }
});

profileCmd.command('apply <name>').description('Apply specified security profile').option('-c, --config <path>', 'Config path').action((name, opts) => {
  const profile = getProfile(name);
  if (!profile) { console.log(chalk.red(`\n閴?閺堫亞鐓￠惃?Profile: ${name}`)); return; }
  console.log(chalk.bold(`\n棣冩暋 鎼存梻鏁?Profile: ${profile.name} ${profile.riskLevel}\n`));
  const result = applyProfile(name, opts.config);
  console.log(result.success ? chalk.green(`閴?${result.message}`) : chalk.red(`閴?${result.message}`));
});

profileCmd.command('show <name>').description('閺屻儳婀?Profile 鐠囷妇绮忛柊宥囩枂').action((name) => {
  const profile = getProfile(name);
  if (!profile) { console.log(chalk.red(`\n閴?閺堫亞鐓￠惃?Profile: ${name}`)); return; }
  console.log(chalk.bold(`\n棣冩惖 Profile: ${profile.name}\n`));
  console.log(`妞嬪酣娅撶粵澶岄獓: ${profile.riskLevel}\n閹诲繗鍫? ${profile.description}\n`);
  console.log(chalk.bold('瀹搞儱鍙块柊宥囩枂:'));
  console.log(JSON.stringify(profile.tools, null, 2));
});


// ========== harden 閸涙垝鎶?==========
program.command('harden').description('Generate system hardening script')
  .option('-p, --platform <platform>', '閹稿洤鐣鹃獮鍐插酱')
  .option('-o, --output <file>', 'Output script to file')
  .option('--steps', 'Show hardening steps only')
  .action((opts) => {
    const platform = opts.platform || detectPlatform();
    if (opts.steps) {
      const steps = getAllHardenSteps();
      console.log(chalk.bold(`\n棣冩礉閿?缁崵绮虹€瑰鍙忛崝鐘叉祼濮濄儵顎?(${platform})\n`));
      steps.forEach((step, i) => {
        console.log(`  ${i + 1}. ${chalk.bold(step.title)}${step.optional ? chalk.dim(' 閿涘牆褰查柅澶涚礆') : ''}`);
        console.log(`     ${chalk.dim(step.description)}`);
        for (const cmd of step.commands[platform as keyof typeof step.commands]) console.log(`       ${chalk.cyan(cmd)}`);
        console.log();
      });
      return;
    }
    const script = generateHardenScript(platform as 'windows' | 'macos' | 'linux');
    if (opts.output) {
      fs.writeFileSync(opts.output, script, 'utf-8');
      console.log(chalk.green(`\n閴?閸旂姴娴愰懘姘拱瀹歌弓绻氱€涙ê鍩? ${opts.output}`));
    } else { console.log(script); }
  });

// ========== info 閸涙垝鎶?==========
program.command('info').description('Show system information').action(() => {
  const oc = detectOpenClaw();
  console.log(chalk.bold('\n棣冩惓 缁崵绮洪悳顖氼暔娣団剝浼匼n'));
  console.log(`  楠炲啿褰?       ${detectPlatform()}`);
  console.log(`  閻劍鍩?       ${getCurrentUser()}`);
  console.log(`  Home:       ${process.env.HOME || process.env.USERPROFILE}`);
  console.log(`  OpenClaw:   ${getOpenClawDir()}`);
  console.log(`  闁板秶鐤嗛弬鍥︽:   ${getConfigPath()}`);
  console.log(`  閻滎垰顣ㄩ弬鍥︽:   ${getEnvPath()}`);
  console.log(`  Node.js:    ${process.version}`);
  console.log(`  閺嬭埖鐎?       ${process.arch}`);
  console.log();
  console.log(chalk.bold('  OpenClaw Status'));
  console.log(`  Installed:   ${oc.installed ? chalk.green('YES ' + oc.version) : chalk.red('NO')}`);
  if (oc.updateAvailable) console.log(`  閸欘垱娲块弬?     ${chalk.yellow(oc.latestVersion)}`);
  if (oc.binPath) console.log(`  鐠侯垰绶?       ${oc.binPath}`);
});

// ========== service 閸涙垝鎶?==========
const serviceCmd = program.command('service').description('Manage OpenClaw Gateway service');

serviceCmd.command('status').description('Show gateway service status').action(() => {
  const s = getServiceStatus();
  console.log(chalk.bold('\n閳?Gateway 閺堝秴濮熼悩鑸碘偓涔梟'));
  console.log(`  Status: ${s.running ? chalk.green('running') : chalk.red('stopped')}`);
  console.log(`  缁旑垰褰?  ${s.port}`);
  if (s.pid) console.log(`  PID:   ${s.pid}`);
  if (s.running) {
    try { console.log(`  闂堛垺婢?  ${getDashboardUrl()}`); } catch {}
  }
});

serviceCmd.command('start').description('閸氼垰濮╅張宥呭').action(() => {
  console.log(chalk.dim('濮濓絽婀崥顖氬З Gateway...'));
  const r = startService();
  console.log(r.success ? chalk.green(`閴?${r.message}`) : chalk.red(`閴?${r.message}`));
});

serviceCmd.command('stop').description('閸嬫粍顒涢張宥呭').action(() => {
  console.log(chalk.dim('濮濓絽婀崑婊勵剾 Gateway...'));
  const r = stopService();
  console.log(r.success ? chalk.green(`閴?${r.message}`) : chalk.red(`閴?${r.message}`));
});

serviceCmd.command('restart').description('闁插秴鎯庨張宥呭').action(() => {
  console.log(chalk.dim('濮濓絽婀柌宥呮儙 Gateway...'));
  const r = restartService();
  console.log(r.success ? chalk.green(`閴?${r.message}`) : chalk.red(`閴?${r.message}`));
});

serviceCmd.command('logs').description('Show service logs').option('-n, --lines <n>', 'Number of lines', '50').action((opts) => {
  const logs = getLogs(parseInt(opts.lines, 10));
  for (const line of logs) console.log(line);
});


// ========== channel 閸涙垝鎶?==========
const channelCmd = program.command('channel').description('缁狅紕鎮婂☉鍫熶紖濞撶娀浜鹃柊宥囩枂');

channelCmd.command('list').description('List all channels').action(() => {
  const channels = getChannels();
  console.log(chalk.bold('\n棣冩懌 濞戝牊浼呭〒鐘讳壕\n'));
  for (const ch of channels) {
    const status = ch.enabled ? chalk.green('enabled') : ch.configured ? chalk.yellow('configured') : chalk.dim('not configured');
    console.log(`  ${ch.icon} ${chalk.bold(ch.name.padEnd(16))} ${status}`);
  }
  console.log();
});

channelCmd.command('show <id>').description('Show channel configuration').action((id) => {
  const channels = getChannels();
  const ch = channels.find(c => c.id === id);
  if (!ch) { console.log(chalk.red(`\n閴?閺堫亞鐓″〒鐘讳壕: ${id}`)); return; }
  console.log(chalk.bold(`\n${ch.icon} ${ch.name}\n`));
  console.log(`  鐘舵€? ${ch.enabled ? chalk.green('enabled') : chalk.dim('disabled')}`);
  if (Object.keys(ch.config).length > 0) {
    console.log(chalk.bold('\n  闁板秶鐤?'));
    for (const [k, v] of Object.entries(ch.config)) {
      const display = (k.includes('Secret') || k.includes('Token') || k.includes('Key')) && typeof v === 'string' && v.length > 8
        ? `${v.slice(0, 4)}...${v.slice(-4)}` : String(v);
      console.log(`    ${k}: ${display}`);
    }
  }
});

// ========== feishu 閸涙垝鎶?==========
const feishuCmd = program.command('feishu').description('Manage Feishu plugin configuration');

feishuCmd.command('status').description('Show Feishu plugin status').action(() => {
  const cfg = getFeishuConfig();
  const plugin = checkFeishuPlugin();
  console.log(chalk.bold('\n棣冩儊 妞嬬偘鍔熼幓鎺嶆閻樿埖鈧箺n'));
  console.log(`  鎻掍欢: ${plugin.installed ? chalk.green('installed') : chalk.red('not installed')}`);
  console.log(`  鍚敤: ${cfg.enabled ? chalk.green('yes') : chalk.dim('no')}`);
  if (cfg.appId) console.log(`  App ID: ${cfg.appId}`);
  if (cfg.appSecret) console.log(`  App Secret: ${cfg.appSecret.slice(0, 4)}...${cfg.appSecret.slice(-4)}`);
  if (cfg.domain) console.log(`  閸╃喎鎮? ${cfg.domain}`);
  if (cfg.connectionMode) console.log(`  鏉╃偞甯村Ο鈥崇础: ${cfg.connectionMode}`);
  if (cfg.streaming !== undefined) console.log(`  濞翠礁绱￠崡锛勫: ${cfg.streaming}`);
  if (cfg.renderMode) console.log(`  濞撳弶鐓嬪Ο鈥崇础: ${cfg.renderMode}`);
  if (cfg.whisperModel) console.log(`  Whisper 濡€崇€? ${cfg.whisperModel}`);
});

feishuCmd.command('setup').description('Set Feishu plugin options')
  .option('--app-id <id>', 'App ID')
  .option('--app-secret <secret>', 'App Secret')
  .option('--encrypt-key <key>', 'Encrypt Key')
  .option('--verification-token <token>', 'Verification Token')
  .option('--domain <domain>', '閸╃喎鎮?(feishu/lark)', 'feishu')
  .option('--mode <mode>', '鏉╃偞甯村Ο鈥崇础 (websocket/webhook)', 'websocket')
  .option('--streaming', 'Enable streaming mode')
  .option('--no-streaming', 'Disable streaming mode')
  .option('--whisper-model <model>', 'Whisper model id')
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
      console.log(chalk.yellow('\n鐠囬攱褰佹笟娑滃殾鐏忔垳绔存稉顏堝帳缂冾噣銆嶉敍灞肩伐婵?'));
      console.log(chalk.dim('  openclaw-guard feishu setup --app-id cli_xxx --app-secret xxx'));
      return;
    }

    const result = saveFeishuConfig(cfg);
    console.log(result.success ? chalk.green(`\n閴?${result.message}`) : chalk.red(`\n閴?${result.message}`));
  });

// ========== ai 閸涙垝鎶?==========
const aiCmd = program.command('ai').description('AI 濡€崇€烽柊宥囩枂');

aiCmd.command('status').description('Show AI model configuration').action(() => {
  const ai = getAIConfig();
  console.log(chalk.bold('\n棣冾樆 AI 闁板秶鐤嗗鍌濐潔\n'));
  console.log(`  Primary model: ${ai.primaryModel ? chalk.green(ai.primaryModel) : chalk.dim('not set')}`);
  console.log(`  Fallbacks: ${ai.fallbackModels.length > 0 ? chalk.cyan(ai.fallbackModels.join(', ')) : chalk.dim('(none)')}`);
  console.log(`  Available models: ${ai.availableModels.length}`);
  console.log(`  Providers: ${ai.providers.length}\n`);
  for (const p of ai.providers) {
    console.log(`  ${chalk.bold(p.name)} (${p.baseUrl})`);
    console.log(`    API Key: ${p.hasApiKey ? chalk.green(p.apiKeyMasked || 'set') : chalk.dim('not set')}`);
    for (const m of p.models) {
      const primary = m.isPrimary ? chalk.green(' *primary') : '';
      const fallback = m.isFallback ? chalk.cyan(' *fallback') : '';
      console.log(`    - ${m.name} (${m.id})${primary}${fallback}`);
    }
  }
});

aiCmd.command('providers').description('閸掓鍤０鍕啎 Provider').action(() => {
  console.log(chalk.bold('\n棣冾樆 妫板嫯顔?AI Provider\n'));
  for (const p of AI_PROVIDERS) {
    console.log(`  ${p.icon} ${chalk.bold(p.name)} (${p.id})`);
    console.log(`    API: ${p.defaultBaseUrl}`);
    console.log(`    Type: ${p.apiType} | Need Key: ${p.requiresApiKey ? 'yes' : 'no'}`);
    for (const m of p.suggestedModels) {
      const rec = m.recommended ? chalk.green(' *recommended') : '';
      console.log(`    - ${m.name} (${m.id})${rec}`);
    }
    console.log();
  }
});

aiCmd.command('set-primary <modelId>').description('Set primary model').action((modelId) => {
  const r = setPrimaryModel(modelId);
  console.log(r.success ? chalk.green(`\n閴?${r.message}`) : chalk.red(`\n閴?${r.message}`));
});


aiCmd.command('set-fallbacks <modelIds>')
  .description('Set fallback models (comma-separated provider/model IDs)')
  .action((modelIds) => {
    const ids = String(modelIds)
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);
    const r = setFallbackModels(ids);
    console.log(r.success ? chalk.green(`\n閴?${r.message}`) : chalk.red(`\n閴?${r.message}`));
  });

aiCmd.command('clear-fallbacks').description('Clear fallback models').action(() => {
  const r = setFallbackModels([]);
  console.log(r.success ? chalk.green(`\n閴?${r.message}`) : chalk.red(`\n閴?${r.message}`));
});
// ========== env 閸涙垝鎶?==========
const envCmd = program.command('env').description('閻滎垰顣ㄩ崣姗€鍣虹粻锛勬倞');

envCmd.command('list').description('List all env vars').action(() => {
  const env = readAllEnv();
  console.log(chalk.bold('\n棣冩斀 閻滎垰顣ㄩ崣姗€鍣篭n'));
  if (Object.keys(env).length === 0) { console.log(chalk.dim('  (empty)')); return; }
  for (const [k, v] of Object.entries(env)) {
    const masked = (k.includes('KEY') || k.includes('SECRET') || k.includes('TOKEN')) && v.length > 8
      ? `${v.slice(0, 4)}...${v.slice(-4)}` : v;
    console.log(`  ${k}=${masked}`);
  }
});

envCmd.command('get <key>').description('Get env var by key').action((key) => {
  const v = readEnvValue(key);
  if (v !== undefined) console.log(v);
  else console.log(chalk.dim('(not set)'));
});

envCmd.command('set <key> <value>').description('Set env var').action((key, value) => {
  writeEnvValue(key, value);
  console.log(chalk.green(`Saved ${key}`));
});

// ========== mission 鍛戒护 ==========
const missionCmd = program.command('mission').description('绠＄悊 tenacitOS Mission Control');

missionCmd.command('status').description('Show Mission Control status').action(() => {
  const s = getMissionStatus();
  console.log(chalk.bold('\nMission Control Status\n'));
  console.log(`  Installed: ${s.installed ? chalk.green('yes') : chalk.red('no')}`);
  console.log(`  Running: ${s.running ? chalk.green(`yes (PID: ${s.pid})`) : chalk.red('no')}`);
  console.log(`  Mode: ${s.runMode || '-'}`);
  console.log(`  Started At: ${s.startedAt || '-'}`);
  console.log(`  Port: ${s.port}`);
  console.log(`  URL:  ${s.url}`);
  console.log(`  Directory: ${s.missionDir}`);
  console.log(`  Branch: ${s.branch || '-'}`);
  console.log(`  HEAD: ${s.head || '-'}`);
  console.log(`  Env Ready: ${s.envReady ? chalk.green('yes') : chalk.yellow('no')}`);
  console.log(`  Data Ready: ${s.dataReady ? chalk.green('yes') : chalk.yellow('no')}`);
  console.log(`  Log File: ${s.logFile}`);
});

missionCmd.command('install').description('Install or update tenacitOS and initialize environment').action(() => {
  const r = installMissionControl();
  console.log(r.success ? chalk.green(`\n鉁?${r.message}`) : chalk.red(`\n鉂?${r.message}`));
  if (r.output) console.log(chalk.dim(`\n${r.output}`));
});

missionCmd.command('sync').description('鍚屾 tenacitOS 鏈€鏂颁唬鐮佸苟瀹夎渚濊禆').action(() => {
  const r = syncMissionControl();
  console.log(r.success ? chalk.green(`\n鉁?${r.message}`) : chalk.red(`\n鉂?${r.message}`));
  if (r.output) console.log(chalk.dim(`\n${r.output}`));
});

missionCmd.command('bootstrap').description('浠呭垵濮嬪寲 .env.local 涓?data/*.json').action(() => {
  const r = bootstrapMissionControl();
  console.log(r.success ? chalk.green(`\n鉁?${r.message}`) : chalk.red(`\n鉂?${r.message}`));
});

missionCmd.command('credentials').description('璇诲彇 Mission Control 鐧诲綍瀵嗙爜').action(() => {
  const r = getMissionCredentials();
  console.log(r.success ? chalk.green(`\n鉁?${r.message}`) : chalk.red(`\n鉂?${r.message}`));
  console.log(`  .env.local: ${r.envLocalFile}`);
  if (r.adminPassword) console.log(`  ADMIN_PASSWORD: ${r.adminPassword}`);
});

missionCmd.command('reset-password').description('閲嶇疆 Mission Control 鐧诲綍瀵嗙爜').action(() => {
  const r = resetMissionPassword();
  console.log(r.success ? chalk.green(`\n鉁?${r.message}`) : chalk.red(`\n鉂?${r.message}`));
  console.log(`  .env.local: ${r.envLocalFile}`);
  if (r.adminPassword) console.log(`  ADMIN_PASSWORD: ${r.adminPassword}`);
});

missionCmd.command('start').description('鍚姩 Mission Control')
  .option('-p, --port <port>', 'Port')
  .option('--prod', 'Production mode (auto build + start)')
  .action((opts) => {
    const port = opts.port ? parseInt(opts.port, 10) : undefined;
    const r = startMissionControl({ port, prod: !!opts.prod });
    console.log(r.success ? chalk.green(`\n鉁?${r.message}`) : chalk.red(`\n鉂?${r.message}`));
  });

missionCmd.command('stop').description('鍋滄 Mission Control').action(() => {
  const r = stopMissionControl();
  console.log(r.success ? chalk.green(`\n鉁?${r.message}`) : chalk.red(`\n鉂?${r.message}`));
});

missionCmd.command('restart').description('閲嶅惎 Mission Control')
  .option('-p, --port <port>', 'Port')
  .option('--prod', 'Production mode restart (auto build + start)')
  .action((opts) => {
    const port = opts.port ? parseInt(opts.port, 10) : undefined;
    const r = restartMissionControl({ port, prod: !!opts.prod });
    console.log(r.success ? chalk.green(`\n鉁?${r.message}`) : chalk.red(`\n鉂?${r.message}`));
  });

missionCmd.command('logs').description('鏌ョ湅 Mission Control 鏃ュ織')
  .option('-n, --lines <n>', '鏃ュ織琛屾暟', '200')
  .action((opts) => {
    const logs = getMissionLogs(parseInt(opts.lines, 10));
    for (const line of logs) console.log(line);
  });

missionCmd.command('health').description('妫€鏌?Mission Control /api/health')
  .action(async () => {
    const h = await getMissionHealth();
    if (h.success) {
      console.log(chalk.green(`\n鉁?health reachable (status: ${h.statusCode})`));
      if (h.body) console.log(JSON.stringify(h.body, null, 2));
    } else {
      console.log(chalk.red(`\n鉂?health check failed: ${h.error || 'unknown error'}`));
    }
  });

// ========== web 鍛戒护 ==========
program.command('web').description('Start web management UI')
  .option('-p, --port <port>', 'Specify port', '18088')
  .action((opts) => { startServer(parseInt(opts.port, 10)); });

program.parse();




