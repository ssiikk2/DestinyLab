import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { getToolPages } from "@/content/seo-data";
import { buildMetadata } from "@/lib/seo";
import { getModeFromToolSlug, getModeTheme } from "@/lib/test-themes";

export const metadata: Metadata = buildMetadata({
  title: "All Compatibility Tests",
  description:
    "Choose a test and go directly to the dedicated page: love, name, initials, crush, friendship, zodiac, birthday, and destiny.",
  path: "/tests",
});

export const revalidate = 86400;

export default function TestsHubPage() {
  const tools = getToolPages();

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <header className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-6 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">All compatibility tests</h1>
        <p className="mt-2 text-sm text-slate-700 md:text-base">
          Pick any test below and jump straight into its dedicated page.
        </p>
      </header>

      <AdSlot placement="aboveFold" size="leaderboard" />

      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => {
          const mode = getModeFromToolSlug(tool.slug);
          const theme = getModeTheme(mode);

          return (
            <article
              key={tool.slug}
              className={`rounded-3xl border ${theme.cardBorderClass} bg-white/90 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.07)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(15,23,42,0.12)]`}
            >
              <p className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${theme.pillClass}`}>
                {theme.label}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">{tool.h1}</h2>
              <p className="mt-2 text-sm text-slate-700">{tool.description}</p>
              <Link
                href={tool.path}
                className={`mt-4 inline-block rounded-xl px-4 py-2 text-sm font-semibold transition ${theme.buttonClass} ${theme.buttonHoverClass}`}
              >
                Open this test
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
