import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from "../data/systemPrompt";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let model = null;

try {
    if (apiKey) {
        genAI = new GoogleGenerativeAI(apiKey);
        model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: systemPrompt
        });
    } else {
        console.warn("Gemini API Key is missing. Check .env file.");
    }
} catch (e) {
    console.error("Failed to initialize Gemini:", e);
}

export const sendMessageToGemini = async (message, history = []) => {
    if (!model) {
        throw new Error("Gemini Model not initialized. Is the API Key valid?");
    }
    try {
        const chat = model.startChat({
            history: history.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }],
            })),
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
            },
        });

        const result = await chat.sendMessageStream(message);
        return result.stream;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};
