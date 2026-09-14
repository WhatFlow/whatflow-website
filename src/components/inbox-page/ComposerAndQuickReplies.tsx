"use client";

import React, { useState } from "react";

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
    <section className="py-20 px-4 sm:px-6 bg-[#121212] text-white border-b border-white/10">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="px-3.5 py-1 rounded-full bg-[#1ed760]/15 border border-[#1ed760]/30 text-[#1ed760] text-xs font-bold uppercase tracking-wider inline-block">
            PRODUCTIVITY WORKFLOWS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            LIGHTNING COMPOSER &amp; <span className="text-[#1ed760]">CANNED REPLIES.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-normal">
            Respond to common inquiries in 1 click using slash commands. Attach media, voice notes,
            or launch interactive buttons while staying in full compliance with Meta&apos;s 24-hour care window.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Canned Replies Chips & Care Window Explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl bg-[#181818] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1ed760] uppercase tracking-wider">
                  ⚡ 7 Built-In Slash Commands
                </span>
                <span className="text-[11px] text-gray-400 font-mono">Type &apos;/&apos; in composer</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {CANNED_REPLIES.map((c) => (
                  <button
                    key={c.cmd}
                    type="button"
                    onClick={() => handleSelectCanned(c.text)}
                    className="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#2e2e2e] text-xs font-mono text-gray-200 border border-white/10 transition-colors cursor-pointer"
                  >
                    {c.cmd}
                  </button>
                ))}
              </div>
            </div>

            {/* 24-Hour Care Window Card */}
            <div className="p-6 rounded-2xl bg-[#181818] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      windowActive ? "bg-[#1ed760] animate-pulse" : "bg-red-500"
                    }`}
                  />
                  <span>24-Hour Customer Care Window</span>
                </span>
                <button
                  type="button"
                  onClick={() => setWindowActive(!windowActive)}
                  className="text-[10px] text-gray-400 hover:text-white font-mono underline cursor-pointer"
                >
                  Toggle State ({windowActive ? "Open" : "Closed"})
                </button>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                {windowActive ? (
                  <>
                    <strong className="text-white">Window is Open:</strong> The customer messaged within the last 24 hours. Your agents can send free-form text, custom photos, audio voice notes, and checkout links with zero per-message charges!
                  </>
                ) : (
                  <>
                    <strong className="text-yellow-400">Window is Closed:</strong> Over 24 hours have passed since the customer&apos;s last reply. WhatFlow automatically restricts the composer to official Meta pre-approved templates to prevent policy violations.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Right: Live Interactive Composer Simulator */}
          <div className="lg:col-span-6 bg-[#181818] p-6 sm:p-8 rounded-3xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <span className="text-gray-300 font-bold">Live Composer Workbench</span>
              <span className="font-mono text-[#1ed760] text-[10px]">
                {windowActive ? "Care Window: 18h 42m Remaining" : "Care Window: Expired (Templates Only)"}
              </span>
            </div>

            {/* Media Toolbar */}
            <div className="flex items-center gap-2 text-sm text-gray-400 p-2 bg-[#121212] rounded-xl border border-white/5 overflow-x-auto">
              <span className="text-[10px] uppercase font-bold text-gray-500 mr-1">Attach:</span>
              <button type="button" className="p-1.5 hover:text-[#1ed760] transition-colors" title="Photo">📷</button>
              <button type="button" className="p-1.5 hover:text-[#1ed760] transition-colors" title="Video">🎥</button>
              <button type="button" className="p-1.5 hover:text-[#1ed760] transition-colors" title="Audio">🎵</button>
              <button type="button" className="p-1.5 hover:text-[#1ed760] transition-colors" title="PDF Document">📄</button>
              <button type="button" className="p-1.5 hover:text-[#1ed760] transition-colors" title="Location">📍</button>
              <button type="button" className="p-1.5 hover:text-[#1ed760] transition-colors" title="Contact">👤</button>
              <button type="button" className="p-1.5 hover:text-[#1ed760] transition-colors" title="Voice Mic">🎙️</button>
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
                    ? "bg-[#121212] border-white/15 focus:border-[#1ed760]"
                    : "bg-red-950/20 border-red-500/30 text-gray-400 cursor-not-allowed"
                }`}
                placeholder={
                  windowActive
                    ? "Type your message or click any slash command..."
                    : "Window closed. Select a pre-approved template to re-engage customer..."
                }
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-gray-500 font-mono">
                {inputText.length} characters
              </span>
              <button
                type="button"
                onClick={() => {
                  alert(`Message dispatched via Cloudflare Worker: "${inputText}"`);
                  setInputText("");
                }}
                disabled={!inputText.trim()}
                className="px-6 py-2.5 rounded-full bg-[#1ed760] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#1abc54] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send Message ➔
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
