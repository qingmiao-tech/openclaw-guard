export interface ChapterMeta {
  id: string;
  title: string;
  duration: string;
  tier: string;
  order: number;
  filename: string;
}

export interface SectionSlide {
  pageNumber: number;
  title: string;
  slug: string;
  content: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface ParsedChapter {
  meta: ChapterMeta;
  slides: SectionSlide[];
  checklist: ChecklistItem[];
  rawHtml: string;
}

export interface Tier {
  name: string;
  icon: string;
  chapters: string[];
}

export interface TocItem {
  pageNumber: number;
  title: string;
  slug: string;
}

export interface ProgressData {
  chapters: Record<string, ChapterProgress>;
  lastVisited: string;
  darkMode: boolean;
}

export interface ChapterProgress {
  completed: boolean;
  checklist: Record<string, boolean>;
  lastAccessed: string;
}

export interface SearchEntry {
  chapterId: string;
  chapterTitle: string;
  slideTitle: string;
  slug: string;
  content: string;
}

export interface SearchResult {
  chapterId: string;
  chapterTitle: string;
  slideTitle: string;
  slug: string;
  matchedSnippet: string;
}

export type CalloutType = 'tip' | 'warning' | 'danger' | 'info';

export interface CollapsibleType {
  keyword: string;
  type: 'troubleshooting' | 'extended-reading' | 'advanced-config' | 'security-tip';
}
