/** Read-only verification of the targeted Payload publication and marketing truth. */
import assert from 'node:assert/strict';
import {readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root = 'content/inbox-enterprise-2026-10-26';
const base = process.env.VERIFY_SITE_URL || 'https://whatflow.tech';
const digest = value => createHash('sha256').update(value).digest('hex');
function sorted(value) {return Array.isArray(value) ? value.map(sorted) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(k => [k, sorted(value[k])])) : value;}
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
async function get(path) {const r = await fetch(new URL(path, base), {headers: {'cache-control': 'no-cache'}, signal: AbortSignal.timeout(45000)}); assert.equal(r.status, 200, path); return r;}
const hashes = JSON.parse(await readFile(root + '/unchanged-document-hashes.json'));
const edits = JSON.parse(await readFile(root + '/writer-report.json')).edits;
const manifest = JSON.parse(await readFile('content/thumbnails-2026-10-25/manifest.json'));
const results = [];
let unchanged = 0;
for (const [collection, route, schemaType] of [['comparisons', 'compare', 'Article'], ['posts', 'blog', 'BlogPosting']]) {
  const wanted = JSON.parse(await readFile(`${root}/${collection}/candidate-documents.json`));
  const all = [];
  for (let page = 1;; page++) {const data = await (await get(`/api/${collection}?depth=0&limit=50&page=${page}`)).json(); all.push(...data.docs); if (!data.hasNextPage) break;}
  assert.equal(all.length, collection === 'comparisons' ? 106 : 58);
  for (const doc of all) {
    const candidate = wanted.find(d => d.slug === doc.slug);
    if (!candidate) {assert.equal(digest(JSON.stringify(sorted(doc))), hashes[collection][doc.slug], doc.slug + ' untouched document'); unchanged++; continue;}
    assert.deepEqual(doc, candidate, doc.slug + ' native document');
    const html = await (await get(`/${route}/${doc.slug}`)).text();
    for (const edit of edits.filter(e => e.slug === doc.slug)) assert(html.includes(escape(edit.new)), doc.slug + ' edited passage visible');
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
    const article = schemas.find(s => s['@type'] === schemaType);
    assert(article); assert.equal(article.author.name, 'Safwan Adnan'); assert.equal(article.datePublished, doc.publishedAt); assert.equal(article.dateModified, doc.updatedAt);
    assert.equal(article.publisher['@type'], 'Organization'); assert(schemas.some(s => s['@type'] === 'BreadcrumbList'));
    const record = manifest.records.find(r => r.slug === doc.slug);
    assert(html.includes(`property="og:image" content="${new URL(record.url, base).href}"`));
    assert.equal(digest(Buffer.from(await (await get(record.url)).arrayBuffer())), record.sha256, doc.slug + ' retained cover');
    results.push({slug: doc.slug, collection, nativeDocument: true, visibleEdits: true, authorAndDates: true, schema: true, retainedCover: true});
  }
}
assert.equal(results.length, 13); assert.equal(unchanged, 151);
const ai = await (await get('/ai/summary.json')).json();
assert(!JSON.stringify(ai).includes('24/7 AI')); assert(ai.capabilities.includes('All features available across messaging plans'));
const home = await (await get('/')).text();
assert(!home.includes('24/7 AI chat support')); assert(home.includes('Is AI included in the WhatFlow inbox?'));
const homeSchemas = [...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
const application = homeSchemas.find(s => Array.isArray(s['@type']) && s['@type'].includes('SoftwareApplication'));
assert(application); assert(!JSON.stringify(application).includes('RAG')); assert(application.offers.every(o => o.description.startsWith('All features included')));
const inbox = await (await get('/inbox')).text(); assert(inbox.includes('Enterprise-Ready WhatsApp Support')); assert(!inbox.includes('99.9% uptime'));
const features = await (await get('/features')).text(); assert(!features.includes('AI-powered auto-replies')); assert(!features.includes('zero hallucination')); assert(features.includes('AI is not currently included'));
const report = {checkedAt: new Date().toISOString(), passed: true, changedArticles: 13, exactEdits: edits.length, untouchedArticles: unchanged, marketingAIClaimsCorrected: true, results};
await writeFile(`${root}/live-verification.json`, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({...report, results: undefined}));
