import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Hl, PageHero, Section, SectionHead } from "@/components/site/PageKit";

const TONES = ["var(--mint)", "#fff3c4", "var(--sky)", "var(--pink)", "var(--lilac)", "#fff"];

export const metadata: Metadata = {
  alternates: { canonical: "/security" },
  title: "Security & Compliance | WhatFlow",
  description: "Enterprise security, GDPR compliance, encryption, and Meta Cloud API infrastructure at WhatFlow.",
};

export default function SecurityPage() {
  const securityPillars = [
    {
      title: "Official Meta Cloud API",
      tagline: "Direct enterprise transmission",
      description: "No third-party aggregators or gray-market SIM farms. All messages route directly through Meta's tier-1 Cloud API infrastructure with official BSP security guarantees.",
      badge: "Meta partner",
    },
    {
      title: "AES-256 encryption",
      tagline: "End-to-end encryption at rest & in transit",
      description: "All OAuth access tokens, API secrets, and sensitive merchant credentials are encrypted at rest using AES-256-GCM. All traffic uses enforced TLS 1.3.",
      badge: "Encrypted",
    },
    {
      title: "GDPR & CCPA compliance",
      tagline: "Automated data protection",
      description: "Full compliance with European GDPR, UK GDPR, and California CCPA. Automated 48-hour data erasure webhooks triggered upon uninstallation or customer request.",
      badge: "GDPR ready",
    },
    {
      title: "99.99% uptime SLA",
      tagline: "Globally distributed edge",
      description: "Powered by edge compute with automatic retry queues and multi-region failovers to handle millions of BFCM messages without latency spikes.",
      badge: "High availability",
    },
    {
      title: "Zero data monetization",
      tagline: "Strict data processor role",
      description: "We never sell, rent, share, or analyze customer contact lists for third-party advertising. Your merchant data is 100% yours.",
      badge: "Private",
    },
    {
      title: "Role-based access control",
      tagline: "Secure admin architecture",
      description: "Strict isolation of tenant databases and API scopes. Multi-factor authentication required for all internal engineering systems.",
      badge: "Isolated",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <PageHero
        title="Built for scale, engineered for trust."
        accent={["trust"]}
        sub={<p>How WhatFlow protects high-growth Shopify stores, customer data, and Meta WhatsApp Business Accounts.</p>}
      />

      {/* ─── Pillars ─── */}
      <Section tone="paper" label="security-pillars-title">
        <SectionHead
          id="security-pillars-title"
          title={<>How we keep your store <Hl>safe.</Hl></>}
        />
        <div className="wf-grid wf-grid-3 mt-12">
          {securityPillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="wf-card"
              data-hover
              data-reveal
              style={{ background: TONES[index % TONES.length], "--d": `${(index % 3) * 80}ms` } as CSSProperties}
            >
              <h3>{pillar.title}</h3>
              <div className="mt-2 text-sm font-bold text-[var(--green-text-on-tint)]">{pillar.tagline}</div>
              <p>{pillar.description}</p>
              <div className="mt-auto flex items-center justify-between border-t-[1.5px] border-dashed border-[rgb(11_15_12/0.2)] pt-4 text-xs font-bold text-[var(--text-muted)]" style={{ marginTop: 24 }}>
                <span>{pillar.badge}</span>
                <span className="text-[var(--green-text-on-tint)]">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── DPA request ─── */}
      <Section tone="dark" label="security-dpa-title">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHead
            id="security-dpa-title"
            center
            light
            title={<>Need a signed data processing addendum (DPA)?</>}
            sub="We provide custom DPAs for Shopify Plus and enterprise brands processing high-volume European or international customer traffic."
          />
          <div className="mt-8" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
            <a href="mailto:security@whatflow.tech" className="wf-btn wf-btn-green">
              Request enterprise DPA
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
