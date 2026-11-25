import LandingPlayButton, { type LandingPlayButtonProps } from "@/components/landing/shared/LandingPlayButton";

/** E-commerce-page play button: the shared layered button with a dark (#1E130A) triangle. */
const EcommercePlayButton = (props: LandingPlayButtonProps) => (
  <LandingPlayButton hoverClassName="hover:bg-white/60" iconToneClassName="ml-[8%] text-[#1E130A]" {...props} />
);

export default EcommercePlayButton;
