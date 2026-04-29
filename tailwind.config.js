/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 🌙 enable class-based dark mode

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#3B82F6", // blue
        secondary: "#6366F1", // indigo
      },

      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.05)",
      },

      borderRadius: {
        xl: "1rem",
      },
    },
  },

  plugins: [],
};