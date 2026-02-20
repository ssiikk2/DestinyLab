interface ScoreCardProps {
  score: number;
  label?: string;
}

export function ScoreCard({ score, label = "Compatibility Score" }: ScoreCardProps) {
  return (
    <section className="rounded-3xl border border-white/40 bg-white/75 p-6 shadow-xl backdrop-blur md:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">{label}</p>
      <div className="mt-3 flex items-end gap-3">
        <span className="text-7xl font-extrabold leading-none text-slate-900 md:text-8xl">{score}</span>
        <span className="mb-2 text-2xl font-bold text-slate-500">/100</span>
      </div>
    </section>
  );
}