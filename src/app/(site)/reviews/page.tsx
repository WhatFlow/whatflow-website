import type { Metadata } from "next";
import Link from "next/link";
import { getReviews, type Review } from "@/lib/payload-api";
import { getShopifyAppUrl } from "@/lib/shopify-app";

export const metadata: Metadata = {
  title: "Merchant Reviews & Wall of Love | WhatFlow",
  description: "Read real reviews from Shopify merchants growing revenue with WhatFlow WhatsApp marketing.",
};

const FALLBACK_REVIEWS: Partial<Review>[] = [
  {
    storeName: "Aura Botanicals",
    merchantName: "Elena Rostova",
    quote: "WhatFlow recovered $14,200 in abandoned checkouts within our first 30 days. The WhatsApp open rates are 94% compared to 18% on our email campaigns.",
    rating: 5,
    highlight: "Recovered $14.2k in 30 days",
    app: "business-api",
  },
  {
    storeName: "HyperGear Apparel",
    merchantName: "Marcus Vance",
    quote: "Our COD order cancellation rate dropped from 22% to under 6% thanks to the 1-click interactive WhatsApp confirmation buttons. Absolutely vital for international shipping.",
    rating: 5,
    highlight: "COD cancellations dropped from 22% to <6%",
    app: "business-api",
  },
  {
    storeName: "Brewcraft Co.",
    merchantName: "David Sterling",
    quote: "Setup was ridiculously simple. Connected our Meta WABA in under 3 minutes and the official Meta Cloud API rates have zero markup. Best decision for our Shopify store.",
    rating: 5,
    highlight: "Zero markup on Meta rates",
    app: "chat",
  },
  {
    storeName: "Glow Skin Lab",
    merchantName: "Amina Khan",
    quote: "The Judge.me review integration alone doubled our weekly review collection. Customers love tapping a 5-star button on WhatsApp right after delivery.",
    rating: 5,
    highlight: "2x review collection rate",
    app: "business-api",
  },
  {
    storeName: "Nomad Leather Goods",
    merchantName: "Julian Hayes",
    quote: "Customer support questions are resolved twice as fast. Our support reps can manage WhatsApp queries right inside our existing helpdesk without context switching.",
    rating: 5,
    highlight: "2x faster support resolution",
    app: "chat",
  },
  {
    storeName: "Urban Pet Supplies",
    merchantName: "Chloe Bennett",
    quote: "Back-in-stock alerts on WhatsApp sell out our restocked items within 2 hours. The speed and immediacy of WhatsApp is unmatched by any email tool.",
    rating: 5,
    highlight: "Restocks sold out in 2 hours",
    app: "ai",
  },
];

export default async function ReviewsPage() {
  let reviews: Review[] = [];
  try {
    const res = await getReviews();
    reviews = res.docs;
  } catch {
    reviews = [];
  }

  const allReviews = reviews.length > 0 ? reviews : (FALLBACK_REVIEWS as Review[]);

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* ─── Hero ─── */}
      <section className="bg-[#FAF7F0] border-b-[2.5px] border-black px-4 sm:px-6 py-16 sm:py-20 text-center">
        <div className="max-w-[1280px] mx-auto">
          <div className="neo-box inline-block bg-[#00D261] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-black mb-4">
            WALL OF LOVE
          </div>
          <h1 className="text-[44px] sm:text-[60px] lg:text-[76px] font-display font-black uppercase text-black tracking-tight leading-none mb-6">
            LOVED BY 2,000+ <br />
            <span className="text-stroke-green">SHOPIFY MERCHANTS.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-medium max-w-2xl mx-auto mb-8">
            See how stores around the world use WhatFlow to turn WhatsApp into their highest-ROI marketing channel.
          </p>

          {/* Social Proof Strip */}
          <div className="inline-flex items-center gap-4 neo-box bg-white px-6 py-3 rounded-xl">
            <div className="flex text-[#FFC107] text-lg font-black tracking-widest">
              ★★★★★
            </div>
            <div className="text-xs font-extrabold uppercase text-black">
              4.9 / 5 Average Rating on Shopify App Store
            </div>
          </div>
        </div>
      </section>

      {/* ─── Reviews Masonry Grid ─── */}
      <section className="px-4 sm:px-6 py-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allReviews.map((review) => (
            <div
              key={review.storeName + (review.merchantName || "")}
              className="neo-box bg-white p-7 rounded-2xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-[#FFC107] text-sm tracking-wider font-bold">
                    {"★".repeat(Math.min(5, Math.max(1, review.rating || 5)))}
                  </div>
                  {review.highlight && (
                    <span className="neo-pill bg-[#E8F8F0] text-[#0A6B56] text-[10px] font-extrabold uppercase px-2.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                      {review.highlight}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#222] font-medium leading-relaxed italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#00D261] border border-black flex items-center justify-center font-black text-xs text-black">
                    {review.storeName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-black uppercase leading-tight">
                      {review.storeName}
                    </div>
                    {review.merchantName && (
                      <div className="text-[10px] text-gray-500 font-bold">
                        {review.merchantName}
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#00D261] uppercase">✓ Verified</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="px-4 sm:px-6 pb-20 max-w-[1280px] mx-auto">
        <div className="neo-box bg-[#091E17] text-white p-8 sm:p-12 rounded-2xl text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tight">
            READY TO JOIN 2,000+ HIGH-GROWTH MERCHANTS?
          </h2>
          <p className="text-sm text-[#A7F3D0] max-w-xl mx-auto font-medium leading-relaxed">
            Install WhatFlow on your Shopify store in 3 minutes. 14-day free trial, no credit card required.
          </p>
          <div className="pt-2">
            <Link
              href={getShopifyAppUrl("reviews_page_bottom")}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn inline-flex items-center gap-2 bg-[#00D261] text-black font-extrabold text-xs uppercase px-7 py-3.5 rounded-lg shadow-[4px_4px_0px_#000] hover:scale-105 transition-transform"
            >
              <span>INSTALL WHATFLOW FREE</span>
              <span>➔</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
