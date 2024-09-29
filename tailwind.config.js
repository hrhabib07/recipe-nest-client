import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      // colors: {
      //   primary: "#3e2723", // Bistre
      //   secondary: "#fff8e1", // Cornsilk
      //   accent: {
      //     aureolin: "#ffeb3b",
      //     coral: "#ff7043",
      //     green: "#388e3c",
      //   },
      // },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
