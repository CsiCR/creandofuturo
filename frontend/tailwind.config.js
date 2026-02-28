/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ps: {
                    green: "#19FF00",
                    black: "#111111",
                    gray: "#2A2A2A",
                    red: "#E53935",
                    yellow: "#F4C542",
                    white: "#FFFFFF",
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
