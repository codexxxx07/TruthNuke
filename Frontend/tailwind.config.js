/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        /* Soft, light-tinted elevations for the role panels (no dark/heavy shadows) */
        soft: "0 4px 14px -6px rgba(14, 165, 233, 0.18)",
        "soft-lg": "0 10px 24px -12px rgba(14, 165, 233, 0.28)",
      },
      keyframes: {
        "title-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "title-in": "title-in 1.8s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      fontFamily: {
        sans: ["Segoe UI", "Open Sans", "system-ui", "sans-serif"],
      },
      colors: {
        /* Theme-aware surface tokens; channel triples live in src/styles/input.css */
        background: "rgb(var(--tn-background) / <alpha-value>)",
        foreground: "rgb(var(--tn-foreground) / <alpha-value>)",
        card: "rgb(var(--tn-card) / <alpha-value>)",
        border: "rgb(var(--tn-border) / <alpha-value>)",
        "muted-foreground": "rgb(var(--tn-muted-foreground) / <alpha-value>)",
        destructive: "rgb(var(--tn-destructive) / <alpha-value>)",
        bg: "rgb(var(--tn-bg) / <alpha-value>)",
        /* Semantic finding colors, tuned for WCAG AA text contrast on light surfaces */
        error: "rgb(var(--tn-error) / <alpha-value>)",
        warning: "rgb(var(--tn-warning) / <alpha-value>)",
        suggestion: "rgb(var(--tn-suggestion) / <alpha-value>)",
        information: "rgb(var(--tn-information) / <alpha-value>)",
        info: "rgb(var(--tn-information) / <alpha-value>)",
        /* Frutiger Aero palette */
        primary: {
          50: "#eff9ff",
          100: "#dbf1ff",
          200: "#b9e4fe",
          300: "#7cd2fc",
          400: "#36bcf7",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          foreground: "#ffffff",
        },
        secondary: {
          50: "#ecfeff",
          100: "#cffafe",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          foreground: "#ffffff",
        },
        aqua: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          foreground: "#ffffff",
        },
        success: {
          50: "#f0fdf4",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          foreground: "#ffffff",
        },
        danger: {
          50: "#fef2f2",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          foreground: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
