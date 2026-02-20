import { appEnv } from "@/lib/env";

export default function AboutPage() {
  return (
    <article className="space-y-4 rounded-3xl border border-white/40 bg-white/80 p-7 shadow-lg">
      <h1 className="text-3xl font-bold text-slate-900">About {appEnv.siteName}</h1>
      <p className="text-slate-700">
        {appEnv.siteName} is a tool-centric reading website focused on compatibility and destiny experiences that are quick, shareable, and easy to revisit.
      </p>
      <p className="text-slate-700">
        We prioritize practical sections, lightweight performance, and gradual SEO growth with policy-safe monetization.
      </p>
      <p className="text-sm text-slate-500">For entertainment purposes only.</p>
    </article>
  );
}