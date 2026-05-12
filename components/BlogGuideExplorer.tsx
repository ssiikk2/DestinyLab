"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type BlogCategory = "All" | "Playful Tips" | "Zodiac Stories" | "Relationship Truths" | "Quiz Explained";

export interface BlogGuideItem {
  slug: string;
  path: string;
  h1: string;
  description: string;
  category: Exclude<BlogCategory, "All">;
}

const categoryStyles: Record<Exclude<BlogCategory, "All">, string> = {
  "Playful Tips": "border-fuchsia-200 bg-fuchsia-50/70",
  "Zodiac Stories": "border-teal-200 bg-teal-50/70",
  "Relationship Truths": "border-amber-200 bg-amber-50/70",
  "Quiz Explained": "border-sky-200 bg-sky-50/70",
};

const readingPaths = [
  {
    title: "I just got a score",
    links: [
      { href: "/blog/love-compatibility-score-meaning", label: "Read the score meaning" },
      { href: "/blog/next-steps-after-compatibility-score", label: "Pick next steps" },
      { href: "/calculator", label: "Run another score" },
    ],
  },
  {
    title: "I want practical improvement",
    links: [
      { href: "/blog/how-to-improve-relationship-compatibility", label: "Improve week by week" },
      { href: "/blog/daily-habits-to-improve-compatibility", label: "Build daily habits" },
      { href: "/true-love-test", label: "Check trust and effort" },
    ],
  },
  {
    title: "I am in a zodiac mood",
    links: [
      { href: "/zodiac", label: "Open the zodiac hub" },
      { href: "/blog/sign-compatibility-vs-real-life", label: "Compare signs with real life" },
      { href: "/zodiac-compatibility", label: "Run zodiac compatibility" },
    ],
  },
];

export function BlogGuideExplorer({ posts }: { posts: BlogGuideItem[] }) {
  const [category, setCategory] = useState<BlogCategory>("All");
  const [query, setQuery] = useState("");

  const visiblePosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesQuery =
        !normalized ||
        post.h1.toLowerCase().includes(normalized) ||
        post.description.toLowerCase().includes(normalized) ||
        post.slug.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [posts, category, query]);

  const featured = visiblePosts[0] || posts[0];
  const remaining = visiblePosts.filter((post) => post.slug !== featured?.slug);

  return (
    <div className="space-y-6">
      <header className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
        <div className="grid gap-0 lg:grid-cols-[1fr_0.85fr]">
          <div className="bg-gradient-to-br from-white via-slate-50 to-blue-50 p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Guide library</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-5xl">Compatibility Blog Hub</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700 md:text-base">
              Read score meanings, zodiac stories, and practical relationship frameworks before or after you run a
              compatibility test.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-bold text-slate-900">{posts.length}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Guides</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">4</p>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Topics</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">1</p>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Next action</p>
              </div>
            </div>
          </div>
          <aside className="border-t border-slate-200 bg-slate-950 p-6 text-white lg:border-l lg:border-t-0 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-sky-200">Featured read</p>
            <h2 className="mt-2 text-2xl font-semibold">{featured?.h1}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{featured?.description}</p>
            {featured ? (
              <Link
                href={featured.path}
                className="mt-5 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-100"
              >
                Read featured guide
              </Link>
            ) : null}
          </aside>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <label className="grid gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Search guides</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="score, zodiac, communication, low compatibility..."
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-900"
            />
          </label>
          <Link
            href="/calculator"
            className="rounded-xl bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-slate-800"
          >
            Run a test first
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["All", "Playful Tips", "Zodiac Stories", "Relationship Truths", "Quiz Explained"] as BlogCategory[]).map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  category === item ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>
            ),
          )}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {readingPaths.map((path) => (
          <article key={path.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{path.title}</h2>
            <div className="mt-3 space-y-2">
              {path.links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-800 hover:bg-white"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs">
                    {index + 1}
                  </span>
                  {link.label}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {remaining.map((post) => (
          <article
            key={post.slug}
            className={`rounded-3xl border p-5 shadow-[0_12px_30px_rgba(15,23,42,0.07)] ${categoryStyles[post.category]}`}
          >
            <p className="inline-flex rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-800">
              {post.category}
            </p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">{post.h1}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">{post.description}</p>
            <Link href={post.path} className="mt-4 inline-block text-sm font-semibold text-slate-900 underline">
              Read this guide
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
