import { GoogleGenAI } from "@google/genai";
import { serverConfig } from "./serverConfig.js";

const ai = new GoogleGenAI({ apiKey: serverConfig.GEMINI_API_KEY });

async function main(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    return response;
}

export const generateUsingGemini = async (prompt) => {
    return main(prompt);
}