import type { NextConfig } from "next";

const CANONICAL_HOST = "lovecompatibilitycalculator.com";
const LEGACY_HOST = "www.lovecompatibilitycalculator.com";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: LEGACY_HOST }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          { type: "host", value: CANONICAL_HOST },
          { type: "header", key: "x-forwarded-proto", value: "http" },
        ],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
      {
        source: "/love-compatibility-calculator",
        destination: "/calculator",
        permanent: true,
      },
      {
        source: "/destiny-calculator",
        destination: "/destiny",
        permanent: true,
      },
      {
        source: "/crush-compatibility",
        destination: "/crush-calculator",
        permanent: true,
      },
      {
        source: "/initials-compatibility",
        destination: "/initials-love-test",
        permanent: true,
      },
      {
        source: "/favicon.ico",
        destination: "/icons/favicon3.png",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" }],
      },
      {
        source: "/robots.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
