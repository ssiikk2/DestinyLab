import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { getBaseUrl, appEnv } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "Love Compatibility Calculator",
    template: "%s | Love Compatibility Calculator",
  },
  description: appEnv.siteTagline,
  alternates: {
    canonical: getBaseUrl(),
  },
  openGraph: {
    title: "Love Compatibility Calculator",
    description: appEnv.siteTagline,
    type: "website",
    url: getBaseUrl(),
    siteName: "Love Compatibility Calculator",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {appEnv.adsEnabled && appEnv.adsenseClient ? (
          <Script
            strategy="afterInteractive"
            async
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${appEnv.adsenseClient}`}
          />
        ) : null}

        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 text-sm text-slate-700">
            <Link href="/" className="font-semibold text-slate-900">
              lovecompatibilitycalculator.com
            </Link>
            <Link href="/love-compatibility-calculator" className="hover:text-slate-900">
              Love Calculator
            </Link>
            <Link href="/tests" className="hover:text-slate-900">
              Tests
            </Link>
            <Link href="/zodiac-compatibility" className="hover:text-slate-900">
              Zodiac
            </Link>
            <Link href="/name-compatibility" className="hover:text-slate-900">
              Name
            </Link>
            <Link href="/birthday-compatibility" className="hover:text-slate-900">
              Birthday
            </Link>
            <Link href="/destiny-calculator" className="hover:text-slate-900">
              Destiny
            </Link>
            <Link href="/blog" className="hover:text-slate-900">
              Blog
            </Link>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-6 text-xs text-slate-600">
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
          </div>
        </footer>
      </body>
    </html>
  );
}
