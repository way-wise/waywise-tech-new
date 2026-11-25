/*
  The company profile booklet at /book (components/book/ProfileFlipbook.tsx), opened by the Navbar's
  "Our Profile" card.

  To publish a new profile, replace the PDF file (same path), or point `pdf` at the new file. The
  booklet reads the page count and page shape from the PDF itself, so nothing else needs changing.

  The heading and description are draft copy written for this page (2026-11-25), to confirm with the
  owner.
*/
export const companyProfile = {
  /** Served from public/. A sample file until the owner supplies the final profile. */
  pdf: "/file/company-profile.pdf",
  /**
   * How the PDF is laid out:
   * - "spreads": a printed fold-out brochure. Every PDF page is two booklet pages side by side; the
   *   first PDF page is the outside (back cover on the left, front cover on the right), the rest are
   *   the inside spreads in order. The booklet cuts each into its two pages (the sample file).
   * - "pages": one booklet page per PDF page, the first being the front cover.
   */
  format: "spreads" as "spreads" | "pages",
  /** The file name offered when the visitor downloads it. */
  downloadName: "Way-Wise-Tech-Company-Profile.pdf",
  eyebrow: "Company Profile",
  /** The first part is ink; `accent` is red. */
  heading: { first: "Our Company", accent: "Profile" },
  description: "Flip through the pages to learn who we are, what we do and how we work.",
  labels: {
    previous: "Previous page",
    next: "Next page",
    download: "Download PDF",
    fullscreen: "Full screen",
    exitFullscreen: "Exit full screen",
    loading: "Loading the profile…",
    error: "The profile could not be displayed here.",
    errorAction: "Open the PDF instead",
    /** Read out by screen readers for the book region. */
    region: "Company profile booklet",
  },
} as const;
