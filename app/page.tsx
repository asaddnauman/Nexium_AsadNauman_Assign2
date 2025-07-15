"use client";
import { useState } from "react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [urdu, setUrdu] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    setSummary("");
    setUrdu("");

    try {
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (data.success) {
        setSummary(data.summary);
        setUrdu(data.urdu);
        setMessage("✅ Blog summarised and saved!");
      } else {
        setMessage("❌ Failed to process blog.");
      }
    } catch (e) {
      setMessage("❌ Network error.");
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center p-10 gap-6"
      style={{ backgroundImage: "url('/your-background.jpg')" }}
    >
      <h1 className="text-[72px] font-[Gabriola] text-white mt-4">
        Blog Summariser
      </h1>

      <input
        className="text-[48px] font-[Gabriola] p-3 rounded w-[600px]"
        placeholder="Enter blog URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-white text-black text-[48px] font-[Gabriola] px-8 py-2 rounded shadow"
      >
        {loading ? "Processing..." : "Summarise & Save"}
      </button>

      {message && (
        <p className="text-white text-[48px] font-[Gabriola]">{message}</p>
      )}

      {summary && (
        <>
          <div className="text-white text-[48px] font-[Gabriola] max-w-4xl text-left">
            <h2 className="text-[56px]">English Summary:</h2>
            <p>{summary}</p>
          </div>
          <div className="text-white text-[48px] font-[Gabriola] max-w-4xl text-right">
            <h2 className="text-[56px]">اردو خلاصہ:</h2>
            <p>{urdu}</p>
          </div>
        </>
      )}
    </div>
  );
}
