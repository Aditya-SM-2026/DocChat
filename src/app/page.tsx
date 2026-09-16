"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setResult(data);
    setLoading(false);
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">
        DocChat
      </h1>

      <div className="flex flex-col gap-4 max-w-xl">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
          }}
        />

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Processing..." : "Upload PDF"}
        </button>
      </div>

      {result && (
        <pre className="mt-8 whitespace-pre-wrap rounded border p-4">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}