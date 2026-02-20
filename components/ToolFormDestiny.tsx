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
        throw new Error(json.error || "Failed to generate reading.");
      }

      saveReadingLocal(json.stored);
      router.push(json.route);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unexpected error while generating reading.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      id="destiny-form"
      className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
    >
      <h2 className="text-xl font-bold text-slate-900">Destiny Reading</h2>
      <p className="text-sm text-slate-600">
        Enter one birth date and get personality, love style, money pattern, career strength, and hidden traits.
      </p>
      <div className="grid gap-3">
        <label className="text-sm font-medium text-slate-700" htmlFor="birthDate">
          Birth date
        </label>
        <input
          id="birthDate"
          type="date"
          required
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900"
        />
      </div>
      {error ? <p className="text-sm text-rose-700">{error}</p> : null}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
      >
        {isLoading ? "Generating..." : "Generate Destiny Result"}
      </button>
    </form>
  );
}