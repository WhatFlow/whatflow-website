"use client";

import React, { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "automations", label: "Core Automations" },
  { id: "recovery", label: "Cart & Recovery" },
  { id: "shipping", label: "11-Step Shipping" },
  { id: "auto-replies", label: "Interactive Replies" },
  { id: "broadcasts", label: "Broadcast Engine" },
  { id: "shopify-functions", label: "COD & Functions" },
  { id: "flows-integration", label: "Shopify Flow" },
  { id: "flowsense-otp", label: "AI & OTP" },
  { id: "analytics", label: "6-Tab Analytics" },
  { id: "message-editor", label: "Template Editor" },
  { id: "edge-architecture", label: "Cloudflare Edge" },
];

export function SectionNav() {
  const [activeSection, setActiveSection] = useState<string>("automations");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-md border-b-[2.5px] border-black py-2.5 px-4 overflow-x-auto no-scrollbar shadow-xs">
      <div className="max-w-[1280px] mx-auto flex items-center gap-2 min-w-max">
        <span className="text-[11px] font-black uppercase text-[#0A6B56] mr-2 flex items-center gap-1.5 pl-1">
          <span className="w-2 h-2 rounded-full bg-[#00D261] animate-ping" />
          Navigate:
        </span>
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-[#00D261] text-black border-2 border-black shadow-[2px_2px_0px_#000]"
                  : "bg-[#FAF7F0] text-gray-700 hover:bg-gray-200 border border-black/20"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
