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
    metaTitle: "Shopify Abandoned Cart Recovery on WhatsApp",
    metaDescription:
      "Send WhatsApp reminders to shoppers who leave a Shopify checkout, with a link back to their saved basket. Set the delay, preview the message and test it first.",
    headline: "Recover lost Shopify sales on autopilot via WhatsApp.",
    accent: ["autopilot"],
    subtitle:
      "About 70% of online carts are abandoned, according to Baymard Institute's average. Reach shoppers on WhatsApp with an approved reminder that links back to their saved checkout.",
    heroBadge: "Included on the Free plan",
    stat: { value: "70%", label: "Average cart abandonment rate (Baymard Institute)" },
    features: [
      {
        title: "1-click direct checkout links",
        desc: "Customers tap a single button in WhatsApp to instantly return to their pre-filled checkout with all cart items saved.",
      },
      {
        title: "Approved reminder templates",
        desc: "Pick an approved WhatsApp template, preview it with sample data, and add a discount code only if you choose to.",
      },
      {
        title: "Your choice of delay",
        desc: "Choose how long to wait before the reminder, so shoppers get a fair chance to finish on their own.",
      },
      {
        title: "Draft-order reminders",
        desc: "Follow up on draft orders and invoices with their own template and wait time, kept separate from checkout reminders.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Customer leaves checkout",
        desc: "A shopper starts checkout in Shopify and leaves before paying.",
      },
      {
        step: "02",
        title: "Reminder sent",
        desc: "After your delay, WhatFlow sends your approved WhatsApp reminder with a link back to the saved checkout.",
      },
      {
        step: "03",
        title: "Order completed",
        desc: "The shopper finishes paying on Shopify. Test once before rollout to confirm no reminder follows a completed order.",
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
          "WhatsApp reaches shoppers in the app they already use for chats, supports buttons and images, and any reply lands in your team inbox. Results vary by store, so compare recovered orders against a holdout group before you decide.",
      },
      {
        question: "How quickly does WhatFlow send the recovery message?",
        answer:
          "You set the delay. Give shoppers a fair chance to finish on their own, then test a couple of delays and keep the one that recovers more orders for your store.",
      },
      {
        question: "Does WhatFlow stop sending if the customer already bought?",
        answer:
          "Reminders are meant for unfinished checkouts. Before you switch them on, abandon a test checkout, then complete the order, and confirm no reminder follows.",
      },
    ],
  },
  "cod-order-verification": {
    slug: "cod-order-verification",
    tag: "COD and fraud prevention",
    tone: "sol-tone-mint",
    title: "Shopify Cash on Delivery (COD) WhatsApp Confirmation & Anti-RTO",
    metaTitle: "Shopify COD Order Confirmation on WhatsApp",
    metaDescription:
      "Confirm Shopify cash on delivery orders on WhatsApp before you ship. Buyers confirm or cancel with a reply button, orders are tagged, and OTP checks are optional.",
    headline: "Confirm every COD order on WhatsApp before you ship.",
    accent: ["before"],
    subtitle:
      "Verify buyer intent before shipping. Send automated WhatsApp confirmation messages with interactive 'Confirm Order' and 'Cancel Order' buttons that update Shopify order tags in real time.",
    heroBadge: "COD, OTP and FlowSense included",
    stat: { value: "1 tap", label: "for a buyer to confirm or cancel a COD order" },
    features: [
      {
        title: "1-click interactive buttons",
        desc: "Customers confirm or cancel their COD order with a single tap in WhatsApp, without a phone call.",
      },
      {
        title: "Automatic Shopify order tagging",
        desc: "Replies update the Shopify order with tags, so your warehouse ships only orders the buyer confirmed.",
      },
      {
        title: "OTP phone verification",
        desc: "Verify the buyer's phone number with a one-time code at a checkout placement your store supports, and tag verified orders.",
      },
      {
        title: "FlowSense order review",
        desc: "Review risky COD orders with insights from order and delivery outcomes, then act on a policy your team can explain.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "COD order placed",
        desc: "A customer places an order with the cash on delivery payment method you chose in WhatFlow.",
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
    metaTitle: "Shopify Order Tracking Notifications on WhatsApp",
    metaDescription:
      "Keep Shopify customers delighted with real-time WhatsApp shipping updates, tracking links, and delivery notifications. Reduce 'Where is my order?' support tickets.",
    headline: "Real-time WhatsApp shipping updates that delight customers.",
    accent: ["delight"],
    subtitle:
      "Send shipping updates and tracking links on WhatsApp at the stages you choose, from label and carrier pickup to in transit and delivered, so fewer customers need to ask where their order is.",
    heroBadge: "Pick the stages you send",
    stat: { value: "$0.0014", label: "Meta utility rate per message to India (Oct 2026)" },
    features: [
      {
        title: "Fulfillment and tracking alerts",
        desc: "Trigger WhatsApp messages the second an order is marked fulfilled in Shopify, complete with carrier tracking URLs.",
      },
      {
        title: "Delivery-stage alerts",
        desc: "Send updates at the stages your carrier reports, such as pickup, in transit and delivered, and test each one first.",
      },
      {
        title: "Split shipments",
        desc: "If orders ship in more than one package, test a split shipment so each parcel gets the right update.",
      },
      {
        title: "Replies reach your team",
        desc: "Customers reply in the same chat and your team answers from the shared inbox, with no seat fees.",
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
        desc: "The buyer knows where the parcel is, so fewer 'where is my order' questions reach your team.",
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
          "WhatFlow uses the fulfillment and tracking details in Shopify, so it works with carriers that add tracking to your Shopify orders. Check that your carrier sends the events you plan to message on, then test a real order.",
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
    metaTitle: "Collect Shopify Reviews on WhatsApp (Judge.me)",
    metaDescription:
      "Ask for Shopify product reviews on WhatsApp at the right time after delivery. Use WhatFlow Review Requests or the ready-made Judge.me Shopify Flow template.",
    headline: "Ask for product reviews on WhatsApp at the right time.",
    accent: ["right"],
    subtitle:
      "Email review requests are easy to miss. Send a WhatsApp message that links to your review form a set time after delivery, using WhatFlow Review Requests or the Judge.me Shopify Flow template.",
    heroBadge: "Judge.me Flow template included",
    stat: { value: "Free", label: "Review requests on every plan, including Free" },
    features: [
      {
        title: "Judge.me through Shopify Flow",
        desc: "A ready-made Flow template sends your Judge.me review request on WhatsApp. Judge.me still collects and publishes the reviews.",
      },
      {
        title: "Choose who and when",
        desc: "Pick when to ask, who receives the request and which approved template to send.",
      },
      {
        title: "Replies land in your inbox",
        desc: "If a customer replies with a photo or a question, your team sees it in the shared inbox.",
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
        desc: "WhatFlow waits the delay you set after delivery, or after fulfillment plus time in transit, before sending.",
      },
      {
        step: "02",
        title: "Review request sent",
        desc: "The customer receives your approved WhatsApp template with a link to your review form.",
      },
      {
        step: "03",
        title: "Review collected",
        desc: "The customer submits through your review app's form, which publishes the review as usual.",
      },
    ],
    chat: [
      { id: "c1", from: "store", text: "How are you liking your new Linen tote? We'd love a quick review.", buttons: ["Leave a review"], tapped: 0, time: "18:20" },
      { id: "c2", from: "customer", text: "Love it! Just left 5 stars ⭐", time: "18:24" },
      { id: "c3", from: "store", text: "Thank you, that really helps us 💚", time: "18:25" },
    ],
    faqs: [
      {
        question: "Do I need to replace my existing review app?",
        answer:
          "No. WhatFlow sends the request on WhatsApp; your review app still collects and publishes the review. Judge.me has a ready-made Shopify Flow template for this.",
      },
      {
        question: "Can I offer a reward for leaving a review?",
        answer:
          "You can mention a reward in your own message, but check your review platform's rules and consumer-protection guidance on incentivized reviews first, and never reward only positive reviews.",
      },
    ],
  },
  "chat-button": {
    slug: "chat-button",
    tag: "Storefront conversion",
    tone: "sol-tone-lilac",
    title: "Shopify WhatsApp Chat Button & Support Widget",
    metaTitle: "Free WhatsApp Chat Button for Shopify",
    metaDescription:
      "Add a free, theme-matched WhatsApp chat button to your Shopify store with the theme editor. Set the number and opening message and preview it on mobile.",
    headline: "Connect with store visitors in 1 tap via WhatsApp chat.",
    accent: ["1", "tap"],
    subtitle:
      "Let store visitors ask a question before they buy. Add a theme-matched WhatsApp button with the Shopify theme editor, set your number and opening message, and preview it on mobile. It's free forever.",
    heroBadge: "Free forever",
    stat: { value: "$0", label: "Theme-matched chat buttons, free forever" },
    features: [
      {
        title: "Custom design and placement",
        desc: "Choose from modern floating widgets, pill buttons, or embedded store triggers that match your brand aesthetic perfectly.",
      },
      {
        title: "Opening message",
        desc: "Set the message the chat opens with, so customers start the conversation with context.",
      },
      {
        title: "Answer from the team inbox",
        desc: "With WhatFlow Business API, chats from the button land in the shared inbox, where you can assign them.",
      },
      {
        title: "Placed with the theme editor",
        desc: "Enable the app embed in your theme editor without code, and check it doesn't overlap your cart or cookie banner.",
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
        desc: "Place and style the button in the theme editor, then preview your theme on desktop and mobile.",
      },
      {
        step: "03",
        title: "Convert visitors to buyers",
        desc: "Shoppers tap to start a WhatsApp chat with your store. Ask for opt-in before you send them marketing messages.",
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
          "It's added as a Shopify app embed through the theme editor. As with any app, check your theme's speed and layout on mobile and desktop before and after you publish it.",
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
    return { title: "Solution Not Found" };
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
