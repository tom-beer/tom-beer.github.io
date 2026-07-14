import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Lora", ...defaultTheme.fontFamily.serif],
        display: ["Fraunces", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        accent: {
          DEFAULT: "#b45309", // amber-700, warm & bookish
          dark: "#f59e0b", // amber-500 for dark mode
        },
        // Warm editorial dark-mode palette (espresso / peat / cream)
        espresso: "#1a1918", // page background
        peat: "#24221f", // elevated card surface
        cream: "#e8e6e3", // primary text
        sand: "#a39f98", // secondary text
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
