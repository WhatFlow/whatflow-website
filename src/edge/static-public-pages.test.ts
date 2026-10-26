import {test} from 'node:test';
import assert from 'node:assert/strict';
import type {IncrementalCache} from '@opennextjs/aws/types/overrides.js';
import {staticPublicPagesCache} from './static-public-pages';

test('only public static templates reach the read-only build cache', async () => {
  const reads: string[] = [];
  const delegate: IncrementalCache = {name: 'cf-static-assets-incremental-cache', async get(key) {reads.push(key); return null;}, async set() {throw Error('unexpected write');}, async delete() {throw Error('unexpected delete');}};
  const cache = staticPublicPagesCache(delegate);
  await cache.get('/inbox', 'cache'); await cache.get('features');
  for (const key of ['/index', '/', '/blog', '/blog/example', '/compare/example', '/api/posts', '/admin', '/inbox/../admin']) await cache.get(key, 'cache');
  await cache.get('/inbox', 'fetch'); await cache.get('/inbox', 'composable');
  assert.deepEqual(reads, ['/inbox', 'features']);
  assert.equal(cache.name, delegate.name);
});

test('runtime writes and invalidations cannot change the static store', async () => {
  let writes = 0;
  const delegate: IncrementalCache = {name: 'static', async get() {return null;}, async set() {writes++;}, async delete() {writes++;}};
  const cache = staticPublicPagesCache(delegate);
  await cache.set('data', {kind: 'FETCH', data: {headers: {}, body: '', url: 'https://example.com', status: 200}, revalidate: 60}, 'fetch');
  await cache.delete('data');
  assert.equal(writes, 0);
});
