"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DoDontCards } from "@/components/DoDontCards";
import { InsightList } from "@/components/InsightList";
import { ReadingTabs } from "@/components/ReadingTabs";
import { ScoreCard } from "@/components/ScoreCard";
import { ShareButtons } from "@/components/ShareButtons";
import { loadReadingLocal, saveReadingLocal } from "@/lib/reading-browser";
import {
  buildOgLabel,
  buildResultSummary,
  getTabActions,
  toTabInsights,
} from "@/lib/copy";
import { getDefaultSection, getSectionText, getTabs } from "@/lib/reading-view";
import type { StoredReading } from "@/lib/types";

interface ReadingViewProps {
  id: string;
  section?: string;
}

type ViewState =
  | { status: "loading" }
  | { status: "not-found" }
  | { status: "ready"; stored: StoredReading };

function getDisplayTitle(stored: StoredReading): string {
  return stored.data.kind === "compatibility"
    ? "Compatibility result"
    : "Destiny result";
}

function cleanInsight(line: string): string {
  return line
    .replace(/â/g, "'")
    .replace(/\b(cosmic|universe|star|stars|fate|destiny|celestial|zodiac)\b/gi, "overall")
    .replace(/\s+/g, " ")
    .trim();
}

export function ReadingView({ id, section }: ReadingViewProps) {
  const [state, setState] = useState<ViewState>({ status: "loading" });

  useEffect(() => {
    let disposed = false;

    async function load() {
      try {
        const response = await fetch(`/api/readings/${id}`, { cache: "no-store" });

        if (response.ok) {
          const stored = (await response.json()) as StoredReading;
          saveReadingLocal(stored);

          if (!disposed) {
            setState({ status: "ready", stored });
          }

          return;
        }
      } catch {
        // If API lookup fails, use local fallback.
      }

      const local = loadReadingLocal(id);

      if (!disposed) {
        if (local) {
          setState({ status: "ready", stored: local });
        } else {
          setState({ status: "not-found" });
        }
      }
    }

    void load();

    return () => {
      disposed = true;
    };
  }, [id]);

  const content = useMemo(() => {
    if (state.status !== "ready") {
      return null;
    }

    const reading = state.stored.data;
    const tabs = getTabs(reading);
    const fallbackSection = getDefaultSection(reading);
    const activeSection = section || fallbackSection;
    const sectionText =
      getSectionText(reading, activeSection) ||
      getSectionText(reading, fallbackSection) ||
      "";

    const insights = toTabInsights(activeSection, sectionText).map(cleanInsight);
    const actions = getTabActions(activeSection);
    const summary = buildResultSummary(reading);

    const ogLabel = buildOgLabel(reading);
    const ogScore = reading.kind === "compatibility" ? String(reading.score) : "D";
    const ogTool = reading.kind === "compatibility" ? "compatibility" : "destiny";
    const ogPreviewUrl = `/og?tool=${encodeURIComponent(ogTool)}&score=${encodeURIComponent(ogScore)}&label=${encodeURIComponent(ogLabel)}`;

    return {
      reading,
      tabs,
      activeSection,
      insights,
      actions,
      summary,
      ogPreviewUrl,
    };
  }, [section, state]);

  if (state.status === "loading") {
    return (
      <section className="premium-card p-8 text-center">
        <p className="text-sm font-semibold text-text-tertiary">Loading your result...</p>
      </section>
    );
  }

  if (state.status === "not-found" || !content) {
    return (
      <section className="premium-card p-8 text-center">
        <h1 className="text-3xl font-semibold text-text-main">Reading not found</h1>
        <p className="mt-2 text-text-muted">That link is expired or from another device session.</p>
        <Link
          href="/"
          className="btn-primary mt-5 inline-flex px-5 py-2 text-sm"
        >
          Create new reading
        </Link>
      </section>
    );
  }

  const { reading, tabs, activeSection, insights, actions, summary, ogPreviewUrl } = content;

  const secondaryHref = reading.kind === "compatibility" ? "/#destiny-form" : "/#compatibility-form";
  const secondaryLabel =
    reading.kind === "compatibility" ? "Get my destiny reading" : "Run another match";
  const displayTitle = getDisplayTitle(state.stored);

  return (
    <article className="space-y-6 md:space-y-7">
      <section className="premium-card p-6 md:p-8 fade-up">
        <p className="label-caps">Your result</p>
        <h1 className="mt-2 text-3xl font-semibold text-text-main md:text-4xl">{displayTitle}</h1>
        <p className="mt-3 text-base text-text-muted">{summary}</p>
      </section>

      {reading.kind === "compatibility" ? (
        <ScoreCard score={reading.score} summary={summary} />
      ) : (
        <section className="premium-card p-6 md:p-8 fade-up">
          <p className="label-caps">Snapshot</p>
          <p className="mt-3 text-lg text-text-main">{summary}</p>
        </section>
      )}

      <ReadingTabs
        basePath={`/reading/${id}`}
        active={activeSection}
        tabs={tabs.map((tab) => ({ key: tab.key, label: tab.label }))}
      />

      <section className="premium-card p-6 fade-up">
        <p className="label-caps">Active tab</p>
        <h2 className="mt-2 text-3xl font-semibold text-text-main">
          {tabs.find((tab) => tab.key === activeSection)?.label || "Section"}
        </h2>
        <p className="mt-2 text-sm text-text-muted">4 short insights. No fluff.</p>
      </section>

      <InsightList title="Key insights" items={insights} />
      <DoDontCards dos={actions.dos} donts={actions.donts} />

      <section className="premium-card p-5 fade-up">
        <p className="label-caps">Share</p>
        <div className="mt-3 grid gap-4 md:grid-cols-[280px_1fr] md:items-center">
          <div className="overflow-hidden rounded-2xl border border-border-soft bg-white">
            <Image
              src={ogPreviewUrl}
              alt="Open Graph preview"
              width={1200}
              height={630}
              className="h-auto w-full"
              unoptimized
            />
          </div>
          <div className="space-y-3">
            <p className="text-sm text-text-muted">Share this as a card.</p>
            <ShareButtons title={displayTitle} />
          </div>
        </div>
      </section>

      <section className="premium-card flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between fade-up">
        <div className="flex flex-wrap gap-2">
          <Link
            href="/#compatibility-form"
            className="btn-primary px-5 py-2 text-sm"
          >
            Compare another person
          </Link>
          <Link
            href={secondaryHref}
            className="btn-ghost px-5 py-2 text-sm"
          >
            {secondaryLabel}
          </Link>
        </div>
        <p className="text-xs font-semibold text-text-tertiary">For entertainment purposes only.</p>
      </section>
    </article>
  );
}
