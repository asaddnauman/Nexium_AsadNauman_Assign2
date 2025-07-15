import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const text = $("body").text().replace(/\s+/g, " ").trim();
    const summary = text.split(".").slice(0, 2).join(".") + ".";

    const client = await clientPromise;
    const db = client.db("blogDB");
    await db.collection("blogs").insertOne({ url, fullText: text });

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json({ error: "Failed to process" }, { status: 500 });
  }
}
