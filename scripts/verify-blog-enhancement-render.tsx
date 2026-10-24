import assert from 'node:assert/strict';
import { readFileSync,writeFileSync } from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {RichText} from '../src/lib/RichText';
const docs=JSON.parse(readFileSync('content/blog/enhancement-2026-10-25/candidate-documents.json','utf8'));
const rows=docs.map((p:any)=>{
 const html=renderToStaticMarkup(<RichText content={p.content}/>);
 assert(html.includes('<ul>')||html.includes('<ul '),p.slug+' lists');
 assert(html.includes('Key takeaways'),p.slug+' takeaways');
 assert(!/<h2[^>]*>[^<]*\n/.test(html),p.slug+' heading text');
 assert(html.includes('Before you put this into practice'),p.slug+' checklist');
 assert(html.includes('/contact'),p.slug+' author contact');
 return {slug:p.slug,rendered:true,bytes:Buffer.byteLength(html)};
});
writeFileSync('content/blog/enhancement-2026-10-25/native-render-verification.json',JSON.stringify(rows,null,2));
console.log(JSON.stringify({nativePayloadBodiesRendered:rows.length}));
