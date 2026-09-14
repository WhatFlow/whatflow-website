"use client";

import React from "react";

export type BubbleSender = "bot" | "user" | "system";

export interface WhatsAppBubbleProps {
  sender?: BubbleSender;
  time?: string;
  senderName?: string;
  children?: React.ReactNode;
  status?: "sent" | "delivered" | "read";
  buttons?: {
    text: string;
    icon?: string;
    onClick?: () => void;
    highlight?: boolean;
  }[];
  headerBadge?: string;
  footerText?: string;
  media?: {
    type: "image" | "video" | "document" | "audio";
    url?: string;
    title?: string;
    subtitle?: string;
    icon?: string;
  };
  className?: string;
}

export function WhatsAppBubble({
  sender = "bot",
  time = "10:24 AM",
  senderName,
  children,
  status = "read",
  buttons,
  headerBadge,
  footerText,
  media,
  className = "",
}: WhatsAppBubbleProps) {
  const isOutbound = sender === "bot";
  const isSystem = sender === "system";

  if (isSystem) {
    return (
      <div className="flex justify-center my-3">
        <span className="bg-[#182229]/80 text-[#8696A0] text-[11px] font-semibold px-3 py-1 rounded-md shadow-xs border border-white/5">
          {children}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${isOutbound ? "items-end" : "items-start"} my-1.5 ${className}`}>
      <div
        className={`relative max-w-[88%] sm:max-w-[82%] rounded-2xl p-3 sm:p-3.5 shadow-sm text-left transition-all ${
          isOutbound
            ? "bg-[#D9FDD3] text-[#111B21] rounded-tr-xs border border-[#C1ECC0]"
            : "bg-white text-[#111B21] rounded-tl-xs border border-gray-200"
        }`}
      >
        {senderName && (
          <div className="text-[11px] font-bold text-[#00A884] mb-1">
            {senderName}
          </div>
        )}

        {headerBadge && (
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00A884]/15 text-[#008069] text-[10px] font-black uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A884] animate-pulse" />
            {headerBadge}
          </div>
        )}

        {media && (
          <div className="mb-2.5 rounded-xl overflow-hidden border border-black/10 bg-black/5">
            {media.type === "image" && (
              <div className="relative aspect-video bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center p-3 text-center">
                <div className="space-y-1">
                  <div className="text-2xl">📦</div>
                  <div className="text-xs font-bold text-gray-800">{media.title || "Order Package"}</div>
                  {media.subtitle && <div className="text-[11px] text-gray-500">{media.subtitle}</div>}
                </div>
              </div>
            )}
            {media.type === "document" && (
              <div className="flex items-center gap-3 p-3 bg-white/80">
                <div className="w-10 h-10 rounded-lg bg-red-100 border border-red-200 flex items-center justify-center text-red-600 font-black text-xs">
                  PDF
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-gray-900 truncate">{media.title || "Invoice.pdf"}</div>
                  <div className="text-[10px] text-gray-500">{media.subtitle || "124 KB • Click to view"}</div>
                </div>
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </div>
            )}
            {media.type === "audio" && (
              <div className="flex items-center gap-3 p-3 bg-white/90">
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-[#00A884] text-white flex items-center justify-center shadow-xs"
                >
                  ▶
                </button>
                <div className="flex-1 space-y-1">
                  <div className="h-1.5 bg-[#00A884]/30 rounded-full overflow-hidden">
                    <div className="w-2/5 h-full bg-[#00A884] rounded-full" />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>0:14</span>
                    <span>0:38</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="text-xs sm:text-[13px] leading-relaxed break-words font-medium">
          {children}
        </div>

        {footerText && (
          <div className="mt-2 pt-1.5 border-t border-black/5 text-[11px] text-gray-500 italic">
            {footerText}
          </div>
        )}

        <div className="flex items-center justify-end gap-1 mt-1.5 -mb-0.5 select-none text-[10px] text-gray-500 font-medium">
          <span>{time}</span>
          {isOutbound && (
            <span className="flex items-center text-[#53bdeb]" title={status}>
              <svg viewBox="0 0 16 15" width="16" height="15" fill="currentColor">
                <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.512z" />
              </svg>
            </span>
          )}
        </div>
      </div>

      {buttons && buttons.length > 0 && (
        <div className="mt-1 space-y-1 w-[88%] sm:w-[82%]">
          {buttons.map((btn, i) => (
            <button
              key={i}
              type="button"
              onClick={btn.onClick}
              className={`w-full py-2 px-3 rounded-xl border text-center text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 ${
                btn.highlight
                  ? "bg-[#00A884] text-white border-[#00A884] hover:bg-[#008f70]"
                  : "bg-white text-[#00A884] border-gray-200 hover:bg-[#F0F2F5]"
              }`}
            >
              {btn.icon && <span>{btn.icon}</span>}
              <span>{btn.text}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
