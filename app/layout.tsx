import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SCROLL_EFFECTS } from "@/components/motion/scrollEffects";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Way-Wise Tech",
  description:
    "We design and develop high-performing websites, custom software, mobile apps, and AI-powered solutions that help businesses grow.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // scroll-pt keeps keyboard-focused links clear of the sticky navbar.
    // data-scroll-effects: the site-wide scroll-effects switch for CSS (components/motion/scrollEffects.ts).
    <html
      lang="en"
      className={`${outfit.variable} h-full scroll-pt-27.5 antialiased`}
      data-scroll-effects={SCROLL_EFFECTS ? "" : undefined}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
