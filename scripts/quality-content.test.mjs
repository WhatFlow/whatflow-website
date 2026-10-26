import {test} from 'node:test';
import assert from 'node:assert/strict';
import {markdownToLexical,frontmatter} from './build-quality-content.mjs';
test('preserves comparison facts, links, tables and quotes as native editable nodes',()=>{
 const d=markdownToLexical('## Actual costs\n\nA **clear** [source](https://example.com).\n\n| Plan | Fee |\n|---|---|\n| Plus | $79.99 |\n\n> A sample reply.\n\n- One owner\n- One follow-up');
 const n=d.root.children;assert.deepEqual(n.map(x=>x.type),['heading','paragraph','table','quote','list']);
 assert.equal(n[1].children[1].format,1);assert.equal(n[1].children[3].fields.url,'https://example.com');
 assert.equal(n[2].children[1].children[1].children[0].children[0].text,'$79.99');
 assert.equal(n[4].children[1].children[0].text,'One follow-up');
});
test('maps owned guide images and rejects active or unknown content',()=>{
 const n=markdownToLexical('![Manual catalog controls](catalog-sync-controls.jpg)').root.children[0];
 assert.equal(n.fields.url,'/blog/product-proof/catalog-sync-controls.jpg');
 assert.throws(()=>markdownToLexical('[unsafe](javascript:alert)'));
 assert.throws(()=>markdownToLexical('<script>alert(1)</script>'));
});
test('frontmatter preserves original dates and published body has no duplicate H1',()=>{
 const {meta,body}=frontmatter('---\ntitle: "Guide"\ndate: "2026-10-23"\n---\n# Guide\n\n## Action\n\nDo it.');
 assert.equal(meta.date,'2026-10-23');assert.equal(markdownToLexical(body).root.children[0].tag,'h2');
});

test('retains takeaway lists nested in Markdown blockquotes',()=>{
 const n=markdownToLexical('> **Takeaways**\n>\n> - Catalog is live\n> - Sync is manual').root.children;
 assert.deepEqual(n.map(x=>x.type),['quote','list']);
 assert.equal(n[1].children[1].children[0].text,'Sync is manual');
});

test('decodes Markdown table entities before native text rendering',()=>{
 const d=markdownToLexical("| Check | Meaning |\n|---|---|\n| Today\'s promise | A &amp; B |\n");
 const cells=d.root.children[0].children[1].children;
 assert.equal(cells[0].children[0].children[0].text,"Today's promise");
 assert.equal(cells[1].children[0].children[0].text,'A & B');
});
