import { ProfileCard } from "@/components/layout/ProfileCard";
import { siteOutfit } from "./fonts";

/**
 * The main site's "Our Profile" navbar card (owner, 2026-11-25), in the landing navbars: same
 * design, sizes and link (/book), in the main site's Outfit. Shown from `lg`, as the landing
 * navbars' desktop links are; the thumbnail appears from 1440px, as on the main site.
 */
export default function LandingProfileCard({
  className = "",
  heightClassName,
}: {
  className?: string;
  /** The card's height, set to the height of the CTA button beside it on each page. */
  heightClassName?: string;
}) {
  return (
    <div className={`hidden lg:block ${siteOutfit.className} ${className}`}>
      <ProfileCard size="small" heightClassName={heightClassName} />
    </div>
  );
}
