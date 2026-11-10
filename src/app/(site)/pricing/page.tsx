import type { Metadata } from "next";
import { PricingClient } from "./PricingClient";
import "./pricing.css";
import {
  getSoftwareApplicationSchema,
  getFAQSchema,
  getBreadcrumbSchema,
  SITE_URL,
} from "@/lib/schema-org";

export const metadata: Metadata = {
  title: "Shopify WhatsApp App Pricing | WhatFlow Business API",
  description:
    "Compare WhatFlow’s free and paid Shopify WhatsApp plans, monthly message allowances, unlimited inbox seats, and separate Meta messaging rates with zero markup.",
  keywords: [
    "Shopify WhatsApp app pricing",
    "WhatsApp marketing pricing Shopify",
    "Meta Cloud API Shopify rates",
    "WhatFlow pricing",
    "cheap WhatsApp marketing Shopify",
    "WhatsApp cart recovery cost",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Shopify WhatsApp App Pricing | WhatFlow Business API",
    description:
      "Compare WhatFlow’s free and paid Shopify WhatsApp plans, monthly message allowances, unlimited inbox seats, and separate Meta messaging rates with zero markup.",
    url: `${SITE_URL}/pricing`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify WhatsApp App Pricing | WhatFlow Business API",
    description:
      "Compare WhatFlow’s free and paid Shopify WhatsApp plans, monthly message allowances, unlimited inbox seats, and separate Meta messaging rates with zero markup.",
  },
};

const PRICING_FAQS = [
  {
    question: "What makes WhatFlow pricing different from other WhatsApp apps?",
    answer:
      "WhatFlow never marks up Meta's official messaging rates. You pay official wholesale rates directly with zero hidden fees, plus get unlimited team seats across all plans.",
  },
  {
    question: "What is included in the 7-day free trial?",
    answer:
      "You get full unlimited access to all features and templates. You won't be charged your WhatFlow subscription until the 7-day trial period ends, and you can cancel anytime with 1 click.",
  },
  {
    question: "Can I upgrade or downgrade plans anytime?",
    answer:
      "Yes. You can switch tiers in your WhatFlow dashboard or Shopify app settings as your store's order volume grows.",
  },
  {
    question: "Do I need my own Meta Business API account?",
    answer:
      "Yes, WhatFlow integrates directly with the official Meta Cloud API. Our guided onboarding helps you connect your Meta Business account. Setup time depends on account readiness and Meta verification.",
  },
];

export default function PricingPage() {
  const softwareSchema = getSoftwareApplicationSchema();
  const faqSchema = getFAQSchema(PRICING_FAQS);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Pricing", url: "/pricing" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PricingClient />
    </>
  );
}
