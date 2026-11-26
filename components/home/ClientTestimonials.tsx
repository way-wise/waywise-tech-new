"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import { RollingNumber } from "@/components/motion/RollingNumber";
import { AssetImage } from "@/components/ui/AssetImage";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeClientTestimonials } from "@/lib/content/home";

type StatIcon = (typeof homeClientTestimonials.stats)[number]["icon"];

const statIcons: Record<StatIcon, ReactNode> = {
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
      <path d="M15 4.8a3.5 3.5 0 0 1 0 6.4M17.5 13.9c2.4.9 4 3.2 4 6.1" />
    </>
  ),
  building: (
    <>
      <path d="M3.5 20.5h17M5.5 20.5V4.5h9v16M14.5 10.5h4v10" />
      <path d="M8.5 8h3M8.5 11.5h3M8.5 15h3M16.5 14h0M16.5 17h0" />
    </>
  ),
  star: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />,
  growth: (
    <>
      <path d="M3.5 3.5v17h17" />
      <path d="m7 15 4-4.5 3 3 5.5-6M15.5 7.5h4v4" />
    </>
  ),
};

const statPadding = [
  "lg:pl-[clamp(22px,1.979vw,38px)]",
  "lg:pl-[clamp(23px,2.031vw,39px)]",
  "lg:pl-[clamp(24px,2.135vw,41px)]",
  "lg:pl-[clamp(26px,2.292vw,44px)]",
];

const STAR_PATH =
  "M12 1.6l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.7l-6.4 3.5 1.4-7.1-5.3-5 7.2-.9z";

const QUOTE_PATH =
  "M17.5 9C17.5 19 12 26 4.5 29.5L2.8 27C7.5 24.5 10.6 21 11.4 17.2A8.5 8.5 0 1 1 17.5 9Z";

const DRAG_THRESHOLD_PX = 50;

const VISIBLE_AT = [
  { query: "(min-width: 1024px)", count: 3 },
  { query: "(min-width: 768px)", count: 2 },
];

function QuoteMark() {
  return (
    <svg
      viewBox="0 0 42 30"
      aria-hidden="true"
      className="h-7 w-10 rotate-180 text-brand"
      fill="currentColor"
    >
      <path d={QUOTE_PATH} />
      <path d={QUOTE_PATH} transform="translate(22 0)" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${rating} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`size-4.5 ${index < rating ? "text-brand" : "text-black/15"}`}
          fill="currentColor"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      {direction === "prev" ? (
        <path d="M15.5 10H4.5M4.5 10l4.5-4.5M4.5 10l4.5 4.5" />
      ) : (
        <path d="M4.5 10h11M15.5 10l-4.5-4.5M15.5 10l-4.5 4.5" />
      )}
    </svg>
  );
}

/**
 * Homepage Client Testimonials section (placed after Our Work).
 * All copy, ratings and client details come from `homeClientTestimonials` in `lib/content/home.ts`.
 */
