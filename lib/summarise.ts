// lib/summarise.ts

export function generateSummary(text: string): string {
  // Fake AI logic: return first 3 sentences
  const sentences = text.split(/[.?!]\s+/);
  const summary = sentences.slice(0, 3).join(". ") + ".";
  return summary;
}
