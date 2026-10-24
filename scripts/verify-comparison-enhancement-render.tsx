import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {RichText} from '../src/lib/RichText';
const root=process.env.COMPARISON_ENHANCEMENT_ROOT||'content/comparisons/enhancement-2026-10-25';
const docs=JSON.parse(readFileSync(root+'/'+(process.env.COMPARISON_DOCUMENT_FILE||'candidate-documents.json'),'utf8'));
const results=docs.map((d:any)=>{const html=renderToStaticMarkup(<RichText content={d.content}/>);assert(html.includes('Key takeaways'));assert(html.includes('Before you choose a platform'));assert(html.includes('About the author'));assert(html.includes('/compare/'));assert(html.includes('/contact'));return {slug:d.slug,rendered:true,bytes:Buffer.byteLength(html)};});
assert.equal(results.length,106);writeFileSync(root+'/native-render-verification.json',JSON.stringify(results,null,2));console.log('Native Payload/React bodies rendered:'+results.length);
