import type { ComponentProps } from "react";

const tones = {
  /** Services. */
  ink: "text-ink",
  /** Our Work, Our Process, FAQ. */
  navy: "text-navy",
  /** Industries. */
  black: "text-black",
};

type SectionHeadingProps = ComponentProps<"h2"> & {
  as?: "h1" | "h2" | "h3";
  tone?: keyof typeof tones;
};

/**
 * Section titles are 42px at 1920 on every page (owner, 2026-11-25): 26–36px below 1024px, 32–42px
 * from 1024px. The same two classes are repeated on the sections that style their own `<h2>`. Hero
 * titles are excluded, so an `h1` (the 404 and /book page titles) keeps the earlier 26–48 / 34–52px.
 */
const sizes = {
  title: "text-[clamp(26px,7vw,36px)] lg:text-[clamp(32px,2.1875vw,42px)]",
  page: "text-[clamp(26px,7.4vw,48px)] lg:text-[clamp(34px,2.71vw,52px)]",
};

/**
 * The section title used under an eyebrow.
 * Put the red part in `<span className="text-brand">`, and use `<br />` or `MaskLine` for line breaks.
 * To change line height or letter spacing for one design, use `style`: a conflicting class would
 * not reliably win over the built-in one.
 */
export function SectionHeading({ as: Tag = "h2", tone = "ink", className = "", ...props }: SectionHeadingProps) {
  return (
    <Tag
      className={`${Tag === "h1" ? sizes.page : sizes.title} leading-[1.154] font-semibold tracking-[-0.015em] ${tones[tone]} ${className}`}
      {...props}
    />
  );
}
