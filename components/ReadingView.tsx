import Link from "next/link";
import { notFound } from "next/navigation";
import { DoDontCards } from "@/components/DoDontCards";
import { InsightList } from "@/components/InsightList";
import { ReadingTabs } from "@/components/ReadingTabs";
import { ScoreCard } from "@/components/ScoreCard";
import { ShareButtons } from "@/components/ShareButtons";
import { getReading } from "@/lib/reading-store";
import { getDefaultSection, getSectionText, getTabs } from "@/lib/reading-view";

interface ReadingViewProps {
  id: string;
  section?: string;
}

export function ReadingView({ id, section }: ReadingViewProps) {
  const stored = getReading(id);

  if (!stored) {
    notFound();
  }

  const reading = stored.data;
  const tabs = getTabs(reading);
  const fallbackSection = getDefaultSection(reading);
  const activeSection = section || fallbackSection;
  const sectionText = getSectionText(reading, activeSection) || getSectionText(reading, fallbackSection);

  if (!sectionText) {
    notFound();
  }

  const ctaLabel = reading.kind === "compatibility" ? "Try another match" : "Generate another reading";

  return (
    <article className="space-y-6">
      <section className="rounded-3xl border border-white/40 bg-white/75 p-6 shadow-lg backdrop-blur">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{reading.title}</h1>
        <p className="mt-3 text-slate-700">{reading.summary}</p>
        <p className="mt-2 text-xs text-slate-500">Created at {new Date(stored.createdAt).toLocaleString()}</p>
      </section>

      {reading.kind === "compatibility" ? <ScoreCard score={reading.score} /> : null}

      <ReadingTabs
        basePath={`/reading/${id}`}
        active={activeSection}
        tabs={tabs.map((tab) => ({ key: tab.key, label: tab.label }))}
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">
          {tabs.find((tab) => tab.key === activeSection)?.label || "Section"}
        </h2>
        <p className="mt-3 leading-8 text-slate-700">{sectionText}</p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <InsightList title="Key Insights" items={reading.highlights} />
        <DoDontCards dos={reading.dos} donts={reading.donts} />
      </div>

      <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
          {ctaLabel}
        </Link>
        <ShareButtons title={reading.title} />
      </section>

      <p className="text-sm text-slate-600">For entertainment purposes only.</p>
    </article>
  );
}