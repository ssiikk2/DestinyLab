import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { ToolFormCompatibility } from "@/components/ToolFormCompatibility";
import { ToolFormDestiny } from "@/components/ToolFormDestiny";
import { TrendingPairs } from "@/components/TrendingPairs";

const faqItems = [
  {
    q: "How serious should I take this?",
    a: "Treat it as a fun mirror, not a life decision engine.",
  },
  {
    q: "How often should I run a new match?",
    a: "Monthly is usually enough, or after a major change.",
  },
  {
    q: "Can a low score still work out?",
    a: "Yes. Scores highlight friction points, not fixed outcomes.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8 md:space-y-10">
      <section className="premium-card relative overflow-hidden p-7 md:p-10 fade-up">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-brand-accent/20 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <p className="label-caps">DestinyLab</p>
          <h1 className="mt-3 text-[clamp(2.2rem,5vw,4rem)] font-semibold text-text-main">
            Compatibility and destiny&mdash;cleanly explained.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-text-muted md:text-lg">
            Fast readings you can share. For fun, not for life decisions.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#compatibility-form"
              className="rounded-full bg-brand-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#2b2f8f]"
            >
              Check compatibility
            </Link>
            <Link
              href="#destiny-form"
              className="rounded-full border border-border-strong bg-white px-5 py-2.5 text-sm font-bold text-text-main transition hover:bg-bg-muted"
            >
              Get my reading
            </Link>
          </div>

          <p className="mt-4 text-xs font-semibold text-text-tertiary">For entertainment purposes only.</p>
        </div>
      </section>

      <TrendingPairs />

      <section className="grid gap-4 md:grid-cols-3 fade-up">
        <article className="premium-card p-5">
          <p className="label-caps">What you get</p>
          <h2 className="mt-2 text-2xl font-semibold text-text-main">Clean score</h2>
          <p className="mt-2 text-sm text-text-muted">A fast readout that tells you where you click and where to pay attention.</p>
        </article>
        <article className="premium-card p-5">
          <p className="label-caps">What you get</p>
          <h2 className="mt-2 text-2xl font-semibold text-text-main">Tab insights</h2>
          <p className="mt-2 text-sm text-text-muted">Each section turns into sharp bullets with do/don&apos;t actions.</p>
        </article>
        <article className="premium-card p-5">
          <p className="label-caps">What you get</p>
          <h2 className="mt-2 text-2xl font-semibold text-text-main">Share-ready cards</h2>
          <p className="mt-2 text-sm text-text-muted">Copy link, post on X, or share with one tap.</p>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-3 fade-up">
        <article className="premium-card p-5">
          <p className="label-caps">How it works</p>
          <h2 className="mt-2 text-2xl font-semibold text-text-main">1. Pick a tool</h2>
          <p className="mt-2 text-sm text-text-muted">Compatibility for two dates. Destiny for one.</p>
        </article>
        <article className="premium-card p-5">
          <p className="label-caps">How it works</p>
          <h2 className="mt-2 text-2xl font-semibold text-text-main">2. Enter date(s)</h2>
          <p className="mt-2 text-sm text-text-muted">No account flow, no long form, no setup friction.</p>
        </article>
        <article className="premium-card p-5">
          <p className="label-caps">How it works</p>
          <h2 className="mt-2 text-2xl font-semibold text-text-main">3. Read and act</h2>
          <p className="mt-2 text-sm text-text-muted">Scan the insights, run another match, compare with someone else.</p>
        </article>
      </section>

      <div className="grid gap-5 lg:grid-cols-2 fade-up">
        <ToolFormCompatibility />
        <ToolFormDestiny />
      </div>

      <section className="premium-card p-6 fade-up">
        <p className="label-caps">FAQ</p>
        <h2 className="mt-2 text-3xl font-semibold text-text-main">Quick answers</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {faqItems.map((item) => (
            <article key={item.q} className="rounded-2xl border border-border-soft bg-white p-4">
              <h3 className="text-base font-semibold text-text-main">{item.q}</h3>
              <p className="mt-2 text-sm text-text-muted">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <AdSlot className="mx-auto max-w-3xl" />
    </div>
  );
}