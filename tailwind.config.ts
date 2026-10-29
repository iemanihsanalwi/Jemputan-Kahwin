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
        // Botanical Sage & Deep Forest (Primary Botanical)
        sage: {
          50: "#F4F7F5",
          100: "#E3ECE6",
          200: "#C6D8CD",
          300: "#A3C0AD",
          400: "#7CA58A",
          500: "#5A8B6B",
          600: "#3E5C49", // Deep Forest
          700: "#2D5A43", // Botanical Sage Primary
          800: "#224433",
          900: "#183024",
          950: "#0C1913",
        },
        // Dusty Rose & Soft Blush (Romance / Secondary)
        blush: {
          50: "#FDF9F8",
          100: "#FAF1EE",
          200: "#F4E0DC",
          300: "#E8C5BE", // Soft Blush
          400: "#D8A49B", // Dusty Rose
          500: "#C5857B",
          600: "#AC665B",
          700: "#8E4D43",
          800: "#703C34",
          900: "#562E28",
        },
        // Warm Antique Gold (Elegance / Accent)
        gold: {
          50: "#FAF7EE",
          100: "#F5EED6",
          200: "#EBDDB1",
          300: "#DFC785",
          400: "#D4AF37", // Warm Gold
          500: "#C5A059", // Warm Antique Gold Primary
          600: "#A7823F",
          700: "#86652C",
          800: "#644A1E",
          900: "#443213",
        },
        // Warm Cream & Alabaster Pearl (Background / Surface)
        cream: {
          50: "#FAF7F2", // Warm Cream
          100: "#F4EFE6", // Alabaster Pearl
          200: "#EBE3D4",
          300: "#DFD2BC",
          400: "#CEBC9F",
          500: "#B8A381",
        },
        // Muted Olive & Taupe (Text & Borders)
        olive: {
          100: "#ECEEE8",
          200: "#D7DCD1",
          300: "#BFC6B6",
          400: "#A5A58D", // Taupe
          500: "#8B9074",
          600: "#6B705C", // Muted Olive
          700: "#515545",
          800: "#383B30",
          900: "#22241D",
        },
        // Legacy compatibility colors
        emerald: {
          850: "#224433",
          950: "#183024",
        },
        champagne: {
          50: "#FAF7F2",
          100: "#F4EFE6",
          200: "#EBE3D4",
          300: "#DFD2BC",
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
        gold: "0 10px 30px -10px rgba(197, 160, 89, 0.28)",
        "gold-glow": "0 0 25px rgba(212, 175, 55, 0.35)",
        card: "0 10px 40px -15px rgba(45, 90, 67, 0.08)",
        botanical: "0 12px 36px -12px rgba(45, 90, 67, 0.15)",
        blush: "0 10px 30px -10px rgba(216, 164, 155, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
