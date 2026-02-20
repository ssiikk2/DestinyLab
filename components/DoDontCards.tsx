interface DoDontCardsProps {
  dos: string[];
  donts: string[];
}

export function DoDontCards({ dos, donts }: DoDontCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <h3 className="text-lg font-bold text-emerald-900">Do</h3>
        <ul className="mt-3 space-y-2 text-emerald-800">
          {dos.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
        <h3 className="text-lg font-bold text-rose-900">Avoid</h3>
        <ul className="mt-3 space-y-2 text-rose-800">
          {donts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}