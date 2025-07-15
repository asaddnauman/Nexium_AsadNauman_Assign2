// lib/translate.ts

const dictionary: Record<string, string> = {
  blog: "بلاگ",
  summary: "خلاصہ",
  the: "یہ",
  is: "ہے",
  and: "اور",
  this: "یہ",
  article: "مضمون",
  // Add more as needed
};

export function translateToUrdu(text: string): string {
  return text
    .split(" ")
    .map((word) => dictionary[word.toLowerCase()] || word)
    .join(" ");
}
