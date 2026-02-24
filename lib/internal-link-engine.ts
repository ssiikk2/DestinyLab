export interface InternalLinkItem {
  href: string;
  label: string;
}

const LOW_SCORE_LINKS: InternalLinkItem[] = [
  { href: "/blog/relationship-repair-guide", label: "Relationship Repair Guide" },
  {
    href: "/blog/how-accurate-are-compatibility-calculators",
    label: "How Accurate Are Compatibility Calculators?",
  },
  {
    href: "/blog/soulmate-vs-twin-flame-difference",
    label: "Soulmate vs Twin Flame: Key Differences",
  },
];

const MID_SCORE_LINKS: InternalLinkItem[] = [
  { href: "/blog/relationship-growth-habits", label: "Relationship Growth Habits" },
  {
    href: "/blog/love-compatibility-by-name-explained",
    label: "Love Compatibility by Name Explained",
  },
  {
    href: "/blog/what-is-a-good-love-compatibility-score",
    label: "What Is a Good Love Compatibility Score?",
  },
];

const HIGH_SCORE_LINKS: InternalLinkItem[] = [
  { href: "/blog/long-term-compatibility-guide", label: "Long-Term Compatibility Guide" },
  {
    href: "/zodiac-compatibility",
    label: "Zodiac Compatibility Calculator",
  },
  {
    href: "/blog/zodiac-compatibility-chart-explained",
    label: "Zodiac Compatibility Chart Explained",
  },
];

export function getInternalLinksForScore(score: number): InternalLinkItem[] {
  if (score < 60) {
    return LOW_SCORE_LINKS;
  }

  if (score < 80) {
    return MID_SCORE_LINKS;
  }

  return HIGH_SCORE_LINKS;
}

