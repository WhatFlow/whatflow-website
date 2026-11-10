import type { Metadata } from "next";

// Inbox Page Components
import { InboxHero } from "@/components/inbox-page/InboxHero";
import { LatestUpdates } from "@/components/LatestUpdates";
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
import { ReviewsSection } from "@/components/ReviewsSection";
import { InboxZoom } from "@/components/landing/InboxZoom";
import "@/components/landing/landing.css";
import "@/components/landing/primitives.css";
import "@/components/landing/sections.css";
import "@/components/inbox-page/inbox.css";

export const metadata: Metadata = {
  alternates: { canonical: "/inbox" },
  title: "WhatFlow Inbox — Enterprise-Ready WhatsApp Support for Shopify",
  description:
    "An enterprise-ready WhatsApp team inbox built for Shopify. Native extensions, customer order context, all features on every plan and no seat fees.",
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
    <div className="lp ib">
      <InboxHero />
      <LiveConversationMock />
      <CustomerDrawerShowcase />
      <ComposerAndQuickReplies />

      <InboxZoom />
      <SSOFlowDiagram />

      <details className="ib-tools">
        <summary className="wf-shell">Explore more Inbox tools</summary>
        <MessageTypeGallery />
        <InteractiveBuilderShowcase />
        <TemplateAndFlowsManager />
        <BroadcastWizardShowcase />
        <BroadcastAnalyticsDashboard />
        <SettingsAndMetaSync />
      </details>

      <InboxRoadmap />
      <LatestUpdates app="business-api" keywords={["inbox"]} heading="Latest Team Inbox updates" />
      <ReviewsSection darkMode={true} />
    </div>
  );
}
