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
    "Why and how we moved WhatFlow's official and unofficial API apps from Gadget to Cloudflare Workers: a growing bill, two sources of truth, 22,000+ WhatsApp sessions moved, and what we learned.",
  seoTitle: "Why and How We Moved Our Shopify Apps from Gadget to Cloudflare",
  seoDescription:
    "Why WhatFlow left Gadget for Cloudflare Workers, D1 and Queues, and how we moved two Shopify apps: parity audits, verified data import, cutover and lessons learned.",
  category: "updates",
  tags: ["engineering", "cloudflare-workers", "shopify-apps", "migration", "whatsapp"],
  publishedAt: "2026-11-05T12:00:00.000Z",
  coverImageUrl: "/blog/engineering/gadget-to-cloudflare-cover.svg",
  coverImageAlt:
    "Diagram: WhatFlow before the move, split between Gadget and 13 separate Workers, and after, one Cloudflare Worker per app with D1, Queues, R2 and a separate Team Inbox Worker.",
  coverImageCaption: "Before and after: from a split platform to one Worker per app.",
  faqs: [
    {
      question: "Why did WhatFlow move from Gadget to Cloudflare?",
      answer:
        "Cost and complexity. Gadget made sense when WhatFlow had one developer and few users, but as the apps grew the monthly bill passed $1,400 and was projected to reach about $1,800. Running the unofficial API app split between Gadget and Cloudflare Workers had also become hard to maintain. With capable AI coding agents and reasonable Cloudflare pricing, we could run the infrastructure ourselves.",
    },
    {
      question: "Did merchants need to reinstall WhatFlow after the migration?",
      answer:
        "No. Shopify sessions, settings, message templates and subscriptions were imported into the new platform and checked field by field, so stores kept working without reinstalling or reconnecting WhatsApp.",
    },
    {
      question: "Was there downtime during the move?",
      answer:
        "Very little. The official API app (WhatFlow Business API) switched over once the imported data was verified, with the new app held in maintenance mode until then. A few weeks later, the unofficial API app (WhatFlow Chat Automation) moved during a short, planned maintenance window.",
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
      p: "WhatFlow runs two WhatsApp apps for Shopify. **WhatFlow Chat Automation**, our unofficial API app, links a store's regular WhatsApp account. It launched on the Shopify App Store in October 2024, after about three months of development. **WhatFlow Business API**, our official API app, connects through Meta's WhatsApp Cloud API, and we started building it in March 2026. Both apps began on [Gadget](https://gadget.dev), a hosted platform for building Shopify apps.",
    },
    {
      p: "Between late August and early October 2026 we moved both apps, plus the new WhatsApp Team Inbox, onto Cloudflare Workers. This post covers why we did it and how: the architecture we moved to, how we proved the new apps did everything the old ones did, how we moved the data without asking anyone to reinstall, and what went wrong afterwards.",
    },

    { h2: "Why we started on Gadget" },
    {
      p: "In 2024 WhatFlow had a single developer, a university student. AI coding tools were still mostly chat windows you pasted code into, so building and running software was the bottleneck. Gadget took the infrastructure, the database, Shopify OAuth, webhooks and hosting off our hands, so the little time we had went into the product. With only a few users, the cost was small. It was clearly the right call.",
    },
    {
      p: "As the apps grew, so did the bill. For a long time we were happy to pay it, because Gadget saved us DevOps work, hiring and a great deal of time. Their team was supportive throughout, and often refunded us when something went wrong. Thank you to Franco, Muhammad and everyone else at Gadget.",
    },

    { h2: "Why we left" },
    {
      p: "Eventually the numbers stopped working. Our monthly bill climbed past $1,200, then $1,300 and $1,400, and was projected to reach about $1,800 a month by August and September 2026.",
    },
    {
      p: "We had already been moving pieces away to control costs. First we moved the unofficial API app's webhook handling to Cloudflare Workers. We also tried running that load on a large VPS managed with Coolify, but the webhook volume was more than it could take, and at the time we didn't have the experience to design around it. Back on Workers, we optimized enough to bring the bills down again.",
    },
    {
      p: "By mid-2026 the unofficial API app's busiest paths (order events, checkouts, draft orders, poll replies, incoming messages, Shopify Flow and usage events) ran on **13 separate Cloudflare Workers** with per-feature queues, plus a key-value store kept in sync on a schedule. Its admin UI, data and Shopify sessions stayed on Gadget.",
    },
    {
      p: "Running one product in two places was hard and bug-prone. A setting changed in the admin had to be synced to the Workers, every webhook had two possible owners, and a release could mean deploying to both platforms. When Shopify introduced expiring offline access tokens, keeping a store's credentials consistent across two sources of truth became the hardest problem of all.",
    },
    {
      p: "Meanwhile, the landscape had changed since 2024. AI coding agents had become genuinely good at building and maintaining infrastructure code, Cloudflare's pricing was reasonable, and we already had experience running our busiest workloads there. The layer Gadget had handled for us was something we could now own. So we decided it was time to move everything to Cloudflare.",
    },

    { h2: "Official API app first, unofficial second" },
    {
      p: "We started with the official API app. It ran entirely on Gadget, so there was no split to untangle, and it was the smaller of the two, with around 400 to 500 paying stores at the time (more than 1,000 today). On Gadget it had grown to 15 data models, 68 global actions, 42 model actions and 32 Shopify extensions.",
    },
    {
      p: "The unofficial API app had 3,000 to 4,000 active subscribers, so moving it was the riskier job. We waited until the official API app had run stably on Cloudflare for a few weeks, then moved the unofficial API app completely, front end and back end.",
    },

    { h2: "The architecture we moved to" },
    {
      p: "We kept the design simple: **one Worker per app** that serves the embedded admin UI, the app's API, Shopify webhooks, Shopify Flow actions and admin extension requests.",
    },
    {
      ul: [
        "**UI and routing:** React Router on Workers, with Shopify sessions stored in D1. The admin UI uses Shopify's Polaris web components.",
        "**App data:** Cloudflare D1 (SQLite) through the Drizzle ORM, for shops, settings, templates, automations and message context.",
        "**Background work:** Cloudflare Queues with a dead-letter queue. The unofficial API app's 13 per-feature queues became a single event queue.",
        "**High-volume operational records:** a managed PostgreSQL database reached through Cloudflare Hyperdrive, for jobs, webhook receipts and delivery records that would otherwise fill D1.",
        "**Media:** R2 for files and images.",
        "**Scheduled work:** two cron schedules per app, a frequent one for due jobs and a daily one for retention and housekeeping.",
        "**Team Inbox:** a separate Worker with Durable Objects for real-time conversation updates and broadcasts. It receives Meta's webhooks, verifies them, and passes them to the official API app's Worker over a service binding, backed by a durable outbox so nothing is lost if a hand-off fails.",
      ],
    },
    {
      p: "We also changed how Shopify webhooks are registered. On Gadget, the unofficial API app created webhooks for each shop through the API. The new apps declare them once, at app level, in the Shopify app configuration, which removes a whole class of \"this shop is missing a webhook\" problems.",
    },

    { h2: "Rule one: parity before improvements" },
    {
      p: "The most important decision was what we did not change. The admin UI had to be **like-for-like**: same pages, same settings, same behaviour. Only the data layer underneath was allowed to change. Every improvement we wanted to make waited until after the cutover.",
    },
    {
      p: "Before switching the official API app over, we ran a final parity audit that compared every Gadget action, model action and extension with its new counterpart. The first pass said, plainly, that the new app was not yet a complete like-for-like migration and listed **21 findings**. We fixed all 21, each with a regression test, before production traffic moved.",
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
        "**Field-by-field verification.** For the official API app we compared **1,126,975 fields** between the old and new databases at the final import, with **zero mismatches**.",
        "**Conflicts were parked, not guessed.** Rows that couldn't be imported cleanly went to an encrypted holding table for review. We never generated or invented credentials to fill a gap.",
      ],
    },
    {
      p: "The unofficial API app's import followed the same pattern. Every row was checked against a production export, large settings were loaded in resumable chunks sized to stay within D1's statement limits, and old queued jobs were archived rather than replayed.",
    },

    { h2: "The cutover" },
    {
      p: "Each production Worker was first deployed in a **fail-closed maintenance mode**. Its health check reported \"not ready\" and every other request got a 503, so nothing could reach it by accident while data was still loading.",
    },
    {
      ul: [
        "**Official API app (WhatFlow Business API), September 9–12, 2026.** Production data was preloaded on September 9. On September 10 we closed the final parity findings, ran the last import and verification, and switched traffic. Until then, the Team Inbox Worker forwarded Meta webhooks to the old app, and afterwards only to Cloudflare. On September 12 we shipped guards that stop the old app from sending any WhatsApp message at all.",
        "**Unofficial API app (WhatFlow Chat Automation), October 6–7, 2026.** After a few stable weeks on the official API app, the unofficial API app moved during a short, planned maintenance window. The next day we moved **more than 22,000 linked WhatsApp sessions** from 43 servers onto 10, using tooling that ran as a dry run by default, backed up every record before changing it and read each change back afterwards.",
      ],
    },
    {
      p: "Both migrations went smoothly, with only a few small hiccups and very little downtime. Rollback was planned, not improvised: previous Worker versions stayed available, configuration backups were taken before every bulk change, and the old platform's send paths were guarded in place instead of deleted.",
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
      p: "On October 13, a burst of memory-heavy work in the unofficial API app turned into a cascade of database errors. We contained it by cutting queue concurrency from 20 to 2, fixed the code paths that read large payloads all at once so they stream instead, and only then raised concurrency back to 20. The lesson: each Worker instance has a fixed memory limit shared by everything it's doing, so anything that might be large has to be streamed.",
    },
    { h3: "Every operation has a price, so decide early" },
    {
      p: "On the old platform a wasted background job was invisible. On Cloudflare every queue message, database write and log line is counted. So we moved decisions forward to the moment a webhook arrives: if an event doesn't need work (a disabled feature, a shop without the relevant setting, a status update we already have), it's dropped before it's queued. We also removed intermediate hops between queues.",
    },
    {
      ul: [
        "Billable queue operations per hour fell by **about 45%** (from roughly 36,000 to 20,000).",
        "Writes to the unofficial API app's main queue fell by **about 60%**.",
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
