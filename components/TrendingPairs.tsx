import Link from "next/link";
import { compatibilityPairPages } from "@/content/compatibility-pages";

const trendNotes = [
  "High spark, high growth",
  "Strong long-term rhythm",
  "Fast chemistry",
  "Great communication upside",
  "Emotionally steady",
  "Magnetic but needs pacing",
  "Good balance of fire and calm",
  "Best with clear boundaries",
];

export function TrendingPairs() {
  const topPairs = compatibilityPairPages.slice(0, 8);

  return (
    <section className="premium-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="label-caps">Trending</p>
          <h2 className="mt-1 text-2xl font-semibold text-text-main">Pairings people are checking</h2>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {topPairs.map((pair, index) => (
          <Link
            key={pair.slug}
            href={`/compatibility/${pair.slug}`}
            className="soft-hover rounded-2xl border border-border-soft bg-white p-4"
          >
            <p className="text-base font-semibold text-text-main">
              {pair.signA} + {pair.signB}
            </p>
            <p className="mt-1 text-sm text-text-muted">{trendNotes[index] || "Worth a quick check"}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}