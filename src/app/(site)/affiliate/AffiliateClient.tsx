"use client";

import { useState } from "react";
import Image from "next/image";

const SIGNUP_URL = "https://affilitrak.com/register/whatflow-official-api";

const TIERS = [
  {
    tierNum: "1",
    name: "STARTER PARTNER",
    referrals: "0–9",
    referralsSub: "PAID REFERRALS",
    commission: "10%",
    duration: "3 MONTHS",
    durationBadge: "bg-white text-black",
    benefits: "Affiliate link + basic assets",
    highlight: false,
  },
  {
    tierNum: "2",
    name: "GROWTH PARTNER",
    referrals: "10–24",
    referralsSub: "PAID REFERRALS",
    commission: "15%",
    duration: "3 MONTHS",
    durationBadge: "bg-[#E8F8F0] text-[#0A6B56]",
    benefits: "Marketing kit + assets",
    highlight: false,
  },
  {
    tierNum: "3",
    name: "PRO PARTNER",
    referrals: "25–49",
    referralsSub: "PAID REFERRALS",
    commission: "20%",
    duration: "6 MONTHS",
    durationBadge: "bg-[#FFF3CD] text-[#856404]",
    benefits: "Priority support + marketing kit",
    highlight: false,
  },
  {
    tierNum: "4",
    name: "ELITE PARTNER",
    referrals: "50–99",
    referralsSub: "PAID REFERRALS",
    commission: "25%",
    duration: "LIFETIME",
    durationBadge: "bg-[#00D261] text-black",
    benefits: "Dedicated partner manager",
    highlight: false,
  },
  {
    tierNum: "5",
    name: "AGENCY / PREMIER",
    referrals: "100+",
    referralsSub: "PAID REFERRALS",
    commission: "30%–50%",
    commissionNote: "CUSTOM",
    duration: "LIFETIME",
    durationBadge: "bg-black text-[#00D261]",
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
    a: "Yes. Qualified agencies and developers managing multiple Shopify client stores can unlock custom partnership terms with commissions of up to 50%, lifetime payouts, dedicated Slack channels, and co-marketing opportunities.",
  },
];

