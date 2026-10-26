import type {IncrementalCache} from '@opennextjs/aws/types/overrides.js';

// Only immutable public templates built by Next (initialRevalidateSeconds=false).
// The homepage, article/CMS routes, APIs and all fetch/database entries are excluded.
const STATIC_PUBLIC_PATHS = new Set([
  '/about', '/affiliate', '/affiliates', '/features', '/inbox', '/partners',
  '/pricing', '/privacy', '/security', '/solutions', '/terms',
]);

export function staticPublicPagesCache(delegate: IncrementalCache): IncrementalCache {
  return {
    // Preserve the official provider name so OpenNext uploads its build assets.
    name: delegate.name,
    async get(key, type) {
      if ((type && type !== 'cache') || !STATIC_PUBLIC_PATHS.has('/' + key.replace(/^\/+/, ''))) return null;
      return delegate.get(key, type);
    },
    // Read-only: never persist fetches, app reads or runtime-generated content.
    async set() {},
    async delete() {},
  };
}
