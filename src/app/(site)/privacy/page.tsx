import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy | WhatFlow",
  description: "Privacy Policy for WhatFlow WhatsApp marketing platform for Shopify merchants.",
};

export default function PrivacyPage() {
  const lastUpdated = "August 20, 2026";

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <div className="wf-shell wf-document">
        <header className="wf-document-header"><h1>Privacy policy</h1><p>Last updated {lastUpdated}</p></header>
        <nav aria-label="On this page" className="wf-document-toc"><h2>On this page</h2><ol>
            <li><a href="#section-1">1. Overview &amp; scope</a></li>
            <li><a href="#section-2">2. Information we collect</a></li>
            <li><a href="#section-3">3. How we use data</a></li>
            <li><a href="#section-4">4. Data retention &amp; security</a></li>
            <li><a href="#section-5">5. GDPR &amp; merchant rights (data processor agreement)</a></li>
            <li><a href="#section-6">6. Contact &amp; data inquiries</a></li>
        </ol></nav>
        <article className="wf-prose">
          <div>
            <h2 id="section-1">1. Overview &amp; scope</h2>
            <p>
              WhatFlow (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) provides WhatsApp marketing, customer support, and order automation tools for Shopify merchants. This Privacy Policy describes how we collect, process, and protect information when you install and use our Shopify application, connect your Meta WhatsApp Business Account (WABA), and communicate with your store customers.
            </p>
          </div>

          <div>
            <h2 id="section-2">2. Information we collect</h2>
            <div>
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
            <h2 id="section-3">3. How we use data</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed text-gray-700">
              <li>Sending transactional and marketing WhatsApp messages initiated by merchant store events.</li>
              <li>Providing real-time delivery status (sent, delivered, read, failed) and analytics.</li>
              <li>Supporting two-way customer conversations through the team inbox and configured auto-replies.</li>
              <li>Calculating WhatsApp Cloud API consumption and billing without storing unnecessary customer personal data.</li>
            </ul>
          </div>

          <div>
            <h2 id="section-4">4. Data retention &amp; security</h2>
            <p>
              We never sell, rent, or monetize merchant or customer data. All API tokens and credentials are encrypted at rest using industry-standard AES-256 encryption. Message payloads sent to WhatsApp Cloud API are transmitted over TLS 1.3 encrypted connections directly to Meta’s enterprise infrastructure.
            </p>
          </div>

          <div>
            <h2 id="section-5">5. GDPR &amp; merchant rights (data processor agreement)</h2>
            <p>
              In accordance with GDPR and CCPA regulations, merchants are the Data Controllers and WhatFlow acts as the Data Processor. Upon app uninstallation or merchant data erasure request via Shopify mandatory GDPR webhooks (<code className="bg-gray-100 px-1 py-0.5 rounded text-xs">customers/redact</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">shop/redact</code>), we automatically delete associated store data within 48 hours.
            </p>
          </div>

          <div>
            <h2 id="section-6">6. Contact &amp; data inquiries</h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to exercise data subject rights, please contact our Data Protection team at:
            </p>
            <div className="mt-3 neo-box bg-[var(--paper)] p-4 inline-block">
              <div className="text-xs font-bold text-black">WhatFlow privacy team</div>
              <div className="text-xs text-gray-600 font-bold">Email: privacy@whatflow.tech</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
