import React from 'react';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {renderToStaticMarkup} from 'react-dom/server';
import {RoiCalculator} from '../src/components/RoiCalculator';
import {GET as getService} from '../src/app/ai/service.json/route';
import {HOMEPAGE_FAQS} from '../src/lib/marketing-faqs';

test('recovery scenario distinguishes example inputs, gross revenue and costs from promised ROI', () => {
  const html = renderToStaticMarkup(<RoiCalculator/>);
  assert.match(html, /not WhatFlow benchmarks or promised results/);
  assert.match(html, /default 70% abandonment and 12% recovery rates are illustrative assumptions/);
  assert.match(html, /ILLUSTRATIVE MONTHLY GROSS REVENUE/);
  assert.match(html, /21,840/);
  assert.match(html, /This is not profit or ROI/);
  assert.match(html, /Excludes app fees, Meta charges, discounts, refunds, and fulfillment costs/);
  assert.match(html, /actual consent and delivery limits reduce reach/);
  assert.equal((html.match(/aria-describedby="recovery-scenario-assumptions"/g) || []).length, 2);
  assert.doesNotMatch(html, /REVENUE RECOVERED|ROI &amp; REVENUE ESTIMATOR|store’s a monthly/);
});

test('service manifest is public JSON with accurate feature availability and documentation', async () => {
  const response = await getService();
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') || '', /application\/json/);
  assert.equal(response.headers.get('cache-control'), 'public, max-age=300');
  const body = await response.json() as {
    features: Array<{id: string; seat_fees?: boolean; catalog_sharing_available?: boolean; audience_sync_available?: boolean; ai_available?: boolean}>;
    documentation_urls: {pricing: string};
  };
  const inbox = body.features.find((feature: {id: string}) => feature.id === 'team_inbox');
  assert.ok(inbox);
  assert.equal(inbox.seat_fees, false);
  assert.equal(inbox.catalog_sharing_available, true);
  assert.equal(inbox.audience_sync_available, false);
  assert.equal(inbox.ai_available, false);
  assert.equal(body.documentation_urls.pricing, 'https://whatflow.tech/pricing');
});

test('shared visible and structured FAQs qualify delivery and connector coverage', () => {
  const delivery = HOMEPAGE_FAQS.find(faq => faq.question === 'Do I need a Meta WhatsApp Business Account?')!;
  assert.match(delivery.answer, /recipient availability/);
  assert.doesNotMatch(delivery.answer, /certified message delivery/);
  const flow = HOMEPAGE_FAQS.find(faq => faq.question === 'Does WhatFlow integrate with Shopify Flow?')!;
  assert.match(flow.answer, /supported by Shopify Flow and your installed app connectors/);
  assert.doesNotMatch(flow.answer, /any Shopify event/);
});
