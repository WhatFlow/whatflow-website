"use client";

import React, { useState } from "react";
import { WhatsAppBubble } from "../features/WhatsAppBubble";

interface MockCustomer {
  id: string;
  name: string;
  phone: string;
  avatarText: string;
  lastMessage: string;
  time: string;
  unread: number;
  careWindowHours: number;
  careWindowMins: number;
  totalSpent: string;
  ordersCount: number;
  activeOrder: {
    id: string;
    items: string;
    total: string;
    status: string;
  };
  tags: string[];
  messages: {
    sender: "bot" | "user";
    time: string;
    text: string;
    headerBadge?: string;
    buttons?: { text: string; highlight?: boolean }[];
    media?: { type: "image" | "document"; title: string; subtitle: string };
  }[];
}

const CONVERSATIONS: MockCustomer[] = [
  {
    id: "sarah",
    name: "Sarah Jenkins",
    phone: "+1 (555) 382-9104",
    avatarText: "SJ",
    lastMessage: "Can I change my delivery address to Apt 4B?",
    time: "2m ago",
    unread: 1,
    careWindowHours: 23,
    careWindowMins: 48,
    totalSpent: "$482.00",
    ordersCount: 3,
    activeOrder: {
      id: "#1042",
      items: "1x Organic Linen Robe, 1x Silk Eye Mask",
      total: "$84.00",
      status: "Out for Delivery",
    },
    tags: ["Repeat-Buyer", "COD-Verified", "Newsletter"],
    messages: [
      {
        sender: "bot",
        time: "10:30 AM",
        text: "Hi Sarah! Your order #1042 has shipped via FedEx Express (FX-88912). Estimated delivery is today by 3:00 PM.",
        headerBadge: "OUT FOR DELIVERY 🚚",
        buttons: [{ text: "Track Package 📍", highlight: true }],
      },
      {
        sender: "user",
        time: "10:32 AM",
        text: "Hi! Can I change my delivery address to Apt 4B? I just moved down the hall.",
      },
      {
        sender: "bot",
        time: "10:33 AM",
        text: "Sure thing Sarah! I updated the courier notes with Apartment 4B for driver Michael. You are all set! 👍",
      },
    ],
  },
  {
    id: "marcus",
    name: "Marcus Vance",
    phone: "+44 7911 123456",
    avatarText: "MV",
    lastMessage: "Does the leather jacket come in size XL?",
    time: "14m ago",
    unread: 0,
    careWindowHours: 19,
    careWindowMins: 12,
    totalSpent: "$0.00",
    ordersCount: 0,
    activeOrder: {
      id: "Draft #D-209",
      items: "Heritage Leather Biker Jacket (Black)",
      total: "$340.00",
      status: "Cart Abandoned",
    },
    tags: ["Lead", "High-Intent", "Product-Inquiry"],
    messages: [
      {
        sender: "user",
        time: "11:15 AM",
        text: "Hey! Does the Heritage Leather Jacket come in XL? It looked sold out on the site.",
      },
      {
        sender: "bot",
        time: "11:16 AM",
        text: "Hi Marcus! We just restocked 3 units of the Heritage Leather Jacket in size XL at our London hub. Would you like me to reserve one?",
        buttons: [
          { text: "Reserve XL & Checkout 🛒", highlight: true },
          { text: "View Size Chart" },
        ],
      },
    ],
  },
  {
    id: "elena",
    name: "Elena Rostova",
    phone: "+1 (555) 902-1840",
    avatarText: "ER",
    lastMessage: "Thank you so much! Looking forward to the VIP drop.",
    time: "1h ago",
    unread: 0,
    careWindowHours: 14,
    careWindowMins: 30,
    totalSpent: "$1,840.00",
    ordersCount: 8,
    activeOrder: {
      id: "#1038",
      items: "Cashmere Overcoat (Camel, Size S)",
      total: "$620.00",
      status: "Delivered",
    },
    tags: ["VIP-Tier", "Top-10%", "High-LTV", "Ambassador"],
    messages: [
      {
        sender: "user",
        time: "9:00 AM",
        text: "Good morning! When is the Autumn Cashmere collection launching for VIP members?",
      },
      {
        sender: "bot",
        time: "9:02 AM",
        text: "Good morning Elena! As a Top Tier VIP, your early access opens tomorrow at 8:00 AM EST. Here is your private preview link!",
        buttons: [{ text: "Private VIP Access Link 🔑", highlight: true }],
      },
      {
        sender: "user",
        time: "9:05 AM",
        text: "Thank you so much! Looking forward to the VIP drop.",
      },
    ],
  },
];

