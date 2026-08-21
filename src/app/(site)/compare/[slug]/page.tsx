import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getShopifyAppUrl } from "@/lib/shopify-app";

interface ComparePageProps {
  params: Promise<{ slug: string }>;
}

const COMPARISON_DETAILS: Record<
  string,
  {
    competitor: string;
    title: string;
    description: string;
    intro: string;
    whatflowAdvantages: { title: string; desc: string }[];
    competitorDrawbacks: { title: string; desc: string }[];
    featureTable: { feature: string; whatflow: string; competitor: string }[];
  }
> = {
  "whatflow-vs-wati": {
    competitor: "Wati",
    title: "WhatFlow vs Wati: The Best Shopify WhatsApp Alternative",
    description: "Compare WhatFlow and Wati. See why Shopify merchants choose WhatFlow for zero markup on Meta rates and native Shopify Flow automations.",
    intro: "While Wati is an established general customer support inbox, it was not built ground-up for Shopify merchants. WhatFlow is purpose-built for eCommerce: offering direct 1-click Shopify billing, native Flow triggers, zero conversation markup, and seamless review collection.",
    whatflowAdvantages: [
      {
        title: "0% Markup on Meta Rates",
        desc: "You pay official wholesale Meta Cloud API conversation rates directly. Wati charges a 20-30% markup on every message you send.",
      },
      {
        title: "Native Shopify Order Tags",
        desc: "Interactive WhatsApp buttons automatically add or remove order tags (e.g. 'COD Confirmed', 'Order Cancelled') directly in your Shopify admin.",
      },
      {
        title: "Unlimited Agents & Seats",
        desc: "No paying $30/month for every customer service rep. Manage all store chats without seat limitations.",
      },
    ],
    competitorDrawbacks: [
      {
        title: "Hidden Conversation Markups",
        desc: "Substantial markups over official Meta pricing that inflate monthly marketing costs as your store scales.",
      },
      {
        title: "Clunky Shopify Integration",
        desc: "Requires complex third-party webhooks or Zapier connections rather than native Shopify Flow triggers.",
      },
      {
        title: "Per-Agent Seat Pricing",
        desc: "Support costs scale up rapidly with every team member added to your inbox.",
      },
    ],
    featureTable: [
      { feature: "Meta Rates Markup", whatflow: "0% (Zero Markup)", competitor: "+20-30% Markup" },
      { feature: "Shopify Flow Native Action", whatflow: "✓ Included", competitor: "✕ Requires Webhooks" },
      { feature: "Direct Shopify Billing", whatflow: "✓ 1-Click", competitor: "✕ External Stripe/Card" },
      { feature: "Judge.me & Loox Integration", whatflow: "✓ Built-in", competitor: "✕ Not Supported" },
      { feature: "COD 1-Click Order Confirmation", whatflow: "✓ Automated", competitor: "Manual macro" },
    ],
  },
  "whatflow-vs-interakt": {
    competitor: "Interakt",
    title: "WhatFlow vs Interakt: Modern WhatsApp Marketing for Shopify",
    description: "Compare WhatFlow vs Interakt. Discover why high-growth brands prefer WhatFlow's modern architecture and direct Shopify integration.",
    intro: "Interakt is a popular regional WhatsApp tool, but international Shopify stores often struggle with disjointed billing, slow webhook delivery, and complicated user interfaces. WhatFlow delivers an ultra-fast edge architecture with transparent billing and enterprise-grade reliability.",
    whatflowAdvantages: [
      {
        title: "Direct Shopify App Billing",
        desc: "All subscription charges appear directly on your unified Shopify invoice—no separate international wire transfers or payment gateways.",
      },
      {
        title: "Ultra-Fast Edge Architecture",
        desc: "Built on Cloudflare edge compute to process millions of Black Friday / Cyber Monday webhook events with sub-50ms latency.",
      },
      {
        title: "Turnkey eCommerce Automations",
        desc: "Pre-approved templates for abandoned carts, shipping notifications, COD verification, and Restock alerts ready to activate in 1 click.",
      },
    ],
    competitorDrawbacks: [
      {
        title: "Complex Onboarding",
        desc: "Multi-day manual onboarding workflows that delay launching your marketing campaigns.",
      },
      {
        title: "Cluttered Legacy UI",
        desc: "Overwhelming multi-tiered menus and non-intuitive template builder.",
      },
      {
        title: "Separate Billing Systems",
        desc: "Requires separate credit cards and invoicing outside of your Shopify account.",
      },
    ],
    featureTable: [
      { feature: "Shopify App Store Native", whatflow: "✓ Yes", competitor: "✕ Third-party portal" },
      { feature: "Edge Processing Architecture", whatflow: "✓ Sub-50ms", competitor: "Standard cloud" },
      { feature: "Shopify Unified Invoicing", whatflow: "✓ Direct", competitor: "✕ External" },
      { feature: "Pre-Approved Templates", whatflow: "✓ 20+ Ready", competitor: "Manual submission" },
      { feature: "Real-Time ROI Tracking", whatflow: "✓ Included", competitor: "Basic analytics" },
    ],
  },
  "whatflow-vs-bitespeed": {
    competitor: "BiteSpeed",
    title: "WhatFlow vs BiteSpeed: Uncapped Power with Fair Pricing",
    description: "Compare WhatFlow and BiteSpeed. Transparent flat-rate pricing without punitive GMV commissions.",
    intro: "BiteSpeed offers conversational commerce features for Shopify, but their tiered pricing models often penalize merchants as sales grow. WhatFlow provides transparent pricing with unlimited workflows, zero conversation markup, and full ecosystem flexibility.",
    whatflowAdvantages: [
      {
        title: "No Punitive Revenue Cuts",
        desc: "We never take a percentage cut of your store's GMV. You pay a predictable, transparent subscription fee.",
      },
      {
        title: "Full Shopify Flow Control",
        desc: "Trigger WhatsApp messages from any custom condition, risk score, or third-party app in your Shopify Flow graph.",
      },
      {
        title: "14-Day Full-Feature Trial",
        desc: "Test all automations and templates with zero commitment or locked features.",
      },
    ],
    competitorDrawbacks: [
      {
        title: "Higher Base Costs",
        desc: "Steep pricing jumps as your contact list and monthly order volume expands.",
      },
      {
        title: "Proprietary Silo",
        desc: "Harder to integrate with existing review apps and custom Shopify workflows.",
      },
    ],
    featureTable: [
      { feature: "Pricing Model", whatflow: "Flat Transparent Tiers", competitor: "High Base + Volume" },
      { feature: "Shopify Flow Triggers", whatflow: "✓ Unlimited", competitor: "Tier-restricted" },
      { feature: "Meta Rates Transparency", whatflow: "✓ 100% Direct", competitor: "Bundled pricing" },
      { feature: "Free Trial", whatflow: "14-Day Full Access", competitor: "Limited demo" },
    ],
  },
  "whatflow-vs-klaviyo": {
    competitor: "Klaviyo SMS",
    title: "WhatFlow vs Klaviyo SMS: Why WhatsApp Drives 4x Higher ROI",
    description: "Compare WhatsApp marketing vs Klaviyo SMS. Learn why WhatsApp provides 98% open rates and lower international message costs.",
    intro: "While Klaviyo is the gold standard for email, SMS marketing suffers from low international deliverability, strict character limits, and high carrier fees. WhatFlow gives your Shopify store the global reach and interactive power of WhatsApp while integrating seamlessly with your Klaviyo segments.",
    whatflowAdvantages: [
      {
        title: "98% Open Rates & Global Reach",
        desc: "WhatsApp is the primary messaging app in over 100+ countries with near-instant message reads and engagement.",
      },
      {
        title: "Interactive Buttons & Rich Media",
        desc: "Include full product images, 1-click CTA buttons, and interactive order confirmation cards that SMS cannot provide.",
      },
      {
        title: "Syncs Seamlessly with Klaviyo",
        desc: "You don't have to choose! WhatFlow synchronizes opt-ins and customer profiles directly into your existing Klaviyo account.",
      },
    ],
    competitorDrawbacks: [
      {
        title: "Expensive International SMS Rates",
        desc: "Carrier fees outside the US make SMS cost-prohibitive for global eCommerce brands.",
      },
      {
        title: "Plain Text Limitations",
        desc: "SMS lacks interactive buttons, product image carousels, and verified green checkmark sender branding.",
      },
    ],
    featureTable: [
      { feature: "Average Open Rate", whatflow: "94 - 98%", competitor: "35 - 55% (Email/SMS)" },
      { feature: "Interactive Buttons", whatflow: "✓ Quick Reply & CTA", competitor: "✕ Plain text link only" },
      { feature: "Global Message Cost", whatflow: "Low wholesale Meta rates", competitor: "High carrier SMS fees" },
      { feature: "Verified Sender Badge", whatflow: "✓ Official Green Tick", competitor: "✕ Shortcode / Unknown" },
      { feature: "Klaviyo Contact Sync", whatflow: "✓ 2-Way Sync", competitor: "Native" },
    ],
  },
};

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = COMPARISON_DETAILS[slug];

  if (!item) {
    return { title: "Comparison Not Found | WhatFlow" };
  }

  return {
    title: `${item.title} | WhatFlow`,
    description: item.description,
  };
}

