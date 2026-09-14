"use client";

import React, { useState } from "react";
import { getShopifyAppUrl } from "@/lib/shopify-app";

interface RoadmapItem {
  id: string;
  title: string;
  category: string;
  votes: number;
  status: "shipped" | "in_progress" | "planned";
  desc: string;
}

const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    id: "1",
    title: "11-Status Granular Fulfillment Journey",
    category: "Automations",
    votes: 384,
    status: "shipped",
    desc: "End-to-end tracking triggers from label purchased to out-for-delivery and exceptions.",
  },
  {
    id: "2",
    title: "Shopify Functions COD Fee & Postal Blocklist",
    category: "Shopify Extensions",
    votes: 312,
    status: "shipped",
    desc: "Calculate dynamic cash-on-delivery handling surcharges and hide COD in high-RTO pincodes.",
  },
  {
    id: "3",
    title: "WhatsApp Interactive Flows (Native Forms)",
    category: "Interactivity",
    votes: 279,
    status: "in_progress",
    desc: "In-chat interactive multi-screen forms for returns, custom requests, and feedback surveys.",
  },
  {
    id: "4",
    title: "Meta Product Catalog & In-Chat Commerce",
    category: "Inbox & Sales",
    votes: 245,
    status: "planned",
    desc: "Browse live Shopify products, variant pickers, and checkout carts directly inside WhatsApp chats.",
  },
];

export function FeatureBoardRoadmap() {
  const [items, setItems] = useState<RoadmapItem[]>(ROADMAP_ITEMS);

  const handleVote = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, votes: item.votes + 1 } : item))
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#FAF7F0] border-b-[2.5px] border-black">
      <div className="max-w-[1280px] mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="neo-pill bg-[#00D261] text-black px-4 py-1 text-xs font-black uppercase tracking-wider inline-block">
            COMMUNITY-DRIVEN ROADMAP
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-black">
            BUILT WITH MERCHANTS, <span className="text-stroke-green">FOR MERCHANTS.</span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg font-medium">
            Have an automation idea? Vote on upcoming features on our public feature board.
            We ship new enhancements every single week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="neo-box bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] flex items-start gap-4"
            >
              <button
                type="button"
                onClick={() => handleVote(item.id)}
                className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-black bg-[#FAF7F0] hover:bg-[#00D261] transition-colors cursor-pointer group"
                title="Upvote this feature"
              >
                <span className="text-xs group-hover:scale-110 transition-transform">▲</span>
                <span className="text-sm font-black text-black font-display">{item.votes}</span>
                <span className="text-[9px] uppercase font-bold text-gray-500">Votes</span>
              </button>

              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                    {item.category}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      item.status === "shipped"
                        ? "bg-green-100 text-green-800"
                        : item.status === "in_progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {item.status === "shipped"
                      ? "● Shipped"
                      : item.status === "in_progress"
                      ? "● In Progress"
                      : "● Planned"}
                  </span>
                </div>

                <h3 className="font-display font-black text-base uppercase text-black">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={getShopifyAppUrl("feature_board_cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn inline-flex items-center gap-2 bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-[#00be57]"
          >
            <span>SUBMIT A FEATURE REQUEST ➔</span>
          </a>
        </div>
      </div>
    </section>
  );
}
