"use client";

import { useState, type CSSProperties } from "react";
import { Hl, PageHero, Section, SectionHead } from "@/components/site/PageKit";
import Image from "next/image";

const SIGNUP_URL = "https://affilitrak.com/register/whatflow-official-api";

const TIERS = [
  {
    tierNum: "1",
    name: "Starter partner",
    referrals: "0–9",
    referralsSub: "paid referrals",
    commission: "10%",
    duration: "3 months",
    durationTone: "#fff",
    benefits: "Affiliate link + basic assets",
    highlight: false,
  },
  {
    tierNum: "2",
    name: "Growth partner",
    referrals: "10–24",
    referralsSub: "paid referrals",
    commission: "15%",
    duration: "3 months",
    durationTone: "var(--mint)",
    benefits: "Marketing kit + assets",
    highlight: false,
  },
  {
    tierNum: "3",
    name: "Pro partner",
    referrals: "25–49",
    referralsSub: "paid referrals",
    commission: "20%",
    duration: "6 months",
    durationTone: "#fff3c4",
    benefits: "Priority support + marketing kit",
    highlight: false,
  },
  {
    tierNum: "4",
    name: "Elite partner",
    referrals: "50–99",
    referralsSub: "paid referrals",
    commission: "25%",
    duration: "Lifetime",
    durationTone: "var(--green)",
    benefits: "Dedicated partner manager",
    highlight: false,
  },
  {
    tierNum: "5",
    name: "Agency / premier",
    referrals: "100+",
    referralsSub: "paid referrals",
    commission: "30%–50%",
    commissionNote: "Custom",
    duration: "Lifetime",
    durationTone: "var(--green)",
    benefits: "Custom terms + co-marketing",
    highlight: true,
  },
];

const FAQS = [
  {
    q: "How long do I earn commission on each referral?",
    a: "Commission duration scales with your tier: Starter and Growth partners earn for the first 3 paid months, Pro partners earn for 6 paid months, and Elite & Agency partners earn lifetime recurring commissions as long as the merchant remains subscribed.",
  },
  {
    q: "How are tiers calculated?",
    a: "Tier progression is based on lifetime verified paid referrals. Once you unlock a tier by reaching its referral threshold, you keep that tier permanently.",
  },
  {
    q: "Do I lose a tier after unlocking it?",
    a: "No. Once you unlock a tier, your tier status remains permanent for your account. You will never be downgraded to a lower commission rate or shorter duration.",
  },
  {
    q: "How do lifetime commissions work for Elite and Agency partners?",
    a: "Once you reach the Elite Partner tier (50+ paid referrals) or Agency tier (100+ paid referrals), every subsequent eligible referral pays you recurring commissions for the entire lifetime of the merchant's subscription.",
  },
  {
    q: "What is the minimum payout threshold and payment schedule?",
    a: "Payouts are processed on the 1st of each month. The minimum payout threshold is $50 or 3 months of accrued earnings (whichever happens first).",
  },
  {
    q: "Can agencies receive custom partnership terms?",
    a: "Yes. Qualified agencies and developers managing multiple Shopify client stores qualify for custom partnership terms with commissions of up to 50%, lifetime payouts, dedicated Slack channels, and co-marketing opportunities.",
  },
];

const STEPS = [
  { num: "01", title: "Join the program", body: "Apply and receive your custom tracked affiliate link and partner dashboard access in minutes.", tone: "var(--mint)" },
  { num: "02", title: "Share WhatFlow", body: "Recommend WhatFlow to Shopify merchants, eCommerce clients, and your audience with our marketing kit.", tone: "var(--sky)" },
  { num: "03", title: "Merchant subscribes", body: "The referred store installs WhatFlow, connects their WhatsApp number, and becomes a paying subscriber.", tone: "#fff3c4" },
  { num: "04", title: "Recurring payouts", body: "Earn recurring monthly commissions (3 months for Starter/Growth, 6 months for Pro, and lifetime for Elite & Agency).", tone: "var(--pink)" },
];

const RULES = [
  { title: "Current tier rate & duration", body: "New qualifying referrals earn the commission rate and duration of your active tier at the time of their subscription." },
  { title: "No retroactive upgrades", body: "Older referrals keep the commission terms applied when they qualified, giving you predictable tracking." },
  { title: "Successful payments only", body: "Commission is earned and unlocked once each monthly subscription payment is successfully collected by Shopify." },
];

const DURATIONS = [
  { tag: "Starter & Growth", tagTone: "var(--mint)", title: "First 3 paid months", body: "10%–15% commission on the merchant's first 3 billing cycles." },
  { tag: "Pro partner", tagTone: "#fff3c4", title: "First 6 paid months", body: "20% commission on the merchant's first 6 billing cycles." },
  { tag: "Elite & Agency", tagTone: "var(--green)", title: "Lifetime recurring", body: "25%–50% commission for the full lifetime of the store subscription." },
];

