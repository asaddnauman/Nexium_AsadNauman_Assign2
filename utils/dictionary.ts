export const urduDictionary: Record<string, string> = {
  blog: "\u0628\u0644\u0627\u06af",
  summary: "\u062e\u0644\u0627\u0635\u06c1",
  this: "\u06cc\u06c1",
  is: "\u06c1\u06d2",
  a: "\u0627\u06cc\u06a9",
  test: "\u0627\u0645\u062a\u062d\u0627\u0646",
  example: "\u0645\u062b\u0627\u0644",
  text: "\u0645\u062a\u0646",
};

export function translateToUrdu(text: string): string {
  return text
    .split(" ")
    .map((word) => urduDictionary[word.toLowerCase()] || word)
    .join(" ");
}
