"use client";

import Image from "next/image";
import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type {
  IndustryPhaseCard,
  IndustryPhaseIcon,
  IndustryShowcaseItem,
  IndustryShowcaseTheme,
} from "@/lib/content/industries";

/** Colours per industry theme (the content names the theme; the classes live here). */
const themes: Record<
  IndustryShowcaseTheme,
  { card: string; top: string; description: string; icon: string; accent: string; hover: string; dot: string }
> = {
  /** Attorney & Lawyers. */
  gold: {
    card: "border-[#725020] bg-[#f6eddf]",
    top: "bg-[#725020]",
    description: "text-[#f7f4ec]",
    icon: "bg-[#e4c89f] text-[#725020]",
    accent: "text-[#725020]",
    hover: "hover:text-[#725020] focus-visible:outline-[#725020]",
    dot: "bg-[#725020]",
  },
  /** Doctor, Dentist & Healthcare Professionals. */
  navy: {
    card: "border-[#244d71] bg-[#f3f7f9]",
    top: "bg-[#244d71]",
    description: "text-[#f7f4ec]",
    icon: "bg-[#deeffc] text-[#244d71]",
    accent: "text-[#244d71]",
    hover: "hover:text-[#244d71] focus-visible:outline-[#244d71]",
    dot: "bg-[#244d71]",
  },
  /** Plumbers, Electricians, Technicians & Other Repair Vendor. */
  olive: {
    card: "border-[#6e7228] bg-[#efefe6]",
    top: "bg-[#6e7228]",
    description: "text-white",
    icon: "bg-[#efefe6] text-[#6e7228]",
    accent: "text-[#494c1a]",
    hover: "hover:text-[#494c1a] focus-visible:outline-[#494c1a]",
    dot: "bg-[#6e7228]",
  },
  /** Restaurant & Food Brand. */
  rust: {
    card: "border-[#87441f] bg-[#faf5ef]",
    top: "bg-[#87441f]",
    description: "text-white",
    icon: "bg-[#faf5ef] text-[#87441f]",
    accent: "text-[#532a13]",
    hover: "hover:text-[#532a13] focus-visible:outline-[#532a13]",
    dot: "bg-[#87441f]",
  },
};

type Theme = (typeof themes)[IndustryShowcaseTheme];

