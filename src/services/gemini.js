import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from "../data/systemPrompt";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: systemPrompt
});

export const sendMessageToGemini = async (message, history = []) => {
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
