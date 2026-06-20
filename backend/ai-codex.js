import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateCode() {
    const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: "Build a MERN login API with JWT authentication"
    });

    console.log(response.output_text);
}

generateCode();