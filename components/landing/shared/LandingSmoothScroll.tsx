"use client";

import { useEffect } from "react";

/**
 * Smooth in-page anchor scrolling for one landing route (used by each landing layout).
 *
 * `scroll-behavior` has to sit on the scrolling element (the document root), so it cannot
 * be scoped with a CSS class. Setting it from an effect and restoring the previous value on
 * unmount keeps it confined to the landing page instead of applying to the whole site via
 * globals.css. With cacheComponents a visited page stays mounted while hidden, but its
 * effects are cleaned up, so other pages never keep it.
 *
 * Each page offsets its anchor targets with its own `scroll-mt-*` (its pinned navbar's
 * height plus a little room), so headings land below the bar instead of underneath it.
 */
const LandingSmoothScroll = () => {
  useEffect(() => {
    // Honour the OS-level motion preference: a long animated scroll is exactly the
    // kind of movement that triggers discomfort.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";

    return () => {
      root.style.scrollBehavior = previous;
    };
  }, []);

  return null;
};

export default LandingSmoothScroll;
