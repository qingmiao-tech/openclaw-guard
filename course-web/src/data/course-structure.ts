import type { Tier, ChapterMeta } from '../types';

export const COURSE_TIERS: Tier[] = [
  {
    name: '基础层',
    icon: '🏗️',
    chapters: ['day01', 'day02', 'day03'],
  },
  {
    name: '进阶层',
    icon: '🚀',
    chapters: ['day04', 'day05', 'day06', 'day07'],
  },
  {
    name: '实战层',
    icon: '⚡',
    chapters: ['day08', 'day09', 'day10'],
  },
  {
    name: '进阶扩展',
    icon: '🎓',
    chapters: ['day11', 'day12', 'day13'],
  },
  {
    name: '选修 Lab',
    icon: '🧪',
    chapters: ['labA', 'labB', 'labC', 'labD', 'labE'],
  },
];

export const CHAPTER_LIST: ChapterMeta[] = [
  { id: 'day01', title: '5分钟跑通你的第一个AI助手', duration: '1.5h', tier: '基础层', order: 1, filename: 'Day01-5分钟跑通你的第一个AI助手.md' },
  { id: 'day02', title: '把AI搬到云上-服务器部署全攻略', duration: '2h', tier: '基础层', order: 2, filename: 'Day02-把AI搬到云上-服务器部署全攻略.md' },
  { id: 'day03', title: '拆解引擎-OpenClaw六大核心组件', duration: '1.5h', tier: '基础层', order: 3, filename: 'Day03-拆解引擎-OpenClaw六大核心组件.md' },
  { id: 'day04', title: '给AI一个灵魂-人格定制soul.md', duration: '1.5h', tier: '进阶层', order: 4, filename: 'Day04-给AI一个灵魂-人格定制soul.md' },
  { id: 'day05', title: '让AI记住你-记忆系统深度解析', duration: '1.5h', tier: '进阶层', order: 5, filename: 'Day05-让AI记住你-记忆系统深度解析.md' },
  { id: 'day06', title: '技能商店淘宝-ClawHub技能市场', duration: '1.5h', tier: '进阶层', order: 6, filename: 'Day06-技能商店淘宝-ClawHub技能市场.md' },
  { id: 'day07', title: '从零写一个Skill-自定义技能开发', duration: '2h', tier: '进阶层', order: 7, filename: 'Day07-从零写一个Skill-自定义技能开发.md' },
  { id: 'day08', title: '项目实战①-定时任务自动化', duration: '2h', tier: '实战层', order: 8, filename: 'Day08-项目实战①-定时任务自动化.md' },
  { id: 'day09', title: '项目实战②-浏览器自动化', duration: '2h', tier: '实战层', order: 9, filename: 'Day09-项目实战②-浏览器自动化.md' },
  { id: 'day10', title: '项目实战③-内容创作自动化', duration: '2h', tier: '实战层', order: 10, filename: 'Day10-项目实战③-内容创作自动化.md' },
  { id: 'day11', title: '安全运维-让你的AI稳定又安全', duration: '1.5h', tier: '进阶扩展', order: 11, filename: 'Day11-安全运维-让你的AI稳定又安全.md' },
  { id: 'day12', title: '毕业项目-打造你的AI工作流', duration: '2.5h', tier: '进阶扩展', order: 12, filename: 'Day12-毕业项目-打造你的AI工作流.md' },
  { id: 'day13', title: '进阶-一人公司AI团队搭建', duration: '2h', tier: '进阶扩展', order: 13, filename: 'Day13-进阶-一人公司AI团队搭建.md' },
  { id: 'labA', title: 'Telegram对接', duration: '1h', tier: '选修 Lab', order: 14, filename: 'LabA-Telegram对接.md' },
  { id: 'labB', title: 'QQ对接', duration: '1.5h', tier: '选修 Lab', order: 15, filename: 'LabB-QQ对接.md' },
  { id: 'labC', title: '飞书对接', duration: '1.5h', tier: '选修 Lab', order: 16, filename: 'LabC-飞书对接.md' },
  { id: 'labD', title: '企业微信对接', duration: '1.5h', tier: '选修 Lab', order: 17, filename: 'LabD-企业微信对接.md' },
  { id: 'labE', title: 'Discord对接', duration: '1h', tier: '选修 Lab', order: 18, filename: 'LabE-Discord对接.md' },
];

export function getChapterById(id: string): ChapterMeta | undefined {
  return CHAPTER_LIST.find((c) => c.id === id);
}

export function getTierForChapter(chapterId: string): string {
  for (const tier of COURSE_TIERS) {
    if (tier.chapters.includes(chapterId)) return tier.name;
  }
  return '';
}
