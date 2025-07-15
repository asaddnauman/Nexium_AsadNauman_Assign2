// lib/scrapeBlog.ts
import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeBlog(url: string): Promise<string> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Try to grab article content
    const paragraphs = $("p")
      .map((_, el) => $(el).text())
      .get();

    const fullText = paragraphs.join(" ").replace(/\s+/g, " ").trim();
    return fullText.slice(0, 10000); // Limit to 10,000 chars if too long
  } catch (error) {
    console.error("Scraping failed:", error);
    return "";
  }
}
