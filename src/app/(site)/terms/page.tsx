import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms of Service | WhatFlow",
  description: "Terms of Service and Subscription Agreement for WhatFlow Shopify merchants.",
};

export default function TermsPage() {
  const lastUpdated = "August 20, 2026";

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <div className="wf-shell wf-document">
        <header className="wf-document-header"><h1>Terms of service</h1><p>Last updated {lastUpdated}</p></header>
        <nav aria-label="On this page" className="wf-document-toc"><h2>On this page</h2><ol>
            <li><a href="#section-1">1. Acceptance of terms</a></li>
            <li><a href="#section-2">2. WhatsApp Business &amp; Meta Cloud API policy</a></li>
            <li><a href="#section-3">3. Billing, pricing &amp; Meta conversation rates</a></li>
            <li><a href="#section-4">4. Service level agreement &amp; uptime</a></li>
            <li><a href="#section-5">5. Limitation of liability</a></li>
            <li><a href="#section-6">6. Contact &amp; questions</a></li>
        </ol></nav>
        <article className="wf-prose">
            <h2 id="section-1">1. Acceptance of terms</h2>
            <p>
              By installing, accessing, or using the WhatFlow Shopify application or website (whatflow.io), you agree to be bound by these Terms of Service. If you are entering into these terms on behalf of a company or entity, you represent that you have the authority to bind such entity to these terms.
            </p>

            <h2 id="section-2">2. WhatsApp Business &amp; Meta Cloud API policy</h2>
            <p>
              WhatFlow utilizes official Meta WhatsApp Cloud APIs. Merchants using WhatFlow must comply at all times with:
            </p>
            <ul>
              <li>Meta WhatsApp Business Policy and WhatsApp Commerce Policy.</li>
              <li>Obtaining proper customer opt-in consent before sending marketing or re-engagement templates.</li>
              <li>Honoring opt-out keywords (e.g. &quot;STOP&quot;, &quot;UNSUBSCRIBE&quot;) sent by customers immediately.</li>
            </ul>

            <h2 id="section-3">3. Billing, pricing &amp; Meta conversation rates</h2>
            <p>
              WhatFlow plans are billed directly through Shopify App Billing on a 30-day recurring cycle. In addition to WhatFlow software subscription fees, WhatsApp conversation fees charged by Meta Cloud API are billed transparently with zero markup from WhatFlow. You can view official country-by-country Meta rates directly on our Pricing page.
            </p>

            <h2 id="section-4">4. Service level agreement &amp; uptime</h2>
            <p>
              We strive to maintain a 99.9% application uptime SLA. WhatFlow leverages globally distributed edge architecture on Cloudflare and resilient queuing to ensure real-time message delivery even during Black Friday / Cyber Monday peak volume.
            </p>

            <h2 id="section-5">5. Limitation of liability</h2>
            <p>
              In no event shall WhatFlow, its founders, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages resulting from WhatsApp account bans, carrier deliverability issues, or third-party outages outside of our direct software control.
            </p>

            <h2 id="section-6">6. Contact &amp; questions</h2>
            <p>For legal inquiries regarding our Terms of Service:</p>
            <div className="wf-card not-prose mt-4 inline-flex" style={{ padding: "18px 22px", background: "var(--mint)" }}>
              <strong className="font-[family-name:var(--display)] text-lg">WhatFlow legal team</strong>
              <span className="text-[15px]">Email: legal@whatflow.tech</span>
            </div>
          </article>
      </div>
    </div>
  );
}
