import type { Metadata } from "next";
import Link from "next/link";
import { getZodiacPages } from "@/content/seo-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Zodiac Compatibility Hub",
  description:
    "Explore zodiac compatibility pages with score context, strengths, challenges, FAQs, and related links.",
  path: "/zodiac",
});

export const revalidate = 86400;

export default function ZodiacHubPage() {
  const pages = getZodiacPages();

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <header className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Zodiac Compatibility Hub</h1>
        <p className="text-sm text-slate-700 md:text-base">
          Sign-by-sign compatibility pages with practical reading tips and direct internal links.
        </p>
      </header>

      <ul className="grid gap-3 md:grid-cols-2">
        {pages.map((page) => (
          <li key={page.slug} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <Link
              href={page.path}
              className="text-sm font-semibold text-slate-900 underline decoration-slate-400 hover:decoration-slate-900"
            >
              {page.h1}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
