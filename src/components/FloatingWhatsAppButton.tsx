"use client";

import { useState } from "react";
import Image from "next/image";

export function FloatingWhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const supportNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT_NUMBER ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "";

  // Hide button if no support number environment variable is present
  if (!supportNumber || supportNumber.trim() === "") {
    return null;
  }

  const defaultMessage = encodeURIComponent(
    "Hi WhatFlow team, I have a question about setting up WhatsApp for my Shopify store!"
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover popup */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white border-[2.5px] border-black rounded-2xl shadow-[6px_6px_0px_#000] p-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b-[2px] border-black pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#00D261] border border-black flex items-center justify-center font-black text-xs text-black">
                WF
              </div>
              <div>
                <div className="font-extrabold text-xs text-black uppercase tracking-tight">WhatFlow Support</div>
                <div className="text-[10px] font-bold text-[#0A6B56] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D261] animate-pulse" />
                  ONLINE · REPLIES IN &lt;5 MIN
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-black p-1"
              aria-label="Close support modal"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <p className="text-xs font-medium text-gray-700 leading-relaxed mb-4">
            Need help integrating WhatFlow with your Shopify store or calculating WhatsApp Meta rates? Chat directly with our team on WhatsApp.
          </p>

          <a
            href={`https://wa.me/${supportNumber}?text=${defaultMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn w-full bg-[#00D261] text-black text-xs font-extrabold uppercase py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000]"
          >
            <Image
              src="/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_Black_RGB_2026.svg"
              width={18}
              height={18}
              alt="WhatsApp"
              className="object-contain"
            />
            <span>START WHATSAPP CHAT</span>
          </a>
        </div>
      )}

      {/* Floating trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="neo-btn bg-[#00D261] text-black w-14 h-14 rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_#000] hover:scale-105 transition-transform"
        aria-label="Toggle WhatsApp support chat"
        title="Chat on WhatsApp"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-black stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <Image
            src="/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_Black_RGB_2026.svg"
            width={30}
            height={30}
            alt="WhatsApp"
            className="object-contain"
          />
        )}
      </button>
    </div>
  );
}
