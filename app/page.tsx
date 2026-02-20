import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { ToolFormCompatibility } from "@/components/ToolFormCompatibility";
import { ToolFormDestiny } from "@/components/ToolFormDestiny";
import { TrendingPairs } from "@/components/TrendingPairs";
import { appEnv } from "@/lib/env";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 p-7 text-white shadow-2xl md:p-10">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-rose-500/30 blur-3xl" />
        <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">{appEnv.siteName}</p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Birth-date readings that are clear, fast, and actually usable.
          </h1>
          <p className="max-w-2xl text-lg text-slate-200">
            Pick a tool, enter your date(s), and get a structured result with score, sections, and practical next steps.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="#compatibility-form"
              className="rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-900 hover:bg-slate-100"
            >
              Start Compatibility
            </Link>
            <Link
              href="#destiny-form"
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-bold text-white hover:bg-white/10"
            >
              Start Destiny
            </Link>
          </div>
          <p className="text-sm text-slate-300">For entertainment purposes only.</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Step 1</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">Choose a tool</h2>
          <p className="mt-2 text-sm text-slate-700">Compatibility for 2 people, Destiny for 1 person.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Step 2</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">Enter birth date(s)</h2>
          <p className="mt-2 text-sm text-slate-700">No signup, no waiting list, no long survey.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Step 3</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">Get sectioned result</h2>
          <p className="mt-2 text-sm text-slate-700">Score, insight tabs, do and avoid actions, and share-ready link.</p>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <ToolFormCompatibility />
        <ToolFormDestiny />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <TrendingPairs />
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <h2 className="text-xl font-bold text-slate-900">What You Get</h2>
          <ul className="mt-3 space-y-2 text-slate-700">
            <li>Compatibility score (0-100) for couples</li>
            <li>5 relationship sections with practical advice</li>
            <li>Destiny profile with 6 life-pattern sections</li>
            <li>Share buttons and tab-by-tab reading pages</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/blog/destiny-reading-birth-date-basics"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Learn how it works
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              About {appEnv.siteName}
            </Link>
          </div>
        </section>
      </div>

      <AdSlot className="mx-auto max-w-3xl" />
    </div>
  );
}