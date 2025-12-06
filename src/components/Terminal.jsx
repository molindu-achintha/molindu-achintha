import { useRef, useEffect } from 'react';
import OutputLine from './OutputLine';
import CommandInput from './CommandInput';
import { useTerminal } from '../hooks/useTerminal';

const Terminal = () => {
    const { history, executeCommand } = useTerminal();
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <div className="min-h-screen bg-terminal-bg p-4 md:p-8 font-mono overflow-auto" onClick={() => document.querySelector('input')?.focus()}>
            <div className="max-w-4xl mx-auto">
                {history.map((line, index) => (
                    <OutputLine key={index} line={line} />
                ))}
                <CommandInput onExecute={executeCommand} />
                <div ref={bottomRef} className="h-4" />
            </div>
        </div>
    );
};

export default Terminal;
