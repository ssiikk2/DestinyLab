export interface NavItem {
  href: string;
  label: string;
}

export const toolsNav: NavItem[] = [
  { href: "/calculator", label: "Calculate" },
  { href: "/tests", label: "All Tests" },
  { href: "/zodiac", label: "Zodiac Hub" },
  { href: "/name-compatibility", label: "Name Test" },
  { href: "/birthday-compatibility", label: "Birthday Test" },
  { href: "/destiny", label: "Destiny" },
];

export const guidesNav: NavItem[] = [
  { href: "/blog", label: "Insights Hub" },
  { href: "/blog/love-compatibility-score-meaning", label: "Score Meaning Guide" },
  { href: "/blog/next-steps-after-compatibility-score", label: "Next Steps Guide" },
  { href: "/compatibility/cancer-and-libra", label: "Trending Pair Guide" },
];
