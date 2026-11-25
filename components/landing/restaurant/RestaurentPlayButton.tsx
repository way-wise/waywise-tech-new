import LandingPlayButton, { type LandingPlayButtonProps } from "@/components/landing/shared/LandingPlayButton";

/**
 * Restaurant-page play button: the shared layered button with a red (#F5282D) triangle,
 * centred without the optical offset, and no background change on hover (as designed).
 */
const RestaurentPlayButton = (props: LandingPlayButtonProps) => (
  <LandingPlayButton hoverClassName="hover:bg-white/50" iconToneClassName="text-[#F5282D]" {...props} />
);

export default RestaurentPlayButton;
