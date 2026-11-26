import Image from "next/image";
import { AssetImage } from "@/components/ui/AssetImage";
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
      className="relative overflow-hidden bg-[#f5efe8]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <AssetImage
          src={assets.securityDataProtectionBg}
          alt=""
          sizes="100vw"
          className="object-cover object-right"
        />
        {/* Soft left scrim on smaller screens so cards stay crisp over the background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5efe8]/90 via-[#f5efe8]/70 to-transparent lg:from-[#f5efe8]/45 lg:via-transparent" />
      </div>

      <Container className="relative py-16 md:py-20 lg:py-16 xl:py-20">
        <div className="max-w-3xl lg:max-w-[58%] xl:max-w-[920px]">
          <SectionEyebrow size="lg" tracking="0.078em">
            {eyebrow}
          </SectionEyebrow>
          <SectionHeading
            id="security-protection-heading"
            tone="navy"
            className="mt-2"
          >
            {heading.first} <span className="text-brand">{heading.accent}</span>
          </SectionHeading>
          <p className="mt-4 max-w-2xl text-[18px] leading-[1.45] text-[#626262] lg:text-[clamp(17px,1.146vw,22px)]">
            {description}
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 xl:grid-cols-3 xl:gap-5">
            {cards.map((card) => {
              const { badge, src } = iconStyles[card.icon];

              return (
                <li key={card.title}>
                  <article className="flex h-full items-start gap-3.5 rounded-2xl border border-black/6 bg-white/95 p-4 shadow-[0_2px_10px_rgba(13,29,68,0.04)] backdrop-blur-[2px] transition-[translate,box-shadow,border-color] duration-300 ease-out hover:border-[#D71920]/30 hover:shadow-[0_8px_20px_rgba(35,31,32,0.1)] motion-safe:hover:-translate-y-1 sm:p-5">
                    <span
                      aria-hidden="true"
                      className={`flex size-12 shrink-0 items-center justify-center rounded-full ${badge}`}
                    >
                      <Image
                        src={src}
                        alt=""
                        width={24}
                        height={24}
                        className="size-6 object-contain"
                      />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[18px] leading-[24px] font-semibold text-navy xl:text-[20px] xl:leading-[26px]">
                        {card.title}
                      </h3>
                      <p className="mt-1 text-[15px] leading-[21px] tracking-[0.02em] text-[#626262] lg:text-[clamp(14px,0.833vw,16px)]">
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
    </section>
  );
}
