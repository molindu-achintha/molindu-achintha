import { motion } from 'framer-motion';

const experiences = [
    {
        role: "Senior Full Stack Dev",
        company: "Tech Corp",
        period: "2023 - Present",
        desc: "Leading frontend architecture and specialized in AI integration."
    },
    {
        role: "Software Engineer",
        company: "Innovative Solutions",
        period: "2021 - 2023",
        desc: "Built scalable web applications using React and Node.js."
    },
    {
        role: "B.Sc. Computer Science",
        company: "University of Technology",
        period: "2017 - 2021",
        desc: "Graduated with First Class Honours."
    }
];

const Resume = () => {
    return (
        <div className="max-w-3xl space-y-6">
            <div className="flex justify-between items-end border-b border-terminal-border pb-2 mb-4">
                <h2 className="text-xl font-bold text-terminal-accent">Resume / CV</h2>
                <a href="#" className="text-sm text-terminal-dim hover:text-terminal-text">[Download PDF]</a>
            </div>

            <div className="space-y-4">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col md:flex-row gap-2 md:gap-8"
                    >
                        <div className="md:w-32 flex-shrink-0 text-terminal-dim text-sm pt-1">
                            {exp.period}
                        </div>
                        <div>
                            <h3 className="text-terminal-text font-bold text-lg">{exp.role}</h3>
                            <div className="text-terminal-accent text-sm mb-1">{exp.company}</div>
                            <p className="text-terminal-dim text-sm">{exp.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Resume;
