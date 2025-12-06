import { useState, useRef, useEffect } from 'react';

const CommandInput = ({ onExecute }) => {
    const [input, setInput] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        // Auto-focus on mount and keep focus
        const focusInput = () => inputRef.current?.focus();
        focusInput();
        window.addEventListener('click', focusInput);
        return () => window.removeEventListener('click', focusInput);
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onExecute(input);
            setInput('');
        }
    };

    return (
        <div className="flex items-center w-full font-mono text-sm md:text-base">
            <span className="mr-2 text-terminal-accent">{'>'}</span>
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-terminal-text caret-terminal-accent"
                autoFocus
                spellCheck="false"
            />
        </div>
    );
};

export default CommandInput;
