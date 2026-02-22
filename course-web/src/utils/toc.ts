import type { SectionSlide, TocItem } from '../types';

/**
 * Generate a table of contents from SectionSlide array.
 */
export function generateToc(slides: SectionSlide[]): TocItem[] {
  return slides.map((slide) => ({
    pageNumber: slide.pageNumber,
    title: slide.title,
    slug: slide.slug,
  }));
}
