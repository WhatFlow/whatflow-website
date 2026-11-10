"use client";

import React, { useState } from "react";
import { Section, SectionHead } from "@/components/site/PageKit";

export function SettingsAndMetaSync() {
  const [readReceipts, setReadReceipts] = useState<boolean>(true);
  const [typingIndicator, setTypingIndicator] = useState<boolean>(true);
  const [soundAlerts, setSoundAlerts] = useState<boolean>(true);

  return (
    <Section tone="dark" className="ib-glow">
      <SectionHead
        center light
        kicker="Store &amp; team settings"
        title={<>Meta profile sync &amp; <span className="text-[var(--green)]">inbox preferences.</span></>}
        sub={<>Control agent notification sounds, typing indicator simulations, and sync your official WhatsApp Business profile directly with Meta Business Manager.</>}
      />
      <div className="mt-14 space-y-10">

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Team & Sound Preferences */}
          <div data-reveal className="ib-panel p-6 sm:p-8 space-y-6">
            <h3 className="text-2xl font-display font-bold tracking-[-0.03em] text-white">
              Inbox behavior &amp; agent controls
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 gap-4 bg-black/25 rounded-[16px] border border-white/5 transition-colors duration-300 hover:border-white/15">
                <div>
                  <strong className="block text-white">Send read receipts</strong>
                  <span className="text-white/65">Show double blue checks when agent opens a chat</span>
                </div>
                <button
                  type="button"
                  onClick={() => setReadReceipts(!readReceipts)}
                  role="switch"
                  aria-checked={readReceipts}
                  aria-label="Send read receipts"
                  className={`w-11 h-6 shrink-0 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                    readReceipts ? "bg-[var(--green)]" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-black transition-transform duration-300 ease-out ${
                      readReceipts ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 gap-4 bg-black/25 rounded-[16px] border border-white/5 transition-colors duration-300 hover:border-white/15">
                <div>
                  <strong className="block text-white">Typing indicators</strong>
                  <span className="text-white/65">Simulate &quot;typing...&quot; in WhatsApp while composing</span>
                </div>
                <button
                  type="button"
                  onClick={() => setTypingIndicator(!typingIndicator)}
                  role="switch"
                  aria-checked={typingIndicator}
                  aria-label="Typing indicators"
                  className={`w-11 h-6 shrink-0 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                    typingIndicator ? "bg-[var(--green)]" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-black transition-transform duration-300 ease-out ${
                      typingIndicator ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 gap-4 bg-black/25 rounded-[16px] border border-white/5 transition-colors duration-300 hover:border-white/15">
                <div>
                  <strong className="block text-white">Custom audio alert sounds</strong>
                  <span className="text-white/65">Chime when new customer messages arrive</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSoundAlerts(!soundAlerts)}
                  role="switch"
                  aria-checked={soundAlerts}
                  aria-label="Custom audio alert sounds"
                  className={`w-11 h-6 shrink-0 rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                    soundAlerts ? "bg-[var(--green)]" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-black transition-transform duration-300 ease-out ${
                      soundAlerts ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Meta Profile & Tier Limits */}
          <div data-reveal style={{ "--d": "90ms" } as React.CSSProperties} className="ib-panel p-6 sm:p-8 space-y-6">
            <h3 className="text-2xl font-display font-bold tracking-[-0.03em] text-white">
              Official Meta Business account health
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-black/25 rounded-[16px] border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/65">Phone quality rating:</span>
                  <span className="text-[var(--green)] font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
                    High (Green)
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/65">Messaging tier limit:</span>
                  <span className="text-white font-mono font-bold">100,000 unique customers / 24h</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/65">Meta WABA status:</span>
                  <span className="text-[var(--green)] font-mono">Connected, official partner</span>
                </div>
              </div>

              <div className="p-4 bg-black/25 rounded-[16px] border border-white/5 space-y-2 text-xs">
                <div className="font-bold text-white text-[11px]">Business profile details</div>
                <div className="text-white/65">Display name: <strong>Lumiere Studio</strong></div>
                <div className="text-white/65">Category: <strong>Apparel &amp; Fashion</strong></div>
                <div className="text-white/65">Support hours: <strong>Mon to Fri, 9 AM to 6 PM EST</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
