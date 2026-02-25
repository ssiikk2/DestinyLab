import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CookieConsent } from "@/components/CookieConsent";
import { appEnv } from "@/lib/env";
import { CANONICAL_ORIGIN } from "@/lib/seo";
import "./globals.css";

const ADSENSE_CLIENT = "ca-pub-9161450133304636";

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_ORIGIN),
  title: {
    default: "Love Compatibility Calculator",
    template: "%s | Love Compatibility Calculator",
  },
  description: appEnv.siteTagline,
  other: {
    "google-adsense-account": ADSENSE_CLIENT,
  },
  alternates: {
    canonical: CANONICAL_ORIGIN,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icons/faviconfinal.png", type: "image/png", sizes: "512x512" }],
    shortcut: ["/icons/faviconfinal.png"],
    apple: [{ url: "/icons/faviconfinal.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Love Compatibility Calculator",
    description: appEnv.siteTagline,
    type: "website",
    url: CANONICAL_ORIGIN,
    siteName: "Love Compatibility Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Love Compatibility Calculator",
    description: appEnv.siteTagline,
    images: [`${CANONICAL_ORIGIN}/og?tool=compatibility&score=88&label=Love%20Compatibility`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        />
      </head>
      <body id="page-top">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-2.5 text-sm text-slate-700">
            <Link href="/" className="inline-flex items-center gap-2.5 font-semibold text-slate-900">
              <Image
                src="/icons/faviconfinal.png"
                alt="Love Compatibility Calculator home"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full border border-slate-200 bg-white shadow-sm md:h-14 md:w-14"
                priority
              />
              <span className="text-[15px] leading-none md:text-base">lovecompatibilitycalculator</span>
            </Link>
            <Link
              href="/calculator"
              className="rounded-full bg-slate-900 px-3 py-1.5 font-semibold text-white transition hover:bg-slate-800"
            >
              Primary Tool
            </Link>
            <Link href="/tests" className="hover:text-slate-900">
              All Tests
            </Link>
            <Link href="/zodiac" className="hover:text-slate-900">
              Zodiac Hub
            </Link>
            <Link href="/zodiac-compatibility" className="hover:text-slate-900">
              Zodiac Test
            </Link>
            <Link href="/name-compatibility" className="hover:text-slate-900">
              Name
            </Link>
            <Link href="/birthday-compatibility" className="hover:text-slate-900">
              Birthday
            </Link>
            <Link href="/destiny" className="hover:text-slate-900">
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
            <span className="mr-2 text-slate-500">Fun readings for curious hearts.</span>
            <Link href="/privacy" className="hover:text-slate-900">
              Privacy
            </Link>
            <Link href="/cookie-policy" className="hover:text-slate-900">
              Cookie Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-900">
              Terms
            </Link>
            <Link href="/disclaimer" className="hover:text-slate-900">
              Disclaimer
            </Link>
            <Link href="/about" className="hover:text-slate-900">
              About
            </Link>
            <Link href="/contact" className="hover:text-slate-900">
              Contact
            </Link>
          </div>
        </footer>

        <a
          href="#page-top"
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-50 inline-flex h-16 w-16 flex-col items-center justify-center rounded-full border border-slate-200 bg-white/95 shadow-[0_10px_24px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-white"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-700">Top</span>
          <Image
            src="/icons/faviconfinal.png"
            alt="Back to top"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
        </a>

        <CookieConsent />
      </body>
    </html>
  );
}
