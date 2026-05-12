"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ResultReport } from "@/components/results/ResultReport";
import { trackEvent } from "@/lib/analytics";
import { buildResultReport } from "@/lib/results/engine";
import { resolveResultTestKey } from "@/lib/results/resolve";
import type { BaseResultOutput } from "@/lib/results/types";
import { getModeTheme, type CalculatorMode } from "@/lib/test-themes";
import type { ViralityContext } from "@/lib/virality-text";

export type { CalculatorMode };

interface CalculatorHookProps {
  mode: CalculatorMode;
  variantKey?: string;
  titleOverride?: string;
}

interface CalculationResult extends BaseResultOutput {
  score: number;
  title: string;
  summary: string;
  strengths: string[];
  watchouts: string[];
  tips: string[];
  faq: Array<{ question: string; answer: string }>;
  tryAlso: Array<{ href: string; note: string }>;
}

function fromBase64(value: string): string {
  if (typeof window === "undefined") return "";
  const binary = window.atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function decodeResultSnapshot(value: string): CalculationResult | null {
  try {
    const parsed = JSON.parse(fromBase64(value)) as CalculationResult;
    if (typeof parsed.score !== "number" || typeof parsed.title !== "string") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
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

function getExamplePairs(mode: CalculatorMode): Array<{ first: string; second: string; label: string }> {
  if (mode === "zodiac") {
    return [
      { first: "Aries", second: "Scorpio", label: "Aries + Scorpio" },
      { first: "Taurus", second: "Libra", label: "Taurus + Libra" },
      { first: "Cancer", second: "Pisces", label: "Cancer + Pisces" },
    ];
  }

  if (mode === "birthday") {
    return [
      { first: "1995-03-21", second: "1997-10-11", label: "Spring + Fall" },
      { first: "1998-07-17", second: "1999-02-04", label: "Summer + Winter" },
      { first: "2000-12-01", second: "2001-06-14", label: "Late year + Mid year" },
    ];
  }

  if (mode === "destiny") {
    return [
      { first: "1998-07-17", second: "relationship", label: "Love focus" },
      { first: "1995-03-21", second: "growth", label: "Growth focus" },
      { first: "2000-12-01", second: "career", label: "Career focus" },
    ];
  }

  if (mode === "initials") {
    return [
      { first: "A.K.", second: "J.S.", label: "A.K. + J.S." },
      { first: "M.R.", second: "T.L.", label: "M.R. + T.L." },
      { first: "S.P.", second: "C.N.", label: "S.P. + C.N." },
    ];
  }

  return [
    { first: "Alex", second: "Jamie", label: "Alex + Jamie" },
    { first: "Taylor", second: "Jordan", label: "Taylor + Jordan" },
    { first: "Mia", second: "Noah", label: "Mia + Noah" },
  ];
}

export function CalculatorHook({ mode, variantKey, titleOverride }: CalculatorHookProps) {
  const labels = useMemo(() => {
    const base = getLabels(mode);
    return titleOverride ? { ...base, heading: titleOverride } : base;
  }, [mode, titleOverride]);
  const theme = useMemo(() => getModeTheme(mode), [mode]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const autoRanRef = useRef(false);
  const testKey = useMemo(() => resolveResultTestKey({ mode, variantKey }), [mode, variantKey]);
  const examplePairs = useMemo(() => getExamplePairs(mode), [mode]);

  const runCalculation = useCallback(
    async (firstValue: string, secondValue: string) => {
      const safeSecond = mode === "destiny" ? secondValue || "reflection" : secondValue;
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          first: firstValue,
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
        !Array.isArray(json.faq)
      ) {
        throw new Error(json.error || "Could not calculate right now.");
      }

      return json;
    },
    [mode, variantKey],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    trackEvent("calculator_submit", { mode, path: pathname || "", has_second: Boolean(second.trim()) });

    try {
      const computed = await runCalculation(first, second);
      setResult(computed);
      trackEvent("calculator_success", { mode, path: pathname || "", score: computed.score });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unexpected error while getting your result.",
      );
      trackEvent("calculator_error", { mode, path: pathname || "" });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (autoRanRef.current) return;
    autoRanRef.current = true;

    const modeParam = searchParams.get("m");
    if (modeParam && modeParam !== mode) {
      return;
    }

    const firstParam = searchParams.get("a") || "";
    const secondParam = searchParams.get("b") || "";
    const resultParam = searchParams.get("r");

    if (firstParam) setFirst(firstParam);
    if (secondParam) setSecond(secondParam);

    if (resultParam) {
      const decoded = decodeResultSnapshot(resultParam);
      if (decoded) {
        setResult(decoded);
        return;
      }
    }

    if (firstParam && (mode === "destiny" || secondParam)) {
      setIsLoading(true);
      void runCalculation(firstParam, secondParam)
        .then((computed) => setResult(computed))
        .catch((err) =>
          setError(err instanceof Error ? err.message : "Unexpected error while getting your result."),
        )
        .finally(() => setIsLoading(false));
    }
  }, [mode, runCalculation, searchParams]);

  const report = useMemo(() => {
    if (!result) return null;
    return buildResultReport({
      testKey,
      userInput: {
        testKey,
        primary: first,
        secondary: second,
      },
      base: result,
    });
  }, [result, testKey, first, second]);

  const resultQuery = useMemo(() => {
    if (!result) return "";
    const params = new URLSearchParams();
    params.set("m", mode);
    params.set("a", first);
    if (mode !== "destiny") params.set("b", second);
    if (variantKey) params.set("v", variantKey);
    return params.toString();
  }, [result, mode, first, second, variantKey]);

  const shareLink = useMemo(() => {
    if (!resultQuery || !pathname) return "";
    if (typeof window !== "undefined") {
      return `${window.location.origin}${pathname}?${resultQuery}`;
    }
    return `${pathname}?${resultQuery}`;
  }, [resultQuery, pathname]);

  const viralityContext: ViralityContext = useMemo(() => {
    if (mode === "zodiac") return "zodiac";
    if (mode === "destiny") return "destiny";
    if (mode === "love") return "love";
    return "compatibility";
  }, [mode]);

  const compareLabels = useMemo(() => {
    if (mode === "zodiac") return { first: "Sign one", second: "Sign two" };
    if (mode === "destiny") return { first: "Birth date", second: "Focus word (optional)" };
    if (mode === "name") return { first: "Name one", second: "Name two" };
    return { first: labels.firstLabel, second: labels.secondLabel };
  }, [mode, labels.firstLabel, labels.secondLabel]);

  const onCompareSubmit = useCallback(
    async (firstValue: string, secondValue: string) => {
      setError(null);
      setIsLoading(true);
      setFirst(firstValue);
      setSecond(secondValue);
      try {
        const computed = await runCalculation(firstValue, secondValue);
        setResult(computed);
      } catch (submitError) {
        setError(submitError instanceof Error ? submitError.message : "Unexpected error while getting your result.");
      } finally {
        setIsLoading(false);
      }
    },
    [runCalculation],
  );

  useEffect(() => {
    if (!result || !pathname || !resultQuery) return;
    trackEvent("result_view", { mode, path: pathname, score: result.score });
    router.replace(`${pathname}?${resultQuery}`, { scroll: false });
  }, [result, resultQuery, pathname, mode, router]);

  const canSubmit = first.trim() && (mode === "destiny" || second.trim());

  function fillExample(example: { first: string; second: string; label: string }) {
    setFirst(example.first);
    setSecond(example.second);
    setError(null);
    trackEvent("calculator_example_fill", { mode, label: example.label });
  }

  return (
    <section
      className={`overflow-hidden rounded-3xl border ${theme.cardBorderClass} bg-white shadow-[0_18px_46px_rgba(15,23,42,0.12)]`}
    >
      <div className={`bg-gradient-to-br ${theme.heroGradientClass} p-5 md:p-6`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${theme.pillClass}`}>
              {theme.label} test
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">{labels.heading}</h2>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-700">
              Enter your details and get a score, meaning, next move, and share-ready result card.
            </p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/80 p-3 text-sm shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Preview</p>
            <p className="mt-1 text-2xl font-black text-slate-950">82/100</p>
            <p className="text-xs font-semibold text-slate-600">Score + meaning + share card</p>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="text-sm font-bold text-slate-800">{labels.firstLabel}</span>
              <input
                required
                value={first}
                onChange={(event) => setFirst(event.target.value)}
                placeholder={labels.firstPlaceholder}
                className={`h-12 rounded-2xl border border-slate-300 px-4 text-base font-semibold text-slate-900 outline-none transition placeholder:font-medium placeholder:text-slate-400 ${theme.inputFocusClass}`}
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-bold text-slate-800">{labels.secondLabel}</span>
              <input
                required={mode !== "destiny"}
                value={second}
                onChange={(event) => setSecond(event.target.value)}
                placeholder={labels.secondPlaceholder}
                className={`h-12 rounded-2xl border border-slate-300 px-4 text-base font-semibold text-slate-900 outline-none transition placeholder:font-medium placeholder:text-slate-400 ${theme.inputFocusClass}`}
              />
            </label>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {examplePairs.map((example) => (
                <button
                  key={example.label}
                  type="button"
                  onClick={() => fillExample(example)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-white hover:text-slate-950"
                >
                  {example.label}
                </button>
              ))}
            </div>
            <button
              type="submit"
              disabled={isLoading || !canSubmit}
              className={`rounded-2xl px-5 py-3 text-sm font-black shadow-[0_12px_24px_rgba(15,23,42,0.18)] transition disabled:cursor-not-allowed disabled:opacity-50 ${theme.buttonClass} ${theme.buttonHoverClass}`}
            >
              {isLoading ? "Building result..." : "Show my result card"}
            </button>
          </div>
          {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
        </form>

        {!report ? (
          <section className="mt-5 grid gap-3 border-t border-slate-100 pt-5 md:grid-cols-3">
            {["Score breakdown", "3-step next move", "Wide + story share cards"].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-bold text-slate-900">{item}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">Included after your result is generated.</p>
              </div>
            ))}
          </section>
        ) : null}
      </div>

      {report ? (
        <div className="px-5 pb-5 md:px-6 md:pb-6">
          <ResultReport
            report={report}
            shareLink={shareLink}
            className={theme.resultClass}
            context={viralityContext}
            compareSecondaryOptional={mode === "destiny"}
            compareLabels={compareLabels}
            onCompareSubmit={onCompareSubmit}
          />
        </div>
      ) : null}
    </section>
  );
}
