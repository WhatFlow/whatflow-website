export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? "https://whatflow.io" : "http://localhost:3000");

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
    },
    sameAs: [
      "https://apps.shopify.com/whatflow",
      "https://twitter.com/whatflow_io",
      "https://linkedin.com/company/whatflow",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@whatflow.io",
      availableLanguage: ["English"],
    },
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "WhatFlow — WhatsApp Marketing & Automation for Shopify",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WhatFlow — WhatsApp Apps for Shopify",
    operatingSystem: "Shopify Web, Cloudflare Edge",
    applicationCategory: "BusinessApplication",
    url: SITE_URL,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0",
      highPrice: "99",
      offerCount: "4",
      priceValidUntil: "2027-12-31",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "128",
      bestRating: "5",
      worstRating: "1",
    },
    description:
      "Automate WhatsApp messages, recover abandoned carts, collect reviews, and verify COD orders for Shopify stores with official Meta Cloud API integration.",
    publisher: {
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
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url.startsWith("/") ? "" : "/"}${item.url}`,
    })),
  };
}
