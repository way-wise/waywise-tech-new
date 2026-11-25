import LandingPlayButton, { type LandingPlayButtonProps } from "@/components/landing/shared/LandingPlayButton";

/** Plumber-page play button: the shared layered button with a dark (#101311) triangle. */
const PlumberPlayButton = (props: LandingPlayButtonProps) => (
  <LandingPlayButton hoverClassName="hover:bg-white/60" iconToneClassName="ml-[8%] text-[#101311]" {...props} />
);

export default PlumberPlayButton;
