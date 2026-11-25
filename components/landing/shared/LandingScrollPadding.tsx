"use client";

import { useEffect } from "react";

/**
 * The root layout puts scroll-pt-[110px] on <html> for this site's navbar. The landing pages
 * have their own navbars and already offset anchor targets with scroll-mt-[130px], so the two
 * would add up and every in-page link would land 110px too low.
 *
 * Cleared from an effect (and restored on cleanup) rather than in CSS: with cacheComponents a
 * visited landing page stays in the DOM while hidden, so a CSS selector could keep matching it
 * on other pages, whereas effects are cleaned up whenever the page is hidden.
 */
const LandingScrollPadding = () => {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollPaddingTop;
    root.style.scrollPaddingTop = "0px";

    return () => {
      root.style.scrollPaddingTop = previous;
    };
  }, []);

  return null;
};

export default LandingScrollPadding;
