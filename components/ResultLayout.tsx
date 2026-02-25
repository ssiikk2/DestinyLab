import Link from "next/link";
import type { CalculatorMode } from "@/lib/test-themes";

interface ResultFaq {
  question: string;
  answer: string;
}

interface TryAlsoLink {
  href: string;
  note: string;
}

interface ResultLayoutProps {
  mode: CalculatorMode;
  score: number;
  title: string;
  summary: string;
  strengths: string[];
  watchouts: string[];
  tips: string[];
  faq: ResultFaq[];
  tryAlso: TryAlsoLink[];
  resultClassName: string;
}

function modeTitle(mode: CalculatorMode): string {
  if (mode === "zodiac") {
    return "Zodiac Result";
  }
  if (mode === "love") {
    return "Love Result";
  }
  return "Your Result";
}

function prettyLabelFromHref(href: string): string {
  return (
    href
      .replace(/^\//, "")
      .split("/")
      .filter(Boolean)
      .pop()
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) || "Next Test"
  );
}

function SectionList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function ResultLayout({
  mode,
  score,
  title,
  summary,
  strengths,
  watchouts,
  tips,
  faq,
  tryAlso,
  resultClassName,
}: ResultLayoutProps) {
  return (
    <section className={`mt-5 space-y-4 rounded-2xl border p-4 ${resultClassName}`}>
      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-slate-900">{title || modeTitle(mode)}</h2>
        <p className="mt-1 text-sm text-slate-700">
          Score: <strong>{score}/100</strong>
        </p>
        <h3 className="mt-3 text-base font-semibold text-slate-900">Quick Summary</h3>
        <p className="mt-2 text-sm text-slate-700">{summary}</p>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <SectionList title="Strengths" items={strengths} />
        <SectionList title="Watch-outs" items={watchouts} />
        <SectionList title="Tiny Tips" items={tips} />
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-base font-semibold text-slate-900">FAQ</h3>
        <div className="mt-3 space-y-3">
          {faq.map((item) => (
            <article key={item.question}>
              <h4 className="text-sm font-semibold text-slate-900">{item.question}</h4>
              <p className="mt-1 text-sm text-slate-700">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <h3 className="text-base font-semibold text-slate-900">Try also</h3>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {tryAlso.map((link) => (
            <Link
              key={`${mode}-${link.href}`}
              href={link.href}
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:bg-slate-100"
            >
              <p className="text-sm font-semibold text-slate-900">{prettyLabelFromHref(link.href)}</p>
              <p className="mt-1 text-xs text-slate-600">{link.note}</p>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
