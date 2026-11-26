import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { assets } from "@/lib/assets";
import {
  homeWorkProcess,
  type WorkProcessIcon,
  type WorkProcessStep,
} from "@/lib/content/home";

const stepIcons: Record<WorkProcessIcon, ReactNode> = {
  onboarding: (
    <path d="M12 20a8 8 0 1 0-6.9-4L4 20l4.2-1.1A8 8 0 0 0 12 20Z" />
  ),
  brief: (
    <>
      <path d="M14 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5L14 3.5Z" />
      <path d="M14 3.5v5h5" />
      <circle cx="11.5" cy="13.5" r="2.2" />
      <path d="m13.2 15.2 1.8 1.8" />
    </>
  ),
  roadmap: (
    <>
      <path d="M4 6.5 9.5 4l5 2.5L20 4v13.5L14.5 20l-5-2.5L4 20V6.5Z" />
      <path d="M9.5 4v13.5M14.5 6.5V20" />
    </>
  ),
  contract: (
    <>
      <path d="M14 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h7" />
      <path d="M14 3.5v5h5v3.5" />
      <circle cx="16.5" cy="17" r="3" />
      <path d="m15.3 17 .9.9 1.6-1.7" />
    </>
  ),
  communication: (
    <>
      <circle cx="8.5" cy="8.5" r="2.5" />
      <circle cx="15.5" cy="8.5" r="2.5" />
      <path d="M4.5 18.5c0-2.2 1.8-4 4-4s4 1.8 4 4" />
      <path d="M11.5 18.5c0-2.2 1.8-4 4-4s4 1.8 4 4" />
    </>
  ),
  documentation: (
    <>
      <rect x="8" y="4" width="11" height="14" rx="2" />
      <path d="M5 8v10a2 2 0 0 0 2 2h9" />
      <path d="M11.5 9h4M11.5 12.5h4" />
    </>
  ),
  reviews: (
    <>
      <path d="M4 4v16h16" />
      <path d="m7.5 14.5 3.5-4 3 2.5 4.5-5.5" />
    </>
  ),
  support: (
    <>
      <path d="M4.5 13v-1.5a7.5 7.5 0 0 1 15 0V13" />
      <rect x="3.5" y="12.5" width="3" height="5" rx="1.5" />
      <rect x="17.5" y="12.5" width="3" height="5" rx="1.5" />
      <path d="M19 17.5v1a2.5 2.5 0 0 1-2.5 2.5H13" />
    </>
  ),
};

const CONNECTOR_ANCHORS = ["top-[11%]", "top-[37%]", "top-[63%]", "top-[89%]"];

function StepCard({ step }: { step: WorkProcessStep }) {
  return (
    <article className="group flex items-start gap-4 rounded-2xl border border-black/6 bg-white p-5 shadow-[0_2px_10px_rgba(13,29,68,0.03)] transition-[translate,box-shadow,border-color] duration-300 ease-out hover:border-[#D71920]/30 hover:shadow-[0_8px_20px_rgba(35,31,32,0.1)] motion-safe:hover:-translate-y-1">
      <div
        aria-hidden="true"
        className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#F3E2DF] text-[#D71920] transition-colors duration-300 ease-out group-hover:bg-[#D71920] group-hover:text-white"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6"
        >
          {stepIcons[step.icon]}
        </svg>
      </div>
      <div className="min-w-0">
        <p className="text-[15px] leading-[22px] font-semibold text-[#D71920] lg:text-[clamp(14px,0.9375vw,18px)]">
          {step.number}
        </p>
        <h3 className="mt-1 text-[20px] leading-[26px] font-semibold text-navy">
          {step.title}
        </h3>
        <p className="mt-1.5 text-[16px] leading-[22px] tracking-[0.025em] text-[#626262] lg:text-[clamp(15px,0.885vw,17px)]">
          {step.description}
        </p>
      </div>
    </article>
  );
}