export function ClientTestimonials() {
  const { eyebrow, heading, description, intro, items, stats } =
    homeClientTestimonials;
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef<number | null>(null);
  const activePointerId = useRef<number | null>(null);

  useEffect(() => {
    const sync = () => {
      const match = VISIBLE_AT.find(
        (bp) => window.matchMedia(bp.query).matches,
      );
      setVisibleCount(match ? match.count : 1);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount);
  const clampedIndex = Math.min(index, maxIndex);

  const step = (delta: number) => {
    if (maxIndex === 0) return;
    setIndex((current) => {
      const base = Math.min(current, maxIndex);
      return (base + delta + (maxIndex + 1)) % (maxIndex + 1);
    });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    activePointerId.current = event.pointerId;
    dragStartX.current = event.clientX;
    setIsDragging(true);
    setDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (
      dragStartX.current === null ||
      activePointerId.current !== event.pointerId
    )
      return;
    setDragOffset(event.clientX - dragStartX.current);
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (
      dragStartX.current === null ||
      activePointerId.current !== event.pointerId
    )
      return;
    const deltaX = event.clientX - dragStartX.current;
    dragStartX.current = null;
    activePointerId.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (deltaX <= -DRAG_THRESHOLD_PX) {
      step(1);
    } else if (deltaX >= DRAG_THRESHOLD_PX) {
      step(-1);
    }
  };

  const trackStyle = {
    transform: `translateX(calc(${-clampedIndex} * (100% + var(--gap)) / var(--cols) + ${dragOffset}px))`,
  } as CSSProperties;

  return (
    <section
      id="client-testimonials"
      aria-labelledby="client-testimonials-heading"
      className="relative bg-[#FAF5F1]"
    >
      <Container className="py-16 md:py-20 lg:py-24">
        <div className="text-center">
          <SectionEyebrow
            size="lg"
            className="justify-center"
            tracking="0.078em"
          >
            {eyebrow}
          </SectionEyebrow>
          <SectionHeading
            id="client-testimonials-heading"
            tone="navy"
            className="mt-3"
          >
            {heading.first} <span className="text-brand">{heading.accent}</span>
          </SectionHeading>
          <p className="mx-auto mt-3 max-w-2xl text-[18px] leading-[1.45] text-ink-muted lg:text-[clamp(17px,1.146vw,22px)]">
            {description}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center lg:gap-12 xl:grid-cols-[290px_minmax(0,1fr)] xl:gap-14">
          <div>
            <QuoteMark />
            <h3 className="mt-5 text-[24px] leading-tight font-semibold tracking-[-0.015em] text-navy lg:text-[clamp(22px,1.667vw,32px)]">
              {intro.heading}
            </h3>
            <p className="mt-3 text-[16px] leading-[1.45] text-ink-muted lg:text-[clamp(16px,1.042vw,20px)]">
              {intro.subtext}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => step(-1)}
                className="flex size-10 items-center justify-center rounded-lg border border-black/10 bg-white text-ink transition hover:border-ink/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <ArrowIcon direction="prev" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => step(1)}
                className="flex size-10 items-center justify-center rounded-lg bg-brand text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <ArrowIcon direction="next" />
              </button>
            </div>
          </div>

          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            className="cursor-grab touch-pan-y overflow-hidden select-none active:cursor-grabbing"
          >
            <div
              style={trackStyle}
              className={`flex [--cols:1] [--gap:20px] md:[--cols:2] lg:[--cols:3] lg:[--gap:24px] gap-(--gap) ${
                isDragging
                  ? "transition-none"
                  : "transition-transform duration-500 ease-out"
              }`}
            >
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex w-[calc((100%-(var(--cols)-1)*var(--gap))/var(--cols))] shrink-0 flex-col justify-between"
                >
                  <div className="flex-1 rounded-[10px] border border-black/6 bg-white p-6 shadow-[0_2px_10px_rgba(13,29,68,0.04)] transition-colors duration-300 ease-out hover:bg-[#F3D0CC] sm:p-7">
                    <StarRating rating={item.rating} />
                    <h4 className="mt-4 text-[20px] leading-6.5 font-semibold text-navy">
                      {item.headline}
                    </h4>
                    <blockquote className="mt-2.5 text-[16px] leading-5.5 tracking-wide text-ink-muted lg:text-[clamp(15px,0.885vw,17px)]">
                      {item.quote}
                    </blockquote>
                  </div>

                  <div className="mt-4 flex items-center gap-3.5">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-white">
                      <AssetImage
                        src={item.image.src}
                        alt={item.image.alt}
                        sizes="48px"
                        className="pointer-events-none object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[16px] font-semibold text-navy">
                        {item.name}
                      </p>
                      <p className="truncate text-[14px] text-steel">
                        {item.role}
                      </p>
                      <p className="truncate text-[14px] text-ink-muted">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-10 grid gap-6 rounded-2xl bg-white px-6 py-7 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-0 lg:px-0 lg:py-0">
          {stats.map((stat, statIndex) => (
            <li
              key={stat.label}
              className={`flex items-center gap-[clamp(16px,1.563vw,30px)] lg:h-[clamp(110px,7.813vw,150px)] ${statPadding[statIndex] ?? "lg:pl-8"} ${
                statIndex > 0
                  ? "lg:relative lg:before:absolute lg:before:top-1/2 lg:before:left-0 lg:before:h-[60%] lg:before:w-0.5 lg:before:-translate-x-1/2 lg:before:-translate-y-1/2 lg:before:bg-[#e7e0d5]"
                  : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#faeddc] text-brand lg:size-[clamp(52px,3.75vw,72px)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-8 lg:size-[clamp(28px,1.875vw,36px)]"
                >
                  {statIcons[stat.icon]}
                </svg>
              </span>
              <span className="min-w-0">
                <RollingNumber
                  value={stat.value}
                  className="block text-[36px] leading-[1.1] font-semibold text-navy lg:text-[clamp(32px,2.5vw,48px)] lg:leading-[0.85]"
                />
                <span className="mt-1 block text-[17px] leading-6 text-ink-muted lg:mt-[clamp(8px,0.833vw,16px)] lg:text-[clamp(15px,1.146vw,22px)]">
                  {stat.label}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
