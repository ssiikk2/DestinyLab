import Link from "next/link";
import { getClusterLinks, type ClusterContext } from "@/lib/content-map";

interface InternalLinkClusterProps {
  context?: ClusterContext;
}

export function InternalLinkCluster({ context }: InternalLinkClusterProps) {
  const links = getClusterLinks(context);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
      <h2 className="text-2xl font-semibold text-slate-900">Keep Exploring</h2>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-600">Related guides</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {links.relatedGuides.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline decoration-slate-300 hover:decoration-slate-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-600">Related tools</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {links.relatedTools.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline decoration-slate-300 hover:decoration-slate-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-600">Trending zodiac pairs</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {links.trendingPairs.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline decoration-slate-300 hover:decoration-slate-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
