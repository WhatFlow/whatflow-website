import type { CSSProperties } from "react";
import Image from "next/image";
import { getShopifyAppUrl } from "@/lib/shopify-app";
import { PageHero } from "@/components/site/PageKit";

const SPECS = [
  { value: "No fees", label: "Per inbox seat", accent: true },
  { value: "11 types", label: "WhatsApp bubbles" },
  { value: "1-click", label: "Shopify access", accent: true },
  { value: "24-hour", label: "Meta care window" },
];

export function InboxHero() {
  return (
    <PageHero
      tone="dark"
      title="A WhatsApp team inbox for Shopify."
      sub={
        <p>
          Reply to customers and see their Shopify orders in one workspace, with no per-seat fees.
        </p>
      }
      actions={
        <>
          <a
            href={getShopifyAppUrl("inbox_hero_cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="wf-btn wf-btn-green"
          >
            Install on Shopify free
          </a>
          <a href="#live-mock" className="wf-btn wf-btn-ghost">
            Try the interactive demo
          </a>
        </>
      }
      meta={
        <>
          <span className="inline-flex items-center gap-2 text-white/80">
            <Image
              src="/brand/meta-lockup.webp" unoptimized
              width={38}
              height={12}
              alt="Meta"
              className="h-3 w-auto invert"
            />
            Official Cloud API engine
          </span>
          <span className="text-white/80">All features on every plan</span>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {SPECS.map((spec, index) => (
          <div
            key={spec.label}
            className="ib-hero-spec rounded-[24px] border border-white/10 bg-white/[0.04] p-3 sm:p-7 backdrop-blur-sm transition-colors duration-300 hover:border-[var(--green)]/40"
            style={index % 2 ? ({ "--ib-spec-offset": "28px" } as CSSProperties) : undefined}
          >
            <div className={`font-display text-2xl sm:text-4xl font-bold tracking-[-0.04em] tabular-nums ${spec.accent ? "text-[var(--green)]" : "text-white"}`}>
              {spec.value}
            </div>
            <div className="mt-2 text-sm font-semibold text-white/65">{spec.label}</div>
          </div>
        ))}
      </div>
    </PageHero>
  );
}
