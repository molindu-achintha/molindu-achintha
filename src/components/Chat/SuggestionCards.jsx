import { motion } from 'framer-motion';
import { Code, User, FileText, Send } from 'lucide-react';

const suggestions = [
    { icon: <Code size={20} />, text: "Show me your projects", prompt: "What projects have you worked on?" },
    { icon: <User size={20} />, text: "Tell me about yourself", prompt: "Who is Molindu Achintha?" },
    { icon: <FileText size={20} />, text: "What are your skills?", prompt: "List your technical skills." },
    { icon: <Send size={20} />, text: "How can I contact you?", prompt: "What are your contact details?" },
];

const SuggestionCards = ({ onSelect }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 px-4">
            {suggestions.map((item, index) => (
                <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onSelect(item.prompt)}
                    className="flex items-center gap-3 p-4 bg-slate-900 border border-slate-700 rounded-xl hover:bg-slate-800 hover:border-sky-500/50 transition-all text-left group"
                >
                    <div className="p-2 bg-slate-800 rounded-lg text-sky-400 group-hover:text-sky-300 group-hover:bg-slate-700 transition-colors">
                        {item.icon}
                    </div>
                    <span className="text-slate-300 text-sm font-medium group-hover:text-slate-100">
                        {item.text}
                    </span>
                </motion.button>
            ))}
        </div>
    );
};

export default SuggestionCards;
