"use client";

import { FormEvent, useMemo, useState } from "react";
import { getModeTheme, type CalculatorMode } from "@/lib/test-themes";

export type { CalculatorMode };

interface CalculatorHookProps {
  mode: CalculatorMode;
}

interface CalculationResult {
  score: number;
  summary: string;
  pros: string[];
  challenges: string[];
  tips: string[];
}

function normalizeValue(input: string): string {
  return input.trim().toLowerCase();
}

function hashValue(value: string): number {
  return value.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function buildResult(mode: CalculatorMode, first: string, second: string): CalculationResult {
  const seed = hashValue(`${mode}:${normalizeValue(first)}:${normalizeValue(second)}`);
  const score = 54 + (seed % 43);

  const summary =
    score >= 80
      ? "Strong rhythm with high day-to-day potential."
      : score >= 68
        ? "Balanced match with a few stress points to manage."
        : "Mixed rhythm that benefits from clear structure and patience.";

  return {
    score,
    summary,
    pros: [
      "Shared momentum when goals are clear",
      "Good upside for direct communication",
      "Stable progress through short weekly check-ins",
    ],
    challenges: [
      "Timing differences during stressful weeks",
      "Quick assumptions when messages are unclear",
      "Avoiding hard topics for too long",
    ],
    tips: [
      "Set one 10-minute review each week",
      "Use one sentence requests during conflict",
      "Track one habit change for 30 days",
    ],
  };
}

function getLabels(mode: CalculatorMode) {
  if (mode === "destiny") {
    return {
      heading: "Destiny Calculator",
      firstLabel: "Birth date",
      secondLabel: "Focus word (optional)",
      firstPlaceholder: "1998-07-17",
      secondPlaceholder: "relationship, career, or growth",
    };
  }

  if (mode === "name") {
    return {
      heading: "Name Compatibility Calculator",
      firstLabel: "Name one",
      secondLabel: "Name two",
      firstPlaceholder: "Taylor",
      secondPlaceholder: "Jordan",
    };
  }

  if (mode === "initials") {
    return {
      heading: "Initials Compatibility Test",
      firstLabel: "Initials one",
      secondLabel: "Initials two",
      firstPlaceholder: "A.K.",
      secondPlaceholder: "J.S.",
    };
  }

  if (mode === "crush") {
    return {
      heading: "Crush Compatibility Test",
      firstLabel: "Your name",
      secondLabel: "Crush name",
      firstPlaceholder: "Alex",
      secondPlaceholder: "Jamie",
    };
  }

  if (mode === "friendship") {
    return {
      heading: "Friendship Compatibility Test",
      firstLabel: "Friend one",
      secondLabel: "Friend two",
      firstPlaceholder: "Taylor",
      secondPlaceholder: "Morgan",
    };
  }

  if (mode === "zodiac") {
    return {
      heading: "Zodiac Compatibility Calculator",
      firstLabel: "Sign one",
      secondLabel: "Sign two",
      firstPlaceholder: "Aries",
      secondPlaceholder: "Scorpio",
    };
  }

  if (mode === "birthday") {
    return {
      heading: "Birthday Compatibility Calculator",
      firstLabel: "Birthday one",
      secondLabel: "Birthday two",
      firstPlaceholder: "1995-03-21",
      secondPlaceholder: "1997-10-11",
    };
  }

  return {
    heading: "Love Compatibility Calculator",
    firstLabel: "Person one",
    secondLabel: "Person two",
    firstPlaceholder: "Name, initials, or birthday",
    secondPlaceholder: "Name, initials, or birthday",
  };
}

export function CalculatorHook({ mode }: CalculatorHookProps) {
  const labels = useMemo(() => getLabels(mode), [mode]);
  const theme = useMemo(() => getModeTheme(mode), [mode]);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const safeSecond = mode === "destiny" ? second || "reflection" : second;

    setResult(buildResult(mode, first, safeSecond));
  }

  return (
    <section
      className={`rounded-3xl border ${theme.cardBorderClass} bg-white/90 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm`}
    >
      <p className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme.pillClass}`}>
        {theme.label} test
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900">{labels.heading}</h2>
      <p className="mt-2 text-sm text-slate-700">
        This calculator estimates relationship rhythm and communication flow.
      </p>

      <form onSubmit={onSubmit} className="mt-4 grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm font-medium text-slate-800">{labels.firstLabel}</span>
          <input
            required
            value={first}
            onChange={(event) => setFirst(event.target.value)}
            placeholder={labels.firstPlaceholder}
            className={`rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition ${theme.inputFocusClass}`}
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-slate-800">{labels.secondLabel}</span>
          <input
            required={mode !== "destiny"}
            value={second}
            onChange={(event) => setSecond(event.target.value)}
            placeholder={labels.secondPlaceholder}
            className={`rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition ${theme.inputFocusClass}`}
          />
        </label>

        <button
          type="submit"
          className={`mt-1 rounded-xl px-4 py-2 text-sm font-semibold transition ${theme.buttonClass} ${theme.buttonHoverClass}`}
        >
          Calculate score
        </button>
      </form>

      {result ? (
        <div className={`mt-5 space-y-4 rounded-2xl border p-4 ${theme.resultClass}`}>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Result</h3>
            <p className="mt-1 text-sm text-slate-700">
              Score: <strong>{result.score}/100</strong>. {result.summary}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">Breakdown</h3>
            <p className="mt-1 text-sm text-slate-700">
              Focus on emotional timing, communication clarity, and consistency in follow-through.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">Pros</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {result.pros.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">Challenges</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {result.challenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">Tips</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {result.tips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
