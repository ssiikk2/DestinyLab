import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { CookieConsent } from "@/components/CookieConsent";
import { SiteHeader } from "@/components/SiteHeader";
import { appEnv } from "@/lib/env";
import { CANONICAL_ORIGIN } from "@/lib/seo";
import "./globals.css";

const ADSENSE_CLIENT = "ca-pub-9161450133304636";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_ORIGIN),
  title: "Love Compatibility Calculator",
  description: appEnv.siteTagline,
  other: {
    "google-adsense-account": ADSENSE_CLIENT,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ url: "/icons/faviconfinal.png?v=20260303b", type: "image/png", sizes: "512x512" }],
    shortcut: ["/favicon.ico?v=20260303b"],
    apple: [{ url: "/icons/faviconfinal.png?v=20260303b", sizes: "180x180", type: "image/png" }],
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
  const adsenseScriptSrc = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

  return (
    <html lang="en">
      <head>
        <script
          async
          crossOrigin="anonymous"
          src={adsenseScriptSrc}
        />
        {GA_ID ? <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" /> : null}
        {GA_ID ? (
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        ) : null}
      </head>
      <body id="page-top">
        <script async crossOrigin="anonymous" src={adsenseScriptSrc} />

        <SiteHeader />

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
            src="/brand/favicon2.png"
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
