# Homepage audit remediation — October 27, 2026

Input: the user-provided WhatFlow homepage GEO audit, scored 88 before this release. This is a remediation record, not a rerun of that scoring tool.

## Report recommendations

- **G-DATES:** Added a homepage WebPage schema with dateModified and an organizational author. The visible time element and homepage sitemap lastmod use the same maintained content date. The date is not regenerated on each request or assigned to unrelated pages.
- **Entity disambiguation:** Verified https://www.linkedin.com/company/whatflow against its public company description, Shopify listing link, and founder listing. Added it to Organization.sameAs and the visible footer. No Wikipedia, Wikidata, or Crunchbase entry was invented.
- **Service discovery:** /ai/service.json already existed. Clarified its product capabilities and limitations, added version/update metadata, and linked it from the HTML head and llms.txt. The existing /.well-known/ai.txt already links to it. This manifest describes the product; it exposes no executable API.
- **Form labeling:** The four homepage sliders already had names, types, labels, and aria-labels. Retained those and added polite announcements for calculated results. Added a site-wide skip link and focusable main target.
- **WebMCP:** Annotated the working GET search forms on /blog and /compare with toolname and tooldescription, following Chrome's declarative API documentation. Standard form behavior remains available; browser support varies. The calculator's data attributes alone are not claimed to register an executable WebMCP tool.

## Content and trust findings

Replaced unsupported open-rate, recovery, ROI, delivery-latency, and logistics percentages with plain-language workflow explanations and a capability/tradeoff table. Removed invented benchmark citations. Added links to Meta, WhatsApp policy, and Shopify documentation, plus a visible organizational byline and methodology/limitations explanation.

The calculator now identifies every default as an example, supports a zero recovery rate, describes its gross-revenue formula and reachability assumption, and excludes costs explicitly. Removed the arbitrary $29 denominator, projected ROI multiple, assumed hours saved, and unsupported free-trial/install-time claims. Removed hard-coded invented testimonial fallbacks and the unverified aggregate app rating; published CMS reviews remain available. Removed unsupported merchant totals from the shared footer and homepage CTA. Added specific affiliate tier terms based on the existing affiliate page.

FAQ answers now render as native details/summary elements so all answers are present in server HTML, with keyboard access and native expanded state. The FAQ schema continues to use the same answer source.

## Scope and limitations

This audit concerns the homepage. Missing Article, Product, HowTo, and Person schema are not automatically defects on a software landing page. No unsupported schema, translated language alternatives, fabricated first-party research, credentials, merchant ratings, or social accounts were added to chase heuristic points. External account settings, Google Search Console's generative AI control, third-party scanner dependencies, and platform sentiment checks are outside this code release. Historical dates and example order amounts are valid content and were not rewritten as freshness claims.

Validation: separate TypeScript and scoped ESLint checks, production OpenNext build, remote CMS migration preflight, then live response and browser checks. Deployment preflight found no migrations to apply.
