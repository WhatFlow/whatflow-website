import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
	title: "WhatFlow — WhatsApp Apps for Shopify Stores",
	description: "Automate WhatsApp messages, recover abandoned carts, collect reviews, and grow your Shopify store with WhatFlow's suite of WhatsApp apps.",
	keywords: [
		"Shopify WhatsApp app",
		"WhatsApp automation Shopify",
		"Abandoned cart recovery WhatsApp",
		"WhatFlow",
		"WhatsApp Business API Shopify",
		"WhatsApp AI chatbot Shopify",
	],
};

import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<head>
				<link rel="icon" href="/logo.svg" type="image/svg+xml" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@700;800;900&display=swap" rel="stylesheet" />
			</head>
			<body className="antialiased bg-[#FDFBF7] text-[#000000] selection:bg-[#00D261] selection:text-black" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
				<AnnouncementBar />
				<Navbar />
				<main className="min-h-screen">{children}</main>
				<Footer />
				<FloatingWhatsAppButton />
			</body>
		</html>
	);
}
