"use client";

import { useState } from "react";
import Link from "next/link";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside aria-label="Announcement" className="relative bg-[#091E17] text-white border-b-[2.5px] border-black px-4 py-2 text-xs font-bold tracking-wide z-40 overflow-hidden">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
        {/* Left / Center content */}
        <div className="flex items-center gap-2.5 flex-1 justify-center sm:justify-start flex-wrap">
          <span className="neo-pill bg-[#00D261] text-black text-[9px] font-extrabold uppercase px-2 py-0.5 tracking-wider border border-black shadow-[1px_1px_0px_#000]">
            NEW
          </span>
          <span className="text-gray-200">
            Official Meta Cloud API • Zero markup on WhatsApp conversation rates • 14-day free trial
          </span>
          <Link
            href={getShopifyAppUrl("announcement_bar")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00D261] hover:underline font-black uppercase inline-flex items-center gap-1 tracking-wider ml-1"
          >
            <span>TRY FOR FREE</span>
            <span>➔</span>
          </Link>
        </div>

        {/* Dismiss button */}
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="text-gray-400 hover:text-white p-1 transition-colors flex-shrink-0"
          aria-label="Dismiss announcement"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
