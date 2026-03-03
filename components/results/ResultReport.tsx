"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { ShareBar } from "@/components/ShareBar";
import { trackEvent } from "@/lib/analytics";
import { rotateDeterministic } from "@/lib/results/engine";
import { buildSeed, seededInt } from "@/lib/results/seed";
import type { ResultReportData } from "@/lib/results/types";
import {
  getBullets,
  getMeaningLink,
  getMemeLine,
  getScoreBand,
  getShockLine,
  getSubscores,
  type ViralityContext,
} from "@/lib/virality-text";

interface ResultReportProps {
  report: ResultReportData;
  shareLink: string;
  className?: string;
  context?: ViralityContext;
  compareSecondaryOptional?: boolean;
  compareLabels?: { first: string; second: string };
  onCompareSubmit?: (first: string, second: string, preset?: "ex" | "bestfriend" | "custom") => Promise<void> | void;
}

function percentClass(score: number): string {
  if (score >= 75) return "bg-emerald-500";
  if (score >= 55) return "bg-amber-500";
  return "bg-rose-500";
}

function bandStyle(score: number): string {
  if (score >= 90) return "border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-teal-50";
  if (score >= 70) return "border-teal-300 bg-gradient-to-br from-teal-50 via-white to-cyan-50";
  if (score >= 50) return "border-amber-300 bg-gradient-to-br from-amber-50 via-white to-yellow-50";
  if (score >= 30) return "border-orange-300 bg-gradient-to-br from-orange-50 via-white to-amber-50";
  return "border-rose-300 bg-gradient-to-br from-rose-50 via-white to-orange-50";
}

