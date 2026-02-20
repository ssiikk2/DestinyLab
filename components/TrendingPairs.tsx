import Link from "next/link";
import { compatibilityPairPages } from "@/content/compatibility-pages";

export function TrendingPairs() {
  const topPairs = compatibilityPairPages.slice(0, 8);

  return (
    <section className="rounded-3xl border border-white/40 bg-white/75 p-6 shadow-lg backdrop-blur">
      <h2 className="text-xl font-bold text-slate-900">Trending Pairs</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {topPairs.map((pair) => (
          <Link
            key={pair.slug}
            href={`/compatibility/${pair.slug}`}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            {pair.signA} + {pair.signB}
          </Link>
        ))}
      </div>
    </section>
  );
}