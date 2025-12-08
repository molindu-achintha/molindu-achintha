import { useState, useRef, useEffect } from 'react';
import MessageBubble from './Chat/MessageBubble';
import ChatInput from './Chat/ChatInput';
import SuggestionCards from './Chat/SuggestionCards';
import { sendMessageToBackend } from '../services/gemini';
import { motion } from 'framer-motion';
import { Sparkles, Menu, Bot } from 'lucide-react';

const ChatInterface = () => {
    // Provider state removed as we now only use Groq
    const [messages, setMessages] = useState([
        { role: 'model', content: "👋 Hi! I'm **Molindu's AI Assistant**. I can tell you about his projects, technical skills, and experience.\n\nTry asking: \"What projects have you worked on?\"" }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (text) => {
        const userMessage = { role: 'user', content: text };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        try {
            // Using generic backend call (Groq)
            const { text: responseText, suggestions } = await sendMessageToBackend(text, messages);

            setMessages(prev => [...prev, {
                role: 'model',
                content: responseText,
                suggestions: suggestions
            }]);

        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: 'model', content: "⚠️ Sorry, I encountered an error. Please ensure the backend is running." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-transparent text-gray-100">
            {/* Header - Clean and minimal */}
            <header className="flex-shrink-0 border-b border-gray-800/30 bg-transparent sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                            <Sparkles size={18} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold tracking-tight">
                                Molindu<span className="text-violet-400">.ai</span>
                            </h1>
                            <p className="text-xs text-gray-500">Portfolio Assistant (Groq)</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Messages Area */}
            <main className="flex-1 overflow-y-auto">
                <div className="min-h-full">
                    {messages.map((msg, idx) => (
                        <MessageBubble key={idx} message={msg} onSuggestionClick={handleSend} />
                    ))}

                    {messages.length === 1 && !isTyping && (
                        <div className="max-w-3xl mx-auto px-4 pb-8">
                            <SuggestionCards onSelect={handleSend} />
                        </div>
                    )}

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full py-6 bg-transparent"
                        >
                            <div className="max-w-3xl mx-auto px-4 md:px-6">
                                <div className="flex gap-6">
                                    <div className="w-8 h-8 rounded mt-1 bg-teal-600/20 flex items-center justify-center text-teal-400">
                                        <Bot size={16} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Assistant</div>
                                        <div className="text-teal-400 font-mono text-sm">
                                            <span className="animate-pulse">▋</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input Area - Fixed at bottom */}
            <footer className="flex-shrink-0 border-t border-gray-800/30 bg-transparent">
                <div className="max-w-3xl mx-auto px-4 py-4">
                    <ChatInput onSend={handleSend} disabled={isTyping} />
                    <p className="text-center text-xs text-gray-600 mt-3">
                        AI responses are generated based on portfolio data. Accuracy may vary.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default ChatInterface;
