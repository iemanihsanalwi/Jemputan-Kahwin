import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FAF7EE",
          100: "#F3ECD5",
          200: "#E6D6A8",
          300: "#D7BD7A",
          400: "#C8A752",
          500: "#B88E28", // primary gold
          600: "#9C731C",
          700: "#7A5716",
          800: "#5D4114",
          900: "#442E10",
        },
        emerald: {
          850: "#133C30",
          950: "#091F18",
        },
        champagne: {
          50: "#FDFBF7",
          100: "#FAF6EF",
          200: "#F4ECDD",
          300: "#ECE0C8",
        },
        parchment: "#F9F6F0",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        script: ["var(--font-alex-brush)", "cursive"],
        arabic: ["var(--font-amiri)", "Traditional Arabic", "serif"],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite linear",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        gold: "0 10px 30px -10px rgba(184, 142, 40, 0.25)",
        "gold-glow": "0 0 25px rgba(212, 175, 55, 0.35)",
        card: "0 10px 40px -15px rgba(0, 0, 0, 0.07)",
      },
    },
  },
  plugins: [],
};

export default config;
