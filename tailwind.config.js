/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "primary-gradient": `linear-gradient(
          to right,#00a7b4,#A4D96C)`,
      },
    },
  },
  plugins: [],
};
