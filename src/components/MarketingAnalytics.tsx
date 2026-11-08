"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function record(event: string, path: string, app = "", placement = "") {
  const params = new URLSearchParams({ event, path, app, placement });
  navigator.sendBeacon(`/api/marketing-event?${params}`);
}

export function MarketingAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) record("page_view", pathname);
  }, [pathname]);

  useEffect(() => {
    function trackInstall(event: MouseEvent) {
      if ((event.type === "auxclick" && event.button !== 1) || !event.isTrusted || !(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const url = new URL(link.href);
      if (url.origin !== "https://apps.shopify.com") return;
      const app = url.pathname.split("/")[1];
      if (app !== "whatflow" && app !== "whatflow-official-api") return;
      record("shopify_install_click", window.location.pathname, app, url.searchParams.get("utm_content") ?? "");
    }
    document.addEventListener("click", trackInstall, true);
    document.addEventListener("auxclick", trackInstall, true);
    return () => {
      document.removeEventListener("click", trackInstall, true);
      document.removeEventListener("auxclick", trackInstall, true);
    };
  }, []);

  return null;
}
