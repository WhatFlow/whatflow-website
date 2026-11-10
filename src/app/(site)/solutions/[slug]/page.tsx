import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { getShopifyAppUrl } from "@/lib/shopify-app";
import { getBreadcrumbSchema, getFAQSchema, SITE_URL } from "@/lib/schema-org";
import { PageHero, Section, SectionHead, Hl } from "@/components/site/PageKit";
import { Bubble, Phone, type ChatMessage } from "@/components/landing/Phone";
import "@/components/landing/landing.css";
import "../solutions.css";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

interface SolutionData {
  slug: string;
  tag: string;
  /** Tile colour class from solutions.css. */
  tone: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  /** Headline words rendered in green. */
  accent: string[];
  subtitle: string;
  heroBadge: string;
  stat: { value: string; label: string };
  features: { title: string; desc: string }[];
  steps: { step: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  /** The solution's own message flow, shown in the hero phone. */
  chat: ChatMessage[];
}

const SOLUTIONS_MAP: Record<string, SolutionData> = {
  "abandoned-cart-recovery": {
    slug: "abandoned-cart-recovery",
    tag: "Cart recovery",
    tone: "sol-tone-yellow",
    title: "Shopify WhatsApp Abandoned Cart Recovery",
    metaTitle: "Shopify WhatsApp Abandoned Cart Recovery — 98% Open Rates | WhatFlow",
    metaDescription:
      "Recover up to 25% of abandoned Shopify checkouts with automated WhatsApp cart recovery messages. 1-click checkout links, dynamic discounts, and 98% open rates.",
    headline: "Recover lost Shopify sales on autopilot via WhatsApp.",
    accent: ["autopilot"],
    subtitle:
      "Over 70% of eCommerce carts are abandoned. Reach shoppers directly on WhatsApp with pre-filled checkout links and dynamic discount codes before they buy from competitors.",
    heroBadge: "25% average recovery rate",
    stat: { value: "25%", label: "Average checkout recovery rate" },
    features: [
      {
        title: "1-click direct checkout links",
        desc: "Customers tap a single button in WhatsApp to instantly return to their pre-filled checkout with all cart items saved.",
      },
      {
        title: "Dynamic smart discounts",
        desc: "Offer tiered incentive discounts based on cart value or customer status to maximize checkout completion without sacrificing margins.",
      },
      {
        title: "Automated multi-step sequences",
        desc: "Set timed follow-ups (e.g. 30 minutes, 6 hours, 24 hours) that automatically cancel if the customer completes their purchase.",
      },
      {
        title: "Quiet hours and compliance",
        desc: "Respect customer timezones with automatic quiet hours and 1-click opt-out rules that keep your WhatsApp Business account in high quality standing.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Customer leaves checkout",
        desc: "Shopify fires an abandoned checkout webhook to WhatFlow in real time.",
      },
      {
        step: "02",
        title: "Smart sequence triggers",
        desc: "WhatFlow sends a personalized WhatsApp template with exact product titles, thumbnail, and 1-click recovery button.",
      },
      {
        step: "03",
        title: "Order completed",
        desc: "Shopper completes payment on Shopify. Follow-up sequences auto-cancel and conversion is tracked in real-time.",
      },
    ],
    chat: [
      { id: "c1", from: "store", text: "Hi Aisha, you left something behind 👀 Your cart is saved and ready.", card: { title: "Linen tote", meta: "1 item in your cart", price: "$48", emoji: "👜" }, buttons: ["Return to checkout"], time: "10:30" },
      { id: "c2", from: "store", text: "Still thinking it over? Here's a little something to help you decide.", buttons: ["Use my discount"], tapped: 0, time: "16:30" },
      { id: "c3", from: "customer", text: "Done, just ordered! 🙌", time: "16:34" },
      { id: "c4", from: "store", text: "Order confirmed 🎉 No more reminders from us.", time: "16:34" },
    ],
    faqs: [
      {
        question: "How is WhatsApp cart recovery better than email or SMS?",
        answer:
          "WhatsApp messages boast a 98% open rate and 45-60% click-through rate, compared to 20% open rates on email and low delivery rates on SMS. WhatsApp also supports rich media and interactive buttons.",
      },
      {
        question: "How quickly does WhatFlow send the recovery message?",
        answer:
          "You can configure exact timing delays, typically between 15 to 30 minutes after checkout abandonment for maximum conversion.",
      },
      {
        question: "Does WhatFlow stop sending if the customer already bought?",
        answer:
          "Yes! WhatFlow syncs with Shopify in real time. As soon as an order is placed, all remaining cart recovery reminders for that customer are immediately halted.",
      },
    ],
  },
  "cod-order-verification": {
    slug: "cod-order-verification",
    tag: "COD and fraud prevention",
    tone: "sol-tone-mint",
    title: "Shopify Cash on Delivery (COD) WhatsApp Confirmation & Anti-RTO",
    metaTitle: "Shopify COD WhatsApp Order Confirmation & Anti-RTO | WhatFlow",
    metaDescription:
      "Slash Cash on Delivery (COD) Return-to-Origin (RTO) rates by up to 40%. Send 1-click WhatsApp order confirmation and cancellation buttons that automatically update Shopify order tags.",
    headline: "Cut COD return-to-origin (RTO) by up to 40%.",
    accent: ["40%"],
    subtitle:
      "Verify buyer intent before shipping. Send automated WhatsApp confirmation messages with interactive 'Confirm Order' and 'Cancel Order' buttons that update Shopify order tags in real time.",
    heroBadge: "40% RTO reduction",
    stat: { value: "40%", label: "Average reduction in failed deliveries" },
    features: [
      {
        title: "1-click interactive buttons",
        desc: "Customers confirm or cancel their COD order with a single tap in WhatsApp, with no OTP typing or phone calls required.",
      },
      {
        title: "Automatic Shopify order tagging",
        desc: "Instantly applies 'COD Confirmed', 'COD Cancelled', or 'COD Unverified' tags to Shopify orders to streamline your warehouse fulfillment.",
      },
      {
        title: "Address verification and correction",
        desc: "Allow customers to verify and fix incomplete street addresses or pin codes directly inside WhatsApp chat.",
      },
      {
        title: "Prepaid conversion incentives",
        desc: "Offer a dynamic discount link to encourage COD buyers to convert to prepaid payment on Shopify before shipping.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "COD order placed",
        desc: "When a customer places a Cash on Delivery order, WhatFlow instantly detects the COD payment gateway.",
      },
      {
        step: "02",
        title: "WhatsApp button sent",
        desc: "Customer receives a WhatsApp summary with 'Confirm Order' and 'Cancel' interactive quick-reply buttons.",
      },
      {
        step: "03",
        title: "Warehouse tagged",
        desc: "Upon clicking, WhatFlow tags the order in Shopify Admin so fulfillment teams only ship verified orders.",
      },
    ],
    chat: [
      { id: "c1", from: "store", text: "Thanks for your order #1042! Please confirm your cash on delivery order so we can ship it.", card: { title: "Order #1042", meta: "Cash on delivery", price: "₹1,499", emoji: "📦" }, buttons: ["Confirm order", "Cancel order"], tapped: 0, time: "11:02" },
      { id: "c2", from: "customer", text: "Confirm order", time: "11:03" },
      { id: "c3", from: "store", text: "Confirmed ✅ Your order is tagged and on its way to the warehouse.", time: "11:03" },
    ],
    faqs: [
      {
        question: "How does COD verification reduce RTO losses?",
        answer:
          "A significant percentage of COD returns occur due to impulse buying, fake orders, or wrong addresses. By verifying buyer intent immediately via WhatsApp, you eliminate fake orders before incurring shipping and return logistics fees.",
      },
      {
        question: "Can I automatically cancel unconfirmed COD orders?",
        answer:
          "Yes. You can configure rules or use Shopify Flow to hold or auto-cancel orders if the customer does not verify within a custom timeframe (e.g., 24 hours).",
      },
    ],
  },
  "order-tracking-notifications": {
    slug: "order-tracking-notifications",
    tag: "Post-purchase automation",
    tone: "sol-tone-sky",
    title: "Shopify WhatsApp Order Tracking & Shipping Notifications",
    metaTitle: "Shopify WhatsApp Order Tracking & Shipping Alerts | WhatFlow",
    metaDescription:
      "Keep Shopify customers delighted with real-time WhatsApp shipping updates, tracking links, and delivery notifications. Reduce 'Where is my order?' support tickets.",
    headline: "Real-time WhatsApp shipping updates that delight customers.",
    accent: ["delight"],
    subtitle:
      "Deliver automated order receipts, tracking numbers, out-for-delivery alerts, and fulfillment updates straight to WhatsApp. Reduce customer service inquiries by over 60%.",
    heroBadge: "60% fewer WISMO tickets",
    stat: { value: "60%", label: "Fewer 'where is my order' support inquiries" },
    features: [
      {
        title: "Fulfillment and tracking alerts",
        desc: "Trigger WhatsApp messages the second an order is marked fulfilled in Shopify, complete with carrier tracking URLs.",
      },
      {
        title: "Out-for-delivery alerts",
        desc: "Notify customers on the day of delivery so they are available to receive their package, reducing delivery failures.",
      },
      {
        title: "Interactive order receipts",
        desc: "Provide clean, rich message cards detailing purchased items, total spent, and links to download invoices.",
      },
      {
        title: "Cross-sell recommendations",
        desc: "Include smart personalized product recommendations in delivery confirmation messages to drive repeat purchases.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Tracking added in Shopify",
        desc: "When you fulfill an order and add tracking info, WhatFlow catches the fulfillment event instantly.",
      },
      {
        step: "02",
        title: "Real-time WhatsApp alert",
        desc: "The buyer receives an official WhatsApp notification with live carrier tracking link and item summary.",
      },
      {
        step: "03",
        title: "Delighted repeat customer",
        desc: "Buyer stays informed, eliminating support tickets and boosting satisfaction and lifetime loyalty.",
      },
    ],
    chat: [
      { id: "c1", from: "store", text: "Good news! Order #1042 has shipped 📦", card: { title: "Order #1042", meta: "Shipped with tracking", price: "2 items", emoji: "🧾" }, buttons: ["Track my order"], time: "09:15" },
      { id: "c2", from: "store", text: "Your package is out for delivery today 🚚 Make sure someone's home to receive it.", time: "08:02" },
      { id: "c3", from: "customer", text: "Perfect, I'll be in!", time: "08:05" },
    ],
    faqs: [
      {
        question: "Does WhatFlow support my shipping carriers?",
        answer:
          "Yes! WhatFlow works with all Shopify-supported shipping carriers including DHL, FedEx, UPS, USPS, Blue Dart, Delhivery, Shiprocket, and custom tracking URLs.",
      },
      {
        question: "Can customers reply to tracking messages for support?",
        answer:
          "Yes. Customers can reply in the same WhatsApp thread, and your team can respond from WhatFlow Business API's enterprise-ready inbox. There are no seat fees. There is no built-in AI bot, but you can connect Claude, ChatGPT or Cursor through the WhatFlow MCP connector to draft replies for your team to approve.",
      },
    ],
  },
  "whatsapp-reviews-ugc": {
    slug: "whatsapp-reviews-ugc",
    tag: "Reviews and UGC",
    tone: "sol-tone-pink",
    title: "Collect Shopify Reviews & UGC via WhatsApp",
    metaTitle: "Collect Shopify Reviews on WhatsApp (Judge.me & Loox) | WhatFlow",
    metaDescription:
      "Generate 5x more product reviews and user-generated photo content on WhatsApp. Seamless integration with Judge.me, Loox, and Shopify reviews.",
    headline: "Get 5x more 5-star product reviews on WhatsApp.",
    accent: ["5x"],
    subtitle:
      "Email review requests get ignored. Collect authentic star ratings, text reviews, and photo testimonials directly on WhatsApp with pre-built Judge.me and Loox integrations.",
    heroBadge: "5x higher review submission",
    stat: { value: "5x", label: "Higher review submission rate vs email" },
    features: [
      {
        title: "Judge.me and Loox direct sync",
        desc: "Connects with your existing Shopify review apps to publish collected reviews directly to your product pages.",
      },
      {
        title: "1-click star rating buttons",
        desc: "Shoppers select star ratings with a single tap directly inside the WhatsApp conversation window.",
      },
      {
        title: "Photo and video UGC collection",
        desc: "Customers can easily send photos and videos of their products right from their smartphone camera roll.",
      },
      {
        title: "Automated delivery timing",
        desc: "Trigger review requests a configurable number of days after order delivery so customers have had time to try their purchase.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Order delivered",
        desc: "WhatFlow waits your specified number of days (e.g. 5 days) after delivery before sending.",
      },
      {
        step: "02",
        title: "Interactive review request",
        desc: "Customer receives a WhatsApp message with 1-click star rating buttons and optional photo upload prompt.",
      },
      {
        step: "03",
        title: "Synced to storefront",
        desc: "Review and photo are automatically posted to Judge.me/Loox to boost your social proof and conversion rate.",
      },
    ],
    chat: [
      { id: "c1", from: "store", text: "How are you liking your new Linen tote? Tap to rate it.", buttons: ["⭐⭐⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐ or less"], tapped: 0, time: "18:20" },
      { id: "c2", from: "customer", text: "Love it! Here's a photo 📸", time: "18:22" },
      { id: "c3", from: "store", text: "Thank you! Your review is live on our store. Here's a thank-you discount code 💚", time: "18:22" },
    ],
    faqs: [
      {
        question: "Do I need to replace my existing review app?",
        answer:
          "No! WhatFlow integrates directly with Judge.me, Loox, and standard review widgets so all collected reviews appear in your existing system.",
      },
      {
        question: "Can I offer discount rewards for photo reviews?",
        answer:
          "Yes! You can automatically reply with a discount code as soon as the customer submits their review and photo.",
      },
    ],
  },
  "chat-button": {
    slug: "chat-button",
    tag: "Storefront conversion",
    tone: "sol-tone-lilac",
    title: "Shopify WhatsApp Chat Button & Support Widget",
    metaTitle: "Shopify WhatsApp Chat Button & Storefront Widget | WhatFlow",
    metaDescription:
      "Add a beautiful, high-converting WhatsApp chat button to your Shopify storefront. Zero coding, customizable positions, agent routing, and pre-filled greetings.",
    headline: "Connect with store visitors in 1 tap via WhatsApp chat.",
    accent: ["1", "tap"],
    subtitle:
      "Turn casual store visitors into paying customers. Add a customizable, mobile-optimized WhatsApp floating button with smart greetings and multi-agent routing in under 60 seconds.",
    heroBadge: "3-minute install",
    stat: { value: "3 min", label: "Average setup time (no code)" },
    features: [
      {
        title: "Custom design and placement",
        desc: "Choose from modern floating widgets, pill buttons, or embedded store triggers that match your brand aesthetic perfectly.",
      },
      {
        title: "Pre-filled dynamic messages",
        desc: "Automatically include the product title or page URL the customer was viewing so your team has instant context.",
      },
      {
        title: "Multi-agent routing",
        desc: "Route inquiries to different team members or departments (e.g., Sales vs Support).",
      },
      {
        title: "Zero impact on page speed",
        desc: "Ultra-lightweight script (< 5KB) loaded asynchronously with zero layout shift or page speed penalty.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Install in 1 click",
        desc: "Enable the WhatFlow app embed in your Shopify Theme Editor without editing any theme code.",
      },
      {
        step: "02",
        title: "Customize appearance",
        desc: "Select colors, icon styles, greeting tooltips, and agent display names to match your brand.",
      },
      {
        step: "03",
        title: "Convert visitors to buyers",
        desc: "Shoppers click to start a WhatsApp chat, capturing their phone number as a qualified marketing lead.",
      },
    ],
    chat: [
      { id: "c1", from: "customer", text: "Hi! I'm looking at the Linen tote. Is it in stock in green?", time: "14:41" },
      { id: "c2", from: "agent", text: "Hi! Yes, green is in stock 💚 Want me to send you the link?", time: "14:42" },
      { id: "c3", from: "customer", text: "Yes please!", time: "14:42" },
    ],
    faqs: [
      {
        question: "Will the WhatsApp chat button slow down my Shopify store?",
        answer:
          "No. WhatFlow's storefront widget is less than 5KB and loads asynchronously after your page is fully rendered, ensuring a 100/100 Google PageSpeed score.",
      },
      {
        question: "Does it work on both mobile and desktop?",
        answer:
          "Yes! On mobile devices it opens the native WhatsApp app, and on desktop it opens WhatsApp Web.",
      },
    ],
  },
};

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = SOLUTIONS_MAP[slug];

