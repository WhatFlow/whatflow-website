"use client";

import React, { useRef, useState } from "react";
import { Section, SectionHead } from "@/components/site/PageKit";
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
        headerBadge: "Out for delivery 🚚",
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
  const conversationControl = useRef<HTMLButtonElement>(null);
  const [pane, setPane] = useState<"conversation" | "chats" | "orders">("conversation");

  const activeCustomer =
    CONVERSATIONS.find((c) => c.id === activeCustomerId) || CONVERSATIONS[0];

  return (
    <Section tone="dark" id="live-mock" className="ib-glow">
      <SectionHead
        center light
        kicker="Interactive live workbench"
        title={<>Experience the <span className="text-[var(--green)]">WhatFlow Inbox.</span></>}
        sub={<>Switch chats, check the reply window, or look up a Shopify order in this demo.</>}
      />
      <div className="mt-8 lg:mt-14 space-y-10">

        {/* 3-Pane Inbox Container */}
        <div data-reveal data-pane={pane} className="ib-workbench rounded-[28px] bg-[var(--inbox-workbench)] border border-white/10 overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] grid grid-cols-1 lg:grid-cols-12 lg:min-h-[640px]">
          <div role="group" aria-label="Inbox demo panels" className="ib-pane-controls">
            {([["conversation", "Conversation"], ["chats", "Chat list"], ["orders", "Orders"]] as const).map(([key, label]) => (
              <button key={key} ref={key === "conversation" ? conversationControl : undefined} type="button" aria-pressed={pane === key} onClick={() => setPane(key)}>
                {label}
              </button>
            ))}
          </div>

          {/* Left Pane: Conversation List */}
          <div className="ib-pane-chats min-w-0 lg:col-span-4 border-r border-white/10 flex flex-col bg-black/20">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--green)] animate-pulse" />
                <span className="font-display font-bold text-sm text-white">
                  Chats ({CONVERSATIONS.length})
                </span>
              </div>
              <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/75">
                Live
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
                    onClick={() => {
                      setActiveCustomerId(c.id);
                      setPane("conversation");
                      conversationControl.current?.focus();
                    }}
                    aria-pressed={isSelected}
                    className={`w-full p-4 flex items-start gap-3 text-left transition-colors duration-300 cursor-pointer ${
                      isSelected ? "bg-white/10 shadow-[inset_3px_0_0_var(--green)]" : "hover:bg-white/[0.06]"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors duration-300 ${
                        isSelected
                          ? "bg-[var(--green)] text-black"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {c.avatarText}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white truncate">{c.name}</span>
                        <span className="text-[10px] text-white/65">{c.time}</span>
                      </div>
                      <p className="text-[11px] text-white/65 truncate mt-0.5">{c.lastMessage}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-[9px] font-mono bg-black/40 text-[var(--green)] px-1.5 py-0.5 rounded">
                          {c.activeOrder.id}
                        </span>
                        <span className="text-[9px] text-white/65 font-medium">
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
          <div className="ib-pane-conversation min-w-0 lg:col-span-5 flex flex-col bg-[var(--wa-canvas)] border-r border-white/10">
            {/* Chat Header */}
            <div className="p-3.5 bg-[var(--wa-toolbar)] border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 shrink-0 rounded-full bg-[var(--green)] text-black flex items-center justify-center font-bold text-xs">
                  {activeCustomer.avatarText}
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex flex-wrap items-center gap-1.5">
                    <span>{activeCustomer.name}</span>
                    <span className="text-[10px] text-white/65 font-mono">({activeCustomer.phone})</span>
                  </div>
                  <div className="text-[10px] text-[var(--green)] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
                    <span>WhatsApp verified</span>
                  </div>
                </div>
              </div>

              {/* 24h Window Badge */}
              <div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap bg-[var(--wa-panel)] px-2.5 py-1 rounded-full border border-white/10">
                <span className="text-[10px] text-white/75 font-medium">24h Window:</span>
                <span className="text-[10px] font-mono font-bold text-[var(--green)]">
                  {activeCustomer.careWindowHours}h {activeCustomer.careWindowMins}m
                </span>
              </div>
            </div>

            {/* Chat Bubbles */}
            <div key={activeCustomer.id} className="ib-swap flex-1 p-4 overflow-y-auto space-y-3 bg-[radial-gradient(var(--wa-border)_1px,transparent_1px)] [background-size:16px_16px]">
              <div className="text-center">
                <span className="bg-[var(--wa-panel)] text-[#8696A0] text-[10px] font-semibold px-3 py-1 rounded-md border border-white/5">
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
            <div className="p-3 bg-[var(--wa-toolbar)] border-t border-white/10 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="min-h-11 lg:min-h-0 px-2.5 py-1 rounded-lg bg-[var(--wa-panel)] text-white/75 text-[11px] font-medium border border-white/10 hover:text-white"
                >
                  Canned replies (/...)
                </button>
                <button
                  type="button"
                  className="min-h-11 lg:min-h-0 px-2.5 py-1 rounded-lg bg-[var(--wa-panel)] text-white/75 text-[11px] font-medium border border-white/10 hover:text-white"
                >
                  Meta template
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  aria-label="Demo message"
                  placeholder="Type a message or press '/' for quick replies..."
                  className="min-w-0 min-h-11 lg:min-h-0 flex-1 bg-[var(--inbox-composer)] rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/65 outline-none border border-white/40 focus:border-[var(--green)] max-lg:text-base"
                />
                <button
                  type="button"
                  aria-label="Send"
                  className="size-11 shrink-0 lg:size-8 rounded-full bg-[var(--green)] text-black flex items-center justify-center font-bold text-xs hover:scale-105 transition-transform"
                >
                  ➔
                </button>
              </div>
            </div>
          </div>

          {/* Right Pane: Shopify Customer Profile Drawer (3.5 cols) */}
          <div className="ib-pane-orders min-w-0 lg:col-span-3 flex flex-col bg-white/[0.04] p-4 space-y-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="text-xs font-display font-bold text-white flex items-center gap-2">
                <span>Shopify customer profile</span>
              </div>
              <span className="text-[10px] font-mono text-[var(--green)] bg-[var(--green)]/10 px-2 py-0.5 rounded">Live sync</span>
            </div>

            {/* Drawer Tabs */}
            <div className="flex rounded-full bg-black/25 p-1 border border-white/10">
              {(["overview", "media", "docs"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setDrawerTab(tab)}
                  aria-pressed={drawerTab === tab}
                  className={`flex-1 min-h-11 lg:min-h-0 py-1 rounded-full text-[10px] font-bold capitalize transition-colors duration-300 ${
                    drawerTab === tab ? "bg-white/10 text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {drawerTab === "overview" && (
              <div key={`${activeCustomer.id}-overview`} className="ib-swap space-y-4">
                {/* Lifetime Metrics */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-3 bg-black/25 rounded-xl border border-white/10">
                    <span className="text-[9px] font-bold text-white/65 block">Lifetime value</span>
                    <strong className="text-sm font-display font-bold tabular-nums text-[var(--green)]">{activeCustomer.totalSpent}</strong>
                  </div>
                  <div className="p-3 bg-black/25 rounded-xl border border-white/10">
                    <span className="text-[9px] font-bold text-white/65 block">Total orders</span>
                    <strong className="text-sm font-display font-bold tabular-nums text-white">{activeCustomer.ordersCount}</strong>
                  </div>
                </div>

                {/* Active Order Card */}
                <div className="p-3.5 bg-black/25 rounded-xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{activeCustomer.activeOrder.id}</span>
                    <span className="text-[10px] font-bold text-[var(--green)] bg-[var(--green)]/10 px-2 py-0.5 rounded-full">
                      {activeCustomer.activeOrder.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/75">{activeCustomer.activeOrder.items}</p>
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/65 pt-1 border-t border-white/5">
                    <span>Total: {activeCustomer.activeOrder.total}</span>
                    <span className="text-[var(--green)]">Sample order</span>
                  </div>
                </div>

                {/* Customer Tags */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-white/65">Shopify customer tags</span>
                  <div className="flex flex-wrap gap-1">
                    {activeCustomer.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/75 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {drawerTab === "media" && (
              <div className="ib-swap space-y-2 text-center text-white/65 text-xs py-8">
                <div>3 photos received from customer</div>
              </div>
            )}

            {drawerTab === "docs" && (
              <div className="ib-swap space-y-2 text-xs">
                <div className="p-2.5 bg-black/25 rounded-lg border border-white/10 flex items-center justify-between">
                  <span className="text-white/75 font-mono">Invoice-1042.pdf</span>
                  <span className="text-[var(--green)] text-[10px]">Download</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
