import { CHAPTER_LIST } from '../data/course-structure';
import type { ChapterMeta } from '../types';

/**
 * Get previous and next chapters for navigation.
 */
export function getPrevNext(currentId: string): { prev: ChapterMeta | null; next: ChapterMeta | null } {
  const idx = CHAPTER_LIST.findIndex((c) => c.id === currentId);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? CHAPTER_LIST[idx - 1] : null,
    next: idx < CHAPTER_LIST.length - 1 ? CHAPTER_LIST[idx + 1] : null,
  };
}
