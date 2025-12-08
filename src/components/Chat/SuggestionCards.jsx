import { motion } from 'framer-motion';
import { Code, User, Briefcase, Mail } from 'lucide-react';

const suggestions = [
    { icon: <Code size={18} />, text: "View Projects", prompt: "What projects have you worked on?", color: "from-blue-500 to-cyan-500" },
    { icon: <User size={18} />, text: "About Me", prompt: "Tell me about yourself", color: "from-violet-500 to-purple-500" },
    { icon: <Briefcase size={18} />, text: "Skills & Tech", prompt: "What are your technical skills?", color: "from-amber-500 to-orange-500" },
    { icon: <Mail size={18} />, text: "Contact Info", prompt: "How can I contact you?", color: "from-emerald-500 to-teal-500" },
];

const SuggestionCards = ({ onSelect }) => {
    return (
        <div className="grid grid-cols-2 gap-3 mt-6">
            {suggestions.map((item, index) => (
                <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onSelect(item.prompt)}
                    className="group flex items-center gap-3 p-4 bg-[#1a1a2e]/50 border border-gray-800/50 rounded-xl hover:bg-[#1a1a2e] hover:border-gray-700 transition-all text-left"
                >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                        {item.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                        {item.text}
                    </span>
                </motion.button>
            ))}
        </div>
    );
};

export default SuggestionCards;
