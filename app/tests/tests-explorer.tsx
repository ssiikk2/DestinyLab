"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { InternalLinkCluster } from "@/components/InternalLinkCluster";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { absoluteUrl } from "@/lib/seo";

type Vibe = "All" | "Playful" | "Fun" | "Deep" | "Reflective" | "Cosmic";
type SortMode = "Popular" | "Quick" | "Deep";
type Goal = "First score" | "Crush check" | "Serious relationship" | "Zodiac mood";

interface ToolItem {
  path: string;
  h1: string;
  description: string;
  mode: string;
}

interface TestVisual {
  icon: string;
  vibe: Exclude<Vibe, "All">;
  line: string;
  frameClass: string;
}

const TEST_VISUALS: Record<string, TestVisual> = {
  "/calculator": {
    icon: "PR",
    vibe: "Playful",
    line: "The main score read with quick meaning and concrete next moves.",
    frameClass: "md:col-span-2 border-slate-300 bg-gradient-to-br from-white via-rose-50 to-sky-50",
  },
  "/name-compatibility": {
    icon: "NM",
    vibe: "Playful",
    line: "Name chemistry with first-impression insights and communication hints.",
    frameClass: "border-sky-200 bg-sky-50/70",
  },
  "/initials-love-test": {
    icon: "IN",
    vibe: "Fun",
    line: "Short and quick when you want a fast score snapshot.",
    frameClass: "border-emerald-200 bg-emerald-50/70",
  },
  "/zodiac-compatibility": {
    icon: "ZG",
    vibe: "Cosmic",
    line: "Sign-based meaning, shared strengths, and pressure points.",
    frameClass: "border-teal-200 bg-teal-50/70",
  },
  "/birthday-compatibility": {
    icon: "BD",
    vibe: "Reflective",
    line: "Birthday rhythm check for timing, pace, and long-term alignment.",
    frameClass: "border-orange-200 bg-orange-50/70",
  },
  "/destiny": {
    icon: "DS",
    vibe: "Deep",
    line: "A deeper self-read on your relationship style and patterns.",
    frameClass: "border-indigo-200 bg-indigo-50/70",
  },
  "/love-percentage": {
    icon: "LP",
    vibe: "Fun",
    line: "Instant percentage read for quick sharing and comparison.",
    frameClass: "border-rose-200 bg-rose-50/70",
  },
  "/true-love-test": {
    icon: "TL",
    vibe: "Deep",
    line: "Focuses on trust, communication, and long-term durability.",
    frameClass: "border-fuchsia-200 bg-fuchsia-50/70",
  },
  "/couple-test": {
    icon: "CP",
    vibe: "Playful",
    line: "Compare habits and responses with a balanced couple snapshot.",
    frameClass: "border-violet-200 bg-violet-50/70",
  },
  "/crush-calculator": {
    icon: "CR",
    vibe: "Fun",
    line: "For crush energy when you want quick clues without overthinking.",
    frameClass: "border-pink-200 bg-pink-50/70",
  },
  "/friendship-compatibility": {
    icon: "FR",
    vibe: "Reflective",
    line: "Friendship chemistry for trust, tone, and communication fit.",
    frameClass: "border-amber-200 bg-amber-50/70",
  },
};

const GROUPS = [
  {
    title: "Name-Based Tests",
    intro: "Letter energy, name chemistry, and playful first-impression reads.",
    ctaLabel: "Try this combo: Name Test + True Love Test",
    ctaHref: "/name-compatibility",
    paths: ["/name-compatibility", "/initials-love-test", "/love-percentage-by-name"],
  },
  {
    title: "Zodiac-Based Tests",
    intro: "Sign stories with communication insights and long-term patterns.",
    ctaLabel: "Try this combo: Zodiac Hub + Cancer and Libra Pair",
    ctaHref: "/zodiac",
    paths: ["/zodiac-compatibility"],
  },
  {
    title: "Birth-Date Tests",
    intro: "Date-based meaning for life rhythm, timing, and shared pace.",
    ctaLabel: "Try this combo: Birthday Test + Destiny",
    ctaHref: "/birthday-compatibility",
    paths: ["/birthday-compatibility", "/destiny"],
  },
  {
    title: "Fun Relationship Games",
    intro: "Light, social tests you can run fast and compare together.",
    ctaLabel: "Try this combo: Love Percentage + Couple Test",
    ctaHref: "/love-percentage",
    paths: ["/love-percentage", "/true-love-test", "/couple-test", "/crush-calculator", "/friendship-compatibility"],
  },
] as const;

const POPULAR_ORDER = [
  "/calculator",
  "/true-love-test",
  "/love-percentage",
  "/zodiac-compatibility",
  "/name-compatibility",
  "/birthday-compatibility",
  "/destiny",
];

