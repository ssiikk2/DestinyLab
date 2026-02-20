import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compatibilityPairPages, getPairBySlug } from "@/content/compatibility-pages";
import { appEnv } from "@/lib/env";

interface PairPageProps {
  params: Promise<{ pair: string }>;
}

function pairParagraph(signA: string, signB: string, angle: string): string {
  return `${signA} and ${signB} can work very well when expectations are explicit from day one. ${angle} Most conflict is not about values, it is about timing and delivery. Keep decisions concrete, review your patterns weekly, and make one small adjustment at a time.`;
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
    <article className="premium-card space-y-6 p-6 md:p-10">
      <header className="space-y-3">
        <p className="label-caps">Compatibility Guide</p>
        <h1 className="text-4xl font-semibold text-text-main md:text-5xl">
          {data.signA} and {data.signB}
        </h1>
        <p className="text-text-muted">{data.intro}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-text-main">Where this match tends to click</h2>
        <p className="text-text-muted">
          {pairParagraph(
            data.signA,
            data.signB,
            "You will feel the difference when communication is clear before tension builds.",
          )}
        </p>
        <p className="text-text-muted">
          {pairParagraph(
            data.signA,
            data.signB,
            "This pairing improves fast when both people agree on conflict rules in advance.",
          )}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border-soft bg-white p-5">
          <h2 className="text-xl font-semibold text-text-main">Strengths</h2>
          <ul className="mt-3 space-y-2 text-text-muted">
            {data.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border-soft bg-white p-5">
          <h2 className="text-xl font-semibold text-text-main">One thing to watch</h2>
          <ul className="mt-3 space-y-2 text-text-muted">
            {data.watchouts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-border-soft bg-bg-muted p-5">
        <h2 className="text-2xl font-semibold text-text-main">Next step</h2>
        <p className="mt-2 text-text-muted">Run your own two-date reading and compare tab by tab.</p>
        <Link
          href="/#compatibility-form"
          className="mt-4 inline-flex rounded-full bg-brand-primary px-5 py-2 text-sm font-bold text-white hover:bg-[#2b2f8f]"
        >
          Try another match
        </Link>
      </section>

      <p className="text-sm font-semibold text-text-tertiary">{appEnv.siteName} is for entertainment purposes only.</p>
    </article>
  );
}