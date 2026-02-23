interface ScoreCardProps {
  score: number;
  label?: string;
  summary?: string;
}

function scoreBand(score: number): string {
  if (score >= 85) return "High match";
  if (score >= 72) return "Good match";
  if (score >= 60) return "Mixed match";
  return "Needs work";
}

export function ScoreCard({
  score,
  label = "Compatibility score",
  summary,
}: ScoreCardProps) {
  return (
    <section className="premium-card relative overflow-hidden p-6 md:p-8 fade-up">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-accent/15 blur-3xl" />
      <p className="label-caps">{label}</p>
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <span className="text-7xl font-semibold leading-none text-text-main md:text-8xl">{score}</span>
        <span className="mb-2 text-xl font-bold text-text-muted">/100</span>
        <span className="mb-3 rounded-full border border-border-soft bg-white px-3 py-1 text-xs font-semibold text-text-main">
          {scoreBand(score)}
        </span>
      </div>
      {summary ? <p className="mt-3 max-w-2xl text-sm text-text-muted">{summary}</p> : null}
    </section>
  );
}
