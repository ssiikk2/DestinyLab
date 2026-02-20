export default function TermsPage() {
  return (
    <article className="premium-card space-y-4 p-7 md:p-9">
      <p className="label-caps">Policy</p>
      <h1 className="text-4xl font-semibold text-text-main">Terms</h1>
      <p className="text-text-muted">
        By using this site, you agree to use it lawfully and for personal entertainment.
      </p>

      <h2 className="text-2xl font-semibold text-text-main">No professional advice</h2>
      <p className="text-text-muted">
        Readings are informational only. They are not medical, legal, financial, or mental health advice.
      </p>

      <h2 className="text-2xl font-semibold text-text-main">Availability</h2>
      <p className="text-text-muted">
        Features may change without notice as we improve quality, safety, and policy compliance.
      </p>

      <p className="text-sm font-semibold text-text-tertiary">For entertainment purposes only.</p>
    </article>
  );
}