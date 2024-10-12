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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.default-900"),
            h1: {
              color: theme("colors.default-900"), // Set color for h1
            },
            h2: {
              color: theme("colors.default-900"), // Set color for h2
            },
            h3: {
              color: theme("colors.default-900"), // Set color for h3
            },
            h4: {
              color: theme("colors.default-900"), // Set color for h4
            },
            h5: {
              color: theme("colors.default-900"), // Set color for h5
            },
            h6: {
              color: theme("colors.default-900"), // Set color for h6
            },
            a: {
              color: theme("colors.blue.600"), // Change link color
              "&:hover": {
                color: theme("colors.blue.800"),
              },
            },
            strong: {
              color: theme("colors.default-900"), // Set color for bold text
            },
            // Add more customizations if needed
          },
        },
      }),
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
  plugins: [nextui(), require("@tailwindcss/typography")],
};
