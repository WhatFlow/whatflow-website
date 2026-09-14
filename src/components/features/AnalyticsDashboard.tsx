"use client";

import React, { useState } from "react";
import { getShopifyAppUrl } from "@/lib/shopify-app";

type AnalyticsTab = "overview" | "templates" | "messaging" | "conversations" | "pricing" | "recovery";

export function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>("overview");

  return (
    <section id="analytics" className="py-20 px-4 sm:px-6 bg-[#FAF7F0] border-b-[2.5px] border-black">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="neo-pill bg-[#2563EB] text-white px-4 py-1 text-xs font-black uppercase tracking-wider inline-block">
            DATA-DRIVEN INSIGHTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-black">
            6-TAB DEEP ANALYTICS: <span className="text-stroke-green">TRACK EVERY PENNY.</span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg font-medium">
            Monitor real-time delivery rates, template conversion scores, conversation categories,
            and total dollars recovered from abandoned checkouts.
          </p>
        </div>

        {/* 6 Tabs Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {[
            { id: "overview", label: "1. Overview", icon: "📊" },
            { id: "templates", label: "2. Template Performance", icon: "📑" },
            { id: "messaging", label: "3. Messaging Funnel", icon: "📨" },
            { id: "conversations", label: "4. Conversations", icon: "💬" },
            { id: "pricing", label: "5. Meta Pricing ($0 Markup)", icon: "💰" },
            { id: "recovery", label: "6. Revenue Recovery", icon: "🎯" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AnalyticsTab)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#091E17] text-[#00D261] border-2 border-black shadow-[3px_3px_0px_#000] scale-105"
                    : "bg-white text-gray-700 border-2 border-black/30 hover:border-black hover:bg-gray-100"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mock Analytics Dashboard Card */}
        <div className="neo-box bg-white p-6 sm:p-10 rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000] space-y-8">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-black/10 gap-3">
            <div>
              <div className="text-xs font-mono text-gray-500 uppercase">Shopify Store: Lumiere Global</div>
              <div className="text-xl sm:text-2xl font-display font-black uppercase text-black">
                {activeTab === "overview" && "Executive Store Performance Dashboard"}
                {activeTab === "templates" && "Meta Template Approval & Conversion Ranking"}
                {activeTab === "messaging" && "End-to-End Delivery & Open Funnel"}
                {activeTab === "conversations" && "User vs. Business-Initiated Sessions"}
                {activeTab === "pricing" && "Transparent Meta Cloud API Cost Breakdown"}
                {activeTab === "recovery" && "Abandoned Checkout ROI & Recovered Revenue"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-[#FAF7F0] border border-black/20 px-3 py-1.5 rounded-lg">
                Last 30 Days 📅
              </span>
            </div>
          </div>

          {/* Dynamic Content based on Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-[#FAF7F0] rounded-2xl border border-black/10">
                <div className="text-xs font-extrabold uppercase text-gray-500">Total Revenue Recovered</div>
                <div className="text-3xl sm:text-4xl font-display font-black text-[#0A6B56] my-1">$48,920</div>
                <div className="text-[11px] font-bold text-green-700">▲ 24% vs last month</div>
              </div>
              <div className="p-5 bg-[#FAF7F0] rounded-2xl border border-black/10">
                <div className="text-xs font-extrabold uppercase text-gray-500">Messages Sent</div>
                <div className="text-3xl sm:text-4xl font-display font-black text-black my-1">64,280</div>
                <div className="text-[11px] font-bold text-gray-600">98.4% Delivered</div>
              </div>
              <div className="p-5 bg-[#FAF7F0] rounded-2xl border border-black/10">
                <div className="text-xs font-extrabold uppercase text-gray-500">Average Open Rate</div>
                <div className="text-3xl sm:text-4xl font-display font-black text-[#00D261] my-1">98.2%</div>
                <div className="text-[11px] font-bold text-gray-600">Read in &lt;3 minutes</div>
              </div>
              <div className="p-5 bg-[#FAF7F0] rounded-2xl border border-black/10">
                <div className="text-xs font-extrabold uppercase text-gray-500">Estimated ROI Multiple</div>
                <div className="text-3xl sm:text-4xl font-display font-black text-[#FFC107] my-1">16.4x</div>
                <div className="text-[11px] font-bold text-black">$16.40 return per $1 spent</div>
              </div>
            </div>
          )}

          {activeTab === "templates" && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F0] border-b border-black/15 font-black uppercase text-gray-700">
                    <tr>
                      <th className="p-3">Template Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Sent Count</th>
                      <th className="p-3">Read Rate</th>
                      <th className="p-3">Button CTR</th>
                      <th className="p-3">Meta Quality</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 font-medium">
                    <tr>
                      <td className="p-3 font-bold text-black">order_confirmation_v2</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">UTILITY</span></td>
                      <td className="p-3 font-mono">18,450</td>
                      <td className="p-3 font-mono text-green-600">99.1%</td>
                      <td className="p-3 font-mono text-[#0A6B56] font-bold">42.8%</td>
                      <td className="p-3"><span className="text-green-600 font-bold">● High (Green)</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-black">abandoned_checkout_stage1</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">MARKETING</span></td>
                      <td className="p-3 font-mono">12,180</td>
                      <td className="p-3 font-mono text-green-600">97.4%</td>
                      <td className="p-3 font-mono text-[#0A6B56] font-bold">28.4%</td>
                      <td className="p-3"><span className="text-green-600 font-bold">● High (Green)</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-black">shipping_out_for_delivery</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">UTILITY</span></td>
                      <td className="p-3 font-mono">16,210</td>
                      <td className="p-3 font-mono text-green-600">98.9%</td>
                      <td className="p-3 font-mono text-[#0A6B56] font-bold">54.1%</td>
                      <td className="p-3"><span className="text-green-600 font-bold">● High (Green)</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "messaging" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="text-xs text-gray-500 font-bold">1. Messages Queued</div>
                <div className="text-2xl font-black font-display text-black">64,280</div>
                <div className="text-[10px] text-gray-500">100% Dispatch Queue</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-xs text-blue-600 font-bold">2. Successfully Sent</div>
                <div className="text-2xl font-black font-display text-blue-800">63,940</div>
                <div className="text-[10px] text-blue-700">99.4% Meta Handover</div>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-xs text-emerald-600 font-bold">3. Confirmed Delivered</div>
                <div className="text-2xl font-black font-display text-emerald-800">63,220</div>
                <div className="text-[10px] text-emerald-700">Double Grey Checks</div>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="text-xs text-green-600 font-bold">4. Confirmed Read</div>
                <div className="text-2xl font-black font-display text-green-800">61,840</div>
                <div className="text-[10px] text-green-700">Double Blue Checks</div>
              </div>
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="p-6 bg-[#FAF7F0] rounded-2xl border border-black/15 space-y-4">
              <div className="flex items-center gap-3">
                <span className="neo-pill bg-[#00D261] text-black px-3 py-1 text-xs font-black">
                  OFFICIAL META DIRECT RATES
                </span>
                <span className="text-xs text-gray-600 font-bold">Zero Markup Promise</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-800 font-medium">
                Unlike competitors who add 20% to 100% surcharges per message, WhatFlow charges <strong>$0 extra per conversation</strong>. All Meta charges are billed directly by Meta via your own payment method inside Meta Business Manager.
              </p>
              <div className="grid grid-cols-3 gap-3 text-xs pt-2">
                <div className="p-3 bg-white rounded border border-gray-200 text-center">
                  <div className="text-gray-500 font-bold">UTILITY CONVERSATIONS</div>
                  <div className="text-lg font-black text-black">Direct Meta Rate</div>
                </div>
                <div className="p-3 bg-white rounded border border-gray-200 text-center">
                  <div className="text-gray-500 font-bold">MARKETING CONVERSATIONS</div>
                  <div className="text-lg font-black text-black">Direct Meta Rate</div>
                </div>
                <div className="p-3 bg-white rounded border border-gray-200 text-center">
                  <div className="text-gray-500 font-bold">WHATFLOW MARKUP</div>
                  <div className="text-lg font-black text-[#00D261]">$0.00 / message</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "conversations" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-[#FAF7F0] rounded-2xl border border-black/10 space-y-2">
                <div className="text-xs font-black uppercase text-[#0A6B56]">Business-Initiated (78%)</div>
                <div className="text-2xl font-black font-display text-black">50,140 Sessions</div>
                <p className="text-xs text-gray-600">
                  Automated order confirmations, fulfillment alerts, and scheduled broadcast campaigns.
                </p>
              </div>
              <div className="p-5 bg-[#FAF7F0] rounded-2xl border border-black/10 space-y-2">
                <div className="text-xs font-black uppercase text-[#2563EB]">User-Initiated / Service (22%)</div>
                <div className="text-2xl font-black font-display text-black">14,140 Sessions</div>
                <p className="text-xs text-gray-600">
                  Customer support inquiries, chat button inquiries, and pre-purchase sizing questions.
                </p>
              </div>
            </div>
          )}

          {activeTab === "recovery" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="text-xs text-emerald-700 font-bold">Abandoned Carts Recovered</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-900">412 Orders</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="text-xs text-blue-700 font-bold">Draft Invoices Paid</div>
                  <div className="text-2xl sm:text-3xl font-black text-blue-900">$18,400</div>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="text-xs text-amber-700 font-bold">Back-in-Stock Orders</div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-900">$12,150</div>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-between items-center text-xs">
            <span className="text-gray-500">Live data synchronizes every 60 seconds with Shopify Admin &amp; Meta Cloud API.</span>
            <a
              href={getShopifyAppUrl("analytics_section_cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg hover:bg-[#00be57]"
            >
              VIEW LIVE STORE ANALYTICS ➔
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
