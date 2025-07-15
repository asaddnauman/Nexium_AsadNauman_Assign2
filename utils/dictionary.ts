// utils/dictionary.ts

export const urduDictionary: Record<string, string> = {
  blog: "بلاگ",
  summary: "خلاصہ",
  this: "یہ",
  is: "ہے",
  a: "ایک",
  test: "امتحان",
  example: "مثال",
  text: "متن",
};

export function translateToUrdu(text: string): string {
  return text
    .split(" ")
    .map((word) => urduDictionary[word.toLowerCase()] || word)
    .join(" ");
}
