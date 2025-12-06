import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="space-y-4 max-w-2xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-lg mb-2">Hello! I'm <span className="text-terminal-accent font-bold">Molindu Achintha</span>.</p>
                <p className="text-terminal-dim leading-relaxed">
                    I am a passionate developer who loves building classy, interactive, and functional web experiences.
                    With a background in automated reasoning and full-stack development, I enjoy solving complex problems with clean code.
                </p>
            </motion.div>
        </div>
    );
};

export default About;
