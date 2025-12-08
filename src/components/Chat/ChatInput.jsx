import { useState, useRef, useEffect } from 'react';
import { Send, ArrowUp } from 'lucide-react';

const ChatInput = ({ onSend, disabled }) => {
    const [input, setInput] = useState('');
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input.trim());
            setInput('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
        }
    }, [input]);

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-end gap-3 p-3 bg-[#1e1e1e] rounded-lg border border-gray-700/50 focus-within:border-violet-500/50 focus-within:ring-1 focus-within:ring-violet-500/20 transition-all">
                <div className="pb-2 text-violet-500 font-mono select-none">{'>'}</div>
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a command..."
                    disabled={disabled}
                    rows={1}
                    className="flex-1 bg-transparent text-gray-200 placeholder-gray-600 resize-none outline-none py-1 max-h-[200px] font-mono text-sm leading-relaxed"
                />
                <button
                    type="submit"
                    disabled={disabled || !input.trim()}
                    className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${input.trim() && !disabled
                        ? 'bg-violet-500 hover:bg-violet-400 text-white shadow-lg shadow-violet-500/25'
                        : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    <ArrowUp size={18} />
                </button>
            </div>
        </form>
    );
};

export default ChatInput;
