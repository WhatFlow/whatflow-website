"use client";

import React, { useState } from "react";

export function SettingsAndMetaSync() {
  const [readReceipts, setReadReceipts] = useState<boolean>(true);
  const [typingIndicator, setTypingIndicator] = useState<boolean>(true);
  const [soundAlerts, setSoundAlerts] = useState<boolean>(true);

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#121212] text-white border-b border-white/10">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="px-3.5 py-1 rounded-full bg-[#1ed760]/15 border border-[#1ed760]/30 text-[#1ed760] text-xs font-bold uppercase tracking-wider inline-block">
            STORE &amp; TEAM SETTINGS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            META PROFILE SYNC &amp; <span className="text-[#1ed760]">INBOX PREFERENCES.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-normal">
            Control agent notification sounds, typing indicator simulations, and sync your official
            WhatsApp Business profile directly with Meta Business Manager.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Team & Sound Preferences */}
          <div className="bg-[#181818] p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
            <h3 className="text-lg font-display font-black uppercase text-white">
              Inbox Behavior &amp; Agent Controls
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 bg-[#121212] rounded-xl border border-white/5">
                <div>
                  <strong className="block text-white">Send Read Receipts</strong>
                  <span className="text-gray-400">Show double blue checks when agent opens a chat</span>
                </div>
                <button
                  type="button"
                  onClick={() => setReadReceipts(!readReceipts)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                    readReceipts ? "bg-[#1ed760]" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-black transition-transform ${
                      readReceipts ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#121212] rounded-xl border border-white/5">
                <div>
                  <strong className="block text-white">Typing Indicators</strong>
                  <span className="text-gray-400">Simulate &quot;typing...&quot; in WhatsApp while composing</span>
                </div>
                <button
                  type="button"
                  onClick={() => setTypingIndicator(!typingIndicator)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                    typingIndicator ? "bg-[#1ed760]" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-black transition-transform ${
                      typingIndicator ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#121212] rounded-xl border border-white/5">
                <div>
                  <strong className="block text-white">Custom Audio Alert Sounds</strong>
                  <span className="text-gray-400">Chime when new customer messages arrive</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSoundAlerts(!soundAlerts)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                    soundAlerts ? "bg-[#1ed760]" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-black transition-transform ${
                      soundAlerts ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Meta Profile & Tier Limits */}
          <div className="bg-[#181818] p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
            <h3 className="text-lg font-display font-black uppercase text-white">
              Official Meta Business Account Health
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-[#121212] rounded-xl border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Phone Quality Rating:</span>
                  <span className="text-[#1ed760] font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1ed760] animate-pulse" />
                    High (Green)
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Messaging Tier Limit:</span>
                  <span className="text-white font-mono font-bold">100,000 unique customers / 24h</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Meta WABA Status:</span>
                  <span className="text-[#1ed760] font-mono">Connected • Official Partner</span>
                </div>
              </div>

              <div className="p-4 bg-[#121212] rounded-xl border border-white/5 space-y-2 text-xs">
                <div className="font-bold text-white uppercase text-[11px]">Business Profile Details</div>
                <div className="text-gray-400">Display Name: <strong>Lumiere Studio</strong></div>
                <div className="text-gray-400">Category: <strong>Apparel &amp; Fashion</strong></div>
                <div className="text-gray-400">Support Hours: <strong>Mon - Fri • 9 AM - 6 PM EST</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
