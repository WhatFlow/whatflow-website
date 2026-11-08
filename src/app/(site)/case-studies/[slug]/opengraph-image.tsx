import { ImageResponse } from "next/og";
import { getCaseStudy, INDUSTRY_LABELS } from "@/lib/payload-api";

export const alt = "WhatFlow Case Study";
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
  const study = await getCaseStudy(slug);

  const title = study?.title || "WhatFlow Merchant Case Study";
  const storeName = study?.storeName || "Shopify Merchant";
  const industry = study ? (INDUSTRY_LABELS[study.industry] || study.industry) : "E-commerce";
  const primaryMetric = study?.metrics?.[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#091E17",
          padding: "60px 80px",
          border: "16px solid #000000",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top bar: Brand + Industry */}
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#E8F8F0",
              border: "3px solid #000000",
              boxShadow: "4px 4px 0px #000000",
              padding: "8px 20px",
              borderRadius: "9999px",
              fontSize: 18,
              fontWeight: 800,
              color: "#0A6B56",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {storeName} • {industry}
          </div>
        </div>

        {/* Title & Big Metric */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: title.length > 50 ? 46 : 56,
                fontWeight: 900,
                lineHeight: 1.1,
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </div>
          </div>

          {primaryMetric && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#00D261",
                border: "4px solid #000000",
                boxShadow: "8px 8px 0px #000000",
                padding: "24px 32px",
                borderRadius: "16px",
                minWidth: "240px",
              }}
            >
              <span
                style={{
                  fontSize: 52,
                  fontWeight: 900,
                  color: "#000000",
                  lineHeight: 1,
                }}
              >
                {primaryMetric.value}
              </span>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#091E17",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginTop: "8px",
                }}
              >
                {primaryMetric.label}
              </span>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "3px solid rgba(255,255,255,0.2)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#A7F3D0",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Verified Shopify Merchant Story
          </div>

          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#00D261",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            whatflow.io/case-studies ➔
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
