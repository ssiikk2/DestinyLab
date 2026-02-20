import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { ToolFormCompatibility } from "@/components/ToolFormCompatibility";
import { ToolFormDestiny } from "@/components/ToolFormDestiny";
import { TrendingPairs } from "@/components/TrendingPairs";
import { appEnv } from "@/lib/env";
import { getAccentGradient } from "@/lib/theme";

export default function HomePage() {
  const accent = getAccentGradient();

  return (
    <div className="space-y-8">
      <section className={`rounded-3xl bg-gradient-to-br ${accent} p-7 text-white shadow-2xl md:p-10`}>
        <p className="text-sm uppercase tracking-[0.2em] text-white/80">Tool-Centric Readings</p>
        <h1 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">
          Discover your compatibility and destiny in under one minute.
        </h1>
        <p className="mt-4 max-w-2xl text-white/90">
          Generate shareable readings with practical sections and repeat any time with updated insights.
        </p>
        <p className="mt-4 text-sm text-white/90">For entertainment purposes only.</p>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <ToolFormCompatibility />
        <ToolFormDestiny />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <TrendingPairs />
        <section className="rounded-3xl border border-white/40 bg-white/75 p-6 shadow-lg backdrop-blur">
          <h2 className="text-xl font-bold text-slate-900">Growth Content</h2>
          <p className="mt-3 text-slate-700">
            Explore SEO-focused content and practical guides built for repeat visits.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/blog/destiny-reading-birth-date-basics" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
              Read the blog
            </Link>
            <Link href="/about" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              About DestinyLab
            </Link>
          </div>
        </section>
      </div>

      <AdSlot className="mx-auto max-w-3xl" />

      <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 text-sm text-slate-600">
        <p>
          Site mode: <strong>{appEnv.siteToolMode}</strong>
        </p>
        <p className="mt-2">Designed for mobile-first reading, sharing, and gradual SEO expansion.</p>
      </section>
    </div>
  );
}