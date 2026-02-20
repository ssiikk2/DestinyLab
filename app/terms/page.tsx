export default function TermsPage() {
  return (
    <article className="space-y-4 rounded-3xl border border-white/40 bg-white/80 p-7 shadow-lg">
      <h1 className="text-3xl font-bold text-slate-900">Terms of Use</h1>
      <p className="text-slate-700">
        By using DestinyLab, you agree to use the website for lawful purposes and personal entertainment.
      </p>
      <h2 className="text-2xl font-bold text-slate-900">No professional advice</h2>
      <p className="text-slate-700">
        Content and readings are informational and entertainment-focused. They do not replace medical, legal, or financial advice.
      </p>
      <h2 className="text-2xl font-bold text-slate-900">Availability</h2>
      <p className="text-slate-700">
        We may update, pause, or remove features at any time to improve reliability and policy compliance.
      </p>
      <p className="text-sm text-slate-500">For entertainment purposes only.</p>
    </article>
  );
}