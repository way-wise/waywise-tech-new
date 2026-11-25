"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { PageFlip } from "page-flip";
import { companyProfile } from "@/lib/content/profile";

/**
 * Two pages side by side only when each page can be at least this wide; otherwise one page.
 * StPageFlip also uses it as the book's minimum width, so it must fit a 320px phone.
 */
const MIN_PAGE_WIDTH = 260;
/** Default view: screen height kept free for the controls and a margin around the book. */
const RESERVED_HEIGHT = 150;
/** The book is never shorter than this, however short the screen. */
const MIN_BOOK_HEIGHT = 420;
/** Widest a booklet page image is rendered, in device pixels (sharp at full size on large screens). */
const MAX_RENDER_WIDTH = 1600;

/** One booklet page: a PDF page, or the left or right half of a PDF spread. */
type Sheet = { pdfPage: number; part: "whole" | "left" | "right" };

/**
 * The booklet's pages in reading order. For a printed fold-out ("spreads"), PDF page 1 is the outside
 * of the brochure (back cover on the left, front cover on the right) and the other PDF pages are the
 * inside spreads, so: front cover, then each inside spread's left and right pages, then the back cover.
 */
function bookletOrder(pdfPages: number, format: "spreads" | "pages"): Sheet[] {
  if (format === "pages" || pdfPages < 2) {
    return Array.from({ length: pdfPages }, (_, index) => ({ pdfPage: index + 1, part: "whole" }));
  }
  const inside = Array.from({ length: pdfPages - 1 }, (_, index) => index + 2).flatMap((pdfPage) => [
    { pdfPage, part: "left" as const },
    { pdfPage, part: "right" as const },
  ]);
  return [{ pdfPage: 1, part: "right" }, ...inside, { pdfPage: 1, part: "left" }];
}

type Status = "loading" | "ready" | "error";

/** The page indexes in view: the cover and the back cover stand alone, the rest open in pairs. */
function visiblePages(index: number, count: number, portrait: boolean) {
  if (portrait || index === 0) return [index];
  const left = index % 2 === 1 ? index : index - 1;
  return left + 1 < count ? [left, left + 1] : [left];
}

