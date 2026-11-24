import type {IncrementalCache} from '@opennextjs/aws/types/overrides.js';

// Only immutable public templates built by Next (initialRevalidateSeconds=false).
// The homepage, article/CMS routes, APIs and all fetch/database entries are excluded.
const STATIC_PUBLIC_PATHS = new Set([
  '/about', '/affiliate', '/affiliates', '/features', '/inbox', '/partners',
  '/pricing', '/privacy', '/security', '/solutions', '/terms',
]);

// Help-center articles are generated at build time with dynamicParams = false.
const isDocsPath = (path: string) => /^\/docs(?:\/[a-z0-9]+(?:-[a-z0-9]+)*){0,2}$/.test(path);

export function staticPublicPagesCache(delegate: IncrementalCache): IncrementalCache {
  return {
    // Preserve the official provider name so OpenNext uploads its build assets.
    name: delegate.name,
    async get(key, type) {
      const path = '/' + key.replace(/^\/+/, '');
      if ((type && type !== 'cache') || !(STATIC_PUBLIC_PATHS.has(path) || isDocsPath(path))) return null;
      return delegate.get(key, type);
    },
    // Read-only: never persist fetches, app reads or runtime-generated content.
    async set() {},
    async delete() {},
  };
}
