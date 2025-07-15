"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [translation, setTranslation] = useState("");

  const translateToUrdu = (text: string) => {
    const dictionary: { [key: string]: string } = {
      blog: "بلاگ",
      post: "تحریر",
      summary: "خلاصہ",
      example: "مثال",
    };
    return text
      .split(" ")
      .map((word) => dictionary[word.toLowerCase()] || word)
      .join(" ");
  };

  const handleSummarise = async () => {
    try {
      const res = await axios.post("/api/save", { url });
      setSummary(res.data.summary);
      setTranslation(translateToUrdu(res.data.summary));
    } catch (error) {
      console.error("Error summarizing:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: "url('/background.jpg')",
        fontFamily: "Gabriola",
      }}
    >
      <h1 className="text-[72px] text-white font-bold mb-6">Blog Summariser</h1>
      <div className="w-full max-w-xl space-y-4">
        <Input
          placeholder="Enter blog URL"
          className="text-[48px]"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={handleSummarise} className="text-[32px]">
          Summarise & Translate
        </Button>
        {summary && (
          <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg space-y-4">
            <p className="text-[48px] text-black">Summary: {summary}</p>
            <p className="text-[48px] text-green-700">Urdu: {translation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