const GOAL_RECS: Record<Goal, { href: string; title: string; reason: string }[]> = {
  "First score": [
    { href: "/calculator", title: "Main compatibility score", reason: "Start broad before narrowing the result." },
    { href: "/love-percentage", title: "Love percentage", reason: "Get a fast second read for comparison." },
    { href: "/best-love-compatibility-tests", title: "Best tests guide", reason: "Pick the next path without guessing." },
  ],
  "Crush check": [
    { href: "/crush-calculator", title: "Crush calculator", reason: "Low-pressure read for early-stage interest." },
    { href: "/name-compatibility", title: "Name compatibility", reason: "Playful angle that is easy to share." },
    { href: "/initials-love-test", title: "Initials love test", reason: "Fastest lightweight follow-up." },
  ],
  "Serious relationship": [
    { href: "/true-love-test", title: "True love test", reason: "Focuses on trust, effort, and staying power." },
    { href: "/couple-test", title: "Couple test", reason: "Good for habits and day-to-day rhythm." },
    { href: "/birthday-compatibility", title: "Birthday compatibility", reason: "Adds pacing and timing context." },
  ],
  "Zodiac mood": [
    { href: "/zodiac-compatibility", title: "Zodiac compatibility", reason: "Start with sign chemistry and friction." },
    { href: "/zodiac", title: "Zodiac hub", reason: "Browse sign-pair pages from one place." },
    { href: "/zodiac-compatibility-chart", title: "Zodiac chart", reason: "Use chart-style browsing for quick ideas." },
  ],
};

function sortTools(input: ToolItem[], sortMode: SortMode): ToolItem[] {
  const map = new Map(POPULAR_ORDER.map((path, index) => [path, index]));
  const withMeta = input.map((item) => {
    const vibe = TEST_VISUALS[item.path]?.vibe || "Playful";
    const popularity = map.has(item.path) ? map.get(item.path)! : 99;
    const quickScore = vibe === "Fun" || vibe === "Playful" ? 0 : 1;
    const deepScore = vibe === "Deep" || vibe === "Reflective" ? 0 : 1;
    return { item, popularity, quickScore, deepScore };
  });

  if (sortMode === "Quick") {
    return withMeta.sort((a, b) => a.quickScore - b.quickScore || a.popularity - b.popularity).map((row) => row.item);
  }

  if (sortMode === "Deep") {
    return withMeta.sort((a, b) => a.deepScore - b.deepScore || a.popularity - b.popularity).map((row) => row.item);
  }

  return withMeta.sort((a, b) => a.popularity - b.popularity).map((row) => row.item);
}

