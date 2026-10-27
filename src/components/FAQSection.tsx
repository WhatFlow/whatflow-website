import { HOMEPAGE_FAQS } from "@/lib/marketing-faqs";

export function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-[#FAF7F0] py-16 sm:py-20 px-4 sm:px-6 border-b-[2.5px] border-black">
      <div className="max-w-3xl mx-auto space-y-10">
        <h2 id="faq-heading" className="text-[34px] sm:text-[44px] font-display font-black uppercase text-black tracking-tight text-center">What should I know before installing WhatFlow?</h2>
        <div className="space-y-4">
          {HOMEPAGE_FAQS.map(({ question, answer }, index) => (
            <details key={question} open={index === 0} className="neo-box bg-white overflow-hidden">
              <summary className="p-5 font-extrabold text-sm sm:text-base text-black cursor-pointer hover:bg-[#FAF7F0]">{question}</summary>
              <p className="px-5 pb-5 pt-3 text-sm text-gray-700 leading-relaxed border-t border-gray-200">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
