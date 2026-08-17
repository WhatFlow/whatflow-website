import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import type { CountryRateItem } from "@/lib/country-rates-data";

export async function GET() {
	try {
		const payload = await getPayload({ config });
		const result = await payload.find({
			collection: "country-rates",
			limit: 300,
			sort: "market",
			where: {
				active: {
					equals: true,
				},
			},
		});

		return NextResponse.json({
			source: "database",
			totalDocs: result.totalDocs || 0,
			docs: result.docs || [],
		});
	} catch (error: any) {
		console.error("Failed to fetch country rates from CMS:", error);
		return NextResponse.json({
			source: "database",
			totalDocs: 0,
			docs: [],
			error: error?.message,
		}, { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const authHeader = req.headers.get("x-api-key");
		const validKey = process.env.RATES_SYNC_SECRET || process.env.PAYLOAD_SECRET;

		// Optional security check if RATES_SYNC_SECRET is set
		if (validKey && authHeader && authHeader !== validKey) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body: any = await req.json();
		const payload = await getPayload({ config });

		const ratesToUpsert: CountryRateItem[] = Array.isArray(body)
			? body
			: body?.rates || [];

		if (ratesToUpsert.length === 0) {
			return NextResponse.json({ error: "No rates provided. Send array of rate objects or { rates: [...] }" }, { status: 400 });
		}

		const results = [];

		for (const rate of ratesToUpsert) {
			if (!rate.market) continue;

			// Check if already exists by market name
			const existing = await payload.find({
				collection: "country-rates",
				where: {
					market: {
						equals: rate.market,
					},
				},
				limit: 1,
			});

			if (existing.docs && existing.docs.length > 0) {
				const updated = await payload.update({
					collection: "country-rates",
					id: existing.docs[0].id,
					data: {
						currency: rate.currency || "USD",
						marketing: Number(rate.marketing),
						utility: Number(rate.utility),
						authentication: rate.authentication !== undefined && rate.authentication !== null ? Number(rate.authentication) : null,
						authenticationInternational: rate.authenticationInternational !== undefined && rate.authenticationInternational !== null ? Number(rate.authenticationInternational) : null,
						service: rate.service !== undefined && rate.service !== null ? Number(rate.service) : null,
						active: rate.active ?? true,
					},
				});
				results.push({ market: rate.market, action: "updated", id: updated.id });
			} else {
				const created = await payload.create({
					collection: "country-rates",
					data: {
						market: rate.market,
						currency: rate.currency || "USD",
						marketing: Number(rate.marketing),
						utility: Number(rate.utility),
						authentication: rate.authentication !== undefined && rate.authentication !== null ? Number(rate.authentication) : null,
						authenticationInternational: rate.authenticationInternational !== undefined && rate.authenticationInternational !== null ? Number(rate.authenticationInternational) : null,
						service: rate.service !== undefined && rate.service !== null ? Number(rate.service) : null,
						active: rate.active ?? true,
					},
				});
				results.push({ market: rate.market, action: "created", id: created.id });
			}
		}

		return NextResponse.json({
			success: true,
			count: results.length,
			results,
		});
	} catch (error: any) {
		console.error("Failed to sync country rates:", error);
		return NextResponse.json({ error: error?.message || "Failed to process rates" }, { status: 500 });
	}
}
