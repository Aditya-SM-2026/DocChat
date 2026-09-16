import { NextResponse } from "next/server";
import { embeddings } from "@/src/lib/embeddings";

export async function GET() {
    try {
        const text =
            "Hey My name is Aditya Joshi.";

        const vector = await embeddings.embedQuery(text);
        return NextResponse.json({
            text,
            vectorLength: vector.length,
            vector,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Failed to generate embedding",
            },
            { status: 500 }
        );
    }
}