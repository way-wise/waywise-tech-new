import Link from "next/link";
import { AssetImage } from "@/components/ui/AssetImage";
import { assets } from "@/lib/assets";

/*
  The Navbar's "Our Profile" card, linking to the company profile booklet (/book). Shared by the
  main site's Navbar (SiteHeader) and the five landing pages' navbars (LandingProfileCard), so they
  stay identical. Moved out of SiteHeader.tsx unchanged on 2026-11-25.
*/
type ProfileCardProps = {
  showThumbnail?: boolean;
  /** "small": the floating bar's 48px card (2026-11-16 redesign). "default": the original 60px card. */
  size?: "default" | "small";
  /** Height classes replacing the small card's 48px (h-12), e.g. to match a button beside it. */
  heightClassName?: string;
};

export function ProfileCard({ showThumbnail = true, size = "default", heightClassName = "h-12" }: ProfileCardProps) {
  const small = size === "small";
  return (
    <Link
      href="/book"
      className={`flex shrink-0 items-center bg-[#fdf3f2] shadow-[inset_0_0_0_1.5px_var(--color-brand)] transition-colors duration-200 hover:bg-[#fbe4e2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
        small
          ? `${heightClassName} gap-3 rounded-lg px-[14px] min-[1440px]:w-[192px]`
          : "h-[60px] gap-3 rounded-[10px] px-[16.5px] min-[1440px]:w-[234px]"
      }`}
    >
      {showThumbnail && (
        <span
          className={`relative hidden shrink-0 min-[1440px]:block ${small ? "h-[33px] w-[46px]" : "h-[42px] w-[59px]"}`}
        >
          {/* The export includes shadow padding around the thumbnail (59x42 in the original card). */}
          <span
            className={`absolute ${small ? "-inset-x-[3.3px] -top-[2.35px] -bottom-[3.9px]" : "-inset-x-[4.25px] -top-[3px] -bottom-[5px]"}`}
          >
            <AssetImage
              src={assets.profileThumbnail}
              alt=""
              sizes="68px"
              className="object-contain"
            />
          </span>
        </span>
      )}
      <span className={`flex items-center ${small ? "gap-1.5" : "gap-1"}`}>
        <span className={`relative shrink-0 ${small ? "size-[31px]" : "size-8"}`}>
          <AssetImage src={assets.pdfIcon} alt="" sizes="32px" className="object-contain" />
        </span>
        <span className="flex flex-col">
          <span
            className={`font-medium text-black ${small ? "text-[14px] leading-[17px]" : "text-[18px] leading-[21px]"}`}
          >
            Our Profile
          </span>
          <span
            className={`text-[#626262] ${small ? "mt-px text-[11.5px] leading-[14px]" : "mt-[3px] text-[14px] leading-[18px]"}`}
          >
            View PDF
          </span>
        </span>
      </span>
    </Link>
  );
}
