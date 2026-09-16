import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import type { Document } from "@langchain/core/documents";

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});

export async function splitDocuments(documents: Document[]) {
    const chunks = await splitter.splitDocuments(documents);

    return chunks;
}