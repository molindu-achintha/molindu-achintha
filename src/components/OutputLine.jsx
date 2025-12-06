import { motion } from 'framer-motion';

const OutputLine = ({ line }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`mb-1 font-mono text-sm md:text-base ${line.type === 'error' ? 'text-red-400' :
                line.type === 'command' ? 'text-terminal-dim' : 'text-terminal-text'
                }`}
        >
            {line.type === 'command' && <span className="mr-2 text-terminal-accent">{'>'}</span>}
            {line.component ? (
                <div className="mt-2 text-terminal-text">
                    {line.component}
                </div>
            ) : (
                <span className="whitespace-pre-wrap">{line.content}</span>
            )}
        </motion.div>
    );
};

export default OutputLine;
