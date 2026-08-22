import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security & Compliance | WhatFlow",
  description: "Enterprise security, GDPR compliance, encryption, and Meta Cloud API infrastructure at WhatFlow.",
};

export default function SecurityPage() {
  const securityPillars = [
    {
      title: "OFFICIAL META CLOUD API",
      tagline: "Direct Enterprise Transmission",
      description: "No third-party aggregators or gray-market SIM farms. All messages route directly through Meta's tier-1 Cloud API infrastructure with official BSP security guarantees.",
      badge: "META PARTNER",
    },
    {
      title: "AES-256 ENCRYPTION",
      tagline: "End-to-End Encryption at Rest & in Transit",
      description: "All OAuth access tokens, API secrets, and sensitive merchant credentials are encrypted at rest using AES-256-GCM. All traffic uses enforced TLS 1.3.",
      badge: "ENCRYPTED",
    },
    {
      title: "GDPR & CCPA COMPLIANCE",
      tagline: "Automated Data Protection",
      description: "Full compliance with European GDPR, UK GDPR, and California CCPA. Automated 48-hour data erasure webhooks triggered upon uninstallation or customer request.",
      badge: "GDPR READY",
    },
    {
      title: "99.99% UPTIME SLA",
      tagline: "Globally Distributed Edge",
      description: "Powered by edge compute with automatic retry queues and multi-region failovers to handle millions of BFCM messages without latency spikes.",
      badge: "HIGH AVAILABILITY",
    },
    {
      title: "ZERO DATA MONETIZATION",
      tagline: "Strict Data Processor Role",
      description: "We never sell, rent, share, or analyze customer contact lists for third-party advertising. Your merchant data is 100% yours.",
      badge: "PRIVATE",
    },
    {
      title: "ROLE-BASED ACCESS CONTROL",
      tagline: "Secure Admin Architecture",
      description: "Strict isolation of tenant databases and API scopes. Multi-factor authentication required for all internal engineering systems.",
      badge: "ISOLATED",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* ─── Hero ─── */}
      <section className="bg-[#FAF7F0] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto text-center">
          <div className="neo-box inline-block bg-[#00D261] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black mb-4">
            ENTERPRISE TRUST &amp; SECURITY
          </div>
          <h1 className="text-[44px] sm:text-[60px] lg:text-[76px] font-display font-black uppercase text-black tracking-tight leading-none mb-6">
            BUILT FOR SCALE, <br />
            <span className="text-stroke-green">ENGINEERED FOR TRUST.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-medium max-w-2xl mx-auto">
            How WhatFlow protects high-growth Shopify stores, customer data, and Meta WhatsApp Business Accounts.
          </p>
        </div>
      </section>

      {/* ─── Pillars Grid ─── */}
      <section className="px-4 sm:px-6 py-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((pillar) => (
            <div key={pillar.title} className="neo-box bg-white p-7 flex flex-col justify-between rounded-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="neo-pill bg-[#FAF7F0] border-black text-[10px] font-black uppercase px-2.5 py-0.5">
                    {pillar.badge}
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00D261]" />
                </div>
                <h3 className="font-display font-black text-xl uppercase text-black leading-tight">
                  {pillar.title}
                </h3>
                <div className="text-xs font-extrabold text-[#0A6B56] uppercase tracking-wider">
                  {pillar.tagline}
                </div>
                <p className="text-xs font-medium text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase">
                <span>Enterprise Grade</span>
                <span className="text-[#00D261]">✓ VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Compliance Banner ─── */}
      <section className="px-4 sm:px-6 pb-20 max-w-[1280px] mx-auto">
        <div className="neo-box-teal p-8 sm:p-12 rounded-2xl text-center text-white space-y-4">
          <div className="neo-box inline-block bg-[#00D261] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
            SECURITY DISCLOSURE &amp; COMPLIANCE
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight">
            NEED A SIGNED DATA PROCESSING ADDENDUM (DPA)?
          </h2>
          <p className="text-sm text-[#A7F3D0] max-w-xl mx-auto font-medium leading-relaxed">
            We provide custom DPAs for Shopify Plus and enterprise brands processing high-volume European or international customer traffic.
          </p>
          <div className="pt-2">
            <a
              href="mailto:security@whatflow.tech"
              className="neo-btn inline-flex items-center gap-2 bg-[#00D261] text-black font-extrabold text-xs uppercase px-6 py-3 rounded-lg shadow-[3px_3px_0px_#000]"
            >
              <span>REQUEST ENTERPRISE DPA</span>
              <span>➔</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
