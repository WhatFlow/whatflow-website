/**
 * Official Shopify App Store URL with standardized UTM tracking parameters.
 */
export const BASE_SHOPIFY_APP_URL = "https://apps.shopify.com/whatflow-official-api";

export function getShopifyAppUrl(placement: string = "general"): string {
  const params = new URLSearchParams({
    utm_source: "whatflow_website",
    utm_medium: "website_cta",
    utm_campaign: "website_direct",
    utm_content: placement,
  });
  return `${BASE_SHOPIFY_APP_URL}?${params.toString()}`;
}

export const SHOPIFY_APP_URL = getShopifyAppUrl("website_direct");