const AGENCY_PERKS = [
  { title: "Commissions up to 50%", body: "Bespoke tiered commission rates tailored to your store volume and client roster." },
  { title: "Co-marketing & case studies", body: "Joint case studies, newsletter feature placements, and ecosystem co-marketing." },
  { title: "Dedicated Slack & manager", body: "Direct engineering escalation channel and dedicated WhatsApp account manager." },
];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function AffiliateClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="bg-[var(--paper)] text-[var(--ink)] selection:bg-[var(--green)] selection:text-black">
      {/* ─── Hero ─── */}
      <PageHero
        title="Grow with WhatFlow. Earn up to 50%."
        accent={["50%"]}
        sub={
          <p>
            Recommend WhatFlow to Shopify merchants and earn recurring commissions. Earn for up to 6 months on the Pro tier and lifetime recurring commissions on Elite and Agency tiers.
          </p>
        }
        actions={
          <>
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="wf-btn wf-btn-green">
              Apply to join
            </a>
            <a href="#tiers" className="wf-btn wf-btn-ghost">
              See commission tiers
            </a>
          </>
        }
        meta={
          <>
            <span>Built for agencies, influencers, educators, creators and high-volume partners.</span>
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-[var(--green)] decoration-2 underline-offset-4">
              Affiliate login
            </a>
          </>
        }
      >
        <div className="af-flow" aria-hidden="true">
          <div className="af-node">
            <div className="flex items-center gap-3">
              <span className="af-node-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </span>
              <span>
                <small>Your tracked link</small>
                <b className="font-mono">whatflow.io/aff/yourlink</b>
              </span>
            </div>
            <span className="wf-pill" style={{ background: "var(--mint)" }}>Active</span>
          </div>

          <div className="af-arrow"><span>↓</span><span>↓</span><span>↓</span></div>

          <div className="af-stores">
            {[1, 2, 3].map((i) => (
              <div key={i} className="af-store">
                <i>
                  <Image src="/shopify-brand-assets/02-glyph/svg/glyph-color.svg" width={16} height={16} alt="Shopify" />
                </i>
                <span>Shopify store</span>
                <em>Connected</em>
              </div>
            ))}
          </div>

          <div className="af-arrow"><span>↓</span></div>

          <div className="af-node af-node-yellow">
            <div className="flex items-center gap-3">
              <span className="af-node-icon">
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </span>
              <span>
                <small>Paid referral</small>
                <b>Commission unlocked</b>
              </span>
            </div>
            <span className="wf-pill" style={{ background: "var(--ink)", color: "var(--green)" }}>Up to lifetime</span>
          </div>
        </div>
      </PageHero>

      {/* ─── How it works ─── */}
      <Section tone="white" label="af-how-title">
        <SectionHead id="af-how-title" title={<>Share. Refer. <Hl>Earn.</Hl></>} />
        <div className="wf-grid wf-grid-4 mt-12">
          {STEPS.map((step, index) => (
            <div key={step.num} className="wf-card" data-hover data-reveal style={{ background: step.tone, ...delay(index * 80) }}>
              <span className="af-step-num">{step.num}</span>
              <h3 className="mt-6">{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
        <p className="wf-card mt-6 text-center text-[15px] font-bold" data-reveal style={{ background: "#fff3c4", borderRadius: 999, padding: "16px 24px" }}>
          Minimum payout is $50 or 3 months (whichever happens first), paid on the 1st of each month. Only verified, successfully paid referrals qualify.
        </p>
      </Section>

      {/* ─── Tier progression ─── */}
      <Section tone="paper" id="tiers" label="af-tiers-title">
        <SectionHead
          id="af-tiers-title"
          center
          title={<>The more you grow, <Hl>the more you earn.</Hl></>}
          sub="Your tier is based on lifetime verified paid referrals. Once unlocked, you keep your tier permanently."
        />
        <div className="af-tiers">
          {TIERS.map((tier, index) => (
            <div key={tier.tierNum} className="wf-card af-tier" data-hover data-highlight={tier.highlight} data-reveal style={delay(index * 70)}>
              <span className="af-tier-num">{tier.tierNum}</span>
              <h3 className="mt-5">{tier.name}</h3>
              <div className="af-muted mt-1">{tier.referrals} {tier.referralsSub}</div>
              <div className="af-tier-rate">{tier.commission}</div>
              <div className="af-muted mt-1">
                Commission rate{tier.commissionNote ? `, ${tier.commissionNote.toLowerCase()}` : ""}
              </div>
              <span className="wf-pill mt-4 self-start" style={{ background: tier.durationTone, color: "var(--ink)" }}>
                {tier.duration} duration
              </span>
              <div className="af-tier-benefit mt-6">
                <span className="af-muted block mb-1">Benefits</span>
                {tier.benefits}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Rules and durations ─── */}
      <Section tone="dark" label="af-rules-title">
        <SectionHead
          id="af-rules-title"
          light
          title={<>Clear commissions. No guesswork. Earn up to lifetime payouts.</>}
        />
        <div className="wf-grid wf-grid-3 mt-12 text-[var(--ink)]">
          {RULES.map((rule, index) => (
            <div key={rule.title} className="wf-card" data-reveal style={delay(index * 80)}>
              <h3>{rule.title}</h3>
              <p>{rule.body}</p>
            </div>
          ))}
        </div>

        <div className="wf-card mt-6 text-[var(--ink)]" data-reveal style={{ padding: "clamp(22px, 3vw, 36px)" }}>
          <h3>Payout duration by tier</h3>
          <div className="wf-grid wf-grid-3 mt-6">
            {DURATIONS.map((item) => (
              <div key={item.tag} className="rounded-[20px] border-2 border-[var(--ink)] bg-[var(--paper)] p-5">
                <span className="wf-pill" style={{ background: item.tagTone }}>{item.tag}</span>
                <div className="mt-3 font-[family-name:var(--display)] text-2xl font-bold tracking-tight">{item.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-full border-2 border-[var(--ink)] bg-[var(--mint)] px-5 py-3 text-center text-sm font-bold">
            Payout schedule: released on the 1st of every month. Minimum payout is $50 or 3 months (whichever happens first).
          </p>
        </div>
      </Section>

      {/* ─── Agency partners ─── */}
      <Section tone="paper" label="af-agency-title">
        <div className="wf-card" data-reveal style={{ background: "var(--mint)", padding: "clamp(24px, 5vw, 56px)", borderRadius: 32, boxShadow: "8px 8px 0 var(--ink)" }}>
          <SectionHead
            id="af-agency-title"
            title={<>Manage multiple Shopify stores? <Hl>Get a custom partnership.</Hl></>}
            sub="Agencies and developers managing multiple Shopify client stores qualify for custom partnership terms with commissions of up to 50% and lifetime payouts."
          />
          <div className="wf-grid wf-grid-3 mt-10">
            {AGENCY_PERKS.map((perk, index) => (
              <div key={perk.title} className="border-t-2 border-[var(--ink)] pt-5" data-reveal style={delay(index * 80)}>
                <h3>{perk.title}</h3>
                <p>{perk.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="wf-btn wf-btn-green">
              Apply as an agency
            </a>
            <a href="mailto:partners@whatflow.tech?subject=Agency%20Partnership%20Inquiry" className="wf-btn wf-btn-ghost">
              Talk to our team
            </a>
          </div>
        </div>
      </Section>

      {/* ─── Qualification and FAQ ─── */}
      <Section tone="white" label="af-faq-title">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead title={<>Real referrals. <Hl>Real rewards.</Hl></>} />
            <div className="wf-card mt-8" data-reveal style={{ background: "var(--mint)" }}>
              <h3 className="!text-lg">
                An eligible referral must:
              </h3>
              <ul className="mt-4 grid list-disc gap-2 pl-5 text-[15px]">
                <li>Come directly through your tracked affiliate link</li>
                <li>Become a paying WhatFlow customer on Shopify</li>
                <li>Have payment successfully collected by Shopify Billing</li>
              </ul>
            </div>
            <div className="wf-card mt-4" data-reveal style={{ background: "var(--pink)", ...delay(80) }}>
              <h3 className="!text-lg">
                Not eligible:
              </h3>
              <ul className="mt-4 grid list-disc gap-2 pl-5 text-[15px]">
                <li>Self-referrals or personal store accounts</li>
                <li>Fraudulent or deceptive traffic</li>
                <li>Duplicate, test, or development stores</li>
                <li>Cancelled or refunded subscriptions</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionHead id="af-faq-title" as="h3" title="Everything you need to know." />
            <div className="mt-8 grid gap-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.q} className="af-faq" data-open={isOpen} data-reveal style={delay(idx * 50)}>
                    <button type="button" onClick={() => toggleFaq(idx)} aria-expanded={isOpen} aria-controls={`af-faq-${idx}`}>
                      <span>{faq.q}</span>
                      <span className="af-faq-icon" aria-hidden="true">+</span>
                    </button>
                    <div id={`af-faq-${idx}`} className="af-faq-panel" inert={!isOpen}>
                      <div><p>{faq.a}</p></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
