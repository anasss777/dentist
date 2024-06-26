import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#006fee",
        secondary: "#38bdf8",
        third: "#f4f7fa",
      },
      fontFamily: {
        'marhey': ['Marhey', 'sans-serif'],
        'noto-kufi-arabic': ['Noto Kufi Arabic', 'sans-serif'],
        'aref-ruqaa': ['Aref Ruqaa', 'sans-serif'],
      },
      boxShadow: {
        Card: "0px 0px 15px 5px rgba(0, 0, 0, 0.1);",
        Card2: "0px 0px 15px 3px rgba(0, 0, 0, 0.05);",
        Primary: "0px 0px 15px 2px rgba(0, 111, 238, 0.5);",
        Secondary: "0px 0px 15px 2px rgba(56, 189, 248, 0.5);",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
