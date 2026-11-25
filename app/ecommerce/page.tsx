import type { Metadata } from "next";
import { absoluteUrl } from "@/components/landing/shared/site";
import EcommerceNavbar from "@/components/landing/ecommerce/EcommerceNavbar";
import EcommerceBanner from "@/components/landing/ecommerce/EcommerceBanner";
// Parked sections: commented out in the JSX below. To bring one back, uncomment its import and its tag.
// import EcommerceIndustries from "@/components/landing/ecommerce/EcommerceIndustries";
// import EcommerceConnected from "@/components/landing/ecommerce/EcommerceConnected";
import EcommercePackages from "@/components/landing/ecommerce/EcommercePackages";
import EcommerceOurWork from "@/components/landing/ecommerce/EcommerceOurWork";
// import EcommerceThreePhases from "@/components/landing/ecommerce/EcommerceThreePhases";
import EcommerceGreaterControl from "@/components/landing/ecommerce/EcommerceGreaterControl";
// import EcommerceSolutions from "@/components/landing/ecommerce/EcommerceSolutions";
// import EcommerceFaq from "@/components/landing/ecommerce/EcommerceFaq";
import EcommerceCta from "@/components/landing/ecommerce/EcommerceCta";
import EcommerceFooter from "@/components/landing/ecommerce/EcommerceFooter";

export const metadata: Metadata = {
  // Self-referencing canonical, built by absoluteUrl() from NEXT_PUBLIC_SITE_URL (see
  // components/landing/shared/site.ts). The root layout sets no canonical, so without this the page would have none.
  alternates: {
    canonical: absoluteUrl("/ecommerce"),
  },
};

const EcommercePage = () => {
  return (
    <main className="min-h-screen bg-white">
      <EcommerceNavbar />
      <EcommerceBanner />
      <EcommerceGreaterControl />
      {/* <EcommerceIndustries /> */}
      {/* <EcommerceConnected /> */}
      <EcommercePackages />
      <EcommerceOurWork />
      {/* <EcommerceThreePhases /> */}
      
      {/* <EcommerceSolutions /> */}
      {/* <EcommerceFaq /> */}
      <EcommerceCta />
      <EcommerceFooter />
    </main>
  );
};

export default EcommercePage;
