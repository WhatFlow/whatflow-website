/** Publish only the reviewed launch slugs after draft-access checks pass. */
import { getPayload } from 'payload';
import config from '../src/payload.config';
import articles from '../content/comparisons/launch.mjs';
import { comparisonLexical } from './comparison-lexical';

const payload = await getPayload({ config });
let published = 0;
const queue = [...articles];
await Promise.all(Array.from({ length: 3 }, async () => {
while (queue.length) {
  const article = queue.shift()!;
  const result = await payload.find({ collection: 'comparisons', draft: true, where: { slug: { equals: article.slug } }, limit: 1 });
  const doc = result.docs[0];
  if (!doc) throw new Error(`Missing comparison: ${article.slug}`);
  if (doc.author !== 'Safwan Adnan' || !doc.content || !doc.sources?.length || !doc.imageUrl) throw new Error(`Incomplete comparison: ${article.slug}`);
  const malformedHeadings = doc.content.root.children.some(node => node.type === 'heading' && JSON.stringify(node).includes('\\n'));
  if (doc._status !== 'published' || malformedHeadings) await payload.update({ collection: 'comparisons', id: doc.id, draft: false, data: { ...(malformedHeadings ? { content: comparisonLexical(article.body) } : {}), _status: 'published' } });
  published++;
  console.log(`Published ${published}/${articles.length}: ${article.slug}`);
}
}));
await payload.destroy();
process.exit(0);
