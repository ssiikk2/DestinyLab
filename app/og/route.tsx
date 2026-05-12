import { ImageResponse } from "next/og";
import { appEnv } from "@/lib/env";

export const runtime = "edge";

function clampText(value: string, max: number): string {
  const clean = value.trim().replace(/\s+/g, " ");
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 3).trimEnd()}...`;
}

function bandLabel(score: number): string {
  if (score >= 90) return "God tier match";
  if (score >= 75) return "Strong match";
  if (score >= 55) return "Promising match";
  if (score >= 35) return "Needs context";
  return "Plot twist energy";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tool = clampText(searchParams.get("tool") || "compatibility", 22);
  const scoreParam = searchParams.get("score") || "82";
  const parsedScore = Number.parseInt(scoreParam, 10);
  const score = Number.isFinite(parsedScore) ? Math.max(0, Math.min(100, parsedScore)) : 82;
  const label = clampText(searchParams.get("label") || "Compatibility", 54);
  const siteDomain = appEnv.siteDomain?.replace(/^https?:\/\//, "") || "lovecompatibilitycalculator.com";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 8% 0%, rgba(255,255,255,0.28), transparent 34%), radial-gradient(circle at 92% 8%, rgba(244,114,182,0.34), transparent 30%), linear-gradient(135deg,#0f172a 0%,#1e3a8a 52%,#be185d 100%)",
          color: "white",
          padding: "48px",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            opacity: 0.28,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 18,
                background: "rgba(255,255,255,0.94)",
                color: "#0f172a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 25,
                fontWeight: 900,
              }}
            >
              LC
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 30, fontWeight: 900 }}>Love Compatibility Calculator</div>
              <div style={{ fontSize: 18, opacity: 0.78 }}>{siteDomain}</div>
            </div>
          </div>
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.24)",
              borderRadius: 999,
              padding: "10px 18px",
              fontSize: 18,
              fontWeight: 800,
              opacity: 0.95,
              textTransform: "uppercase",
              background: "rgba(255,255,255,0.12)",
            }}
          >
            {tool}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "stretch", gap: 28, zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 36,
              background: "rgba(255,255,255,0.12)",
              padding: "34px 38px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.24)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 620 }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#bae6fd", textTransform: "uppercase" }}>
                Shareable compatibility result
              </div>
              <div style={{ fontSize: 58, fontWeight: 900, lineHeight: 1.06 }}>
                {label}
              </div>
              <div style={{ fontSize: 27, lineHeight: 1.35, opacity: 0.9 }}>
                Get the score, meaning, next move, and a result card you can send.
              </div>
            </div>
            <div
              style={{
                width: 300,
                height: 300,
                borderRadius: 42,
                background: "rgba(255,255,255,0.96)",
                color: "#0f172a",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                <span style={{ fontSize: 128, fontWeight: 1000, lineHeight: 0.9 }}>{score}</span>
                <span style={{ fontSize: 34, fontWeight: 900, marginBottom: 12 }}>/100</span>
              </div>
              <div style={{ marginTop: 18, fontSize: 25, fontWeight: 900, color: "#be185d" }}>
                {bandLabel(score)}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, justifyContent: "space-between", zIndex: 1 }}>
          {["Instant test", "Score meaning", "Story card"].map((item) => (
            <div
              key={item}
              style={{
                flex: 1,
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 22,
                background: "rgba(255,255,255,0.1)",
                padding: "18px 22px",
                fontSize: 23,
                fontWeight: 850,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
            fontSize: 22,
            opacity: 0.9,
          }}
        >
          <span>For entertainment and reflection</span>
          <span>Try yours in under 2 minutes</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
