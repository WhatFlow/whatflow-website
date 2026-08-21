import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | WhatFlow",
  description: "Privacy Policy for WhatFlow WhatsApp marketing platform for Shopify merchants.",
};

export default function PrivacyPage() {
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
            PRIVACY <span className="text-stroke-green">POLICY.</span>
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
              1. OVERVIEW &amp; SCOPE
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              WhatFlow (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) provides WhatsApp marketing, customer support, and order automation tools for Shopify merchants. This Privacy Policy describes how we collect, process, and protect information when you install and use our Shopify application, connect your Meta WhatsApp Business Account (WABA), and communicate with your store customers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-black uppercase text-black mb-3">
              2. INFORMATION WE COLLECT
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-gray-700">
              <p>
                <strong>Merchant Information:</strong> When you install WhatFlow on Shopify, we receive your store domain, shop owner name, email address, country, currency, and installed apps via standard Shopify OAuth scopes.
              </p>
              <p>
                <strong>Customer &amp; Order Data:</strong> To deliver automated WhatsApp notifications (e.g. order confirmations, shipping updates, abandoned checkout recovery), WhatFlow processes customer phone numbers, first names, order items, and checkout URLs strictly on behalf of the merchant as a Data Processor.
              </p>
              <p>
                <strong>Meta Cloud API Credentials:</strong> When you connect your WhatsApp Business Account via Meta Embedded Signup, we store your WABA ID, Phone Number ID, and encrypted system access tokens required to transmit messages via Meta’s official Graph API.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-display font-black uppercase text-black mb-3">
              3. HOW WE USE DATA
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed text-gray-700">
              <li>Sending transactional and marketing WhatsApp messages initiated by merchant store events.</li>
              <li>Providing real-time delivery status (sent, delivered, read, failed) and analytics.</li>
              <li>Automating two-way conversational replies via WhatFlow Auto-Replier or AI Assistant.</li>
              <li>Calculating WhatsApp Cloud API consumption and billing without storing unnecessary customer personal data.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-display font-black uppercase text-black mb-3">
              4. DATA RETENTION &amp; SECURITY
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              We never sell, rent, or monetize merchant or customer data. All API tokens and credentials are encrypted at rest using industry-standard AES-256 encryption. Message payloads sent to WhatsApp Cloud API are transmitted over TLS 1.3 encrypted connections directly to Meta’s enterprise infrastructure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-black uppercase text-black mb-3">
              5. GDPR &amp; MERCHANT RIGHTS (DATA PROCESSOR AGREEMENT)
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              In accordance with GDPR and CCPA regulations, merchants are the Data Controllers and WhatFlow acts as the Data Processor. Upon app uninstallation or merchant data erasure request via Shopify mandatory GDPR webhooks (<code className="bg-gray-100 px-1 py-0.5 rounded text-xs">customers/redact</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">shop/redact</code>), we automatically delete associated store data within 48 hours.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-black uppercase text-black mb-3">
              6. CONTACT &amp; DATA INQUIRIES
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              If you have any questions regarding this Privacy Policy or wish to exercise data subject rights, please contact our Data Protection team at:
            </p>
            <div className="mt-3 neo-box bg-[#FAF7F0] p-4 inline-block">
              <div className="text-xs font-black uppercase text-black">WhatFlow Privacy Team</div>
              <div className="text-xs text-gray-600 font-bold">Email: privacy@whatflow.io</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
