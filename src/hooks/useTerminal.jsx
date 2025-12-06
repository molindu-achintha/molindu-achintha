import { useState, useEffect } from 'react';
import { commands } from '../data/commands';

export const useTerminal = () => {
    const [history, setHistory] = useState([
        { type: 'output', content: "Welcome to Molindu Achintha's Portfolio v1.0.0" },
        { type: 'output', content: "Type 'help' to see available commands." },
    ]);

    const executeCommand = (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        // Add command to history
        setHistory(prev => [...prev, { type: 'command', content: cmd }]);

        if (!trimmedCmd) return;

        if (trimmedCmd === 'clear') {
            setHistory([]);
            return;
        }

        if (trimmedCmd === 'help') {
            const helpOutput = Object.entries(commands)
                .map(([key, value]) => `${key.padEnd(15)} - ${value.description}`)
                .join('\n');
            setHistory(prev => [...prev, { type: 'output', content: helpOutput }]);
            return;
        }

        const commandObj = commands[trimmedCmd];

        if (commandObj) {
            setHistory(prev => [...prev, {
                type: 'output',
                content: commandObj.output,
                component: commandObj.component
            }]);
        } else {
            setHistory(prev => [...prev, { type: 'error', content: `Command not found: ${cmd}. Type 'help' for a list of commands.` }]);
        }
    };

    return {
        history,
        executeCommand
    };
};
