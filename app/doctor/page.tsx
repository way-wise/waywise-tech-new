import type { Metadata } from "next";
import { absoluteUrl } from "@/components/landing/shared/site";
import DoctorNavbar from "@/components/landing/doctor/DoctorNavbar";
import DoctorBanner from "@/components/landing/doctor/DoctorBanner";
import DoctorProfessionals from "@/components/landing/doctor/DoctorProfessionals";
import DoctorPricing from "@/components/landing/doctor/DoctorPricing";
// Parked sections: commented out in the JSX below. To bring one back, uncomment its import and its tag.
// import DoctorTechHelps from "@/components/landing/doctor/DoctorTechHelps";
// import DoctorExperiences from "@/components/landing/doctor/DoctorExperiences";
// import DoctorSolutions from "@/components/landing/doctor/DoctorSolutions";
import DoctorProjects from "@/components/landing/doctor/DoctorProjects";
// import DoctorSimple from "@/components/landing/doctor/DoctorSimple";
// import DoctorProcess from "@/components/landing/doctor/DoctorProcess";
import DoctorFuture from "@/components/landing/doctor/DoctorFuture";
import DoctorFooter from "@/components/landing/doctor/DoctorFooter";

export const metadata: Metadata = {
  // Self-referencing canonical, built by absoluteUrl() from NEXT_PUBLIC_SITE_URL (see
  // components/landing/shared/site.ts). The root layout sets no canonical, so without this the page would have none.
  alternates: {
    canonical: absoluteUrl("/doctor"),
  },
};

const DoctorPage = () => {
  return (
    // TEMPORARY: the page background is a placeholder. The navbar's #F2F5FF99 fill is
    // 60% alpha, so it needs something behind it, and the banner's Figma frame gave no
    // background colour. Replace once the real page/banner background is known.
    <main id="home" className="bg-[#EAEEFB]">
      <DoctorNavbar />
      <DoctorBanner />
      <DoctorProfessionals />
      <DoctorPricing />
      {/* <DoctorTechHelps /> */}
      {/* <DoctorExperiences /> */}
      {/* <DoctorSolutions /> */}
      <DoctorProjects />
      {/* <DoctorSimple /> */}
      {/* <DoctorProcess /> */}
      <DoctorFuture />
      <DoctorFooter />
    </main>
  );
};

export default DoctorPage;
