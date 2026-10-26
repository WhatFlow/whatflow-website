import React from 'react';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {renderToStaticMarkup} from 'react-dom/server';
import {PricingClient} from '../src/app/(site)/pricing/PricingClient';
test('an unavailable Meta rate produces a software subtotal rather than a zero-fee combined quote',()=>{
 const html=renderToStaticMarkup(<PricingClient/>);
 assert.match(html,/WhatFlow subtotal:/);
 assert.match(html,/Not included — rate unavailable/);
 assert.doesNotMatch(html,/Total estimated:/);
 assert.match(html,/official WhatsApp pricing page/);
});
