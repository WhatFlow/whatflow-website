"use client";

import React from "react";
import { WhatsAppBubble } from "./WhatsAppBubble";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export function FlowSenseOtp() {
  return (
    <section id="flowsense-otp" className="py-20 px-4 sm:px-6 bg-[#091E17] text-white border-b-[2.5px] border-black">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="neo-pill bg-[#00D261] text-black px-4 py-1 text-xs font-black uppercase tracking-wider inline-block">
            TEAM INBOX &amp; AUTHENTICATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            TEAM INBOX &amp; <span className="text-[#00D261]">1-TAP OTP VERIFICATION.</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-medium">
            Support customers with Shopify order context and use Meta Authentication templates for verification workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Team inbox */}
          <div className="bg-white text-black p-8 sm:p-10 rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="neo-pill bg-[#D5F5E3] text-[#0A6B56] text-xs font-black px-3 py-1">
                  ENTERPRISE-READY INBOX
                </span>
                <span className="text-xs font-mono text-gray-500">No seat fees</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-black uppercase">
                Your whole support team, connected
              </h3>

              <p className="text-sm text-gray-700 font-medium leading-relaxed">
                Keep WhatsApp conversations close to Shopify orders, with native extensions and full feature access
                across messaging plans. Add colleagues without another seat subscription. AI is not currently included.
              </p>

              <ul className="space-y-2 text-xs sm:text-sm font-bold text-gray-900">
                <li className="flex items-center gap-2">
                  <span className="text-[#00D261]">✔</span> Shopify order context alongside customer conversations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00D261]">✔</span> All features available on every messaging plan
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00D261]">✔</span> No per-seat charges as your support team grows
                </li>
              </ul>
            </div>

            <div className="bg-[#ECE5DD] p-4 rounded-2xl border border-black/15">
              <WhatsAppBubble
                sender="bot"
                time="11:02 AM"
                headerBadge="WHATFLOW TEAM INBOX"
                senderName="Maya · Support team"
                footerText="Illustrative team reply"
                buttons={[
                  { text: "View Order", highlight: true },
                  { text: "Return Policy" },
                ]}
              >
                I have your <strong>order #1042</strong> here. Happy to help with a different size — which size would you prefer?
              </WhatsAppBubble>
            </div>
          </div>

          {/* Card 2: Instant OTP Verification */}
          <div className="bg-white text-black p-8 sm:p-10 rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="neo-pill bg-[#FFC107] text-black text-xs font-black px-3 py-1">
                  META AUTHENTICATION API
                </span>
                <span className="text-xs font-mono text-gray-500">Meta templates</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-black uppercase">
                1-Tap WhatsApp OTP Login
              </h3>

              <p className="text-sm text-gray-700 font-medium leading-relaxed">
                Replace clunky SMS codes with instant WhatsApp OTP verification. Uses official Meta
                Authentication templates featuring native &quot;Copy Code&quot; and &quot;1-Tap Autofill&quot; buttons.
              </p>

              <ul className="space-y-2 text-xs sm:text-sm font-bold text-gray-900">
                <li className="flex items-center gap-2">
                  <span className="text-[#00D261]">✔</span> WhatsApp Authentication templates for verification messages
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00D261]">✔</span> Native 1-Tap &quot;Copy Code&quot; clipboard button
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00D261]">✔</span> Perfect for checkout verification, gift cards & account logins
                </li>
              </ul>
            </div>

            <div className="bg-[#ECE5DD] p-4 rounded-2xl border border-black/15">
              <WhatsAppBubble
                sender="bot"
                time="11:03 AM"
                headerBadge="SECURITY CODE"
                buttons={[{ text: "Copy Code: 849-210 📋", highlight: true }]}
                footerText="Code expires in 5 minutes • Do not share"
              >
                <strong>849210</strong> is your verification code for Lumiere Store checkout.
              </WhatsAppBubble>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <a
            href={getShopifyAppUrl("flowsense_otp_cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn inline-flex items-center gap-2 bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-lg hover:bg-[#00be57]"
          >
            <span>EXPLORE WHATFLOW FEATURES</span>
            <span>➔</span>
          </a>
        </div>
      </div>
    </section>
  );
}
