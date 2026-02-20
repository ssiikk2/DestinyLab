interface InsightListProps {
  title: string;
  items: string[];
}

export function InsightList({ title, items }: InsightListProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <ul className="mt-3 space-y-2 text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}