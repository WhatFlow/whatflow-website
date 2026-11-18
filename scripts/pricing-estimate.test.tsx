import React from 'react';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {renderToStaticMarkup} from 'react-dom/server';
import {PricingClient} from '../src/app/(site)/pricing/PricingClient';
test('an unavailable Meta rate produces a software subtotal rather than a zero-fee combined quote',()=>{
 const html=renderToStaticMarkup(<PricingClient/>);
 assert.match(html,/WhatFlow subtotal/);
 assert.match(html,/Not included: rate unavailable/);
 assert.doesNotMatch(html,/<span>Total estimated<\/span>/);
 assert.match(html,/official WhatsApp pricing page/);
});

test('plan cards show the new allowances and their overage thresholds', () => {
 const html = renderToStaticMarkup(<PricingClient />);
 assert.match(html, /<h3>Essential<\/h3>[\s\S]*?\$19<\/b>[\s\S]*?10,000 messages included[\s\S]*?10,001\+ messages sent[\s\S]*?\$0\.003<\/b>/);
 assert.match(html, /<h3>Ultimate<\/h3>[\s\S]*?100,000 messages included[\s\S]*?100,001\+ messages sent[\s\S]*?\$0\.0015<\/b>/);
 assert.doesNotMatch(html, /75,00[01] messages/);
});
