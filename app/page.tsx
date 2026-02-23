import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { buildMetadata } from "@/lib/seo";
import { getBlogPages, getToolPages, getZodiacPages, initialPageCount } from "@/content/seo-data";
import { getModeFromToolSlug, getModeTheme } from "@/lib/test-themes";

export const metadata: Metadata = buildMetadata({
  title: "Love Compatibility Calculator and Test Hub",
  description:
    "Open each compatibility test page directly: love, name, initials, crush, friendship, zodiac, birthday, and destiny tools.",
  path: "/",
});

export default function HomePage() {
  const tools = getToolPages();
  const blogs = getBlogPages();
  const zodiac = getZodiacPages().slice(0, 8);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-cyan-50 p-7 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
        <p className="inline-flex rounded-full border border-cyan-200 bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
          Compatibility Test Hub
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Find the right test and start instantly</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-700 md:text-base">
          Every test card opens its own dedicated page. Name compatibility, initials, crush, friendship, zodiac,
          birthday, and destiny tests are all ready.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/tests" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
            Open all tests
          </Link>
          <Link href="/name-compatibility" className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
            Start name compatibility
          </Link>
        </div>
        <p className="mt-3 text-xs text-slate-600">Launch set: {initialPageCount + 1} pages including the homepage.</p>
      </section>

      <AdSlot placement="aboveFold" size="leaderboard" />

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
              <h2 className="mt-3 text-lg font-semibold text-slate-900">{tool.h1}</h2>
              <p className="mt-2 text-sm text-slate-700">{tool.description}</p>
              <Link
                href={tool.path}
                className={`mt-4 inline-block rounded-xl px-4 py-2 text-sm font-semibold transition ${theme.buttonClass} ${theme.buttonHoverClass}`}
              >
                Start this test
              </Link>
            </article>
          );
        })}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
        <h2 className="text-2xl font-semibold text-slate-900">Top zodiac pages</h2>
        <ul className="mt-3 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
          {zodiac.map((pair) => (
            <li key={pair.slug}>
              <Link href={pair.path} className="underline decoration-slate-400 hover:decoration-slate-900">
                {pair.h1}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
        <h2 className="text-2xl font-semibold text-slate-900">High RPM blog topics</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {blogs.map((post) => (
            <li key={post.slug}>
              <Link href={post.path} className="underline decoration-slate-400 hover:decoration-slate-900">
                {post.h1}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-xs font-medium text-slate-600">For reflection and entertainment purposes.</p>
    </div>
  );
}
