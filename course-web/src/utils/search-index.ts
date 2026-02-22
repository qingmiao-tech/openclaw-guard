import type { SearchEntry, SectionSlide } from '../types';
import type { ChapterMeta } from '../types';

/**
 * Build search entries from parsed chapter data.
 */
export function buildSearchEntries(
  meta: ChapterMeta,
  slides: SectionSlide[]
): SearchEntry[] {
  return slides.map((slide) => ({
    chapterId: meta.id,
    chapterTitle: meta.title,
    slideTitle: slide.title,
    slug: slide.slug,
    content: stripHtml(slide.content),
  }));
}

/**
 * Strip HTML tags and markdown syntax for plain text search.
 */
function stripHtml(text: string): string {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/[#*_~\[\]()>|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
