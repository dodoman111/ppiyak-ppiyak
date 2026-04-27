import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "삐약삐약 — 오늘도 무럭무럭";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #fffbeb 0%, #fde68a 50%, #facc15 100%)",
          fontFamily: "sans-serif",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 240, lineHeight: 1, marginBottom: 24 }}>
          🐥
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: "#0f172a",
            letterSpacing: "-2px",
          }}
        >
          삐약삐약
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 36,
            color: "#475569",
            fontWeight: 500,
          }}
        >
          오늘도 무럭무럭, 영양제 골라줄게!
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 24,
            color: "#92400e",
            fontWeight: 600,
            background: "#fef3c7",
            padding: "12px 28px",
            borderRadius: 999,
          }}
        >
          증상만 고르면 끝 · 30초 추천
        </div>
      </div>
    ),
    { ...size },
  );
}
