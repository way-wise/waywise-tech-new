"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import "./pinned-section.css";
import { SCROLL_EFFECTS } from "./scrollEffects";

type PinnedSectionProps = {
  children: ReactNode;
  /**
   * Selector for an element that ends the page after this section. The pin must not outlast it, or
   * the spacer would run past the end of the page and add empty scrolling.
   */
  limitCoverTo?: string;
  /**
   * Extra scrolling, as a CSS length such as "70svh", during which the section stays pinned and fully
   * visible before the next section starts to rise over it. The page grows by this distance. None by
   * default.
   */
  hold?: string;
};

/**
 * Holds a section still once its bottom reaches the bottom of the screen, while the next section
 * rises over it. Scrolling stays native: this only measures heights, because CSS cannot read an
 * element's own height for `top`. Without JavaScript the height is unset and the page scrolls normally.
 *
 * Off since 2026-11-25 (owner): with SCROLL_EFFECTS false the section sits in normal flow, its `hold`
 * and `limitCoverTo` have no effect, and the page scrolls normally. Pages keep their PinnedSection
 * wrappers, so setting the switch back to true restores every pin exactly as it was.
 */
export function PinnedSection({ children, limitCoverTo, hold }: PinnedSectionProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll effects off (scrollEffects.ts): no pin, so nothing to measure. The wrapper stays in the
    // DOM, so the page structure and anything that looks it up are unchanged.
    if (!SCROLL_EFFECTS) return;
    const section = body.current;
    const limit = limitCoverTo ? document.querySelector(limitCoverTo) : null;
    if (!wrapper.current || !section) return;

    const observer = new ResizeObserver(() => {
      const style = wrapper.current?.style;
      style?.setProperty("--pin-height", `${section.getBoundingClientRect().height}px`);
      if (limit) style?.setProperty("--pin-limit", `${limit.getBoundingClientRect().height}px`);
    });
    observer.observe(section);
    if (limit) observer.observe(limit);

    // Text fields count as :focus-visible even on a click, so a click must not release the pin.
    const onPointerDown = () => section.setAttribute("data-pointer-focus", "");
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") section.removeAttribute("data-pointer-focus");
    };
    section.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      observer.disconnect();
      section.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [limitCoverTo]);

  return (
    <div
      ref={wrapper}
      className="pin-wrapper"
      data-hold={hold ? "" : undefined}
      style={hold ? ({ "--pin-hold": hold } as CSSProperties) : undefined}
    >
      <div ref={body} className="pin-body">
        {children}
      </div>
    </div>
  );
}
