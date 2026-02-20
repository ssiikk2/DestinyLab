import { appEnv } from "@/lib/env";

const accentMap: Record<string, string> = {
  violet: "from-violet-600 to-fuchsia-500",
  emerald: "from-emerald-600 to-teal-500",
  coral: "from-rose-500 to-orange-500",
  sky: "from-sky-600 to-cyan-500",
};

export function getAccentGradient(): string {
  return accentMap[appEnv.siteThemeAccent] || accentMap.violet;
}