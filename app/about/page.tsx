import { appEnv } from "@/lib/env";

export default function AboutPage() {
  return (
    <article className="premium-card space-y-4 p-7 md:p-9">
      <p className="label-caps">About</p>
      <h1 className="text-4xl font-semibold text-text-main">What {appEnv.siteName} is for</h1>
      <p className="text-text-muted">
        {appEnv.siteName} gives quick compatibility and destiny reads you can scan, share, and run again.
      </p>
      <p className="text-text-muted">
        The product is built for clarity: short sections, practical actions, and no heavy signup flow.
      </p>
      <p className="text-sm font-semibold text-text-tertiary">For entertainment purposes only.</p>
    </article>
  );
}