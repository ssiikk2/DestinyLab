import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl space-y-6 px-4 py-12 text-center">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
        <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">404: Page not found</h1>
        <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base">
          The page you requested does not exist or was moved to a newer URL. Use the links below to continue with
          calculator pages, guides, and test hubs.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Go to homepage
          </Link>
          <Link
            href="/calculator"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Open calculator
          </Link>
          <Link
            href="/blog"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Read guides
          </Link>
        </div>
      </div>
      <p className="text-xs font-medium text-slate-600">All tools are for entertainment purposes and reflection.</p>
    </section>
  );
}
