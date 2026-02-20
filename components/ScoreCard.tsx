interface ScoreCardProps {
  score: number;
  label?: string;
  summary?: string;
}

export function ScoreCard({
  score,
  label = "Compatibility Score",
  summary,
}: ScoreCardProps) {
  return (
    <section className="premium-card relative overflow-hidden p-6 md:p-8 fade-up">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-accent/15 blur-3xl" />
      <p className="label-caps">{label}</p>
      <div className="mt-3 flex items-end gap-2">
        <span className="text-7xl font-semibold leading-none text-text-main md:text-8xl">{score}</span>
        <span className="mb-2 text-xl font-bold text-text-muted">/100</span>
      </div>
      {summary ? <p className="mt-4 max-w-2xl text-sm text-text-muted">{summary}</p> : null}
    </section>
  );
}