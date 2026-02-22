/**
 * Parse a course section filename into a chapter ID and order.
 * Examples:
 *   "Day01-xxx.md" -> { id: "day01", order: 1 }
 *   "Day13-xxx.md" -> { id: "day13", order: 13 }
 *   "LabA-xxx.md"  -> { id: "labA", order: 14 }
 *   "LabE-xxx.md"  -> { id: "labE", order: 18 }
 */
export function parseChapterId(filename: string): { id: string; order: number } | null {
  // Match Day01, Day02, ..., Day13
  const dayMatch = filename.match(/^Day(\d{2})/);
  if (dayMatch) {
    const num = parseInt(dayMatch[1], 10);
    return { id: `day${dayMatch[1]}`, order: num };
  }

  // Match LabA, LabB, ..., LabE
  const labMatch = filename.match(/^Lab([A-E])/);
  if (labMatch) {
    const letter = labMatch[1];
    const labOrder = letter.charCodeAt(0) - 'A'.charCodeAt(0) + 14; // A=14, B=15, ...
    return { id: `lab${letter}`, order: labOrder };
  }

  return null;
}
