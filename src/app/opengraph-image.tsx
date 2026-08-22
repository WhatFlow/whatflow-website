import { ImageResponse } from "next/og";

export const alt = "WhatFlow — WhatsApp Marketing & Automations for Shopify";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAF7F0",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "60px 80px",
          border: "16px solid #000000",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Header Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              background: "#00D261",
              border: "3px solid #000000",
              borderRadius: "12px",
              padding: "8px 20px",
              fontSize: "20px",
              fontWeight: 900,
              color: "#000000",
              boxShadow: "3px 3px 0px #000",
            }}
          >
            OFFICIAL META TECH PARTNER
          </div>
          <div
            style={{
              background: "#FFFFFF",
              border: "3px solid #000000",
              borderRadius: "12px",
              padding: "8px 20px",
              fontSize: "20px",
              fontWeight: 800,
              color: "#000000",
            }}
          >
            SHOPIFY APP
          </div>
        </div>

        {/* Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "950px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#000000",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            Automate WhatsApp for Your Shopify Store
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#0A6B56",
              lineHeight: 1.3,
            }}
          >
            Recover Carts with 98% Open Rates • 1-Click COD Confirmation • 0% Markup on Meta Rates
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "3px solid #000000",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "#00D261",
                border: "2px solid #000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "24px",
              }}
            >
              W
            </div>
            <div style={{ fontSize: "28px", fontWeight: 900, color: "#000000", textTransform: "uppercase" }}>
              WHATFLOW
            </div>
          </div>
          <div style={{ fontSize: "22px", fontWeight: 800, color: "#000000" }}>
            whatflow.tech
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
