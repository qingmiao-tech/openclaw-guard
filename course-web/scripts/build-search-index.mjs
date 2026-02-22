/**
 * Build search index JSON from course section markdown files.
 * Run this before or during the Astro build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const courseDir = path.resolve(__dirname, '..', '..', 'course-section');
const outputPath = path.resolve(__dirname, '..', 'public', 'search-index.json');

const CHAPTER_LIST = [
  { id: 'day01', title: '5分钟跑通你的第一个AI助手', filename: 'Day01-5分钟跑通你的第一个AI助手.md' },
  { id: 'day02', title: '把AI搬到云上-服务器部署全攻略', filename: 'Day02-把AI搬到云上-服务器部署全攻略.md' },
  { id: 'day03', title: '拆解引擎-OpenClaw六大核心组件', filename: 'Day03-拆解引擎-OpenClaw六大核心组件.md' },
  { id: 'day04', title: '给AI一个灵魂-人格定制soul.md', filename: 'Day04-给AI一个灵魂-人格定制soul.md' },
  { id: 'day05', title: '让AI记住你-记忆系统深度解析', filename: 'Day05-让AI记住你-记忆系统深度解析.md' },
  { id: 'day06', title: '技能商店淘宝-ClawHub技能市场', filename: 'Day06-技能商店淘宝-ClawHub技能市场.md' },
  { id: 'day07', title: '从零写一个Skill-自定义技能开发', filename: 'Day07-从零写一个Skill-自定义技能开发.md' },
  { id: 'day08', title: '项目实战①-定时任务自动化', filename: 'Day08-项目实战①-定时任务自动化.md' },
  { id: 'day09', title: '项目实战②-浏览器自动化', filename: 'Day09-项目实战②-浏览器自动化.md' },
  { id: 'day10', title: '项目实战③-内容创作自动化', filename: 'Day10-项目实战③-内容创作自动化.md' },
  { id: 'day11', title: '安全运维-让你的AI稳定又安全', filename: 'Day11-安全运维-让你的AI稳定又安全.md' },
  { id: 'day12', title: '毕业项目-打造你的AI工作流', filename: 'Day12-毕业项目-打造你的AI工作流.md' },
  { id: 'day13', title: '进阶-一人公司AI团队搭建', filename: 'Day13-进阶-一人公司AI团队搭建.md' },
  { id: 'labA', title: 'Telegram对接', filename: 'LabA-Telegram对接.md' },
  { id: 'labB', title: 'QQ对接', filename: 'LabB-QQ对接.md' },
  { id: 'labC', title: '飞书对接', filename: 'LabC-飞书对接.md' },
  { id: 'labD', title: '企业微信对接', filename: 'LabD-企业微信对接.md' },
  { id: 'labE', title: 'Discord对接', filename: 'LabE-Discord对接.md' },
];

const slideHeadingRegex = /^##\s+第\s*(\d+)\s*页\s*[·.·]\s*(.+)$/;

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/[#*_~\[\]()>|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const entries = [];

for (const chapter of CHAPTER_LIST) {
  const filePath = path.join(courseDir, chapter.filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: ${chapter.filename} not found, skipping`);
    continue;
  }

  const markdown = fs.readFileSync(filePath, 'utf-8');
  const lines = markdown.split(/\r?\n/);
  let currentSlide = null;
  let slideLines = [];

  function pushSlide() {
    if (currentSlide) {
      entries.push({
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        slideTitle: currentSlide.title,
        slug: currentSlide.slug,
        content: stripMarkdown(slideLines.join('\n')),
      });
    }
  }

  for (const line of lines) {
    const match = line.match(slideHeadingRegex);
    if (match) {
      pushSlide();
      const pageNumber = parseInt(match[1], 10);
      const title = match[2].trim();
      currentSlide = { title, slug: `slide-${pageNumber}` };
      slideLines = [];
    } else if (currentSlide) {
      slideLines.push(line);
    }
  }
  pushSlide();

  // If no slides found, index the whole file
  if (!currentSlide) {
    entries.push({
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      slideTitle: chapter.title,
      slug: '',
      content: stripMarkdown(markdown),
    });
  }
}

fs.writeFileSync(outputPath, JSON.stringify(entries, null, 0));
console.log(`Search index built: ${entries.length} entries -> ${outputPath}`);
