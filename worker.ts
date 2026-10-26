import {serveMarketingPage} from './src/edge/marketing-cache';

export default {
  async fetch(request, env, context) {
    return serveMarketingPage({
      request,
      version: env.CF_VERSION_METADATA?.id,
      cache: await caches.open('whatflow-public-pages'),
      context,
      render: async () => {
        // OpenNext generates this module at build time. Loading it only on a
        // miss/bypass keeps cached page requests out of the Next/Payload runtime.
        const {default: handler} = await import('./.open-next/worker.js');
        return handler.fetch(request, env, context);
      },
    });
  },
} satisfies ExportedHandler<CloudflareEnv>;
