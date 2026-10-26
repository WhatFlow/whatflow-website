"use client";

import { useState } from "react";

import { HOMEPAGE_FAQS } from "@/lib/marketing-faqs";

const FAQS = HOMEPAGE_FAQS.map(({question, answer}) => ({q: question, a: answer}));

export function FAQSection() {
	const [openIdx, setOpenIdx] = useState<number | null>(0);

	return (
		<section id="faq" className="bg-[#FAF7F0] py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black">
			<div className="max-w-3xl mx-auto space-y-10">
				<div className="text-center space-y-3">
					<div className="neo-box inline-block bg-[#00D261] px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-black">
						FREQUENTLY ASKED
					</div>
					<h2 className="text-[34px] sm:text-[44px] font-display font-black uppercase text-black tracking-tight">
						GOT QUESTIONS? WE HAVE ANSWERS.
					</h2>
				</div>

				<div className="space-y-4">
					{FAQS.map((faq, idx) => (
						<div key={idx} className="neo-box bg-white overflow-hidden">
							<button
								onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
								className="w-full p-5 text-left font-extrabold text-sm sm:text-base text-black flex items-center justify-between gap-4 hover:bg-[#FAF7F0]"
							>
								<span>{faq.q}</span>
								<span className="w-7 h-7 rounded-full bg-[#FAF7F0] border border-black flex items-center justify-center text-lg font-black">
									{openIdx === idx ? "−" : "+"}
								</span>
							</button>
							{openIdx === idx && (
								<div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-700 font-medium leading-relaxed border-t border-gray-200">
									{faq.a}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
