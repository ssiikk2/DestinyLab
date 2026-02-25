import type { Metadata } from "next";
import { ZodiacHubExplorer } from "@/components/ZodiacHubExplorer";
import { getZodiacPages } from "@/content/seo-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Zodiac Match Hub",
  description:
    "Pick two signs, open your match result, and explore fun zodiac pair readings.",
  path: "/zodiac",
});

export const revalidate = 86400;

export default function ZodiacHubPage() {
  const pages = getZodiacPages();

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <header className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Zodiac Match Hub</h1>
        <p className="text-sm text-slate-700 md:text-base">
          Some sign pairs feel like fireworks, others feel like slow-burn poetry. Pick two signs and open their story.
        </p>
      </header>

      <ZodiacHubExplorer pages={pages.map((page) => ({ slug: page.slug, path: page.path, h1: page.h1 }))} />
    </section>
  );
}
