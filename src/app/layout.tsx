import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "WhatFlow | Automated WhatsApp Marketing & Notifications for Shopify",
	description: "Boost Shopify store sales with automated WhatsApp messaging. Recover abandoned checkouts, automate Judge.me review requests, trigger Shopify Flow events, and track ROI.",
	keywords: [
		"Shopify WhatsApp integration",
		"WhatsApp automation",
		"Abandoned checkout recovery",
		"Shopify Flow WhatsApp",
		"Judge.me WhatsApp reviews",
		"WhatsApp broadcast Shopify",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
			</head>
			<body className="antialiased bg-[#FCF5EB] text-[#111B21] selection:bg-[#25D366] selection:text-[#111B21]">
				{children}
			</body>
		</html>
	);
}
