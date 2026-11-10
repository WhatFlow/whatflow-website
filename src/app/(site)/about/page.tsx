import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Hl, PageHero, Section, SectionHead } from "@/components/site/PageKit";
import { getBreadcrumbSchema, getOrganizationSchema, SITE_URL } from "@/lib/schema-org";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export const metadata: Metadata = {
  title: "About WhatFlow — The Shopify WhatsApp Engine",
  description:
    "Learn about WhatFlow's mission to empower 10,000+ Shopify merchants with official Meta WhatsApp Cloud API marketing, zero conversation markup, and seamless automation.",
  keywords: [
    "About WhatFlow",
    "WhatFlow team",
    "Shopify WhatsApp partner",
    "Meta Cloud API eCommerce",
    "WhatFlow company",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About WhatFlow — The Shopify WhatsApp Engine",
    description:
      "Learn about WhatFlow's mission to empower 10,000+ Shopify merchants with official Meta WhatsApp Cloud API marketing, zero conversation markup, and seamless automation.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

const VALUES = [
  {
    title: "0% markup guarantee",
    body: "We never inflate official Meta Cloud API conversation rates. You pay wholesale rates directly to Meta, keeping your marketing ROI transparent.",
    tone: "var(--mint)",
  },
  {
    title: "Edge-native speed",
    body: "Built on Cloudflare edge infrastructure to execute webhooks and send messages with sub-50ms latency, even during peak Black Friday sales.",
    tone: "#fff3c4",
  },
  {
    title: "100% Shopify first",
    body: "Every workflow, trigger, and analytics dashboard is designed exclusively for Shopify and Shopify Flow, providing 1-click administrative control.",
    tone: "var(--sky)",
  },
];

const BADGES = ["Official Meta Tech Partner", "Built for Shopify", "GDPR & SOC2 compliant"];

export default function AboutPage() {
  const orgSchema = getOrganizationSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        title="Redefining how Shopify brands talk to customers."
        accent={["customers"]}
        sub={
          <p>
            WhatFlow was founded with a singular conviction: eCommerce communication should be fast, delightful, and fair. We build high-performance WhatsApp tools for Shopify merchants without predatory markups or hidden fees.
          </p>
        }
        actions={
          <Link
            href={getShopifyAppUrl("about_cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="wf-btn wf-btn-green"
          >
            Install on Shopify
          </Link>
        }
        meta={
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href="/" className="underline decoration-[var(--green)] decoration-2 underline-offset-4">Home</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">About us</span>
          </nav>
        }
      />

      {/* ─── Core principles ─── */}
      <Section tone="paper" label="about-values-title">
        <SectionHead
          id="about-values-title"
          center
          title={<>Our core <Hl>principles.</Hl></>}
        />
        <div className="wf-grid wf-grid-3 mt-12">
          {VALUES.map((value, index) => (
            <div
              key={value.title}
              className="wf-card"
              data-hover
              data-reveal
              style={{ background: value.tone, "--d": `${index * 90}ms` } as CSSProperties}
            >
              <h3>{value.title}</h3>
              <p>{value.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Trust & partnerships ─── */}
      <Section tone="white" label="about-trust-title">
        <SectionHead
          id="about-trust-title"
          center
          title={<>Trusted by over <Hl>10,000+ merchants.</Hl></>}
          sub="WhatFlow is an official Meta Tech Partner and verified Shopify App. We maintain AES-256 encryption, GDPR compliance, and a 99.9% uptime SLA."
        />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {BADGES.map((badge, index) => (
            <span
              key={badge}
              className="wf-pill"
              data-reveal
              style={{ padding: "10px 18px", fontSize: 14, boxShadow: "3px 3px 0 var(--ink)", background: index === 0 ? "var(--mint)" : index === 1 ? "#fff3c4" : "var(--sky)", "--d": `${index * 80}ms` } as CSSProperties}
            >
              {badge}
            </span>
          ))}
        </div>
      </Section>
    </div>
  );
}
