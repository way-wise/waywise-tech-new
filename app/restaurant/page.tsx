import type { Metadata } from "next";
import { absoluteUrl } from "@/components/landing/shared/site";
import RestaurantNavbar from "@/components/landing/restaurant/RestaurantNavbar";
import RestaurantBanner from "@/components/landing/restaurant/RestaurantBanner";
// Parked sections: commented out in the JSX below. To bring one back, uncomment its import and its tag.
// import RestaurantFoodBusiness from "@/components/landing/restaurant/RestaurantFoodBusiness";
import RestaurantGuestExperience from "@/components/landing/restaurant/RestaurantGuestExperience";
// import RestaurantScaleFaster from "@/components/landing/restaurant/RestaurantScaleFaster";
// import RestaurantGrowDigitally from "@/components/landing/restaurant/RestaurantGrowDigitally";
import RestaurantPricing from "@/components/landing/restaurant/RestaurantPricing";
import RestaurantProjects from "@/components/landing/restaurant/RestaurantProjects";
// import RestaurantOutcomes from "@/components/landing/restaurant/RestaurantOutcomes";
// import RestaurantGrowthPartner from "@/components/landing/restaurant/RestaurantGrowthPartner";
import RestaurantFuture from "@/components/landing/restaurant/RestaurantFuture";
import RestaurantFooter from "@/components/landing/restaurant/RestaurantFooter";

export const metadata: Metadata = {
  // Self-referencing canonical, built by absoluteUrl() from NEXT_PUBLIC_SITE_URL (see
  // components/landing/shared/site.ts). The root layout sets no canonical, so without this the page would have none.
  alternates: {
    canonical: absoluteUrl("/restaurant"),
  },
};

const RestaurantPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <RestaurantNavbar />
      <RestaurantBanner />
      {/* <RestaurantFoodBusiness /> */}
      <RestaurantGuestExperience />
      {/* <RestaurantScaleFaster /> */}
      {/* <RestaurantGrowDigitally /> */}
      <RestaurantPricing />
      <RestaurantProjects />
      {/* <RestaurantOutcomes /> */}
      {/* <RestaurantGrowthPartner /> */}
      <RestaurantFuture />
      <RestaurantFooter />
    </main>
  );
};

export default RestaurantPage;
