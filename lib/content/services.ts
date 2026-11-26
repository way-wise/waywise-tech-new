import { assets } from "@/lib/assets";

/*
  Central service list. The Services section (components/sections/Services.tsx) reads its cards and
  header from here. The Footer (components/layout/SiteFooter.tsx) reads its Services column labels
  from `services`, in this order; its links stay "#" (set in the Footer, not here).
*/

export type Service = {
  title: string;
  /**
   * One of the six services on the Homepage Services section and the Navbar's main Services links.
   * The others appear only on /services (all eight cards) and as Navbar and Footer extras.
   */
  featured?: boolean;
  /** Card content: description and image for the Services section, and the Details page link. */
  card?: {
    /** The service's Details page. The card title links here. */
    href: string;
    description: string;
    image: string;
    alt: string;
  };
};

/**
 * Every service, in the Footer's order. The six `featured` ones are the Homepage Services cards, in
 * the same order. "Cloud, API & DevOps" and "Support & Maintenance" follow them on /services only.
 */
export const services: Service[] = [
  {
    title: "Custom Software Development",
    featured: true,
    card: {
      href: "/services/ui-ux-product-design",
      description:
        "We build custom software to simplify workflows, boost efficiency, and scale your business.",
      image: assets.serviceUiUx,
      alt: "Tablet and desktop monitor showing interface designs",
    },
  },
  {
    title: "Web Design & Development",
    featured: true,
    card: {
      href: "/services/custom-software-development",
      description:
        "We create modern, responsive, high-performing websites that strengthen your online presence.",
      image: assets.serviceCustomSoftware,
      alt: "Monitor, laptop and phone showing code and software screens beside a server stack",
    },
  },
  {
    title: "Mobile App Development",
    featured: true,
    card: {
      href: "/services/web-development",
      description:
        "We build powerful, user-friendly mobile apps for seamless digital experiences.",
      image: assets.serviceWeb,
      alt: "Desktop monitor showing a website beside a code editor",
    },
  },
  {
    title: "AI & ML Development",
    featured: true,
    card: {
      href: "/services/mobile-app-development",
      description:
        "Intelligent AI solutions that automate tasks, analyse data, and enable  smarter decisions.",
      image: assets.serviceMobile,
      alt: "Two phones showing a property app with app store icons",
    },
  },
  {
    title: "Custom Blockchain Development",
    featured: true,
    card: {
      href: "/services/ai-data-automation",
      description:
        "We build secure custom blockchain solutions and apps for transparent, trusted transactions.",
      image: assets.serviceAi,
      alt: "Laptop showing a data dashboard beside a small robot",
    },
  },
  {
    title: "DevOps & Automation",
    featured: true,
    card: {
      href: "/services/branding-digital-growth",
      description:
        "We automated deployments and infrastructure for reliable, scalable system performance.",
      image: assets.serviceBranding,
      alt: "Laptop and phone showing a brand website with a camera and marketing icons",
    },
  },
  {
    title: "UI/UX Design",
    featured: true,
    card: {
      href: "/services/cloud-api-devops",
      description:
        "We create intuitive, user-friendly designs for seamless and engaging digital experiences.",
      image: assets.serviceCloud,
      alt: "Glowing cloud linked to API, data and deployment icons above a desk with a server stack",
    },
  },
  {
    title: "Digital Marketing & SEO",
    featured: true,
    card: {
      href: "/services/support-maintenance",
      description:
        "We boost online visibility, attract targeted audiences, and drive measurable digital growth.",
      image: assets.serviceSupport,
      alt: "Interlocking gears linked to tool, performance, security and support icons above a desk",
    },
  },
];

type ServiceCard = NonNullable<Service["card"]> & { title: string };

/** Every service with a card (all eight), in order: the /services page's Services section. */
export const allServiceCards: ServiceCard[] = services.flatMap(
  ({ title, card }) => (card ? [{ title, ...card }] : []),
);

/**
 * The six featured cards, in order: the Homepage Services section (approved design, exactly six)
 * and the Contact form's Project Type options.
 */
export const serviceCards: ServiceCard[] = services.flatMap(
  ({ title, featured, card }) => (featured && card ? [{ title, ...card }] : []),
);

/**
 * The Services section header (components/sections/Services.tsx), shown on the Homepage and /services.
 * `action` is the Homepage button; /services, which already shows every service, uses `pageAction`.
 */
export const servicesSection = {
  eyebrow: "All Services",
  /** The first line is ink; the second line ends in the red `accent`. */
  heading: {
    first: "End-to-End Technology",
    second: "Services for",
    accent: "Business Success",
  },
  description:
    "From innovative software to AI-powered solutions, we deliver technology that creates new opportunities.",
  action: { label: "View All Services", href: "/services" },
  pageAction: { label: "Discuss Your Project", href: "/contact#contact-form" },
};

/**
 * The /services page Hero (components/services/ServicesHero.tsx), as written in its reference.
 * Moved out of the component unchanged; the artwork (decorative, so it has no alt text), layout,
 * animation and the button labels' letter roll stay there. Both buttons are "#" placeholders: the
 * design has no destinations yet.
 */
export const servicesHero = {
  eyebrow: "Our Services",
  /** The first line is ink; the second is the red `accent`. */
  heading: { first: "Smart Digital Solutions", accent: "for Your Business" },
  description:
    "We help businesses design, build, and grow with modern technology. Explore our services and find the right solution for your business.",
  primaryAction: { label: "Start Your Project", href: "#" },
  secondaryAction: { label: "Explore Our Services", href: "#" },
  features: ["Custom Solutions", "Experienced Team", "Modern Technology"],
};
