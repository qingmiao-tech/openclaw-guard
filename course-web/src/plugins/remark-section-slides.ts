import type { SectionSlide } from '../types';

/**
 * Parse markdown text into SectionSlide objects by splitting on "## 第 N 页" headings.
 * Each slide gets a page number, title, slug, and the raw markdown content of that section.
 */
export function parseSectionSlides(markdown: string): SectionSlide[] {
  const lines = markdown.split(/\r?\n/);
  const slides: SectionSlide[] = [];
  // Match: ## 第 N 页 · Title  or  ## 第 N 页 · Title
  const slideHeadingRegex = /^##\s+第\s*(\d+)\s*页\s*[·.·]\s*(.+)$/;

  let currentSlide: { pageNumber: number; title: string; slug: string; lines: string[] } | null = null;

  for (const line of lines) {
    const match = line.match(slideHeadingRegex);
    if (match) {
      // Save previous slide
      if (currentSlide) {
        slides.push({
          pageNumber: currentSlide.pageNumber,
          title: currentSlide.title,
          slug: currentSlide.slug,
          content: currentSlide.lines.join('\n').trim(),
        });
      }
      const pageNumber = parseInt(match[1], 10);
      const title = match[2].trim();
      const slug = `slide-${pageNumber}`;
      currentSlide = { pageNumber, title, slug, lines: [] };
    } else if (currentSlide) {
      currentSlide.lines.push(line);
    }
    // Lines before the first slide heading are ignored (cover/meta)
  }

  // Push last slide
  if (currentSlide) {
    slides.push({
      pageNumber: currentSlide.pageNumber,
      title: currentSlide.title,
      slug: currentSlide.slug,
      content: currentSlide.lines.join('\n').trim(),
    });
  }

  return slides;
}
