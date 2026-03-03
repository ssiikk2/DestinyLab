"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ShareBar } from "@/components/ShareBar";
import { ViralResultOverlay } from "@/components/ViralResultOverlay";
import { trackEvent } from "@/lib/analytics";
import { rotateDeterministic } from "@/lib/results/engine";
import { buildSeed, seededInt } from "@/lib/results/seed";
import type { ResultReportData } from "@/lib/results/types";
import {
  getBand,
  getMemeLine,
  getMiniStats,
  getShockLine,
  type ViralContext,
} from "@/lib/viral-engine";
import {
  getBullets,
  getMeaningLink,
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
  const [memeUpgrade, setMemeUpgrade] = useState<null | {
    shockLine: string;
    memeLine: string;
    miniStory: string;
    shareCta: string;
    compareCta: string;
  }>(null);
  const [isMemeLoading, setIsMemeLoading] = useState(false);

  const seed = useMemo(
    () => buildSeed([report.testKey, report.input.primary, report.input.secondary]),
    [report.input.primary, report.input.secondary, report.testKey],
  );
  const viralCtx: ViralContext = useMemo(
    () => ({
      testId: report.testKey,
      a: report.input.primary,
      b: report.input.secondary,
      seed: `${seed}`,
    }),
    [report.testKey, report.input.primary, report.input.secondary, seed],
  );
  const pairLabel = useMemo(
    () => `${report.input.primary}${report.input.secondary ? ` + ${report.input.secondary}` : ""}`,
    [report.input.primary, report.input.secondary],
  );
  const scoreBand = useMemo(() => getBand(report.header.score), [report.header.score]);
  const shockLine = useMemo(() => getShockLine(report.header.score, viralCtx), [report.header.score, viralCtx]);
  const memeLine = useMemo(() => getMemeLine(report.header.score, viralCtx), [report.header.score, viralCtx]);
  const meaningBullets = useMemo(
    () => getBullets({ score: report.header.score, context, seed }),
    [report.header.score, context, seed],
  );
  const subScores = useMemo(() => getMiniStats(report.header.score, viralCtx), [report.header.score, viralCtx]);
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
    setMemeUpgrade(null);

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

  useEffect(() => {
    let disposed = false;
    setIsMemeLoading(true);
    void (async () => {
      try {
        const response = await fetch("/api/meme", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            testId: report.testKey,
            tone: "playful",
            inputs: {
              a: report.input.primary,
              b: report.input.secondary,
              focus: context,
            },
            baseResult: {
              score: report.header.score,
              grade: report.header.grade,
              topStrengths: report.strengths.slice(0, 2),
              topWatchouts: report.watchouts.slice(0, 2),
              breakdown: report.breakdown.map((item) => ({ label: item.label, value: item.score })).slice(0, 3),
            },
          }),
        });
        const json = (await response.json()) as {
          shockLine?: string;
          memeLine?: string;
          miniStory?: string;
          shareCta?: string;
          compareCta?: string;
        };
        if (!disposed && response.ok && json.shockLine && json.memeLine && json.miniStory && json.shareCta && json.compareCta) {
          setMemeUpgrade({
            shockLine: json.shockLine,
            memeLine: json.memeLine,
            miniStory: json.miniStory,
            shareCta: json.shareCta,
            compareCta: json.compareCta,
          });
        }
      } catch {
        // keep stage A
      } finally {
        if (!disposed) setIsMemeLoading(false);
      }
    })();

    return () => {
      disposed = true;
    };
  }, [
    report.testKey,
    report.header.score,
    report.header.grade,
    report.input.primary,
    report.input.secondary,
    report.strengths,
    report.watchouts,
    report.breakdown,
    context,
  ]);

  return (
    <section className={`mt-5 space-y-4 rounded-2xl border border-slate-200 bg-white p-4 ${className || ""}`}>
      <ViralResultOverlay
        score={report.header.score}
        label={scoreBand.label}
        shockLine={memeUpgrade?.shockLine || shockLine}
        memeLine={memeUpgrade?.memeLine || memeLine}
        miniStory={memeUpgrade?.miniStory}
        miniStats={subScores}
        onCompare={() => {
          setCompareOpen(true);
          trackEvent("compare_open", { test: report.testKey, preset: "custom" });
        }}
        onTryEx={() => openCompareWithPreset("ex")}
        onShare={() => {
          document.getElementById("share-score-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
        shareLabel={memeUpgrade?.shareCta || "Share your score"}
        compareLabel={memeUpgrade?.compareCta || "Compare with someone else"}
        isUpgrading={isMemeLoading}
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-base font-semibold text-slate-900">Meaning</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {meaningBullets.slice(0, 5).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
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
        <ShareBar
          title={report.header.title}
          score={report.header.score}
          shockLine={memeUpgrade?.shockLine || shockLine}
          shareUrl={shareLink}
          pairLabel={pairLabel}
        />
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
