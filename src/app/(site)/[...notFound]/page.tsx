import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist on WhatFlow.",
};

export default function CatchAllNotFound() {
  return (
    <div className="min-h-[80vh] bg-[#FAF7F0] flex items-center justify-center px-4 py-16 sm:py-24">
      <div className="max-w-[700px] w-full text-center space-y-8">
        {/* Large 404 Neo-Brutalist Heading */}
        <div className="relative inline-block">
          <h1 className="text-[100px] sm:text-[150px] font-display font-black leading-none uppercase text-black tracking-tighter">
            4<span className="text-stroke-green">0</span>4
          </h1>
          <div className="absolute -top-3 -right-6 sm:-right-10 rotate-12 neo-pill bg-[#FFC107] text-black px-3.5 py-1 text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000]">
            LOST MESSAGE
          </div>
        </div>

        {/* WhatsApp Simulator Style Undelivered Message Box */}
        <div className="max-w-[420px] mx-auto neo-box bg-[#091E17] p-5 rounded-2xl text-left border-[2.5px] border-black space-y-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF4B4B] border-2 border-black flex items-center justify-center font-black text-[12px] text-white">
              ✕
            </div>
            <div>
              <div className="text-xs font-black text-white uppercase tracking-wider">
                System Alert
              </div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Status: Undelivered
              </div>
            </div>
          </div>

          <div className="bg-[#1f2c34]/50 border border-black p-3.5 rounded-xl space-y-2.5 text-white">
            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              We tried sending your requested page, but it returned a <span className="text-[#FFC107] font-black">404 Error</span>.
            </p>
            <p className="text-[11px] text-gray-400 font-bold leading-normal">
              The link might be broken, or the page has been permanently relocated.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-gray-400">
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.5]"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>DISCONNECTED</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-display font-black uppercase text-black">
            Where to go next?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="neo-btn w-full sm:w-auto bg-[#00D261] text-black font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-[4px_4px_0px_#000] hover:scale-105 transition-transform text-center"
            >
              GO BACK HOME ➔
            </Link>
            <Link
              href="/solutions"
              className="neo-btn w-full sm:w-auto bg-white text-black font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-[4px_4px_0px_#000] hover:scale-105 transition-transform text-center"
            >
              VIEW SOLUTIONS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
