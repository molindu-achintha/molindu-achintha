import { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

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
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
        }
    }, [input]);

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-end gap-2 sm:gap-3 p-2 sm:p-3 bg-[#1e1e1e] rounded-xl border border-gray-700/50 focus-within:border-violet-500/50 focus-within:ring-1 focus-within:ring-violet-500/20 transition-all">
                <div className="pb-2 text-violet-500 font-mono select-none hidden sm:block">{'>'}</div>
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    disabled={disabled}
                    rows={1}
                    className="flex-1 bg-transparent text-gray-200 placeholder-gray-600 resize-none outline-none py-2 max-h-[150px] font-mono text-sm sm:text-base leading-relaxed"
                />
                <button
                    type="submit"
                    disabled={disabled || !input.trim()}
                    className={`flex-shrink-0 w-10 h-10 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all touch-manipulation ${input.trim() && !disabled
                        ? 'bg-violet-500 hover:bg-violet-400 active:bg-violet-600 text-white shadow-lg shadow-violet-500/25'
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
