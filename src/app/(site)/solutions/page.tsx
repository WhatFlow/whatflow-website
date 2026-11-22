import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { PageHero, Section, SectionHead, Hl } from "@/components/site/PageKit";
import { Bubble, Phone, type ChatMessage } from "@/components/landing/Phone";
import "@/components/landing/landing.css";
import "./solutions.css";
import { getBreadcrumbSchema, SITE_URL } from "@/lib/schema-org";

export const metadata: Metadata = {
  title: "WhatsApp eCommerce Solutions for Shopify",
  description:
    "Explore WhatFlow's suite of Shopify WhatsApp solutions: Abandoned cart recovery, COD confirmation, automated shipping alerts, review collection, and storefront chat buttons.",
  keywords: [
    "Shopify WhatsApp solutions",
    "WhatsApp eCommerce automation",
    "Shopify abandoned cart WhatsApp",
    "Shopify COD verification WhatsApp",
    "WhatsApp order tracking Shopify",
    "WhatsApp review collection",
  ],
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: "WhatsApp eCommerce Solutions for Shopify | WhatFlow",
    description:
      "Explore WhatFlow's suite of Shopify WhatsApp solutions: Abandoned cart recovery, COD confirmation, automated shipping alerts, review collection, and storefront chat buttons.",
    url: `${SITE_URL}/solutions`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp eCommerce Solutions for Shopify | WhatFlow",
    description:
      "Explore WhatFlow's suite of Shopify WhatsApp solutions: Abandoned cart recovery, COD confirmation, automated shipping alerts, review collection, and storefront chat buttons.",
  },
};

const SOLUTIONS = [
  {
    slug: "abandoned-cart-recovery",
    tag: "Cart recovery",
    tone: "sol-tone-yellow",
    title: "Abandoned cart recovery",
    desc: "Send an approved WhatsApp reminder with a link back to the saved checkout, after a delay you choose. Draft-order reminders included.",
    stat: "Free plan included",
  },
  {
    slug: "cod-order-verification",
    tag: "Fraud prevention",
    tone: "sol-tone-mint",
    title: "COD confirmation and anti-RTO",
    desc: "Confirm cash on delivery orders on WhatsApp before you ship, with confirm and cancel buttons, Shopify order tags, OTP checks and FlowSense review.",
    stat: "COD, OTP and FlowSense",
  },
  {
    slug: "order-tracking-notifications",
    tag: "Post-purchase",
    tone: "sol-tone-sky",
    title: "Order tracking and shipping alerts",
    desc: "Send shipping updates and tracking links on WhatsApp at the stages you choose, so fewer customers need to ask where their order is.",
    stat: "Pick your stages",
  },
  {
    slug: "whatsapp-reviews-ugc",
    tag: "Reviews and UGC",
    tone: "sol-tone-pink",
    title: "Review and UGC collection",
    desc: "Ask for product reviews on WhatsApp at the right time after delivery, with WhatFlow Review Requests or the Judge.me Shopify Flow template.",
    stat: "Judge.me Flow template",
  },
  {
    slug: "chat-button",
    tag: "Storefront conversion",
    tone: "sol-tone-lilac",
    title: "WhatsApp chat button and support",
    desc: "Add a theme-matched WhatsApp chat button with the Shopify theme editor, no code needed. Chats land in your shared team inbox.",
    stat: "Free forever",
  },
];

/** One customer, one thread: the journey the solutions below automate. */
const JOURNEY: ChatMessage[] = [
  { id: "cart", from: "store", text: "You left something in your cart 👀 It's saved for you.", buttons: ["Complete my order"], tapped: 0, time: "Mon" },
  { id: "cod", from: "store", text: "Please confirm your cash on delivery order #1042.", buttons: ["Confirm order", "Cancel"], tapped: 0, time: "Mon" },
  { id: "ship", from: "store", text: "Your order is out for delivery today 🚚", time: "Wed" },
  { id: "review", from: "store", text: "How are you liking it? Tap to rate ⭐", buttons: ["⭐⭐⭐⭐⭐"], time: "Sun" },
];

export default function SolutionsHubPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/solutions" },
  ]);

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHero
        title="Every tool to grow your store."
        accent={["grow"]}
        sub={<p>Tailored WhatsApp marketing and automation solutions that drive revenue at every step of the customer journey.</p>}
        actions={
          <>
            <a href="#solutions" className="wf-btn wf-btn-green">Explore solutions</a>
            <Link href="/pricing" className="wf-btn wf-btn-ghost">View pricing</Link>
          </>
        }
        meta={SOLUTIONS.map((item) => <span key={item.slug}>{item.tag}</span>)}
      >
        <div className="sol-stage">
          <div className="lp">
            <Phone label="One WhatsApp thread covering cart recovery, COD confirmation, delivery and a review request">
              {JOURNEY.map((message) => <Bubble key={message.id} message={message} />)}
            </Phone>
          </div>
          <div className="sol-sticker sol-sticker-a"><div><b>Free</b><small>plan with every feature</small></div></div>
          <div className="sol-sticker sol-sticker-b"><div><b>1 tap</b><small>to confirm a COD order</small></div></div>
        </div>
      </PageHero>

      <Section id="solutions" tone="paper">
        <SectionHead
          title={<>One app, <Hl>five</Hl> ways to sell more.</>}
          sub="Each solution runs on its own or alongside the others, from the first abandoned cart to the five-star review."
        />
        <div className="wf-grid wf-grid-3 mt-12">
          {SOLUTIONS.map((item, index) => (
            <Link
              key={item.slug}
              href={`/solutions/${item.slug}`}
              className={`wf-card sol-card ${item.tone}`}
              data-reveal
              style={{ "--d": `${index * 80}ms` } as CSSProperties}
            >
              <h2 className="font-display text-[1.6rem] font-bold leading-[1.05] tracking-[-0.035em]">{item.title}</h2>
              <p>{item.desc}</p>
              <span className="wf-pill mt-5 self-start">{item.stat}</span>
              <span className="sol-card-cta">Explore solution</span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
