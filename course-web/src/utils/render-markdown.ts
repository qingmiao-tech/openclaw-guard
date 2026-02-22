import { parseSectionSlides } from '../plugins/remark-section-slides';
import { parseChecklist } from '../plugins/remark-checklist';
import { parseCallout, getCalloutClasses } from '../plugins/remark-callout';
import { isCollapsibleHeading, getCollapsibleType } from '../plugins/remark-collapsible';
import { isTaskAreaHeading, isSuccessCriteriaHeading, isTaskOverviewHeading } from '../plugins/remark-task-area';
import type { SectionSlide, ChecklistItem } from '../types';

/**
 * Convert markdown text to HTML with all custom transformations applied.
 * This is a simplified markdown-to-HTML converter that handles the course content patterns.
 */
export function renderMarkdownToHtml(markdown: string): string {
  let html = markdown;

  // Process code blocks first (protect them from other transformations)
  const codeBlocks: string[] = [];
  html = html.replace(/```(\w*)\r?\n([\s\S]*?)```/g, (_match, lang, code) => {
    const idx = codeBlocks.length;
    const langLabel = lang || 'text';
    const escapedCode = escapeHtml(code.trimEnd());
    codeBlocks.push(
      `<div class="code-block-wrapper group relative my-4 rounded-lg overflow-hidden bg-gray-900 dark:bg-gray-950">` +
      `<div class="code-block-header flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 text-xs text-gray-400">` +
      `<span class="code-lang">${langLabel}</span>` +
      `<button class="copy-btn opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white text-xs px-2 py-1 rounded" onclick="copyCode(this)">复制</button>` +
      `</div>` +
      `<pre class="overflow-x-auto p-4 text-sm leading-relaxed"><code class="language-${langLabel} text-gray-100">${escapedCode}</code></pre>` +
      `</div>`
    );
    return `%%CODEBLOCK_${idx}%%`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');

  // Process lines
  const lines = html.split(/\r?\n/);
  const outputLines: string[] = [];
  let inTable = false;
  let tableRows: string[] = [];
  let inList = false;
  let listType: 'ul' | 'ol' = 'ul';
  let inCollapsible = false;
  let inTaskArea = false;
  let inSuccessCriteria = false;
  let inBlockquote = false;
  let blockquoteLines: string[] = [];

  function flushBlockquote() {
    if (blockquoteLines.length > 0) {
      const text = blockquoteLines.join(' ');
      const callout = parseCallout(text);
      if (callout) {
        const classes = getCalloutClasses(callout.type);
        outputLines.push(`<div class="${classes}"><p>${processInline(callout.content)}</p></div>`);
      } else {
        outputLines.push(`<blockquote class="border-l-4 border-primary pl-4 my-4 italic text-text-muted dark:text-text-dark-muted"><p>${processInline(text)}</p></blockquote>`);
      }
      blockquoteLines = [];
    }
    inBlockquote = false;
  }

  function flushTable() {
    if (tableRows.length > 0) {
      let tableHtml = '<div class="overflow-x-auto my-4"><table class="w-full border-collapse text-sm">';
      tableRows.forEach((row, i) => {
        const cells = row.split('|').filter(c => c.trim() !== '');
        if (i === 0) {
          tableHtml += '<thead><tr>';
          cells.forEach(c => { tableHtml += `<th class="bg-surface-alt dark:bg-surface-dark-alt px-4 py-2 text-left font-semibold border border-border dark:border-border-dark">${processInline(c.trim())}</th>`; });
          tableHtml += '</tr></thead><tbody>';
        } else if (i === 1 && /^[\s|:-]+$/.test(row)) {
          // separator row, skip
        } else {
          const evenClass = (i % 2 === 0) ? ' class="bg-surface-alt/50 dark:bg-surface-dark-alt/50"' : '';
          tableHtml += `<tr${evenClass}>`;
          cells.forEach(c => { tableHtml += `<td class="px-4 py-2 border border-border dark:border-border-dark">${processInline(c.trim())}</td>`; });
          tableHtml += '</tr>';
        }
      });
      tableHtml += '</tbody></table></div>';
      outputLines.push(tableHtml);
      tableRows = [];
    }
    inTable = false;
  }

  function flushList() {
    if (inList) {
      outputLines.push(listType === 'ul' ? '</ul>' : '</ol>');
      inList = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code block placeholder
    if (trimmed.match(/^%%CODEBLOCK_\d+%%$/)) {
      flushBlockquote();
      flushTable();
      flushList();
      const idx = parseInt(trimmed.match(/\d+/)![0], 10);
      outputLines.push(codeBlocks[idx]);
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      flushTable();
      flushList();
      const content = trimmed.slice(2);
      blockquoteLines.push(content);
      inBlockquote = true;
      continue;
    } else if (inBlockquote) {
      flushBlockquote();
    }

    // Table detection
    if (trimmed.includes('|') && trimmed.startsWith('|')) {
      flushList();
      if (!inTable) inTable = true;
      tableRows.push(trimmed);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Horizontal rule
    if (/^---+$/.test(trimmed)) {
      flushList();
      outputLines.push('<hr class="my-8 border-border dark:border-border-dark" />');
      continue;
    }

    // Empty line
    if (trimmed === '') {
      flushList();
      continue;
    }

    // Headings
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const slug = text.replace(/[^\w\u4e00-\u9fff]+/g, '-').toLowerCase();

      // Check for collapsible
      if (isCollapsibleHeading(text)) {
        if (inCollapsible) outputLines.push('</div></details>');
        const type = getCollapsibleType(text);
        outputLines.push(
          `<details class="collapsible-section my-4 border border-border dark:border-border-dark rounded-lg overflow-hidden" data-type="${type}">` +
          `<summary class="flex items-center justify-between px-4 py-3 bg-surface-alt dark:bg-surface-dark-alt cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold">` +
          `<span>${processInline(text)}</span>` +
          `<svg class="chevron w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>` +
          `</summary><div class="px-4 py-3">`
        );
        inCollapsible = true;
        continue;
      }

      // Check for task area
      if (isTaskAreaHeading(text) || isTaskOverviewHeading(text)) {
        if (inTaskArea) outputLines.push('</div>');
        outputLines.push(`<div class="task-area border-l-4 border-task bg-emerald-50/50 dark:bg-emerald-950/20 rounded-r-lg p-4 my-4">`);
        outputLines.push(`<h${level} id="${slug}" class="text-lg font-semibold mb-3">${processInline(text)}</h${level}>`);
        inTaskArea = true;
        continue;
      }

      if (isSuccessCriteriaHeading(text)) {
        if (inSuccessCriteria) outputLines.push('</div>');
        outputLines.push(`<div class="success-criteria bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3 my-3">`);
        outputLines.push(`<h${level} id="${slug}" class="text-base font-semibold text-green-700 dark:text-green-400 mb-2">${processInline(text)}</h${level}>`);
        inSuccessCriteria = true;
        continue;
      }

      // Close success criteria on next heading
      if (inSuccessCriteria && !isSuccessCriteriaHeading(text)) {
        outputLines.push('</div>');
        inSuccessCriteria = false;
      }

      // Close task area on next major heading
      if (inTaskArea && level <= 3) {
        outputLines.push('</div>');
        inTaskArea = false;
      }
      if (inCollapsible && level <= 2) {
        outputLines.push('</div></details>');
        inCollapsible = false;
      }

      const sizes: Record<number, string> = {
        1: 'text-3xl font-bold mt-8 mb-4',
        2: 'text-2xl font-bold mt-8 mb-3',
        3: 'text-xl font-semibold mt-6 mb-2',
        4: 'text-lg font-semibold mt-4 mb-2',
        5: 'text-base font-semibold mt-3 mb-1',
        6: 'text-sm font-semibold mt-2 mb-1',
      };
      outputLines.push(`<h${level} id="${slug}" class="${sizes[level]}">${processInline(text)}</h${level}>`);
      continue;
    }

    // Unordered list
    if (trimmed.match(/^[-*]\s+/)) {
      if (!inList || listType !== 'ul') {
        flushList();
        outputLines.push('<ul class="my-3 pl-6 list-disc space-y-1">');
        inList = true;
        listType = 'ul';
      }
      const content = trimmed.replace(/^[-*]\s+/, '');
      // Check for checklist item
      const checkMatch = content.match(/^\[[ x]\]\s+(.+)$/);
      if (checkMatch) {
        outputLines.push(`<li class="checklist-item">${processInline(checkMatch[1])}</li>`);
      } else {
        outputLines.push(`<li>${processInline(content)}</li>`);
      }
      continue;
    }

    // Ordered list
    if (trimmed.match(/^\d+\.\s+/)) {
      if (!inList || listType !== 'ol') {
        flushList();
        outputLines.push('<ol class="my-3 pl-6 list-decimal space-y-1">');
        inList = true;
        listType = 'ol';
      }
      const content = trimmed.replace(/^\d+\.\s+/, '');
      outputLines.push(`<li>${processInline(content)}</li>`);
      continue;
    }

    // Regular paragraph
    flushList();
    outputLines.push(`<p class="my-3 leading-7">${processInline(trimmed)}</p>`);
  }

  // Flush remaining
  flushBlockquote();
  flushTable();
  flushList();
  if (inCollapsible) outputLines.push('</div></details>');
  if (inSuccessCriteria) outputLines.push('</div>');
  if (inTaskArea) outputLines.push('</div>');

  return outputLines.join('\n');
}

function processInline(text: string): string {
  // Bold
  let result = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  // Italic
  result = result.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Links
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary-dark dark:text-primary-light underline" target="_blank" rel="noopener">$1</a>');
  // Strikethrough
  result = result.replace(/~~(.+?)~~/g, '<del>$1</del>');
  return result;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Full parse pipeline: markdown -> slides + checklist + html
 */
export function parseChapterMarkdown(markdown: string, chapterId: string) {
  const slides = parseSectionSlides(markdown);
  const checklist = parseChecklist(markdown, chapterId);

  // Render each slide's content to HTML
  const renderedSlides = slides.map(slide => ({
    ...slide,
    content: renderMarkdownToHtml(slide.content),
  }));

  // Also render the full document
  const fullHtml = renderMarkdownToHtml(markdown);

  return { slides: renderedSlides, checklist, fullHtml };
}
