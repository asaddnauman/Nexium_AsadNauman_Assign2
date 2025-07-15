// app/api/save/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { scrapeBlog } from "@/lib/scrapeBlog";
import { generateSummary } from "@/lib/summarise";
import { translateToUrdu } from "@/lib/translate";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    const fullText = await scrapeBlog(url);
    const summary = generateSummary(fullText);
    const urdu = translateToUrdu(summary);

    // Save fullText to MongoDB
    const client = await clientPromise;
    const db = client.db("blogDB");
    const blogs = db.collection("blogs");

    await blogs.insertOne({
      url,
      fullText,
      createdAt: new Date(),
    });

    // Save summary to Supabase
    await fetch(`${SUPABASE_URL}/rest/v1/summaries`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        url,
        summary,
        urdu,
      }),
    });

    return NextResponse.json({ success: true, summary, urdu });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json(
      { success: false, error: "Internal error" },
      { status: 500 }
    );
  }
}
