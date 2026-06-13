/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./messages/**/*.json",
  ],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      animation: {
        shine: "shine 0.8s ease-in-out",
      },
      keyframes: {
        shine: {
          "100%": { transform: "translateX(250%)" },
        },
      },
    },
  },
  plugins: [],
};
