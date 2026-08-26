export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? "https://whatflow.tech" : "http://localhost:3000");

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "WhatFlow",
    legalName: "WhatFlow Inc.",
    alternateName: ["WhatFlow WhatsApp", "WhatFlow Shopify App"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
      width: 512,
      height: 512,
      caption: "WhatFlow Logo",
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
    alternateName: [
      "WhatFlow — WhatsApp Marketing & Automation for Shopify",
      "WhatFlow Shopify",
    ],
    publisher: {
      "@id": `${SITE_URL}/#organization`,
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
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "WhatFlow",
    alternateName: "WhatFlow WhatsApp Automation for Shopify",
    operatingSystem: "Shopify Web, Cloudflare Edge",
    applicationCategory: "BusinessApplication",
    softwareVersion: "2.4.0",
    datePublished: "2024-01-15",
    dateModified: "2026-08-23",
    url: SITE_URL,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0",
      highPrice: "49.99",
      offerCount: "4",
      priceValidUntil: "2027-12-31",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "148",
      bestRating: "5",
      worstRating: "1",
    },
    description:
      "Automate WhatsApp marketing, recover abandoned carts with 98% open rates, verify COD orders, and boost Shopify conversions with official Meta API.",
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
