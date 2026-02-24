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
    icon: [{ url: "/icons/favicon3.png", type: "image/png", sizes: "512x512" }],
    shortcut: ["/icons/favicon3.png"],
    apple: [{ url: "/icons/favicon3.png", sizes: "180x180", type: "image/png" }],
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
      <body>
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-2.5 text-sm text-slate-700">
            <Link href="/" className="inline-flex items-center gap-2.5 font-semibold text-slate-900">
              <Image
                src="/brand/favicon2.png"
                alt="Love Compatibility Calculator home"
                width={40}
                height={40}
                className="h-10 w-10 rounded-md border border-slate-200 bg-white shadow-sm md:h-11 md:w-11"
                priority
              />
              <span className="text-[15px] leading-none md:text-base">lovecompatibilitycalculator</span>
            </Link>
            <Link href="/calculator" className="hover:text-slate-900">
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

        <CookieConsent />
      </body>
    </html>
  );
}
