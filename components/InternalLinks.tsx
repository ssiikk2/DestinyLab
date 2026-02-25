import Link from "next/link";

export interface InternalLinkItem {
  href: string;
  title: string;
  keyword: string;
  description: string;
}

interface InternalLinksProps {
  heading?: string;
  links: InternalLinkItem[];
}

export function InternalLinks({ heading = "More tests and reads", links }: InternalLinksProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
      <h2 className="text-2xl font-semibold text-slate-900">{heading}</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {links.map((link) => (
          <Link
            key={`${link.href}-${link.keyword}`}
            href={link.href}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{link.keyword}</p>
            <h3 className="mt-1 text-base font-semibold text-slate-900">{link.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
