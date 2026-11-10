"use client";

import { useEffect, useState } from "react";
import { scrollToY } from "@/components/site/SiteMotion";

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

    // Headings come from the rendered article DOM, so they can only be read after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <div className="wfc-toc">
      <div className="wfc-toc-head">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
        <span>On this page</span>
      </div>
      <nav aria-label="Table of contents">
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
                  scrollToY(el.getBoundingClientRect().top + window.scrollY - 96);
                  history.pushState(null, "", `#${h.id}`);
                }
              }}
              data-level={h.level}
              aria-current={isActive ? "true" : undefined}
            >
              {h.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
