import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RV's Cold Brew — Born in Belfast";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0c343d",
          color: "#fff2cc",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: 0.8,
          }}
        >
          Great Northern Mall · Belfast
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "0.02em",
          }}
        >
          RV&apos;S COLD BREW
        </div>
        <div style={{ marginTop: 32, fontSize: 36, opacity: 0.9 }}>
          Smooth Craft Cold Brew &amp; Premium Matcha
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 24,
            backgroundColor: "#fff2cc",
            color: "#0c343d",
            padding: "12px 28px",
            borderRadius: 8,
            alignSelf: "flex-start",
          }}
        >
          Born in Belfast
        </div>
      </div>
    ),
    { ...size },
  );
}
