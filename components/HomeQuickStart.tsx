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
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Quick start</p>
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
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <label className="grid gap-1">
          <span className="text-xs font-semibold text-slate-700">{mode.firstLabel}</span>
          <input
            value={first}
            onChange={(event) => setFirst(event.target.value)}
            placeholder={mode.firstPlaceholder}
            required
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-900"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-xs font-semibold text-slate-700">{mode.secondLabel}</span>
          <input
            value={second}
            onChange={(event) => setSecond(event.target.value)}
            placeholder={mode.secondPlaceholder}
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
        Opens the best matching test with your details already loaded.
      </p>
    </form>
  );
}
