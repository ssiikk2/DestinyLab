import { appEnv } from "@/lib/env";

export default function AboutPage() {
  return (
    <article className="premium-card space-y-4 p-7 md:p-9">
      <p className="label-caps">About</p>
      <h1 className="text-4xl font-semibold text-text-main">What {appEnv.siteName} does</h1>
      <p className="text-text-muted">
        Two tools: a two-person compatibility test and a one-person destiny test.
      </p>
      <p className="text-text-muted">
        We focus on fast, scannable output you can compare and share.
      </p>
      <p className="text-sm font-semibold text-text-tertiary">For entertainment purposes only.</p>
    </article>
  );
}
