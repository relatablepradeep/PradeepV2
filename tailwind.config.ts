import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/Component/**/*.{js,ts,jsx,tsx}", // 👈 Important: match your folders!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
