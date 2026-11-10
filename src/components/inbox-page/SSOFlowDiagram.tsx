import type { CSSProperties } from "react";
import { Hl, Section, SectionHead } from "@/components/site/PageKit";

const STEPS = [
  {
    title: "Shopify Admin launch",
    body: "Staff members open the inbox in 1 click directly from the Shopify Admin sidebar.",
    tag: "1-click launch",
  },
  {
    title: "Verified store security",
    body: "Automatically verifies store ownership and staff permissions with end-to-end encryption.",
    tag: "Encrypted authorization",
  },
  {
    title: "Multi-agent workspace",
    body: "Your whole support team collaborates in real time with shared conversation assignments.",
    tag: "Team collaboration",
  },
];

export function SSOFlowDiagram() {
  return (
    <Section tone="paper">
      <SectionHead
        center
        kicker="Enterprise access"
        title={<>1-click <Hl>Shopify login.</Hl></>}
        sub="Zero passwords to manage. Your customer support agents launch the dedicated WhatFlow Inbox directly from Shopify Admin with instant, secure authentication."
      />

      <ol className="wf-grid wf-grid-3 mt-14 list-none p-0">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="wf-card relative gap-4"
            data-hover
            data-reveal
            style={{ "--d": `${index * 90}ms` } as CSSProperties}
          >
            <div className="flex items-center justify-between">
              <span className="ib-step" data-on={index === 1 ? "" : undefined}>{index + 1}</span>
              {index < STEPS.length - 1 && (
                <span aria-hidden="true" className="hidden lg:block text-2xl text-[var(--green-rich)]">→</span>
              )}
            </div>
            <h3>{step.title}</h3>
            <p className="mt-0!">{step.body}</p>
            <span className="wf-pill self-start mt-auto">{step.tag}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
