import React from "react";
import Image from "next/image";
import Link from "next/link";

// ─── 1. Callout / Alert Block ────────────────────────────────────────────────
export function CalloutRenderer({
  type = "tip",
  title,
  message,
}: {
  type?: "tip" | "info" | "warning" | "alert";
  title?: string;
  message?: string;
}) {
  const configs = {
    tip: {
      bg: "bg-[#E8F8F0]",
      border: "border-black",
      badgeBg: "bg-[#00D261]",
      badgeText: "text-black",
      defaultTitle: "PRO TIP",
    },
    info: {
      bg: "bg-[#E8F0FF]",
      border: "border-black",
      badgeBg: "bg-[#2563EB]",
      badgeText: "text-white",
      defaultTitle: "NOTE",
    },
    warning: {
      bg: "bg-[#FFF9E6]",
      border: "border-black",
      badgeBg: "bg-[#FFC107]",
      badgeText: "text-black",
      defaultTitle: "HEADS UP",
    },
    alert: {
      bg: "bg-[#FFEBEB]",
      border: "border-black",
      badgeBg: "bg-[#FF4B4B]",
      badgeText: "text-white",
      defaultTitle: "IMPORTANT",
    },
  };

  const cfg = configs[type] || configs.tip;

  return (
    <div className={`neo-box ${cfg.bg} p-5 sm:p-6 rounded-xl my-6 space-y-2 relative overflow-hidden not-prose`}>
      <div className="flex items-center gap-2">
        <span className={`neo-pill ${cfg.badgeBg} ${cfg.badgeText} px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider flex items-center gap-1`}>
          <span>{title || cfg.defaultTitle}</span>
        </span>
      </div>
      <div className="text-xs sm:text-sm font-medium text-black leading-relaxed whitespace-pre-line">
        {message}
      </div>
    </div>
  );
}

