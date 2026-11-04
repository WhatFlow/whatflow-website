/**
 * Engineering post: moving WhatFlow from Gadget to Cloudflare.
 *
 * Facts come from the migration plans, parity audits and release notes in the
 * app repositories. Deliberately excluded: internal IDs and hostnames, secrets,
 * vendor/billing details, merchant-identifying data and security specifics.
 *
 * Inline syntax supported by the publisher: **bold** and [label](https://url).
 */

export type PostBlock =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { quote: string };

export const post = {
  slug: "migrating-whatflow-from-gadget-to-cloudflare",
  title: "How We Moved WhatFlow from Gadget to Cloudflare Workers",
  excerpt:
    "An engineering look at how we moved two Shopify apps, tens of thousands of store records and 22,000+ WhatsApp sessions from Gadget to Cloudflare Workers, D1 and Queues, and what we learned.",
  seoTitle: "Migrating a Shopify App from Gadget to Cloudflare Workers",
  seoDescription:
    "How WhatFlow moved two Shopify apps from Gadget to Cloudflare Workers, D1, Queues and Durable Objects: parity audits, verified data import, cutover and lessons learned.",
  category: "updates",
  tags: ["engineering", "cloudflare-workers", "shopify-apps", "migration", "whatsapp"],
  publishedAt: "2026-11-05T12:00:00.000Z",
  coverImageUrl: "/blog/engineering/gadget-to-cloudflare-cover.svg",
  coverImageAlt:
    "Diagram: WhatFlow before the move, split between Gadget and 13 separate Workers, and after, one Cloudflare Worker per app with D1, Queues, R2 and a separate Team Inbox Worker.",
  coverImageCaption: "Before and after: from a split platform to one Worker per app.",
  faqs: [
    {
      question: "Did merchants need to reinstall WhatFlow after the migration?",
      answer:
        "No. Shopify sessions, settings, message templates and subscriptions were imported into the new platform and checked field by field, so stores kept working without reinstalling or reconnecting WhatsApp.",
    },
    {
      question: "Was there downtime during the move?",
      answer:
        "WhatFlow Business API switched over once the imported data was verified, with the new app held in maintenance mode until then. WhatFlow Chat Automation moved during a planned maintenance window.",
    },
    {
      question: "What does WhatFlow run on now?",
      answer:
        "Each app runs as a Cloudflare Worker serving its admin UI, API and webhooks, with Cloudflare D1 for app data, Cloudflare Queues for background work, R2 for media and a managed PostgreSQL database through Hyperdrive for high-volume operational records. The WhatsApp Team Inbox is a separate Worker that uses Durable Objects for real-time updates.",
    },
    {
      question: "Where can I see what changed for merchants?",
      answer:
        "Every merchant-facing release is listed in the WhatFlow changelog at whatflow.tech/changelog, including the releases from before and after the move.",
    },
  ],
  sources: [
    { title: "Cloudflare Workers documentation", url: "https://developers.cloudflare.com/workers/" },
    { title: "Cloudflare D1 documentation", url: "https://developers.cloudflare.com/d1/" },
    { title: "Cloudflare Queues: delivery guarantees", url: "https://developers.cloudflare.com/queues/reference/delivery-guarantees/" },
    { title: "Cloudflare Hyperdrive documentation", url: "https://developers.cloudflare.com/hyperdrive/" },
    { title: "Cloudflare Durable Objects documentation", url: "https://developers.cloudflare.com/durable-objects/" },
    { title: "Gadget documentation", url: "https://docs.gadget.dev/" },
  ],
  blocks: [
    {
      p: "WhatFlow runs two WhatsApp apps for Shopify. **WhatFlow Chat Automation** links a store's regular WhatsApp account; we started building it in December 2024. **WhatFlow Business API** connects through Meta's official WhatsApp Cloud API, and we started building it in March 2026. Both apps began on [Gadget](https://gadget.dev), a hosted platform for building Shopify apps.",
    },
    {
      p: "Between late August and early October 2026 we moved both apps, plus the new WhatsApp Team Inbox, onto Cloudflare Workers. This post covers how we did it: the architecture we moved to, how we proved the new apps did everything the old ones did, how we moved the data without asking anyone to reinstall, and what went wrong afterwards.",
    },

    { h2: "Where we started" },
    {
      p: "Gadget gave us a lot early on: data models, actions, Shopify OAuth, webhooks and hosting in one place. The Business API app grew to 15 data models, 68 global actions, 42 model actions and 32 Shopify extensions on it.",
    },
    {
      p: "Chat Automation had a different shape. From November 2025 we had been moving its busiest paths (order events, checkouts, draft orders, poll replies, incoming messages, Shopify Flow and usage events) onto **13 separate Cloudflare Workers** with per-feature queues, plus a key-value store kept in sync on a schedule. By mid-2026 the app's hot paths ran on Cloudflare, while its admin UI, data and Shopify sessions stayed on Gadget.",
    },
    {
      p: "That split worked, but every feature lived in two places. A setting changed in the admin had to be synced to the Workers, every webhook had two possible owners, and a release could mean deploying to both platforms. Bringing everything into one runtime was the obvious next step.",
    },

    { h2: "The architecture we moved to" },
    {
      p: "We kept the design simple: **one Worker per app** that serves the embedded admin UI, the app's API, Shopify webhooks, Shopify Flow actions and admin extension requests.",
    },
    {
      ul: [
        "**UI and routing:** React Router on Workers, with Shopify sessions stored in D1. The admin UI uses Shopify's Polaris web components.",
        "**App data:** Cloudflare D1 (SQLite) through the Drizzle ORM, for shops, settings, templates, automations and message context.",
        "**Background work:** Cloudflare Queues with a dead-letter queue. Chat Automation's 13 per-feature queues became a single event queue.",
        "**High-volume operational records:** a managed PostgreSQL database reached through Cloudflare Hyperdrive, for jobs, webhook receipts and delivery records that would otherwise fill D1.",
        "**Media:** R2 for files and images.",
        "**Scheduled work:** two cron schedules per app, a frequent one for due jobs and a daily one for retention and housekeeping.",
        "**Team Inbox:** a separate Worker with Durable Objects for real-time conversation updates and broadcasts. It receives Meta's webhooks, verifies them, and passes them to the Business API Worker over a service binding, backed by a durable outbox so nothing is lost if a hand-off fails.",
      ],
    },
    {
      p: "We also changed how Shopify webhooks are registered. Gadget-era Chat Automation created webhooks for each shop through the API. The new apps declare them once, at app level, in the Shopify app configuration, which removes a whole class of \"this shop is missing a webhook\" problems.",
    },

    { h2: "Rule one: parity before improvements" },
    {
      p: "The most important decision was what we did not change. The admin UI had to be **like-for-like**: same pages, same settings, same behaviour. Only the data layer underneath was allowed to change. Every improvement we wanted to make waited until after the cutover.",
    },
    {
      p: "Before switching the Business API over, we ran a final parity audit that compared every Gadget action, model action and extension with its new counterpart. The first pass said, plainly, that the new app was not yet a complete like-for-like migration and listed **21 findings**. We fixed all 21, each with a regression test, before production traffic moved.",
    },
    {
      p: "A few features were deliberately not carried over at that point and were rebuilt or retired separately, so the cutover stayed a migration and not a redesign.",
    },

    { h2: "Moving the data without a reinstall" },
    {
      p: "Merchants should not have to reinstall an app because we changed hosting. That meant carrying over everything a store depends on: offline Shopify sessions and refresh tokens, WhatsApp connections, message templates, automation settings and app subscriptions.",
    },
    {
      ol: [
        "**Encrypted, resumable exports** from the old platform, so a dropped connection never meant starting over.",
        "**An idempotent preload.** Every row was upserted with a \"newer timestamp wins\" rule. Running the preload again wrote zero rows, which proved it could be repeated safely right up to cutover.",
        "**Field-by-field verification.** For the Business API we compared **1,126,975 fields** between the old and new databases at the final import, with **zero mismatches**.",
        "**Conflicts were parked, not guessed.** Rows that couldn't be imported cleanly went to an encrypted holding table for review. We never generated or invented credentials to fill a gap.",
      ],
    },
    {
      p: "Chat Automation's import followed the same pattern. Every row was checked against a production export, large settings were loaded in resumable chunks sized to stay within D1's statement limits, and old queued jobs were archived rather than replayed.",
    },

    { h2: "The cutover" },
    {
      p: "Each production Worker was first deployed in a **fail-closed maintenance mode**. Its health check reported \"not ready\" and every other request got a 503, so nothing could reach it by accident while data was still loading.",
    },
    {
      ul: [
        "**Business API, September 9–12, 2026.** Production data was preloaded on September 9. On September 10 we closed the final parity findings, ran the last import and verification, and switched traffic. Until then, the Team Inbox Worker forwarded Meta webhooks to the old app, and afterwards only to Cloudflare. On September 12 we shipped guards that stop the old app from sending any WhatsApp message at all.",
        "**Chat Automation, October 6–7, 2026.** Chat moved during a planned maintenance window. The next day we moved **more than 22,000 linked WhatsApp sessions** from 43 servers onto 10, using tooling that ran as a dry run by default, backed up every record before changing it and read each change back afterwards.",
      ],
    },
    {
      p: "Rollback was planned, not improvised: previous Worker versions stayed available, configuration backups were taken before every bulk change, and the old platform's send paths were guarded in place instead of deleted.",
    },

    { h2: "What broke, and what we learned" },
    {
      p: "Cutover day was the easy part. The weeks after taught us more, mostly about running at volume on a platform that bills per operation.",
    },
    { h3: "Queues deliver at least once, so sends need fences" },
    {
      p: "Cloudflare Queues guarantee at-least-once delivery, which means a message can occasionally be delivered twice. For a WhatsApp app, \"twice\" means a customer gets the same message twice. Every send now passes a durable **send fence**: once a send is recorded, a redelivered job can't send it again. If we can't tell whether a send went through, it's flagged for review instead of retried.",
    },
    { h3: "Token refreshes need a single owner" },
    {
      p: "Shopify's expiring offline tokens come with a refresh token that can only be used once. With many Workers running at the same time, two requests could try to refresh the same shop's token at once. We put token refreshes behind a per-shop lock. Later we found that most requests didn't need the lock at all: when a stored session is still valid, it can be used directly. Skipping the lock in that case cut the median time of admin data calls from **2.75 seconds to 0.78 seconds**, and the 90th percentile from **5.3 seconds to 1.3 seconds**.",
    },
    { h3: "A bad day for the database" },
    {
      p: "On October 13, a burst of memory-heavy work in Chat Automation turned into a cascade of database errors. We contained it by cutting queue concurrency from 20 to 2, fixed the code paths that read large payloads all at once so they stream instead, and only then raised concurrency back to 20. The lesson: each Worker instance has a fixed memory limit shared by everything it's doing, so anything that might be large has to be streamed.",
    },
    { h3: "Every operation has a price, so decide early" },
    {
      p: "On the old platform a wasted background job was invisible. On Cloudflare every queue message, database write and log line is counted. So we moved decisions forward to the moment a webhook arrives: if an event doesn't need work (a disabled feature, a shop without the relevant setting, a status update we already have), it's dropped before it's queued. We also removed intermediate hops between queues.",
    },
    {
      ul: [
        "Billable queue operations per hour fell by **about 45%** (from roughly 36,000 to 20,000).",
        "Writes to Chat Automation's main queue fell by **about 60%**.",
        "Logging moved to at most one structured line per request, instead of many small lines.",
      ],
    },

    { h2: "Cleaning up" },
    {
      p: "Once both apps had run cleanly in production, we deleted the one-off cutover tooling, removed code that only existed for the migration, and added tests that fail if a dependency on the old platform's SDK comes back. Moving shouldn't leave a second, half-alive system behind.",
    },

    { h2: "What merchants noticed" },
    {
      ul: [
        "No reinstall. Stores kept their settings, templates, WhatsApp connections and subscriptions.",
        "Faster admin pages, especially after we started loading each page's data on the server.",
        "A steady run of features that were hard to build across two platforms, such as the Team Inbox, Shopify Flow triggers for WhatsApp catalog orders and media, review requests and Shopify Analytics reporting.",
      ],
    },
    {
      p: "If you want the merchant-facing view of everything that shipped before and after the move, it's all in the [WhatFlow changelog](https://whatflow.tech/changelog).",
    },
    {
      quote: "Change hosting, not behaviour. Prove parity, then make it better.",
    },
  ] satisfies PostBlock[],
};
