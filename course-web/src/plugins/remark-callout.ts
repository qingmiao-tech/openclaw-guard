import type { CalloutType } from '../types';

const EMOJI_TYPE_MAP: Record<string, CalloutType> = {
  '💡': 'tip',
  '⚠️': 'warning',
  '⚠': 'warning',
  '🔒': 'danger',
  '🔥': 'danger',
  '🎯': 'info',
  '🎉': 'info',
  '🕐': 'info',
};

// Common emoji regex - matches most emoji characters
const EMOJI_REGEX = /^([\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]+)\s*/u;

/**
 * Determine callout type from a blockquote text that starts with an emoji.
 * Returns the type and the text with the emoji prefix removed.
 */
export function parseCallout(text: string): { type: CalloutType; content: string } | null {
  const trimmed = text.trim();

  // Check known emoji prefixes first
  for (const [emoji, type] of Object.entries(EMOJI_TYPE_MAP)) {
    if (trimmed.startsWith(emoji)) {
      const content = trimmed.slice(emoji.length).trim();
      return { type, content };
    }
  }

  // Check for any emoji prefix -> default to info
  const emojiMatch = trimmed.match(EMOJI_REGEX);
  if (emojiMatch) {
    const content = trimmed.slice(emojiMatch[0].length).trim();
    return { type: 'info', content };
  }

  return null;
}

/**
 * Get CSS classes for a callout type.
 */
export function getCalloutClasses(type: CalloutType): string {
  const base = 'callout border-l-4 rounded-r-lg px-4 py-3 my-4';
  switch (type) {
    case 'tip':
      return `${base} bg-blue-50 border-blue-400 dark:bg-blue-950/30 dark:border-blue-500`;
    case 'warning':
      return `${base} bg-amber-50 border-amber-400 dark:bg-amber-950/30 dark:border-amber-500`;
    case 'danger':
      return `${base} bg-red-50 border-red-400 dark:bg-red-950/30 dark:border-red-500`;
    case 'info':
      return `${base} bg-gray-50 border-gray-400 dark:bg-gray-800/30 dark:border-gray-500`;
  }
}
