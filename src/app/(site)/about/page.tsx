import type { Metadata } from "next";
import Link from "next/link";
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

export default function AboutPage() {
  const orgSchema = getOrganizationSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ─── Hero Section ─── */}
      <section className="bg-[#FAF7F0] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-[1080px] mx-auto space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
            <Link href="/" className="hover:text-[#00D261] transition-colors">Home</Link>
            <span>›</span>
            <span className="text-black">About Us</span>
          </div>

          <div className="neo-box inline-block bg-[#00D261] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black">
            OUR MISSION &amp; STORY
          </div>

          <h1 className="text-[36px] sm:text-[54px] lg:text-[68px] font-display font-black uppercase text-black tracking-tight leading-none">
            REDEFINING HOW SHOPIFY BRANDS TALK TO <span className="text-stroke-green">CUSTOMERS.</span>
          </h1>

          <p className="text-base sm:text-xl text-gray-700 font-medium max-w-3xl leading-relaxed">
            WhatFlow was founded with a singular conviction: eCommerce communication should be fast, delightful, and fair. We build high-performance WhatsApp tools for Shopify merchants without predatory markups or hidden fees.
          </p>
        </div>
      </section>

      {/* ─── Core Values Grid ─── */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 max-w-[1080px] mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="neo-box inline-block bg-[#FFC107] px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
            WHAT WE STAND FOR
          </div>
          <h2 className="text-[32px] sm:text-[44px] font-display font-black uppercase text-black tracking-tight">
            OUR CORE PRINCIPLES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="neo-box bg-white p-8 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#D5F5E3] border-2 border-black flex items-center justify-center text-2xl">
              💎
            </div>
            <h3 className="text-lg font-display font-black uppercase text-black">
              0% Markup Guarantee
            </h3>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              We never inflate official Meta Cloud API conversation rates. You pay wholesale wholesale rates directly to Meta, keeping your marketing ROI transparent.
            </p>
          </div>

          <div className="neo-box bg-white p-8 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFF3CD] border-2 border-black flex items-center justify-center text-2xl">
              ⚡
            </div>
            <h3 className="text-lg font-display font-black uppercase text-black">
              Edge-Native Speed
            </h3>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Built on Cloudflare edge infrastructure to execute webhooks and send messages with sub-50ms latency—even during peak Black Friday sales.
            </p>
          </div>

          <div className="neo-box bg-white p-8 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#E8F8F0] border-2 border-black flex items-center justify-center text-2xl">
              🛍️
            </div>
            <h3 className="text-lg font-display font-black uppercase text-black">
              100% Shopify First
            </h3>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Every workflow, trigger, and analytics dashboard is designed exclusively for Shopify and Shopify Flow, providing seamless 1-click administrative control.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Trust & Partnerships ─── */}
      <section className="bg-white border-y-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-[1080px] mx-auto space-y-8 text-center">
          <div className="neo-box inline-block bg-[#00D261] px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
            PARTNERSHIPS &amp; SECURITY
          </div>
          <h2 className="text-[32px] sm:text-[44px] font-display font-black uppercase text-black tracking-tight">
            TRUSTED BY OVER 10,000+ MERCHANTS
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            WhatFlow is an official Meta Tech Partner and verified Shopify App. We maintain enterprise-grade AES-256 encryption, GDPR compliance, and a 99.9% uptime SLA.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap pt-4">
            <span className="neo-pill bg-[#FAF7F0] border-black px-4 py-2 text-xs font-black uppercase text-black">
              ✓ OFFICIAL META TECH PARTNER
            </span>
            <span className="neo-pill bg-[#FAF7F0] border-black px-4 py-2 text-xs font-black uppercase text-black">
              ✓ BUILT FOR SHOPIFY
            </span>
            <span className="neo-pill bg-[#FAF7F0] border-black px-4 py-2 text-xs font-black uppercase text-black">
              ✓ GDPR &amp; SOC2 COMPLIANT
            </span>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#091E17] text-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1080px] mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight">
            GROW YOUR STORE WITH <span className="text-stroke-green">WHATFLOW.</span>
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto font-medium">
            Start your 14-day free trial today. Install on Shopify in under 3 minutes.
          </p>
          <div className="pt-2">
            <Link
              href={getShopifyAppUrl("about_cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-[#00D261] text-black font-display font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl inline-block shadow-[4px_4px_0px_#000] hover:scale-105 transition-transform"
            >
              INSTALL ON SHOPIFY ➔
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
