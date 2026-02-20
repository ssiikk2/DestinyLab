export type AIProvider = "gemini" | "openai";
export type AIMode = "draft" | "polish";

function asBool(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) {
    return fallback;
  }

  return value.toLowerCase() === "true";
}

function asEnum<T extends string>(
  value: string | undefined,
  allowed: T[],
  fallback: T,
): T {
  if (!value) {
    return fallback;
  }

  return allowed.includes(value as T) ? (value as T) : fallback;
}

export const appEnv = {
  siteName: process.env.SITE_NAME || "DestinyLab",
  siteTagline:
    process.env.SITE_TAGLINE || "AI Compatibility & Destiny Readings",
  siteToolMode: process.env.SITE_TOOL_MODE || "compatibility",
  siteThemeAccent: process.env.SITE_THEME_ACCENT || "violet",
  siteDomain: process.env.SITE_DOMAIN,
  contactEmail: process.env.CONTACT_EMAIL,
  adsEnabled: asBool(process.env.ADS_ENABLED, false),
  adsenseClient: process.env.ADSENSE_CLIENT,
  adsenseSlotTop: process.env.ADSENSE_SLOT_TOP,
  aiProvider: asEnum<AIProvider>(
    process.env.AI_PROVIDER,
    ["gemini", "openai"],
    "gemini",
  ),
  aiMode: asEnum<AIMode>(process.env.AI_MODE, ["draft", "polish"], "draft"),
  openAiApiKey: process.env.OPENAI_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  indexNowKey: process.env.INDEXNOW_KEY,
  nodeEnv: process.env.NODE_ENV || "development",
};

export function getBaseUrl(): string {
  if (appEnv.siteDomain) {
    return appEnv.siteDomain.startsWith("http")
      ? appEnv.siteDomain
      : `https://${appEnv.siteDomain}`;
  }

  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}