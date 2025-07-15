import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gabriola: ["Gabriola", "cursive"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
