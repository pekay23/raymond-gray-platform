import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0f172a", // Deep navy for headers/backgrounds
        },
        red: {
          700: "#b91c1c", // Rich red for accents/CTAs (Emirates-inspired)
        },
      },
    },
  },
  plugins: [],
};

export default config;