export function TestsExplorer({ tools }: { tools: ToolItem[] }) {
  const [vibe, setVibe] = useState<Vibe>("All");
  const [sortMode, setSortMode] = useState<SortMode>("Popular");
  const [goal, setGoal] = useState<Goal>("First score");
  const [query, setQuery] = useState("");

  const toolMap = useMemo(() => new Map(tools.map((tool) => [tool.path, tool])), [tools]);
  const sortedTools = useMemo(() => sortTools(tools, sortMode), [tools, sortMode]);
  const primaryTool = toolMap.get("/calculator");

  const visibleByPath = useMemo(() => {
    const visible = new Set<string>();
    const normalizedQuery = query.trim().toLowerCase();
    for (const tool of sortedTools) {
      const toolVibe = TEST_VISUALS[tool.path]?.vibe || "Playful";
      const matchesVibe = vibe === "All" || vibe === toolVibe;
      const matchesQuery =
        !normalizedQuery ||
        tool.h1.toLowerCase().includes(normalizedQuery) ||
        tool.description.toLowerCase().includes(normalizedQuery) ||
        tool.path.toLowerCase().includes(normalizedQuery) ||
        (TEST_VISUALS[tool.path]?.line || "").toLowerCase().includes(normalizedQuery);
      if (matchesVibe && matchesQuery) {
        visible.add(tool.path);
      }
    }
    return visible;
  }, [sortedTools, vibe, query]);

  const testsFaq = [
    {
      question: "Which test should I run first?",
      answer: "Start with the primary relationship test, then compare one additional angle.",
    },
    {
      question: "What does the score meaning actually tell me?",
      answer: "It highlights likely strengths, pressure points, and where your next conversation should start.",
    },
    {
      question: "How do I compare strengths and challenges across tests?",
      answer: "Look for repeated themes in communication style, conflict tone, and long-term rhythm.",
    },
    {
      question: "What if two tests disagree?",
      answer: "Treat disagreement as useful context and focus on the advice that appears in both results.",
    },
    {
      question: "How often should I check again?",
      answer: "After a real change in communication habits, a new check gives clearer insights.",
    },
    {
      question: "What next steps matter most after a low score?",
      answer: "Pick one practical communication shift and review progress after a week.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: testsFaq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "All Tests", item: absoluteUrl("/tests") },
    ],
  };

  return (
    <section className="mx-auto max-w-6xl space-y-7 px-4 py-8">
      <header className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.82fr]">
          <div className="bg-gradient-to-br from-white via-slate-50 to-blue-50 p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Test library</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-5xl">All compatibility tests</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700 md:text-base">
              Pick your situation, filter by vibe, and compare score meaning from more than one angle.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-bold text-slate-900">{tools.length}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Interactive tools</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">4</p>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Test paths</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">0</p>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Signup steps</p>
              </div>
            </div>
          </div>
          <aside className="border-t border-slate-200 bg-slate-950 p-6 text-white lg:border-l lg:border-t-0 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-sky-200">Recommended stack</p>
            <h2 className="mt-2 text-2xl font-semibold">Run 2 tests, not 10</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Start with one broad score, then use one contrast test. Repeated themes matter more than constant retesting.
            </p>
            <div className="mt-5 space-y-2">
              {["Main score", "One contrast angle", "Share or compare"].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-950">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <label className="grid gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Search tests</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="name, zodiac, crush, birthday..."
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-900"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Goal</span>
            <select
              value={goal}
              onChange={(event) => setGoal(event.target.value as Goal)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
            >
              <option>First score</option>
              <option>Crush check</option>
              <option>Serious relationship</option>
              <option>Zodiac mood</option>
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Sort</span>
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
            >
              <option>Popular</option>
              <option>Quick</option>
              <option>Deep</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["All", "Playful", "Fun", "Deep", "Reflective", "Cosmic"] as Vibe[]).map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setVibe(chip)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                vibe === chip ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Recommended for {goal}</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">Best next clicks</h2>
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {GOAL_RECS[goal].map((item) => (
            <Link
              key={`${goal}-${item.href}`}
              href={item.href}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
            >
              <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{item.reason}</p>
            </Link>
          ))}
        </div>
      </section>

      {primaryTool && visibleByPath.has(primaryTool.path) ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Primary Relationship Tool</h2>
          <p className="text-sm text-slate-700">Start here, then open one contrast test to compare strengths and challenges.</p>
          <article className={`rounded-3xl border p-5 shadow-[0_12px_30px_rgba(15,23,42,0.07)] ${TEST_VISUALS[primaryTool.path]?.frameClass}`}>
            <h3 className="text-xl font-semibold text-slate-900">{primaryTool.h1}</h3>
            <p className="mt-2 text-sm text-slate-700">{TEST_VISUALS[primaryTool.path]?.line || primaryTool.description}</p>
            <Link href={primaryTool.path} className="mt-4 inline-flex rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Open primary test
            </Link>
          </article>
        </section>
      ) : null}

      {GROUPS.map((group) => {
        const cards = sortTools(
          group.paths.map((path) => toolMap.get(path)).filter(Boolean) as ToolItem[],
          sortMode,
        ).filter((tool) => visibleByPath.has(tool.path));

        if (cards.length === 0) return null;

        return (
          <section key={group.title} className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">{group.title}</h2>
            <p className="text-sm text-slate-700">{group.intro}</p>
            <div className="grid gap-4 md:grid-cols-2">
              {cards.map((tool) => {
                const visual = TEST_VISUALS[tool.path];
                return (
                  <article
                    key={tool.path}
                    className={`rounded-3xl border p-5 shadow-[0_12px_30px_rgba(15,23,42,0.07)] ${visual?.frameClass || "border-slate-200 bg-white"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800">
                        {visual?.icon || "TS"}
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                        {visual?.vibe || "Playful"}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-slate-900">{tool.h1}</h3>
                    <p className="mt-2 text-sm text-slate-700">{visual?.line || tool.description}</p>
                    <Link href={tool.path} className="mt-4 inline-block rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                      Open test
                    </Link>
                  </article>
                );
              })}
            </div>
            <Link href={group.ctaHref} className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">
              {group.ctaLabel}
            </Link>
          </section>
        );
      })}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
        <h2 className="text-2xl font-semibold text-slate-900">Frequently asked questions</h2>
        <div className="mt-4 space-y-3">
          {testsFaq.map((faq) => (
            <details key={faq.question} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">{faq.question}</summary>
              <p className="mt-2 text-sm text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <InternalLinkCluster context={{ type: "hub", tags: ["tests", vibe.toLowerCase()] }} />

      <SeoJsonLd schema={faqSchema} />
      <SeoJsonLd schema={breadcrumbSchema} />
    </section>
  );
}
