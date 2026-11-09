"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Progressive enhancement: content stays visible without JS or browser support. */
export function HomeMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window) || !Element.prototype.animate) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Map<HTMLElement, Animation>();
    const easing = getComputedStyle(root).getPropertyValue("--ease-out").trim();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element); // Once per visit; scrolling back never replays it.
        if (element.contains(document.activeElement)) continue;

        const reduced = preference.matches;
        const delay = reduced ? 0 : Number(element.dataset.homeDelay || 0);
        const animation = element.animate(
          reduced
            ? [{ opacity: 0.75 }, { opacity: 1 }]
            : [
                { opacity: 0, transform: "translateY(16px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
          { duration: reduced ? 180 : 500, delay, easing, fill: "backwards" },
        );
        animations.set(element, animation);
        animation.finished.then(() => {
          // No persistent transform/layer once the entrance has finished.
          if (animations.get(element) === animation) animations.delete(element);
        }).catch(() => { /* Cancellation reveals the underlying content immediately. */ });
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -32px 0px" });

    root.querySelectorAll<HTMLElement>("[data-home-reveal]").forEach((element) => observer.observe(element));

    const cancelAnimations = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const revealFocused = (event: FocusEvent) => {
      animations.forEach((animation, element) => {
        if (event.target instanceof Node && element.contains(event.target)) {
          animation.cancel();
          animations.delete(element);
        }
      });
    };
    preference.addEventListener("change", cancelAnimations);
    root.addEventListener("focusin", revealFocused);
    return () => {
      observer.disconnect();
      cancelAnimations();
      preference.removeEventListener("change", cancelAnimations);
      root.removeEventListener("focusin", revealFocused);
    };
  }, []);

  return (
    <div ref={rootRef} className="home-motion">
      <div className="home-scroll-progress" aria-hidden="true" />
      {children}
    </div>
  );
}
