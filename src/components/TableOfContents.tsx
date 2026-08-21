"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ selector = ".prose-whatflow" }: { selector?: string }) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const container = document.querySelector(selector);
    if (!container) return;

    const headingElements = container.querySelectorAll("h2, h3");
    const items: TocItem[] = [];

    headingElements.forEach((el, index) => {
      let id = el.id;
      if (!id) {
        id =
          el.textContent
            ?.toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-") || `heading-${index}`;
        el.id = id;
      }

      items.push({
        id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      });
    });

    setHeadings(items);

    // Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0% -60% 0%" }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);

  if (headings.length === 0) return null;

  return (
    <div className="neo-box bg-white p-5 rounded-xl space-y-3 sticky top-24">
      <div className="flex items-center gap-2 pb-2 border-b border-black font-display font-black text-xs uppercase tracking-wider text-black">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
        <span>Table of Contents</span>
      </div>
      <nav className="space-y-1 text-xs">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(h.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  history.pushState(null, "", `#${h.id}`);
                }
              }}
              className={`block py-1 transition-all rounded px-2 font-medium ${
                h.level === 3 ? "ml-3 text-[11px]" : ""
              } ${
                isActive
                  ? "bg-[#00D261] text-black font-bold shadow-[2px_2px_0px_#000]"
                  : "text-gray-700 hover:bg-[#FAF7F0] hover:text-black"
              }`}
            >
              {h.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