function FullscreenIcon({ exit }: { exit: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={
          exit
            ? "M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"
            : "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
        }
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The company profile as a booklet (owner, 2026-11-25). PDF.js (pdfjs-dist) draws each PDF page into
 * an image in the browser, and StPageFlip (page-flip) turns them like a printed booklet: two pages
 * side by side on wide screens, one page on narrow ones, the cover and back cover on their own.
 * Pages turn by dragging a corner or swiping, by the arrows, or with the arrow keys.
 *
 * Nothing is converted ahead of time: replace the PDF (lib/content/profile.ts) and the booklet follows,
 * taking its page count and page shape from the file. Pages are rendered one after another, the first
 * ones first, so the cover appears quickly; until a page is ready it shows as a blank sheet.
 *
 * Reduced motion: the pages change instantly (no flip animation), and dragging is off.
 * Without JavaScript or if the PDF cannot be drawn, a link opens the PDF itself.
 *
 * StPageFlip takes over the element it is given (and removes it in destroy()), so it gets its own
 * element created here, never one React renders.
 */
export function ProfileFlipbook() {
  const { pdf, format, downloadName, labels } = companyProfile;
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<() => void>(() => {});
  const fullRef = useRef(false);
  const flipRef = useRef<PageFlip | null>(null);
  const reducedRef = useRef(false);
  const [status, setStatus] = useState<Status>("loading");
  const [pageCount, setPageCount] = useState(0);
  const [current, setCurrent] = useState(0);
  // The page the book is centred for. It moves to a turn's destination as the turn starts (so the
  // book slides while the page turns), and to the actual page when a turn ends.
  const [centreOn, setCentreOn] = useState(0);
  const [portrait, setPortrait] = useState(false);
  // Page changes are announced only once the visitor has turned a page (not on load).
  const [turned, setTurned] = useState(false);
  // Full screen: the browser's own full screen where it exists, otherwise (iPhone) the booklet is
  // laid over the whole page. Either way the book is sized to fit the screen.
  const [full, setFull] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let cancelled = false;
    let flip: PageFlip | null = null;
    let destroyDoc: (() => void) | null = null;
    let ratio = 1; // booklet page width / height, from the PDF
    const urls: string[] = [];
    const host = document.createElement("div");
    host.className = "w-full";
    stage.appendChild(host);
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Default view: the book and its controls fit one screen (owner, 2026-11-25: the full-width book
    // was too big), as wide as that allows. Full screen: as large as the whole screen allows.
    // Its height follows from the page shape (StPageFlip).
    const fit = () => {
      const region = stage.parentElement;
      const width = region?.clientWidth ?? stage.clientWidth;
      const height =
        fullRef.current && region
          ? region.clientHeight
          : Math.max(MIN_BOOK_HEIGHT, window.innerHeight - RESERVED_HEIGHT);
      const spread = Math.min(width, height * ratio * 2);
      const size = spread >= MIN_PAGE_WIDTH * 2 ? spread : Math.min(width, height * ratio);
      stage.style.maxWidth = `${Math.floor(size)}px`;
      flip?.update();
    };
    fitRef.current = fit;

    const load = async () => {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();
      const task = pdfjs.getDocument({ url: pdf });
      destroyDoc = () => void task.destroy();
      const doc = await task.promise;
      if (cancelled) return;

      const first = await doc.getPage(1);
      const base = first.getViewport({ scale: 1 });
      const order = bookletOrder(doc.numPages, format);
      const halves = order.some((sheet) => sheet.part !== "whole");
      ratio = (halves ? base.width / 2 : base.width) / base.height;
      fit();

      // One element per booklet page; each gets its image when its PDF page is rendered.
      const images: HTMLImageElement[] = [];
      const sheets = order.map((_, index) => {
        const sheet = document.createElement("div");
        sheet.className = "overflow-hidden bg-white";
        const image = document.createElement("img");
        image.alt = `Page ${index + 1} of ${order.length}`;
        image.draggable = false;
        image.className = "block h-full w-full object-contain opacity-0 transition-opacity duration-300";
        image.addEventListener("load", () => image.classList.remove("opacity-0"), { once: true });
        sheet.appendChild(image);
        host.appendChild(sheet);
        images.push(image);
        return sheet;
      });

      const { PageFlip } = await import("page-flip");
      if (cancelled) return;
      const reduced = reducedRef.current;
      flip = new PageFlip(host, {
        width: 1000,
        height: Math.round(1000 / ratio),
        size: "stretch",
        minWidth: MIN_PAGE_WIDTH,
        maxWidth: 4000,
        minHeight: 100,
        maxHeight: 4000,
        autoSize: true,
        showCover: true,
        usePortrait: true,
        mobileScrollSupport: true,
        drawShadow: true,
        maxShadowOpacity: 0.35,
        flippingTime: 900,
        useMouseEvents: !reduced,
        showPageCorners: !reduced,
      });
      flip.loadFromHTML(sheets);
      flip.on("flip", (event) => {
        setCurrent(event.data);
        setCentreOn(event.data);
        setTurned(true);
      });
      flip.on("changeOrientation", (event) => setPortrait(event.data === "portrait"));
      flipRef.current = flip;
      setPortrait(flip.getOrientation() === "portrait");
      setPageCount(order.length);
      setCurrent(0);
      setCentreOn(0);

      // Render resolution: the page's on-screen width in device pixels, within sensible limits.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const shown = stage.clientWidth / (flip.getOrientation() === "portrait" ? 1 : 2);
      const target = Math.min(MAX_RENDER_WIDTH, Math.max(900, Math.ceil(shown * dpr)));
      const canvas = document.createElement("canvas");
      const half = document.createElement("canvas");
      const toUrl = async (source: HTMLCanvasElement) => {
        const blob = await new Promise<Blob | null>((resolve) => source.toBlob(resolve, "image/webp", 0.92));
        if (!blob) throw new Error("A page could not be encoded");
        const url = URL.createObjectURL(blob);
        urls.push(url);
        return url;
      };

      // Each PDF page is drawn once, in order (page 1 first, so the cover appears first), and its
      // image, or its two halves, goes to every booklet page that shows it.
      for (let number = 1; number <= doc.numPages; number++) {
        if (cancelled) return;
        const page = number === 1 ? first : await doc.getPage(number);
        const unscaled = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: (target * (halves ? 2 : 1)) / unscaled.width });
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        await page.render({ canvas, viewport }).promise;
        page.cleanup();
        if (cancelled) return;

        for (const [index, sheet] of order.entries()) {
          if (sheet.pdfPage !== number) continue;
          if (sheet.part === "whole") {
            images[index].src = await toUrl(canvas);
          } else {
            const width = Math.floor(canvas.width / 2);
            half.width = width;
            half.height = canvas.height;
            half.getContext("2d")!.drawImage(canvas, sheet.part === "left" ? 0 : canvas.width - width, 0, width, canvas.height, 0, 0, width, canvas.height);
            images[index].src = await toUrl(half);
          }
          if (cancelled) return;
        }
        if (number === 1) setStatus("ready");
      }
      canvas.width = canvas.height = half.width = half.height = 0;
    };

    load().catch((error: unknown) => {
      if (cancelled) return;
      console.error("Company profile could not be displayed", error);
      setStatus("error");
    });

    window.addEventListener("resize", fit);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", fit);
      flipRef.current = null;
      try {
        flip?.destroy();
      } catch {
        // Already torn down.
      }
      host.remove();
      stage.style.removeProperty("max-width");
      fitRef.current = () => {};
      destroyDoc?.();
      urls.forEach((url) => URL.revokeObjectURL(url));
      setStatus("loading");
    };
  }, [pdf, format]);

  const pages = visiblePages(current, pageCount, portrait);
  // A page shown alone in an open book (the front cover on the right, the back cover on the left)
  // is slid to the middle, as a closed book would sit. Shifting by a quarter of the book's width
  // centres one page; StPageFlip measures pointer positions on screen, so dragging still lines up.
  const alone = !portrait && pageCount > 1 ? visiblePages(centreOn, pageCount, false) : [];
  const shift =
    alone.length === 1 ? (alone[0] === 0 ? "-25%" : alone[0] === pageCount - 1 ? "25%" : "0%") : "0%";
  const atStart = current === 0;
  const atEnd = pageCount > 0 && pages[pages.length - 1] >= pageCount - 1;
  const pageLabel =
    pageCount === 0
      ? ""
      : `Page ${pages.map((index) => index + 1).join("–")} of ${pageCount}`;

  const turn = useCallback((direction: -1 | 1) => {
    const flip = flipRef.current;
    if (!flip) return;
    // Where this turn lands: one spread on (the cover and back cover stand alone).
    const count = flip.getPageCount();
    const shown = visiblePages(flip.getCurrentPageIndex(), count, flip.getOrientation() === "portrait");
    const target = direction < 0 ? shown[0] - 1 : shown[shown.length - 1] + 1;
    if (target >= 0 && target < count) setCentreOn(target);
    if (reducedRef.current) {
      if (direction < 0) flip.turnToPrevPage();
      else flip.turnToNextPage();
      setCurrent(flip.getCurrentPageIndex());
      setTurned(true);
    } else if (direction < 0) flip.flipPrev();
    else flip.flipNext();
  }, []);

  const jump = useCallback((index: number) => {
    const flip = flipRef.current;
    if (!flip) return;
    if (reducedRef.current) {
      flip.turnToPage(index);
      setCurrent(flip.getCurrentPageIndex());
      setTurned(true);
    } else flip.flip(index);
    setCentreOn(index);
  }, []);

  // Native full screen when the browser offers it for any element; otherwise a page overlay.
  const toggleFull = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else if (fullRef.current) setFull(false);
    else if (document.fullscreenEnabled && root.requestFullscreen) {
      root.requestFullscreen().catch(() => setFull(true));
    } else setFull(true);
  }, []);

  useEffect(() => {
    const sync = () => setFull(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  useEffect(() => {
    fullRef.current = full;
    // The overlay (no native full screen) must not let the page behind it scroll.
    const overlay = full && !document.fullscreenElement;
    if (overlay) document.documentElement.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => {
      fitRef.current();
      if (full) regionRef.current?.focus({ preventScroll: true });
    });
    return () => {
      cancelAnimationFrame(frame);
      if (overlay) document.documentElement.style.removeProperty("overflow");
    };
  }, [full]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") turn(-1);
    else if (event.key === "ArrowRight") turn(1);
    else if (event.key === "Home") jump(0);
    else if (event.key === "End") jump(Math.max(0, pageCount - 1));
    else if (event.key === "Escape" && full && !document.fullscreenElement) setFull(false);
    else return;
    event.preventDefault();
  };

  const control =
    "inline-flex size-12 items-center justify-center rounded-full border border-ink/15 bg-white text-ink shadow-[0_2px_8px_rgb(35_31_32/0.08)] transition-colors duration-200 hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-35";

  return (
    <div
      ref={rootRef}
      className={
        full
          ? "fixed inset-0 z-[100] flex flex-col overflow-hidden bg-sand px-4 pt-4 pb-4 md:px-8 md:pt-6"
          : undefined
      }
    >
      <div
        ref={regionRef}
        role="region"
        aria-label={labels.region}
        aria-roledescription="booklet"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={`relative mx-auto rounded-sm ${full ? "flex min-h-0 w-full flex-1 flex-col justify-center" : status === "ready" ? "" : "min-h-[240px]"} focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-ink`}
      >
        <div
          ref={stageRef}
          style={{ transform: `translateX(${shift})` }}
          className="relative mx-auto w-full drop-shadow-[0_18px_30px_rgb(35_31_32/0.16)] motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
        />

        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center gap-3 text-[16px] text-ink-muted">
            <span
              aria-hidden="true"
              className="size-5 rounded-full border-2 border-brand/25 border-t-brand motion-safe:animate-spin"
            />
            {labels.loading}
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center text-[16px] text-ink-muted">
            <p>{labels.error}</p>
            <a href={pdf} className="font-semibold text-brand underline underline-offset-4 hover:text-brand-dark">
              {labels.errorAction}
            </a>
          </div>
        )}

        <noscript>
          <p className="py-10 text-center">
            <a href={pdf} className="font-semibold text-brand underline underline-offset-4">
              {labels.errorAction}
            </a>
          </p>
        </noscript>
      </div>

      <div className={`${full ? "mt-4 md:mt-5" : "mt-8"} flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8`}>
        <div className={`flex items-center gap-5 ${status === "ready" ? "" : "invisible"}`}>
          <button type="button" onClick={() => turn(-1)} disabled={atStart} aria-label={labels.previous} className={control}>
            <Arrow direction="left" />
          </button>
          <p className="min-w-[9.5em] text-center text-[16px] font-medium text-ink tabular-nums">{pageLabel}</p>
          <button type="button" onClick={() => turn(1)} disabled={atEnd} aria-label={labels.next} className={control}>
            <Arrow direction="right" />
          </button>
        </div>
        <a
          href={pdf}
          download={downloadName}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-brand bg-brand px-6 text-[16px] font-semibold tracking-[0.01em] whitespace-nowrap text-white transition-colors duration-200 hover:border-brand-dark hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {labels.download}
        </a>
        <button
          type="button"
          onClick={toggleFull}
          aria-label={full ? labels.exitFullscreen : labels.fullscreen}
          title={full ? labels.exitFullscreen : labels.fullscreen}
          className={`${control} ${status === "ready" ? "" : "invisible"}`}
        >
          <FullscreenIcon exit={full} />
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {turned ? pageLabel : ""}
      </p>
    </div>
  );
}
