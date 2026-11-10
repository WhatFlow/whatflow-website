import type { CSSProperties } from "react";
import { Section, SectionHead } from "@/components/site/PageKit";

const UPCOMING = [
  {
    status: "Upcoming",
    title: "Dynamic audience sync",
    body: "Planned synchronization between Shopify customer segments and WhatFlow broadcast audiences.",
  },
  {
    status: "Planned",
    title: "AI agent copilot",
    body: "No built-in AI in the inbox yet. Today you can connect Claude, ChatGPT or Cursor through the WhatFlow MCP connector to draft replies for a person to approve. Native suggested replies are planned.",
  },
];

export function InboxRoadmap() {
  return (
    <>
      <section aria-labelledby="catalog-sharing-heading" className="wf-section pb-0!" data-tone="paper">
        <div className="wf-shell">
          <div
            className="relative overflow-hidden rounded-[28px] border-[2.5px] border-[var(--ink)] bg-[var(--green)] p-8 sm:p-12 shadow-[8px_8px_0_var(--ink)]"
            data-reveal
          >
            <h2 id="catalog-sharing-heading" className="wf-h2 max-w-[16ch]">Share your product catalog in chat.</h2>
            <p className="wf-lead text-[var(--ink)]!">
              <b className="wf-leadin">Available now.</b> Share products from your Meta catalog in customer conversations, without leaving WhatFlow Inbox.
            </p>
          </div>
        </div>
      </section>

      <Section tone="paper">
        <SectionHead
          center
          kicker="Upcoming"
          title="Up next for WhatFlow Inbox."
          sub="Audience sync and AI assistance are planned enhancements. They are not available in the current inbox."
        />

        <div className="wf-grid wf-grid-2 mt-14 max-w-5xl mx-auto">
          {UPCOMING.map((item, index) => (
            <div key={item.title} className="wf-card gap-3" data-reveal style={{ "--d": `${index * 90}ms` } as CSSProperties}>
              <span className="wf-pill self-start">{item.status}</span>
              <h3 className="mt-2!">{item.title}</h3>
              <p className="mt-0!">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
