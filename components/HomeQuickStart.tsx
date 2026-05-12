"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const quickModes = [
  {
    key: "love",
    label: "Love",
    path: "/calculator",
    firstLabel: "You",
    secondLabel: "Them",
    firstPlaceholder: "Alex",
    secondPlaceholder: "Jamie",
  },
  {
    key: "name",
    label: "Names",
    path: "/name-compatibility",
    firstLabel: "Name one",
    secondLabel: "Name two",
    firstPlaceholder: "Taylor",
    secondPlaceholder: "Jordan",
  },
  {
    key: "zodiac",
    label: "Zodiac",
    path: "/zodiac-compatibility",
    firstLabel: "Sign one",
    secondLabel: "Sign two",
    firstPlaceholder: "Aries",
    secondPlaceholder: "Scorpio",
  },
  {
    key: "birthday",
    label: "Birthday",
    path: "/birthday-compatibility",
    firstLabel: "Birthday one",
    secondLabel: "Birthday two",
    firstPlaceholder: "1995-03-21",
    secondPlaceholder: "1997-10-11",
  },
] as const;

type QuickMode = (typeof quickModes)[number];

export function HomeQuickStart() {
  const router = useRouter();
  const [mode, setMode] = useState<QuickMode>(quickModes[0]);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const a = first.trim();
    const b = second.trim();
    if (!a || !b) return;

    trackEvent("home_quick_start", { mode: mode.key });
    const params = new URLSearchParams({ m: mode.key, a, b });
    router.push(`${mode.path}?${params.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-white/70 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.14)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-rose-700">Quick start</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">Type two details. Get a shareable score.</p>
        </div>
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1" aria-label="Test type">
          {quickModes.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setMode(item)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                item.key === mode.key
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-white hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <label className="grid gap-1">
          <span className="text-xs font-semibold text-slate-700">{mode.firstLabel}</span>
          <input
            value={first}
            onChange={(event) => setFirst(event.target.value)}
            placeholder={mode.firstPlaceholder}
            required
            className="h-12 rounded-2xl border border-slate-300 px-4 text-base font-semibold text-slate-900 outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-slate-900"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-xs font-semibold text-slate-700">{mode.secondLabel}</span>
          <input
            value={second}
            onChange={(event) => setSecond(event.target.value)}
            placeholder={mode.secondPlaceholder}
            required
            className="h-12 rounded-2xl border border-slate-300 px-4 text-base font-semibold text-slate-900 outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-slate-900"
          />
        </label>
        <button
          type="submit"
          className="self-end rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(15,23,42,0.25)] transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          Get score
        </button>
      </div>
      <div className="mt-4 grid gap-2 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500 sm:grid-cols-3">
        <span>No signup</span>
        <span>Instant result</span>
        <span>Share card ready</span>
      </div>
    </form>
  );
}
