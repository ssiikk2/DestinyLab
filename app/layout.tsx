import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { CookieConsent } from "@/components/CookieConsent";
import { SiteHeader } from "@/components/SiteHeader";
import { appEnv } from "@/lib/env";
import { guidesNav, toolsNav } from "@/lib/nav";
import { CANONICAL_ORIGIN } from "@/lib/seo";
import "./globals.css";

const ADSENSE_CLIENT = appEnv.adsenseClient || "ca-pub-9161450133304636";
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
  const shouldLoadAdsense = appEnv.adsEnabled && ADSENSE_CLIENT;

  return (
    <html lang="en">
      <head>
        {shouldLoadAdsense ? (
          <Script async crossOrigin="anonymous" src={adsenseScriptSrc} strategy="afterInteractive" />
        ) : null}
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
        <SiteHeader />

        <main>{children}</main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 text-sm text-slate-600 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <section>
              <p className="text-base font-semibold text-slate-900">Love Compatibility Calculator</p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
                Fun relationship tests, score meanings, and shareable results for curious hearts.
              </p>
              <p className="mt-3 text-xs font-medium text-slate-500">
                All readings are for entertainment and reflection.
              </p>
            </section>

            <nav aria-label="Popular tests">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-900">Popular Tests</p>
              <ul className="mt-3 space-y-2">
                {toolsNav.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-slate-900">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Compatibility guides">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-900">Guides</p>
              <ul className="mt-3 space-y-2">
                {guidesNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-slate-900">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Site policies">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-900">Site</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/privacy" className="hover:text-slate-900">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className="hover:text-slate-900">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-slate-900">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="hover:text-slate-900">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-slate-900">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-slate-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
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
