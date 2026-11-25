import type { Metadata } from "next";
import { absoluteUrl } from "@/components/landing/shared/site";
import PlumberNavbar from "@/components/landing/plumber/PlumberNavbar";
import PlumberBanner from "@/components/landing/plumber/PlumberBanner";
// Parked sections: commented out in the JSX below. To bring one back, uncomment its import and its tag.
// import PlumberServices from "@/components/landing/plumber/PlumberServices";
import PlumberWhyChoose from "@/components/landing/plumber/PlumberWhyChoose";
import PlumberPackages from "@/components/landing/plumber/PlumberPackages";
import PlumberProjects from "@/components/landing/plumber/PlumberProjects";
// import PlumberWayToGrow from "@/components/landing/plumber/PlumberWayToGrow";
// import PlumberBusinessControl from "@/components/landing/plumber/PlumberBusinessControl";
// import PlumberBetterWay from "@/components/landing/plumber/PlumberBetterWay";
// import PlumberFaq from "@/components/landing/plumber/PlumberFaq";
import PlumberCta from "@/components/landing/plumber/PlumberCta";
import PlumberFooter from "@/components/landing/plumber/PlumberFooter";

export const metadata: Metadata = {
  // Self-referencing canonical, built by absoluteUrl() from NEXT_PUBLIC_SITE_URL (see
  // components/landing/shared/site.ts). The root layout sets no canonical, so without this the page would have none.
  alternates: {
    canonical: absoluteUrl("/plumber"),
  },
};

const PlumberPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <PlumberNavbar />
      <PlumberBanner />
      {/* <PlumberServices /> */}
      <PlumberWhyChoose />
      <PlumberPackages />
      <PlumberProjects />
      {/* <PlumberWayToGrow /> */}
      {/* <PlumberBusinessControl /> */}
      {/* <PlumberBetterWay /> */}
      {/* <PlumberFaq /> */}
      <PlumberCta />
      <PlumberFooter />
    </main>
  );
};

export default PlumberPage;
