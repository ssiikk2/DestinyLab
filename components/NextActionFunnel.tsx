import Link from "next/link";

interface NextActionFunnelProps {
  score?: number;
  context?: "home" | "result" | "tool";
}

const actionsByBand = {
  high: {
    label: "Protect the spark",
    headline: "Your next step is to make the strong part repeatable.",
    note: "High scores work best when you turn the best signal into one tiny habit, then compare one extra angle only if curiosity is still high.",
    primary: { href: "/true-love-test", label: "Check long-term signal" },
    secondary: { href: "/couple-test", label: "Try the couple test" },
  },
  middle: {
    label: "Find the pattern",
    headline: "Your next step is to separate chemistry from confusion.",
    note: "Mixed scores usually need one more lens. Compare the same pair with name, zodiac, or birthday compatibility and watch for repeated themes.",
    primary: { href: "/name-compatibility", label: "Compare by name" },
    secondary: { href: "/zodiac-compatibility", label: "Compare zodiac signs" },
  },
  low: {
    label: "Lower the pressure",
    headline: "Your next step is a calmer read, not a bigger conclusion.",
    note: "Low scores are most useful when they point to one friction point. Use the guide, choose one expectation, then retest later.",
    primary: { href: "/blog/what-is-a-good-love-compatibility-score", label: "Read score meaning" },
    secondary: { href: "/friendship-compatibility", label: "Check friendship fit" },
  },
} as const;

const defaultAction = {
  label: "Build your path",
  headline: "Start with one result, then compare one useful angle.",
  note: "The strongest session flow is simple: get a score, read the meaning, save the card, then try one related test.",
  primary: { href: "/calculator", label: "Start main calculator" },
  secondary: { href: "/tests", label: "Browse all tests" },
};

const journeySteps = [
  {
    step: "01",
    title: "Get the score",
    text: "Run the fast calculator and read the score band before jumping to a conclusion.",
  },
  {
    step: "02",
    title: "Compare one angle",
    text: "Use name, zodiac, birthday, or true love only if it answers a different question.",
  },
  {
    step: "03",
    title: "Share the card",
    text: "Send the result with one question so the score starts a real conversation.",
  },
];

function pickAction(score?: number) {
  if (typeof score !== "number") return defaultAction;
  if (score >= 75) return actionsByBand.high;
  if (score >= 50) return actionsByBand.middle;
  return actionsByBand.low;
}

export function NextActionFunnel({ score, context = "tool" }: NextActionFunnelProps) {
  const action = pickAction(score);
  const eyebrow = context === "result" ? "Keep going" : "Conversion path";

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
      <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-slate-950 p-6 text-white md:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-sky-200">{eyebrow}</p>
          <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-white">
            {action.label}
          </div>
          <h2 className="mt-4 text-2xl font-black leading-tight md:text-3xl">{action.headline}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-200">{action.note}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={action.primary.href}
              className="rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-slate-950 transition hover:bg-slate-100"
            >
              {action.primary.label}
            </Link>
            <Link
              href={action.secondary.href}
              className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-black text-white transition hover:bg-white/15"
            >
              {action.secondary.label}
            </Link>
          </div>
        </div>
        <div className="grid gap-3 p-6 md:p-7">
          {journeySteps.map((item) => (
            <article key={item.step} className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-black text-slate-950 shadow-sm">
                {item.step}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-950">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-700">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
