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
          background: "linear-gradient(135deg,#4f46e5,#a855f7,#ec4899)",
          color: "white",
          padding: "48px",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 700 }}>{appEnv.siteName}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <div style={{ fontSize: 30, opacity: 0.9, textTransform: "uppercase" }}>{tool}</div>
          <div style={{ fontSize: 160, fontWeight: 800, lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: 42 }}>{label}</div>
        </div>
        <div style={{ fontSize: 24, opacity: 0.8, alignSelf: "flex-end" }}>
          {appEnv.siteDomain || "destinylab"}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}