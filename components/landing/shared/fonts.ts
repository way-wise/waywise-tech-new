import { Inter, Outfit } from "next/font/google";

/**
 * In company-site-frontend these two came from the root layout, and the landing pages read
 * them as var(--font-inter) / var(--font-outfit). They are loaded here with the same settings
 * so the pages render identically without depending on this project's root layout (whose
 * Outfit is the variable font, not these four static weights).
 */
export const landingInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const landingOutfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

/**
 * The main site's Outfit (the variable font, every weight), for the shared "Our Profile" card in
 * the landing navbars (LandingProfileCard), so it matches the main site's Navbar exactly.
 */
export const siteOutfit = Outfit({
  subsets: ["latin"],
});
