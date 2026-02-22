#!/usr/bin/env node
/**
 * OpenClaw Guard - 权限管理与安全审计 CLI
 * 跨平台支持 Windows / macOS / Linux
 */
import { Command } from 'commander';
import chalk from 'chalk';
import { runFullAudit, type AuditResult } from './audit.js';
import { listProfiles, getProfile, applyProfile, PROFILES } from './profiles.js';
import { generateHardenScript, getAllHardenSteps } from './harden.js';
import { detectPlatform, getCurrentUser, getOpenClawDir } from './platform.js';
import fs from 'node:fs';

const program = new Command();

program
  .name('openclaw-guard')
  .description('OpenClaw 权限管理与安全审计工具')
  .version('1.0.0');

// ========== audit 命令 ==========
program
  .command('audit')
  .description('执行安全审计，检查当前系统的安全状态')
  .option('--json', '以 JSON 格式输出')
  .action((opts) => {
    const results = runFullAudit();

    if (opts.json) {
      console.log(JSON.stringify(results, null, 2));
      return;
    }

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
        const icon = item.status === 'pass' ? chalk.green('✅')
          : item.status === 'warn' ? chalk.yellow('⚠️')
          : chalk.red('❌');
        console.log(`  ${icon} ${item.item}`);
        console.log(`     ${item.message}`);
        if (item.fix) {
          console.log(chalk.dim(`     修复: ${item.fix}`));
        }
        if (item.status === 'pass') passCount++;
        else if (item.status === 'warn') warnCount++;
        else failCount++;
      }
      console.log();
    }

    console.log(chalk.bold('📊 审计摘要'));
    console.log(`  ${chalk.green(`✅ 通过: ${passCount}`)}  ${chalk.yellow(`⚠️ 警告: ${warnCount}`)}  ${chalk.red(`❌ 失败: ${failCount}`)}`);

    if (failCount > 0) {
      console.log(chalk.red('\n⚠️ 存在安全问题，请尽快修复！'));
    } else if (warnCount > 0) {
      console.log(chalk.yellow('\n💡 存在可优化项，建议处理。'));
    } else {
      console.log(chalk.green('\n🎉 安全状态良好！'));
    }
  });

// ========== profile 命令 ==========
const profileCmd = program
  .command('profile')
  .description('管理安全配置 Profile');

profileCmd
  .command('list')
  .description('列出所有可用的安全 Profile')
  .action(() => {
    console.log(chalk.bold('\n📋 可用安全 Profile\n'));
    const profiles = listProfiles();
    for (const p of profiles) {
      const key = Object.entries(PROFILES).find(([, v]) => v === p)?.[0] || '';
      console.log(`  ${chalk.bold(key)} - ${p.name} ${p.riskLevel}`);
      console.log(`    ${chalk.dim(p.description)}`);
      if (p.recommendations.length > 0) {
        for (const r of p.recommendations) {
          console.log(`    ${chalk.dim('•')} ${chalk.dim(r)}`);
        }
      }
      console.log();
    }
  });

profileCmd
  .command('apply <name>')
  .description('应用指定的安全 Profile 到 openclaw.json')
  .option('-c, --config <path>', '指定 openclaw.json 路径')
  .action((name, opts) => {
    const profile = getProfile(name);
    if (!profile) {
      console.log(chalk.red(`\n❌ 未知的 Profile: ${name}`));
      console.log('可用的 Profile:', Object.keys(PROFILES).join(', '));
      return;
    }

    console.log(chalk.bold(`\n🔧 应用 Profile: ${profile.name} ${profile.riskLevel}\n`));

    if (profile.recommendations.length > 0) {
      console.log(chalk.yellow('⚠️ 安全建议:'));
      for (const r of profile.recommendations) {
        console.log(`  • ${r}`);
      }
      console.log();
    }

    const result = applyProfile(name, opts.config);
    if (result.success) {
      console.log(chalk.green(`✅ ${result.message}`));
    } else {
      console.log(chalk.red(`❌ ${result.message}`));
    }
  });

profileCmd
  .command('show <name>')
  .description('查看指定 Profile 的详细配置')
  .action((name) => {
    const profile = getProfile(name);
    if (!profile) {
      console.log(chalk.red(`\n❌ 未知的 Profile: ${name}`));
      return;
    }

    console.log(chalk.bold(`\n📋 Profile: ${profile.name}\n`));
    console.log(`风险等级: ${profile.riskLevel}`);
    console.log(`描述: ${profile.description}\n`);
    console.log(chalk.bold('工具配置:'));
    console.log(JSON.stringify(profile.tools, null, 2));
    console.log(chalk.bold('\n安全建议:'));
    for (const r of profile.recommendations) {
      console.log(`  • ${r}`);
    }
  });

// ========== harden 命令 ==========
program
  .command('harden')
  .description('生成系统安全加固脚本')
  .option('-p, --platform <platform>', '指定平台 (windows/macos/linux)')
  .option('-o, --output <file>', '输出到文件')
  .option('--steps', '仅显示加固步骤说明')
  .action((opts) => {
    const platform = opts.platform || detectPlatform();

    if (opts.steps) {
      const steps = getAllHardenSteps();
      console.log(chalk.bold(`\n🛡️ 系统安全加固步骤 (${platform})\n`));
      steps.forEach((step, i) => {
        const tag = step.optional ? chalk.dim('（可选）') : '';
        console.log(`  ${i + 1}. ${chalk.bold(step.title)} ${tag}`);
        console.log(`     ${chalk.dim(step.description)}`);
        console.log(`     命令:`);
        for (const cmd of step.commands[platform as keyof typeof step.commands]) {
          console.log(`       ${chalk.cyan(cmd)}`);
        }
        console.log();
      });
      return;
    }

    const script = generateHardenScript(platform as 'windows' | 'macos' | 'linux');

    if (opts.output) {
      fs.writeFileSync(opts.output, script, 'utf-8');
      console.log(chalk.green(`\n✅ 加固脚本已保存到: ${opts.output}`));
      console.log(chalk.dim(`请检查脚本内容后再执行。`));
    } else {
      console.log(script);
    }
  });

// ========== info 命令 ==========
program
  .command('info')
  .description('显示当前系统环境信息')
  .action(() => {
    console.log(chalk.bold('\n📊 系统环境信息\n'));
    console.log(`  平台:       ${detectPlatform()}`);
    console.log(`  用户:       ${getCurrentUser()}`);
    console.log(`  Home:       ${process.env.HOME || process.env.USERPROFILE}`);
    console.log(`  OpenClaw:   ${getOpenClawDir()}`);
    console.log(`  Node.js:    ${process.version}`);
    console.log(`  架构:       ${process.arch}`);
  });

program.parse();
