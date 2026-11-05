import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		localPatterns: [
			{
				pathname: "/**",
			},
		],
		formats: ["image/avif", "image/webp"],
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
				],
			},
		];
	},
	// Editorial covers and screenshots moved to the Payload media library (R2) on 2026-11-05.
	// Keep old public/ URLs working for search engines, social shares and older revisions.
	async redirects() {
		const ext = ":file([a-z0-9-]+\\.(?:webp|jpg|jpeg|png|svg))";
		return [
			["/thumbnails/blog", "blog-cover-"],
			["/thumbnails/compare", "compare-cover-"],
			["/blog/shopify-flow", "blog-shopify-flow-"],
			["/blog/product-proof", "blog-product-proof-"],
			["/blog/enhancement", "blog-enhancement-"],
			["/blog/engineering", "blog-engineering-"],
			["/comparisons", "comparisons-"],
		].map(([from, prefix]) => ({ source: `${from}/${ext}`, destination: `/api/media/file/${prefix}:file`, permanent: true }));
	},
	// Packages with Cloudflare Workers specific implementations.
	serverExternalPackages: ["jose", "pg-cloudflare", "drizzle-kit"],
	webpack: (webpackConfig: any) => {
		webpackConfig.resolve.extensionAlias = {
			".cjs": [".cts", ".cjs"],
			".js": [".ts", ".tsx", ".js", ".jsx"],
			".mjs": [".mts", ".mjs"],
		};

		return webpackConfig;
	},
};

export default withPayload(nextConfig, { devBundleServerPackages: false });

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
