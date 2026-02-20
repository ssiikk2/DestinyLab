import Link from "next/link";

export default function NotFound() {
  return (
    <div className="premium-card space-y-3 p-8 text-center">
      <h1 className="text-3xl font-semibold text-text-main">Page not found</h1>
      <p className="text-text-muted">That link is missing or expired. Run a fresh reading from the homepage.</p>
      <Link
        href="/"
        className="mx-auto mt-3 inline-flex rounded-full bg-brand-primary px-5 py-2 text-sm font-bold text-white hover:bg-[#2b2f8f]"
      >
        Back to home
      </Link>
    </div>
  );
}