// app/page.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import "@/app/globals.css";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [translation, setTranslation] = useState("");

  const urduDict: { [key: string]: string } = {
    "This is a simulated summary.": "یہ ایک فرضی خلاصہ ہے۔",
    example: "مثال",
    summary: "خلاصہ",
    blog: "بلاگ",
    text: "متن",
    article: "مضمون",
  };

  const fakeSummarise = (text: string) => {
    return "This is a simulated summary.";
  };

  const translateToUrdu = (text: string) => {
    return text
      .split(" ")
      .map((word) => urduDict[word] || word)
      .join(" ");
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/save", { url });
      const fullText = response.data.fullText;
      const summaryText = fakeSummarise(fullText);
      const urduTranslation = translateToUrdu(summaryText);
      setSummary(summaryText);
      setTranslation(urduTranslation);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-10"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <h1
        className="text-[72px] font-bold mb-8"
        style={{ fontFamily: "Gabriola, cursive" }}
      >
        Blog Summariser
      </h1>

      <div className="flex flex-col items-center space-y-4">
        <Input
          type="text"
          placeholder="Enter blog URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-[400px] text-[48px]"
          style={{ fontFamily: "Gabriola, cursive" }}
        />
        <Button
          onClick={handleSubmit}
          className="text-[48px]"
          style={{ fontFamily: "Gabriola, cursive" }}
        >
          Save to MongoDB
        </Button>

        {summary && (
          <div
            className="mt-10 text-[48px] text-white text-center"
            style={{ fontFamily: "Gabriola, cursive" }}
          >
            <p>
              <strong>Summary:</strong> {summary}
            </p>
            <p>
              <strong>Urdu:</strong> {translation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
