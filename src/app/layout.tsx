import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "WhatFlow | Automated WhatsApp Marketing & Notifications for Shopify",
	description: "Boost Shopify store sales with automated WhatsApp messaging. Recover abandoned checkouts, automate Judge.me review requests, trigger Shopify Flow events, and track ROI with built-in analytics.",
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
		<html lang="en" className="dark scroll-smooth">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#090d16] text-gray-100 selection:bg-emerald-500 selection:text-black`}>
				{children}
			</body>
		</html>
	);
}

