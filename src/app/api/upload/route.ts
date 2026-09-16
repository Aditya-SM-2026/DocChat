import { NextResponse } from "next/server";
import fs from "fs/promises"
import path from "path"
import { loadPDF } from "@/src/lib/pdf-loader";
import { splitDocuments } from "@/src/lib/splitter";
import { vectorStore } from "@/src/lib/vectorstore";



export async function POST(request: Request) {

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No PDF file provided" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "uploads");

    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);

    await fs.writeFile(filePath, buffer);

    const documents = await loadPDF(filePath);
    const chunks = await splitDocuments(documents);
    await vectorStore.addDocuments(chunks);

    return NextResponse.json({
      message: "PDF processed and stored in vector DB  successfully",
      filename: file.name,

      documentCount: documents.length,
      chunkCount: chunks.length,

      chunks: chunks.map((chunk) => ({
        pageContent: chunk.pageContent,
        metadata: chunk.metadata,
      })),
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 }
    );

  }

}
