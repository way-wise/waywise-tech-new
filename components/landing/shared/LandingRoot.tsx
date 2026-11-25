import { landingInter, landingOutfit } from "./fonts";
import LandingScrollPadding from "./LandingScrollPadding";
import "./landing.css";

/**
 * Wrapper for the five standalone landing pages. Gives them the fonts, base styles and
 * animations they had in company-site-frontend, independently of this site's root layout.
 */
export default function LandingRoot({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`landing-root ${landingInter.variable} ${landingOutfit.variable} ${className}`}
    >
      <LandingScrollPadding />
      {children}
    </div>
  );
}
