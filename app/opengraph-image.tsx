import { ImageResponse } from "next/og";
import { fetchWeddingConfig } from "@/lib/db";

export const runtime = "edge";
export const alt = "Undangan Majlis Perkahwinan";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const config = await fetchWeddingConfig();
  const groom = config.couple.groom.shortName || "Ieman";
  const bride = config.couple.bride.shortName || "Alya";
  const dateDisplay = config.event.dateDisplay || "Sabtu, 20 Mac 2027";
  const venue = config.event.venueName || "Dataran Pachitan";

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
          background: "linear-gradient(135deg, #FFF8F8 0%, #FDE8EC 50%, #F5D3D9 100%)",
          padding: "48px",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Decorative Outer Border */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "2px solid #EAD5D5",
            borderRadius: 32,
            display: "flex",
          }}
        />

        {/* Decorative Inner Dotted Border */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 36,
            right: 36,
            bottom: 36,
            border: "1px dashed #D4A373",
            borderRadius: 24,
            opacity: 0.6,
            display: "flex",
          }}
        />

        {/* Header Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 24px",
            borderRadius: 999,
            background: "#FFF8F8",
            border: "1px solid #EAD5D5",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#B56576",
              fontWeight: 700,
            }}
          >
            Walimatulurus
          </span>
        </div>

        {/* Couple Names */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 76,
            fontWeight: 800,
            color: "#3D2429",
            lineHeight: 1.1,
            marginBottom: 16,
            letterSpacing: -1,
          }}
        >
          <span>{groom}</span>
          <span style={{ color: "#D4A373", margin: "0 24px", fontWeight: 400 }}>&</span>
          <span>{bride}</span>
        </div>

        {/* Subtitle / Note */}
        <div
          style={{
            fontSize: 22,
            fontStyle: "italic",
            color: "#7A555C",
            marginBottom: 28,
          }}
        >
          {config.couple.familySideNote || "Undangan Raja Sehari"}
        </div>

        {/* Divider Dot Accent */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div style={{ width: 80, height: 1, background: "#D4A373", opacity: 0.7 }} />
          <div style={{ width: 8, height: 8, borderRadius: 999, background: "#D88A96" }} />
          <div style={{ width: 80, height: 1, background: "#D4A373", opacity: 0.7 }} />
        </div>

        {/* Date and Venue Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            fontWeight: 600,
            color: "#4A2E35",
            padding: "12px 32px",
            borderRadius: 999,
            background: "rgba(255, 255, 255, 0.8)",
            border: "1px solid #EAD5D5",
          }}
        >
          <span>{dateDisplay}</span>
          <span style={{ color: "#D4A373" }}>•</span>
          <span>{venue}</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
