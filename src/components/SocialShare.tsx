"use client";

import { useState } from "react";

interface SocialShareProps {
  url?: string;
  title: string;
  className?: string;
}

export function SocialShare({ url, title, className = "" }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const currentUrl =
    url || (typeof window !== "undefined" ? window.location.href : "https://whatflow.io");

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=whatflow`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  return (
    <div className={`flex items-center gap-2.5 flex-wrap ${className}`}>
      <span className="text-xs font-extrabold uppercase tracking-wider text-black mr-1">
        Share:
      </span>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="neo-btn bg-[#00D261] text-black px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 hover:scale-105 transition-transform"
        title="Share on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84-1.56 1.56-3.64 2.42-5.83 2.42-1.45 0-2.88-.39-4.14-1.12l-.3-.17-3.08.81.82-3-.19-.31a8.17 8.17 0 01-1.25-4.47c0-4.54 3.7-8.24 8.15-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.39-1.74-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8 2.53 1.09 2.53.73 2.99.68.46-.04 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.18-.07-.1-.23-.17-.48-.29z" />
        </svg>
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
