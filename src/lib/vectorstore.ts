import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { embeddings } from "./embeddings";
import { db } from "./mongodb";

const collection = db.collection("chunks") as any ;

export const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
    collection,
    indexName: "vector_index",
    textKey: "text",
    embeddingKey: "embedding",
});