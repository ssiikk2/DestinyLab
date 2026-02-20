export default function PrivacyPage() {
  return (
    <article className="space-y-4 rounded-3xl border border-white/40 bg-white/80 p-7 shadow-lg">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="text-slate-700">
        DestinyLab collects minimal usage data to keep tools reliable, prevent abuse, and improve product quality.
      </p>
      <h2 className="text-2xl font-bold text-slate-900">What we collect</h2>
      <p className="text-slate-700">
        We may process IP address, request metadata, and browser-level analytics. Reading inputs are processed to generate results and are stored in memory for a limited period.
      </p>
      <h2 className="text-2xl font-bold text-slate-900">Cookies</h2>
      <p className="text-slate-700">
        We use a consent banner and may use cookies for analytics and advertising when enabled.
      </p>
      <h2 className="text-2xl font-bold text-slate-900">Contact</h2>
      <p className="text-slate-700">For privacy requests, use the Contact page.</p>
      <p className="text-sm text-slate-500">For entertainment purposes only.</p>
    </article>
  );
}