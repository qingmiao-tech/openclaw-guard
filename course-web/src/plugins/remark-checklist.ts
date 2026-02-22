import type { ChecklistItem } from '../types';

/**
 * Extract checklist items from markdown text.
 * Looks for "- [ ] text" patterns within a "验收自检" section.
 */
export function parseChecklist(markdown: string, chapterId: string): ChecklistItem[] {
  const items: ChecklistItem[] = [];
  const lines = markdown.split(/\r?\n/);
  let inChecklistSection = false;
  let itemIndex = 0;

  for (const line of lines) {
    // Detect checklist section header
    if (/验收自检/.test(line) && /^#{1,4}\s/.test(line)) {
      inChecklistSection = true;
      continue;
    }

    // Exit checklist section on next heading
    if (inChecklistSection && /^#{1,4}\s/.test(line) && !/验收自检/.test(line)) {
      inChecklistSection = false;
      continue;
    }

    if (inChecklistSection) {
      const match = line.match(/^-\s+\[[ x]\]\s+(.+)$/);
      if (match) {
        itemIndex++;
        items.push({
          id: `${chapterId}-check-${itemIndex}`,
          text: match[1].trim(),
          checked: false,
        });
      }
    }
  }

  return items;
}
