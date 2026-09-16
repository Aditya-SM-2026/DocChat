import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const message = body?.message ?? "";

  return NextResponse.json({
    ok: true,
    reply: `I received your question: ${message}`,
    createdAt: new Date().toISOString(),
  });
}
