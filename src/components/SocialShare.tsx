"use client";

import { useState } from "react";
import Image from "next/image";

interface SocialShareProps {
  url?: string;
  title: string;
  className?: string;
}

export function SocialShare({ url, title, className = "" }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const currentUrl =
    url || (typeof window !== "undefined" ? window.location.href : "https://whatflow.tech");

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=whatflow`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      <span className="text-xs font-extrabold uppercase text-gray-500 tracking-wider mr-1">
        SHARE:
      </span>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="neo-btn bg-[#00D261] text-black px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 hover:scale-105 transition-transform"
        title="Share on WhatsApp"
      >
        <Image
          src="/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_Black_RGB_2026.svg"
          width={15}
          height={15}
          alt="WhatsApp"
          className="object-contain"
        />
        <span>WhatsApp</span>
      </a>

      {/* X / Twitter */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="neo-btn bg-black text-white px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 hover:scale-105 transition-transform"
        title="Share on X (Twitter)"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span>Post</span>
      </a>

      {/* LinkedIn */}
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="neo-btn bg-[#0A66C2] text-white px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 hover:scale-105 transition-transform"
        title="Share on LinkedIn"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
        <span>Share</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="neo-btn bg-white text-black px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 hover:bg-[#FAF7F0] transition-colors"
        title="Copy Link"
      >
        {copied ? (
          <span className="text-[#00D261]">✓</span>
        ) : (
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        )}
        <span>{copied ? "COPIED!" : "COPY LINK"}</span>
      </button>
    </div>
  );
}
