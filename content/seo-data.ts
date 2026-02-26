import { blogSeeds } from "@/content/blog-seeds";

export type SeoPageKind = "tool" | "blog" | "zodiac";

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface SeoLink {
  href: string;
  label: string;
}

export interface SeoSections {
  breakdown: string[];
  pros: string[];
  challenges: string[];
  tips: string[];
}

export interface SeoPageRecord {
  kind: SeoPageKind;
  slug: string;
  path: string;
  keyword: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  lastUpdated: string;
  sections: SeoSections;
  faqs: SeoFaq[];
  relatedLinks: SeoLink[];
}

interface ToolSeed {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  h1: string;
}

interface BlogSeed {
  slug: string;
  keyword: string;
  title: string;
  description: string;
}

const LAST_UPDATED = "2026-02-23";

const TOOL_SEEDS: ToolSeed[] = [
  {
    slug: "love-compatibility-calculator",
    keyword: "love compatibility calculator",
    title: "Love Compatibility Calculator: Score Meaning, Strengths, and Next Steps",
    description:
      "Use this love compatibility calculator to check score patterns, relationship strengths, common challenges, and practical tips.",
    h1: "Love Compatibility Calculator",
  },
  {
    slug: "name-compatibility",
    keyword: "name compatibility",
    title: "Name Compatibility Guide and Calculator: How to Read Your Score",
    description:
      "This name compatibility page explains how to read your score, what patterns matter most, and which habits help a match grow.",
    h1: "Name Compatibility",
  },
  {
    slug: "initials-compatibility",
    keyword: "initials compatibility test",
    title: "Initials Compatibility Test: Quick Match Score and Meaning",
    description:
      "Use the initials compatibility test to estimate attraction rhythm, communication flow, and practical next steps.",
    h1: "Initials Compatibility Test",
  },
  {
    slug: "crush-compatibility",
    keyword: "crush compatibility test",
    title: "Crush Compatibility Test: Early Match Signals and Score Guide",
    description:
      "This crush compatibility test explains early relationship signals, score ranges, and realistic next actions.",
    h1: "Crush Compatibility Test",
  },
  {
    slug: "friendship-compatibility",
    keyword: "friendship compatibility test",
    title: "Friendship Compatibility Test: Trust, Energy, and Communication Fit",
    description:
      "Check friendship compatibility with a simple score and practical tips for stronger trust and smoother communication.",
    h1: "Friendship Compatibility Test",
  },
  {
    slug: "zodiac-compatibility",
    keyword: "zodiac compatibility",
    title: "Zodiac Compatibility Calculator and Guide for Daily Relationship Decisions",
    description:
      "Check zodiac compatibility with a simple calculator, then review strengths, challenges, and practical dating tips.",
    h1: "Zodiac Compatibility",
  },
  {
    slug: "birthday-compatibility",
    keyword: "birthday compatibility",
    title: "Birthday Compatibility Calculator: What Your Date Match Really Means",
    description:
      "Use birthday compatibility to compare timing, communication style, and long-term rhythm in a clear and practical way.",
    h1: "Birthday Compatibility",
  },
  {
    slug: "destiny-calculator",
    keyword: "destiny calculator",
    title: "Destiny Calculator: Relationship Reflection, Score Context, and Action Tips",
    description:
      "This destiny calculator page explains score ranges, balance points, and practical habits for stronger relationship rhythm.",
    h1: "Destiny Calculator",
  },
];

const ZODIAC_PAIR_SLUGS = [
  "aries-and-taurus-compatibility",
  "aries-and-scorpio-compatibility",
  "taurus-and-libra-compatibility",
  "gemini-and-sagittarius-compatibility",
  "cancer-and-leo-compatibility",
  "leo-and-scorpio-compatibility",
  "virgo-and-pisces-compatibility",
  "libra-and-capricorn-compatibility",
  "scorpio-and-aries-compatibility",
  "sagittarius-and-gemini-compatibility",
  "capricorn-and-cancer-compatibility",
  "aquarius-and-virgo-compatibility",
  "pisces-and-cancer-compatibility",
  "leo-and-aries-compatibility",
  "taurus-and-scorpio-compatibility",
  "libra-and-aries-compatibility",
  "virgo-and-capricorn-compatibility",
  "gemini-and-aquarius-compatibility",
] as const;

const BLOG_SEEDS: BlogSeed[] = blogSeeds.map((seed) => ({
  slug: seed.slug,
  keyword: seed.keyword,
  title: seed.title,
  description: seed.description,
}));

