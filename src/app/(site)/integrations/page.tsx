import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getIntegrations, INTEGRATION_CATEGORY_LABELS, type Integration } from "@/lib/payload-api";

export const metadata: Metadata = {
  title: "Integrations & Shopify App Ecosystem | WhatFlow",
  description: "Connect WhatFlow with Shopify Flow, Judge.me, Klaviyo, Gorgias, Loox, and your favorite eCommerce tools.",
};

const DEFAULT_INTEGRATIONS: Partial<Integration>[] = [
  {
    name: "Shopify Flow",
    slug: "shopify-flow",
    category: "automation",
    tagline: "Trigger custom WhatsApp workflows from any Shopify event",
    description: "Connect WhatFlow triggers and actions into Shopify Flow to build omnichannel automations, VIP tagging, and order alerts.",
    featured: true,
    status: "published",
    keyFeatures: [
      { feature: "Native Shopify Flow Action triggers" },
      { feature: "Custom payload variable mapping" },
      { feature: "No-code workflow builder" },
    ],
  },
  {
    name: "Judge.me Reviews",
    slug: "judge-me",
    category: "reviews",
    tagline: "Collect photo reviews via interactive WhatsApp buttons",
    description: "Automatically send high-converting WhatsApp review requests once an order is delivered with 1-click star ratings.",
    featured: true,
    status: "published",
    keyFeatures: [
      { feature: "Automated post-delivery triggers" },
      { feature: "5-star rating interactive buttons" },
      { feature: "Direct sync to Judge.me dashboard" },
    ],
  },
  {
    name: "Klaviyo",
    slug: "klaviyo",
    category: "marketing",
    tagline: "Sync customer opt-ins & omnichannel marketing segments",
    description: "Combine the power of email and WhatsApp. Sync WhatsApp opt-ins and suppression lists directly between Klaviyo and WhatFlow.",
    featured: true,
    status: "published",
    keyFeatures: [
      { feature: "Two-way customer profile sync" },
      { feature: "Omnichannel abandoned cart orchestration" },
      { feature: "Smart frequency capping" },
    ],
  },
  {
    name: "Gorgias",
    slug: "gorgias",
    category: "support",
    tagline: "Unified WhatsApp customer service inside Gorgias Helpdesk",
    description: "Route two-way WhatsApp customer chats directly into your Gorgias inbox alongside email and live chat tickets.",
    featured: true,
    status: "published",
    keyFeatures: [
      { feature: "Unified agent ticket inbox" },
      { feature: "Shopify customer order context overlay" },
      { feature: "Automated canned macro responses" },
    ],
  },
  {
    name: "Loox Reviews",
    slug: "loox",
    category: "reviews",
    tagline: "Collect visual customer reviews & photo UGC on WhatsApp",
    description: "Prompt recent buyers on WhatsApp to submit photos and videos with high open rates and instant coupon reward codes.",
    featured: false,
    status: "published",
    keyFeatures: [
      { feature: "Photo & video review collection" },
      { feature: "Automated discount incentive delivery" },
      { feature: "Verified buyer badge sync" },
    ],
  },
  {
    name: "Recharge Subscriptions",
    slug: "recharge",
    category: "subscriptions",
    tagline: "WhatsApp upcoming charge alerts & 1-click order skips",
    description: "Reduce subscription churn by sending friendly WhatsApp renewal reminders and letting customers skip or swap products in chat.",
    featured: false,
    status: "published",
    keyFeatures: [
      { feature: "Upcoming renewal notifications" },
      { feature: "1-click skip or delay buttons" },
      { feature: "Credit card expiry failure alerts" },
    ],
  },
];

interface IntegrationsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function IntegrationsPage({ searchParams }: IntegrationsPageProps) {
  const params = await searchParams;
  const selectedCategory = params.category ?? "all";

  let cmsIntegrations: Integration[] = [];
  try {
    const res = await getIntegrations({
      category: selectedCategory !== "all" ? selectedCategory : undefined,
    });
    cmsIntegrations = res.docs;
  } catch {
    cmsIntegrations = [];
  }

  // Combine CMS integrations with default fallback integrations
  const allIntegrations =
    cmsIntegrations.length > 0
      ? cmsIntegrations
      : (DEFAULT_INTEGRATIONS.filter(
          (item) => selectedCategory === "all" || item.category === selectedCategory
        ) as Integration[]);

