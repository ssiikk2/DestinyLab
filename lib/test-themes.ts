export type CalculatorMode =
  | "love"
  | "name"
  | "initials"
  | "crush"
  | "friendship"
  | "zodiac"
  | "birthday"
  | "destiny";

export interface TestTheme {
  key: CalculatorMode;
  label: string;
  accentTextClass: string;
  heroGradientClass: string;
  pillClass: string;
  cardBorderClass: string;
  inputFocusClass: string;
  buttonClass: string;
  buttonHoverClass: string;
  resultClass: string;
}

const themes: Record<CalculatorMode, TestTheme> = {
  love: {
    key: "love",
    label: "Love",
    accentTextClass: "text-rose-700",
    heroGradientClass: "from-rose-50 via-pink-50 to-white",
    pillClass: "border border-rose-200 bg-rose-100 text-rose-700",
    cardBorderClass: "border-rose-200/80",
    inputFocusClass: "focus:border-rose-400 focus:ring-2 focus:ring-rose-200",
    buttonClass: "bg-rose-600 text-white",
    buttonHoverClass: "hover:bg-rose-700",
    resultClass: "border-rose-200 bg-rose-50/70",
  },
  name: {
    key: "name",
    label: "Name",
    accentTextClass: "text-sky-700",
    heroGradientClass: "from-sky-50 via-cyan-50 to-white",
    pillClass: "border border-sky-200 bg-sky-100 text-sky-700",
    cardBorderClass: "border-sky-200/80",
    inputFocusClass: "focus:border-sky-400 focus:ring-2 focus:ring-sky-200",
    buttonClass: "bg-sky-600 text-white",
    buttonHoverClass: "hover:bg-sky-700",
    resultClass: "border-sky-200 bg-sky-50/70",
  },
  initials: {
    key: "initials",
    label: "Initials",
    accentTextClass: "text-emerald-700",
    heroGradientClass: "from-emerald-50 via-green-50 to-white",
    pillClass: "border border-emerald-200 bg-emerald-100 text-emerald-700",
    cardBorderClass: "border-emerald-200/80",
    inputFocusClass: "focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200",
    buttonClass: "bg-emerald-600 text-white",
    buttonHoverClass: "hover:bg-emerald-700",
    resultClass: "border-emerald-200 bg-emerald-50/70",
  },
  crush: {
    key: "crush",
    label: "Crush",
    accentTextClass: "text-fuchsia-700",
    heroGradientClass: "from-fuchsia-50 via-pink-50 to-white",
    pillClass: "border border-fuchsia-200 bg-fuchsia-100 text-fuchsia-700",
    cardBorderClass: "border-fuchsia-200/80",
    inputFocusClass: "focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200",
    buttonClass: "bg-fuchsia-600 text-white",
    buttonHoverClass: "hover:bg-fuchsia-700",
    resultClass: "border-fuchsia-200 bg-fuchsia-50/70",
  },
  friendship: {
    key: "friendship",
    label: "Friendship",
    accentTextClass: "text-amber-700",
    heroGradientClass: "from-amber-50 via-yellow-50 to-white",
    pillClass: "border border-amber-200 bg-amber-100 text-amber-700",
    cardBorderClass: "border-amber-200/80",
    inputFocusClass: "focus:border-amber-400 focus:ring-2 focus:ring-amber-200",
    buttonClass: "bg-amber-600 text-white",
    buttonHoverClass: "hover:bg-amber-700",
    resultClass: "border-amber-200 bg-amber-50/70",
  },
  zodiac: {
    key: "zodiac",
    label: "Zodiac",
    accentTextClass: "text-teal-700",
    heroGradientClass: "from-teal-50 via-cyan-50 to-white",
    pillClass: "border border-teal-200 bg-teal-100 text-teal-700",
    cardBorderClass: "border-teal-200/80",
    inputFocusClass: "focus:border-teal-400 focus:ring-2 focus:ring-teal-200",
    buttonClass: "bg-teal-600 text-white",
    buttonHoverClass: "hover:bg-teal-700",
    resultClass: "border-teal-200 bg-teal-50/70",
  },
  birthday: {
    key: "birthday",
    label: "Birthday",
    accentTextClass: "text-orange-700",
    heroGradientClass: "from-orange-50 via-amber-50 to-white",
    pillClass: "border border-orange-200 bg-orange-100 text-orange-700",
    cardBorderClass: "border-orange-200/80",
    inputFocusClass: "focus:border-orange-400 focus:ring-2 focus:ring-orange-200",
    buttonClass: "bg-orange-600 text-white",
    buttonHoverClass: "hover:bg-orange-700",
    resultClass: "border-orange-200 bg-orange-50/70",
  },
  destiny: {
    key: "destiny",
    label: "Destiny",
    accentTextClass: "text-indigo-700",
    heroGradientClass: "from-indigo-50 via-blue-50 to-white",
    pillClass: "border border-indigo-200 bg-indigo-100 text-indigo-700",
    cardBorderClass: "border-indigo-200/80",
    inputFocusClass: "focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200",
    buttonClass: "bg-indigo-600 text-white",
    buttonHoverClass: "hover:bg-indigo-700",
    resultClass: "border-indigo-200 bg-indigo-50/70",
  },
};

const slugModeMap: Record<string, CalculatorMode> = {
  "love-compatibility-calculator": "love",
  "name-compatibility": "name",
  "initials-compatibility": "initials",
  "crush-compatibility": "crush",
  "friendship-compatibility": "friendship",
  "zodiac-compatibility": "zodiac",
  "birthday-compatibility": "birthday",
  "destiny-calculator": "destiny",
};

export function getModeTheme(mode: CalculatorMode): TestTheme {
  return themes[mode];
}

export function getModeFromToolSlug(slug: string): CalculatorMode {
  return slugModeMap[slug] ?? "love";
}
