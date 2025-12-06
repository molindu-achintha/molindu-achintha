import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import Resume from '../components/sections/Resume';

export const commands = {
    about: {
        description: "Learn more about me",
        component: <About />,
    },
    projects: {
        description: "View my recent work",
        component: <Projects />,
    },
    resume: {
        description: "See my professional background",
        component: <Resume />,
    },
    contact: {
        description: "Get in touch",
        component: <Contact />,
    },
    help: {
        description: "List available commands",
        // Logic handled in useTerminal, but good to keep description here
    },
    clear: {
        description: "Clear the terminal screen",
        // Logic handled in useTerminal
    }
};
