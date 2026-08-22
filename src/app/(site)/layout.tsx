import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";

import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/schema-org";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-space-grotesk",
});

const siteUrl =
	process.env.NEXT_PUBLIC_SITE_URL ||
	(process.env.NODE_ENV === "production" ? "https://whatflow.io" : "http://localhost:3000");

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "WhatFlow — WhatsApp Apps & Automations for Shopify Stores",
		template: "%s | WhatFlow",
	},
	description:
		"Automate WhatsApp marketing, recover abandoned carts with 98% open rates, verify COD orders, and boost Shopify conversions with official Meta API.",
	keywords: [
		"Shopify WhatsApp app",
		"WhatsApp automation Shopify",
		"Abandoned cart recovery WhatsApp",
		"WhatFlow",
		"WhatsApp Business API Shopify",
		"WhatsApp AI chatbot Shopify",
		"COD verification Shopify WhatsApp",
		"Shopify WhatsApp marketing",
	],
	alternates: {
		canonical: "./",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteUrl,
		siteName: "WhatFlow",
		title: "WhatFlow — WhatsApp Apps & Automations for Shopify Stores",
		description:
			"Automate WhatsApp marketing, recover abandoned carts, verify COD orders, and boost Shopify conversions with official Meta API.",
	},
	twitter: {
		card: "summary_large_image",
		title: "WhatFlow — WhatsApp Apps & Automations for Shopify Stores",
		description:
			"Automate WhatsApp marketing, recover abandoned carts, verify COD orders, and boost Shopify conversions with official Meta API.",
		creator: "@whatflow_io",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const orgSchema = getOrganizationSchema();
	const websiteSchema = getWebSiteSchema();

	return (
		<html lang="en" className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable}`}>
			<head>
				<link rel="icon" href="/logo.svg" type="image/svg+xml" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
				/>
			</head>
			<body
				className="antialiased bg-[#FDFBF7] text-[#000000] selection:bg-[#00D261] selection:text-black font-sans"
			>
				<AnnouncementBar />
				<Navbar />
				<main className="min-h-screen">{children}</main>
				<Footer />
				<FloatingWhatsAppButton />
			</body>
		</html>
	);
}
