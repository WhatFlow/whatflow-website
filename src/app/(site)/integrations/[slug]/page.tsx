import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { getIntegration, INTEGRATION_CATEGORY_LABELS, type Integration } from "@/lib/payload-api";
import { DEFAULT_INTEGRATIONS_BY_SLUG } from "@/lib/integrations-data";
import { getShopifyAppUrl } from "@/lib/shopify-app";
import { PageHero, Section } from "@/components/site/PageKit";
import "../integrations.css";

interface IntegrationPageProps {
  params: Promise<{ slug: string }>;
}

const FALLBACK_INTEGRATIONS_MAP = DEFAULT_INTEGRATIONS_BY_SLUG;

export async function generateMetadata({ params }: IntegrationPageProps): Promise<Metadata> {
  const { slug } = await params;
  let integration: Integration | null = null;
  try {
    integration = await getIntegration(slug);
  } catch {
    integration = null;
  }
  const item = integration || (FALLBACK_INTEGRATIONS_MAP[slug] as Integration | undefined);

  if (!item) {
    return { title: "Integration Not Found" };
  }

  return {
    alternates: { canonical: `/integrations/${slug}` },
    title: `${item.name} WhatsApp Integration for Shopify`,
    description: item.description,
  };
}

export default async function IntegrationDetailPage({ params }: IntegrationPageProps) {
  const { slug } = await params;

  let integration: Integration | null = null;
  try {
    integration = await getIntegration(slug);
  } catch {
    integration = null;
  }

  const item = integration || (FALLBACK_INTEGRATIONS_MAP[slug] as Integration | undefined);

  if (!item) {
    notFound();
  }

  const trackingSlug = item.slug.replace(/[^a-z0-9]/g, "_");

  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <PageHero
        title={item.name}
        sub={<p><b className="wf-leadin">{INTEGRATION_CATEGORY_LABELS[item.category] ?? item.category}.</b> {item.tagline}</p>}
        actions={
          <>
            <Link
              href={getShopifyAppUrl(`integration_header_${trackingSlug}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="wf-btn wf-btn-green"
            >
              Install WhatFlow for Shopify
            </Link>
            <Link href="/integrations" className="wf-btn wf-btn-ghost">
              All integrations
            </Link>
          </>
        }
        meta={
          <>
            <nav aria-label="Breadcrumb" className="int-crumbs">
              <Link href="/">Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/integrations">Integrations</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{item.name}</span>
            </nav>
            <span className="wf-pill">Official connector</span>
          </>
        }
      >
        <div className="int-link" aria-hidden="true">
          <span className="int-link-node">
            {item.logo?.url ? (
              <Image src={item.logo.url} alt="" width={72} height={72} className="object-contain" />
            ) : (
              item.name.charAt(0)
            )}
          </span>
          <span className="int-link-wire" />
          <span className="int-link-node">
            <Image src="/brand/whatflow-mark.webp" unoptimized alt="" width={72} height={72} className="int-wf" />
          </span>
        </div>
      </PageHero>

      <Section tone="paper">
        <div className="int-layout">
          <div className="grid gap-5">
            <div className="wf-card" data-reveal>
              <h2 className="font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.04em]">About the integration</h2>
              <p className="int-about">{item.description}</p>

              {item.keyFeatures && item.keyFeatures.length > 0 && (
                <div className="mt-8">
                  <h3 className="int-subhead">Key capabilities</h3>
                  <div className="int-feature-grid">
                    {item.keyFeatures.map((f) => (
                      <div key={f.feature}>
                        <span className="int-check" aria-hidden="true">✓</span>
                        <span>{f.feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="wf-card" data-reveal style={{ "--d": "80ms" } as CSSProperties}>
              <h2 className="font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.04em]">How it works (setup in 2 minutes)</h2>
              <ol className="int-steps">
                <li>Install WhatFlow from the Shopify App Store and connect your WhatsApp Business Account.</li>
                <li>Go to the <strong>Integrations</strong> tab inside your WhatFlow dashboard and enable {item.name}.</li>
                <li>Choose your preferred message templates and automated trigger events.</li>
                <li>Your store is ready to send live automated WhatsApp updates!</li>
              </ol>
            </div>
          </div>

          <aside className="int-side">
            <div className="wf-card" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
              <h2 className="font-display text-[1.3rem] font-bold tracking-[-0.03em]">Integration details</h2>
              <dl className="int-dl">
                <div>
                  <dt>Developer</dt>
                  <dd>WhatFlow Official</dd>
                </div>
                <div>
                  <dt>Compatibility</dt>
                  <dd>All Shopify &amp; Shopify Plus stores</dd>
                </div>
                <div>
                  <dt>Meta API engine</dt>
                  <dd className="text-[var(--green-deep)]">Official Cloud API (v25.0)</dd>
                </div>
              </dl>
            </div>

            <div className="wf-card int-trial" data-reveal style={{ "--d": "180ms" } as CSSProperties}>
              <h2 className="font-display text-[1.5rem] font-bold leading-[1.1] tracking-[-0.035em]">Ready to set up {item.name}?</h2>
              <p>Paid plans start with a 7-day free trial, and there is a free plan.</p>
              <Link
                href={getShopifyAppUrl(`integration_sidebar_${trackingSlug}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="wf-btn wf-btn-green mt-5 w-full"
              >
                Install free trial
              </Link>
            </div>
          </aside>
        </div>
      </Section>
    </div>
  );
}
