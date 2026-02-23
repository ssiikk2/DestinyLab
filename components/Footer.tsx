import Link from "next/link";
import { appEnv } from "@/lib/env";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border-soft bg-[#f0ece4cc] backdrop-blur-sm">
      <div className="app-shell flex flex-col gap-4 py-8 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
        <p>
          {appEnv.siteName}. Quick tests. Shareable results. <span className="font-semibold">For entertainment.</span>
        </p>
        <nav className="flex flex-wrap items-center gap-3">
          <Link href="/privacy" className="hover:text-text-main">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-text-main">
            Terms
          </Link>
          <Link href="/disclaimer" className="hover:text-text-main">
            Disclaimer
          </Link>
          <Link href="/contact" className="hover:text-text-main">
            Contact
          </Link>
          <Link href="/about" className="hover:text-text-main">
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}
