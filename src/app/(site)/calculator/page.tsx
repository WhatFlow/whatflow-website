import type { Metadata } from "next";
import { RoiCalculator } from "@/components/RoiCalculator";
import { WhatsAppSimulator } from "@/components/WhatsAppSimulator";

export const metadata: Metadata = {
  title: "WhatsApp ROI & Cart Recovery Calculator | WhatFlow",
  description: "Calculate your Shopify store's potential monthly recovered revenue, support hours saved, and ROI with WhatFlow WhatsApp automations.",
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* ─── Hero ─── */}
      <section className="bg-[#FAF7F0] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-20 text-center">
        <div className="max-w-[1280px] mx-auto">
          <div className="neo-box inline-block bg-[#00D261] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black mb-4">
            FREE INTERACTIVE TOOLS
          </div>
          <h1 className="text-[44px] sm:text-[60px] lg:text-[76px] font-display font-black uppercase text-black tracking-tight leading-none mb-6">
            ESTIMATE YOUR <br />
            <span className="text-stroke-green">RECOVERED REVENUE.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-medium max-w-2xl mx-auto">
            Input your monthly Shopify store orders and average order value to see your projected WhatsApp revenue and time savings.
          </p>
        </div>
      </section>

      {/* ─── ROI Calculator Section ─── */}
      <section className="px-4 sm:px-6 py-16 max-w-[1280px] mx-auto">
        <RoiCalculator />
      </section>

      {/* ─── WhatsApp Simulator Section ─── */}
      <section className="px-4 sm:px-6 pb-20 max-w-[1280px] mx-auto">
        <WhatsAppSimulator />
      </section>
    </div>
  );
}
