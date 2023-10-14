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
      colors: {
        fancy: {
          green: "#00E2B4",
          blue: "#8bd3dd",
          yellow: "#F9F871",
          red: "#BA3C67",
        },
        inkblue: "#001858",
        "sand-background": "#fef6e4",
      },
      height: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
