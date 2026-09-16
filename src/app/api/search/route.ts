import { NextResponse } from "next/server";
import { vectorStore } from "@/src/lib/vectorstore";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q");

        if (!query) {
            return NextResponse.json(
                { error: "Query is required" },
                { status: 400 }
            );
        }

        const results = await vectorStore.similaritySearchWithScore(query, 3);

        return NextResponse.json({
            query,
            results: results.map(([doc, score]) => ({
                pageContent: doc.pageContent,
                score,
                metadata: doc.metadata,
            })),
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Vector search failed" },
            { status: 500 }
        );
    }
}