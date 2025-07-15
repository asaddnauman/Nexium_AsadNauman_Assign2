const dictionary: Record<string, string> = {
  blog: "بلاگ",
  summary: "خلاصہ",
  the: "دی",
  is: "ہے",
  about: "کے بارے میں",
  and: "اور",
};

export function translateToUrdu(text: string): string {
  return text
    .split(" ")
    .map((word) => dictionary[word.toLowerCase()] || word)
    .join(" ");
}
