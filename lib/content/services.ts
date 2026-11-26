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
      href: "/services/custom-software-development",
      description:
        "Custom software solutions that simplify workflows, improve efficiency, and support growth.",
      image: assets.serviceCustomSoftware,
      alt: "Developer working on custom software and analytics dashboard",
    },
  },
  {
    title: "Web Design & Development",
    featured: true,
    card: {
      href: "/services/web-development",
      description:
        "Create modern, responsive, high-performing websites that strengthen your digital presence.",
      image: assets.serviceWeb,
      alt: "Desktop monitor displaying a modern responsive website",
    },
  },
  {
    title: "Mobile App Development",
    featured: true,
    card: {
      href: "/services/mobile-app-development",
      description:
        "Create modern, responsive, high-performing websites that strengthen your digital presence.",
      image: assets.serviceMobile,
      alt: "Person testing a mobile app alongside a laptop",
    },
  },
  {
    title: "AI & ML Development",
    featured: true,
    card: {
      href: "/services/ai-data-automation",
      description:
        "Intelligent AI solutions that automate tasks, analyse data, and enable  smarter decisions.",
      image: assets.serviceAi,
      alt: "AI neural head with digital data interfaces",
    },
  },
  {
    title: "Custom Blockchain Development",
    featured: true,
    card: {
      href: "#",
      description:
        "We build secure custom blockchain solutions and apps for transparent, trusted transactions.",
      image: assets.serviceBlockchain,
      alt: "Team collaborating around a table with blockchain network nodes",
    },
  },
  {
    title: "DevOps & Automation",
    featured: true,
    card: {
      href: "/services/cloud-api-devops",
      description:
        "Automated deployment and infrastructure solutions that improve reliability, scalable system performance.",
      image: assets.serviceDevops,
      alt: "Engineer working at multi-monitor DevOps dashboard",
    },
  },
  {
    title: "UI/UX Design",
    featured: true,
    card: {
      href: "/services/ui-ux-product-design",
      description:
        "Creating intuitive designs that deliver seamless, and engaging digital experiences.",
      image: assets.serviceUiUx,
      alt: "Designer working on UI/UX layouts at dual monitors",
    },
  },
  {
    title: "Digital Marketing & SEO",
    featured: true,
    card: {
      href: "/services/branding-digital-growth",
      description:
        "We boost online visibility, attract targeted audiences, and drive measurable digital growth.",
      image: assets.serviceDigitalMarketing,
      alt: "Marketing team reviewing analytics and SEO performance on laptops",
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
