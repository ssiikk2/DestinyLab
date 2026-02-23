"use client";

import { useEffect } from "react";
import { appEnv } from "@/lib/env";

type AdPlacement =
  | "aboveFold"
  | "afterCalculator"
  | "midContent1"
  | "midContent2"
  | "preFaq"
  | "stickyMobile";

type AdSize = "leaderboard" | "rectangle" | "mobile-banner" | "fluid";

interface AdSlotProps {
  placement: AdPlacement;
  size?: AdSize;
  className?: string;
  stickyMobile?: boolean;
}

const sizeHeights: Record<AdSize, number> = {
  leaderboard: 90,
  rectangle: 280,
  "mobile-banner": 100,
  fluid: 180,
};

function slotFromPlacement(placement: AdPlacement): string | undefined {
  switch (placement) {
    case "aboveFold":
      return appEnv.adsenseSlotAboveFold || appEnv.adsenseSlotTop;
    case "afterCalculator":
      return appEnv.adsenseSlotAfterCalculator;
    case "midContent1":
      return appEnv.adsenseSlotMidContent1;
    case "midContent2":
      return appEnv.adsenseSlotMidContent2;
    case "preFaq":
      return appEnv.adsenseSlotPreFaq;
    case "stickyMobile":
      return appEnv.adsenseSlotStickyMobile;
    default:
      return undefined;
  }
}

export function AdSlot({
  placement,
  size = "fluid",
  className,
  stickyMobile = false,
}: AdSlotProps) {
  const isDev = appEnv.nodeEnv !== "production";
  const height = sizeHeights[size];
  const slot = slotFromPlacement(placement);

  useEffect(() => {
    if (isDev || !appEnv.adsEnabled || !appEnv.adsenseClient || !slot) {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // no-op: ad script can fail on first paint when blocked.
    }
  }, [isDev, slot]);

  const wrapperClasses = [
    "w-full overflow-hidden rounded-md border border-slate-200 bg-white/70",
    stickyMobile ? "fixed bottom-0 left-0 z-40 sm:static" : "",
    className || "",
  ]
    .join(" ")
    .trim();

  if (isDev || !appEnv.adsEnabled) {
    return (
      <div className={wrapperClasses} style={{ minHeight: height }}>
        <div className="flex h-full min-h-full items-center justify-center px-3 py-4 text-center text-xs font-semibold text-slate-500">
          Ad placeholder: {placement} ({size})
        </div>
      </div>
    );
  }

  if (!appEnv.adsenseClient || !slot) {
    return null;
  }

  return (
    <div className={wrapperClasses} style={{ minHeight: height }}>
      <ins
        className="adsbygoogle block"
        style={{ display: "block", minHeight: `${height}px` }}
        data-ad-client={appEnv.adsenseClient}
        data-ad-slot={slot}
        data-ad-format={size === "fluid" ? "auto" : undefined}
        data-full-width-responsive="true"
      />
    </div>
  );
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}
