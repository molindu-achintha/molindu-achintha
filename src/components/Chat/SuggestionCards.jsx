import { motion, AnimatePresence } from 'framer-motion';
import { Code, User, Briefcase, Mail, Brain, Eye, ChevronDown, ChevronUp, Lightbulb, Stethoscope, MessageSquare, GraduationCap, Award, Building2 } from 'lucide-react';
import { useState } from 'react';

// Primary suggestions - always visible
const primarySuggestions = [
    { icon: <Eye size={16} />, text: "Computer Vision", prompt: "Show me your Computer Vision projects", color: "from-blue-500 to-cyan-500" },
    { icon: <Brain size={16} />, text: "Deep Learning", prompt: "What deep learning frameworks and models have you worked with?", color: "from-violet-500 to-purple-500" },
    { icon: <Stethoscope size={16} />, text: "Medical AI", prompt: "Tell me about your medical imaging and healthcare AI projects", color: "from-rose-500 to-pink-500" },
    { icon: <MessageSquare size={16} />, text: "NLP Projects", prompt: "What Natural Language Processing projects have you built?", color: "from-amber-500 to-orange-500" },
    { icon: <User size={16} />, text: "About Me", prompt: "Tell me about yourself and your background", color: "from-emerald-500 to-teal-500" },
    { icon: <Mail size={16} />, text: "Contact", prompt: "How can I contact you?", color: "from-gray-500 to-slate-500" },
];

// Additional suggestions - shown when expanded
const additionalSuggestions = [
    { icon: <Brain size={16} />, text: "3D MRI Project", prompt: "Tell me about your 3D MRI Super-Resolution project using GANs", color: "from-indigo-500 to-blue-500" },
    { icon: <Eye size={16} />, text: "Crop Disease AI", prompt: "How does the Verdex mobile app detect crop diseases?", color: "from-green-500 to-emerald-500" },
    { icon: <Stethoscope size={16} />, text: "Retinopathy Detection", prompt: "Explain your Diabetic Retinopathy detection system", color: "from-red-500 to-rose-500" },
    { icon: <MessageSquare size={16} />, text: "Sinhala RAG", prompt: "Tell me about your Multimodal Sinhala Fact-Checking RAG system", color: "from-purple-500 to-violet-500" },
    { icon: <Building2 size={16} />, text: "Braingaze Work", prompt: "What did you work on at Braingaze with eye-tracking and gaze estimation?", color: "from-cyan-500 to-teal-500" },
    { icon: <Building2 size={16} />, text: "Tortil Projects", prompt: "Tell me about your AI work at Tortil Inc. including the Continuity Checker", color: "from-orange-500 to-amber-500" },
    { icon: <Lightbulb size={16} />, text: "Square1AI Startup", prompt: "What are you building at Square1AI as the AI Team Leader?", color: "from-yellow-500 to-orange-500" },
    { icon: <Code size={16} />, text: "PyTorch vs TensorFlow", prompt: "Which do you prefer - PyTorch or TensorFlow, and why?", color: "from-pink-500 to-rose-500" },
    { icon: <GraduationCap size={16} />, text: "Education", prompt: "Tell me about your education at University of Moratuwa", color: "from-blue-500 to-indigo-500" },
    { icon: <Award size={16} />, text: "Certifications", prompt: "What ML and AI certifications do you have?", color: "from-slate-500 to-gray-500" },
];

const SuggestionCards = ({ onSelect }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="mt-4 sm:mt-6">
            {/* Primary Suggestions Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {primarySuggestions.map((item, index) => (
                    <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => onSelect(item.prompt)}
                        className="group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-[#1a1a2e]/50 border border-gray-800/50 rounded-xl hover:bg-[#1a1a2e] hover:border-gray-700 active:scale-[0.98] transition-all text-left touch-manipulation"
                    >
                        <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${item.color} text-white shadow-lg flex-shrink-0`}>
                            {item.icon}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white transition-colors line-clamp-2">
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
                className="w-full mt-3 sm:mt-4 py-2.5 sm:py-3 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-violet-400 bg-[#1a1a2e]/30 hover:bg-[#1a1a2e]/50 border border-gray-800/30 hover:border-violet-500/30 rounded-xl transition-all touch-manipulation active:scale-[0.99]"
            >
                <Lightbulb size={14} className="sm:hidden" />
                <Lightbulb size={16} className="hidden sm:block" />
                <span>{isExpanded ? 'Hide more questions' : 'Show more questions'}</span>
                {isExpanded ? <ChevronUp size={14} className="sm:hidden" /> : <ChevronDown size={14} className="sm:hidden" />}
                {isExpanded ? <ChevronUp size={16} className="hidden sm:block" /> : <ChevronDown size={16} className="hidden sm:block" />}
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-800/30">
                            {additionalSuggestions.map((item, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => onSelect(item.prompt)}
                                    className="group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-[#1a1a2e]/30 border border-gray-800/30 rounded-xl hover:bg-[#1a1a2e] hover:border-gray-700 active:scale-[0.98] transition-all text-left touch-manipulation"
                                >
                                    <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${item.color} text-white shadow-lg opacity-80 flex-shrink-0`}>
                                        {item.icon}
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium text-gray-400 group-hover:text-white transition-colors line-clamp-2">
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
