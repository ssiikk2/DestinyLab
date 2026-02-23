interface DoDontCardsProps {
  dos: string[];
  donts: string[];
}

export function DoDontCards({ dos, donts }: DoDontCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 fade-up">
      <section className="premium-card p-5">
        <p className="label-caps text-emerald-700">Do</p>
        <ul className="mt-3 space-y-2 text-sm text-text-muted">
          {dos.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-600" />
              <span className="leading-6">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="premium-card p-5">
        <p className="label-caps text-rose-700">Don&apos;t</p>
        <ul className="mt-3 space-y-2 text-sm text-text-muted">
          {donts.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-600" />
              <span className="leading-6">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
