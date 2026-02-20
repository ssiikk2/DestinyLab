import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Manrope, Fraunces } from "next/font/google";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { appEnv, getBaseUrl } from "@/lib/env";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const headingFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: `${appEnv.siteName} | ${appEnv.siteTagline}`,
    template: `%s | ${appEnv.siteName}`,
  },
  description: appEnv.siteTagline,
  openGraph: {
    title: appEnv.siteName,
    description: appEnv.siteTagline,
    type: "website",
    url: getBaseUrl(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable} min-h-screen text-text-main antialiased`}>
        {appEnv.adsEnabled && appEnv.adsenseClient ? (
          <Script
            strategy="afterInteractive"
            async
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${appEnv.adsenseClient}`}
          />
        ) : null}

        <header className="sticky top-0 z-40 border-b border-border-soft/70 bg-[#f7f6f2cc] backdrop-blur-xl">
          <div className="app-shell flex h-16 items-center justify-between gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-base font-semibold text-text-main">
              <span className="rounded-full bg-brand-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                DL
              </span>
              <span>{appEnv.siteName}</span>
            </Link>

            <nav className="flex items-center gap-3 text-sm font-semibold text-text-muted">
              <Link href="/#compatibility-form" className="rounded-full px-3 py-1.5 transition hover:bg-white hover:text-text-main">
                Compatibility
              </Link>
              <Link href="/#destiny-form" className="rounded-full px-3 py-1.5 transition hover:bg-white hover:text-text-main">
                Destiny
              </Link>
              <Link href="/blog/destiny-reading-birth-date-basics" className="rounded-full px-3 py-1.5 transition hover:bg-white hover:text-text-main">
                Guide
              </Link>
            </nav>
          </div>
        </header>

        <main className="app-shell flex-1 py-8 md:py-10">{children}</main>

        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}