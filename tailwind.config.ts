import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: "#2D6A4F",
          green: "#40916C",
          leaf: "#52B788",
          mint: "#95D5B2",
          pale: "#D8F3DC",
          cream: "#FEFAE0",
          sand: "#F5F1EB",
          charcoal: "#1B1B1B",
          gray: "#4A4A4A",
          warm: "#8B7355",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [typography],
};
export default config;
