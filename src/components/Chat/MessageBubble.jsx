import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MessageBubble = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
        >
            <div
                className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm md:text-base leading-relaxed shadow-lg ${isUser
                    ? 'bg-terminal-accent text-slate-900 rounded-br-sm font-semibold'
                    : 'bg-slate-800 text-slate-100 rounded-bl-sm border border-slate-700'
                    }`}
            >
                {isUser ? (
                    message.content
                ) : (
                    <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-2 text-sky-400" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2 text-sky-300" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-md font-bold mb-1 text-sky-200" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                                li: ({ node, ...props }) => <li className="marker:text-terminal-accent" {...props} />,
                                strong: ({ node, ...props }) => <strong className="font-bold text-sky-300" {...props} />,
                                a: ({ node, ...props }) => <a className="text-sky-400 hover:underline" target="_blank" {...props} />
                            }}
                        >
                            {message.content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default MessageBubble;
