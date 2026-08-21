import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getIntegration, INTEGRATION_CATEGORY_LABELS, type Integration } from "@/lib/payload-api";
import { getShopifyAppUrl } from "@/lib/shopify-app";

interface IntegrationPageProps {
  params: Promise<{ slug: string }>;
}

const FALLBACK_INTEGRATIONS_MAP: Record<string, Partial<Integration>> = {
  "shopify-flow": {
    name: "Shopify Flow",
    slug: "shopify-flow",
    category: "automation",
    tagline: "Trigger custom WhatsApp workflows from any Shopify event",
    description: "WhatFlow integrates natively with Shopify Flow. You can listen for any Shopify trigger—such as high-value orders, risk analysis flags, custom app events—and instantly send targeted WhatsApp notifications or update order tags with zero code.",
    keyFeatures: [
      { feature: "Native Shopify Flow Action triggers" },
      { feature: "Custom payload variable mapping" },
      { feature: "Automated two-way conversational replies" },
      { feature: "Customer tag reconciliation and VIP segmentation" },
    ],
  },
  "judge-me": {
    name: "Judge.me Reviews",
    slug: "judge-me",
    category: "reviews",
    tagline: "Collect photo reviews via interactive WhatsApp buttons",
    description: "Boost your store's review collection rate by up to 4x. Once an order is marked fulfilled or delivered, WhatFlow sends a friendly WhatsApp message with 1-click star rating buttons that link directly to Judge.me's photo submission form.",
    keyFeatures: [
      { feature: "Automated post-delivery triggers" },
      { feature: "1-click interactive star buttons" },
      { feature: "Instant discount coupon generation on review submit" },
      { feature: "Direct sync into Judge.me dashboard" },
    ],
  },
  "klaviyo": {
    name: "Klaviyo",
    slug: "klaviyo",
    category: "marketing",
    tagline: "Sync customer opt-ins & omnichannel marketing segments",
    description: "Bridge the gap between email and WhatsApp marketing. When customers opt in to WhatsApp notifications via WhatFlow, their marketing consent and phone number automatically synchronize into your Klaviyo customer profiles.",
    keyFeatures: [
      { feature: "Two-way customer profile synchronization" },
      { feature: "Omnichannel abandoned checkout recovery orchestration" },
      { feature: "Suppression list and unsubscribes synchronization" },
    ],
  },
  "gorgias": {
    name: "Gorgias",
    slug: "gorgias",
    category: "support",
    tagline: "Unified WhatsApp customer service inside Gorgias Helpdesk",
    description: "Provide world-class customer service right where your customers are. Inbound WhatsApp customer queries and replies are routed directly into your Gorgias unified helpdesk with full Shopify order history sidebars.",
    keyFeatures: [
      { feature: "Unified agent ticket inbox across WhatsApp and Email" },
      { feature: "Live Shopify customer order context overlay" },
      { feature: "Automated canned macro responses and auto-responders" },
    ],
  },
};

export async function generateMetadata({ params }: IntegrationPageProps): Promise<Metadata> {
  const { slug } = await params;
  let integration: Integration | null = null;
  try {
    integration = await getIntegration(slug);
  } catch {
    integration = null;
  }
  const item = integration || (FALLBACK_INTEGRATIONS_MAP[slug] as Integration | undefined);

  if (!item) {
    return { title: "Integration Not Found | WhatFlow" };
  }

  return {
    title: `${item.name} WhatsApp Integration for Shopify | WhatFlow`,
    description: item.description,
  };
}

