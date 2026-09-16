import { NextResponse } from "next/server";
import { llm } from "@/src/lib/llm";

export async function GET() {
    try {
        const response = await llm.invoke(
            "Explain what a REST API is in one sentence."
        );

        return NextResponse.json({
            response: response.content,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to generate response" },
            { status: 500 }
        );
    }
}