// ─── 2. CTA Banner Block ─────────────────────────────────────────────────────
export function CtaRenderer({
  heading,
  description,
  buttonText = "Get Started ➔",
  buttonUrl = "/#products",
  badge = "14-Day Free Trial",
  style = "green",
}: {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  badge?: string;
  style?: "green" | "dark" | "white";
}) {
  const styles = {
    green: {
      bg: "bg-[#00D261]",
      text: "text-black",
      subText: "text-black/80",
      btnBg: "bg-black text-[#00D261] hover:bg-[#091E17]",
      badgeBg: "bg-black text-[#00D261]",
    },
    dark: {
      bg: "bg-[#091E17]",
      text: "text-white",
      subText: "text-gray-300",
      btnBg: "bg-[#00D261] text-black hover:bg-white",
      badgeBg: "bg-[#00D261] text-black",
    },
    white: {
      bg: "bg-white",
      text: "text-black",
      subText: "text-gray-700",
      btnBg: "bg-[#00D261] text-black hover:bg-black hover:text-white",
      badgeBg: "bg-[#FFF3CD] text-[#856404]",
    },
  };

  const currentStyle = styles[style] || styles.green;

  return (
    <div className={`neo-box ${currentStyle.bg} p-6 sm:p-8 rounded-2xl my-8 space-y-4 not-prose`}>
      {badge && (
        <div className={`neo-pill inline-block ${currentStyle.badgeBg} px-3 py-0.5 text-[10px] font-black uppercase tracking-wider`}>
          {badge}
        </div>
      )}
      <h3 className={`font-display font-black text-2xl sm:text-3xl uppercase tracking-tight leading-tight ${currentStyle.text}`}>
        {heading}
      </h3>
      {description && (
        <p className={`text-xs sm:text-sm font-medium leading-relaxed max-w-xl ${currentStyle.subText}`}>
          {description}
        </p>
      )}
      <div className="pt-2">
        <Link
          href={buttonUrl}
          target={buttonUrl.startsWith("http") ? "_blank" : undefined}
          rel={buttonUrl.startsWith("http") ? "noopener noreferrer" : undefined}
          className={`neo-btn ${currentStyle.btnBg} px-6 py-3 rounded-lg text-xs font-black uppercase tracking-wider inline-block transition-transform`}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

// ─── 3. WhatsApp Chat Mockup Block ───────────────────────────────────────────
export function WhatsAppMockupRenderer({
  storeName = "Store",
  verified = true,
  customerName = "Alex",
  message,
  orderSummary,
  buttonText = "CONFIRM ORDER",
  time = "10:30 AM",
}: {
  storeName?: string;
  verified?: boolean;
  customerName?: string;
  message?: string;
  orderSummary?: string;
  buttonText?: string;
  time?: string;
}) {
  return (
    <div className="my-8 max-w-sm mx-auto not-prose">
      <div className="neo-box bg-white overflow-hidden rounded-2xl shadow-[6px_6px_0px_#000]">
        {/* WhatsApp Chat Header */}
        <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between border-b-2 border-black">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#00D261] border border-black flex items-center justify-center font-black text-xs text-black">
              {storeName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1 font-bold text-xs">
                <span>{storeName}</span>
                {verified && <span className="text-[#00D261]">✓</span>}
              </div>
              <div className="text-[9px] text-[#A7F3D0]">Official Business Account</div>
            </div>
          </div>
          <span className="text-white text-xs font-bold">⋮</span>
        </div>

        {/* Message Body */}
        <div className="p-4 bg-[#EFEAE2] space-y-3 min-h-[160px] text-xs">
          <div className="bg-[#E7FCE9] border border-black p-3 rounded-lg space-y-2 shadow-sm">
            <p className="font-medium text-black text-xs leading-relaxed whitespace-pre-line">
              {message || `Hi ${customerName}, thanks for your order!`}
            </p>

            {orderSummary && (
              <div className="bg-white border border-black p-2 rounded flex items-center gap-2 text-[11px]">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                <span className="font-bold text-black">{orderSummary}</span>
              </div>
            )}

            {buttonText && (
              <div className="pt-1">
                <button
                  type="button"
                  className="w-full py-2 bg-white hover:bg-[#E7FCE9] border border-black rounded font-black text-[11px] text-[#0A6B56] transition-colors"
                >
                  {buttonText}
                </button>
              </div>
            )}

            <div className="text-[9px] text-right text-gray-500 font-bold">{time} ✓✓</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. Stat Highlight Block ─────────────────────────────────────────────────
export function StatHighlightRenderer({
  value,
  label,
  description,
}: {
  value?: string;
  label?: string;
  description?: string;
}) {
  return (
    <div className="my-8 not-prose">
      <div className="neo-box bg-[#00D261] p-6 sm:p-8 rounded-2xl text-center space-y-2 max-w-md mx-auto shadow-[6px_6px_0px_#000]">
        <div className="font-display font-black text-4xl sm:text-5xl text-black leading-none tracking-tight">
          {value}
        </div>
        <div className="font-display font-black text-sm sm:text-base uppercase tracking-wider text-black">
          {label}
        </div>
        {description && (
          <div className="text-xs font-bold text-black/70 mt-1">{description}</div>
        )}
      </div>
    </div>
  );
}

// ─── 5. Video Embed Block ────────────────────────────────────────────────────
export function VideoEmbedRenderer({
  url,
  caption,
}: {
  url?: string;
  caption?: string;
}) {
  if (!url) return null;

  // Convert YouTube / Vimeo / Loom to embed URL
  let embedUrl = url;
  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes("loom.com/share/")) {
    const loomId = url.split("loom.com/share/")[1]?.split("?")[0];
    embedUrl = `https://www.loom.com/embed/${loomId}`;
  }

  return (
    <figure className="my-8 not-prose">
      <div className="neo-box bg-black overflow-hidden rounded-xl aspect-video border-[2.5px] border-black shadow-[6px_6px_0px_#000]">
        <iframe
          src={embedUrl}
          title={caption || "Video Embed"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-xs font-bold text-gray-500 mt-2 uppercase tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─── 6. Code Snippet Block ───────────────────────────────────────────────────
export function CodeSnippetRenderer({
  filename,
  language = "liquid",
  code,
}: {
  filename?: string;
  language?: string;
  code?: string;
}) {
  return (
    <div className="my-6 not-prose">
      <div className="neo-box bg-[#091E17] text-white rounded-xl overflow-hidden border-[2.5px] border-black shadow-[4px_4px_0px_#000]">
        {filename && (
          <div className="bg-[#05120E] px-4 py-2 border-b border-black flex items-center justify-between text-xs font-bold">
            <span className="text-[#00D261] font-mono">{filename}</span>
            <span className="text-[10px] text-gray-400 uppercase font-mono">{language}</span>
          </div>
        )}
        <pre className="p-4 text-xs font-mono overflow-x-auto text-[#00D261] leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

// ─── 7. Upload / Inline Image Renderer ───────────────────────────────────────
export function InlineUploadRenderer({
  node,
}: {
  node: any;
}) {
  const value = node?.value || {};
  const fields = node?.fields || {};

  const url = value?.url || fields?.url;
  const alt = fields?.altText || value?.alt || "Article illustration";
  const caption = fields?.caption;
  const alignment = fields?.alignment || "center";

  if (!url) return null;

  const alignStyles = {
    left: "float-left mr-6 mb-4 max-w-sm",
    right: "float-right ml-6 mb-4 max-w-sm",
    center: "mx-auto block max-w-2xl",
    full: "w-full",
  };

  return (
    <figure className={`my-8 not-prose ${alignStyles[alignment as keyof typeof alignStyles] || alignStyles.center}`}>
      <div className="neo-box overflow-hidden rounded-xl bg-white border-[2.5px] border-black shadow-[5px_5px_0px_#000]">
        <Image
          src={url}
          alt={alt}
          width={value?.width || 1200}
          height={value?.height || 700}
          className="w-full h-auto object-cover"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-xs font-bold text-gray-500 mt-2 uppercase tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
