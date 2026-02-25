"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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
  "aries-and-taurus-compatibility",
  "aries-and-scorpio-compatibility",
  "taurus-and-libra-compatibility",
  "gemini-and-sagittarius-compatibility",
  "cancer-and-leo-compatibility",
  "leo-and-scorpio-compatibility",
  "virgo-and-pisces-compatibility",
  "libra-and-capricorn-compatibility",
  "capricorn-and-cancer-compatibility",
  "aquarius-and-virgo-compatibility",
  "pisces-and-cancer-compatibility",
  "leo-and-aries-compatibility",
] as const;

function toSignSlug(sign: string): string {
  return sign.toLowerCase();
}

function pickIsActive(sign: string, firstSign: string | null, secondSign: string | null): boolean {
  return sign === firstSign || sign === secondSign;
}

export function ZodiacHubExplorer({ pages }: ZodiacHubExplorerProps) {
  const [firstSign, setFirstSign] = useState<string | null>(null);
  const [secondSign, setSecondSign] = useState<string | null>(null);

  const pageBySlug = useMemo(() => new Map(pages.map((page) => [page.slug, page])), [pages]);

  const selectedResult = useMemo(() => {
    if (!firstSign || !secondSign) {
      return null;
    }

    const firstSlug = toSignSlug(firstSign);
    const secondSlug = toSignSlug(secondSign);
    const direct = `${firstSlug}-and-${secondSlug}-compatibility`;
    const reverse = `${secondSlug}-and-${firstSlug}-compatibility`;
    const page = pageBySlug.get(direct) || pageBySlug.get(reverse) || null;

    return {
      title: `${firstSign} + ${secondSign}`,
      page,
    };
  }, [firstSign, secondSign, pageBySlug]);

  const popularPairs = useMemo(
    () => POPULAR_PAIR_SLUGS.map((slug) => pageBySlug.get(slug)).filter(Boolean) as ZodiacPageItem[],
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
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-teal-50 to-cyan-50 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
        <h2 className="text-2xl font-semibold text-slate-900">Pick Two Signs</h2>
        <p className="mt-2 text-sm text-slate-700">
          Tap any two signs and jump straight to a match result.
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-3 md:grid-cols-4">
          {SIGNS.map((sign) => {
            const active = pickIsActive(sign, firstSign, secondSign);

            return (
              <button
                key={sign}
                type="button"
                onClick={() => onPickSign(sign)}
                className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "border-teal-500 bg-teal-600 text-white"
                    : "border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                }`}
              >
                {sign}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-slate-800">
            First: {firstSign ?? "Not picked yet"}
          </span>
          <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-slate-800">
            Second: {secondSign ?? "Not picked yet"}
          </span>
          <button
            type="button"
            onClick={() => {
              setFirstSign(null);
              setSecondSign(null);
            }}
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-slate-700 transition hover:bg-slate-50"
          >
            Clear picks
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Your Combo</h2>
        {!selectedResult ? (
          <p className="mt-2 text-sm text-slate-700">Choose two signs above to unlock your match page.</p>
        ) : selectedResult.page ? (
          <div className="mt-3 space-y-3">
            <p className="text-sm text-slate-700">
              {selectedResult.title} is ready. Tap below to see the full reading.
            </p>
            <Link
              href={selectedResult.page.path}
              className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Open match result
            </Link>
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            <p className="text-sm text-slate-700">
              {selectedResult.title} does not have a dedicated page yet, but you can still run the zodiac test now.
            </p>
            <Link
              href="/zodiac-compatibility"
              className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Open zodiac test
            </Link>
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Popular Pair Picks</h2>
        <p className="mt-2 text-sm text-slate-700">Most clicked combos right now. Great place to start.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {popularPairs.map((page) => (
            <Link
              key={page.slug}
              href={page.path}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
            >
              <p className="text-sm font-semibold text-slate-900">{page.h1}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Try also</h2>
        <p className="mt-2 text-sm text-slate-700">If you want another angle, these are fun next clicks.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Link href="/calculator" className="rounded-2xl border border-slate-200 bg-white p-4 hover:bg-slate-50">
            <p className="text-sm font-semibold text-slate-900">Love Calculator</p>
            <p className="mt-1 text-xs text-slate-600">Classic score and quick read.</p>
          </Link>
          <Link href="/name-compatibility" className="rounded-2xl border border-slate-200 bg-white p-4 hover:bg-slate-50">
            <p className="text-sm font-semibold text-slate-900">Name Compatibility</p>
            <p className="mt-1 text-xs text-slate-600">Try a light name-based match.</p>
          </Link>
          <Link href="/destiny" className="rounded-2xl border border-slate-200 bg-white p-4 hover:bg-slate-50">
            <p className="text-sm font-semibold text-slate-900">Destiny Reading</p>
            <p className="mt-1 text-xs text-slate-600">See your solo relationship vibe.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
