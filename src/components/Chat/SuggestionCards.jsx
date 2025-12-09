import { motion, AnimatePresence } from 'framer-motion';
import { Code, User, Briefcase, Mail, Brain, Eye, ChevronDown, ChevronUp, Lightbulb, Stethoscope, MessageSquare, GraduationCap, Award, Building2 } from 'lucide-react';
import { useState } from 'react';

// Primary suggestions - always visible
const primarySuggestions = [
    { icon: <Eye size={18} />, text: "Computer Vision", prompt: "Show me your Computer Vision projects", color: "from-blue-500 to-cyan-500" },
    { icon: <Brain size={18} />, text: "Deep Learning", prompt: "What deep learning frameworks and models have you worked with?", color: "from-violet-500 to-purple-500" },
    { icon: <Stethoscope size={18} />, text: "Medical AI", prompt: "Tell me about your medical imaging and healthcare AI projects", color: "from-rose-500 to-pink-500" },
    { icon: <MessageSquare size={18} />, text: "NLP Projects", prompt: "What Natural Language Processing projects have you built?", color: "from-amber-500 to-orange-500" },
    { icon: <User size={18} />, text: "About Me", prompt: "Tell me about yourself and your background", color: "from-emerald-500 to-teal-500" },
    { icon: <Mail size={18} />, text: "Contact", prompt: "How can I contact you?", color: "from-gray-500 to-slate-500" },
];

// Additional suggestions - shown when expanded
const additionalSuggestions = [
    // Projects
    { icon: <Brain size={18} />, text: "3D MRI Project", prompt: "Tell me about your 3D MRI Super-Resolution project using GANs", color: "from-indigo-500 to-blue-500" },
    { icon: <Eye size={18} />, text: "Crop Disease AI", prompt: "How does the Verdex mobile app detect crop diseases?", color: "from-green-500 to-emerald-500" },
    { icon: <Stethoscope size={18} />, text: "Retinopathy Detection", prompt: "Explain your Diabetic Retinopathy detection system", color: "from-red-500 to-rose-500" },
    { icon: <MessageSquare size={18} />, text: "Sinhala RAG", prompt: "Tell me about your Multimodal Sinhala Fact-Checking RAG system", color: "from-purple-500 to-violet-500" },

    // Experience
    { icon: <Building2 size={18} />, text: "Braingaze Work", prompt: "What did you work on at Braingaze with eye-tracking and gaze estimation?", color: "from-cyan-500 to-teal-500" },
    { icon: <Building2 size={18} />, text: "Tortil Projects", prompt: "Tell me about your AI work at Tortil Inc. including the Continuity Checker", color: "from-orange-500 to-amber-500" },
    { icon: <Lightbulb size={18} />, text: "Square1AI Startup", prompt: "What are you building at Square1AI as the AI Team Leader?", color: "from-yellow-500 to-orange-500" },

    // Skills & Education
    { icon: <Code size={18} />, text: "PyTorch vs TensorFlow", prompt: "Which do you prefer - PyTorch or TensorFlow, and why?", color: "from-pink-500 to-rose-500" },
    { icon: <GraduationCap size={18} />, text: "Education", prompt: "Tell me about your education at University of Moratuwa", color: "from-blue-500 to-indigo-500" },
    { icon: <Award size={18} />, text: "Certifications", prompt: "What ML and AI certifications do you have?", color: "from-slate-500 to-gray-500" },
];

const SuggestionCards = ({ onSelect }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="mt-6">
            {/* Primary Suggestions Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {primarySuggestions.map((item, index) => (
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

            {/* Expand/Collapse Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full mt-4 py-3 flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-violet-400 bg-[#1a1a2e]/30 hover:bg-[#1a1a2e]/50 border border-gray-800/30 hover:border-violet-500/30 rounded-xl transition-all"
            >
                <Lightbulb size={16} />
                <span>{isExpanded ? 'Hide more questions' : 'Show more questions'}</span>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </motion.button>

            {/* Additional Suggestions - Collapsible */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-800/30">
                            {additionalSuggestions.map((item, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => onSelect(item.prompt)}
                                    className="group flex items-center gap-3 p-4 bg-[#1a1a2e]/30 border border-gray-800/30 rounded-xl hover:bg-[#1a1a2e] hover:border-gray-700 transition-all text-left"
                                >
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} text-white shadow-lg opacity-80`}>
                                        {item.icon}
                                    </div>
                                    <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                                        {item.text}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SuggestionCards;
