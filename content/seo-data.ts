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

function buildParagraph(keyword: string, focus: string, action: string, payoff: string): string {
  return `${keyword} is easier to use when ${focus}. ${action}. ${payoff}. Keep each step small and repeat it for two weeks before you judge results. Write one short note after each check-in about what felt easy and what felt tense. Those notes turn vague feelings into clear choices for next week.`;
}

function buildSections(keyword: string, context: string): SeoSections {
  return {
    breakdown: [
      buildParagraph(
        keyword,
        `${context} starts with direct expectations and simple timing`,
        "Use one ten-minute check-in each week to review emotional pace, communication tone, and stress triggers",
        "This keeps both people focused on behavior instead of assumptions",
      ),
      buildParagraph(
        keyword,
        "you separate daily mood from repeat patterns",
        "Track two moments that felt smooth and two moments that felt tense",
        "When patterns repeat, changes become easier to test",
      ),
      buildParagraph(
        keyword,
        "both people explain needs before they react",
        "Ask one clear question before you respond during hard talks",
        "That pause lowers pressure and improves trust",
      ),
    ],
    pros: [
      buildParagraph(
        keyword,
        "you focus on clear strengths",
        "Use strengths for planning dates, conflict recovery, and daily support",
        "Shared strengths become stable routines that protect the relationship",
      ),
      buildParagraph(
        keyword,
        "communication is short and direct",
        "Use simple language, avoid mixed signals, and confirm final decisions",
        "Clear words prevent confusion and reduce avoidable stress",
      ),
      buildParagraph(
        keyword,
        "you review small wins",
        "Celebrate one helpful habit each week and keep it in your routine",
        "Small wins build momentum that lasts longer than one intense talk",
      ),
    ],
    challenges: [
      buildParagraph(
        keyword,
        "you ignore timing differences",
        "Set response windows for serious topics so neither person feels rushed",
        "Better timing lowers conflict intensity and improves repair speed",
      ),
      buildParagraph(
        keyword,
        "stress turns into quick assumptions",
        "When stress is high, repeat what you heard before sharing your point",
        "This one habit removes many avoidable arguments",
      ),
      buildParagraph(
        keyword,
        "you expect instant change",
        "Pick one habit at a time and measure progress weekly",
        "Slow progress with clear proof beats fast promises",
      ),
    ],
    tips: [
      buildParagraph(
        keyword,
        "you convert insight into action",
        "Choose one habit to start and one habit to stop this week",
        "Simple actions create visible progress within days",
      ),
      buildParagraph(
        keyword,
        "you protect calm conversations",
        "Use a short reset phrase when tension rises, then restart with one focused question",
        "Calm restarts keep trust intact even after disagreement",
      ),
      buildParagraph(
        keyword,
        "you set realistic expectations",
        "Review your plan every month and update only what is not working",
        "Regular reviews make long-term growth practical and consistent",
      ),
    ],
  };
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
  intro: `${seed.keyword} gives you a quick way to compare patterns, spot strengths, and plan better conversations. This guide explains what each score range means and how to use the result in daily life.`,
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
    intro: `${keyword} is easier to understand when you focus on daily behavior, not labels. This guide explains where this pair usually clicks, where tension appears, and how to keep momentum steady.`,
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
  intro: `${seed.keyword} is a common question for people who want clearer relationship decisions. This guide explains the topic in plain language and gives practical next steps you can use right away.`,
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

