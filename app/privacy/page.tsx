export default function PrivacyPage() {
  return (
    <article className="premium-card space-y-4 p-7 md:p-9">
      <p className="label-caps">Policy</p>
      <h1 className="text-4xl font-semibold text-text-main">Privacy</h1>
      <p className="text-text-muted">
        We keep data collection minimal. The goal is reliability, abuse prevention, and product improvement.
      </p>

      <h2 className="text-2xl font-semibold text-text-main">What we process</h2>
      <p className="text-text-muted">
        We may process IP, device metadata, and request logs. Inputs are used to generate readings and may be held temporarily for result links.
      </p>

      <h2 className="text-2xl font-semibold text-text-main">Cookies</h2>
      <p className="text-text-muted">
        Cookies may be used for analytics and advertising when enabled.
      </p>

      <h2 className="text-2xl font-semibold text-text-main">Your choice</h2>
      <p className="text-text-muted">If you do not want cookies, decline via browser controls and avoid accepting the cookie banner.</p>

      <p className="text-sm font-semibold text-text-tertiary">For entertainment purposes only.</p>
    </article>
  );
}