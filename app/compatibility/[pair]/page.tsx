import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compatibilityPairPages, getPairBySlug } from "@/content/compatibility-pages";
import { appEnv } from "@/lib/env";

interface PairPageProps {
  params: Promise<{ pair: string }>;
}

function longPairParagraph(signA: string, signB: string, angle: string): string {
  return `${signA} and ${signB} compatibility improves when both partners make expectations explicit early. ${angle} Most friction in this pair comes from timing mismatches, not from lack of care. The practical approach is to turn emotional assumptions into clear requests and clear requests into repeatable routines. Keep feedback specific, focus on one issue at a time, and review progress weekly.`;
}

export async function generateStaticParams() {
  return compatibilityPairPages.map((pair) => ({ pair: pair.slug }));
}

export async function generateMetadata({ params }: PairPageProps): Promise<Metadata> {
  const { pair } = await params;
  const data = getPairBySlug(pair);

  if (!data) {
    return { title: "Compatibility" };
  }

  return {
    title: `${data.signA} and ${data.signB} Compatibility`,
    description: data.intro,
    alternates: {
      canonical: `/compatibility/${data.slug}`,
    },
  };
}

export default async function PairPage({ params }: PairPageProps) {
  const { pair } = await params;
  const data = getPairBySlug(pair);

  if (!data) {
    notFound();
  }

  return (
    <article className="space-y-6 rounded-3xl border border-white/40 bg-white/85 p-6 shadow-lg md:p-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Compatibility</p>
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
          {data.signA} and {data.signB} Compatibility
        </h1>
        <p className="text-slate-700">{data.intro}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-slate-900">Relationship Dynamics</h2>
        <p className="leading-8 text-slate-700">
          {longPairParagraph(
            data.signA,
            data.signB,
            "When both people agree on conflict rules in advance, emotionally heavy moments become easier to navigate.",
          )}
        </p>
        <p className="leading-8 text-slate-700">
          {longPairParagraph(
            data.signA,
            data.signB,
            "This pair grows fast when appreciation is verbalized and practical support is visible.",
          )}
        </p>
        <p className="leading-8 text-slate-700">
          {longPairParagraph(
            data.signA,
            data.signB,
            "Monthly planning conversations reduce uncertainty and protect long-term momentum.",
          )}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h2 className="text-xl font-bold text-emerald-900">Strengths</h2>
          <ul className="mt-3 space-y-2 text-emerald-800">
            {data.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-xl font-bold text-amber-900">Watchouts</h2>
          <ul className="mt-3 space-y-2 text-amber-900">
            {data.watchouts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-2xl font-bold text-slate-900">Next Step</h2>
        <p className="mt-2 text-slate-700">Generate a personalized score based on two birth dates and compare section-by-section insights.</p>
        <Link
          href="/"
          className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Try another match
        </Link>
      </section>

      <p className="text-sm text-slate-500">{appEnv.siteName} content is for entertainment purposes only.</p>
    </article>
  );
}