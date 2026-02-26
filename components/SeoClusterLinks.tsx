import Link from "next/link";

const RELATED_GUIDES = [
  { href: "/blog/love-compatibility-score-meaning", label: "Love compatibility score meaning" },
  { href: "/blog/70-love-compatibility-score-meaning", label: "What a 70 score means" },
  { href: "/blog/low-compatibility-score-meaning", label: "Low score meaning" },
  { href: "/blog/is-love-compatibility-calculator-accurate", label: "How accurate calculators are" },
  { href: "/blog/how-to-improve-relationship-compatibility", label: "How to improve compatibility" },
  { href: "/blog/next-steps-after-compatibility-score", label: "Next steps after a score" },
];

const RELATED_TESTS = [
  { href: "/calculator", label: "Primary Love Compatibility Tool" },
  { href: "/true-love-test", label: "True Love Test" },
];

const RELATED_PAIRS = [
  { href: "/compatibility/cancer-and-libra", label: "Cancer and Libra" },
  { href: "/compatibility/leo-and-aries", label: "Leo and Aries" },
  { href: "/compatibility/scorpio-and-pisces", label: "Scorpio and Pisces" },
  { href: "/compatibility/taurus-and-capricorn", label: "Taurus and Capricorn" },
];

export function SeoClusterLinks() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
      <h2 className="text-2xl font-semibold text-slate-900">Keep Exploring</h2>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-600">Related guides</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {RELATED_GUIDES.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline decoration-slate-300 hover:decoration-slate-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-600">Related tests</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {RELATED_TESTS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline decoration-slate-300 hover:decoration-slate-900">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-600">Zodiac pairs</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {RELATED_PAIRS.map((item) => (
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
