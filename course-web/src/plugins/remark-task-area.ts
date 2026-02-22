/**
 * Check if a heading indicates a practical task section.
 */
export function isTaskAreaHeading(headingText: string): boolean {
  const text = headingText.trim();
  return text.includes('实操任务') || text.includes('操作步骤');
}

/**
 * Check if a heading indicates a success criteria section.
 */
export function isSuccessCriteriaHeading(headingText: string): boolean {
  const text = headingText.trim();
  return text.includes('成功标志') || text.includes('✅ 成功标志');
}

/**
 * Check if a heading indicates a task overview table.
 */
export function isTaskOverviewHeading(headingText: string): boolean {
  const text = headingText.trim();
  return text.includes('实操任务总览');
}
