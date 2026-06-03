/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        amazonia: {
          green: "#0B7A3B",
          "green-700": "#0A5E2E",
          "green-dark": "#06351B",
          black: "#0E0E0E",
          ink: "#111111",
          gold: "#C9A227",
          "gold-bright": "#E6C14B",
          sand: "#F5F5F4",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Arial", "sans-serif"],
        display: ["Anton", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(14,14,14,0.06), 0 8px 24px rgba(14,14,14,0.08)",
        "card-hover": "0 8px 16px rgba(14,14,14,0.10), 0 20px 40px rgba(14,14,14,0.14)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
