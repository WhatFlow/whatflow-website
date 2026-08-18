import { ImageResponse } from "next/og";
import { getPost, CATEGORY_LABELS } from "@/lib/payload-api";

export const runtime = "edge";
export const alt = "WhatFlow Blog Post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  const title = post?.title || "WhatFlow WhatsApp Automation Blog";
  const category = post ? (CATEGORY_LABELS[post.category] || post.category) : "Guides";
  const author = post?.author || "WhatFlow Team";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAF7F0",
          padding: "60px 80px",
          border: "16px solid #000000",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top bar: Brand + Category */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              backgroundColor: "#00D261",
              border: "4px solid #000000",
              boxShadow: "6px 6px 0px #000000",
              padding: "10px 24px",
              borderRadius: "12px",
            }}
          >
            <span
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#000000",
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
              }}
            >
              WHATFLOW
            </span>
          </div>

          {/* Category Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
              padding: "8px 20px",
              borderRadius: "9999px",
              fontSize: 18,
              fontWeight: 800,
              color: "#000000",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {category}
          </div>
        </div>

        {/* Title & Excerpt */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              fontSize: title.length > 50 ? 54 : 64,
              fontWeight: 900,
              lineHeight: 1.08,
              color: "#000000",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "4px solid #000000",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 22,
              fontWeight: 800,
              color: "#000000",
            }}
          >
            <span>Written by</span>
            <span
              style={{
                backgroundColor: "#00D261",
                padding: "2px 10px",
                border: "2px solid #000000",
                borderRadius: "6px",
              }}
            >
              {author}
            </span>
          </div>

          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#2563EB",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            whatflow.io/blog ➔
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
