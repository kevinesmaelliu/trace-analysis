/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        "background-light": "#f9fafb",
        "background-dark": "#111827",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
}
