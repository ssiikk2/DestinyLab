"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { rotateDeterministic } from "@/lib/results/engine";
import { buildSeed, seededInt } from "@/lib/results/seed";
import type { ResultReportData } from "@/lib/results/types";

interface ResultReportProps {
  report: ResultReportData;
  shareLink: string;
  className?: string;
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

export function ResultReport({ report, shareLink, className }: ResultReportProps) {
  const [ideaStep, setIdeaStep] = useState(0);
  const [starterStep, setStarterStep] = useState(0);
  const [copied, setCopied] = useState<string>("");

  const seed = useMemo(
    () => buildSeed([report.testKey, report.input.primary, report.input.secondary]),
    [report.input.primary, report.input.secondary, report.testKey],
  );
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
  const copyText = useMemo(
    () =>
      [
        `${report.header.title} (${report.header.score}/100 · ${report.header.grade})`,
        report.header.summary,
        `Top strengths: ${report.strengths.join("; ")}`,
        `Watch-outs: ${report.watchouts.join("; ")}`,
        `Tiny tips: ${report.tips.join("; ")}`,
      ].join("\n"),
    [report],
  );

  async function copy(value: string, kind: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setTimeout(() => setCopied(""), 1500);
    } catch {
      setCopied("");
    }
  }

  return (
    <section className={`mt-5 space-y-4 rounded-2xl border border-slate-200 bg-white p-4 ${className || ""}`}>
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="inline-flex rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
          {report.header.badge}
        </p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">{report.header.title}</h2>
        <p className="mt-1 text-sm text-slate-700">{report.header.summary}</p>
        <div className="mt-3 flex items-end gap-3">
          <p className="text-3xl font-bold text-slate-900">{report.header.score}</p>
          <p className="pb-1 text-sm font-semibold text-slate-600">/100 · Grade {report.header.grade}</p>
        </div>
        <p className="mt-2 text-sm italic text-slate-700">{report.header.catchphrase}</p>
      </section>

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
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {rotatedStarters.map((item) => (
              <p key={item} className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-base font-semibold text-slate-900">Share</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void copy(copyText, "text")}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Copy Result
          </button>
          <button
            type="button"
            onClick={() => void copy(shareLink, "link")}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Copy Link
          </button>
          {copied ? <p className="self-center text-xs font-semibold text-emerald-700">Copied {copied}</p> : null}
        </div>
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
            Read blog stories
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
