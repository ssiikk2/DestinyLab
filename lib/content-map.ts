export interface ClusterLink {
  href: string;
  label: string;
  keywords: string[];
  tags?: string[];
}

export interface ClusterContext {
  type?: "home" | "tool" | "guide" | "hub" | "pair";
  pair?: string;
  tags?: string[];
}

const guides: ClusterLink[] = [
  { href: "/blog/love-compatibility-score-meaning", label: "Love compatibility score meaning guide", keywords: ["meaning", "score"], tags: ["core"] },
  { href: "/blog/70-love-compatibility-score-meaning", label: "What a 70 compatibility score means", keywords: ["meaning", "ranges"], tags: ["score"] },
  { href: "/blog/low-compatibility-score-meaning", label: "Low compatibility score meaning and advice", keywords: ["low score", "advice"], tags: ["score"] },
  { href: "/blog/is-love-compatibility-calculator-accurate", label: "How accurate compatibility tests can feel", keywords: ["accuracy", "insights"], tags: ["core"] },
  { href: "/blog/compatibility-strengths-and-weaknesses", label: "Compatibility strengths and weaknesses breakdown", keywords: ["strengths", "challenges"], tags: ["core"] },
  { href: "/blog/next-steps-after-compatibility-score", label: "Next steps after your compatibility score", keywords: ["next steps", "advice"], tags: ["core"] },
];

const tools: ClusterLink[] = [
  { href: "/calculator", label: "Relationship score meaning tool", keywords: ["score", "meaning"], tags: ["core"] },
  { href: "/tests", label: "All compatibility tests by vibe", keywords: ["tests", "compare"], tags: ["core"] },
  { href: "/true-love-test", label: "True love test with deeper insights", keywords: ["deep", "long-term"] },
];

const pairs: ClusterLink[] = [
  { href: "/compatibility/cancer-and-libra", label: "Cancer and Libra compatibility insights", keywords: ["cancer", "libra"], tags: ["cancer", "libra"] },
  { href: "/compatibility/leo-and-aries", label: "Leo and Aries strengths and challenges", keywords: ["leo", "aries"], tags: ["leo", "aries"] },
  { href: "/compatibility/scorpio-and-pisces", label: "Scorpio and Pisces communication guide", keywords: ["scorpio", "pisces"], tags: ["scorpio", "pisces"] },
  { href: "/compatibility/taurus-and-capricorn", label: "Taurus and Capricorn long-term outlook", keywords: ["taurus", "capricorn"], tags: ["taurus", "capricorn"] },
];

function scoreLink(link: ClusterLink, ctx?: ClusterContext): number {
  let score = link.tags?.includes("core") ? 50 : 0;
  if (!ctx) return score;

  if (ctx.tags?.length) {
    const tagSet = new Set(ctx.tags.map((tag) => tag.toLowerCase()));
    for (const tag of link.tags || []) {
      if (tagSet.has(tag.toLowerCase())) score += 20;
    }
  }

  if (ctx.pair) {
    const pairKey = ctx.pair.toLowerCase();
    if (link.href.includes(pairKey)) score += 30;
    if (link.label.toLowerCase().includes(pairKey)) score += 10;
  }

  if (ctx.type === "pair" && link.keywords.includes("advice")) score += 10;
  if (ctx.type === "tool" && link.keywords.includes("score")) score += 10;
  if (ctx.type === "hub" && link.keywords.includes("compare")) score += 10;
  return score;
}

function rankLinks(items: ClusterLink[], ctx?: ClusterContext): ClusterLink[] {
  return [...items].sort((a, b) => scoreLink(b, ctx) - scoreLink(a, ctx));
}

export function getClusterLinks(ctx?: ClusterContext): {
  relatedGuides: ClusterLink[];
  relatedTools: ClusterLink[];
  trendingPairs: ClusterLink[];
} {
  const forcedGuides = ["/blog/love-compatibility-score-meaning", "/blog/next-steps-after-compatibility-score"];
  const forcedTools = ["/calculator", "/tests"];

  const rankedGuides = rankLinks(guides, ctx);
  const rankedTools = rankLinks(tools, ctx);
  const rankedPairs = rankLinks(pairs, ctx);

  const guidePool = [...forcedGuides.map((href) => guides.find((g) => g.href === href)).filter(Boolean) as ClusterLink[]];
  for (const link of rankedGuides) {
    if (!guidePool.some((item) => item.href === link.href)) guidePool.push(link);
  }

  const toolPool = [...forcedTools.map((href) => tools.find((g) => g.href === href)).filter(Boolean) as ClusterLink[]];
  for (const link of rankedTools) {
    if (!toolPool.some((item) => item.href === link.href)) toolPool.push(link);
  }

  return {
    relatedGuides: guidePool.slice(0, 6),
    relatedTools: toolPool.slice(0, 2),
    trendingPairs: rankedPairs.slice(0, 4),
  };
}
