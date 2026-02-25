"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ResultReport } from "@/components/results/ResultReport";
import { loadReadingLocal, saveReadingLocal } from "@/lib/reading-browser";
import { buildResultReport } from "@/lib/results/engine";
import type { BaseResultOutput } from "@/lib/results/types";
import type { StoredReading } from "@/lib/types";

interface ReadingViewProps {
  id: string;
  section?: string;
}

type ViewState =
  | { status: "loading" }
  | { status: "not-found" }
  | { status: "ready"; stored: StoredReading };

export function ReadingView({ id }: ReadingViewProps) {
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
        // fallback below
      }

      const local = loadReadingLocal(id);
      if (!disposed) {
        if (local) setState({ status: "ready", stored: local });
        else setState({ status: "not-found" });
      }
    }

    void load();
    return () => {
      disposed = true;
    };
  }, [id]);

  const report = useMemo(() => {
    if (state.status !== "ready") return null;
    const data = state.stored.data;
    const base: BaseResultOutput =
      data.kind === "compatibility"
        ? {
            score: data.score,
            title: data.title,
            summary: data.summary,
            strengths: data.highlights,
            watchouts: data.donts,
            tips: data.dos,
          }
        : {
            title: data.title,
            summary: data.summary,
            strengths: data.highlights,
            watchouts: data.donts,
            tips: data.dos,
          };

    return buildResultReport({
      testKey: data.kind === "compatibility" ? "compatibility" : "destiny",
      userInput:
        data.kind === "compatibility"
          ? { testKey: "compatibility", primary: data.birthDateA, secondary: data.birthDateB }
          : { testKey: "destiny", primary: data.birthDate },
      base,
    });
  }, [state]);

  if (state.status === "loading") {
    return (
      <section className="premium-card p-8 text-center">
        <p className="text-sm font-semibold text-text-tertiary">Loading your result...</p>
      </section>
    );
  }

  if (state.status === "not-found" || !report) {
    return (
      <section className="premium-card p-8 text-center">
        <h1 className="text-3xl font-semibold text-text-main">Reading not found</h1>
        <p className="mt-2 text-text-muted">That link is expired or from another device session.</p>
        <Link href="/" className="btn-primary mt-5 inline-flex px-5 py-2 text-sm">
          Create new reading
        </Link>
      </section>
    );
  }

  const shareLink =
    typeof window !== "undefined" ? `${window.location.origin}${window.location.pathname}${window.location.search}` : "";

  return (
    <article className="space-y-6 md:space-y-7">
      <ResultReport report={report} shareLink={shareLink} />
      <section className="premium-card flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between fade-up">
        <div className="flex flex-wrap gap-2">
          <Link href="/#compatibility-form" className="btn-primary px-5 py-2 text-sm">
            Compare another person
          </Link>
          <Link href="/tests" className="btn-ghost px-5 py-2 text-sm">
            Open all tests
          </Link>
        </div>
        <p className="text-xs font-semibold text-text-tertiary">For entertainment purposes only.</p>
      </section>
    </article>
  );
}
