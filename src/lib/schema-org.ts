export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? "https://whatflow.tech" : "http://localhost:3000");

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "WhatFlow",
    legalName: "WhatFlow Solutions",
    alternateName: ["WhatFlow WhatsApp", "WhatFlow Shopify App", "WhatFlow Automation"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
      width: 512,
      height: 512,
      caption: "WhatFlow Official Logo",
    },
    foundingDate: "2024",
    sameAs: [
      "https://apps.shopify.com/whatflow",
      "https://twitter.com/whatflow_io",
      "https://x.com/whatflow_io",
      "https://linkedin.com/company/whatflow",
      "https://www.crunchbase.com/organization/whatflow",
      "https://github.com/whatflow",
      "https://en.wikipedia.org/wiki/Shopify",
      "https://www.wikidata.org/wiki/Q7501061",
      "https://en.wikipedia.org/wiki/WhatsApp",
      "https://www.wikidata.org/wiki/Q104927",
      "https://www.producthunt.com/products/whatflow",
      "https://www.g2.com/products/whatflow",
      "https://www.capterra.com/p/whatflow",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@whatflow.tech",
        telephone: "+1-800-WHATFLOW",
        availableLanguage: ["English", "Spanish", "Hindi", "Portuguese", "Arabic"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@whatflow.tech",
        availableLanguage: ["English"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
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
        urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getSoftwareApplicationSchema() {
  const today = new Date().toISOString().split("T")[0];

  return {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    "@id": `${SITE_URL}/#software`,
    name: "WhatFlow",
    alternateName: "WhatFlow WhatsApp Automation & Marketing Platform",
    operatingSystem: "Shopify Web, Cloudflare Edge, Meta Cloud API",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "eCommerce Marketing & Customer Messaging",
    softwareVersion: "2.5.0",
    datePublished: "2024-01-15",
    dateModified: today,
    inLanguage: "en",
    isAccessibleForFree: true,
    url: SITE_URL,
    offers: [
      {
        "@type": "Offer",
        name: "Free Plan",
        price: "0",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        description: "Free tier including basic chat widget, manual recovery links, and community support.",
      },
      {
        "@type": "Offer",
        name: "Starter Plan",
        price: "4.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        description: "Official Meta Cloud API connection, automated cart recovery, and COD verification.",
      },
      {
        "@type": "Offer",
        name: "Growth Plan",
        price: "19.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        description: "Shopify Flow action blocks, unlimited broadcast campaigns, review sync, and AI support.",
      },
      {
        "@type": "Offer",
        name: "Scale Plan",
        price: "49.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        description: "Dedicated Meta account manager, custom workflow automations, and priority 24/7 SLA.",
      },
    ],
    featureList: [
      "WhatsApp Abandoned Cart Recovery (98% open rates)",
      "1-Click Cash on Delivery (COD) Verification with automated Shopify order tagging",
      "Real-time Shipping Tracking & Fulfillment Notifications",
      "WhatsApp Photo Review & UGC Collection (Judge.me & Loox sync)",
      "Native Shopify Flow Trigger & Action Blocks",
      "0% markup on official Meta Cloud API rates",
      "24/7 AI Customer Support Auto-Replies with RAG Store Context",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "148",
      bestRating: "5",
      worstRating: "1",
    },
    description:
      "Automate WhatsApp marketing, recover abandoned carts with 98% open rates, verify COD orders, and boost eCommerce conversions with official Meta Cloud API.",
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
