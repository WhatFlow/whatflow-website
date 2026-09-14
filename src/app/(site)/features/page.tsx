import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getShopifyAppUrl } from "@/lib/shopify-app";

// Interactive components
import { FeatureHero } from "@/components/features/FeatureHero";
import { SectionNav } from "@/components/features/SectionNav";
import { AutomationsTabs } from "@/components/features/AutomationsTabs";
import { RecoverySection } from "@/components/features/RecoverySection";
import { ShippingJourney } from "@/components/features/ShippingJourney";
import { AutoRepliesDemo } from "@/components/features/AutoRepliesDemo";
import { BroadcastGuide } from "@/components/features/BroadcastGuide";
import { CodAndFunctions } from "@/components/features/CodAndFunctions";
import { ShopifyFlowIntegration } from "@/components/features/ShopifyFlowIntegration";
import { FlowSenseOtp } from "@/components/features/FlowSenseOtp";
import { AnalyticsDashboard } from "@/components/features/AnalyticsDashboard";
import { TemplateEditorPreview } from "@/components/features/TemplateEditorPreview";
import { StorefrontWidgets } from "@/components/features/StorefrontWidgets";
import { SpeedAndUptime } from "@/components/features/SpeedAndUptime";
import { FeatureBoardRoadmap } from "@/components/features/FeatureBoardRoadmap";
import { ReviewsSection } from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "WhatFlow Features — 11+ Automations, 2-Way Inbox & Shopify Functions",
  description:
    "Explore WhatFlow's full suite: 6 core order automations, 3-stage cart recovery, 11-step shipping alerts, Shopify Functions COD engine, 2-way live chat, and native Shopify Flow triggers.",
  keywords: [
    "WhatsApp Shopify features",
    "abandoned cart WhatsApp sequence",
    "Shopify COD verification WhatsApp",
    "Shopify Functions COD fee",
    "WhatsApp shipping notifications 11 statuses",
    "Shopify Flow WhatsApp action block",
    "WhatsApp 2-way chat inbox Shopify",
    "Meta Cloud API WhatsApp Shopify",
  ],
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* 1. Interactive Hero with Live Phone Simulator */}
      <FeatureHero />

      {/* 2. Sticky Category Anchor Navigation */}
      <SectionNav />

      {/* 3. Core Automations Suite (6-in-1 Tabs) */}
      <AutomationsTabs />

      {/* 4. Recovery Powerhouse: Checkouts, Drafts & Back in Stock */}
      <RecoverySection />

      {/* 5. 11-Status Granular Fulfillment Stepper */}
      <ShippingJourney />

      {/* 6. Smart Auto-Replies & Interactive Message Formats */}
      <AutoRepliesDemo />

      {/* 7. Targeted Broadcast Engine with Anti-Ban Pacing */}
      <BroadcastGuide />

      {/* 8. Shopify Functions & COD Anti-RTO Engine */}
      <CodAndFunctions />

      {/* 9. Native Shopify Flow Action Blocks */}
      <ShopifyFlowIntegration />

      {/* 10. FlowSense™ AI & Instant Meta OTP Verification */}
      <FlowSenseOtp />

      {/* 11. 6-Tab Deep Analytics Suite */}
      <AnalyticsDashboard />

      {/* 12. WYSIWYG Template Editor & Dynamic Variables */}
      <TemplateEditorPreview />

      {/* 13. Storefront Growth Widgets (Chat Button & Order via WA) */}
      <StorefrontWidgets />

      {/* 14. High-Volume Reliability & Speed */}
      <SpeedAndUptime />

      {/* 15. Community Feature Board & Roadmap */}
      <FeatureBoardRoadmap />

      {/* 16. Real Merchant Reviews (Payload Collection) */}
      <ReviewsSection />

      {/* 17. High-Converting Bottom Conversion Banner */}
      <section className="bg-[#091E17] py-20 px-4 sm:px-6 text-center text-white border-t-[2.5px] border-black">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <Image
              src="/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_White_RGB_2026.svg"
              width={52}
              height={52}
              alt="WhatsApp"
            />
          </div>

          <div className="neo-pill bg-[#00D261] text-black px-4 py-1 text-xs font-black uppercase tracking-wider inline-block">
            14-DAY FREE TRIAL • ZERO RISK
          </div>

          <h2 className="text-[34px] sm:text-[50px] font-display font-black uppercase tracking-tight leading-tight">
            READY TO SCALE REVENUE ON <span className="text-stroke-green">WHATSAPP?</span>
          </h2>

          <p className="text-gray-300 font-medium text-base sm:text-lg max-w-xl mx-auto">
            Install WhatFlow on your Shopify store in 3 minutes. Zero Meta markup, 11+ automations ready out-of-the-box.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={getShopifyAppUrl("features_bottom_cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-[#00D261] text-black font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-[4px_4px_0px_#fff] hover:scale-105 transition-transform"
            >
              INSTALL APP ON SHOPIFY ➔
            </a>

            <Link
              href="/inbox"
              className="neo-btn bg-[#121212] text-white border-2 border-white/30 font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-black"
            >
              EXPLORE WHATFLOW INBOX ➔
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
