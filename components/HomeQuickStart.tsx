"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export function HomeQuickStart() {
  const router = useRouter();
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const a = first.trim();
    const b = second.trim();
    if (!a || !b) return;

    trackEvent("home_quick_start", { mode: "love" });
    const params = new URLSearchParams({ m: "love", a, b });
    router.push(`/calculator?${params.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Quick start</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <label className="grid gap-1">
          <span className="text-xs font-semibold text-slate-700">You</span>
          <input
            value={first}
            onChange={(event) => setFirst(event.target.value)}
            placeholder="Alex"
            required
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-900"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-xs font-semibold text-slate-700">Them</span>
          <input
            value={second}
            onChange={(event) => setSecond(event.target.value)}
            placeholder="Jamie"
            required
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-900"
          />
        </label>
        <button
          type="submit"
          className="self-end rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Get score
        </button>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        Opens the main calculator with your details already loaded.
      </p>
    </form>
  );
}
