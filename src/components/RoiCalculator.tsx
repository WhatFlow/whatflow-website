"use client";

import { useState } from "react";
import Link from "next/link";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export function RoiCalculator() {
  const [monthlyOrders, setMonthlyOrders] = useState(1200);
  const [aov, setAov] = useState(65);
  const [abandonmentRate, setAbandonmentRate] = useState(70);
  const [recoveryRate, setRecoveryRate] = useState(12);

  // Math:
  // Total checkouts = monthlyOrders / (1 - abandonmentRate/100)
  // Abandoned carts = Total checkouts * (abandonmentRate/100)
  // Recovered carts = Abandoned carts * (recoveryRate/100)
  // Recovered revenue = Recovered carts * aov
  const estimatedTotalCheckouts = monthlyOrders / Math.max(0.01, 1 - abandonmentRate / 100);
  const estimatedAbandonedCarts = Math.round(estimatedTotalCheckouts * (abandonmentRate / 100));
  const estimatedRecoveredOrders = Math.round(estimatedAbandonedCarts * (recoveryRate / 100));
  const estimatedRecoveredRevenue = Math.round(estimatedRecoveredOrders * aov);

  // COD & Support automation savings:
  // Avg 15% of total orders require address/COD confirmation. Automation saves 4 mins each.
  const hoursSaved = Math.round((monthlyOrders * 0.18 * 4) / 60);
  const whatflowCostMonthly = 29; // Starter plan base
  const roiMultiple = Math.max(1, Math.round(estimatedRecoveredRevenue / whatflowCostMonthly));

  return (
    <div
      className="neo-box bg-white p-6 sm:p-10 rounded-2xl"
      data-tool-name="shopify_whatsapp_roi_calculator"
      data-tool-description="Calculate estimated monthly recovered checkout revenue and ROI multiple for Shopify stores using WhatsApp automations"
    >
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="neo-box inline-block bg-[#00D261] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-black mb-3">
          ROI &amp; REVENUE ESTIMATOR
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-black uppercase text-black tracking-tight leading-tight">
          HOW MUCH REVENUE IS YOUR STORE LEAVING ON THE TABLE?
        </h2>
        <p className="text-sm font-medium text-gray-600 mt-2">
          Adjust the sliders below to estimate your store’s potential monthly recovery revenue with WhatFlow WhatsApp automations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Monthly Orders */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="monthly-orders-input" className="text-xs font-extrabold uppercase tracking-wider text-black">
                Monthly Completed Orders
              </label>
              <span className="neo-pill bg-[#FAF7F0] border-black px-3 py-1 text-sm font-black text-black">
                {monthlyOrders.toLocaleString()} orders
              </span>
            </div>
            <input
              id="monthly-orders-input"
              name="monthlyOrders"
              aria-label="Monthly Completed Orders"
              type="range"
              min={100}
              max={15000}
              step={100}
              value={monthlyOrders}
              onChange={(e) => setMonthlyOrders(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00D261]"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-bold">
              <span>100</span>
              <span>5,000</span>
              <span>15,000+</span>
            </div>
          </div>

          {/* Average Order Value */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="aov-input" className="text-xs font-extrabold uppercase tracking-wider text-black">
                Average Order Value (AOV)
              </label>
              <span className="neo-pill bg-[#FAF7F0] border-black px-3 py-1 text-sm font-black text-black">
                ${aov}
              </span>
            </div>
            <input
              id="aov-input"
              name="aov"
              aria-label="Average Order Value in USD"
              type="range"
              min={15}
              max={350}
              step={5}
              value={aov}
              onChange={(e) => setAov(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00D261]"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-bold">
              <span>$15</span>
              <span>$150</span>
              <span>$350+</span>
            </div>
          </div>

          {/* Cart Abandonment Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="abandonment-rate-input" className="text-xs font-extrabold uppercase tracking-wider text-black">
                Estimated Cart Abandonment Rate
              </label>
              <span className="neo-pill bg-[#FAF7F0] border-black px-3 py-1 text-sm font-black text-black">
                {abandonmentRate}%
              </span>
            </div>
            <input
              id="abandonment-rate-input"
              name="abandonmentRate"
              aria-label="Estimated Cart Abandonment Rate Percentage"
              type="range"
              min={40}
              max={85}
              step={1}
              value={abandonmentRate}
              onChange={(e) => setAbandonmentRate(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00D261]"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-bold">
              <span>40% (Low)</span>
              <span>70% (E-comm avg)</span>
              <span>85% (High)</span>
            </div>
          </div>

          {/* WhatsApp Recovery Conversion */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="recovery-rate-input" className="text-xs font-extrabold uppercase tracking-wider text-black">
                WhatsApp Recovery Rate
              </label>
              <span className="neo-pill bg-[#E8F8F0] text-[#0A6B56] border-black px-3 py-1 text-sm font-black">
                {recoveryRate}% (vs 2-3% Email)
              </span>
            </div>
            <input
              id="recovery-rate-input"
              name="recoveryRate"
              aria-label="WhatsApp Recovery Rate Percentage"
              type="range"
              min={5}
              max={25}
              step={1}
              value={recoveryRate}
              onChange={(e) => setRecoveryRate(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00D261]"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-bold">
              <span>5% (Conservative)</span>
              <span>12% (WhatFlow Avg)</span>
              <span>25% (Top Performers)</span>
            </div>
          </div>
        </div>

        {/* Results Card Column */}
        <div className="lg:col-span-5">
          <div className="neo-box-teal p-6 sm:p-8 space-y-6 text-center text-white">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#00D261] mb-1">
                ESTIMATED MONTHLY REVENUE RECOVERED
              </div>
              <div className="font-display font-black text-4xl sm:text-5xl text-[#00D261] leading-none tracking-tight">
                ${estimatedRecoveredRevenue.toLocaleString()}
              </div>
              <div className="text-xs text-[#A7F3D0] font-medium mt-1">
                From ~{estimatedRecoveredOrders.toLocaleString()} recovered orders each month
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
              <div className="neo-box bg-[#091E17] p-3 text-center border-white/20">
                <div className="font-display font-black text-2xl text-white">
                  {roiMultiple}x
                </div>
                <div className="text-[9px] font-extrabold uppercase text-[#A7F3D0]">
                  Projected ROI
                </div>
              </div>
              <div className="neo-box bg-[#091E17] p-3 text-center border-white/20">
                <div className="font-display font-black text-2xl text-white">
                  {hoursSaved} hrs
                </div>
                <div className="text-[9px] font-extrabold uppercase text-[#A7F3D0]">
                  Support Time Saved / Mo
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={getShopifyAppUrl("roi_calculator")}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn w-full bg-[#00D261] text-black font-black uppercase text-sm py-3.5 rounded-lg flex items-center justify-center gap-2 shadow-[4px_4px_0px_#000] hover:scale-[1.02] transition-transform"
              >
                <span>START RECOVERING REVENUE</span>
                <span>➔</span>
              </Link>
              <div className="text-[10px] text-gray-400 font-medium mt-2">
                14-day free trial • 5-minute Shopify installation • Zero risk
              </div>
              <div className="text-[9px] text-[#A7F3D0]/70 font-semibold mt-1">
                Pricing model &amp; Meta Cloud rates updated Q1 2026. Based on 70% average cart abandonment rate [2].
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
