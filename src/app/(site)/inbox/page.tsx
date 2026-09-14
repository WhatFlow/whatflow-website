import type { Metadata } from "next";

// Inbox Page Components
import { InboxHero } from "@/components/inbox-page/InboxHero";
import { SSOFlowDiagram } from "@/components/inbox-page/SSOFlowDiagram";
import { LiveConversationMock } from "@/components/inbox-page/LiveConversationMock";
import { MessageTypeGallery } from "@/components/inbox-page/MessageTypeGallery";
import { ComposerAndQuickReplies } from "@/components/inbox-page/ComposerAndQuickReplies";
import { InteractiveBuilderShowcase } from "@/components/inbox-page/InteractiveBuilderShowcase";
import { TemplateAndFlowsManager } from "@/components/inbox-page/TemplateAndFlowsManager";
import { CustomerDrawerShowcase } from "@/components/inbox-page/CustomerDrawerShowcase";
import { BroadcastWizardShowcase } from "@/components/inbox-page/BroadcastWizardShowcase";
import { BroadcastAnalyticsDashboard } from "@/components/inbox-page/BroadcastAnalyticsDashboard";
import { SettingsAndMetaSync } from "@/components/inbox-page/SettingsAndMetaSync";
import { InboxRoadmap } from "@/components/inbox-page/InboxRoadmap";
import { InboxCTA } from "@/components/inbox-page/InboxCTA";
import { ReviewsSection } from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "WhatFlow Inbox — 2-Way WhatsApp Support Chat & Shopify Customer Context",
  description:
    "A dedicated, ultra-fast 2-way WhatsApp customer support inbox built for Shopify. Instant live chat, 11 message types, 24-hour Meta care window countdown, customer order history sidebar, and 99.9% uptime.",
  keywords: [
    "WhatsApp Shopify live chat",
    "WhatsApp customer support inbox",
    "Shopify 2-way WhatsApp chat",
    "WhatFlow inbox",
    "WhatsApp Business API team inbox",
    "Shopify customer profile WhatsApp",
    "Meta Cloud API inbox",
  ],
};

export default function InboxPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* 1. Hero Section */}
      <InboxHero />

      {/* 2. 1-Click Shopify SSO Security Flow */}
      <SSOFlowDiagram />

      {/* 3. Interactive Live 3-Pane Inbox Workbench */}
      <LiveConversationMock />

      {/* 4. 11 Message Bubble Types Gallery */}
      <MessageTypeGallery />

      {/* 5. Next-Gen Composer, Slash Commands & 24h Care Window */}
      <ComposerAndQuickReplies />

      {/* 6. 4-in-1 Interactive Builder Showcase */}
      <InteractiveBuilderShowcase />

      {/* 7. WhatsApp Flows & Meta Pre-Approved Template Picker */}
      <TemplateAndFlowsManager />

      {/* 8. Shopify 360 Customer Profile Drawer */}
      <CustomerDrawerShowcase />

      {/* 9. 4-Step Broadcast Campaign Wizard */}
      <BroadcastWizardShowcase />

      {/* 10. Granular Broadcast Delivery Audit & Analytics */}
      <BroadcastAnalyticsDashboard />

      {/* 11. Team Settings & Meta Business Profile Sync */}
      <SettingsAndMetaSync />

      {/* 12. Upcoming Features Roadmap */}
      <InboxRoadmap />

      {/* 13. Real Merchant Reviews (Payload Collection) */}
      <ReviewsSection darkMode={true} />

      {/* 14. High-Converting Bottom Conversion Banner */}
      <InboxCTA />
    </div>
  );
}
