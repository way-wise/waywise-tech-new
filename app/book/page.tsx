import type { Metadata } from "next";
import { ProfileFlipbook } from "@/components/book/ProfileFlipbook";
import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { companyProfile } from "@/lib/content/profile";

export const metadata: Metadata = {
  title: "Company Profile | Way-Wise Tech",
  description: companyProfile.description,
};

/*
  The company profile booklet, opened by the Navbar's "Our Profile" card (owner, 2026-11-25).
  Ordinary document scrolling, like Blog Details: the floating Navbar, a short header, the booklet
  (components/book/ProfileFlipbook.tsx) with its controls, then the shared Footer.
*/
export default function BookPage() {
  const { eyebrow, heading, description } = companyProfile;
  return (
    <>
      <SiteHeader showBanner={false} variant="floating" />
      {/* The floating Navbar takes no space: the top padding keeps the header clear of it.
          overflow-x-clip: a lone back cover is slid to the middle, which moves the book's empty
          right half past the screen edge; it must not make the page scroll sideways. */}
      <main className="overflow-x-clip bg-sand pt-[116px] pb-16 md:pt-[124px] md:pb-20 xl:pt-[150px] xl:pb-24">
        <Container>
          <header className="mx-auto mb-10 max-w-[760px] text-center lg:mb-12">
            <SectionEyebrow weight="bold" className="justify-center">
              {eyebrow}
            </SectionEyebrow>
            <SectionHeading as="h1" className="mt-3">
              {heading.first} <span className="text-brand">{heading.accent}</span>
            </SectionHeading>
            <p className="mt-4 text-[17px] leading-[1.55] text-ink-muted lg:text-[20px]">{description}</p>
          </header>
          <ProfileFlipbook />
        </Container>
      </main>
      <Footer />
    </>
  );
}
