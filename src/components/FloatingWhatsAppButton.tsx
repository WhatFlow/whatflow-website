import Image from "next/image";

export function FloatingWhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT_NUMBER?.trim().replace(/^\+/, "");
  if (!number || !/^[1-9]\d{1,14}$/.test(number)) return null;

  const message = encodeURIComponent("Hi WhatFlow team, I need help with WhatFlow.");

  return (
    <aside aria-label="WhatFlow support">
      <a
        href={`https://wa.me/${number}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact WhatFlow support on WhatsApp (opens in a new tab)"
        className="neo-btn fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-40 flex size-14 items-center justify-center rounded-2xl bg-[var(--green)] text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black motion-reduce:transition-none"
      >
        <Image
          src="/meta-brand-assets/whatsapp-brand-assets/01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_Black_RGB_2026.svg"
          width={30}
          height={30}
          alt=""
        />
      </a>
    </aside>
  );
}
