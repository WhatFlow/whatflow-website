import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getShopifyAppUrl } from "@/lib/shopify-app";
import { getBreadcrumbSchema, getFAQSchema, SITE_URL } from "@/lib/schema-org";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

interface SolutionData {
  slug: string;
  tag: string;
  tagColor: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subtitle: string;
  heroBadge: string;
  stat: { value: string; label: string };
  features: { title: string; desc: string; icon: string }[];
  steps: { step: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

const SOLUTIONS_MAP: Record<string, SolutionData> = {
  "abandoned-cart-recovery": {
    slug: "abandoned-cart-recovery",
    tag: "CART RECOVERY",
    tagColor: "bg-[#FFC107] text-black",
    title: "Shopify WhatsApp Abandoned Cart Recovery",
    metaTitle: "Shopify WhatsApp Abandoned Cart Recovery — 98% Open Rates | WhatFlow",
    metaDescription:
      "Recover up to 25% of abandoned Shopify checkouts with automated WhatsApp cart recovery messages. 1-click checkout links, dynamic discounts, and 98% open rates.",
    headline: "RECOVER LOST SHOPIFY SALES ON AUTOPILOT VIA WHATSAPP",
    subtitle:
      "Over 70% of eCommerce carts are abandoned. Reach shoppers directly on WhatsApp with pre-filled checkout links and dynamic discount codes before they buy from competitors.",
    heroBadge: "25% AVERAGE RECOVERY RATE",
    stat: { value: "25%", label: "Average Checkout Recovery Rate" },
    features: [
      {
        title: "1-Click Direct Checkout Links",
        desc: "Customers tap a single button in WhatsApp to instantly return to their pre-filled checkout with all cart items saved.",
        icon: "⚡",
      },
      {
        title: "Dynamic Smart Discounts",
        desc: "Offer tiered incentive discounts based on cart value or customer status to maximize checkout completion without sacrificing margins.",
        icon: "🏷️",
      },
      {
        title: "Automated Multi-Step Sequences",
        desc: "Set timed follow-ups (e.g. 30 minutes, 6 hours, 24 hours) that automatically cancel if the customer completes their purchase.",
        icon: "⏳",
      },
      {
        title: "Quiet Hours & Compliance",
        desc: "Respect customer timezones with automatic quiet hours and 1-click opt-out rules that keep your WhatsApp Business account in high quality standing.",
        icon: "🛡️",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Customer Leaves Checkout",
        desc: "Shopify fires an abandoned checkout webhook to WhatFlow in real time.",
      },
      {
        step: "02",
        title: "Smart Sequence Triggers",
        desc: "WhatFlow sends a personalized WhatsApp template with exact product titles, thumbnail, and 1-click recovery button.",
      },
      {
        step: "03",
        title: "Order Completed",
        desc: "Shopper completes payment on Shopify. Follow-up sequences auto-cancel and conversion is tracked in real-time.",
      },
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
    tag: "COD & FRAUD PREVENTION",
    tagColor: "bg-[#00D261] text-black",
    title: "Shopify Cash on Delivery (COD) WhatsApp Confirmation & Anti-RTO",
    metaTitle: "Shopify COD WhatsApp Order Confirmation & Anti-RTO | WhatFlow",
    metaDescription:
      "Slash Cash on Delivery (COD) Return-to-Origin (RTO) rates by up to 40%. Send 1-click WhatsApp order confirmation and cancellation buttons that automatically update Shopify order tags.",
    headline: "CUT COD RETURN-TO-ORIGIN (RTO) BY UP TO 40%",
    subtitle:
      "Verify buyer intent before shipping. Send automated WhatsApp confirmation messages with interactive 'Confirm Order' and 'Cancel Order' buttons that update Shopify order tags in real time.",
    heroBadge: "40% RTO REDUCTION",
    stat: { value: "40%", label: "Average Reduction in Failed Deliveries" },
    features: [
      {
        title: "1-Click Interactive Buttons",
        desc: "Customers confirm or cancel their COD order with a single tap in WhatsApp—no OTP typing or phone calls required.",
        icon: "✅",
      },
      {
        title: "Automatic Shopify Order Tagging",
        desc: "Instantly applies 'COD Confirmed', 'COD Cancelled', or 'COD Unverified' tags to Shopify orders to streamline your warehouse fulfillment.",
        icon: "🏷️",
      },
      {
        title: "Address Verification & Correction",
        desc: "Allow customers to verify and fix incomplete street addresses or pin codes directly inside WhatsApp chat.",
        icon: "📍",
      },
      {
        title: "Prepaid Conversion Incentives",
        desc: "Offer a dynamic discount link to encourage COD buyers to convert to prepaid payment on Shopify before shipping.",
        icon: "💳",
      },
    ],
    steps: [
      {
        step: "01",
        title: "COD Order Placed",
        desc: "When a customer places a Cash on Delivery order, WhatFlow instantly detects the COD payment gateway.",
      },
      {
        step: "02",
        title: "WhatsApp Button Sent",
        desc: "Customer receives a WhatsApp summary with 'Confirm Order' and 'Cancel' interactive quick-reply buttons.",
      },
      {
        step: "03",
        title: "Warehouse Tagged",
        desc: "Upon clicking, WhatFlow tags the order in Shopify Admin so fulfillment teams only ship verified orders.",
      },
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
    tag: "POST-PURCHASE AUTOMATION",
    tagColor: "bg-[#2563EB] text-white",
    title: "Shopify WhatsApp Order Tracking & Shipping Notifications",
    metaTitle: "Shopify WhatsApp Order Tracking & Shipping Alerts | WhatFlow",
    metaDescription:
      "Keep Shopify customers delighted with real-time WhatsApp shipping updates, tracking links, and delivery notifications. Reduce 'Where is my order?' support tickets.",
    headline: "REAL-TIME WHATSAPP SHIPPING UPDATES THAT DELIGHT CUSTOMERS",
    subtitle:
      "Deliver automated order receipts, tracking numbers, out-for-delivery alerts, and fulfillment updates straight to WhatsApp. Reduce customer service inquiries by over 60%.",
    heroBadge: "60% FEWER WISMO TICKETS",
    stat: { value: "60%", label: "Fewer 'Where is My Order' Support Inquiries" },
    features: [
      {
        title: "Fulfillment & Tracking Alerts",
        desc: "Trigger WhatsApp messages the second an order is marked fulfilled in Shopify, complete with carrier tracking URLs.",
        icon: "📦",
      },
      {
        title: "Out-for-Delivery Alerts",
        desc: "Notify customers on the day of delivery so they are available to receive their package, reducing delivery failures.",
        icon: "🚚",
      },
      {
        title: "Interactive Order Receipts",
        desc: "Provide clean, rich message cards detailing purchased items, total spent, and links to download invoices.",
        icon: "🧾",
      },
      {
        title: "Cross-Sell Recommendations",
        desc: "Include smart personalized product recommendations in delivery confirmation messages to drive repeat purchases.",
        icon: "🎯",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Tracking Added in Shopify",
        desc: "When you fulfill an order and add tracking info, WhatFlow catches the fulfillment event instantly.",
      },
      {
        step: "02",
        title: "Real-Time WhatsApp Alert",
        desc: "The buyer receives an official WhatsApp notification with live carrier tracking link and item summary.",
      },
      {
        step: "03",
        title: "Delighted Repeat Customer",
        desc: "Buyer stays informed, eliminating support tickets and boosting satisfaction and lifetime loyalty.",
      },
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
          "Yes! WhatFlow includes a 2-way live chat inbox and 24/7 AI auto-replier so customers can ask questions directly in the same WhatsApp thread.",
      },
    ],
  },
  "whatsapp-reviews-ugc": {
    slug: "whatsapp-reviews-ugc",
    tag: "REVIEWS & UGC",
    tagColor: "bg-[#FF4B4B] text-white",
    title: "Collect Shopify Reviews & UGC via WhatsApp",
    metaTitle: "Collect Shopify Reviews on WhatsApp (Judge.me & Loox) | WhatFlow",
    metaDescription:
      "Generate 5x more product reviews and user-generated photo content on WhatsApp. Seamless integration with Judge.me, Loox, and Shopify reviews.",
    headline: "GET 5X MORE 5-STAR PRODUCT REVIEWS ON WHATSAPP",
    subtitle:
      "Email review requests get ignored. Collect authentic star ratings, text reviews, and photo testimonials directly on WhatsApp with pre-built Judge.me and Loox integrations.",
    heroBadge: "5X HIGHER REVIEW SUBMISSION",
    stat: { value: "5x", label: "Higher Review Submission Rate vs Email" },
    features: [
      {
        title: "Judge.me & Loox Direct Sync",
        desc: "Seamlessly connects with your existing Shopify review apps to publish collected reviews directly to your product pages.",
        icon: "⭐",
      },
      {
        title: "1-Click Star Rating Buttons",
        desc: "Shoppers select star ratings with a single tap directly inside the WhatsApp conversation window.",
        icon: "✨",
      },
      {
        title: "Photo & Video UGC Collection",
        desc: "Customers can easily send photos and videos of their products right from their smartphone camera roll.",
        icon: "📸",
      },
      {
        title: "Automated Delivery Timing",
        desc: "Trigger review requests a configurable number of days after order delivery so customers have had time to try their purchase.",
        icon: "⏱️",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Order Delivered",
        desc: "WhatFlow waits your specified number of days (e.g. 5 days) after delivery before sending.",
      },
      {
        step: "02",
        title: "Interactive Review Request",
        desc: "Customer receives a WhatsApp message with 1-click star rating buttons and optional photo upload prompt.",
      },
      {
        step: "03",
        title: "Synced to Storefront",
        desc: "Review and photo are automatically posted to Judge.me/Loox to boost your social proof and conversion rate.",
      },
    ],
    faqs: [
      {
        question: "Do I need to replace my existing review app?",
        answer:
          "No! WhatFlow integrates directly with Judge.me, Loox, and standard review widgets so all collected reviews appear seamlessly in your existing system.",
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
    tag: "STOREFRONT CONVERSION",
    tagColor: "bg-[#00D261] text-black",
    title: "Shopify WhatsApp Chat Button & Support Widget",
    metaTitle: "Shopify WhatsApp Chat Button & Storefront Widget | WhatFlow",
    metaDescription:
      "Add a beautiful, high-converting WhatsApp chat button to your Shopify storefront. Zero coding, customizable positions, agent routing, and pre-filled greetings.",
    headline: "CONNECT WITH STORE VISITORS IN 1 TAP VIA WHATSAPP CHAT",
    subtitle:
      "Turn casual store visitors into paying customers. Add a customizable, mobile-optimized WhatsApp floating button with smart greetings and multi-agent routing in under 60 seconds.",
    heroBadge: "3-MINUTE INSTALL",
    stat: { value: "3 min", label: "Average Setup Time (No Code)" },
    features: [
      {
        title: "Custom Design & Placement",
        desc: "Choose from modern floating widgets, pill buttons, or embedded store triggers that match your brand aesthetic perfectly.",
        icon: "🎨",
      },
      {
        title: "Pre-Filled Dynamic Messages",
        desc: "Automatically include the product title or page URL the customer was viewing so your team has instant context.",
        icon: "💬",
      },
      {
        title: "Multi-Agent Routing",
        desc: "Route inquiries to different team members or departments (e.g., Sales vs Support) seamlessly.",
        icon: "👥",
      },
      {
        title: "Zero Impact on Page Speed",
        desc: "Ultra-lightweight script (< 5KB) loaded asynchronously with zero layout shift or page speed penalty.",
        icon: "🚀",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Install in 1 Click",
        desc: "Enable the WhatFlow app embed in your Shopify Theme Editor without editing any theme code.",
      },
      {
        step: "02",
        title: "Customize Appearance",
        desc: "Select colors, icon styles, greeting tooltips, and agent display names to match your brand.",
      },
      {
        step: "03",
        title: "Convert Visitors to Buyers",
        desc: "Shoppers click to start a WhatsApp chat, capturing their phone number as a qualified marketing lead.",
      },
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
          "Yes! On mobile devices it opens the native WhatsApp app, and on desktop it opens WhatsApp Web seamlessly.",
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

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─── Hero Section ─── */}
      <section className="bg-[#FAF7F0] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-[1080px] mx-auto space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
            <Link href="/" className="hover:text-[#00D261] transition-colors">Home</Link>
            <span>›</span>
            <Link href="/solutions" className="hover:text-[#00D261] transition-colors">Solutions</Link>
            <span>›</span>
            <span className="text-black">{item.tag}</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className={`neo-pill px-3 py-1 text-xs font-black uppercase tracking-wider border-black ${item.tagColor}`}>
              {item.tag}
            </span>
            <span className="neo-pill bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
              ★ {item.heroBadge}
            </span>
          </div>

          <h1 className="text-[36px] sm:text-[54px] lg:text-[68px] font-display font-black uppercase text-black tracking-tight leading-none">
            {item.headline}
          </h1>

          <p className="text-base sm:text-xl text-gray-700 font-medium max-w-3xl leading-relaxed">
            {item.subtitle}
          </p>

          <div className="pt-4 flex items-center gap-4 flex-wrap">
            <Link
              href={getShopifyAppUrl(`solution_${slug}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-[#00D261] text-black font-display font-black text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-[4px_4px_0px_#000] hover:scale-105 transition-transform"
            >
              START 14-DAY FREE TRIAL ➔
            </Link>
            <Link
              href="/pricing"
              className="neo-btn bg-white text-black font-extrabold text-xs uppercase tracking-wider px-6 py-4 rounded-xl shadow-[3px_3px_0px_#000]"
            >
              VIEW PRICING
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Key Metrics Stat Highlight ─── */}
      <section className="bg-[#091E17] text-white border-b-[2.5px] border-black py-10 px-4 sm:px-6">
        <div className="max-w-[1080px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl sm:text-5xl font-display font-black text-[#00D261]">
              {item.stat.value}
            </div>
            <div className="text-sm font-extrabold uppercase tracking-wide text-gray-200">
              {item.stat.label}
            </div>
          </div>
          <div className="text-xs text-gray-300 font-medium max-w-md text-center sm:text-right">
            Based on data from over 10,000+ active Shopify stores running WhatFlow WhatsApp automations.
          </div>
        </div>
      </section>

      {/* ─── Feature Pillars ─── */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 max-w-[1080px] mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="neo-box inline-block bg-[#00D261] px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
            POWERFUL CAPABILITIES
          </div>
          <h2 className="text-[32px] sm:text-[44px] font-display font-black uppercase text-black tracking-tight">
            BUILT EXCLUSIVELY FOR SHOPIFY STORES
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {item.features.map((feature) => (
            <div
              key={feature.title}
              className="neo-box bg-white p-8 rounded-2xl space-y-4 hover:-translate-y-1 transition-transform"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FAF7F0] border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000]">
                {feature.icon}
              </div>
              <h3 className="text-lg font-display font-black uppercase text-black">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3-Step Process ─── */}
      <section className="bg-white border-y-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-[1080px] mx-auto space-y-12">
          <div className="text-center space-y-3">
            <div className="neo-box inline-block bg-[#FFC107] px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
              HOW IT WORKS
            </div>
            <h2 className="text-[32px] sm:text-[44px] font-display font-black uppercase text-black tracking-tight">
              3 SIMPLE STEPS TO SCALE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {item.steps.map((st) => (
              <div
                key={st.step}
                className="neo-box bg-[#FAF7F0] p-6 rounded-2xl space-y-3 relative"
              >
                <div className="text-3xl font-display font-black text-[#0A6B56]">
                  {st.step}
                </div>
                <h3 className="text-base font-display font-black uppercase text-black">
                  {st.title}
                </h3>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 max-w-[1080px] mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="neo-box inline-block bg-[#00D261] px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
            COMMON QUESTIONS
          </div>
          <h2 className="text-[32px] sm:text-[44px] font-display font-black uppercase text-black tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        <div className="space-y-4">
          {item.faqs.map((faq) => (
            <div key={faq.question} className="neo-box bg-white p-6 rounded-xl space-y-2">
              <h3 className="text-sm sm:text-base font-extrabold uppercase text-black">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="bg-[#091E17] text-white py-16 sm:py-20 px-4 sm:px-6 border-t-[2.5px] border-black">
        <div className="max-w-[1080px] mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight">
            READY TO AUTOMATE WITH <span className="text-stroke-green">WHATSAPP?</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-medium">
            Join 10,000+ top Shopify brands driving 4x higher revenue and delighting customers.
          </p>
          <div className="pt-2">
            <Link
              href={getShopifyAppUrl(`bottom_solution_${slug}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-[#00D261] text-black font-display font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl inline-block shadow-[4px_4px_0px_#000] hover:scale-105 transition-transform"
            >
              INSTALL WHATFLOW ON SHOPIFY ➔
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
