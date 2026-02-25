"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface ZodiacPageItem {
  slug: string;
  path: string;
  h1: string;
}

interface ZodiacHubExplorerProps {
  pages: ZodiacPageItem[];
}

const SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

const POPULAR_PAIR_SLUGS = [
  "aries-and-scorpio",
  "taurus-and-libra",
  "gemini-and-sagittarius",
  "cancer-and-leo",
  "leo-and-aries",
  "virgo-and-pisces",
  "libra-and-aries",
  "scorpio-and-aries",
  "sagittarius-and-gemini",
  "capricorn-and-cancer",
  "aquarius-and-virgo",
  "pisces-and-cancer",
] as const;

function toSignSlug(sign: string): string {
  return sign.toLowerCase();
}

function isActive(sign: string, firstSign: string | null, secondSign: string | null): boolean {
  return sign === firstSign || sign === secondSign;
}

export function ZodiacHubExplorer({ pages }: ZodiacHubExplorerProps) {
  const router = useRouter();
  const [firstSign, setFirstSign] = useState<string | null>(null);
  const [secondSign, setSecondSign] = useState<string | null>(null);
  const [isRouting, setIsRouting] = useState(false);

  const pageBySlug = useMemo(() => new Map(pages.map((page) => [page.slug, page])), [pages]);

  useEffect(() => {
    if (!firstSign || !secondSign || isRouting) {
      return;
    }

    const pairSlug = `${toSignSlug(firstSign)}-and-${toSignSlug(secondSign)}`;
    setIsRouting(true);
    router.push(`/compatibility/${pairSlug}`);
  }, [firstSign, secondSign, isRouting, router]);

  const popularPairs = useMemo(
    () =>
      POPULAR_PAIR_SLUGS.map((slug) => {
        const canonicalSlug = `${slug}-compatibility`;
        return pageBySlug.get(canonicalSlug)
          ? { slug, path: `/compatibility/${slug}`, label: pageBySlug.get(canonicalSlug)?.h1 || slug }
          : { slug, path: `/compatibility/${slug}`, label: slug.replace(/-/g, " ") };
      }),
    [pageBySlug],
  );

  function onPickSign(sign: string) {
    if (sign === firstSign) {
      setFirstSign(null);
      return;
    }

    if (sign === secondSign) {
      setSecondSign(null);
      return;
    }

    if (!firstSign) {
      setFirstSign(sign);
      return;
    }

    if (!secondSign) {
      setSecondSign(sign);
      return;
    }

    setFirstSign(secondSign);
    setSecondSign(sign);
    setIsRouting(false);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-teal-50 to-cyan-50 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
        <h2 className="text-2xl font-semibold text-slate-900">Pick Two Signs</h2>
        <p className="mt-2 text-sm text-slate-700">
          Two signs, one tap, instant story. As soon as your pair is set, you jump right into their compatibility page.
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-3 md:grid-cols-4">
          {SIGNS.map((sign) => (
            <button
              key={sign}
              type="button"
              onClick={() => onPickSign(sign)}
              className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                isActive(sign, firstSign, secondSign)
                  ? "border-teal-500 bg-teal-600 text-white"
                  : "border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
              }`}
            >
              {sign}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-slate-800">
            First: {firstSign ?? "pick one"}
          </span>
          <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-slate-800">
            Second: {secondSign ?? "pick one"}
          </span>
          <button
            type="button"
            onClick={() => {
              setFirstSign(null);
              setSecondSign(null);
              setIsRouting(false);
            }}
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-slate-700 transition hover:bg-slate-50"
          >
            Clear
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Popular Matches</h2>
        <p className="mt-2 text-sm text-slate-700">
          Quick picks when you just want to dive in. These are fan-favorite pair stories.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {popularPairs.map((pair) => (
            <Link
              key={pair.slug}
              href={pair.path}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
            >
              <p className="text-sm font-semibold text-slate-900 capitalize">{pair.label}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Try Also</h2>
        <p className="mt-2 text-sm text-slate-700">If you want another angle, these pages keep the story going.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Link href="/calculator" className="rounded-2xl border border-slate-200 bg-white p-4 hover:bg-slate-50">
            <p className="text-sm font-semibold text-slate-900">Primary Love Tool</p>
            <p className="mt-1 text-xs text-slate-600">The full compatibility snapshot.</p>
          </Link>
          <Link href="/name-compatibility" className="rounded-2xl border border-slate-200 bg-white p-4 hover:bg-slate-50">
            <p className="text-sm font-semibold text-slate-900">Name Test</p>
            <p className="mt-1 text-xs text-slate-600">A flirty, quick chemistry check.</p>
          </Link>
          <Link href="/destiny" className="rounded-2xl border border-slate-200 bg-white p-4 hover:bg-slate-50">
            <p className="text-sm font-semibold text-slate-900">Destiny Read</p>
            <p className="mt-1 text-xs text-slate-600">Your personal relationship style.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
