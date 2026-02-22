const COLLAPSIBLE_KEYWORDS = [
  '故障排查速查',
  '故障排查',
  '延伸阅读',
  '进阶配置',
  '安全提示',
  '常见问题',
  '常见问题排查',
  'FAQ',
];

/**
 * Check if a heading text should be rendered as a collapsible section.
 */
export function isCollapsibleHeading(headingText: string): boolean {
  const normalized = headingText.trim();
  return COLLAPSIBLE_KEYWORDS.some((kw) => normalized.includes(kw));
}

/**
 * Get the collapsible type from a heading text.
 */
export function getCollapsibleType(headingText: string): string {
  const text = headingText.trim();
  if (text.includes('故障排查') || text.includes('常见问题') || text.includes('FAQ')) return 'troubleshooting';
  if (text.includes('延伸阅读')) return 'extended-reading';
  if (text.includes('进阶配置')) return 'advanced-config';
  if (text.includes('安全提示')) return 'security-tip';
  return 'troubleshooting';
}
