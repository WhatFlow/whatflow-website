import type { Comparison } from '../../src/payload-types';
export const reviewedAt: string;
export const plans: {name:string;base:number;included:number;overage:number}[];
export function estimate(sends:number): {name:string;base:number;included:number;overage:number;total:number};
declare const articles: (Omit<Comparison,'id'|'content'|'createdAt'|'updatedAt'|'_status'|'publishedAt'> & {body:string;relatedSlugs?:string[];category:'shopify'|'whatsapp'|'api'|'support'|'channels'|'usecases'})[];
export default articles;
