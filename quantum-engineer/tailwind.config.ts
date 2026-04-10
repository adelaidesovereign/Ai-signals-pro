import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F5F0E8",
          deep: "#EDE6D6",
          warm: "#FAFAF8",
        },
        sage: {
          DEFAULT: "#7A8C7E",
          light: "#A8B8A4",
          deep: "#5C6B5E",
        },
        gold: {
          DEFAULT: "#C9A84C",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        base: ["1.125rem", { lineHeight: "1.75" }],
        lg: ["1.25rem", { lineHeight: "1.8" }],
      },
      maxWidth: {
        prose: "68ch",
        reading: "42rem",
      },
      boxShadow: {
        soft: "0 10px 40px -20px rgba(92, 107, 94, 0.25)",
        card: "0 1px 2px rgba(92, 107, 94, 0.04), 0 12px 32px -18px rgba(92, 107, 94, 0.18)",
      },
      borderRadius: {
        soft: "14px",
      },
      letterSpacing: {
        quiet: "0.02em",
      },
    },
  },
  plugins: [],
};

export default config;
