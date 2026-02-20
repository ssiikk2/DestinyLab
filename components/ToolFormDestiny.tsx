"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { StoredReading } from "@/lib/types";
import { saveReadingLocal } from "@/lib/reading-browser";

export function ToolFormDestiny() {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/destiny", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthDate }),
      });

      const json = (await response.json()) as {
        route?: string;
        error?: string;
        stored?: StoredReading;
      };

      if (!response.ok || !json.route || !json.stored) {
        throw new Error(json.error || "Could not generate a reading right now.");
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
    <section className="premium-card soft-hover p-6" id="destiny-form">
      <p className="label-caps">Tool B</p>
      <h2 className="mt-2 text-2xl font-semibold text-text-main">Destiny</h2>
      <p className="mt-2 text-sm text-text-muted">
        A quick profile from one birth date.
        <br />
        See your core style, strengths, and one thing to tighten.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-text-main" htmlFor="birthDate">
            Birth date
          </label>
          <input
            id="birthDate"
            type="date"
            required
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            className="rounded-xl border border-border-soft bg-white px-3 py-2 text-text-main outline-none transition focus:border-brand-primary"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-brand-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-[#2b2f8f] disabled:opacity-60"
        >
          {isLoading ? "Generating..." : "Get my reading"}
        </button>
        {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
      </form>

      <div className="mt-5 rounded-2xl border border-border-soft bg-bg-muted p-4 text-sm">
        <p className="font-semibold text-text-main">Example output</p>
        <p className="mt-1 text-text-muted">
          You do best with structure, direct talk, and fewer active priorities.
        </p>
      </div>
      <p className="mt-3 text-xs font-semibold text-text-tertiary">No signup. No saving your inputs.</p>
    </section>
  );
}
