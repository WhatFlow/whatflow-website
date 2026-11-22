import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { PageHero, Section, SectionHead, Hl } from "@/components/site/PageKit";
import { getIntegrations, INTEGRATION_CATEGORY_LABELS, type Integration } from "@/lib/payload-api";
import { DEFAULT_INTEGRATIONS } from "@/lib/integrations-data";
import "./integrations.css";

export const metadata: Metadata = {
  alternates: { canonical: "/integrations" },
  title: "Integrations: Shopify Flow, Sidekick, Judge.me and MCP",
  description: "Connect WhatFlow to Shopify Flow, Shopify Sidekick, Judge.me review requests, your Meta catalog, webhooks, and Claude, ChatGPT or Cursor through MCP.",
};

interface IntegrationsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function IntegrationsPage({ searchParams }: IntegrationsPageProps) {
  const params = await searchParams;
  const selectedCategory = params.category ?? "all";

  let cmsIntegrations: Integration[] = [];
  try {
    const res = await getIntegrations({
      category: selectedCategory !== "all" ? selectedCategory : undefined,
    });
    cmsIntegrations = res.docs;
  } catch {
    cmsIntegrations = [];
  }

  // Combine CMS integrations with default fallback integrations
  const allIntegrations =
    cmsIntegrations.length > 0
      ? cmsIntegrations
      : (DEFAULT_INTEGRATIONS.filter(
        (item) => selectedCategory === "all" || item.category === selectedCategory
      ) as Integration[]);

  const categories = [
    { key: "all", label: "All integrations" },
    { key: "automation", label: "Automation" },
    { key: "reviews", label: "Reviews and UGC" },
    { key: "marketing", label: "Catalog" },
    { key: "support", label: "AI and support" },
  ];

  // Eight tiles around WhatFlow; empty slots stay dashed ("your app here").
  const orbit = (allIntegrations.length ? allIntegrations : (DEFAULT_INTEGRATIONS as Integration[])).slice(0, 8);

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <PageHero
        title="Connect WhatFlow with your entire stack."
        accent={["entire", "stack"]}
        sub={<p>Native integrations connect your Shopify store to reviews, helpdesks, marketing automation, and subscriptions.</p>}
        actions={
          <>
            <a href="#all-integrations" className="wf-btn wf-btn-green">Browse integrations</a>
            <a href="mailto:support@whatflow.tech" className="wf-btn wf-btn-ghost">Request an integration</a>
          </>
        }
      >
        <div className="int-orbit" aria-hidden="true">
          {Array.from({ length: 9 }, (_, index) => {
            if (index === 4) {
              return (
                <span key="core" className="int-orbit-core">
                  <Image src="/brand/whatflow-mark.webp" unoptimized alt="" width={64} height={64} />
                </span>
              );
            }
            const app = orbit[index < 4 ? index : index - 1];
            if (!app) return <span key={index} className="int-orbit-empty">+</span>;
            return (
              <span key={app.slug} className={`int-tone-${index % 5}`} style={{ "--d": `${index * -700}ms` } as CSSProperties}>
                <span>
                  {app.name.charAt(0)}
                  <small>{app.name}</small>
                </span>
              </span>
            );
          })}
        </div>
      </PageHero>

      <Section id="all-integrations" tone="paper">
        <SectionHead
          title={<>Plug WhatsApp into the apps you <Hl>already use</Hl>.</>}
        />

        {/* ─── Category filter ─── */}
        <nav aria-label="Integration categories" className="int-filter mt-10" data-reveal>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <Link
                key={cat.key}
                href={cat.key === "all" ? "/integrations" : `/integrations?category=${cat.key}`}
                aria-current={isActive ? "page" : undefined}
              >
                {cat.label}
              </Link>
            );
          })}
        </nav>

        {/* ─── Integrations grid ─── */}
        <div className="wf-grid wf-grid-3 mt-8">
          {allIntegrations.map((item, index) => (
            <Link
              key={item.slug}
              href={`/integrations/${item.slug}`}
              className={`wf-card int-tone-${index % 5}`}
              data-reveal
              style={{ "--d": `${(index % 3) * 80}ms` } as CSSProperties}
            >
              <span className="int-logo">
                {item.logo?.url ? (
                  <Image src={item.logo.url} alt={item.name} width={36} height={36} className="object-contain" />
                ) : (
                  item.name.charAt(0)
                )}
              </span>

              <h2 className="mt-6 font-display text-[1.6rem] font-bold leading-[1.05] tracking-[-0.035em]">{item.name}</h2>
              <p className="int-tagline"><b className="wf-leadin">{INTEGRATION_CATEGORY_LABELS[item.category] ?? item.category}.</b> {item.tagline}</p>
              <p className="line-clamp-3">{item.description}</p>

              {item.keyFeatures && item.keyFeatures.length > 0 && (
                <ul className="int-checks">
                  {item.keyFeatures.slice(0, 3).map((f) => (
                    <li key={f.feature}>
                      <span className="int-check" aria-hidden="true">✓</span>
                      <span>{f.feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <span className="int-card-cta">View integration guide</span>
            </Link>
          ))}
        </div>

        {/* ─── Request an integration ─── */}
        <div className="int-request mt-16" data-reveal>
          <div>
            <h2 className="wf-h2">Don&apos;t see your favorite app?</h2>
            <p>
              WhatFlow connects to any Shopify app through our native Shopify Flow triggers and webhooks. Reach out to request a dedicated native connector.
            </p>
          </div>
          <a href="mailto:support@whatflow.tech" className="wf-btn wf-btn-green self-start">
            Request an integration
          </a>
        </div>
      </Section>
    </div>
  );
}
