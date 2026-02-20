export const designTokens = {
  color: {
    bg: {
      base: "#f7f6f2",
      elevated: "#ffffff",
      muted: "#f1efe8",
    },
    text: {
      primary: "#1f2330",
      secondary: "#4d5568",
      tertiary: "#7b8190",
      inverse: "#f9fafb",
    },
    brand: {
      primary: "#3438a8",
      primaryHover: "#2b2f8f",
      accent: "#c95b7b",
      accentSoft: "#f1dbe2",
    },
    border: {
      soft: "#e4e1d9",
      strong: "#cbc6ba",
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
    card: "0 10px 30px rgba(28, 35, 54, 0.08)",
    cardHover: "0 14px 36px rgba(28, 35, 54, 0.13)",
    glow: "0 0 0 1px rgba(201, 91, 123, 0.14), 0 16px 46px rgba(52, 56, 168, 0.22)",
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
      copy: "1.68",
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