export default async function CompareDetailPage({ params }: ComparePageProps) {
  const { slug } = await params;
  const item = COMPARISON_DETAILS[slug];

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* ─── Hero ─── */}
      <section className="bg-[#FAF7F0] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-[1080px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#00D261] transition-colors">Home</Link>
            <span>›</span>
            <Link href="/compare" className="hover:text-[#00D261] transition-colors">Compare</Link>
            <span>›</span>
            <span className="text-black">WhatFlow vs {item.competitor}</span>
          </div>

          <div className="neo-box inline-block bg-[#00D261] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black mb-4">
            COMPETITOR COMPARISON
          </div>
          <h1 className="text-[38px] sm:text-[54px] lg:text-[68px] font-display font-black uppercase text-black tracking-tight leading-none mb-6">
            WHATFLOW VS <br />
            <span className="text-stroke-green">{item.competitor.toUpperCase()}.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-medium max-w-2xl leading-relaxed">
            {item.intro}
          </p>
        </div>
      </section>

      {/* ─── Feature Comparison Table ─── */}
      <section className="px-4 sm:px-6 py-14 max-w-[1080px] mx-auto">
        <div className="neo-box bg-white p-6 sm:p-10 rounded-2xl space-y-6">
          <h2 className="text-2xl font-display font-black uppercase text-black">
            Side-by-Side Feature Matrix
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-black bg-[#FAF7F0]">
                  <th className="p-3.5 font-display font-black uppercase text-black">Feature / Metric</th>
                  <th className="p-3.5 font-display font-black uppercase text-[#0A6B56] bg-[#00D261]/20 border-x-2 border-black">WhatFlow</th>
                  <th className="p-3.5 font-display font-black uppercase text-gray-700">{item.competitor}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {item.featureTable.map((row) => (
                  <tr key={row.feature}>
                    <td className="p-3.5 font-bold text-black">{row.feature}</td>
                    <td className="p-3.5 font-black text-[#0A6B56] bg-[#00D261]/10 border-x-2 border-black">{row.whatflow}</td>
                    <td className="p-3.5 text-gray-600 font-medium">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Advantages & Drawbacks ─── */}
      <section className="px-4 sm:px-6 pb-16 max-w-[1080px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WhatFlow Advantages */}
          <div className="neo-box bg-white p-8 rounded-2xl space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#00D261] border border-black flex items-center justify-center text-xs font-black text-black">
                ✓
              </div>
              <h2 className="text-xl font-display font-black uppercase text-black">
                The WhatFlow Advantage
              </h2>
            </div>
            <div className="space-y-4">
              {item.whatflowAdvantages.map((adv) => (
                <div key={adv.title} className="space-y-1">
                  <div className="text-sm font-extrabold uppercase text-black">{adv.title}</div>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Competitor Drawbacks */}
          <div className="neo-box bg-[#FAF7F0] p-8 rounded-2xl space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-100 border border-black flex items-center justify-center text-xs font-black text-red-600">
                ✕
              </div>
              <h2 className="text-xl font-display font-black uppercase text-black">
                {item.competitor} Limitations
              </h2>
            </div>
            <div className="space-y-4">
              {item.competitorDrawbacks.map((draw) => (
                <div key={draw.title} className="space-y-1">
                  <div className="text-sm font-extrabold uppercase text-black">{draw.title}</div>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">{draw.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="px-4 sm:px-6 pb-20 max-w-[1080px] mx-auto">
        <div className="neo-box-teal p-8 sm:p-12 rounded-2xl text-center text-white space-y-4">
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tight">
            SWITCH TO WHATFLOW IN UNDER 5 MINUTES
          </h2>
          <p className="text-sm text-[#A7F3D0] max-w-xl mx-auto font-medium leading-relaxed">
            Keep your existing WhatsApp number and Meta WABA. No downtime, zero migration friction.
          </p>
          <div className="pt-2">
            <Link
              href={getShopifyAppUrl(`compare_${item.competitor.toLowerCase().replace(/[^a-z0-9]/g, "_")}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn inline-flex items-center gap-2 bg-[#00D261] text-black font-extrabold text-xs uppercase px-7 py-3.5 rounded-lg shadow-[4px_4px_0px_#000] hover:scale-105 transition-transform"
            >
              <span>START 14-DAY FREE TRIAL</span>
              <span>➔</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
