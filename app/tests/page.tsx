import type { Metadata } from "next";
import Link from "next/link";
import { landingPages } from "@/content/landing-pages";
import { buildMetadata } from "@/lib/seo";
import { getModeTheme } from "@/lib/test-themes";

export const metadata: Metadata = buildMetadata({
  title: "All Compatibility Tests",
  description: "Pick a test by mood and jump into your favorite style.",
  path: "/tests",
});

export const revalidate = 86400;
export const dynamic = "force-static";

interface TestVisual {
  icon: string;
  vibe: string;
  line: string;
  frameClass: string;
}

const TEST_VISUALS: Record<string, TestVisual> = {
  "/calculator": {
    icon: "PR",
    vibe: "Playful + Deep",
    line: "Your main match read with the full picture, not just a quick spark.",
    frameClass: "md:col-span-2 border-slate-300 bg-gradient-to-br from-white via-rose-50 to-sky-50",
  },
  "/name-compatibility": {
    icon: "NM",
    vibe: "Playful",
    line: "Name energy, first-impression chemistry, and a little flirty logic.",
    frameClass: "border-sky-200 bg-sky-50/70",
  },
  "/initials-love-test": {
    icon: "IN",
    vibe: "Fun",
    line: "Short, snappy, and perfect when you want a fast smile.",
    frameClass: "border-emerald-200 bg-emerald-50/70",
  },
  "/zodiac-compatibility": {
    icon: "ZG",
    vibe: "Cosmic",
    line: "Sign chemistry with real-world moments that actually feel familiar.",
    frameClass: "border-teal-200 bg-teal-50/70",
  },
  "/birthday-compatibility": {
    icon: "BD",
    vibe: "Reflective",
    line: "Timing, rhythm, and why your day-to-day pace matters so much.",
    frameClass: "border-orange-200 bg-orange-50/70",
  },
  "/destiny": {
    icon: "DS",
    vibe: "Reflective",
    line: "A solo snapshot for your relationship style when you need clarity.",
    frameClass: "border-indigo-200 bg-indigo-50/70",
  },
  "/love-percentage": {
    icon: "LP",
    vibe: "Fun",
    line: "The quick chaos button for instant spark-check energy.",
    frameClass: "border-rose-200 bg-rose-50/70",
  },
  "/true-love-test": {
    icon: "TL",
    vibe: "Deep",
    line: "Late-night honest mode: trust, effort, and what lasts under pressure.",
    frameClass: "border-fuchsia-200 bg-fuchsia-50/70",
  },
  "/couple-test": {
    icon: "CP",
    vibe: "Playful",
    line: "A shared game vibe: compare habits, laugh, then pick one next move.",
    frameClass: "border-violet-200 bg-violet-50/70",
  },
  "/crush-calculator": {
    icon: "CR",
    vibe: "Fun",
    line: "For the crush spiral moment when you want answers fast.",
    frameClass: "border-pink-200 bg-pink-50/70",
  },
  "/friendship-compatibility": {
    icon: "FR",
    vibe: "Playful",
    line: "Bestie chemistry check for trust, banter, and low-drama vibes.",
    frameClass: "border-amber-200 bg-amber-50/70",
  },
};

const GROUPS = [
  {
    title: "Name-Based Tests",
    intro: "Letter energy, name chemistry, and quick social reads.",
    paths: ["/name-compatibility", "/initials-love-test"],
  },
  {
    title: "Zodiac-Based Tests",
    intro: "Sign stories and cosmic chemistry.",
    paths: ["/zodiac-compatibility"],
  },
  {
    title: "Birth-Date Tests",
    intro: "Timing and personality rhythm from date-based reads.",
    paths: ["/birthday-compatibility", "/destiny"],
  },
  {
    title: "Fun Relationship Games",
    intro: "Light and social tests you can share in seconds.",
    paths: ["/love-percentage", "/true-love-test", "/couple-test", "/crush-calculator", "/friendship-compatibility"],
  },
] as const;

function renderCard(tool: (typeof landingPages)[number]) {
  const theme = getModeTheme(tool.calculatorMode || "love");
  const visual = TEST_VISUALS[tool.path];

  return (
    <article
      key={tool.path}
      className={`rounded-3xl border p-5 shadow-[0_12px_30px_rgba(15,23,42,0.07)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(15,23,42,0.12)] ${visual?.frameClass || "border-slate-200 bg-white"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800">
          {visual?.icon || "TS"}
        </span>
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme.pillClass}`}>
          {theme.label}
        </span>
      </div>
      <h3 className="mt-3 text-xl font-semibold text-slate-900">{tool.h1}</h3>
      <p className="mt-2 text-sm text-slate-700">{visual?.line || tool.description}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">
        What kind of vibe? {visual?.vibe || "Playful"}
      </p>
      <Link
        href={tool.path}
        className={`mt-4 inline-block rounded-xl px-4 py-2 text-sm font-semibold transition ${theme.buttonClass} ${theme.buttonHoverClass}`}
      >
        Open test
      </Link>
    </article>
  );
}

export default function TestsHubPage() {
  const tools = landingPages.filter((page) => page.calculatorMode);
  const toolMap = new Map(tools.map((tool) => [tool.path, tool]));
  const primaryTool = toolMap.get("/calculator");

  return (
    <section className="mx-auto max-w-5xl space-y-7 px-4 py-8">
      <header className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">All compatibility tests</h1>
        <p className="mt-2 text-sm text-slate-700 md:text-base">
          Pick your vibe, run the test, and compare the story from different angles.
        </p>
      </header>

      {primaryTool ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Primary Love Compatibility Tool</h2>
          <p className="text-sm text-slate-700">Start here first. Then open one more test below for contrast.</p>
          <div className="grid gap-4 md:grid-cols-2">{renderCard(primaryTool)}</div>
          <Link
            href="/calculator"
            className="inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Run primary tool now
          </Link>
        </section>
      ) : null}

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Zodiac Hub</h2>
        <p className="mt-1 text-sm text-slate-700">
          Want sign-by-sign exploring? Open the hub and pick any two signs.
        </p>
        <Link href="/zodiac" className="mt-3 inline-block text-sm font-semibold text-slate-900 underline">
          Open Zodiac Hub
        </Link>
      </section>

      {GROUPS.map((group) => {
        const cards = group.paths
          .map((path) => toolMap.get(path))
          .filter(Boolean) as (typeof tools)[number][];

        if (cards.length === 0) {
          return null;
        }

        return (
          <section key={group.title} className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">{group.title}</h2>
            <p className="text-sm text-slate-700">{group.intro}</p>
            <div className="grid gap-4 md:grid-cols-2">{cards.map(renderCard)}</div>
          </section>
        );
      })}
    </section>
  );
}
