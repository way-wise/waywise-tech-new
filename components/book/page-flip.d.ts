/**
 * Types for the parts of `page-flip` (StPageFlip 2.0.7) that ProfileFlipbook uses. The package ships
 * without TypeScript declarations; these follow its source (dist/js/page-flip.module.js).
 */
declare module "page-flip" {
  export type PageFlipSettings = {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    startPage?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    swipeDistance?: number;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
  };

  export type PageFlipEvent<T> = { data: T; object: PageFlip };

  export class PageFlip {
    constructor(element: HTMLElement, settings: PageFlipSettings);
    loadFromHTML(pages: NodeListOf<HTMLElement> | HTMLElement[]): void;
    loadFromImages(urls: string[]): void;
    update(): void;
    destroy(): void;
    flipNext(corner?: "top" | "bottom"): void;
    flipPrev(corner?: "top" | "bottom"): void;
    flip(page: number, corner?: "top" | "bottom"): void;
    turnToNextPage(): void;
    turnToPrevPage(): void;
    turnToPage(page: number): void;
    getPageCount(): number;
    getCurrentPageIndex(): number;
    getOrientation(): "portrait" | "landscape";
    on(event: "flip", callback: (event: PageFlipEvent<number>) => void): PageFlip;
    on(event: "changeOrientation", callback: (event: PageFlipEvent<"portrait" | "landscape">) => void): PageFlip;
    on(event: "changeState" | "init" | "update", callback: (event: PageFlipEvent<unknown>) => void): PageFlip;
  }
}
