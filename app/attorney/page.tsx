import type { Metadata } from "next";
import { absoluteUrl } from "@/components/landing/shared/site";
import AttorneyTopBar from "@/components/landing/attorney/AttorneyTopBar";
import AttorneyNavbar from "@/components/landing/attorney/AttorneyNavbar";
import AttorneyBanner from "@/components/landing/attorney/AttorneyBanner";
import AttorneyStats from "@/components/landing/attorney/AttorneyStats";
import AttorneyBuiltFor from "@/components/landing/attorney/AttorneyBuiltFor";
import AttorneyMarquee from "@/components/landing/attorney/AttorneyMarquee";
import AttorneyWork from "@/components/landing/attorney/AttorneyWork";
// Parked sections: commented out in the JSX below. To bring one back, uncomment its import and its tag.
// import AttorneyWhyUs from "@/components/landing/attorney/AttorneyWhyUs";
// import AttorneyProcess from "@/components/landing/attorney/AttorneyProcess";
import AttorneyPricing from "@/components/landing/attorney/AttorneyPricing";
// import AttorneyInsights from "@/components/landing/attorney/AttorneyInsights";
// import AttorneyReviews from "@/components/landing/attorney/AttorneyReviews";
// import AttorneyFaq from "@/components/landing/attorney/AttorneyFaq";
import AttorneyCta from "@/components/landing/attorney/AttorneyCta";
import AttorneyFooter from "@/components/landing/attorney/AttorneyFooter";

export const metadata: Metadata = {
  title: "Law Firm Websites & Client Portals | Way Wise Tech",
  description:
    "Way Wise Tech creates professional websites and secure client portals for law firms, helping attorneys attract clients and improve efficiency.",
  keywords: [
    "law firm website design",
    "attorney website development",
    "client portal for law firms",
    "legal software development",
  ],
  // Self-referencing canonical, built by absoluteUrl() from NEXT_PUBLIC_SITE_URL (see
  // components/landing/shared/site.ts). The root layout sets no canonical, so without this the page would have none.
  alternates: {
    canonical: absoluteUrl("/attorney"),
  },
};

const AttorneyPage = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Home anchor: the navbar goes position:fixed when pinned, so it can not be the scroll target. */}
      <div id="home" aria-hidden="true" />
      <AttorneyTopBar />
      <AttorneyNavbar />
      <AttorneyBanner />
      <AttorneyStats />
      <AttorneyBuiltFor />
      <AttorneyPricing />
      <AttorneyMarquee />
      <AttorneyWork />
      {/* <AttorneyWhyUs /> */}
      {/* <AttorneyProcess /> */}
      {/* <AttorneyInsights /> */}
      {/* <AttorneyReviews /> */}
      {/* <AttorneyFaq /> */}
      <AttorneyCta />
      {/* New sections go above the footer. */}
      <AttorneyFooter />
    </main>
  );
};

export default AttorneyPage;
