import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const Contact = () => {
    return (
        <div className="flex gap-6 mt-4">
            <motion.a
                href="mailto:sandaruwanwgma@gmail.com"
                className="flex items-center gap-2 text-terminal-dim hover:text-terminal-accent transition-colors"
                whileHover={{ scale: 1.05 }}
            >
                <Mail size={20} />
                <span>Email</span>
            </motion.a>
            <motion.a
                href="https://github.com/molindu-achintha"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-terminal-dim hover:text-terminal-accent transition-colors"
                whileHover={{ scale: 1.05 }}
            >
                <Github size={20} />
                <span>GitHub</span>
            </motion.a>
            <motion.a
                href="#" // Add Linkedin URL
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-terminal-dim hover:text-terminal-accent transition-colors"
                whileHover={{ scale: 1.05 }}
            >
                <Linkedin size={20} />
                <span>LinkedIn</span>
            </motion.a>
        </div>
    );
};

export default Contact;
