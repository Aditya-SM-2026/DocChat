import { NextResponse } from "next/server";
import { vectorStore } from "@/src/lib/vectorstore";
import { llm } from "@/src/lib/llm";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const question = searchParams.get("q");

        if (!question) {
            return NextResponse.json(
                { error: "Question is required" },
                { status: 400 }
            );
        }

        // 1. Retrieve relevant chunks
        const results = await vectorStore.similaritySearch(question, 3);

        // 2. Extract text from retrieved documents
        const context = results
            .map((doc) => doc.pageContent)
            .join("\n\n");

        // 3. Build RAG prompt
        const prompt = `
You are a document question-answering assistant.

Answer the user's question using ONLY the provided context.

If the answer cannot be found in the context, say:
"I couldn't find the answer in the document."

Context:
${context}

Question:
${question}
`;

        // 4. Ask Gemini
        const response = await llm.invoke(prompt);

        return NextResponse.json({
            question,
            answer: response.content,
            sources: results.map((doc) => ({
                pageContent: doc.pageContent,
                metadata: doc.metadata,
            })),
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to answer question" },
            { status: 500 }
        );
    }
}