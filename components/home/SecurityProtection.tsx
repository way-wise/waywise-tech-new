import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { revealOrder } from "@/components/motion/revealOrder";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { assets } from "@/lib/assets";
import { homeSecurity, type SecurityCardIcon } from "@/lib/content/home";

const iconStyles: Record<SecurityCardIcon, { badge: string; src: string }> = {
  lock: {
    badge: "bg-[#F9E4E4]",
    src: assets.securityLock,
  },
  access: {
    badge: "bg-[#FBEAD8]",
    src: assets.securityAccess,
  },
  server: {
    badge: "bg-[#E2EFE2]",
    src: assets.securityServer,
  },
  backup: {
    badge: "bg-[#E3EBF6]",
    src: assets.securityBackup,
  },
  nda: {
    badge: "bg-[#ECE6F5]",
    src: assets.securityNda,
  },
  shield: {
    badge: "bg-[#FAF0D7]",
    src: assets.securityShield,
  },
};

/**
 * Homepage Security & Data Protection section (placed after Our Work Process).
 * All copy and card definitions come from `homeSecurity` in `lib/content/home.ts`.
 */
export function SecurityProtection() {
  const { eyebrow, heading, description, cards } = homeSecurity;

  return (
    <section
      id="security-protection"
      aria-labelledby="security-protection-heading"
      className="relative overflow-hidden bg-[#f8ece5]"
    >
      <Reveal each>
        <div className="relative">
          <Container className="py-16 md:py-20 lg:py-20 xl:py-24">
            <div className="lg:max-w-[54%] xl:max-w-[880px]">
              <div className="ww-rise">
                <SectionEyebrow size="lg" tracking="0.078em">
                  {eyebrow}
                </SectionEyebrow>
                <SectionHeading
                  id="security-protection-heading"
                  tone="navy"
                  className="mt-2"
                >
                  {heading.first}{" "}
                  <span className="text-brand">{heading.accent}</span>
                </SectionHeading>
                <p className="mt-4 max-w-2xl text-[18px] leading-[1.45] text-[#626262] lg:text-[clamp(17px,1.146vw,22px)]">
                  {description}
                </p>
              </div>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 xl:grid-cols-3 xl:gap-5">
                {cards.map((card, index) => {
                  const { badge, src } = iconStyles[card.icon];

                  return (
                    <li
                      key={card.title}
                      style={revealOrder(index % 3)}
                      className="ww-rise"
                    >
                      <article className="flex h-full items-center gap-4 rounded-2xl border border-black/6 bg-white p-5 shadow-[0_2px_10px_rgba(13,29,68,0.04)] transition-[translate,box-shadow,border-color] duration-300 ease-out hover:border-[#D71920]/30 hover:shadow-[0_8px_20px_rgba(35,31,32,0.1)] motion-safe:hover:-translate-y-1 sm:p-6">
                        <span
                          aria-hidden="true"
                          className={`flex size-14 shrink-0 items-center justify-center rounded-full sm:size-[60px] ${badge}`}
                        >
                          <Image
                            src={src}
                            alt=""
                            width={32}
                            height={32}
                            className="size-7 object-contain sm:size-8"
                          />
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-[16px] leading-[22px] font-semibold text-navy xl:text-[17px] xl:leading-[23px]">
                            {card.title}
                          </h3>
                          <p className="mt-1 text-[13.5px] leading-[19px] tracking-[0.015em] text-[#626262] lg:text-[14px] lg:leading-[20px]">
                            {card.description}
                          </p>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Container>

          <div
            style={revealOrder(2)}
            className="ww-rise px-5 pb-16 md:px-8 md:pb-20 lg:pointer-events-none lg:absolute lg:inset-y-0 lg:right-0 lg:flex lg:w-[44%] lg:items-center lg:justify-end lg:p-0 xl:w-[45%]"
          >
            <div className="mx-auto w-full max-w-160 lg:flex lg:h-full lg:max-w-none lg:justify-end">
              <Image
                src={assets.securityDataProtectionLaptop}
                alt="Laptop displaying security shield surrounded by data protection icons"
                width={900}
                height={700}
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent 0%, #000 7%, #000 96%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 8%, #000 92%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, #000 7%, #000 96%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 8%, #000 92%, transparent 100%)",
                  WebkitMaskComposite: "source-in",
                }}
                className="h-auto w-full object-contain lg:h-full lg:w-auto lg:max-w-full"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
