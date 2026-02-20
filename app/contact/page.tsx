import { appEnv } from "@/lib/env";

export default function ContactPage() {
  const email = appEnv.contactEmail || "support@example.com";

  return (
    <article className="space-y-4 rounded-3xl border border-white/40 bg-white/80 p-7 shadow-lg">
      <h1 className="text-3xl font-bold text-slate-900">Contact</h1>
      <p className="text-slate-700">For support, feedback, and partnership requests, contact us via email.</p>
      <a href={`mailto:${email}`} className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
        {email}
      </a>
      <p className="text-sm text-slate-500">For entertainment purposes only.</p>
    </article>
  );
}