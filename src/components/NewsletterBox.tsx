"use client";

import { useState } from "react";

export function NewsletterBox({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("success");
  };

  return (
    <div
      className={`neo-box bg-[#E8F8F0] p-6 sm:p-8 rounded-2xl border-[2.5px] border-black my-10 ${className}`}
      data-tool-name="newsletter_subscription_form"
      data-tool-description="Subscribe to weekly WhatsApp marketing playbooks and eCommerce conversion strategies"
    >
      <div className="space-y-4 max-w-xl">
        <div className="neo-pill inline-block bg-[#00D261] px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-black">
          WHATSAPP GROWTH DISPATCH
        </div>

        <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-black leading-tight">
          GET ACTIONABLE ECOMMERCE &amp; WHATSAPP PLAYBOOKS.
        </h3>

        <p className="text-xs sm:text-sm font-medium text-gray-700 leading-relaxed">
          Join 10,000+ merchants worldwide receiving our weekly breakdown on abandoned cart recovery, AI support prompts, and WhatsApp conversion tactics.
        </p>

        {status === "success" ? (
          <div className="neo-box bg-[#00D261] p-4 rounded-xl text-black font-extrabold text-xs sm:text-sm uppercase tracking-wide">
            ✓ You're in! Welcome to the WhatFlow insider circle.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-1">
            <label htmlFor="newsletter-email-input" className="sr-only">
              Store Email Address
            </label>
            <input
              id="newsletter-email-input"
              name="email"
              type="email"
              required
              aria-label="Store Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your store email..."
              className="neo-box px-4 py-3 bg-white text-black text-xs font-bold rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-[#00D261]"
            />
            <button
              type="submit"
              aria-label="Subscribe to WhatsApp Growth Newsletter"
              className="neo-btn bg-black text-white hover:bg-[#00D261] hover:text-black px-6 py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-colors whitespace-nowrap"
            >
              SUBSCRIBE ➔
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
