import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { appEnv, getBaseUrl } from "@/lib/env";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "600", "700"],
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
      <body className={`${grotesk.variable} ${cormorant.variable} app-bg min-h-screen text-slate-900 antialiased`}>
        {appEnv.adsEnabled && appEnv.adsenseClient ? (
          <Script
            strategy="afterInteractive"
            async
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${appEnv.adsenseClient}`}
          />
        ) : null}
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4">
          <header className="py-6">
            <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900">
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs uppercase tracking-[0.15em] text-white">Destiny</span>
              {appEnv.siteName}
            </Link>
            <p className="mt-2 text-sm text-slate-600">{appEnv.siteTagline}</p>
          </header>
          <main className="flex-1 pb-12">{children}</main>
        </div>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}