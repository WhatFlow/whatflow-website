import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getShopifyAppUrl } from "@/lib/shopify-app";
import { getBreadcrumbSchema, getFAQSchema, SITE_URL } from "@/lib/schema-org";

interface ComparePageProps {
  params: Promise<{ slug: string }>;
}

interface ComparisonData {
  competitor: string;
  title: string;
  description: string;
  intro: string;
  whatflowAdvantages: { title: string; desc: string }[];
  competitorDrawbacks: { title: string; desc: string }[];
  featureTable: { feature: string; whatflow: string; competitor: string }[];
  faqs?: { question: string; answer: string }[];
}

const COMPARISON_DETAILS: Record<string, ComparisonData> = {
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
    faqs: [
      {
        question: "Can I migrate from Wati to WhatFlow without losing my WhatsApp number?",
        answer: "Yes! You can easily migrate your verified WhatsApp Business Account (WABA) number directly to WhatFlow with zero downtime and keep your green tick status.",
      },
      {
        question: "How does WhatFlow pricing compare to Wati?",
        answer: "WhatFlow offers transparent subscription plans with zero conversation markup. Wati charges per-agent seat fees and marks up every WhatsApp conversation.",
      },
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
    faqs: [
      {
        question: "Why do Shopify merchants switch from Interakt to WhatFlow?",
        answer: "Merchants switch for direct Shopify app store billing, instant onboarding via Meta Embedded Signup, and significantly faster message delivery rates.",
      },
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
    faqs: [
      {
        question: "Does WhatFlow take any percentage of my recovered cart sales?",
        answer: "No, WhatFlow never charges GMV commission fees. All recovered revenue is 100% yours.",
      },
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
    faqs: [
      {
        question: "Can I use WhatFlow alongside Klaviyo?",
        answer: "Yes! WhatFlow is designed to work alongside Klaviyo. Use Klaviyo for email newsletters and WhatFlow for instant WhatsApp cart recovery and order alerts.",
      },
    ],
  },
  "whatflow-vs-quickreply": {
    competitor: "QuickReply.ai",
    title: "WhatFlow vs QuickReply.ai: Better Automation at Lower Cost",
    description: "Compare WhatFlow vs QuickReply.ai. See why Shopify merchants choose WhatFlow for modern UI, zero conversation markup, and seamless Flow automations.",
    intro: "QuickReply.ai is focused on conversational AI, but merchants often find their pricing tiers restrictive and setup complex. WhatFlow provides an ultra-clean interface, instant Meta Cloud API connection, zero markups, and native Shopify Flow integrations.",
    whatflowAdvantages: [
      {
        title: "Direct Wholesale Meta Rates",
        desc: "No markup on Meta API conversation charges, saving growing Shopify stores hundreds of dollars monthly.",
      },
      {
        title: "Native Shopify App Store Experience",
        desc: "1-click installation with Shopify managed billing and deep admin integration.",
      },
      {
        title: "Modern Neo-Brutalist Dashboard",
        desc: "Lightning fast dashboard built for high-volume stores without lag or confusing multi-layer menus.",
      },
    ],
    competitorDrawbacks: [
      {
        title: "Steep Learning Curve",
        desc: "Complex chatbot builder that takes hours to configure and test.",
      },
      {
        title: "Higher Monthly Tiers",
        desc: "Higher barrier to entry for early-stage and mid-market Shopify brands.",
      },
    ],
    featureTable: [
      { feature: "Meta Markup", whatflow: "0% (Direct Wholesale)", competitor: "Custom markup" },
      { feature: "Shopify Flow Native Action", whatflow: "✓ Built-in", competitor: "Limited triggers" },
      { feature: "Setup Time", whatflow: "Under 3 minutes", competitor: "30+ minutes" },
      { feature: "Unlimited Agent Seats", whatflow: "✓ Yes", competitor: "Seat-restricted" },
    ],
    faqs: [
      {
        question: "How fast is setup with WhatFlow compared to QuickReply.ai?",
        answer: "WhatFlow uses Meta's official Embedded Signup, allowing you to connect your phone number and launch pre-approved templates in under 3 minutes.",
      },
    ],
  },
  "whatflow-vs-tidio": {
    competitor: "Tidio",
    title: "WhatFlow vs Tidio: Dedicated WhatsApp Power for Shopify",
    description: "Compare WhatFlow vs Tidio WhatsApp. Learn why WhatFlow's eCommerce-first WhatsApp suite outperforms generic multi-channel chat widgets.",
    intro: "Tidio is an excellent general live-chat widget, but its WhatsApp capabilities are an add-on with limited eCommerce trigger depth. WhatFlow is engineered specifically for Shopify, offering automated COD verification, review gathering, and native Shopify Flow triggers.",
    whatflowAdvantages: [
      {
        title: "Full eCommerce Lifecycle Automations",
        desc: "Automated cart recovery, order confirmation, shipping tracking, and review requests out of the box.",
      },
      {
        title: "Shopify COD Fraud Prevention",
        desc: "Interactive 1-click confirmation buttons that auto-tag Shopify orders to prevent RTO losses.",
      },
      {
        title: "Unlimited WhatsApp Team Seats",
        desc: "Empower your entire customer support and sales team without per-seat add-on fees.",
      },
    ],
    competitorDrawbacks: [
      {
        title: "Generic Live-Chat Focus",
        desc: "WhatsApp features are treated as secondary to website live-chat widgets.",
      },
      {
        title: "Limited Shopify Event Triggers",
        desc: "Lacks deep integration with Shopify order statuses and review apps like Judge.me and Loox.",
      },
    ],
    featureTable: [
      { feature: "Primary Focus", whatflow: "Shopify WhatsApp Engine", competitor: "Multi-channel Widget" },
      { feature: "COD Verification Buttons", whatflow: "✓ Native 1-Click", competitor: "✕ Not Available" },
      { feature: "Review App Integrations", whatflow: "✓ Judge.me / Loox", competitor: "✕ Limited" },
      { feature: "Unlimited Team Seats", whatflow: "✓ Included", competitor: "✕ Per-Seat Billing" },
    ],
    faqs: [
      {
        question: "Can I use WhatFlow if I only need WhatsApp?",
        answer: "Yes! WhatFlow is built 100% for WhatsApp, giving you significantly deeper Shopify automations and better Meta Cloud API reliability.",
      },
    ],
  },
  "whatflow-vs-aisensy": {
    competitor: "AiSensy",
    title: "WhatFlow vs AiSensy: The Global Shopify WhatsApp Alternative",
    description: "Compare WhatFlow vs AiSensy. See why Shopify brands worldwide choose WhatFlow for direct Shopify App Store billing and edge performance.",
    intro: "AiSensy is a general WhatsApp broadcast tool with limited Shopify automation depth. WhatFlow provides native Shopify Flow integration, automated abandoned cart recovery, and direct Shopify billing in your store's local currency.",
    whatflowAdvantages: [
      {
        title: "Shopify-First Design & Billing",
        desc: "Billed directly via Shopify with 1-click installation and no separate third-party payment processing.",
      },
      {
        title: "Automated Dynamic Cart Recovery",
        desc: "Send personalized WhatsApp recovery links with images of the exact abandoned items.",
      },
      {
        title: "Global Low-Latency Infrastructure",
        desc: "Powered by Cloudflare edge compute to guarantee instant webhook execution worldwide.",
      },
    ],
    competitorDrawbacks: [
      {
        title: "Non-Shopify Centric",
        desc: "Broad focus across multiple industries means slower eCommerce-specific feature rollouts.",
      },
      {
        title: "Manual Shopify Sync",
        desc: "Requires manual CSV uploads or basic webhook setups for advanced store events.",
      },
    ],
    featureTable: [
      { feature: "Shopify App Store Billing", whatflow: "✓ Direct 1-Click", competitor: "✕ External Invoicing" },
      { feature: "Shopify Flow Integration", whatflow: "✓ Native Action", competitor: "✕ Webhook Only" },
      { feature: "Automated Cart Recovery", whatflow: "✓ Dynamic Products", competitor: "Manual broadcast" },
      { feature: "Global Edge Infrastructure", whatflow: "✓ Sub-50ms", competitor: "Single-region cloud" },
    ],
    faqs: [
      {
        question: "Is WhatFlow suitable for international stores?",
        answer: "Yes, WhatFlow is built on Cloudflare's global edge network, delivering WhatsApp webhooks and messages with sub-50ms latency across 100+ countries.",
      },
    ],
  },
  "whatflow-vs-gorgias": {
    competitor: "Gorgias WhatsApp",
    title: "WhatFlow vs Gorgias: Affordable WhatsApp Automations for Shopify",
    description: "Compare WhatFlow vs Gorgias WhatsApp. Discover why stores use WhatFlow for cost-effective outbound marketing and proactive WhatsApp automations.",
    intro: "Gorgias is a premier support helpdesk, but its WhatsApp feature is expensive and focused only on inbound support tickets. WhatFlow provides both high-ROI outbound marketing campaigns (cart recovery, COD verification) and 2-way support at a fraction of the cost.",
    whatflowAdvantages: [
      {
        title: "Proactive Marketing & Cart Recovery",
        desc: "Drive incremental revenue with automated abandoned checkout sequences and promotional broadcasts.",
      },
      {
        title: "Fraction of the Cost",
        desc: "Avoid expensive per-ticket helpdesk pricing tiers while getting full WhatsApp marketing capabilities.",
      },
      {
        title: "Seamless Support Handoff",
        desc: "Use WhatFlow's built-in live chat inbox or connect to your external support workflows via webhooks.",
      },
    ],
    competitorDrawbacks: [
      {
        title: "High Per-Ticket Pricing",
        desc: "Gorgias charges steep overages as support ticket volume increases.",
      },
      {
        title: "Limited Outbound Marketing",
        desc: "Does not provide comprehensive outbound marketing campaigns, dynamic discount broadcasts, or review collection flows.",
      },
    ],
    featureTable: [
      { feature: "Outbound Marketing Broadcasts", whatflow: "✓ Unlimited", competitor: "✕ Inbound Support Only" },
      { feature: "Abandoned Cart Recovery", whatflow: "✓ Automated Dynamic", competitor: "✕ Not Supported" },
      { feature: "Pricing Basis", whatflow: "Predictable Flat Tiers", competitor: "Per-Ticket Surcharges" },
      { feature: "Zero Meta Rate Markup", whatflow: "✓ Direct Wholesale", competitor: "Bundled pricing" },
    ],
    faqs: [
      {
        question: "Can I use WhatFlow for marketing and Gorgias for support?",
        answer: "Yes! Many top Shopify brands use WhatFlow for automated outbound WhatsApp marketing, abandoned cart recovery, and review collection while managing generic support tickets in Gorgias.",
      },
    ],
  },
};

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = COMPARISON_DETAILS[slug];

  if (!item) {
    return { title: "Comparison Not Found | WhatFlow" };
  }

  const canonicalUrl = `${SITE_URL}/compare/${slug}`;

  return {
    title: `${item.title}`,
    description: item.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${item.title}`,
      description: item.description,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title}`,
      description: item.description,
    },
  };
}

export default async function CompareDetailPage({ params }: ComparePageProps) {
  const { slug } = await params;
  const item = COMPARISON_DETAILS[slug];

  if (!item) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Compare", url: "/compare" },
    { name: `WhatFlow vs ${item.competitor}`, url: `/compare/${slug}` },
  ]);

  const faqSchema = item.faqs ? getFAQSchema(item.faqs) : null;

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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

      {/* ─── FAQs ─── */}
      {item.faqs && item.faqs.length > 0 && (
        <section className="px-4 sm:px-6 pb-16 max-w-[1080px] mx-auto">
          <div className="neo-box bg-white p-8 rounded-2xl space-y-6">
            <h2 className="text-2xl font-display font-black uppercase text-black">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {item.faqs.map((faq) => (
                <div key={faq.question} className="border-b border-gray-200 pb-4 last:border-b-0 space-y-1">
                  <h3 className="text-sm font-extrabold uppercase text-black">{faq.question}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
