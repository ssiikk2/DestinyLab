import { ImageResponse } from "next/og";
import { appEnv } from "@/lib/env";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tool = searchParams.get("tool") || "compatibility";
  const score = searchParams.get("score") || "82";
  const label = searchParams.get("label") || "Aries + Scorpio";

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
            "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.2), transparent 42%), linear-gradient(135deg,#1f2330 0%,#3438a8 48%,#c95b7b 100%)",
          color: "white",
          padding: "52px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "5px 5px",
            opacity: 0.2,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: "0.01em" }}>
            {appEnv.siteName}
          </div>
          <div style={{ fontSize: 24, opacity: 0.88, textTransform: "uppercase" }}>{tool}</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 158, fontWeight: 800, lineHeight: 0.95 }}>{score}</div>
          <div style={{ fontSize: 42, textAlign: "center", maxWidth: "86%" }}>{label}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, opacity: 0.86 }}>
          <span>Fast readings you can share</span>
          <span>{appEnv.siteDomain || "destinylab"}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}