export function LiveConversationMock() {
  const [activeCustomerId, setActiveCustomerId] = useState<string>("sarah");
  const [drawerTab, setDrawerTab] = useState<"overview" | "media" | "docs">("overview");

  const activeCustomer =
    CONVERSATIONS.find((c) => c.id === activeCustomerId) || CONVERSATIONS[0];

  return (
    <section id="live-mock" className="py-20 px-4 sm:px-6 bg-[#121212] text-white border-b border-white/10">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="px-3.5 py-1 rounded-full bg-[#1ed760]/15 border border-[#1ed760]/30 text-[#1ed760] text-xs font-bold uppercase tracking-wider inline-block">
            INTERACTIVE LIVE WORKBENCH
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white">
            EXPERIENCE THE <span className="text-[#1ed760]">WHATFLOW INBOX.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-normal">
            Click across conversations below. See how incoming WhatsApp messages, 24-hour Meta care window timers,
            and Shopify customer profiles sync in real time.
          </p>
        </div>

        {/* 3-Pane Inbox Container */}
        <div className="rounded-3xl bg-[#181818] border border-white/15 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          {/* Left Pane: Conversation List (3.5 cols) */}
          <div className="lg:col-span-4 border-r border-white/10 flex flex-col bg-[#161616]">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1ed760] animate-pulse" />
                <span className="font-display font-black text-sm uppercase tracking-wider text-white">
                  Chats ({CONVERSATIONS.length})
                </span>
              </div>
              <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-gray-300">
                Status: Live Online
              </span>
            </div>

            {/* Conversation Items */}
            <div className="flex-1 divide-y divide-white/5 overflow-y-auto">
              {CONVERSATIONS.map((c) => {
                const isSelected = c.id === activeCustomerId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCustomerId(c.id)}
                    className={`w-full p-4 flex items-start gap-3 text-left transition-colors cursor-pointer ${
                      isSelected ? "bg-[#242424]" : "hover:bg-[#1e1e1e]"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                        isSelected
                          ? "bg-[#1ed760] text-black"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {c.avatarText}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white truncate">{c.name}</span>
                        <span className="text-[10px] text-gray-400">{c.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">{c.lastMessage}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-[9px] font-mono bg-black/40 text-[#1ed760] px-1.5 py-0.5 rounded">
                          {c.activeOrder.id}
                        </span>
                        <span className="text-[9px] text-gray-500 font-medium">
                          {c.totalSpent} LTV
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Middle Pane: Active Chat Timeline (5 cols) */}
          <div className="lg:col-span-5 flex flex-col bg-[#0b141a] border-r border-white/10">
            {/* Chat Header */}
            <div className="p-3.5 bg-[#202c33] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#1ed760] text-black flex items-center justify-center font-bold text-xs">
                  {activeCustomer.avatarText}
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{activeCustomer.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono">({activeCustomer.phone})</span>
                  </div>
                  <div className="text-[10px] text-[#00D261] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D261] animate-pulse" />
                    <span>WhatsApp Verified</span>
                  </div>
                </div>
              </div>

              {/* 24h Window Badge */}
              <div className="flex items-center gap-1.5 bg-[#182229] px-2.5 py-1 rounded-full border border-white/10">
                <span className="text-[10px] text-gray-300 font-medium">24h Window:</span>
                <span className="text-[10px] font-mono font-bold text-[#1ed760]">
                  {activeCustomer.careWindowHours}h {activeCustomer.careWindowMins}m
                </span>
              </div>
            </div>

            {/* Chat Bubbles */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
              <div className="text-center">
                <span className="bg-[#182229] text-[#8696A0] text-[10px] font-semibold px-3 py-1 rounded-md border border-white/5">
                  Messages secured with Meta Cloud API
                </span>
              </div>

              {activeCustomer.messages.map((msg, idx) => (
                <WhatsAppBubble
                  key={idx}
                  sender={msg.sender}
                  time={msg.time}
                  headerBadge={msg.headerBadge}
                  buttons={msg.buttons}
                  media={msg.media}
                >
                  {msg.text}
                </WhatsAppBubble>
              ))}
            </div>

            {/* Composer Bar Mockup */}
            <div className="p-3 bg-[#202c33] border-t border-white/10 space-y-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-lg bg-[#182229] text-gray-300 text-[11px] font-medium border border-white/10 hover:text-white"
                >
                  ⚡ Canned Replies (/...)
                </button>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-lg bg-[#182229] text-gray-300 text-[11px] font-medium border border-white/10 hover:text-white"
                >
                  📝 Meta Template
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message or press '/' for quick replies..."
                  className="flex-1 bg-[#2a3942] rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-400 outline-none border border-transparent focus:border-[#1ed760]"
                />
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-[#1ed760] text-black flex items-center justify-center font-bold text-xs hover:scale-105 transition-transform"
                >
                  ➔
                </button>
              </div>
            </div>
          </div>

          {/* Right Pane: Shopify Customer Profile Drawer (3.5 cols) */}
          <div className="lg:col-span-3 flex flex-col bg-[#181818] p-4 space-y-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="text-xs font-display font-black uppercase text-white flex items-center gap-2">
                <span>Shopify Customer Profile</span>
              </div>
              <span className="text-[10px] font-mono text-[#1ed760] bg-[#1ed760]/10 px-2 py-0.5 rounded">
                Live Sync
              </span>
            </div>

            {/* Drawer Tabs */}
            <div className="flex rounded-lg bg-[#121212] p-1 border border-white/10">
              {(["overview", "media", "docs"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setDrawerTab(tab)}
                  className={`flex-1 py-1 rounded-md text-[10px] font-bold uppercase transition-colors ${
                    drawerTab === tab ? "bg-[#242424] text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {drawerTab === "overview" && (
              <div className="space-y-4">
                {/* Lifetime Metrics */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-3 bg-[#121212] rounded-xl border border-white/10">
                    <span className="text-[9px] uppercase font-bold text-gray-400 block">LIFETIME VALUE</span>
                    <strong className="text-sm font-display font-black text-[#1ed760]">{activeCustomer.totalSpent}</strong>
                  </div>
                  <div className="p-3 bg-[#121212] rounded-xl border border-white/10">
                    <span className="text-[9px] uppercase font-bold text-gray-400 block">TOTAL ORDERS</span>
                    <strong className="text-sm font-display font-black text-white">{activeCustomer.ordersCount}</strong>
                  </div>
                </div>

                {/* Active Order Card */}
                <div className="p-3.5 bg-[#121212] rounded-xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{activeCustomer.activeOrder.id}</span>
                    <span className="text-[10px] font-bold text-[#00D261] bg-[#00D261]/10 px-2 py-0.5 rounded-full">
                      {activeCustomer.activeOrder.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-300">{activeCustomer.activeOrder.items}</p>
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 pt-1 border-t border-white/5">
                    <span>Total: {activeCustomer.activeOrder.total}</span>
                    <span className="text-[#1ed760] cursor-pointer hover:underline">View in Shopify ➔</span>
                  </div>
                </div>

                {/* Customer Tags */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-gray-400">Shopify Customer Tags:</span>
                  <div className="flex flex-wrap gap-1">
                    {activeCustomer.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {drawerTab === "media" && (
              <div className="space-y-2 text-center text-gray-400 text-xs py-8">
                <div className="text-2xl">🖼️</div>
                <div>3 photos received from customer</div>
              </div>
            )}

            {drawerTab === "docs" && (
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-[#121212] rounded-lg border border-white/10 flex items-center justify-between">
                  <span className="text-gray-300 font-mono">Invoice-1042.pdf</span>
                  <span className="text-[#1ed760] text-[10px]">Download</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
