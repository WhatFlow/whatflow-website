import { NextResponse } from "next/server";
import { HOMEPAGE_FAQS } from "@/lib/marketing-faqs";

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
        "When a shopper abandons checkout on Shopify, WhatFlow sends a personalized WhatsApp message with the exact item thumbnails, dynamic discount codes, and a 1-click checkout recovery link.",
    },
    {
      question: "How does WhatFlow reduce Cash on Delivery (COD) RTO?",
      answer:
        "WhatFlow sends an automated WhatsApp message with interactive 'Confirm Order' and 'Cancel Order' buttons upon checkout. Once clicked, it updates Shopify order tags so merchants only ship verified packages.",
    },
    {
      question: "Does WhatFlow charge extra markup on Meta WhatsApp conversation fees?",
      answer:
        "No. WhatFlow offers a 0% markup guarantee. Merchants pay official Meta Cloud API wholesale rates directly with no hidden fees or per-seat charges.",
    },
    {
      question: "Does WhatFlow integrate with Shopify Flow?",
      answer:
        "Yes. WhatFlow includes native Shopify Flow action blocks to trigger custom WhatsApp automations using the triggers, actions and data supported by installed app connectors.",
    },
    {
      question: "How fast is onboarding with WhatFlow?",
      answer:
        "WhatFlow Business API uses Meta Embedded Signup from Shopify admin. Completion time depends on account readiness and any Meta verification requirements.",
    },
  ];

  return NextResponse.json(
    { total: faqs.length + 2, faqs: [...faqs, ...HOMEPAGE_FAQS.filter(faq => ["Is AI included in the WhatFlow inbox?", "Are features restricted to paid plans?"].includes(faq.question))] },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
    }
  );
}
