import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker from './worker.mjs';

test('legacy and www hosts redirect to the canonical host, preserving paths and queries', () => {
  for (const host of ['whatflow.tech', 'www.whatflow.tech', 'www.whatflow.io']) {
    const response = worker.fetch(new Request(`http://${host}/blog/my%20post?q=one%2Btwo&q=three`));
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('location'), 'https://whatflow.io/blog/my%20post?q=one%2Btwo&q=three');
  }
});

test('POST keeps its method and a path cannot redirect to another host', () => {
  const response = worker.fetch(new Request('https://whatflow.tech//elsewhere.test/path', {method:'POST'}));
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), 'https://whatflow.io//elsewhere.test/path');
});

test('redirect worker cannot redirect an unrelated app or the new apex', () => {
  for (const host of ['whatflow.io', 'mcp.whatflow.tech', 'app.whatflow.io']) {
    const response = worker.fetch(new Request(`https://${host}/`));
    assert.equal(response.status, 404);
  }
});