/*
  The Homepage Industries section's body (redesign 2026-11-26, reference 1920x942): the header, then
  one industry as an image card beside its three phase cards. At 1920 the image card is 457x530 and
  the phase cards 347 wide, 20px apart (28px after the image card). The phase cards share their
  rows through a subgrid, so their brown tops are one height whatever the text length.
  From xl the four cards sit in one row; md-xl two by two; below md one column.
  Sizes are the design's at 1920 and scale down with the width from xl (clamp ... vw).
*/

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="23"
      height="17"
      viewBox="0 0 23 17"
      fill="none"
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : undefined}
    >
      <path
        d="M1 8.5h20.5M14.5 1.5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhaseIcon({ name }: { name: IndustryPhaseIcon }) {
  const common = {
    width: 32,
    height: 32,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "monitor":
      return (
        <svg {...common}>
          <rect x="4" y="6" width="24" height="16" rx="2" />
          <path d="M4 18h24M13 22l-1 5M19 22l1 5M10 27h12" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="16" cy="13" r="4" />
          <path d="M9 26c0-4 3.1-7 7-7s7 3 7 7" />
          <circle cx="8" cy="9" r="3" />
          <path d="M3 19c0-3 2.2-5 5-5 1.2 0 2.3.4 3.1 1" />
          <circle cx="24" cy="9" r="3" />
          <path d="M29 19c0-3-2.2-5-5-5-1.2 0-2.3.4-3.1 1" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M16 4 4 10.5 16 17l12-6.5L16 4Z" />
          <path d="m4 16 12 6.5L28 16" />
          <path d="m4 21.5 12 6.5 12-6.5" />
        </svg>
      );
  }
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
    >
      <path d="m1 1 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhaseCard({ phase, theme }: { phase: IndustryPhaseCard; theme: Theme }) {
  const id = useId();
  // One row open at a time; null = all closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <li data-phase-card className={`flex flex-col overflow-hidden rounded-2xl border ${theme.card}`}>
      <div className={`${theme.top} px-6 pt-6 pb-7 text-white xl:px-[clamp(20px,1.458vw,28px)] xl:pt-[clamp(20px,1.302vw,25px)] xl:pb-[clamp(22px,1.406vw,27px)]`}>
        <div className="md:min-h-(--top-h)">
        <div data-top-content>
        <div className="flex items-start gap-4">
          <span className={`flex size-[60px] shrink-0 items-center justify-center rounded-full ${theme.icon} xl:size-[clamp(48px,3.125vw,60px)]`}>
            <PhaseIcon name={phase.icon} />
          </span>
          <div className="min-w-0">
            <h3 className="text-[22px] text-[#F7F4EC] leading-6 font-bold uppercase xl:text-[clamp(20px,1.25vw,24px)]">{phase.phase}</h3>
            <p className="mt-[10px] text-[19px] leading-6 font-semibold xl:mt-[clamp(7px,0.521vw,10px)] xl:text-[clamp(17px,1.042vw,20px)] xl:leading-[1.2]">
              {phase.title}
            </p>
          </div>
        </div>
        <p className={`mt-2.5 text-[18px]  leading-6 xl:text-[clamp(16px,1.042vw,20px)] xl:leading-[1.2] ${theme.description}`}>{phase.description}</p>
        </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 pt-[22px] pb-[26px] xl:px-[clamp(20px,1.458vw,28px)] xl:pt-[clamp(16px,1.146vw,22px)] xl:pb-[clamp(20px,1.354vw,26px)]">
        <div className="flex flex-1 flex-col md:min-h-(--bottom-h)">
        <ul data-feature-list>
          {phase.features.map((feature, index) => {
            const open = openIndex === index;
            const panelId = `${id}-panel-${index}`;
            return (
              <li key={feature.title}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                  title={feature.title}
                  className={`flex w-full items-center justify-between gap-3 py-2 text-left text-[17px] leading-none text-black transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${theme.hover} xl:text-[clamp(15px,0.9375vw,18px)]`}
                >
                  <span className="-my-[0.125em] min-w-0 truncate leading-[1.25]">{feature.title}</span>
                  <Chevron open={open} />
                </button>
                <div
                  data-panel
                  id={panelId}
                  role="region"
                  aria-label={feature.title}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "invisible grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    {feature.points.length > 0 && (
                      <ul className="space-y-1.5 pt-1 pb-2 pl-1 text-[15px] leading-[1.35] text-ink-muted xl:text-[clamp(14px,0.833vw,16px)]">
                        {feature.points.map((point) => (
                          <li key={point} className="flex gap-2">
                            <span className={`mt-[0.5em] size-1.5 shrink-0 rounded-full ${theme.dot}`} aria-hidden="true" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p data-note className={`mt-auto pt-8 text-[17px] leading-[1.3] ${theme.accent} xl:text-[clamp(15px,0.9375vw,18px)]`}>
          <span className="font-semibold">{phase.note.label} —</span> {phase.note.text}
        </p>
        </div>
      </div>
    </li>
  );
}

function ImageCard({ industry }: { industry: IndustryShowcaseItem }) {
  return (
    <li className="relative flex min-h-[calc((100vw-40px)*530/457)] flex-col justify-end overflow-hidden rounded-[10px] md:min-h-[var(--card-h,480px)] xl:mr-[1.72%]">
      <Image
        src={industry.image.src}
        alt={industry.image.alt}
        fill
        sizes="(min-width: 1280px) 24vw, (min-width: 768px) 46vw, 92vw"
        className="object-cover object-top"
      />
      <div className="relative px-[30px] pt-[30px] pb-[30px] text-white xl:px-[clamp(22px,1.5625vw,30px)] xl:pb-[clamp(22px,1.5625vw,30px)]">
        {/*
          The QR file is the bare code; the white frame and caption are drawn here (100x121 at 1920,
          as in the design). Unoptimized: a tiny PNG gains nothing from resizing, and resampling
          would blur the modules.
        */}
        <div className="w-[100px] rounded-md bg-white px-[11px] pt-[11px] pb-[7px] text-center text-black xl:w-[clamp(80px,5.208vw,100px)] xl:px-[clamp(9px,0.573vw,11px)] xl:pt-[clamp(9px,0.573vw,11px)] xl:pb-[clamp(6px,0.365vw,7px)]">
          <Image
            src={industry.qr.src}
            alt={industry.qr.alt}
            width={industry.qr.width}
            height={industry.qr.height}
            unoptimized
            className="h-auto w-full [image-rendering:pixelated]"
          />
          <p className="-mx-[8px] mt-[6px] text-[10px] leading-none font-semibold whitespace-nowrap uppercase xl:text-[clamp(8px,0.521vw,10px)]">
            {industry.qr.caption.title}
          </p>
          <p className="-mx-[8px] mt-[4px] text-[8px] leading-none whitespace-nowrap xl:text-[clamp(6.5px,0.417vw,8px)]">
            {industry.qr.caption.text}
          </p>
        </div>
        <h3 className="mt-[14px] text-[28px] leading-[1.25] font-semibold xl:mt-[clamp(10px,0.729vw,14px)] xl:text-[clamp(26px,1.7vw,32.64px)]">
          {industry.title}
        </h3>
        <p className="mt-1.5 text-[18px] leading-[1.25] xl:text-[clamp(17px,1.133vw,21.76px)]">{industry.description}</p>
        <ButtonLink
          href={industry.action.href}
          className="mt-4 gap-2 rounded-md! px-[15px] py-[14px] text-[18px] leading-none font-semibold"
        >
          {industry.action.label}
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" aria-hidden="true">
            <path d="m1.5 1.5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </ButtonLink>
      </div>
    </li>
  );
}

type IndustryShowcaseProps = {
  industries: IndustryShowcaseItem[];
  heading: ReactNode;
  intro: ReactNode;
  action: ReactNode;
};

export function IndustryShowcase({ industries, heading, intro, action }: IndustryShowcaseProps) {
  const [index, setIndex] = useState(0);
  const count = industries.length;
  const industry = industries[index];
  const step = (delta: number) => setIndex((current) => (current + delta + count) % count);
  const list = useRef<HTMLUListElement>(null);

  /*
    Opening a feature list grows only that phase card (owner, 2026-11-26): the cards sit at the top
    of the row, and their closed sizes are measured instead of shared through the grid. --top-h and
    --bottom-h are the tallest closed brown top and closed bottom (open lists subtracted), so the
    closed cards stay level; --card-h, a closed card's height, sizes the image card.
  */
  useLayoutEffect(() => {
    const el = list.current;
    if (!el) return;
    const measure = () => {
      const cards = [...el.querySelectorAll<HTMLElement>("[data-phase-card]")];
      const height = (node: Element | null) => (node as HTMLElement | null)?.offsetHeight ?? 0;
      const openHeight = (card: Element) =>
        [...card.querySelectorAll("[data-panel]")].reduce((sum, panel) => sum + height(panel), 0);
      const top = Math.max(...cards.map((card) => height(card.querySelector("[data-top-content]"))));
      const bottom = Math.max(
        ...cards.map(
          (card) => height(card.querySelector("[data-feature-list]")) - openHeight(card) + height(card.querySelector("[data-note]")),
        ),
      );
      el.style.setProperty("--top-h", `${top}px`);
      el.style.setProperty("--bottom-h", `${bottom}px`);
      el.style.setProperty("--card-h", `${Math.max(...cards.map((card) => card.offsetHeight - openHeight(card)))}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    el.querySelectorAll("[data-top-content], [data-feature-list], [data-note]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [industry]);

  const arrowClass =
    "flex size-11 items-center justify-center rounded-lg text-ink transition-colors duration-200 hover:text-brand focus-visible:outline-2 focus-visible:outline-ink disabled:cursor-default disabled:opacity-35 disabled:hover:text-ink";

  return (
    <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 xl:px-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,868fr)_minmax(0,692fr)] lg:gap-0">
        <div>{heading}</div>
        <div>
          {intro}
          <div className="mt-[23px] flex items-end justify-between gap-1 sm:gap-3 lg:mt-[29px]">
            {action}
            <div className="-mr-1 -mb-1 flex shrink-0 gap-1">
              <button type="button" aria-label="Previous industry" disabled={count < 2} onClick={() => step(-1)} className={arrowClass}>
                <ArrowIcon direction="left" />
              </button>
              <button type="button" aria-label="Next industry" disabled={count < 2} onClick={() => step(1)} className={arrowClass}>
                <ArrowIcon direction="right" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyed by industry, so switching replays the fade and resets the open accordion rows. */}
      <ul
        key={industry.title}
        ref={list}
        aria-label={industry.title}
        className="mt-10 grid gap-5 motion-safe:animate-hero-fade md:grid-cols-2 md:items-start xl:mt-[clamp(40px,3.125vw,60px)] xl:grid-cols-[minmax(0,465fr)_repeat(3,minmax(0,347fr))]"
      >
        <ImageCard industry={industry} />
        {industry.phases.map((phase) => (
          <PhaseCard key={phase.phase} phase={phase} theme={themes[industry.theme]} />
        ))}
      </ul>
    </div>
  );
}
