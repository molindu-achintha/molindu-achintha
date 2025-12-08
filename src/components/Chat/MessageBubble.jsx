import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Bot, Copy, Check } from 'lucide-react';
import { useState } from 'react';

// Helper to extract images from text
const extractImages = (text) => {
    // Matches http/https URLs OR relative paths starting with / ending in image extensions
    const imageRegex = /((https?:\/\/[^\s]+|^\/[^\s]+)\.(jpeg|jpg|png|gif|webp|svg))/gi;
    return text.match(imageRegex) || [];
};

const CodeBlock = ({ children, className }) => {
    const [copied, setCopied] = useState(false);
    const language = className?.replace('language-', '') || 'text';

    const handleCopy = () => {
        navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-4 rounded-lg overflow-hidden bg-[#1e1e1e] border border-[#3c3c3c]">
            {/* VS Code style header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#3c3c3c]">
                <span className="text-xs text-gray-400 font-mono">{language}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            {/* Code content */}
            <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-[#d4d4d4] leading-relaxed">
                    {children}
                </code>
            </pre>
        </div>
    );
};

const MessageBubble = ({ message, onSuggestionClick }) => {
    const isUser = message.role === 'user';
    const images = !isUser ? extractImages(message.content) : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full py-6 bg-transparent border-b border-gray-800/30"
        >
            <div className="max-w-3xl mx-auto px-4 md:px-6">
                <div className="flex gap-6">
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded mt-1 flex items-center justify-center ${isUser
                        ? 'bg-violet-600/20 text-violet-400'
                        : 'bg-teal-600/20 text-teal-400'
                        }`}>
                        {isUser ? <User size={16} /> : <Bot size={16} />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 font-mono text-sm md:text-base">
                        {/* Role label */}
                        <div className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">
                            {isUser ? 'User' : 'Assistant'}
                        </div>

                        {isUser ? (
                            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        ) : (
                            <>
                                {/* Render images at the top (Removed Image Restored) */}
                                {images.length > 0 && (
                                    <div className="mb-4 flex flex-wrap gap-3">
                                        {images.map((imgUrl, idx) => (
                                            <img
                                                key={idx}
                                                src={imgUrl}
                                                alt="Content"
                                                className="rounded-lg max-w-[250px] max-h-[250px] object-cover border border-gray-700 shadow-lg"
                                                loading="lazy"
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Markdown content (Last One Removed) */}
                                <div className="prose prose-invert max-w-none text-gray-100">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4 text-white">{children}</h1>,
                                            h2: ({ children }) => <h2 className="text-xl font-semibold mt-5 mb-3 text-white">{children}</h2>,
                                            h3: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-200">{children}</h3>,
                                            p: ({ children }) => <p className="mb-4 leading-7 text-gray-200">{children}</p>,
                                            ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                                            ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                                            li: ({ children }) => <li className="text-gray-200">{children}</li>,
                                            strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                                            a: ({ href, children }) => (
                                                <a href={href} target="_blank" rel="noopener noreferrer"
                                                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                                                    {children}
                                                </a>
                                            ),
                                            code: ({ inline, className, children }) => {
                                                if (inline) {
                                                    return (
                                                        <code className="px-1.5 py-0.5 rounded bg-[#2d2d2d] text-[#e06c75] font-mono text-sm">
                                                            {children}
                                                        </code>
                                                    );
                                                }
                                                return <CodeBlock className={className}>{children}</CodeBlock>;
                                            },
                                            pre: ({ children }) => <>{children}</>,
                                            img: ({ src, alt }) => (
                                                <img src={src} alt={alt} className="rounded-lg max-w-full my-4 border border-gray-700" loading="lazy" />
                                            ),
                                            blockquote: ({ children }) => (
                                                <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-400 my-4">
                                                    {children}
                                                </blockquote>
                                            ),
                                            table: ({ children }) => (
                                                <div className="overflow-x-auto my-4">
                                                    <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
                                                        {children}
                                                    </table>
                                                </div>
                                            ),
                                            th: ({ children }) => <th className="px-4 py-2 bg-[#2d2d2d] text-left font-semibold text-gray-200 border-b border-gray-700">{children}</th>,
                                            td: ({ children }) => <td className="px-4 py-2 border-b border-gray-700 text-gray-300">{children}</td>,
                                        }}
                                    >
                                        {/* Filter out markdown images and the Visuals header to avoid duplication */}
                                        {message.content
                                            .replace(/!\[.*?\]\(.*?\)/g, "") // Remove image markdown
                                            .replace(/\*\*Visuals:\*\*\s*$/, "") // Remove likely Visuals string at the end
                                        }
                                    </ReactMarkdown>
                                </div>

                                {/* Suggestions (New) */}
                                {message.suggestions && message.suggestions.length > 0 && (
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {message.suggestions.map((suggestion, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => onSuggestionClick && onSuggestionClick(suggestion)}
                                                className="px-4 py-2 bg-[#2d2d2d]/80 hover:bg-violet-600/20 hover:text-violet-300 hover:border-violet-500/30 border border-gray-700/50 rounded-xl text-xs text-gray-400 transition-all text-left"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MessageBubble;
