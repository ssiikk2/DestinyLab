import { appEnv } from "@/lib/env";

interface AdSlotProps {
  className?: string;
  slot?: string;
}

export function AdSlot({ className = "", slot }: AdSlotProps) {
  if (!appEnv.adsEnabled) {
    return null;
  }

  const client = appEnv.adsenseClient;
  const adSlot = slot || appEnv.adsenseSlotTop;

  if (!client || !adSlot) {
    return (
      <div className={`rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 ${className}`}>
        Ads are enabled but AdSense client/slot is not configured.
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-2 text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}