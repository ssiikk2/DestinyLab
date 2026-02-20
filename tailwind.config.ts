import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        "bg-elevated": "var(--color-bg-elevated)",
        "bg-muted": "var(--color-bg-muted)",
        "text-main": "var(--color-text-primary)",
        "text-muted": "var(--color-text-secondary)",
        "text-tertiary": "var(--color-text-tertiary)",
        "brand-primary": "var(--color-brand-primary)",
        "brand-accent": "var(--color-brand-accent)",
        "border-soft": "var(--color-border-soft)",
        "border-strong": "var(--color-border-strong)",
      },
      borderRadius: {
        card: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        soft: "var(--shadow-card)",
        glow: "var(--shadow-glow)",
      },
      transitionTimingFunction: {
        smooth: "var(--ease-smooth)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        base: "var(--duration-base)",
      },
    },
  },
};

export default config;