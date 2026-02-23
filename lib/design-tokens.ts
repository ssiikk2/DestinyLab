export const designTokens = {
  color: {
    bg: {
      base: "#f4f2ee",
      elevated: "#ffffff",
      muted: "#ece8df",
    },
    text: {
      primary: "#1a2230",
      secondary: "#445064",
      tertiary: "#6f7888",
      inverse: "#f9fafb",
    },
    brand: {
      primary: "#244a87",
      primaryHover: "#1c3f77",
      accent: "#b46d45",
      accentSoft: "#f0ddcf",
    },
    border: {
      soft: "#dfd8ca",
      strong: "#c8bfaf",
    },
  },
  radius: {
    sm: "0.625rem",
    md: "0.875rem",
    lg: "1.25rem",
    xl: "1.75rem",
    pill: "999px",
  },
  shadow: {
    card: "0 10px 28px rgba(19, 28, 45, 0.09)",
    cardHover: "0 16px 38px rgba(19, 28, 45, 0.14)",
    glow: "0 0 0 1px rgba(180, 109, 69, 0.12), 0 16px 42px rgba(36, 74, 135, 0.22)",
  },
  type: {
    scale: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.375rem",
      h3: "1.75rem",
      h2: "2.25rem",
      h1: "clamp(2.2rem, 5vw, 4rem)",
    },
    tracking: {
      label: "0.16em",
      tight: "-0.02em",
    },
    leading: {
      copy: "1.62",
      heading: "1.08",
    },
  },
  motion: {
    fast: "160ms",
    base: "220ms",
    slow: "260ms",
    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
} as const;

export type DesignTokens = typeof designTokens;
