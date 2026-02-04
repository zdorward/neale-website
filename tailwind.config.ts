import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: "#7C9A8E",
          light: "#9BB5A8",
          dark: "#5D7A6E",
        },
        cream: {
          DEFAULT: "#FAF8F5",
          dark: "#F0EDE8",
        },
        gold: {
          DEFAULT: "#C9A962",
          light: "#D4BC82",
          dark: "#B89A52",
        },
        charcoal: {
          DEFAULT: "#2D3436",
          light: "#4A4F51",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
