import Link from "next/link";

const popularPaths = [
  {
    label: "Start fast",
    title: "Main compatibility score",
    href: "/calculator",
    score: "2 min",
    note: "Best first stop for a broad score, result meaning, and one practical next move.",
  },
  {
    label: "Compare vibes",
    title: "Name chemistry test",
    href: "/name-compatibility",
    score: "Quick",
    note: "Useful when you want a lighter read before sharing a result.",
  },
  {
    label: "Check the spark",
    title: "Zodiac compatibility",
    href: "/zodiac-compatibility",
    score: "Pair",
    note: "Good for reading attraction, tension, and conflict style through signs.",
  },
  {
    label: "Go deeper",
    title: "True love test",
    href: "/true-love-test",
    score: "Deep",
    note: "Better when trust, effort, and long-term rhythm matter more than a quick number.",
  },
];

const trendingPairs = [
  { pair: "Aries + Scorpio", href: "/compatibility/aries-and-scorpio", cue: "Magnetic but intense" },
  { pair: "Taurus + Libra", href: "/compatibility/taurus-and-libra", cue: "Soft charm, real pacing questions" },
  { pair: "Cancer + Pisces", href: "/compatibility/cancer-and-pisces", cue: "Emotional flow with strong intuition" },
  { pair: "Gemini + Capricorn", href: "/compatibility/gemini-and-capricorn", cue: "Fast mind meets steady structure" },
];

const resultIdeas = [
  "Run one test, then compare only one extra angle.",
  "Look for repeated themes before believing one score.",
  "Share the result with a question, not a verdict.",
];

export function LiveCompatibilityBoard() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Compatibility board</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Popular paths to try next</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
            Use this as a quick route map: start with one result, compare one angle, then share the part that actually
            feels accurate.
          </p>
        </div>
        <Link href="/tests" className="text-sm font-semibold text-slate-900 hover:text-slate-600">
          Open all tests
        </Link>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="grid gap-3 md:grid-cols-2">
          {popularPaths.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">{item.label}</p>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                  {item.score}
                </span>
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{item.note}</p>
            </Link>
          ))}
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-sky-200">Trending pairs</p>
          <div className="mt-3 space-y-2">
            {trendingPairs.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl border border-white/10 bg-white/10 p-3 transition hover:bg-white/15"
              >
                <p className="text-sm font-semibold text-white">{item.pair}</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">{item.cue}</p>
              </Link>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-3">
        {resultIdeas.map((idea) => (
          <p key={idea} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
            {idea}
          </p>
        ))}
      </div>
    </section>
  );
}