  const categories = [
    { key: "all", label: "All Integrations" },
    { key: "automation", label: "Automation" },
    { key: "reviews", label: "Reviews & UGC" },
    { key: "marketing", label: "Marketing" },
    { key: "support", label: "Support" },
    { key: "subscriptions", label: "Subscriptions" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* ─── Hero ─── */}
      <section className="bg-[#FAF7F0] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto text-center">
          <div className="neo-box inline-block bg-[#00D261] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black mb-4">
            ECOSYSTEM &amp; PARTNERS
          </div>
          <h1 className="text-[44px] sm:text-[60px] lg:text-[76px] font-display font-black uppercase text-black tracking-tight leading-none mb-6">
            CONNECT WHATFLOW WITH <br />
            <span className="text-stroke-green">YOUR ENTIRE STACK.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-medium max-w-2xl mx-auto">
            Supercharge your Shopify store with seamless native integrations for reviews, helpdesks, marketing automation, and subscriptions.
          </p>
        </div>
      </section>

      {/* ─── Category Filter Tabs ─── */}
      <section className="border-b-[2.5px] border-black bg-white px-4 sm:px-6 py-4 sticky top-0 z-30">
        <div className="max-w-[1280px] mx-auto flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <Link
                key={cat.key}
                href={cat.key === "all" ? "/integrations" : `/integrations?category=${cat.key}`}
                className={`neo-pill px-4 py-2 text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#00D261] text-black shadow-[2px_2px_0px_#000]"
                    : "bg-[#FAF7F0] text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── Integrations Grid ─── */}
      <section className="px-4 sm:px-6 py-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allIntegrations.map((item) => (
            <Link
              key={item.slug}
              href={`/integrations/${item.slug}`}
              className="neo-box bg-white p-7 flex flex-col justify-between rounded-2xl group hover:-translate-y-1 transition-transform"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF7F0] border-2 border-black flex items-center justify-center font-display font-black text-lg text-black shadow-[2px_2px_0px_#000]">
                    {item.logo?.url ? (
                      <Image src={item.logo.url} alt={item.name} width={36} height={36} className="object-contain" />
                    ) : (
                      item.name.charAt(0)
                    )}
                  </div>
                  <span className="neo-pill bg-[#FAF7F0] border-black text-[10px] font-black uppercase px-2.5 py-0.5">
                    {INTEGRATION_CATEGORY_LABELS[item.category] ?? item.category}
                  </span>
                </div>

                <div>
                  <h2 className="font-display font-black text-xl text-black uppercase group-hover:text-[#0A6B56] transition-colors leading-tight">
                    {item.name}
                  </h2>
                  <div className="text-xs font-bold text-[#00D261] uppercase tracking-wider mt-1">
                    {item.tagline}
                  </div>
                </div>

                <p className="text-xs font-medium text-gray-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {item.keyFeatures && item.keyFeatures.length > 0 && (
                  <div className="pt-2 border-t border-gray-100 space-y-1.5">
                    {item.keyFeatures.slice(0, 3).map((f) => (
                      <div key={f.feature} className="text-[11px] font-bold text-gray-700 flex items-center gap-1.5">
                        <span className="text-[#00D261] font-black">✓</span>
                        <span>{f.feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-[#2563EB] group-hover:text-[#00D261] transition-colors">
                <span>VIEW INTEGRATION GUIDE</span>
                <span>➔</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Request Integration CTA ─── */}
      <section className="px-4 sm:px-6 pb-20 max-w-[1280px] mx-auto">
        <div className="neo-box bg-[#091E17] text-white p-8 sm:p-12 rounded-2xl text-center space-y-4">
          <div className="neo-box inline-block bg-[#00D261] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
            CUSTOM WORKFLOWS
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight">
            DON&apos;T SEE YOUR FAVORITE APP?
          </h2>
          <p className="text-sm text-[#A7F3D0] max-w-xl mx-auto font-medium leading-relaxed">
            WhatFlow connects to any Shopify app through our native Shopify Flow triggers and webhooks. Reach out to request a dedicated native connector!
          </p>
          <div className="pt-2">
            <a
              href="mailto:support@whatflow.io"
              className="neo-btn inline-flex items-center gap-2 bg-[#00D261] text-black font-extrabold text-xs uppercase px-6 py-3 rounded-lg shadow-[3px_3px_0px_#000]"
            >
              <span>REQUEST AN INTEGRATION</span>
              <span>➔</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
