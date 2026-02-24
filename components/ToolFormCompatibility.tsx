"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { StoredReading } from "@/lib/types";
import { saveReadingLocal } from "@/lib/reading-browser";

export function ToolFormCompatibility() {
  const router = useRouter();
  const [birthDateA, setBirthDateA] = useState("");
  const [birthDateB, setBirthDateB] = useState("");
  const [website, setWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/compatibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthDateA, birthDateB, website }),
      });

      const json = (await response.json()) as {
        route?: string;
        error?: string;
        stored?: StoredReading;
      };

      if (!response.ok || !json.route || !json.stored) {
        throw new Error(json.error || "Could not generate a match right now.");
      }

      saveReadingLocal(json.stored);
      router.push(json.route);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unexpected error while generating your reading.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="premium-card soft-hover p-6" id="compatibility-form">
      <p className="label-caps">Test A · 2-person</p>
      <h2 className="mt-2 text-2xl font-semibold text-text-main">Compatibility test</h2>
      <p className="mt-2 text-sm text-text-muted">Enter two birth dates and compare the match.</p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div className="hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-text-main" htmlFor="birthDateA">
            Person one
          </label>
          <input
            id="birthDateA"
            type="date"
            required
            value={birthDateA}
            onChange={(event) => setBirthDateA(event.target.value)}
            className="rounded-xl border border-border-soft bg-white px-3 py-2 text-text-main outline-none transition focus:border-brand-primary"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-text-main" htmlFor="birthDateB">
            Person two
          </label>
          <input
            id="birthDateB"
            type="date"
            required
            value={birthDateB}
            onChange={(event) => setBirthDateB(event.target.value)}
            className="rounded-xl border border-border-soft bg-white px-3 py-2 text-text-main outline-none transition focus:border-brand-primary"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full px-4 py-3 text-sm disabled:opacity-60"
        >
          {isLoading ? "Running test..." : "Run compatibility test"}
        </button>
        {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
      </form>

      <div className="mt-5 rounded-2xl border border-border-soft bg-bg-muted p-4 text-sm">
        <p className="font-semibold text-text-main">Example</p>
        <p className="mt-1 text-text-muted">78/100. Strong chemistry. Communication needs cleaner timing.</p>
      </div>
      <p className="mt-3 text-xs font-semibold text-text-tertiary">No signup. No long-term input storage.</p>
    </section>
  );
}
