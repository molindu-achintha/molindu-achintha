import { motion } from 'framer-motion';

const projects = [
    {
        title: "Portfolio v1",
        description: "A terminal-themed portfolio website built with React & Tailwind.",
        tech: ["React", "Tailwind", "Framer Motion"],
        link: "#"
    },
    {
        title: "RAG Pipeline Setup",
        description: "End-to-end RAG pipeline for educational content processing.",
        tech: ["Python", "LangChain", "Pinecone"],
        link: "#"
    },
    // Add more placeholder projects
];

const Projects = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-terminal-border p-4 hover:border-terminal-accent transition-colors bg-terminal-bg/50"
                >
                    <h3 className="text-terminal-accent font-bold text-lg mb-1">{project.title}</h3>
                    <p className="text-terminal-dim text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, i) => (
                            <span key={i} className="text-xs bg-terminal-border px-2 py-1 rounded text-terminal-text">
                                {t}
                            </span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Projects;