export function AffiliateClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-black selection:bg-[#00D261] selection:text-black">
      {/* ─── 1. Hero Section ─────────────────────────────────────────────────── */}
      <section className="pt-12 pb-16 sm:pb-20 px-4 sm:px-6 border-b-[2.5px] border-black bg-[#FAF7F0]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="neo-pill bg-[#00D261] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-black">
                WHATFLOW AFFILIATE PLAN
              </div>
              <div className="neo-pill bg-[#FFF3CD] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#856404]">
                PERFORMANCE-BASED REWARDS
              </div>
            </div>

            <h1 className="text-[44px] sm:text-[60px] lg:text-[68px] font-display font-black leading-[1.02] uppercase text-black tracking-tight">
              GROW WITH WHATFLOW.{" "}
              <span className="text-stroke-green block sm:inline">EARN UP TO 50%.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed max-w-xl">
              Recommend WhatFlow to Shopify merchants and earn recurring commissions. Unlock up to 6 months duration on Pro tier and lifetime recurring commissions on Elite and Agency tiers.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn bg-[#00D261] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-[#00be57] transition-colors"
              >
                APPLY TO JOIN ➔
              </a>
              <a
                href="#tiers"
                className="neo-btn bg-white text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                SEE COMMISSION TIERS ↓
              </a>
            </div>

            <div className="text-xs font-bold text-gray-600 pt-2">
              Built for agencies, influencers, educators, creators and high-volume partners.
            </div>
          </div>

          {/* Right Visual Diagram Frame */}
          <div className="lg:col-span-5">
            <div className="neo-box bg-[#00D261] p-6 sm:p-8 rounded-3xl border-[2.5px] border-black shadow-[6px_6px_0px_0px_#000] space-y-6">
              {/* Step 1: Tracked Link */}
              <div className="neo-box bg-white p-4 rounded-xl border-2 border-black flex items-center justify-between shadow-[3px_3px_0px_#000]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00D261] border border-black flex items-center justify-center font-black text-black">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-gray-500 tracking-wider">YOUR TRACKED LINK</div>
                    <div className="text-xs sm:text-sm font-extrabold text-black font-mono">whatflow.tech/aff/yourlink</div>
                  </div>
                </div>
                <span className="neo-pill bg-[#E8F8F0] text-[#0A6B56] text-[10px] font-black px-2 py-0.5 border border-black">
                  ACTIVE
                </span>
              </div>

              {/* Connecting Flow Arrows */}
              <div className="flex justify-around items-center text-black font-black text-xs">
                <span>↓</span>
                <span>↓</span>
                <span>↓</span>
              </div>

              {/* 3 Shopify Merchant Cards */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="neo-box bg-white p-3 rounded-xl border-2 border-black text-center space-y-1.5 shadow-[2px_2px_0px_#000]">
                    <div className="w-8 h-8 mx-auto rounded-full bg-[#E8F8F0] border border-black flex items-center justify-center">
                      <Image
                        src="/shopify-brand-assets/02-glyph/svg/glyph-color.svg"
                        width={16}
                        height={16}
                        alt="Shopify"
                      />
                    </div>
                    <div className="text-[9px] font-black uppercase text-black leading-tight">SHOPIFY STORE</div>
                    <div className="text-[8px] font-bold text-[#00D261]">CONNECTED</div>
                  </div>
                ))}
              </div>

              {/* Connecting Flow Arrow */}
              <div className="text-center font-black text-xs text-black">↓</div>

              {/* Bottom Result Box */}
              <div className="neo-box bg-[#FFC107] p-4 rounded-xl border-2 border-black flex items-center justify-between shadow-[3px_3px_0px_#000]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-black flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 text-black" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-black tracking-wider">PAID REFERRAL</div>
                    <div className="text-xs sm:text-sm font-black uppercase text-black">COMMISSION UNLOCKED</div>
                  </div>
                </div>
                <span className="neo-pill bg-black text-[#00D261] text-[10px] font-black px-2.5 py-1 border border-black">
                  UP TO LIFETIME
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. How It Works: Share. Refer. Earn. ────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black bg-white">
        <div className="max-w-[1280px] mx-auto space-y-10">
          <div className="space-y-3 text-center sm:text-left">
            <div className="neo-pill bg-[#E8F8F0] text-[#0A6B56] px-3.5 py-1 text-xs font-black uppercase tracking-wider inline-block">
              HOW IT WORKS
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-black">
              SHARE. REFER. EARN.
            </h2>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="neo-box bg-[#FAF7F0] p-6 rounded-2xl border-2 border-black flex flex-col justify-between space-y-4 shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-transform">
              <div className="space-y-3">
                <span className="font-display font-black text-3xl text-[#00D261]">01</span>
                <h3 className="font-display font-black text-lg uppercase text-black">
                  JOIN THE PROGRAM
                </h3>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">
                  Apply and receive your custom tracked affiliate link and partner dashboard access in minutes.
                </p>
              </div>
            </div>

            <div className="neo-box bg-[#FAF7F0] p-6 rounded-2xl border-2 border-black flex flex-col justify-between space-y-4 shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-transform">
              <div className="space-y-3">
                <span className="font-display font-black text-3xl text-[#2563EB]">02</span>
                <h3 className="font-display font-black text-lg uppercase text-black">
                  SHARE WHATFLOW
                </h3>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">
                  Recommend WhatFlow to Shopify merchants, eCommerce clients, and your audience with our marketing kit.
                </p>
              </div>
            </div>

            <div className="neo-box bg-[#FAF7F0] p-6 rounded-2xl border-2 border-black flex flex-col justify-between space-y-4 shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-transform">
              <div className="space-y-3">
                <span className="font-display font-black text-3xl text-[#FFC107]">03</span>
                <h3 className="font-display font-black text-lg uppercase text-black">
                  MERCHANT SUBSCRIBES
                </h3>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">
                  The referred store installs WhatFlow, connects their WhatsApp number, and becomes a paying subscriber.
                </p>
              </div>
            </div>

            <div className="neo-box bg-[#FAF7F0] p-6 rounded-2xl border-2 border-black flex flex-col justify-between space-y-4 shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-transform">
              <div className="space-y-3">
                <span className="font-display font-black text-3xl text-[#00D261]">04</span>
                <h3 className="font-display font-black text-lg uppercase text-black">
                  RECURRING PAYOUTS
                </h3>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">
                  Earn recurring monthly commissions (3 months for Starter/Growth, 6 months for Pro, and Lifetime for Elite &amp; Agency).
                </p>
              </div>
            </div>
          </div>

          {/* Guarantee & Minimum Payout Note Box */}
          <div className="neo-box bg-[#FFF3CD] p-4 rounded-xl border-2 border-black text-center shadow-[3px_3px_0px_#000]">
            <span className="text-xs font-black uppercase tracking-wider text-black">
              Minimum payout is $50 or 3 months (whichever happens first), paid on the 1st of each month. Only verified, successfully paid referrals qualify.
            </span>
          </div>
        </div>
      </section>

      {/* ─── 3. Tier Progression ─────────────────────────────────────────────── */}
      <section id="tiers" className="py-16 sm:py-24 px-4 sm:px-6 border-b-[2.5px] border-black bg-[#FAF7F0]">
        <div className="max-w-[1280px] mx-auto space-y-10">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <div className="neo-pill bg-[#00D261] px-4 py-1 text-xs font-black uppercase tracking-wider text-black inline-block">
              TIER PROGRESSION
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-black">
              THE MORE YOU GROW, THE MORE YOU EARN.
            </h2>
            <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
              Your tier is based on lifetime verified paid referrals. Once unlocked, you keep your tier permanently.
            </p>
          </div>

          {/* Tier Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 pt-4 items-stretch">
            {TIERS.map((tier) => (
              <div
                key={tier.tierNum}
                className={`neo-box rounded-2xl border-[2.5px] border-black flex flex-col justify-between p-6 shadow-[4px_4px_0px_#000] hover:-translate-y-1.5 transition-all duration-200 ${tier.highlight ? "bg-[#00D261] text-black" : "bg-white text-black"
                  }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-display font-black text-sm ${tier.highlight ? "bg-black text-[#00D261]" : "bg-[#00D261] text-black"
                        }`}
                    >
                      {tier.tierNum}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                      TIER {tier.tierNum}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-black text-base uppercase leading-tight">
                      {tier.name}
                    </h3>
                    <div className="text-xs font-bold text-gray-700 pt-1">
                      {tier.referrals} {tier.referralsSub}
                    </div>
                  </div>

                  {/* Commission Callout */}
                  <div className="pt-2 border-t border-black/10">
                    <div className="font-display font-black text-3xl sm:text-4xl tracking-tight">
                      {tier.commission}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-gray-600">
                      COMMISSION RATE
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="pt-2">
                    <div className={`neo-pill px-2.5 py-1 text-[10px] font-black uppercase tracking-wider inline-block border border-black shadow-[1px_1px_0px_#000] ${tier.durationBadge}`}>
                      {tier.duration} DURATION
                    </div>
                  </div>
                </div>

                {/* Benefits Footer */}
                <div className="pt-6 border-t border-black/15 mt-6 space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                    BENEFITS
                  </div>
                  <div className="text-xs font-bold leading-snug">
                    ✓ {tier.benefits}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Commission Rules & Duration Matrix ────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black bg-[#091E17] text-white">
        <div className="max-w-[1280px] mx-auto space-y-12">
          <div className="space-y-4 max-w-2xl">
            <div className="neo-pill bg-[#00D261] text-black px-3.5 py-1 text-xs font-black uppercase tracking-wider inline-block">
              TIER PROGRESSION RULES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight leading-tight">
              CLEAR COMMISSIONS. NO GUESSWORK.{" "}
              <span className="text-stroke-green block sm:inline">EARN UP TO LIFETIME PAYOUTS.</span>
            </h2>
          </div>

          {/* 3 Core Rules Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="neo-box bg-white text-black p-6 rounded-2xl border-2 border-black space-y-3 shadow-[4px_4px_0px_#000]">
              <div className="w-10 h-10 rounded-xl bg-[#E8F8F0] border-2 border-black flex items-center justify-center font-black text-base text-[#0A6B56]">
                %
              </div>
              <h3 className="font-display font-black text-lg uppercase text-black">
                CURRENT TIER RATE &amp; DURATION
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                New qualifying referrals earn the commission rate and duration of your active tier at the time of their subscription.
              </p>
            </div>

            <div className="neo-box bg-white text-black p-6 rounded-2xl border-2 border-black space-y-3 shadow-[4px_4px_0px_#000]">
              <div className="w-10 h-10 rounded-xl bg-[#FFEBEB] border-2 border-black flex items-center justify-center font-black text-base text-[#FF4B4B]">
                ✕
              </div>
              <h3 className="font-display font-black text-lg uppercase text-black">
                NO RETROACTIVE UPGRADES
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                Older referrals keep the commission terms applied when they qualified, giving you predictable tracking.
              </p>
            </div>

            <div className="neo-box bg-white text-black p-6 rounded-2xl border-2 border-black space-y-3 shadow-[4px_4px_0px_#000]">
              <div className="w-10 h-10 rounded-xl bg-[#00D261] border-2 border-black flex items-center justify-center font-black text-base text-black">
                ✓
              </div>
              <h3 className="font-display font-black text-lg uppercase text-black">
                SUCCESSFUL PAYMENTS ONLY
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                Commission is earned and unlocked once each monthly subscription payment is successfully collected by Shopify.
              </p>
            </div>
          </div>

          {/* Tiered Duration Breakdown */}
          <div className="neo-box bg-white p-6 sm:p-8 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] space-y-6">
            <div className="flex items-center gap-2">
              <span className="neo-pill bg-[#00D261] text-black text-[10px] font-black uppercase px-3 py-1 border border-black">
                PAYOUT DURATION BY TIER
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="neo-box bg-[#FAF7F0] p-5 rounded-xl border-2 border-black space-y-2 shadow-[2px_2px_0px_#000]">
                <span className="neo-pill bg-[#E8F8F0] text-[#0A6B56] text-[10px] font-black uppercase px-2.5 py-0.5 border border-black inline-block">
                  STARTER &amp; GROWTH
                </span>
                <div className="text-lg sm:text-xl font-display font-black text-black">
                  FIRST 3 PAID MONTHS
                </div>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">
                  10%–15% commission on the merchant's first 3 billing cycles.
                </p>
              </div>

              <div className="neo-box bg-[#FAF7F0] p-5 rounded-xl border-2 border-black space-y-2 shadow-[2px_2px_0px_#000]">
                <span className="neo-pill bg-[#FFF3CD] text-[#856404] text-[10px] font-black uppercase px-2.5 py-0.5 border border-black inline-block">
                  PRO PARTNER
                </span>
                <div className="text-lg sm:text-xl font-display font-black text-[#856404]">
                  FIRST 6 PAID MONTHS
                </div>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">
                  20% commission on the merchant's first 6 billing cycles.
                </p>
              </div>

              <div className="neo-box bg-[#FAF7F0] p-5 rounded-xl border-2 border-black space-y-2 shadow-[2px_2px_0px_#000]">
                <span className="neo-pill bg-[#00D261] text-black text-[10px] font-black uppercase px-2.5 py-0.5 border border-black inline-block">
                  ELITE &amp; AGENCY
                </span>
                <div className="text-lg sm:text-xl font-display font-black text-[#0A6B56]">
                  LIFETIME RECURRING
                </div>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">
                  25%–50% commission for the full lifetime of the store subscription.
                </p>
              </div>
            </div>

            <div className="neo-box bg-[#FAF7F0] p-3.5 rounded-xl border border-black text-center text-xs font-extrabold text-black shadow-[1px_1px_0px_#000]">
              Payout Schedule: Released on the 1st of every month • Minimum payout is $50 or 3 months (whichever happens first).
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. Agency & Strategic Partners Section ──────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black bg-[#FAF7F0]">
        <div className="max-w-[1280px] mx-auto">
          <div className="neo-box bg-[#D5F5E3] p-8 sm:p-12 rounded-3xl border-[2.5px] border-black shadow-[6px_6px_0px_#000] space-y-8">
            <div className="max-w-3xl space-y-3">
              <div className="neo-pill bg-[#0A6B56] text-white px-3.5 py-1 text-xs font-black uppercase tracking-wider inline-block">
                AGENCY &amp; STRATEGIC PARTNERS
              </div>
              <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-black leading-tight">
                MANAGE MULTIPLE SHOPIFY STORES? UNLOCK A CUSTOM PARTNERSHIP.
              </h3>
              <p className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed">
                Agencies and developers managing multiple Shopify client stores qualify for custom partnership terms with commissions of up to 50% and lifetime payouts.
              </p>
            </div>

            {/* 3 Agency Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="neo-box bg-white p-5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] space-y-2">
                <div className="font-display font-black text-base text-[#0A6B56]">CUSTOM TERMS</div>
                <div className="text-sm font-black text-black">COMMISSIONS UP TO 50%</div>
                <p className="text-xs text-gray-600 font-medium">Bespoke tiered commission rates tailored to your store volume and client roster.</p>
              </div>

              <div className="neo-box bg-white p-5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] space-y-2">
                <div className="font-display font-black text-base text-[#0A6B56]">GROWTH &amp; PR</div>
                <div className="text-sm font-black text-black">CO-MARKETING &amp; CASE STUDIES</div>
                <p className="text-xs text-gray-600 font-medium">Joint case studies, newsletter feature placements, and ecosystem co-marketing.</p>
              </div>

              <div className="neo-box bg-white p-5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] space-y-2">
                <div className="font-display font-black text-base text-[#0A6B56]">SUPPORT</div>
                <div className="text-sm font-black text-black">DEDICATED SLACK &amp; MANAGER</div>
                <p className="text-xs text-gray-600 font-medium">Direct engineering escalation channel and dedicated WhatsApp account manager.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn bg-[#00D261] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-[#00be57] transition-colors"
              >
                APPLY AS AN AGENCY ➔
              </a>
              <a
                href="mailto:partners@whatflow.tech?subject=Agency%20Partnership%20Inquiry"
                className="neo-btn bg-white text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                TALK TO OUR TEAM
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Referral Qualification & FAQ ─────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 border-b-[2.5px] border-black bg-white">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Eligibility Rules */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="neo-pill bg-[#00D261] text-black px-3.5 py-1 text-xs font-black uppercase tracking-wider inline-block">
                WHO QUALIFIES
              </div>
              <h2 className="text-3xl font-display font-black uppercase tracking-tight text-black">
                REAL REFERRALS. REAL REWARDS.
              </h2>
            </div>

            {/* Eligible Box */}
            <div className="neo-box bg-[#E8F8F0] p-5 rounded-2xl border-2 border-black space-y-3 shadow-[3px_3px_0px_#000]">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[#0A6B56]">
                <span className="w-5 h-5 rounded-full bg-[#00D261] border border-black flex items-center justify-center text-black font-black text-xs">
                  ✓
                </span>
                <span>AN ELIGIBLE REFERRAL MUST:</span>
              </div>
              <ul className="space-y-2 text-xs font-bold text-gray-800">
                <li>• Come directly through your tracked affiliate link</li>
                <li>• Become a paying WhatFlow customer on Shopify</li>
                <li>• Have payment successfully collected by Shopify Billing</li>
              </ul>
            </div>

            {/* Not Eligible Box */}
            <div className="neo-box bg-[#FFEBEB] p-5 rounded-2xl border-2 border-black space-y-3 shadow-[3px_3px_0px_#000]">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[#FF4B4B]">
                <span className="w-5 h-5 rounded-full bg-[#FF4B4B] border border-black flex items-center justify-center text-white font-black text-xs">
                  ✕
                </span>
                <span>NOT ELIGIBLE:</span>
              </div>
              <ul className="space-y-2 text-xs font-bold text-gray-800">
                <li>• Self-referrals or personal store accounts</li>
                <li>• Fraudulent or deceptive traffic</li>
                <li>• Duplicate, test, or development stores</li>
                <li>• Cancelled or refunded subscriptions</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Accordion FAQ */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-2 pb-2">
              <div className="neo-pill bg-[#FFF3CD] text-[#856404] px-3.5 py-1 text-xs font-black uppercase tracking-wider inline-block">
                FREQUENTLY ASKED QUESTIONS
              </div>
              <h3 className="text-2xl font-display font-black uppercase tracking-tight text-black">
                EVERYTHING YOU NEED TO KNOW.
              </h3>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;

                return (
                  <div
                    key={idx}
                    className="neo-box bg-[#FAF7F0] rounded-xl border-2 border-black overflow-hidden shadow-[3px_3px_0px_#000]"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-display font-black text-sm sm:text-base uppercase text-black hover:bg-white transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span className="text-lg font-black text-black">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm font-medium text-gray-700 leading-relaxed border-t border-black/10 bg-white">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. Bottom CTA Banner ────────────────────────────────────────────── */}
      <section className="bg-[#00D261] py-16 px-4 sm:px-6 border-b-[2.5px] border-black">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-black border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[3px_3px_0px_#fff]">
              <Image
                src="/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_Green_RGB_2026.svg"
                width={32}
                height={32}
                alt="WhatsApp"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-black leading-tight">
                TURN YOUR AUDIENCE INTO A LONG-TERM PARTNERSHIP.
              </h2>
              <p className="text-xs sm:text-sm text-black/80 font-bold">
                Join the WhatFlow Affiliate Program and earn recurring commissions on every merchant you refer.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-black text-[#00D261] font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl hover:bg-gray-900 transition-colors"
            >
              APPLY TO JOIN
            </a>
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-white text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              AFFILIATE LOGIN
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