  if (!item) {
    return { title: "Solution Not Found | WhatFlow" };
  }

  const canonicalUrl = `${SITE_URL}/solutions/${slug}`;

  return {
    title: item.metaTitle,
    description: item.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: item.metaTitle,
      description: item.metaDescription,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: item.metaTitle,
      description: item.metaDescription,
    },
  };
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const item = SOLUTIONS_MAP[slug];

  if (!item) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/solutions" },
    { name: item.title, url: `/solutions/${slug}` },
  ]);

  const faqSchema = getFAQSchema(item.faqs);

  const others = Object.values(SOLUTIONS_MAP).filter((other) => other.slug !== slug);

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        title={item.headline}
        accent={item.accent}
        sub={<p>{item.subtitle}</p>}
        actions={
          <>
            <Link
              href={getShopifyAppUrl(`solution_${slug}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="wf-btn wf-btn-green"
            >
              Start 7-day free trial
            </Link>
            <Link href="/pricing" className="wf-btn wf-btn-ghost">
              View pricing
            </Link>
          </>
        }
        meta={
          <>
            <nav aria-label="Breadcrumb" className="sol-crumbs">
              <Link href="/">Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/solutions">Solutions</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{item.tag}</span>
            </nav>
            <span className="wf-pill">{item.heroBadge}</span>
          </>
        }
      >
        <div className={`sol-stage ${item.tone}`}>
          <div className="lp">
            <Phone label={`WhatsApp preview: ${item.tag.toLowerCase()} flow`}>
              {item.chat.map((message) => <Bubble key={message.id} message={message} />)}
            </Phone>
          </div>
          <div className="sol-sticker sol-sticker-a">
            <div><b>{item.stat.value}</b><small>{item.stat.label}</small></div>
          </div>
        </div>
      </PageHero>

      {/* ─── Key metric ─── */}
      <Section tone="dark">
        <div className="sol-stat" data-reveal>
          <div className="sol-stat-value">{item.stat.value}</div>
          <div className="sol-stat-label">{item.stat.label}</div>
          <p className="sol-stat-note">
            Based on data from over 10,000+ active Shopify stores running WhatFlow WhatsApp automations.
          </p>
        </div>
      </Section>

      {/* ─── Feature pillars ─── */}
      <Section tone="paper">
        <SectionHead
          title={<>Built exclusively for <Hl>Shopify</Hl> stores.</>}
        />
        <div className="wf-grid wf-grid-2 mt-12">
          {item.features.map((feature, index) => (
            <div
              key={feature.title}
              className={`wf-card sol-card ${["sol-tone-yellow", "sol-tone-mint", "sol-tone-sky", "sol-tone-pink"][index % 4]}`}
              data-hover
              data-reveal
              style={{ "--d": `${index * 80}ms` } as CSSProperties}
            >
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── How it works ─── */}
      <Section tone="white">
        <SectionHead
          title={<>3 simple steps to <Hl>scale</Hl>.</>}
          center
        />
        <div className="wf-grid wf-grid-3 sol-steps mt-12">
          {item.steps.map((st, index) => (
            <div
              key={st.step}
              className={`wf-card sol-card-tinted ${item.tone}`}
              data-reveal
              style={{ "--d": `${index * 100}ms` } as CSSProperties}
            >
              <span className="sol-step-num">{st.step}</span>
              <h3>{st.title}</h3>
              <p>{st.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── FAQ ─── */}
      <Section tone="paper">
        <SectionHead title="Frequently asked questions" center />
        <div className="sol-faq">
          {item.faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0} data-reveal style={{ "--d": `${index * 60}ms` } as CSSProperties}>
              <summary>
                <h3 className="text-[1.15rem]">{faq.question}</h3>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-14 text-center" data-reveal>
          <Link
            href={getShopifyAppUrl(`bottom_solution_${slug}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="wf-btn wf-btn-dark"
          >
            Install WhatFlow on Shopify
          </Link>
          <p className="mt-10 text-sm font-bold text-[var(--text-muted)]">More solutions</p>
          <nav aria-label="More solutions" className="sol-more">
            {others.map((other) => (
              <Link key={other.slug} href={`/solutions/${other.slug}`}>{other.tag}</Link>
            ))}
          </nav>
        </div>
      </Section>
    </div>
  );
}
