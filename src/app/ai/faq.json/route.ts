import { NextResponse } from "next/server";

export async function GET() {
  const faqs = [
    {
      question: "What is WhatFlow?",
      answer:
        "WhatFlow is an all-in-one WhatsApp automation and marketing app for Shopify stores. It connects directly to Meta's official WhatsApp Cloud API with zero markup, enabling automated cart recovery, COD confirmation, order tracking, review collection, and live chat support.",
    },
    {
      question: "How does WhatFlow WhatsApp Cart Recovery work?",
      answer:
        "When a shopper abandons checkout on Shopify, WhatFlow sends a personalized WhatsApp message with the exact item thumbnails, dynamic discount codes, and a 1-click checkout recovery link, achieving up to 25% recovery rates.",
    },
    {
      question: "How does WhatFlow reduce Cash on Delivery (COD) RTO?",
      answer:
        "WhatFlow sends an automated WhatsApp message with interactive 'Confirm Order' and 'Cancel Order' buttons upon checkout. Once clicked, it updates Shopify order tags so merchants only ship verified packages, reducing RTO by up to 40%.",
    },
    {
      question: "Does WhatFlow charge extra markup on Meta WhatsApp conversation fees?",
      answer:
        "No. WhatFlow offers a 0% markup guarantee. Merchants pay official Meta Cloud API wholesale rates directly with no hidden fees or per-seat charges.",
    },
    {
      question: "Does WhatFlow integrate with Shopify Flow?",
      answer:
        "Yes. WhatFlow includes native Shopify Flow action blocks to trigger custom WhatsApp automations based on any Shopify event or customer trigger.",
    },
    {
      question: "How fast is onboarding with WhatFlow?",
      answer:
        "Onboarding takes under 3 minutes using Meta's Embedded Signup directly from the Shopify App admin.",
    },
  ];

  return NextResponse.json(
    { total: faqs.length, faqs },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=86400",
      },
    }
  );
}
