// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_URL = "https://portfolio-backend-2-9jbw.onrender.com";

/**
 * Sends a message to the RAG backend (Groq).
 * @param {string} message - User's message
 * @param {Array} history - Chat history 
 * @returns {Promise<string>} - The AI response
 */
export const sendMessageToBackend = async (message, history = []) => {
    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                model_provider: "groq" // Backend defaults to groq anyway
            }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return {
            text: data.response,
            suggestions: data.suggestions || []
        };

    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};
