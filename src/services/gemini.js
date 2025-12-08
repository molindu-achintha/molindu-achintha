const API_URL = "http://localhost:8000";

/**
 * Sends a message to the RAG backend (Groq).
 * @param {string} message - User's message
 * @param {Array} history - Chat history (unused in this backend implementation but kept for compatibility)
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
        return data.response;

    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};
