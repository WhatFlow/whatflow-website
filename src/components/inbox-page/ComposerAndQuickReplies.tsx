"use client";

import React, { useState } from "react";
import { Section, SectionHead } from "@/components/site/PageKit";

const CANNED_REPLIES = [
  { cmd: "/greeting", text: "Hello! Welcome to our store. How can I help you today?" },
  { cmd: "/tracking", text: "Here is your live tracking link: {{tracking_url}}. Your order is currently on schedule." },
  { cmd: "/orderstatus", text: "Your order {{order_name}} is currently being prepared for dispatch by our warehouse." },
  { cmd: "/return", text: "We offer hassle-free 30-day returns. You can initiate an exchange here: {{return_portal_url}}" },
  { cmd: "/hours", text: "Our concierge team is online Monday through Friday, 9:00 AM to 6:00 PM EST." },
  { cmd: "/payment", text: "You can securely complete your pending payment using this 1-click invoice link: {{invoice_url}}" },
  { cmd: "/thanks", text: "Thank you for shopping with us! Please let us know if you need anything else." },
];

export function ComposerAndQuickReplies() {
  const [inputText, setInputText] = useState<string>("/greeting");
  const [windowActive, setWindowActive] = useState<boolean>(true);

  const handleSelectCanned = (text: string) => {
    setInputText(text);
  };

  return (
    <Section tone="dark" className="ib-glow">
      <SectionHead
        center light
        kicker="Productivity workflows"
        title={<>Lightning composer &amp; <span className="text-[var(--green)]">canned replies.</span></>}
        sub={<>Respond to common inquiries in 1 click using slash commands. Attach media, voice notes, or launch interactive buttons while staying in full compliance with Meta&apos;s 24-hour care window.</>}
      />
      <div className="mt-14 space-y-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Canned Replies Chips & Care Window Explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div data-reveal className="ib-panel p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--green)]">
                  7 built-in slash commands
                </span>
                <span className="text-[11px] text-white/65 font-mono">Type &apos;/&apos; in composer</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {CANNED_REPLIES.map((c) => (
                  <button
                    key={c.cmd}
                    type="button"
                    onClick={() => handleSelectCanned(c.text)}
                    className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[var(--green)] hover:text-black hover:border-[var(--green)] text-xs font-mono text-white/85 border border-white/10 transition-colors duration-300 cursor-pointer"
                  >
                    {c.cmd}
                  </button>
                ))}
              </div>
            </div>

            {/* 24-Hour Care Window Card */}
            <div data-reveal style={{ "--d": "90ms" } as React.CSSProperties} className="ib-panel p-6 sm:p-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                      windowActive ? "bg-[var(--green)] animate-pulse" : "bg-red-500"
                    }`}
                  />
                  <span>24-hour customer care window</span>
                </span>
                <button
                  type="button"
                  onClick={() => setWindowActive(!windowActive)}
                  aria-pressed={windowActive}
                  className="px-3 py-1 rounded-full border border-white/15 text-[11px] text-white/75 hover:text-white hover:border-white/35 whitespace-nowrap transition-colors duration-300 cursor-pointer"
                >
                  Toggle state ({windowActive ? "open" : "closed"})
                </button>
              </div>

              <p key={String(windowActive)} className="ib-swap text-sm text-white/65 leading-relaxed">
                {windowActive ? (
                  <>
                    <strong className="text-white">Window is open:</strong> The customer messaged within the last 24 hours. Your agents can send free-form text, custom photos, audio voice notes, and checkout links with zero per-message charges!
                  </>
                ) : (
                  <>
                    <strong className="text-yellow-400">Window is closed:</strong> Over 24 hours have passed since the customer&apos;s last reply. WhatFlow automatically restricts the composer to official Meta pre-approved templates to prevent policy violations.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Right: Live Interactive Composer Simulator */}
          <div data-reveal style={{ "--d": "160ms" } as React.CSSProperties} className="lg:col-span-6 ib-panel p-6 sm:p-8 rounded-[28px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <span className="text-white/75 font-bold">Live composer workbench</span>
              <span className="font-mono text-[var(--green)] text-[10px]">
                {windowActive ? "Care window: 18h 42m remaining" : "Care window: expired (templates only)"}
              </span>
            </div>

            {/* Media Toolbar */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/65 p-2 bg-black/25 rounded-xl border border-white/5 px-3">
              <span className="text-[11px] font-bold text-white/65 mr-1">Attach:</span>
              {["Photo", "Video", "Audio", "PDF", "Location", "Contact", "Voice"].map((kind) => (
                <span key={kind} className="whitespace-nowrap px-1.5 py-1 text-xs font-semibold">
                  {kind}
                </span>
              ))}
            </div>

            {/* Input Box */}
            <div className="space-y-2">
              <textarea
                rows={4}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={!windowActive}
                className={`w-full p-3.5 rounded-xl text-xs text-white outline-none border transition-colors ${
                  windowActive
                    ? "bg-black/25 border-white/40 focus:border-[var(--green)]"
                    : "bg-red-950/20 border-red-500/30 text-white/65 cursor-not-allowed"
                }`}
                placeholder={
                  windowActive
                    ? "Type your message or click any slash command..."
                    : "Window closed. Select a pre-approved template to re-engage customer..."
                }
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-white/65 font-mono">
                {inputText.length} characters
              </span>
              <button
                type="button"
                onClick={() => {
                  alert(`Message sent to customer: "${inputText}"`);
                  setInputText("");
                }}
                disabled={!inputText.trim()}
                className="px-6 py-2.5 rounded-full bg-[var(--green)] text-black font-bold text-sm hover:bg-[var(--green-pressed)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
