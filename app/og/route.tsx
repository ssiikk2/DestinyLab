import { ImageResponse } from "next/og";
import { appEnv } from "@/lib/env";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tool = searchParams.get("tool") || "compatibility";
  const score = searchParams.get("score") || "82";
  const label = searchParams.get("label") || "Compatibility";

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
            "radial-gradient(circle at 8% 0%, rgba(255,255,255,0.25), transparent 42%), linear-gradient(135deg,#16233a 0%,#244a87 54%,#b46d45 100%)",
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
              "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "4px 4px",
            opacity: 0.18,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: "0.01em" }}>
            {appEnv.siteName}
          </div>
          <div style={{ fontSize: 23, opacity: 0.9, textTransform: "uppercase" }}>{tool}</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 160, fontWeight: 800, lineHeight: 0.95 }}>{score}</div>
          <div style={{ fontSize: 40, textAlign: "center", maxWidth: "86%" }}>{label}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, opacity: 0.88 }}>
          <span>Fast, shareable reading</span>
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
