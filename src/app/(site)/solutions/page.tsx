import type { Metadata } from "next";
import Link from "next/link";
import { getBreadcrumbSchema, SITE_URL } from "@/lib/schema-org";

export const metadata: Metadata = {
  title: "WhatsApp eCommerce Solutions for Shopify | WhatFlow",
  description:
    "Explore WhatFlow's suite of Shopify WhatsApp solutions: Abandoned cart recovery, COD confirmation, automated shipping alerts, review collection, and storefront chat buttons.",
  keywords: [
    "Shopify WhatsApp solutions",
    "WhatsApp eCommerce automation",
    "Shopify abandoned cart WhatsApp",
    "Shopify COD verification WhatsApp",
    "WhatsApp order tracking Shopify",
    "WhatsApp review collection",
  ],
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: "WhatsApp eCommerce Solutions for Shopify | WhatFlow",
    description:
      "Explore WhatFlow's suite of Shopify WhatsApp solutions: Abandoned cart recovery, COD confirmation, automated shipping alerts, review collection, and storefront chat buttons.",
    url: `${SITE_URL}/solutions`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp eCommerce Solutions for Shopify | WhatFlow",
    description:
      "Explore WhatFlow's suite of Shopify WhatsApp solutions: Abandoned cart recovery, COD confirmation, automated shipping alerts, review collection, and storefront chat buttons.",
  },
};

const SOLUTIONS = [
  {
    slug: "abandoned-cart-recovery",
    tag: "CART RECOVERY",
    tagColor: "bg-[#FFC107] text-black",
    title: "Abandoned Cart Recovery",
    desc: "Recover up to 25% of lost checkouts with personalized 98% open-rate WhatsApp messages and 1-click checkout recovery links.",
    stat: "25% Recovery Rate",
  },
  {
    slug: "cod-order-verification",
    tag: "FRAUD PREVENTION",
    tagColor: "bg-[#00D261] text-black",
    title: "COD Confirmation & Anti-RTO",
    desc: "Cut Cash on Delivery Return-to-Origin (RTO) losses by up to 40% with interactive 1-click confirmation buttons and automatic Shopify order tags.",
    stat: "40% RTO Reduction",
  },
  {
    slug: "order-tracking-notifications",
    tag: "POST-PURCHASE",
    tagColor: "bg-[#2563EB] text-white",
    title: "Order Tracking & Shipping Alerts",
    desc: "Deliver real-time fulfillment updates, tracking numbers, and out-for-delivery alerts directly to WhatsApp, reducing WISMO tickets by 60%.",
    stat: "60% Fewer Support Tickets",
  },
  {
    slug: "whatsapp-reviews-ugc",
    tag: "REVIEWS & UGC",
    tagColor: "bg-[#FF4B4B] text-white",
    title: "Review & UGC Collection",
    desc: "Generate 5x more product reviews and photo testimonials on WhatsApp with native Judge.me and Loox integrations.",
    stat: "5x Higher Review Rate",
  },
  {
    slug: "chat-button",
    tag: "STOREFRONT CONVERSION",
    tagColor: "bg-[#00D261] text-black",
    title: "WhatsApp Chat Button & Support",
    desc: "Add a high-converting, lightweight WhatsApp chat widget to your storefront with dynamic product context and multi-agent routing.",
    stat: "3-Min No-Code Setup",
  },
];

export default function SolutionsHubPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/solutions" },
  ]);

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ─── Hero ─── */}
      <section className="bg-[#FAF7F0] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-[1080px] mx-auto text-center space-y-4">
          <div className="neo-box inline-block bg-[#00D261] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black">
            SHOPIFY WHATSAPP SOLUTIONS
          </div>
          <h1 className="text-[36px] sm:text-[52px] lg:text-[64px] font-display font-black uppercase text-black tracking-tight leading-none">
            EVERY TOOL TO GROW YOUR STORE.
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
            Discover tailored WhatsApp marketing and automation solutions designed to drive revenue at every step of the customer journey.
          </p>
        </div>
      </section>

      {/* ─── Solutions Grid ─── */}
      <section className="px-4 sm:px-6 py-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SOLUTIONS.map((item) => (
            <div
              key={item.slug}
              className="neo-box bg-white p-8 rounded-2xl flex flex-col justify-between space-y-6 hover:-translate-y-1 transition-transform"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`neo-pill px-3 py-1 text-xs font-black uppercase tracking-wider border-black ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wide">
                    {item.stat}
                  </span>
                </div>

                <h2 className="text-xl font-display font-black uppercase text-black leading-tight">
                  {item.title}
                </h2>

                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href={`/solutions/${item.slug}`}
                  className="neo-btn w-full bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider py-3 rounded-lg text-center block shadow-[3px_3px_0px_#000] hover:bg-[#00be57] transition-colors"
                >
                  EXPLORE SOLUTION ➔
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