function toFaqSchema(report: ResultReportData) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: report.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function ResultReport({
  report,
  shareLink,
  className,
  context = "general",
  compareSecondaryOptional = false,
  compareLabels = { first: "Person one", second: "Person two" },
  onCompareSubmit,
}: ResultReportProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [ideaStep, setIdeaStep] = useState(0);
  const [starterStep, setStarterStep] = useState(0);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareFirst, setCompareFirst] = useState(report.input.primary || "");
  const [compareSecond, setCompareSecond] = useState(report.input.secondary || "");
  const [isComparing, setIsComparing] = useState(false);

  const seed = useMemo(
    () => buildSeed([report.testKey, report.input.primary, report.input.secondary]),
    [report.input.primary, report.input.secondary, report.testKey],
  );
  const pairLabel = useMemo(
    () => `${report.input.primary}${report.input.secondary ? ` + ${report.input.secondary}` : ""}`,
    [report.input.primary, report.input.secondary],
  );
  const scoreBand = useMemo(() => getScoreBand(report.header.score), [report.header.score]);
  const shockLine = useMemo(
    () => getShockLine({ score: report.header.score, context, seed }),
    [report.header.score, context, seed],
  );
  const memeLine = useMemo(
    () => getMemeLine({ score: report.header.score, context, seed }),
    [report.header.score, context, seed],
  );
  const meaningBullets = useMemo(
    () => getBullets({ score: report.header.score, context, seed }),
    [report.header.score, context, seed],
  );
  const subScores = useMemo(() => getSubscores({ score: report.header.score, seed }), [report.header.score, seed]);
  const meaningHref = useMemo(() => getMeaningLink(report.header.score, context), [report.header.score, context]);
  const rotatedIdeas = useMemo(
    () => rotateDeterministic(report.dateIdeas, seed + 201, ideaStep),
    [report.dateIdeas, seed, ideaStep],
  );
  const rotatedStarters = useMemo(
    () => rotateDeterministic(report.conversationStarters, seed + 301, starterStep),
    [report.conversationStarters, seed, starterStep],
  );
  const pickedStarter = useMemo(() => {
    if (rotatedStarters.length === 0) return "";
    const index = seededInt(seed + 401, 0, rotatedStarters.length - 1, starterStep + 1);
    return rotatedStarters[index];
  }, [rotatedStarters, seed, starterStep]);
  const faqSchema = useMemo(() => toFaqSchema(report), [report]);

  async function submitCompare(event?: FormEvent<HTMLFormElement>, preset: "custom" | "ex" | "bestfriend" = "custom") {
    event?.preventDefault();
    const first = compareFirst.trim();
    const second = compareSecond.trim();
    if (!first) return;
    if (!compareSecondaryOptional && !second) return;

    setIsComparing(true);
    trackEvent("compare_submit", { test: report.testKey, preset });

    try {
      if (onCompareSubmit) {
        await onCompareSubmit(first, second, preset);
      } else {
        const params = new URLSearchParams();
        params.set("a", first);
        if (second) params.set("b", second);
        router.push(`${pathname}?${params.toString()}`);
      }
    } finally {
      setIsComparing(false);
    }
  }

  function openCompareWithPreset(preset: "ex" | "bestfriend") {
    setCompareOpen(true);
    trackEvent("compare_open", { test: report.testKey, preset });
    if (preset === "ex") {
      setCompareSecond("ex");
    } else {
      setCompareSecond("best friend");
    }
  }

  return (
    <section className={`mt-5 space-y-4 rounded-2xl border border-slate-200 bg-white p-4 ${className || ""}`}>
      <section className={`relative overflow-hidden rounded-2xl border p-4 ${bandStyle(report.header.score)}`}>
        {report.header.score >= 90 ? (
          <div className="pointer-events-none absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <span
                key={i}
                className="absolute h-2 w-2 rounded-full bg-emerald-300/80 animate-pulse"
                style={{
                  left: `${(i * 9 + 8) % 90}%`,
                  top: `${(i * 13 + 7) % 80}%`,
                  animationDelay: `${i * 90}ms`,
                }}
              />
            ))}
          </div>
        ) : null}

        <p className="inline-flex rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
          {scoreBand.label}
        </p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">{report.header.title}</h2>
        <div className="mt-3 flex items-end gap-3">
          <p className="text-5xl font-bold text-slate-900">{report.header.score}</p>
          <p className="pb-2 text-sm font-semibold text-slate-600">/100</p>
        </div>
        <p className="mt-2 text-sm font-semibold text-slate-900">{shockLine}</p>

        <div className="mt-4 grid gap-2 md:grid-cols-3">
          <article className="rounded-xl border border-white/80 bg-white/80 p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Passion</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{subScores.passion}</p>
          </article>
          <article className="rounded-xl border border-white/80 bg-white/80 p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Communication</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{subScores.communication}</p>
          </article>
          <article className="rounded-xl border border-white/80 bg-white/80 p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Long-term</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{subScores.longTerm}</p>
          </article>
        </div>

        <section className="mt-4 rounded-xl border border-white/80 bg-white/80 p-3">
          <h3 className="text-sm font-semibold text-slate-900">Meaning</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {meaningBullets.slice(0, 5).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <p className="mt-3 text-sm italic text-slate-700">{memeLine}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setCompareOpen(true);
              trackEvent("compare_open", { test: report.testKey, preset: "custom" });
            }}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Compare with someone else
          </button>
          <button
            type="button"
            onClick={() => openCompareWithPreset("ex")}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Try with your ex
          </button>
          <button
            type="button"
            onClick={() => {
              document.getElementById("share-score-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Share your score
          </button>
        </div>
      </section>

      {compareOpen ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold text-slate-900">Compare now</h3>
          <form className="mt-3 grid gap-3 md:grid-cols-2" onSubmit={(event) => void submitCompare(event)}>
            <label className="grid gap-1">
              <span className="text-sm font-medium text-slate-700">{compareLabels.first}</span>
              <input
                value={compareFirst}
                onChange={(e) => setCompareFirst(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
                placeholder="Name or sign"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-medium text-slate-700">{compareLabels.second}</span>
              <input
                value={compareSecond}
                onChange={(e) => setCompareSecond(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
                placeholder="Name or sign"
              />
            </label>
            <div className="md:col-span-2 flex flex-wrap gap-2">
              <button type="submit" disabled={isComparing} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                {isComparing ? "Comparing..." : "Run compare"}
              </button>
              <button
                type="button"
                onClick={() => void submitCompare(undefined, "ex")}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800"
              >
                Submit as ex mode
              </button>
              <button
                type="button"
                onClick={() => {
                  setCompareSecond("best friend");
                  void submitCompare(undefined, "bestfriend");
                }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800"
              >
                Try with best friend
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-base font-semibold text-slate-900">Score Breakdown</h3>
        <div className="mt-3 space-y-3">
          {report.breakdown.map((item) => (
            <article key={item.key}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                <p className="text-sm font-semibold text-slate-700">{item.score}</p>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-2 ${percentClass(item.score)}`} style={{ width: `${item.score}%` }} />
              </div>
              <p className="mt-1 text-xs text-slate-600">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-base font-semibold text-slate-900">Story Snapshot</h3>
        <div className="mt-3 space-y-2">
          {report.story.map((line) => (
            <p key={line} className="text-sm leading-6 text-slate-700">
              {line}
            </p>
          ))}
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold text-slate-900">Strengths</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {report.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold text-slate-900">Watch-outs</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {report.watchouts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold text-slate-900">Tiny Tips</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {report.tips.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-base font-semibold text-slate-900">Fun Stuff</h3>
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-900">Date Ideas</h4>
            <button
              type="button"
              onClick={() => setIdeaStep((prev) => prev + 1)}
              className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Shuffle
            </button>
          </div>
          <div className="mt-2 grid gap-2 md:grid-cols-3">
            {rotatedIdeas.slice(0, 6).map((item) => (
              <article key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                {item}
              </article>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-900">Conversation Starters</h4>
            <button
              type="button"
              onClick={() => setStarterStep((prev) => prev + 1)}
              className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Pick one
            </button>
          </div>
          <p className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-900">
            {pickedStarter}
          </p>
        </div>
      </section>

      <div id="share-score-card">
        <ShareBar title={report.header.title} score={report.header.score} shockLine={shockLine} shareUrl={shareLink} pairLabel={pairLabel} />
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-base font-semibold text-slate-900">What does this score mean?</h3>
        <p className="mt-1 text-sm text-slate-700">Read the score guide and grab the next steps for this band.</p>
        <Link
          href={meaningHref}
          onClick={() => trackEvent("meaning_click", { score: report.header.score, test: report.testKey })}
          className="mt-3 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Open meaning guide
        </Link>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-base font-semibold text-slate-900">FAQ</h3>
        <div className="mt-3 space-y-2">
          {report.faq.map((item) => (
            <details key={item.question} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">{item.question}</summary>
              <p className="mt-2 text-sm text-slate-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-base font-semibold text-slate-900">Try Also</h3>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          <Link href="/tests" className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-900 hover:bg-slate-100">
            Open all tests
          </Link>
          <Link href="/zodiac" className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-900 hover:bg-slate-100">
            Explore zodiac hub
          </Link>
          <Link href="/blog" className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-900 hover:bg-slate-100">
            Read score guides
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </section>
  );
}
