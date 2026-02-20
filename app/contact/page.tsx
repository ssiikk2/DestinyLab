import { appEnv } from "@/lib/env";

export default function ContactPage() {
  const email = appEnv.contactEmail || "support@example.com";

  return (
    <article className="premium-card space-y-4 p-7 md:p-9">
      <p className="label-caps">Contact</p>
      <h1 className="text-4xl font-semibold text-text-main">Need help?</h1>
      <p className="text-text-muted">Questions, bug reports, and partnership notes are all welcome.</p>
      <a
        href={`mailto:${email}`}
        className="inline-flex rounded-full bg-brand-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-[#2b2f8f]"
      >
        {email}
      </a>
      <p className="text-sm font-semibold text-text-tertiary">For entertainment purposes only.</p>
    </article>
  );
}