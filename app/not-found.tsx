import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-3xl border border-white/40 bg-white/80 p-8 text-center shadow-lg">
      <h1 className="text-3xl font-bold text-slate-900">Reading not found</h1>
      <p className="mt-3 text-slate-600">
        This reading may have expired because results are stored in memory with a limited TTL.
      </p>
      <Link
        href="/"
        className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
      >
        Create a new reading
      </Link>
    </div>
  );
}