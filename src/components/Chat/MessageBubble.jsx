import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Bot, Copy, Check, ChevronDown, ChevronUp, Brain } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// Helper to extract images from text
const extractImages = (text) => {
    const imageRegex = /((https?:\/\/[^\s]+|^\/[^\s]+)\.(jpeg|jpg|png|gif|webp|svg))/gi;
    return text.match(imageRegex) || [];
};

// Helper to extract and separate thinking content
const parseThinking = (content) => {
    const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/);
    let mainContent = content;
    let thinkingContent = null;

    if (thinkMatch) {
        thinkingContent = thinkMatch[1].trim();
        mainContent = content.replace(/<think>[\s\S]*?<\/think>/, '').trim();
    }

    // Remove any "📝 Response" or similar prefixes
    mainContent = mainContent.replace(/^📝\s*Response:?\s*/i, '').trim();
    mainContent = mainContent.replace(/^Response:?\s*/i, '').trim();

    return { thinking: thinkingContent, main: mainContent };
};

// Collapsible Thinking Component
const ThinkingSection = ({ content }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isExpanded && contentRef.current) {
            const scrollContainer = contentRef.current;
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }, [isExpanded, content]);

    return (
        <div className="mb-3 sm:mb-4 rounded-lg border border-purple-500/30 bg-purple-900/10 overflow-hidden">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-purple-900/20 transition-colors touch-manipulation"
            >
                <Brain size={14} className="text-purple-400 sm:hidden" />
                <Brain size={16} className="text-purple-400 hidden sm:block" />
                <span className="text-xs sm:text-sm font-medium text-purple-300">Thinking Process</span>
                <span className="ml-auto text-purple-400">
                    {isExpanded ? <ChevronUp size={14} className="sm:hidden" /> : <ChevronDown size={14} className="sm:hidden" />}
                    {isExpanded ? <ChevronUp size={16} className="hidden sm:block" /> : <ChevronDown size={16} className="hidden sm:block" />}
                </span>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div
                            ref={contentRef}
                            className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-400 leading-relaxed max-h-[200px] sm:max-h-[300px] overflow-y-auto border-t border-purple-500/20 bg-gray-900/50"
                            style={{ scrollBehavior: 'smooth' }}
                        >
                            {content.split('\n').map((line, i) => (
                                <p key={i} className="mb-2 last:mb-0">{line}</p>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
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
        <div className="relative group my-3 sm:my-4 rounded-lg overflow-hidden bg-[#1e1e1e] border border-[#3c3c3c]">
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#2d2d2d] border-b border-[#3c3c3c]">
                <span className="text-[10px] sm:text-xs text-gray-400 font-mono">{language}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400 hover:text-white transition-colors touch-manipulation"
                >
                    {copied ? <Check size={12} className="sm:hidden" /> : <Copy size={12} className="sm:hidden" />}
                    {copied ? <Check size={14} className="hidden sm:block" /> : <Copy size={14} className="hidden sm:block" />}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre className="p-3 sm:p-4 overflow-x-auto">
                <code className="text-xs sm:text-sm font-mono text-[#d4d4d4] leading-relaxed">
                    {children}
                </code>
            </pre>
        </div>
    );
};

const MessageBubble = ({ message, onSuggestionClick }) => {
    const isUser = message.role === 'user';

    const { thinking, main } = !isUser ? parseThinking(message.content) : { thinking: null, main: message.content };
    const images = !isUser ? extractImages(main) : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full py-3 sm:py-4 bg-transparent"
        >
            <div className="max-w-3xl mx-auto px-3 sm:px-4 md:px-6">
                <div className={`flex gap-2 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    {!isUser && (
                        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg mt-1 bg-teal-600/20 flex items-center justify-center text-teal-400">
                            <Bot size={14} className="sm:hidden" />
                            <Bot size={16} className="hidden sm:block" />
                        </div>
                    )}

                    <div className={`max-w-[90%] sm:max-w-[85%] ${isUser ? 'text-right' : 'text-left'}`}>
                        {isUser ? (
                            <div className="inline-block bg-violet-600/30 border border-violet-500/30 rounded-2xl rounded-tr-sm px-3 sm:px-4 py-2 sm:py-3">
                                <p className="text-sm sm:text-base text-gray-100 leading-relaxed whitespace-pre-wrap text-left">{message.content}</p>
                            </div>
                        ) : (
                            <div className="font-mono text-xs sm:text-sm md:text-base">
                                {thinking && <ThinkingSection content={thinking} />}

                                {images.length > 0 && (
                                    <div className="mb-3 sm:mb-4 flex flex-wrap gap-2 sm:gap-3">
                                        {images.map((imgUrl, idx) => (
                                            <img
                                                key={idx}
                                                src={imgUrl}
                                                alt="Content"
                                                className="rounded-lg max-w-[200px] sm:max-w-[250px] max-h-[200px] sm:max-h-[250px] object-cover border border-gray-700 shadow-lg"
                                                loading="lazy"
                                            />
                                        ))}
                                    </div>
                                )}

                                {message.videos && message.videos.length > 0 && (
                                    <div className="mb-3 sm:mb-4 flex flex-wrap gap-2 sm:gap-3">
                                        {message.videos.map((vidUrl, idx) => (
                                            <div key={idx} className="rounded-lg overflow-hidden border border-gray-700 shadow-lg w-full sm:w-auto">
                                                <video
                                                    controls
                                                    className="w-full sm:max-w-[400px] max-h-[250px] sm:max-h-[300px]"
                                                    playsInline
                                                >
                                                    <source src={vidUrl} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="prose prose-invert max-w-none text-gray-100 break-words">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h1: ({ children }) => <h1 className="text-xl sm:text-2xl font-bold mt-4 sm:mt-6 mb-3 sm:mb-4 text-white">{children}</h1>,
                                            h2: ({ children }) => <h2 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-5 mb-2 sm:mb-3 text-white">{children}</h2>,
                                            h3: ({ children }) => <h3 className="text-base sm:text-lg font-semibold mt-3 sm:mt-4 mb-2 text-gray-200">{children}</h3>,
                                            p: ({ children }) => <p className="mb-3 sm:mb-4 leading-6 sm:leading-7 text-gray-200">{children}</p>,
                                            ul: ({ children }) => <ul className="list-disc pl-4 sm:pl-6 mb-3 sm:mb-4 space-y-1 sm:space-y-2">{children}</ul>,
                                            ol: ({ children }) => <ol className="list-decimal pl-4 sm:pl-6 mb-3 sm:mb-4 space-y-1 sm:space-y-2">{children}</ol>,
                                            li: ({ children }) => <li className="text-gray-200">{children}</li>,
                                            strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                                            a: ({ href, children }) => (
                                                <a href={href} target="_blank" rel="noopener noreferrer"
                                                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2 break-all">
                                                    {children}
                                                </a>
                                            ),
                                            code: ({ inline, className, children }) => {
                                                if (inline) {
                                                    return (
                                                        <code className="px-1 sm:px-1.5 py-0.5 rounded bg-[#2d2d2d] text-[#e06c75] font-mono text-xs sm:text-sm break-all">
                                                            {children}
                                                        </code>
                                                    );
                                                }
                                                return <CodeBlock className={className}>{children}</CodeBlock>;
                                            },
                                            pre: ({ children }) => <>{children}</>,
                                            img: ({ src, alt }) => (
                                                <img src={src} alt={alt} className="rounded-lg max-w-full my-3 sm:my-4 border border-gray-700" loading="lazy" />
                                            ),
                                            blockquote: ({ children }) => (
                                                <blockquote className="border-l-4 border-gray-600 pl-3 sm:pl-4 italic text-gray-400 my-3 sm:my-4">
                                                    {children}
                                                </blockquote>
                                            ),
                                            table: ({ children }) => (
                                                <div className="overflow-x-auto my-3 sm:my-4 -mx-3 sm:mx-0">
                                                    <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
                                                        {children}
                                                    </table>
                                                </div>
                                            ),
                                            th: ({ children }) => <th className="px-2 sm:px-4 py-2 bg-[#2d2d2d] text-left font-semibold text-gray-200 border-b border-gray-700 text-xs sm:text-sm">{children}</th>,
                                            td: ({ children }) => <td className="px-2 sm:px-4 py-2 border-b border-gray-700 text-gray-300 text-xs sm:text-sm">{children}</td>,
                                        }}
                                    >
                                        {main
                                            .replace(/!\[.*?\]\(.*?\)/g, "")
                                            .replace(/\*\*Visuals:\*\*\s*$/, "")
                                        }
                                    </ReactMarkdown>
                                </div>

                                {message.suggestions && message.suggestions.length > 0 && (
                                    <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
                                        {message.suggestions.map((suggestion, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => onSuggestionClick && onSuggestionClick(suggestion)}
                                                className="px-3 sm:px-4 py-2 bg-[#2d2d2d]/80 hover:bg-violet-600/20 hover:text-violet-300 hover:border-violet-500/30 border border-gray-700/50 rounded-xl text-[10px] sm:text-xs text-gray-400 transition-all text-left touch-manipulation"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {isUser && (
                        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg mt-1 bg-violet-600/20 flex items-center justify-center text-violet-400">
                            <User size={14} className="sm:hidden" />
                            <User size={16} className="hidden sm:block" />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default MessageBubble;
