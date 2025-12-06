import { useState, useRef, useEffect } from 'react';
import MessageBubble from './Chat/MessageBubble';
import ChatInput from './Chat/ChatInput';
import { sendMessageToGemini } from '../services/gemini';
import { motion, AnimatePresence } from 'framer-motion';

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { role: 'model', content: "Hi! I'm Molindu's AI Assistant. Ask me anything about his projects, skills, or experience!" }
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
            const stream = await sendMessageToGemini(text, messages);

            let fullResponse = "";
            setMessages(prev => [...prev, { role: 'model', content: "" }]);

            for await (const chunk of stream) {
                const chunkText = chunk.text();
                fullResponse += chunkText;

                setMessages(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1].content = fullResponse;
                    return newHistory;
                });
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', content: "Sorry, I encountered an error. Please check your API Key or try again." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30">
            {/* Header */}
            <div className="border-b border-slate-800 p-4 flex justify-between items-center bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
                <h1 className="font-bold text-xl tracking-tight">Molindu<span className="text-sky-400">.ai</span></h1>
                <div className="text-xs text-slate-400 px-2 py-1 bg-slate-800 rounded-full border border-slate-700">
                    Powered by Gemini 2.5 Flash
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
                <div className="max-w-4xl mx-auto">
                    {messages.map((msg, idx) => (
                        <MessageBubble key={idx} message={msg} />
                    ))}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-2 p-4 text-slate-500 text-sm"
                        >
                            <span className="animate-bounce">●</span>
                            <span className="animate-bounce delay-100">●</span>
                            <span className="animate-bounce delay-200">●</span>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <div className="bg-slate-950/80 backdrop-blur-md pb-4 pt-2">
                <ChatInput onSend={handleSend} disabled={isTyping} />
                <div className="text-center text-xs text-slate-600 pb-2">
                    AI can make mistakes. Please double check important info.
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
