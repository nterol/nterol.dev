/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Bricolage Grotesque", "sans serif"],
      },
      color: {
        fancy: {
          blue: "#8bd3dd",
          yellow: "#F9F871",
          red: "#BA3C67",
          green: "#00E2B4",
        },
        "l-theme": {
          blue: "#001858",
          "sand-background": "#fef6e4",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
