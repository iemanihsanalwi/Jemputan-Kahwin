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
        // Deep Romantic Mulberry & Warm Espresso (Headings & Primary Text)
        mulberry: {
          50: "#FAF0F2",
          100: "#F4DFE3",
          200: "#E8BFC7",
          300: "#D697A4",
          400: "#C16F81",
          500: "#B56576", // Muted Dusty Rose
          600: "#9E475A",
          700: "#7A3545",
          800: "#5E2935",
          900: "#4A2E35", // Deep Mulberry
          950: "#3D2429", // Warm Espresso Primary
        },
        // Dusty Rose & Romantic Pink (Primary Romantic Palette)
        rose: {
          50: "#FFF8F8",
          100: "#FDE8EC", // Soft Blush
          200: "#FADBD8",
          300: "#F5B7B1", // Pastel Blossom
          400: "#E8A598",
          500: "#D88A96", // Dusty Rose Primary
          600: "#C56D7E", // Warm Dusty Rose CTA
          700: "#B56576", // Eyebrow Accent
          800: "#8C4A58",
          900: "#4A2E35",
          950: "#3D2429",
        },
        // Dusty Rose & Soft Blush (Romance / Secondary)
        blush: {
          50: "#FFF8F8",
          100: "#FDF2F4",
          200: "#FCE4E8",
          300: "#FADBD8", // Soft Blush
          400: "#F5B7B1", // Pastel Blossom
          500: "#E8A598",
          600: "#D88A96", // Dusty Rose
          700: "#C56D7E",
          800: "#8C4A58",
          900: "#4A2E35",
        },
        // Brushed Rose Gold & Champagne Gold (Accents / Outlines)
        gold: {
          50: "#FFF8F2",
          100: "#FAEDE3",
          200: "#F3DAC8",
          300: "#EAD5D5", // Rose-Gold Border
          400: "#E2B686", // Brushed Champagne Gold
          500: "#D4A373", // Rose Gold Primary
          600: "#C89B7B", // Brushed Rose Gold
          700: "#B3806D",
          800: "#8C5E4E",
          900: "#4A2E35",
        },
        // Petal Cream & Alabaster Pearl (Background / Surface)
        cream: {
          50: "#FFF8F8", // Soft Petal Cream Primary
          100: "#FFF1F3",
          200: "#FDE8EC", // Soft Blush Fading
          300: "#FADBD8",
          400: "#EAD5D5", // Rose-Gold Frosted Border
          500: "#C89B7B",
        },
        // Muted Rose Taupe (Text & Borders - Zero Green)
        olive: {
          100: "#FAF0F2",
          200: "#F3E2E5",
          300: "#DFC1C7",
          400: "#C9A7AF", // Rose Taupe
          500: "#9C767E",
          600: "#7A555C", // Deep Rose Taupe Text
          700: "#5E3E44",
          800: "#4A2E35", // Deep Mulberry
          900: "#3D2429", // Warm Espresso
        },
        // Complete Green-to-Pink safety mapping: Sage mapped to Romantic Rose & Mulberry
        sage: {
          50: "#FFF8F8",
          100: "#FDE8EC",
          200: "#FADBD8",
          300: "#F5B7B1",
          400: "#E8A598",
          500: "#D88A96",
          600: "#C56D7E",
          700: "#B56576",
          800: "#8C4A58",
          900: "#4A2E35",
          950: "#3D2429",
        },
        // Legacy compatibility colors mapped to Romantic Mulberry & Blush
        emerald: {
          850: "#4A2E35",
          950: "#3D2429",
        },
        champagne: {
          50: "#FFF8F8",
          100: "#FFF1F3",
          200: "#FDE8EC",
          300: "#FADBD8",
        },
        parchment: "#FFF8F8",
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
        "float-petal": "floatPetal 14s linear infinite",
        "sway-gentle": "swayGentle 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.88", transform: "scale(1.02)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floatPetal: {
          "0%": {
            transform: "translate3d(0, -30px, 0) rotate(0deg)",
            opacity: "0",
          },
          "10%": {
            opacity: "0.75",
          },
          "85%": {
            opacity: "0.75",
          },
          "100%": {
            transform: "translate3d(120px, 105vh, 0) rotate(380deg)",
            opacity: "0",
          },
        },
        swayGentle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      boxShadow: {
        gold: "0 10px 30px -10px rgba(212, 163, 115, 0.28)",
        "gold-glow": "0 0 25px rgba(212, 163, 115, 0.35)",
        card: "0 10px 40px -15px rgba(216, 138, 150, 0.12)",
        botanical: "0 12px 36px -12px rgba(216, 138, 150, 0.18)",
        blush: "0 10px 30px -10px rgba(216, 138, 150, 0.28)",
        rose: "0 8px 18px rgba(201, 122, 139, 0.25)",
        "rose-glow": "0 8px 24px rgba(216, 138, 150, 0.32)",
      },
    },
  },
  plugins: [],
};

export default config;
