import Link from "next/link";
import { getInternalLinksForScore } from "@/lib/internal-link-engine";

interface InternalLinkEngineProps {
  score: number;
}

export function InternalLinkEngine({ score }: InternalLinkEngineProps) {
  const links = getInternalLinksForScore(score);
  const heading =
    score < 60
      ? "Repair guides for low scores"
      : score < 80
        ? "Growth articles for mid scores"
        : "Long-term compatibility resources";

  return (
    <section className="premium-card p-5 fade-up">
      <p className="label-caps">Next reads</p>
      <h3 className="mt-1 text-2xl font-semibold text-text-main">{heading}</h3>
      <ul className="mt-3 space-y-2 text-sm text-text-muted">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="font-semibold underline decoration-border-soft hover:decoration-text-main">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
