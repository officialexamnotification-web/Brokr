import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/lib/data";

export const runtime = "edge";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

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
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
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
              color: "#ffffff",
            }}
          >
            {post?.image || "TX"}
          </div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            Tradivex
          </div>
        </div>
        <div
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "#ffffff",
            textAlign: "center",
            maxWidth: "1000px",
            lineHeight: 1.2,
          }}
        >
          {post?.title || "Trading Guide"}
        </div>
        <div
          style={{
            fontSize: "24px",
            fontWeight: "normal",
            marginTop: "30px",
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          {post?.category || "Trading Guide"}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}