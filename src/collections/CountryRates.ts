import type { CollectionConfig } from "payload";

export const CountryRates: CollectionConfig = {
	slug: "country-rates",
	admin: {
		useAsTitle: "market",
		defaultColumns: ["market", "currency", "utility", "marketing", "authentication", "active"],
		group: "Pricing & Rates",
	},
	labels: {
		singular: "Country Rate",
		plural: "Country Rates",
	},
	access: {
		read: () => true, // Public read so site visitors can see dynamic Meta WhatsApp rates
		create: ({ req }) => {
			const apiKey = req.headers?.get?.("x-api-key") || (req as any)?.headers?.["x-api-key"];
			const validKey = process.env.RATES_SYNC_SECRET || process.env.PAYLOAD_SECRET;
			if (apiKey && validKey && apiKey === validKey) return true;
			return Boolean(req.user);
		},
		update: ({ req }) => {
			const apiKey = req.headers?.get?.("x-api-key") || (req as any)?.headers?.["x-api-key"];
			const validKey = process.env.RATES_SYNC_SECRET || process.env.PAYLOAD_SECRET;
			if (apiKey && validKey && apiKey === validKey) return true;
			return Boolean(req.user);
		},
		delete: ({ req }) => Boolean(req.user),
	},
	fields: [
		{
			name: "market",
			type: "text",
			required: true,
			unique: true,
			index: true,
			label: "Market / Country Name",
			admin: {
				placeholder: "e.g. Argentina, Germany, India",
			},
		},
		{
			name: "currency",
			type: "text",
			required: true,
			defaultValue: "USD",
			label: "Currency",
			admin: {
				placeholder: "USD",
			},
		},
		{
			type: "row",
			fields: [
				{
					name: "marketing",
					type: "number",
					required: true,
					label: "Marketing Rate ($)",
					admin: {
						step: 0.0001,
						placeholder: "0.0618",
						width: "50%",
					},
				},
				{
					name: "utility",
					type: "number",
					required: true,
					label: "Utility Rate ($)",
					admin: {
						step: 0.0001,
						placeholder: "0.0260",
						width: "50%",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "authentication",
					type: "number",
					label: "Authentication Rate ($)",
					admin: {
						step: 0.0001,
						placeholder: "0.0260",
						width: "33.33%",
					},
				},
				{
					name: "authenticationInternational",
					type: "number",
					label: "Authentication - International ($)",
					admin: {
						step: 0.0001,
						placeholder: "0.0650",
						width: "33.33%",
					},
				},
				{
					name: "service",
					type: "number",
					label: "Service Rate ($)",
					admin: {
						step: 0.0001,
						placeholder: "0.0000",
						width: "33.33%",
					},
				},
			],
		},
		{
			name: "active",
			type: "checkbox",
			defaultValue: true,
			label: "Active / Published",
		},
	],
};
