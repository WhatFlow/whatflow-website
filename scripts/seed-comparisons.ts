/** Import reviewed editorial launch material into Payload, never into the page bundle.
 * Local: npm run seed:comparisons
 * Remote D1: PAYLOAD_REMOTE_BINDINGS=true npm run seed:comparisons
 * Imports drafts; existing slugs are preserved on subsequent runs.
 */
import { getPayload } from 'payload';
import config from '../src/payload.config';
import articles from '../content/comparisons/launch.mjs';
import { comparisonLexical } from './comparison-lexical';

const payload = await getPayload({ config });
const timestamp = new Date().toISOString();

const images = [
  { filename: 'whatflow-template-editor.jpg', alt: 'WhatFlow abandoned checkout template editor inside the Shopify demo store, with mapped fields and a sample message preview', caption: 'WhatFlow demo store: abandoned checkout template editing with sample preview values. This is a configuration screenshot, not a performance result.' },
  { filename: 'whatflow-cod-settings.jpg', alt: 'WhatFlow Cash on Delivery settings in the Shopify demo store showing an illustrative checkout preview', caption: 'WhatFlow demo store: COD checkout configuration preview. The fee shown is an example, not a required WhatFlow fee or a report of live orders.' },
];
let createdCount = 0;
let skippedCount = 0;
for (const article of articles) {
  const existing = await payload.find({ collection: 'comparisons', where: { slug: { equals: article.slug } }, limit: 1 });
  if (existing.docs.length) { skippedCount++; console.log(`Preserved existing comparison: ${article.slug}`); continue; }
  const isCOD = ['whatflow-vs-interakt','whatflow-vs-zoko','whatflow-vs-superlemon'].includes(article.slug);
  const imageIndex = isCOD ? 1 : 0;
  const image = images[imageIndex];
  await payload.create({
    collection: 'comparisons',
    data: {
      title: article.title, slug: article.slug, competitor: article.competitor,
      competitorUrl: article.source[1], category: article.category,
      excerpt: article.excerpt, verdict: article.verdict,
      author: 'Safwan Adnan', authorRole: 'Co-founder and CEO of WhatFlow',
      publishedAt: timestamp, reviewedAt: timestamp, _status: 'draft',
      featured: ['whatflow-vs-wati','whatflow-vs-interakt','whatflow-vs-bitespeed','whatflow-vs-quickreply','whatflow-vs-zoko','whatflow-vs-klaviyo'].includes(article.slug),
      imageUrl: `/comparisons/${image.filename}`, imageAlt: image.alt, imageCaption: image.caption,
      imageSourceUrl: 'https://apps.shopify.com/whatflow-official-api',
      featureTable: [
        { feature: article.focus[0], whatflow: article.focus[1], competitor: article.focus[2] },
        { feature: 'Source of this comparison', whatflow: 'Observed Shopify demo configuration; test your required workflow before launch', competitor: 'Linked vendor product documentation; confirm plan and account availability' },
        { feature: 'Cost check', whatflow: 'Use current WhatFlow pricing and the Shopify installation terms for your expected usage', competitor: `Request a current ${article.competitor} quote covering the required product, integration and message volume` },
      ],
      content: comparisonLexical(article.body),
      faqs: article.faqs.map(([question, answer]: string[]) => ({ question, answer })),
      sources: [
        { title: article.source[0], url: article.source[1], note: `Primary source for the advertised ${article.competitor} capabilities discussed above.` },
        { title: 'WhatFlow Shopify App Store listing', url: 'https://apps.shopify.com/whatflow-official-api', note: 'Official app identity and current installation terms. WhatFlow workflow descriptions also reflect the demo-store configuration pictured in this guide.' },
      ],
      cta: { heading: 'Try the workflow that matters to your store', description: 'Start with one Shopify event, inspect the template mapping and test the complete customer journey with controlled recipients.', label: 'Explore WhatFlow on Shopify' },
      seo: { metaTitle: article.title, metaDescription: article.excerpt, noindex: false },
    },
  });
  createdCount++;
  console.log(`Imported draft ${createdCount}: ${article.slug}`);
}
console.log(JSON.stringify({ created: createdCount, preserved: skippedCount, total: articles.length }));
await payload.destroy();
process.exit(0);
