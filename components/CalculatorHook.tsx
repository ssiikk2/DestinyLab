"use client";

import { FormEvent, useMemo, useState } from "react";
import { ResultLayout } from "@/components/ResultLayout";
import { getModeTheme, type CalculatorMode } from "@/lib/test-themes";

export type { CalculatorMode };

interface CalculatorHookProps {
  mode: CalculatorMode;
  variantKey?: string;
  titleOverride?: string;
}

interface CalculationResult {
  score: number;
  title: string;
  summary: string;
  strengths: string[];
  watchouts: string[];
  tips: string[];
  faq: Array<{ question: string; answer: string }>;
  tryAlso: Array<{ href: string; note: string }>;
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

export function CalculatorHook({ mode, variantKey, titleOverride }: CalculatorHookProps) {
  const labels = useMemo(() => {
    const base = getLabels(mode);
    return titleOverride ? { ...base, heading: titleOverride } : base;
  }, [mode, titleOverride]);
  const theme = useMemo(() => getModeTheme(mode), [mode]);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    const safeSecond = mode === "destiny" ? second || "reflection" : second;

    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          first,
          second: safeSecond,
          variantKey,
        }),
      });

      const json = (await response.json()) as (CalculationResult & { error?: string });

      if (
        !response.ok ||
        typeof json.score !== "number" ||
        typeof json.title !== "string" ||
        typeof json.summary !== "string" ||
        !Array.isArray(json.strengths) ||
        !Array.isArray(json.watchouts) ||
        !Array.isArray(json.tips) ||
        !Array.isArray(json.faq) ||
        !Array.isArray(json.tryAlso)
      ) {
        throw new Error(json.error || "Could not calculate right now.");
      }

      setResult(json);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unexpected error while getting your result.",
      );
    } finally {
      setIsLoading(false);
    }
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
        Pop in your details and get a playful compatibility snapshot.
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
          disabled={isLoading}
          className={`mt-1 rounded-xl px-4 py-2 text-sm font-semibold transition ${theme.buttonClass} ${theme.buttonHoverClass}`}
        >
          {isLoading ? "Getting your result..." : "Show my result"}
        </button>
        {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
      </form>

      {result ? (
        <ResultLayout
          mode={mode}
          score={result.score}
          title={result.title}
          summary={result.summary}
          strengths={result.strengths}
          watchouts={result.watchouts}
          tips={result.tips}
          faq={result.faq}
          tryAlso={result.tryAlso}
          resultClassName={theme.resultClass}
        />
      ) : null}
    </section>
  );
}