function VennDiagram() {
  const { leftLabel, middleLabel, rightLabel } = homeWorkProcess.center;

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Connector curves spanning edge-to-edge across the center column */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      >
        <g
          fill="none"
          stroke="#D71920"
          strokeOpacity="0.45"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        >
          {/* Left 4 cards -> Left Venn circle */}
          <path d="M 0 11 C 18 11, 26 24, 38 36" vectorEffect="non-scaling-stroke" />
          <path d="M 0 37 C 14 37, 22 41, 32 45" vectorEffect="non-scaling-stroke" />
          <path d="M 0 63 C 14 63, 22 59, 32 55" vectorEffect="non-scaling-stroke" />
          <path d="M 0 89 C 18 89, 26 76, 38 64" vectorEffect="non-scaling-stroke" />

          {/* Right 4 cards -> Right Venn circle */}
          <path d="M 100 11 C 82 11, 74 24, 62 36" vectorEffect="non-scaling-stroke" />
          <path d="M 100 37 C 86 37, 78 41, 68 45" vectorEffect="non-scaling-stroke" />
          <path d="M 100 63 C 86 63, 78 59, 68 55" vectorEffect="non-scaling-stroke" />
          <path d="M 100 89 C 82 89, 74 76, 62 64" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>

      {/* Circular anchor dots flush against the left and right card edges */}
      {CONNECTOR_ANCHORS.map((topClass) => (
        <span
          key={`left-${topClass}`}
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 z-20 hidden size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D71920] lg:block ${topClass}`}
        />
      ))}
      {CONNECTOR_ANCHORS.map((topClass) => (
        <span
          key={`right-${topClass}`}
          aria-hidden="true"
          className={`pointer-events-none absolute right-0 z-20 hidden size-[9px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D71920] lg:block ${topClass}`}
        />
      ))}

      {/* Venn circles */}
      <div className="relative z-10 mx-auto w-[300px] sm:w-[340px] lg:w-[310px] xl:w-[380px]">
        <svg viewBox="0 0 380 260" aria-hidden="true" className="block h-auto w-full">
          <defs>
            <clipPath id="work-process-venn-left">
              <circle cx="128" cy="130" r="114" />
            </clipPath>
          </defs>

          <circle
            cx="128"
            cy="130"
            r="114"
            fill="#F7F4F0"
            stroke="#CFC7BE"
            strokeWidth="1.25"
          />
          <circle
            cx="252"
            cy="130"
            r="114"
            fill="#E3D9D1"
            stroke="#C9BFB6"
            strokeWidth="1.25"
          />
          <circle
            cx="252"
            cy="130"
            r="114"
            fill="#D71920"
            clipPath="url(#work-process-venn-left)"
          />
        </svg>

        <div className="pointer-events-none absolute inset-0">
          {/* Left: You */}
          <div className="absolute top-1/2 left-[20%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
            <Image
              src={assets.workProcessYou}
              alt=""
              width={36}
              height={36}
              className="size-7 object-contain sm:size-8"
            />
            <span className="mt-2 text-[16px] font-semibold text-navy lg:text-[clamp(15px,0.9375vw,18px)]">
              {leftLabel}
            </span>
          </div>

          {/* Center: YOUR PROJECT */}
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
            <Image
              src={assets.workProcessProject}
              alt=""
              width={36}
              height={36}
              className="size-7 object-contain sm:size-8"
            />
            <span className="mt-2 max-w-[6.5em] text-[14px] leading-tight font-semibold tracking-wide text-white uppercase lg:text-[clamp(13px,0.833vw,16px)]">
              {middleLabel}
            </span>
          </div>

          {/* Right: Way Wise Tech */}
          <div className="absolute top-1/2 left-[80%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
            <Image
              src={assets.workProcessWayWise}
              alt=""
              width={36}
              height={36}
              className="size-7 object-contain sm:size-8"
            />
            <span className="mt-2 max-w-[6.5em] text-[14px] leading-tight font-semibold text-navy lg:text-[clamp(13px,0.833vw,16px)]">
              {rightLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Homepage Our Work Process section (placed after Our Work).
 * All copy and step definitions come from `homeWorkProcess` in `lib/content/home.ts`.
 */
export function WorkProcess() {
  const { eyebrow, heading, description, steps } = homeWorkProcess;
  const leftSteps = steps.slice(0, 4);
  const rightSteps = steps.slice(4, 8);

  return (
    <section
      id="work-process"
      aria-labelledby="work-process-heading"
      className="relative bg-[#EEE9E1]"
    >
      <Container className="py-16 md:py-20 lg:py-24">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,968fr)_minmax(0,592fr)] lg:items-end lg:gap-0">
          <div>
            <SectionEyebrow size="lg" tracking="0.078em">
              {eyebrow}
            </SectionEyebrow>
            <SectionHeading id="work-process-heading" tone="navy" className="mt-2">
              {heading.first}{" "}
              <span className="text-[#D71920]">{heading.accent}</span>
            </SectionHeading>
          </div>
          <p className="text-[18px] leading-[1.45] text-[#626262] max-[1599px]:text-pretty lg:text-[clamp(17px,1.146vw,22px)]">
            {description}
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-4 lg:mt-14 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)_minmax(0,320px)] lg:gap-0 xl:grid-cols-[minmax(0,440px)_minmax(0,1fr)_minmax(0,440px)]">
          <div className="order-2 grid gap-4 sm:grid-cols-2 lg:order-1 lg:grid-cols-1 lg:gap-5">
            {leftSteps.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </div>

          <div className="order-1 mb-4 lg:order-2 lg:mb-0">
            <VennDiagram />
          </div>

          <div className="order-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
            {rightSteps.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
