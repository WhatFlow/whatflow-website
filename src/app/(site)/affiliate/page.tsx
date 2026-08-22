import type { Metadata } from "next";
import { AffiliateClient } from "./AffiliateClient";

export const metadata: Metadata = {
  title: "Affiliate Plan — Earn Up to 50% Commission | WhatFlow",
  description:
    "Join the WhatFlow Tier-Based Affiliate Plan. Earn tiered recurring commissions up to 50% for up to lifetime on every referred Shopify merchant.",
  keywords: [
    "WhatFlow affiliate plan",
    "Shopify app affiliate",
    "WhatsApp marketing affiliate program",
    "Shopify agency partner",
    "eCommerce affiliate program",
    "WhatFlow affiliate",
  ],
};

export default function AffiliatePage() {
  return <AffiliateClient />;
}
