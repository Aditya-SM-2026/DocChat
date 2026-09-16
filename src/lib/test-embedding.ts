import "dotenv/config";
import { embeddings } from "./embeddings";

async function testEmbedding() {
    console.log("APi key ", process.env.GOOGLE_API_KEY);

    const text =
        "JWT authentication allows users to securely access protected routes using a token.";

    const vector = await embeddings.embedQuery(text);

    console.log("Vector length:", vector.length);

    console.log("First 10 values:");

    console.log(vector.slice(0, 10));
}

testEmbedding();