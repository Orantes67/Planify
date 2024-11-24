/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        purple: {
          600: "#6B46C1",
          700: "#553C9A",
        },
      },
    },
  },
  plugins: [],
};
