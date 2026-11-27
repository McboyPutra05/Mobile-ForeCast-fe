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
          bg: "#FAF6F0",
          card: "#F2EBE1",
          elevated: "#EAE0D2",
          secondary: "#E5DCCB",
        },
        dark: {
          bg: "#121110",
          card: "#1C1A18",
          elevated: "#25221F",
          secondary: "#2C2824",
          border: "#2E2B27",
          text: "#F5F2EB",
        },
        border: {
          subtle: "#D6CFC2",
          dashed: "#C8C0B4",
          active: "#A89F91",
          strong: "#1C1917",
        },
        sentiment: {
          bullish: "#2D6A4F",
          "bullish-subtle": "rgba(45, 106, 79, 0.10)",
          "bullish-border": "rgba(45, 106, 79, 0.35)",
          bearish: "#7F1D1D",
          "bearish-subtle": "rgba(127, 29, 29, 0.10)",
          "bearish-border": "rgba(127, 29, 29, 0.35)",
        },
        alert: {
          warning: "#B45309",
          "warning-subtle": "rgba(180, 83, 9, 0.10)",
          navy: "#1E293B",
          "navy-subtle": "rgba(30, 41, 59, 0.08)",
        },
        text: {
          primary: "#1C1917",
          secondary: "#57534E",
          muted: "#635D57",
          inverse: "#FAF6F0",
        },
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
        sans: ["Inter"],
        mono: ["JetBrainsMono"],
      },
    },
  },
  plugins: [],
};
