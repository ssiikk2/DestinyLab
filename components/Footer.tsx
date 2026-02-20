import Link from "next/link";
import { appEnv } from "@/lib/env";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p>{appEnv.siteName} - For entertainment purposes only.</p>
        <nav className="flex flex-wrap items-center gap-3">
          <Link href="/privacy" className="hover:text-slate-900">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-slate-900">
            Terms
          </Link>
          <Link href="/disclaimer" className="hover:text-slate-900">
            Disclaimer
          </Link>
          <Link href="/contact" className="hover:text-slate-900">
            Contact
          </Link>
          <Link href="/about" className="hover:text-slate-900">
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}