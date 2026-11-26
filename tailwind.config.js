/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#0B0E14",
          card: "#151A23",
          elevated: "#1C2331",
          secondary: "#222B3D",
        },
        border: {
          subtle: "#1F2937",
          active: "#374151",
          highlight: "#4B5563",
        },
        sentiment: {
          bullish: "#10B981",
          "bullish-subtle": "rgba(16, 185, 129, 0.12)",
          "bullish-border": "rgba(16, 185, 129, 0.35)",
          bearish: "#EF4444",
          "bearish-subtle": "rgba(239, 68, 68, 0.12)",
          "bearish-border": "rgba(239, 68, 68, 0.35)",
        },
        alert: {
          warning: "#F59E0B",
          "warning-subtle": "rgba(245, 158, 11, 0.12)",
          info: "#3B82F6",
          "info-subtle": "rgba(59, 130, 246, 0.12)",
        },
        text: {
          primary: "#F9FAFB",
          secondary: "#9CA3AF",
          muted: "#6B7280",
          inverse: "#0B0E14",
        },
      },
      fontFamily: {
        sans: ["Inter"],
        mono: ["JetBrainsMono"],
      },
    },
  },
  plugins: [],
};

