"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function ToolFormCompatibility() {
  const router = useRouter();
  const [birthDateA, setBirthDateA] = useState("");
  const [birthDateB, setBirthDateB] = useState("");
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
        body: JSON.stringify({ birthDateA, birthDateB }),
      });

      const json = (await response.json()) as { route?: string; error?: string };

      if (!response.ok || !json.route) {
        throw new Error(json.error || "Failed to generate reading.");
      }

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
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
      <h2 className="text-xl font-bold text-slate-900">Compatibility Tool</h2>
      <p className="text-sm text-slate-600">Enter two birth dates to generate a score and section-based reading.</p>
      <div className="grid gap-3">
        <label className="text-sm font-medium text-slate-700" htmlFor="birthDateA">
          Birth date A
        </label>
        <input
          id="birthDateA"
          type="date"
          required
          value={birthDateA}
          onChange={(event) => setBirthDateA(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900"
        />
      </div>
      <div className="grid gap-3">
        <label className="text-sm font-medium text-slate-700" htmlFor="birthDateB">
          Birth date B
        </label>
        <input
          id="birthDateB"
          type="date"
          required
          value={birthDateB}
          onChange={(event) => setBirthDateB(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900"
        />
      </div>
      {error ? <p className="text-sm text-rose-700">{error}</p> : null}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-60"
      >
        {isLoading ? "Generating..." : "Get Compatibility Reading"}
      </button>
    </form>
  );
}