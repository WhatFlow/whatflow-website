import { HOMEPAGE_UPDATED_AT } from "./content-dates";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? "https://whatflow.tech" : "http://localhost:3000");

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "WhatFlow",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
      width: 512,
      height: 512,
      caption: "WhatFlow Official Logo",
    },
    sameAs: [
      "https://apps.shopify.com/whatflow",
      "https://apps.shopify.com/whatflow-official-api",
      "https://www.linkedin.com/company/whatflow",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@whatflow.tech",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@whatflow.tech",
        availableLanguage: ["English"],
      },
    ],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "WhatFlow",
    inLanguage: "en",
    alternateName: [
      "WhatFlow — WhatsApp Marketing & Automation for Shopify",
      "WhatFlow Shopify Suite",
    ],
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "#hero p", "#knowledge-benchmarks h2", "#knowledge-benchmarks article h3"],
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    "@id": `${SITE_URL}/#software`,
    name: "WhatFlow Business API",
    alternateName: "WhatFlow WhatsApp Business API for Shopify",
    operatingSystem: "Shopify Web, Cloudflare Edge, Meta Cloud API",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "eCommerce Marketing & Customer Messaging",
    inLanguage: "en",
    isAccessibleForFree: true,
    url: SITE_URL,
    // Only the verified free offering is described here. Paid prices and
    // allowances belong to the CMS-backed pricing page and can change.
    offers: {
      "@type": "Offer",
      name: "Free plan",
      price: "0",
      priceCurrency: "USD",
      url: `${SITE_URL}/pricing`,
      description: "All available features included, with a free messaging allowance and no inbox seat fees. Applicable Meta messaging charges are separate.",
    },
    featureList: [
      "WhatsApp abandoned checkout recovery",
      "1-Click Cash on Delivery (COD) Verification with automated Shopify order tagging",
      "Real-time Shipping Tracking & Fulfillment Notifications",
      "WhatsApp review request workflows",
      "Native Shopify Flow Trigger & Action Blocks",
      "All features available across plans; AI is not included",
      "Live WhatsApp catalog sharing",
      "Enterprise-ready WhatsApp team inbox with no seat fees",
    ],
    description:
      "WhatsApp messaging for Shopify through the official Meta Cloud API, with a shared team inbox, catalog sharing and Shopify Flow automation. All available features are included across plans, with no inbox seat fees.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    author: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${SITE_URL}${item.url.startsWith("/") ? "" : "/"}${item.url}`,
    })),
  };
}

export function getHomePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "WhatFlow — WhatsApp Apps & Automations for Shopify Stores",
    description: "WhatsApp messaging, checkout recovery, COD verification and a shared team inbox for Shopify.",
    inLanguage: "en",
    dateModified: HOMEPAGE_UPDATED_AT,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#software` },
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
