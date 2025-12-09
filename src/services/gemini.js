// const API_URL = "http://localhost:8000";
const API_URL = "https://portfolio-backend-875247115502.us-central1.run.app/";

/**
 * Sends a message to the RAG backend (Groq).
 * @param {string} message - User's message
 * @param {Array} history - Chat history for context-aware suggestions
 * @returns {Promise<object>} - The AI response with text and suggestions
 */
export const sendMessageToBackend = async (message, history = []) => {
    try {
        // Format history for backend
        const formattedHistory = history.map(msg => ({
            role: msg.role === 'model' ? 'assistant' : msg.role,
            content: msg.content
        }));

        const response = await fetch(`${API_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                model_provider: "groq",
                history: formattedHistory
            }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return {
            text: data.response,
            suggestions: data.suggestions || [],
            videos: data.videos || [] // Capture videos from backend
        };

    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};
