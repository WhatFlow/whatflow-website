export interface CountryRateItem {
	id?: string;
	market: string;
	currency: string;
	marketing: number;
	utility: number;
	authentication?: number | null;
	authenticationInternational?: number | null;
	service?: number | null;
	active?: boolean;
}
