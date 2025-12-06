/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                terminal: {
                    bg: '#0F172A', // Slate 900
                    text: '#F8FAFC', // Slate 50
                    accent: '#38BDF8', // Sky 400
                    dim: '#94A3B8', // Slate 400
                    border: '#1E293B', // Slate 800
                }
            },
            fontFamily: {
                mono: ['"Fira Code"', 'monospace'], // Suggest Fira Code if available, or monospace
            }
        },
    },
    plugins: [],
}
