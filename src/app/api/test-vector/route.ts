import { NextResponse } from "next/server";
import { Document } from "@langchain/core/documents";
import { vectorStore } from "@/src/lib/vectorstore";

export async function GET() {
    try {
        const document = new Document({
            pageContent:
                "Trauma study ",
            metadata: {
                source: "test-document",
                page: 1,
            },
        });

        await vectorStore.addDocuments([document]);

        return NextResponse.json({
            message: "Test document added successfully",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Failed to add test document",
            },
            { status: 500 }
        );
    }
}