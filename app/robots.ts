import type { MetadataRoute } from "next";
import { CANONICAL_ORIGIN } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    host: new URL(CANONICAL_ORIGIN).host,
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${CANONICAL_ORIGIN}/sitemap.xml`,
  };
}
