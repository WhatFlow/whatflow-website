export function recordMarketingEvent(request: Request, url: URL, dataset: AnalyticsEngineDataset): Response {
  const headers = { "Cache-Control": "no-store" };
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { ...headers, Allow: "POST" } });
  }
  if (request.headers.get("Origin") !== url.origin || url.hostname !== "whatflow.io") {
    return new Response(null, { status: 403, headers });
  }

  const event = url.searchParams.get("event");
  const path = url.searchParams.get("path") ?? "";
  const app = url.searchParams.get("app") ?? "";
  const placement = url.searchParams.get("placement") ?? "";
  const validPath = /^\/[a-z0-9/_-]{0,180}$/i.test(path);
  const pageView = event === "page_view" && !app && !placement;
  const installClick = event === "shopify_install_click"
    && (app === "whatflow" || app === "whatflow-official-api")
    && /^[a-z0-9_-]{0,64}$/i.test(placement);

  if (!validPath || (!pageView && !installClick)) {
    return new Response(null, { status: 400, headers });
  }

  dataset.writeDataPoint({ indexes: [event], blobs: [event, path, app, placement], doubles: [1] });
  return new Response(null, { status: 204, headers });
}
