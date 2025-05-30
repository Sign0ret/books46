import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Classical, old money color palette
        parchment: {
          50: "#FFFDF5",
          100: "#FFFAEB",
          200: "#FFF5D6",
          300: "#FFEFC0",
          400: "#FFE9AB",
          500: "#F5DFA3",
          600: "#E6D092",
          700: "#D6C182",
          800: "#C7B271",
          900: "#B8A361",
        },
        marble: {
          50: "#F9F9F7",
          100: "#F2F2EF",
          200: "#E6E6E0",
          300: "#D9D9D1",
          400: "#CDCDC2",
          500: "#C0C0B3",
          600: "#B3B3A4",
          700: "#A6A695",
          800: "#999986",
          900: "#8C8C77",
        },
        terracotta: {
          50: "#FCF5F3",
          100: "#F9EBE7",
          200: "#F3D7CF",
          300: "#ECC3B7",
          400: "#E6AF9F",
          500: "#DF9B87",
          600: "#D8876F",
          700: "#D17357",
          800: "#CA5F3F",
          900: "#C34B27",
        },
        olive: {
          50: "#F7F8F2",
          100: "#EFF1E5",
          200: "#DFE3CB",
          300: "#CFD5B1",
          400: "#BFC797",
          500: "#AFB97D",
          600: "#9FAB63",
          700: "#8F9D49",
          800: "#7F8F2F",
          900: "#6F8115",
        },
        wine: {
          50: "#F9F5F5",
          100: "#F2EBEB",
          200: "#E6D7D7",
          300: "#D9C3C3",
          400: "#CDAFAF",
          500: "#C09B9B",
          600: "#B38787",
          700: "#A67373",
          800: "#995F5F",
          900: "#8C4B4B",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "serif"],
        sans: ["var(--font-raleway)", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
      },
      backgroundImage: {
        "parchment-texture": "url('/textures/parchment.png')",
        "marble-texture": "url('/textures/marble.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
