import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./blocks.css";

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
    tip: { defaultTitle: "Pro tip" },
    info: { defaultTitle: "Note" },
    warning: { defaultTitle: "Heads up" },
    alert: { defaultTitle: "Important" },
  };

  const key = type in configs ? type : "tip";
  const cfg = configs[key];

  return (
    <aside className="wfrt wfrt-callout not-prose" data-type={key}>
      <span className="wfrt-callout-title">{title || cfg.defaultTitle}</span>
      <div className="wfrt-callout-body">{message}</div>
    </aside>
  );
}

// ─── 2. CTA Banner Block ─────────────────────────────────────────────────────
export function CtaRenderer({
  heading,
  description,
  buttonText = "Get started",
  buttonUrl = "/#products",
  badge = "Free plan available",
  style = "green",
}: {
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  badge?: string;
  style?: "green" | "dark" | "white";
}) {
  const styleKey = style === "dark" || style === "white" ? style : "green";
  const button = { green: "wf-btn-dark", dark: "wf-btn-green", white: "wf-btn-green" }[styleKey];

  return (
    <div className="wfrt wfrt-cta not-prose" data-style={styleKey}>
      <h3>{heading}</h3>
      {(badge || description) && (
        <p>
          {badge && <b className="wf-leadin">{/[.!?]$/.test(badge.trim()) ? badge.trim() : `${badge.trim()}.`}</b>}
          {badge && description && " "}
          {description}
        </p>
      )}
      <Link
        href={buttonUrl}
        target={buttonUrl.startsWith("http") ? "_blank" : undefined}
        rel={buttonUrl.startsWith("http") ? "noopener noreferrer" : undefined}
        className={`wf-btn ${button}`}
      >
        {buttonText}
      </Link>
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
  buttonText = "Confirm order",
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
    <div className="wfrt not-prose">
      <div className="wfrt-phone">
        {/* WhatsApp Chat Header */}
        <div className="wfrt-phone-head">
          <div className="flex items-center gap-2.5">
            <div className="wfrt-phone-avatar">{storeName.charAt(0)}</div>
            <div>
              <div className="flex items-center gap-1 text-sm font-bold">
                <span>{storeName}</span>
                {verified && <span className="text-[var(--green)]" aria-label="Verified">✓</span>}
              </div>
              <div className="text-[11px] text-white/65">Official business account</div>
            </div>
          </div>
          <span className="text-white text-sm font-bold" aria-hidden="true">⋮</span>
        </div>

        {/* Message Body */}
        <div className="wfrt-phone-body">
          <div className="wfrt-bubble">
            <p className="whitespace-pre-line">
              {message || `Hi ${customerName}, thanks for your order!`}
            </p>

            {orderSummary && (
              <div className="wfrt-order">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                <span>{orderSummary}</span>
              </div>
            )}

            {buttonText && (
              <button type="button" className="wfrt-reply">
                {buttonText}
              </button>
            )}

            <div className="text-[11px] text-right text-[var(--text-muted-alt)] font-semibold">{time} ✓✓</div>
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
    <div className="wfrt not-prose">
      <div className="wfrt-stat">
        <span className="wfrt-stat-value">{value}</span>
        <span className="wfrt-stat-label">{label}</span>
        {description && <span className="wfrt-stat-note">{description}</span>}
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
    <figure className="wfrt not-prose">
      <div className="wfrt-frame" data-kind="video">
        <iframe
          src={embedUrl}
          title={caption || "Video Embed"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
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
    <div className="wfrt not-prose">
      <div className="wfrt-code">
        {filename && (
          <div className="wfrt-code-head">
            <span>{filename}</span>
            <span>{language}</span>
          </div>
        )}
        <pre>
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Payload upload nodes are untyped.
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
    left: "sm:float-left sm:mr-6 sm:mb-4 sm:max-w-sm",
    right: "sm:float-right sm:ml-6 sm:mb-4 sm:max-w-sm",
    center: "mx-auto block max-w-2xl",
    full: "w-full",
  };

  return (
    <figure className={`wfrt not-prose ${alignStyles[alignment as keyof typeof alignStyles] || alignStyles.center}`}>
      <div className="wfrt-frame">
        <Image
          src={url}
          alt={alt}
          width={value?.width || 1200}
          height={value?.height || 700}
          priority={Boolean(fields?.priority)}
          className="w-full h-auto object-cover"
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}


export function ScreenshotRenderer({ url, alt, caption, sourceUrl, width = 1440, height = 900, priority = false }: {
  url?: string; alt?: string; caption?: string; sourceUrl?: string; width?: number; height?: number;
  /** Set by markFirstImagePriority when this is the first image the article renders. */
  priority?: boolean;
}) {
  if (!url) return null;
  return <figure className="wfrt not-prose">
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label="Open full-size screenshot" className="wfrt-frame">
      {/* Screenshots are editable CMS URLs, including owned local assets. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={alt || "Workflow screenshot"} width={width} height={height} loading={priority ? undefined : "lazy"} fetchPriority={priority ? "high" : undefined} className="w-full h-auto" />
    </a>
    {(caption || sourceUrl) && <figcaption>{caption}{sourceUrl && <> <a href={sourceUrl} rel="noopener noreferrer">Source</a></>}</figcaption>}
  </figure>;
}

/**
 * For articles without a cover image, the first image in the body is the page's
 * first image, so it should load eagerly. Returns a copy of the Lexical content
 * with `priority: true` set on the first upload or screenshot node; later images
 * stay lazy.
 */
export function markFirstImagePriority<T>(content: T): T {
  if (!content || typeof content !== "object") return content;
  const copy = structuredClone(content);
  type LexicalNode = { type?: string; value?: { url?: unknown } | null; fields?: Record<string, unknown> | null; children?: LexicalNode[] };
  const visit = (node: LexicalNode | undefined): boolean => {
    if (!node || typeof node !== "object") return false;
    const isUpload = node.type === "upload" && Boolean(node.value?.url || node.fields?.url);
    const isScreenshot = node.type === "block" && node.fields?.blockType === "screenshot" && Boolean(node.fields?.url);
    if (isUpload || isScreenshot) {
      node.fields = { ...(node.fields || {}), priority: true };
      return true;
    }
    return Array.isArray(node.children) && node.children.some(visit);
  };
  visit((copy as { root?: LexicalNode }).root);
  return copy;
}
