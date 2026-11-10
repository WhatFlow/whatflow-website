import {test} from 'node:test';
import assert from 'node:assert/strict';
import {GET as getService} from '../src/app/ai/service.json/route';
import {HOMEPAGE_FAQS} from '../src/lib/marketing-faqs';

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
  assert.equal(body.documentation_urls.pricing, 'https://whatflow.io/pricing');
});

test('shared visible and structured FAQs qualify delivery and connector coverage', () => {
  const delivery = HOMEPAGE_FAQS.find(faq => faq.question === 'Do I need a Meta WhatsApp Business Account?')!;
  assert.match(delivery.answer, /recipient availability/);
  assert.doesNotMatch(delivery.answer, /certified message delivery/);
  const flow = HOMEPAGE_FAQS.find(faq => faq.question === 'Does WhatFlow integrate with Shopify Flow?')!;
  assert.match(flow.answer, /supported by Shopify Flow and your installed app connectors/);
  assert.doesNotMatch(flow.answer, /any Shopify event/);
});