function toTitleCase(value: string): string {
  return value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function pickItems<T>(items: T[], start: number, count: number, exclude?: (item: T) => boolean): T[] {
  const values: T[] = [];

  for (let offset = 0; offset < items.length && values.length < count; offset += 1) {
    const item = items[(start + offset) % items.length];

    if (exclude && exclude(item)) {
      continue;
    }

    values.push(item);
  }

  return values;
}

function normalizeLabel(value: string): string {
  return value
    .replace(/\s+guide$/i, "")
    .replace(/\s+calculator$/i, "")
    .replace(/\s+compatibility$/i, "")
    .trim();
}

function buildSectionParagraphs(keyword: string, context: string, section: keyof SeoSections): string[] {
  const label = normalizeLabel(keyword);

  if (section === "breakdown") {
    return [
      `Start with one simple question: where does ${label} feel easiest in real life? In many pairs, ${context} gets smoother once both people agree on response timing before stress kicks in.`,
      "Try a tiny weekly reset: swap one moment that felt easy and one that felt tense. That short comparison helps you spot patterns without turning every conversation into a debate.",
      "When a tough topic shows up, slow the pace and ask for one clear request first. Fewer assumptions usually means fewer spirals, and the next talk lands better.",
    ];
  }

  if (section === "pros") {
    return [
      `One upside of ${label} is momentum: small positive habits stack fast when both people notice them out loud.`,
      "Clear language helps this match breathe. A short direct message often works better than a long emotional monologue.",
      "Celebrate the tiny wins, not only the big milestones. A calm repair after a messy moment is still a win worth counting.",
    ];
  }

  if (section === "challenges") {
    return [
      `The usual friction point for ${label} is pace mismatch. One person wants closure now, the other needs a beat to process.`,
      "Stress can turn neutral messages into loaded ones. Before reacting, repeat back what you heard in plain words.",
      "The biggest trap is trying to change five habits at once. Pick one pressure point, test one adjustment, and review it after a week.",
    ];
  }

  return [
    `Pick one action for this week and keep it light. ${label} gets more useful when insight turns into something you can actually try.`,
    "Use a reset line when tension spikes: \"Give me two minutes, I want to answer well.\" That tiny pause protects the tone.",
    "If you're unsure what to do next, run a mini check-in on Sunday night: what helped, what stung, and what to tweak next.",
  ];
}

function buildSections(keyword: string, context: string): SeoSections {
  return {
    breakdown: buildSectionParagraphs(keyword, context, "breakdown"),
    pros: buildSectionParagraphs(keyword, context, "pros"),
    challenges: buildSectionParagraphs(keyword, context, "challenges"),
    tips: buildSectionParagraphs(keyword, context, "tips"),
  };
}

function buildIntro(keyword: string, variant: "tool" | "zodiac" | "blog", prettyPair?: string): string {
  if (variant === "zodiac" && prettyPair) {
    return `${prettyPair} has its own rhythm. Some moments click instantly, others need better timing and clearer words. This page gives you a grounded way to read both.`;
  }

  if (variant === "blog") {
    return `If you've been wondering about ${keyword}, this guide keeps it simple: what matters, what people misread, and what to try next time a real moment shows up.`;
  }

  return `${keyword} can be a fun mirror when you use it with context. Read the score, compare it with real behavior, and take one small step instead of chasing perfect answers.`;
}
function buildFaqs(keyword: string): SeoFaq[] {
  return [
    {
      question: `How should I use ${keyword}?`,
      answer:
        "Use it as a reflection tool. Pick one insight and turn it into one weekly action you can track.",
    },
    {
      question: "What does a lower score mean?",
      answer:
        "A lower score usually shows pressure points. It does not mean the relationship cannot improve.",
    },
    {
      question: "How often should we check again?",
      answer:
        "Monthly is enough for most people, or after a major life change.",
    },
    {
      question: "Can this replace professional advice?",
      answer:
        "No. This guide is for reflection and entertainment purposes.",
    },
    {
      question: "How do we get better results over time?",
      answer:
        "Keep communication clear, set short review cycles, and track one behavior change at a time.",
    },
    {
      question: "Should we compare this with another test?",
      answer:
        "Yes. A second angle often makes interpretation clearer and more balanced.",
    },
    {
      question: "Can this still be useful if we disagree with it?",
      answer:
        "Absolutely. Disagreement can highlight what each person values most right now.",
    },
    {
      question: "What is one good next move after reading this?",
      answer:
        "Choose one practical action for this week and review how it changed the tone.",
    },
  ];
}

const toolPagesBase: SeoPageRecord[] = TOOL_SEEDS.map((seed) => ({
  kind: "tool",
  slug: seed.slug,
  path: `/${seed.slug}`,
  keyword: seed.keyword,
  title: seed.title,
  description: seed.description,
  h1: seed.h1,
  intro: buildIntro(seed.keyword, "tool"),
  lastUpdated: LAST_UPDATED,
  sections: buildSections(seed.keyword, "a strong relationship rhythm"),
  faqs: buildFaqs(seed.keyword),
  relatedLinks: [],
}));

const zodiacPagesBase: SeoPageRecord[] = ZODIAC_PAIR_SLUGS.map((slug) => {
  const pairText = slug.replace(/-compatibility$/, "");
  const [sign1, , sign2] = pairText.split("-");
  const prettyPair = `${toTitleCase(sign1)} and ${toTitleCase(sign2)}`;
  const keyword = `${sign1} and ${sign2} compatibility`;

  return {
    kind: "zodiac",
    slug,
    path: `/zodiac/${slug}`,
    keyword,
    title: `${prettyPair} Compatibility: Strengths, Challenges, and Relationship Tips`,
    description: `${prettyPair} compatibility guide with score context, practical examples, and next-step advice for reflection and entertainment purposes.`,
    h1: `${prettyPair} Compatibility`,
    intro: buildIntro(keyword, "zodiac", prettyPair),
    lastUpdated: LAST_UPDATED,
    sections: buildSections(keyword, `${prettyPair} compatibility`),
    faqs: buildFaqs(keyword),
    relatedLinks: [],
  };
});

const blogPagesBase: SeoPageRecord[] = BLOG_SEEDS.map((seed) => ({
  kind: "blog",
  slug: seed.slug,
  path: `/blog/${seed.slug}`,
  keyword: seed.keyword,
  title: seed.title,
  description: seed.description,
  h1: seed.title,
  intro: buildIntro(seed.keyword, "blog"),
  lastUpdated: LAST_UPDATED,
  sections: buildSections(seed.keyword, "healthy relationship progress"),
  faqs: buildFaqs(seed.keyword),
  relatedLinks: [],
}));

const calculatorHubLink: SeoLink = {
  href: "/love-compatibility-calculator",
  label: "Love Compatibility Calculator",
};

const zodiacHubLink: SeoLink = {
  href: "/zodiac",
  label: "Zodiac Compatibility Hub",
};

const toolPages: SeoPageRecord[] = toolPagesBase.map((page, index) => {
  const extraTools = pickItems(
    toolPagesBase,
    index + 1,
    3,
    (candidate) => candidate.slug === page.slug,
  ).map((candidate) => ({ href: candidate.path, label: candidate.h1 }));

  const blogLinks = pickItems(blogPagesBase, index, 2).map((post) => ({
    href: post.path,
    label: post.h1,
  }));

  const zodiacLinks = pickItems(zodiacPagesBase, index * 2, 4).map((pair) => ({
    href: pair.path,
    label: pair.h1,
  }));

  return {
    ...page,
    relatedLinks: [...extraTools, ...blogLinks, ...zodiacLinks],
  };
});

const blogPages: SeoPageRecord[] = blogPagesBase.map((page, index) => {
  const otherBlogs = pickItems(
    blogPagesBase,
    index + 1,
    2,
    (candidate) => candidate.slug === page.slug,
  ).map((post) => ({
    href: post.path,
    label: post.h1,
  }));

  const zodiacLinks = pickItems(zodiacPagesBase, index * 3, 4).map((pair) => ({
    href: pair.path,
    label: pair.h1,
  }));

  return {
    ...page,
    relatedLinks: [calculatorHubLink, ...otherBlogs, ...zodiacLinks],
  };
});

const zodiacPages: SeoPageRecord[] = zodiacPagesBase.map((page, index) => {
  const otherPairs = pickItems(
    zodiacPagesBase,
    index + 1,
    6,
    (candidate) => candidate.slug === page.slug,
  ).map((pair) => ({
    href: pair.path,
    label: pair.h1,
  }));

  const blogLinks = pickItems(blogPagesBase, index, 2).map((post) => ({
    href: post.path,
    label: post.h1,
  }));

  return {
    ...page,
    relatedLinks: [calculatorHubLink, zodiacHubLink, ...otherPairs, ...blogLinks],
  };
});

export const allSeoPages: SeoPageRecord[] = [...toolPages, ...zodiacPages, ...blogPages];

export const initialPageCount = allSeoPages.length;

export function getToolPageBySlug(slug: string): SeoPageRecord | undefined {
  return toolPages.find((page) => page.slug === slug);
}

export function getBlogPageBySlug(slug: string): SeoPageRecord | undefined {
  return blogPages.find((page) => page.slug === slug);
}

export function getZodiacPageBySlug(slug: string): SeoPageRecord | undefined {
  return zodiacPages.find((page) => page.slug === slug);
}

export function getPageByPath(path: string): SeoPageRecord | undefined {
  return allSeoPages.find((page) => page.path === path);
}

export function getBlogPages(): SeoPageRecord[] {
  return blogPages;
}

export function getToolPages(): SeoPageRecord[] {
  return toolPages;
}

export function getZodiacPages(): SeoPageRecord[] {
  return zodiacPages;
}


