export type AIProvider = "gemini" | "openai" | "azure-openai";
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

function asOptionalNumber(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function asOptionalInt(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function hasAzureProviderEnv(): boolean {
  return Boolean(
    process.env.AZURE_OPENAI_PRIMARY_ENDPOINT &&
      process.env.AZURE_OPENAI_API_KEY &&
      (process.env.AZURE_OPENAI_DEPLOYMENT ||
        process.env.AZURE_OPENAI_DEPLOYMENT_NAME),
  );
}

function resolveAIProvider(raw: string | undefined): AIProvider {
  if (raw === "azure-openai" || raw === "openai" || raw === "gemini") {
    return raw;
  }

  if (hasAzureProviderEnv()) {
    return "azure-openai";
  }

  if (process.env.OPENAI_API_KEY) {
    return "openai";
  }

  return "gemini";
}

export const appEnv = {
  siteName: process.env.SITE_NAME || "Love Compatibility Calculator",
  siteTagline:
    process.env.SITE_TAGLINE ||
    "Compatibility guides, calculators, and zodiac insights for reflection and entertainment purposes.",
  siteDomain: process.env.SITE_DOMAIN,
  siteToolMode: process.env.SITE_TOOL_MODE || "compatibility",
  siteThemeAccent: process.env.SITE_THEME_ACCENT || "slate",

  contactEmail: process.env.CONTACT_EMAIL || "siik0924@naver.com",

  adsEnabled: asBool(process.env.ADS_ENABLED, false),
  adsenseClient: process.env.ADSENSE_CLIENT,
  adsenseSlotTop: process.env.ADSENSE_SLOT_TOP,
  adsenseSlotAboveFold: process.env.ADSENSE_SLOT_ABOVE_FOLD,
  adsenseSlotAfterCalculator: process.env.ADSENSE_SLOT_AFTER_CALCULATOR,
  adsenseSlotMidContent1: process.env.ADSENSE_SLOT_MID_CONTENT_1,
  adsenseSlotMidContent2: process.env.ADSENSE_SLOT_MID_CONTENT_2,
  adsenseSlotPreFaq: process.env.ADSENSE_SLOT_PRE_FAQ,
  adsenseSlotStickyMobile: process.env.ADSENSE_SLOT_STICKY_MOBILE,

  aiProvider: resolveAIProvider(process.env.AI_PROVIDER),
  aiMode: asEnum<AIMode>(process.env.AI_MODE, ["draft", "polish"], "draft"),

  openAiApiKey: process.env.OPENAI_API_KEY,
  openAiTemperature: asOptionalNumber(process.env.OPENAI_TEMPERATURE),
  openAiMaxTokens: asOptionalInt(process.env.OPENAI_MAX_TOKENS),

  geminiApiKey: process.env.GEMINI_API_KEY,

  azureOpenAiPrimaryEndpoint: process.env.AZURE_OPENAI_PRIMARY_ENDPOINT,
  azureOpenAiSecondaryEndpoint: process.env.AZURE_OPENAI_SECONDARY_ENDPOINT,
  azureOpenAiApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAiDeployment:
    process.env.AZURE_OPENAI_DEPLOYMENT ||
    process.env.AZURE_OPENAI_DEPLOYMENT_NAME ||
    "gpt-4o-mini",
  azureOpenAiNanoDeployment:
    process.env.AZURE_OPENAI_NANO_DEPLOYMENT ||
    process.env.AZURE_OPENAI_NANO_DEPLOYMENT_NAME,
  azureOpenAiDeploymentName:
    process.env.AZURE_OPENAI_DEPLOYMENT ||
    process.env.AZURE_OPENAI_DEPLOYMENT_NAME ||
    "gpt-4o-mini",
  azureOpenAiNanoDeploymentName:
    process.env.AZURE_OPENAI_NANO_DEPLOYMENT ||
    process.env.AZURE_OPENAI_NANO_DEPLOYMENT_NAME,
  azureOpenAiEndpoint:
    process.env.AZURE_OPENAI_ENDPOINT || process.env.AZURE_OPENAI_PRIMARY_ENDPOINT,
  azureOpenAiApiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-10-21",
  azureOpenAiTemperature: asOptionalNumber(process.env.AZURE_OPENAI_TEMPERATURE),
  azureOpenAiMaxTokens: asOptionalInt(process.env.AZURE_OPENAI_MAX_TOKENS),
  useNano: asBool(process.env.USE_NANO, false),
  aoaiUsageLogDir: process.env.AOAI_USAGE_LOG_DIR,

  indexNowKey: process.env.INDEXNOW_KEY,
  nodeEnv: process.env.NODE_ENV || "development",
};

export function getBaseUrl(): string {
  if (appEnv.siteDomain) {
    return appEnv.siteDomain.startsWith("http")
      ? appEnv.siteDomain
      : `https://${appEnv.siteDomain}`;
  }

  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return "https://lovecompatibilitycalculator.com";
}

export function isProduction(): boolean {
  return appEnv.nodeEnv === "production";
}
