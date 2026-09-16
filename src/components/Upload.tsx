"use client";

export default function Upload() {
  return (
    <section className="rounded-xl border p-4">
      <h2 className="text-xl font-semibold">Upload PDF</h2>
      <input type="file" accept="application/pdf" className="mt-3" />
    </section>
  );
}
