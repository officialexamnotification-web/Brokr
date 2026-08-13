import { ImageResponse } from "next/og";

export const runtime = "edge";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          backgroundImage: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          fontSize: 60,
          fontWeight: "bold",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: "black",
            }}
          >
            TX
          </div>
          <div>Tradivex</div>
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: "normal",
            marginTop: "20px",
            color: "#94a3b8",
          }}
        >
          Trading Tools & Financial Calculators
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}