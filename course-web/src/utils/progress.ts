import type { ProgressData, ChapterProgress } from '../types';

const STORAGE_KEY = 'openclaw-course-progress';

function defaultProgress(): ProgressData {
  return { chapters: {}, lastVisited: '', darkMode: false };
}

function defaultChapterProgress(): ChapterProgress {
  return { completed: false, checklist: {}, lastAccessed: '' };
}

export function getProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const data = JSON.parse(raw);
    if (typeof data !== 'object' || data === null) return defaultProgress();
    return { ...defaultProgress(), ...data };
  } catch {
    return defaultProgress();
  }
}

function saveProgress(data: ProgressData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // QuotaExceededError or other - silently fail
  }
}

export function getChapterProgress(chapterId: string): ChapterProgress {
  const data = getProgress();
  return data.chapters[chapterId] || defaultChapterProgress();
}

export function setChapterCompleted(chapterId: string, completed: boolean): void {
  const data = getProgress();
  if (!data.chapters[chapterId]) {
    data.chapters[chapterId] = defaultChapterProgress();
  }
  data.chapters[chapterId].completed = completed;
  data.chapters[chapterId].lastAccessed = new Date().toISOString();
  saveProgress(data);
}

export function toggleChecklistItem(chapterId: string, itemId: string): boolean {
  const data = getProgress();
  if (!data.chapters[chapterId]) {
    data.chapters[chapterId] = defaultChapterProgress();
  }
  const current = data.chapters[chapterId].checklist[itemId] || false;
  data.chapters[chapterId].checklist[itemId] = !current;
  data.chapters[chapterId].lastAccessed = new Date().toISOString();
  saveProgress(data);
  return !current;
}

export function isChapterCompleted(chapterId: string, totalChecklistItems: number): boolean {
  const data = getProgress();
  const chapter = data.chapters[chapterId];
  if (!chapter) return false;
  if (chapter.completed) return true;
  if (totalChecklistItems === 0) return false;
  const checkedCount = Object.values(chapter.checklist).filter(Boolean).length;
  return checkedCount >= totalChecklistItems;
}

export function getOverallCompletion(totalChapters: number): number {
  if (totalChapters === 0) return 0;
  const data = getProgress();
  let completed = 0;
  for (const chapterId of Object.keys(data.chapters)) {
    if (data.chapters[chapterId].completed) completed++;
  }
  return Math.round((completed / totalChapters) * 100);
}

export function setDarkMode(enabled: boolean): void {
  const data = getProgress();
  data.darkMode = enabled;
  saveProgress(data);
}

export function getDarkMode(): boolean {
  return getProgress().darkMode;
}

export function setLastVisited(chapterId: string): void {
  const data = getProgress();
  data.lastVisited = chapterId;
  saveProgress(data);
}
