import {defineCloudflareConfig} from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';
import {staticPublicPagesCache} from './src/edge/static-public-pages';

export default defineCloudflareConfig({
  incrementalCache: staticPublicPagesCache(staticAssetsIncrementalCache),
  enableCacheInterception: true,
});
