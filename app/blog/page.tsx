import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPages } from "@/content/seo-data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Compatibility Blog: Guides, FAQs, and Score Explanations",
  description:
    "Browse compatibility blog guides with score interpretation, zodiac chart basics, and relationship reflection tips.",
  path: "/blog",
});

export const revalidate = 86400;

export default function BlogIndexPage() {
  const posts = getBlogPages();

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <header className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Compatibility Blog</h1>
        <p className="text-sm text-slate-700 md:text-base">
          Long-form guides with practical explanations, clear examples, and internal links to calculators and zodiac match pages.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">How Love Calculators Work</h2>
          <p className="mt-2 text-sm text-slate-700">
            Learn the scoring model, practical limits, and how to use calculator results without overinterpreting one
            number.
          </p>
          <Link href="/blog/how-love-calculators-work" className="mt-4 inline-block text-sm font-semibold text-slate-900 underline">
            Read guide
          </Link>
        </article>

        {posts.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{post.h1}</h2>
            <p className="mt-2 text-sm text-slate-700">{post.description}</p>
            <Link href={post.path} className="mt-4 inline-block text-sm font-semibold text-slate-900 underline">
              Read guide
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
