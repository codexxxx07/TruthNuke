/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Segoe UI", "Open Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}