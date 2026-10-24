export interface EditorialComparison {
  slug: string;
  competitor: string;
  category: 'shopify' | 'whatsapp' | 'api' | 'support';
  title: string;
  excerpt: string;
  verdict: string;
  source: [string, string];
  focus: [string, string, string];
  body: string;
  faqs: [string, string][];
}
declare const articles: EditorialComparison[];
export default articles;
