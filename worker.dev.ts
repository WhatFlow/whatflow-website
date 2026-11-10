/** Development preview: no CMS credentials, database bindings, or production analytics. */
const publicOrigin = "https://whatflow.io";
const previewHeaders = { "X-Robots-Tag": "noindex, nofollow" };
const publicCollections = new Set(["/api/reviews", "/api/country-rates"]);

function withPreviewHeaders(response: Response) {
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", previewHeaders["X-Robots-Tag"]);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);
    const { pathname } = url;
    if (pathname === "/robots.txt") {
      return new Response("User-agent: *\nDisallow: /\n", { headers: { ...previewHeaders, "Content-Type": "text/plain" } });
    }
    if (pathname === "/api/marketing-event") return new Response(null, { status: 204, headers: previewHeaders });
    if (request.method !== "GET" && request.method !== "HEAD") return new Response(null, { status: 405, headers: previewHeaders });
    if (publicCollections.has(pathname) || /^\/api\/media\/file\/[^/]+$/.test(pathname)) {
      // Forward only the public URL and read method. Never forward cookies or authorization.
      const upstream = new URL(publicOrigin);
      upstream.pathname = pathname;
      upstream.search = url.search;
      return withPreviewHeaders(await fetch(upstream, { method: request.method, redirect: "manual" }));
    }
    if (/^\/(?:admin|api)(?:\/|$)/i.test(pathname)) return new Response(null, { status: 404, headers: previewHeaders });
    const { default: handler } = await import("./.open-next/worker.js");
    // The preview blocks CMS routes before handing off to the generated Worker.
    return withPreviewHeaders(await handler.fetch(request, env as CloudflareEnv, context));
  },
} satisfies ExportedHandler<Pick<CloudflareEnv, "ASSETS" | "IMAGES" | "WORKER_SELF_REFERENCE">>;
