"use client";

import React, { useId, useState } from "react";
import { Section, SectionHead } from "@/components/site/PageKit";

export function BroadcastWizardShowcase() {
  const campaignNameId = useId();
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <Section tone="dark" className="ib-glow">
      <SectionHead
        center light
        kicker="Inbox-native broadcasts"
        title={<>4-step campaign wizard: <span className="text-[var(--green)]">send in minutes.</span></>}
        sub={<>Launch targeted promotional blasts and newsletters directly from the WhatFlow Inbox. Complete audience segmentation, template variable testing, and scheduled sending.</>}
      />
      <div className="mt-14 space-y-10">

        {/* Stepper Navigation */}
        <div className="max-w-3xl mx-auto space-y-3" data-reveal>
        <div className="grid grid-cols-4 gap-2">
          {[
            { num: 1, title: "1. Setup" },
            { num: 2, title: "2. Template" },
            { num: 3, title: "3. Audience" },
            { num: 4, title: "4. Launch" },
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => setCurrentStep(s.num)}
              aria-current={currentStep === s.num ? "step" : undefined}
              className={`px-3 py-3 rounded-full border text-center transition-[background-color,color,border-color,box-shadow] duration-300 cursor-pointer ${
                currentStep === s.num
                  ? "bg-[var(--green)] text-black border-[var(--green)] font-bold shadow-[0_0_28px_rgba(0,210,97,0.35)]"
                  : currentStep > s.num
                    ? "bg-[var(--green)]/10 text-[var(--green)] border-[var(--green)]/30 font-bold"
                    : "bg-white/[0.04] text-white/65 border-white/10 font-bold hover:text-white"
              }`}
            >
              <div className="text-sm">{s.title}</div>
            </button>
          ))}
        </div>
        <div className="h-1 rounded-full bg-white/10 overflow-hidden" aria-hidden="true">
          <div className="h-full w-full origin-left rounded-full bg-[var(--green)] transition-transform duration-500 ease-out" style={{ transform: `scaleX(${currentStep / 4})` }} />
        </div>
        </div>

        {/* Wizard Box */}
        <div data-reveal style={{ "--d": "90ms" } as React.CSSProperties} className="ib-panel max-w-3xl mx-auto p-6 sm:p-10 space-y-6">
          {currentStep === 1 && (
            <div className="ib-swap space-y-4">
              <h3 className="text-2xl font-display font-bold tracking-[-0.03em] text-white">
                Step 1: Campaign configuration
              </h3>
              <div className="space-y-2">
                <label htmlFor={campaignNameId} className="text-xs font-bold text-white/65">Campaign name</label>
                <input
                  id={campaignNameId}
                  type="text"
                  defaultValue="Summer Solstice VIP Drop 2026"
                  className="w-full p-3 rounded-full px-4 bg-black/25 border border-white/40 text-base sm:text-sm text-white"
                />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-white/65">Dispatch mode</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-black/25 border border-[var(--green)] text-[var(--green)] font-bold">
                    Instant send (anti-ban paced)
                  </div>
                  <div className="p-3 rounded-xl bg-black/25 border border-white/10 text-white/65">
                    Schedule for later
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="ib-swap space-y-4">
              <h3 className="text-2xl font-display font-bold tracking-[-0.03em] text-white">
                Step 2: Template &amp; variable mapping
              </h3>
              <div className="p-4 bg-black/25 rounded-xl border border-white/10 space-y-2 text-xs">
                <div className="flex flex-wrap justify-between gap-x-3">
                  <span className="font-bold text-white">Template: vip_flash_sale_v2</span>
                  <span className="text-[var(--green)] font-mono">Status: approved</span>
                </div>
                <div className="text-white/65 font-mono text-[11px]">
                  &quot;Hi {'{{1}}'}, your private 20% discount code {'{{2}}'} is active!&quot;
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-black/25 rounded-xl border border-white/10">
                  <span className="text-white/65 text-[10px] block">Map variable {'{{1}}'}</span>
                  <strong className="text-white">Shopify customer first name</strong>
                </div>
                <div className="p-3 bg-black/25 rounded-xl border border-white/10">
                  <span className="text-white/65 text-[10px] block">Map variable {'{{2}}'}</span>
                  <strong className="text-white">Dynamic coupon (SUMMER20)</strong>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="ib-swap space-y-4">
              <h3 className="text-2xl font-display font-bold tracking-[-0.03em] text-white">
                Step 3: Audience selection
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-black/25 border border-[var(--green)] space-y-1">
                  <strong className="text-[var(--green)] block">Option A: Shopify tags</strong>
                  <p className="text-white/65 text-[11px]">
                    Filter by &quot;VIP-Tier&quot; (4,820 customers selected)
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-black/25 border border-white/10 space-y-1">
                  <strong className="text-white block">Option B: CSV upload</strong>
                  <p className="text-white/65 text-[11px]">
                    Upload custom spreadsheet with phone numbers
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="ib-swap space-y-4">
              <h3 className="text-2xl font-display font-bold tracking-[-0.03em] text-white">
                Step 4: Test send &amp; final launch
              </h3>
              <div className="p-4 bg-black/25 rounded-xl border border-white/10 space-y-2 text-xs">
                <div className="flex flex-wrap justify-between gap-x-3 text-white/75">
                  <span>Recipients:</span>
                  <span className="font-bold text-white">4,820 opted-in buyers</span>
                </div>
                <div className="flex flex-wrap justify-between gap-x-3 text-white/75">
                  <span>Estimated time:</span>
                  <span className="font-bold text-[var(--green)]">1m 45s (anti-ban paced)</span>
                </div>
                <div className="flex flex-wrap justify-between gap-x-3 text-white/75">
                  <span>Estimated Meta cost:</span>
                  <span className="font-bold text-white">Direct Meta API rate ($0 markup)</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert("Broadcast launched successfully!")}
                className="w-full py-3.5 rounded-full bg-[var(--green)] text-black font-bold text-sm hover:bg-[var(--green-pressed)] transition-colors cursor-pointer shadow-[0_0_20px_rgba(0,210,97,0.3)]"
              >
                Launch broadcast campaign
              </button>
            </div>
          )}

          <div className="flex flex-wrap justify-between gap-2 pt-4 border-t border-white/10 text-xs">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((p) => p - 1)}
              className="min-h-11 whitespace-nowrap px-3 sm:px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300 text-white/75 disabled:opacity-30 cursor-pointer"
            >
              Previous step
            </button>
            <button
              type="button"
              disabled={currentStep === 4}
              onClick={() => setCurrentStep((p) => p + 1)}
              className="min-h-11 whitespace-nowrap px-3 sm:px-5 py-2.5 rounded-full bg-[var(--green)] text-black font-bold transition-colors duration-300 hover:bg-[var(--green-pressed)] disabled:opacity-30 cursor-pointer"
            >
              Next step
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
