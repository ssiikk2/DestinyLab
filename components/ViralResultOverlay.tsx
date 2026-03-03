"use client";

import Link from "next/link";

interface ViralResultOverlayProps {
  score: number;
  label: string;
  shockLine: string;
  memeLine: string;
  miniStory?: string;
  miniStats: { passion: number; communication: number; longTerm: number };
  onCompare: () => void;
  onTryEx: () => void;
  onShare: () => void;
  shareLabel?: string;
  compareLabel?: string;
  isUpgrading?: boolean;
}

function bandClass(score: number): string {
  if (score >= 90) return "from-emerald-50 via-white to-cyan-50 border-emerald-300";
  if (score >= 70) return "from-teal-50 via-white to-sky-50 border-teal-300";
  if (score >= 50) return "from-amber-50 via-white to-yellow-50 border-amber-300";
  if (score >= 30) return "from-orange-50 via-white to-amber-50 border-orange-300";
  return "from-rose-50 via-white to-orange-50 border-rose-300";
}

export function ViralResultOverlay({
  score,
  label,
  shockLine,
  memeLine,
  miniStory,
  miniStats,
  onCompare,
  onTryEx,
  onShare,
  shareLabel = "Share",
  compareLabel = "Compare",
  isUpgrading = false,
}: ViralResultOverlayProps) {
  return (
    <section className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br p-4 ${bandClass(score)}`}>
      {score >= 90 ? (
        <div className="pointer-events-none absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="absolute h-2 w-2 rounded-full bg-emerald-300/80 animate-pulse"
              style={{
                left: `${(i * 9 + 8) % 90}%`,
                top: `${(i * 13 + 7) % 80}%`,
                animationDelay: `${i * 100}ms`,
              }}
            />
          ))}
        </div>
      ) : null}

      <p className="inline-flex rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
        {label}
      </p>
      <div className="mt-2 flex items-end gap-2">
        <p className="text-5xl font-bold text-slate-900">{score}</p>
        <p className="pb-2 text-sm font-semibold text-slate-600">/100</p>
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-900">{shockLine}</p>

      <div className="mt-4 grid gap-2 md:grid-cols-3">
        <article className="rounded-xl border border-white/80 bg-white/80 p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Passion</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{miniStats.passion}</p>
        </article>
        <article className="rounded-xl border border-white/80 bg-white/80 p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Communication</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{miniStats.communication}</p>
        </article>
        <article className="rounded-xl border border-white/80 bg-white/80 p-3">
          <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Long-term</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{miniStats.longTerm}</p>
        </article>
      </div>

      <p className="mt-3 text-sm italic text-slate-700">{memeLine}</p>
      {miniStory ? <p className="mt-2 text-sm text-slate-700">{miniStory}</p> : null}
      {isUpgrading ? <p className="mt-2 text-xs font-semibold text-slate-600">Refreshing your meme lines...</p> : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={onShare} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          {shareLabel}
        </button>
        <button type="button" onClick={onCompare} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">
          {compareLabel}
        </button>
        <button type="button" onClick={onTryEx} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">
          Try with your ex
        </button>
        <Link href="/tests" className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">
          Try another test
        </Link>
      </div>
    </section>
  );
}
