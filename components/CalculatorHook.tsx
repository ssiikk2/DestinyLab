"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ResultReport } from "@/components/results/ResultReport";
import { buildResultReport } from "@/lib/results/engine";
import { resolveResultTestKey } from "@/lib/results/resolve";
import type { BaseResultOutput } from "@/lib/results/types";
import { getModeTheme, type CalculatorMode } from "@/lib/test-themes";

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

function toBase64(value: string): string {
  if (typeof window === "undefined") return "";
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return window.btoa(binary);
}

function fromBase64(value: string): string {
  if (typeof window === "undefined") return "";
  const binary = window.atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function encodeResultSnapshot(result: CalculationResult): string {
  return toBase64(JSON.stringify(result));
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

    try {
      const computed = await runCalculation(first, second);
      setResult(computed);
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

  const shareLink = useMemo(() => {
    if (!result || !pathname) return "";
    const params = new URLSearchParams();
    params.set("m", mode);
    params.set("a", first);
    if (mode !== "destiny") params.set("b", second);
    if (variantKey) params.set("v", variantKey);
    params.set("r", encodeResultSnapshot(result));
    const query = params.toString();
    if (typeof window !== "undefined") {
      return `${window.location.origin}${pathname}?${query}`;
    }
    return `${pathname}?${query}`;
  }, [result, pathname, mode, first, second, variantKey]);

  useEffect(() => {
    if (!result || !pathname) return;
    const params = new URLSearchParams();
    params.set("m", mode);
    params.set("a", first);
    if (mode !== "destiny") params.set("b", second);
    if (variantKey) params.set("v", variantKey);
    params.set("r", encodeResultSnapshot(result));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [result, pathname, mode, first, second, variantKey, router]);

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

      {report ? (
        <ResultReport report={report} shareLink={shareLink} className={theme.resultClass} />
      ) : null}
    </section>
  );
}
