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
        // Deep Charcoal & Warm Slate (Headings & Primary Text for high contrast & readability)
        charcoal: {
          50: "#F7FAFC",
          100: "#EDF2F7",
          200: "#E2E8F0",
          300: "#CBD5E0",
          400: "#A0AEC0",
          500: "#718096",
          600: "#4A5568",
          700: "#2D3748", // Primary Deep Charcoal Body/Heading
          800: "#1A202C", // Deep Contrast Black
          900: "#171923",
          950: "#0D0E12",
        },
        // Botanical Sage & Olive (Contrast / Botanical Green accents)
        sage: {
          50: "#F6F8F5",
          100: "#EDF2EB",
          200: "#DDE6DA",
          300: "#C4D4C0",
          400: "#A2B09B",
          500: "#7D8B74", // Botanical Sage Primary
          600: "#556B2F", // Deep Olive Accent
          700: "#425424",
          800: "#3B4D36",
          900: "#2B3827",
          950: "#1C2419",
        },
        // Olive alias
        olive: {
          50: "#F6F8F5",
          100: "#EDF2EB",
          200: "#DDE6DA",
          300: "#A2B09B",
          500: "#7D8B74",
          600: "#556B2F",
          700: "#3B4D36",
          800: "#2B3827",
          900: "#1A202C",
        },
        // Soft Champagne Gold (Accent Foil & Outlines)
        gold: {
          50: "#FFFDF5",
          100: "#FFF8EE",
          200: "#FAEDE3",
          300: "#E8E2D8", // Subtle Gold Border
          400: "#E2C882", // Bright Champagne Gold
          500: "#D4AF37", // Pure Gold Foil
          600: "#C5A059", // Warm Antique Gold Primary
          700: "#B38F48",
          800: "#9C7838",
          900: "#6B5020",
        },
        // Dusty Rose & Muted Blush (Romantic Floral Accent)
        rose: {
          50: "#FAF7F7",
          100: "#FAF2F2",
          200: "#F5E6E6",
          300: "#E8C5BE",
          400: "#D8A49B",
          500: "#D4A5A5", // Dusty Rose Primary
          600: "#C88A8A",
          700: "#B87B7B",
          800: "#8C4A58",
          900: "#4A2E35",
        },
        // Soft Blush
        blush: {
          50: "#FAF7F7",
          100: "#FAF2F2",
          200: "#F5E6E6",
          300: "#E8C5BE",
          400: "#D4A5A5",
          500: "#C88A8A",
          600: "#B87B7B",
          700: "#8C4A58",
          900: "#2D3748",
        },
        // Warm Ivory / Cream / Alabaster Pearl (Background / Surface)
        cream: {
          50: "#FFFDF9",
          100: "#FAF7F2", // Primary Warm Ivory Base
          200: "#FDFBF7", // Card Surface
          300: "#F5EFEB",
          400: "#EFE8E0",
          500: "#E8E2D8", // Subtle Border
          600: "#D4C8BA",
        },
        // Mulberry mapped cleanly to deep charcoal
        mulberry: {
          50: "#FAF7F2",
          100: "#F5EFEB",
          200: "#E8E2D8",
          300: "#A0AEC0",
          400: "#718096",
          500: "#556377",
          600: "#4A5568",
          700: "#2D3748",
          800: "#1A202C",
          900: "#171923",
          950: "#0D0E12",
        },
        // Champagne alias
        champagne: {
          50: "#FFF8EE",
          100: "#FAEDE3",
          200: "#E2C882",
          300: "#C5A059",
        },
        emerald: {
          850: "#3B4D36",
          950: "#2B3827",
        },
        parchment: "#FAF7F2",
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
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.92", transform: "scale(1.015)" },
        },
      },
      boxShadow: {
        gold: "0 10px 30px -10px rgba(197, 160, 89, 0.22)",
        "gold-glow": "0 0 25px rgba(212, 175, 55, 0.25)",
        card: "0 4px 20px -2px rgba(45, 55, 72, 0.05)",
        botanical: "0 6px 24px -4px rgba(85, 107, 47, 0.08)",
        rose: "0 8px 18px rgba(212, 165, 165, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
