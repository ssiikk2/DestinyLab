"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DoDontCards } from "@/components/DoDontCards";
import { InsightList } from "@/components/InsightList";
import { ReadingTabs } from "@/components/ReadingTabs";
import { ScoreCard } from "@/components/ScoreCard";
import { ShareButtons } from "@/components/ShareButtons";
import { loadReadingLocal, saveReadingLocal } from "@/lib/reading-browser";
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
        // Ignore network errors and use local fallback below.
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

    return {
      reading,
      tabs,
      activeSection,
      sectionText,
      ctaLabel:
        reading.kind === "compatibility"
          ? "Try another match"
          : "Generate another reading",
    };
  }, [section, state]);

  if (state.status === "loading") {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        <p className="text-sm font-medium text-slate-500">Loading your reading...</p>
      </section>
    );
  }

  if (state.status === "not-found" || !content) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900">Reading not found</h1>
        <p className="mt-2 text-slate-600">
          Your result may have expired on the server. Generate a new one below.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Create a new reading
        </Link>
      </section>
    );
  }

  const { reading, tabs, activeSection, sectionText, ctaLabel } = content;

  return (
    <article className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{reading.title}</h1>
        <p className="mt-3 text-slate-700">{reading.summary}</p>
        <p className="mt-2 text-xs text-slate-500">
          Created at {new Date(state.stored.createdAt).toLocaleString()}
        </p>
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
        <Link
          href="/"
          className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          {ctaLabel}
        </Link>
        <ShareButtons title={reading.title} />
      </section>

      <p className="text-sm text-slate-600">For entertainment purposes only.</p>
    </article>
  );
}