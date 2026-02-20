interface InsightListProps {
  title: string;
  items: string[];
}

export function InsightList({ title, items }: InsightListProps) {
  return (
    <section className="premium-card p-5 fade-up">
      <p className="label-caps">Section Snapshot</p>
      <h3 className="mt-1 text-2xl font-semibold text-text-main">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}