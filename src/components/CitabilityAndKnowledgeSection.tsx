import Link from "next/link";
import { HOMEPAGE_UPDATED_AT, HOMEPAGE_UPDATED_LABEL } from "@/lib/content-dates";

const workflows = [
  {
    title: "How does WhatsApp checkout recovery work?",
    text: "Checkout recovery is a follow-up message that helps a shopper return to an unfinished purchase. WhatFlow can send a checkout link through a configured WhatsApp workflow. A useful reminder answers a question about shipping, payment, or the product. Send it only when the customer has agreed to receive messages and the message meets WhatsApp’s rules. Measure completed orders against eligible checkouts in your own store; recovery rates vary with the audience, timing, offer, and delivery success.",
    href: "/solutions/abandoned-cart-recovery",
    label: "Explore checkout recovery",
  },
  {
    title: "What is cash on delivery verification?",
    text: "Cash on delivery (COD) verification asks a shopper to confirm an order before dispatch. WhatFlow can collect a reply and tag the Shopify order so your team can review it. This helps staff decide which orders need attention. A confirmation does not guarantee payment or delivery, and no reply does not prove that an order is fake. Set a clear review policy before canceling orders and measure delivery outcomes for your own store.",
    href: "/solutions/cod-order-verification",
    label: "Explore order confirmation",
  },
  {
    title: "How does WhatFlow connect to Shopify?",
    text: "WhatFlow Business API connects Shopify messaging to the official Meta WhatsApp Cloud API. Shopify Flow is a workflow tool that links triggers, conditions, and actions. Use WhatFlow’s Flow integration to send messages from store events and route customer replies into your process. A shared inbox gives your team a place to respond, and catalog sharing helps staff discuss products. Delivery depends on the workflow, customer consent, template approval, network conditions, and Meta’s service. No fixed delivery time is promised.",
    href: "/integrations/shopify-flow",
    label: "Explore Shopify Flow integration",
  },
];
const comparisons = [
  ["Customer actions", "Quick replies, buttons, and media in supported messages", "Text replies and links; rich features depend on the service", "Links and HTML content; features depend on the email client"],
  ["Setup and permissions", "WhatsApp account setup, customer consent, and applicable template rules", "Sender setup, consent, and country or carrier requirements", "Sending domain setup, consent, and unsubscribe handling"],
  ["Costs", "WhatFlow plan allowance plus applicable Meta messaging charges", "Provider, carrier, country, and message length affect cost", "Provider, contact count, and sending volume affect cost"],
  ["Choosing a channel", "Useful when shoppers want to talk to your store on WhatsApp", "Useful for concise updates where customers accept SMS", "Useful for longer messages, receipts, and newsletters"],
];

export function CitabilityAndKnowledgeSection() {
  return (
    <section id="knowledge-benchmarks" aria-labelledby="messaging-guide-heading" className="bg-white py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black">
      <div className="max-w-[1280px] mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 id="messaging-guide-heading" className="text-[32px] sm:text-[46px] font-display font-black uppercase text-black tracking-tight leading-tight">How can Shopify stores use WhatsApp?</h2>
          <p className="text-base text-gray-700 leading-relaxed">Shopify stores can use WhatsApp to answer questions, follow up on checkouts, confirm orders, and send shipping updates. Choose the channel your customers prefer, then measure results in your store. No open rate, revenue lift, or return on investment is guaranteed.</p>
          <p className="text-xs text-gray-600">By <Link href="/about" className="underline">WhatFlow product team</Link> · Updated <time dateTime={HOMEPAGE_UPDATED_AT}>{HOMEPAGE_UPDATED_LABEL}</time></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workflows.map((workflow) => (
            <article key={workflow.href} className="neo-box bg-[#FAF7F0] p-6 sm:p-7 rounded-2xl flex flex-col gap-4">
              <h3 className="font-display font-black text-xl text-black">{workflow.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed flex-1">{workflow.text}</p>
              <Link href={workflow.href} className="text-sm font-bold text-[#0A6B56] underline">{workflow.label}</Link>
            </article>
          ))}
        </div>
        <div className="neo-box bg-[#FAF7F0] p-6 sm:p-8 rounded-2xl space-y-6">
          <h3 className="text-2xl font-display font-black text-black">WhatsApp, SMS, and email: which fits your workflow?</h3>
          <p className="text-sm text-gray-700">Each channel can support customer communication. Compare consent, message format, and total costs before choosing a provider. Performance varies by store; this table compares capabilities rather than industry averages.</p>
          <div className="overflow-x-auto" role="region" aria-label="Messaging channel comparison" tabIndex={0}>
            <table className="w-full min-w-[680px] text-left text-sm border-collapse border-2 border-black bg-white">
              <caption className="sr-only">Messaging channel capabilities and tradeoffs, reviewed October 27, 2026</caption>
              <thead><tr className="bg-[#091E17] text-white">{["Consideration", "WhatFlow Business API (WhatsApp)", "SMS", "Email"].map((label) => <th scope="col" key={label} className="p-4 border-2 border-black">{label}</th>)}</tr></thead>
              <tbody>{comparisons.map(([label, ...cells]) => <tr key={label}><th scope="row" className="p-4 border-2 border-black">{label}</th>{cells.map((cell) => <td key={cell} className="p-4 border-2 border-black text-gray-700">{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <Link href="/pricing" className="inline-block text-sm font-bold text-[#0A6B56] underline">Check current WhatFlow plans and messaging charges</Link>
        </div>
        <aside aria-labelledby="sources-heading" className="neo-box bg-[#FAF7F0] p-6 rounded-xl space-y-4 text-sm text-gray-700">
          <h3 id="sources-heading" className="font-black text-black">Sources, methodology, and limitations</h3>
          <p>This guide describes product workflows, not a merchant performance study. The calculator uses example inputs supplied by the visitor. It estimates gross revenue before costs and assumes abandoned checkouts are reachable and eligible for messaging. WhatFlow has not published a measured recovery rate, average open rate, or delivery latency benchmark on this page.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><a href="https://developers.facebook.com/docs/whatsapp/cloud-api/overview" className="underline">Meta: WhatsApp Cloud API overview</a> — platform setup and messaging capabilities.</li>
            <li><a href="https://business.whatsapp.com/policy" className="underline">WhatsApp Business Messaging Policy</a> — consent and permitted business messaging.</li>
            <li><a href="https://help.shopify.com/en/manual/shopify-flow" className="underline">Shopify: Flow documentation</a> — triggers, conditions, and actions.</li>
            <li><Link href="/compare/whatflow-chat-automation-vs-business-api" className="underline">WhatFlow Chat Automation vs Business API</Link> — connection methods and product differences.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
