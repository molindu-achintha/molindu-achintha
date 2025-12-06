import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const ChatInput = ({ onSend, disabled }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-4xl mx-auto p-4">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-sky-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative flex items-center bg-slate-900 rounded-lg border border-slate-700 shadow-xl overflow-hidden">
                    <div className="pl-4">
                        <Sparkles size={20} className="text-sky-400 animate-pulse" />
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything (e.g., 'Show me your RAG project')..."
                        className="w-full bg-transparent text-slate-100 px-4 py-4 focus:outline-none placeholder-slate-500"
                        disabled={disabled}
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={disabled || !input.trim()}
                        className="p-3 mr-1 text-slate-400 hover:text-white disabled:opacity-50 transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ChatInput;
