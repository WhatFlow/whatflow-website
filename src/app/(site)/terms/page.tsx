import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | WhatFlow",
  description: "Terms of Service and Subscription Agreement for WhatFlow Shopify merchants.",
};

export default function TermsPage() {
  const lastUpdated = "August 20, 2026";

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* ─── Hero ─── */}
      <section className="bg-[#FAF7F0] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-[960px] mx-auto">
          <div className="neo-box inline-block bg-[#00D261] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black mb-4">
            LEGAL &amp; COMPLIANCE
          </div>
          <h1 className="text-[44px] sm:text-[60px] lg:text-[72px] font-display font-black uppercase text-black tracking-tight leading-none mb-4">
            TERMS OF <span className="text-stroke-green">SERVICE.</span>
          </h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
            LAST UPDATED: {lastUpdated}
          </p>
        </div>
      </section>

      {/* ─── Body ─── */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-[960px] mx-auto neo-box bg-white p-8 sm:p-14 rounded-2xl space-y-10 text-[#222]">
          <div>
            <h2 className="text-2xl font-display font-black uppercase text-black mb-3">
              1. ACCEPTANCE OF TERMS
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              By installing, accessing, or using the WhatFlow Shopify application or website (whatflow.io), you agree to be bound by these Terms of Service. If you are entering into these terms on behalf of a company or entity, you represent that you have the authority to bind such entity to these terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-black uppercase text-black mb-3">
              2. WHATSAPP BUSINESS &amp; META CLOUD API POLICY
            </h2>
            <p className="text-sm leading-relaxed text-gray-700 mb-3">
              WhatFlow utilizes official Meta WhatsApp Cloud APIs. Merchants using WhatFlow must comply at all times with:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed text-gray-700">
              <li>Meta WhatsApp Business Policy and WhatsApp Commerce Policy.</li>
              <li>Obtaining proper customer opt-in consent before sending marketing or re-engagement templates.</li>
              <li>Honoring opt-out keywords (e.g. &quot;STOP&quot;, &quot;UNSUBSCRIBE&quot;) sent by customers immediately.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-display font-black uppercase text-black mb-3">
              3. BILLING, PRICING &amp; META CONVERSATION RATES
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              WhatFlow plans are billed directly through Shopify App Billing on a 30-day recurring cycle. In addition to WhatFlow software subscription fees, WhatsApp conversation fees charged by Meta Cloud API are billed transparently with zero markup from WhatFlow. You can view official country-by-country Meta rates directly on our Pricing page.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-black uppercase text-black mb-3">
              4. SERVICE LEVEL AGREEMENT &amp; UPTIME
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              We strive to maintain a 99.9% application uptime SLA. WhatFlow leverages globally distributed edge architecture on Cloudflare and resilient queuing to ensure real-time message delivery even during Black Friday / Cyber Monday peak volume.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-black uppercase text-black mb-3">
              5. LIMITATION OF LIABILITY
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              In no event shall WhatFlow, its founders, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages resulting from WhatsApp account bans, carrier deliverability issues, or third-party outages outside of our direct software control.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-black uppercase text-black mb-3">
              6. CONTACT &amp; QUESTIONS
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              For legal inquiries regarding our Terms of Service:
            </p>
            <div className="mt-3 neo-box bg-[#FAF7F0] p-4 inline-block">
              <div className="text-xs font-black uppercase text-black">WhatFlow Legal Team</div>
              <div className="text-xs text-gray-600 font-bold">Email: legal@whatflow.io</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