export default async function IntegrationDetailPage({ params }: IntegrationPageProps) {
  const { slug } = await params;

  let integration: Integration | null = null;
  try {
    integration = await getIntegration(slug);
  } catch {
    integration = null;
  }

  const item = integration || (FALLBACK_INTEGRATIONS_MAP[slug] as Integration | undefined);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* ─── Header ─── */}
      <section className="bg-[#FAF7F0] border-b-[2.5px] border-black px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-[1080px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#00D261] transition-colors">Home</Link>
            <span>›</span>
            <Link href="/integrations" className="hover:text-[#00D261] transition-colors">Integrations</Link>
            <span>›</span>
            <span className="text-black">{item.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white border-2 border-black flex items-center justify-center font-display font-black text-2xl text-black shadow-[3px_3px_0px_#000] flex-shrink-0">
                {item.logo?.url ? (
                  <Image src={item.logo.url} alt={item.name} width={48} height={48} className="object-contain" />
                ) : (
                  item.name.charAt(0)
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="neo-pill bg-[#00D261] text-black text-[10px] font-black uppercase px-2.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                    {INTEGRATION_CATEGORY_LABELS[item.category] ?? item.category}
                  </span>
                  <span className="text-xs font-bold text-gray-500 uppercase">OFFICIAL CONNECTOR</span>
                </div>
                <h1 className="text-[34px] sm:text-[48px] font-display font-black uppercase text-black tracking-tight leading-none">
                  {item.name}
                </h1>
                <p className="text-sm font-bold text-gray-600 mt-1">
                  {item.tagline}
                </p>
              </div>
            </div>

            <Link
              href={getShopifyAppUrl(`integration_header_${item.slug.replace(/[^a-z0-9]/g, "_")}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-[#00D261] text-black font-extrabold text-xs uppercase px-6 py-3.5 rounded-lg shadow-[3px_3px_0px_#000] self-start md:self-auto flex items-center gap-2"
            >
              <span>INSTALL WHATFLOW FOR SHOPIFY</span>
              <span>➔</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <section className="px-4 sm:px-6 py-14 max-w-[1080px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="neo-box bg-white p-8 rounded-2xl space-y-6">
              <h2 className="text-xl font-display font-black uppercase text-black">
                About the Integration
              </h2>
              <p className="text-sm font-medium text-gray-700 leading-relaxed">
                {item.description}
              </p>

              {item.keyFeatures && item.keyFeatures.length > 0 && (
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-black">
                    Key Capabilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.keyFeatures.map((f) => (
                      <div key={f.feature} className="neo-box bg-[#FAF7F0] p-3 rounded-lg flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#00D261] border border-black flex items-center justify-center text-[10px] font-black text-black flex-shrink-0">
                          ✓
                        </div>
                        <span className="text-xs font-bold text-black">{f.feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* How to Setup Box */}
            <div className="neo-box bg-white p-8 rounded-2xl space-y-4">
              <h2 className="text-xl font-display font-black uppercase text-black">
                How It Works (Setup in 2 Minutes)
              </h2>
              <ol className="list-decimal pl-5 space-y-2 text-xs font-medium text-gray-700 leading-relaxed">
                <li>Install WhatFlow from the Shopify App Store and connect your WhatsApp Business Account.</li>
                <li>Go to the <strong>Integrations</strong> tab inside your WhatFlow dashboard and enable {item.name}.</li>
                <li>Choose your preferred message templates and automated trigger events.</li>
                <li>Your store is ready to send live automated WhatsApp updates!</li>
              </ol>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="neo-box bg-white p-6 rounded-2xl space-y-4">
              <div className="text-xs font-extrabold uppercase tracking-wider text-black border-b border-gray-100 pb-2">
                Integration Details
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-gray-500 font-bold uppercase text-[10px]">Developer</div>
                  <div className="font-extrabold text-black">WhatFlow Official</div>
                </div>
                <div>
                  <div className="text-gray-500 font-bold uppercase text-[10px]">Compatibility</div>
                  <div className="font-extrabold text-black">All Shopify &amp; Shopify Plus Stores</div>
                </div>
                <div>
                  <div className="text-gray-500 font-bold uppercase text-[10px]">Meta API Engine</div>
                  <div className="font-extrabold text-[#0A6B56]">Official Cloud API (v25.0)</div>
                </div>
              </div>
            </div>

            <div className="neo-box-teal p-6 rounded-2xl text-center text-white space-y-3">
              <div className="font-display font-black text-lg uppercase">
                Ready to setup {item.name}?
              </div>
              <p className="text-xs text-[#A7F3D0] font-medium">
                Try WhatFlow risk-free for 14 days. No credit card required.
              </p>
              <Link
                href={getShopifyAppUrl(`integration_sidebar_${item.slug.replace(/[^a-z0-9]/g, "_")}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn w-full bg-[#00D261] text-black font-extrabold text-xs uppercase py-3 rounded-lg shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1"
              >
                <span>INSTALL FREE TRIAL</span>
                <span>➔</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
