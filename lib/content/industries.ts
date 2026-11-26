import { assets } from "@/lib/assets";

/*
  Central industry lists. The Industries section (components/sections/industries/Industries.tsx) reads its carousel
  cards, header and pricing phases from here. The Footer (components/layout/SiteFooter.tsx) reads its
  Industries column labels from `footerIndustries`, in this order; its links stay "#" (set in the
  Footer, not here).

  UNRESOLVED: the carousel and the Footer list different industries. They are kept as two separate
  lists, unchanged, until the owner or designer confirms which set the Industry pages use.
*/

/** Same shape as `IndustryCard` in IndustryCarousel.tsx, so the lists are interchangeable. */
export type Industry = {
  title: string;
  description: string;
  image: string;
  alt: string;
  /** Fade colour as space-separated RGB channels. */
  fade: string;
};

/** The Industries section carousel, in the approved order. Plumbers is the owner's own addition. */
export const industryCards: Industry[] = [
  {
    title: "Attorney & Lawyers",
    description:
      "Professional websites and digital tools that help law firms build trust, attract clients, and manage inquiries.",
    image: assets.industryAttorney,
    alt: "Attorney seated at a large desk in a wood-panelled office",
    fade: "46 62 86",
  },
  {
    title: "Restaurant",
    description:
      "Modern websites, online ordering systems, and digital tools that help restaurants serve more customers.",
    image: assets.industryRestaurant,
    alt: "Chef checking a tablet in a restaurant kitchen",
    fade: "134 100 61",
  },
  {
    title: "Retailers",
    description:
      "Online stores and business tools that make shopping easier and help retailers grow sales.",
    image: assets.industryRetailers,
    alt: "Smiling shop owner holding a product in a homeware store",
    fade: "169 102 100",
  },
  {
    title: "Doctor",
    description:
      "User-friendly websites, patient portals, and digital solutions that improve communication and patient experience.",
    image: assets.industryDoctor,
    alt: "Doctor examining a patient's knee in a clinic",
    fade: "61 97 94",
  },
  {
    title: "Plumbers",
    description:
      "Reliable websites, online booking, and digital tools that help plumbers attract customers and schedule more jobs.",
    image: assets.industryPlumbers,
    alt: "Plumber fitting copper pipes with tools laid out on the floor",
    fade: "134 69 33",
  },
];

/**
 * The Industries section header (components/sections/industries/Industries.tsx), shown on the Homepage and
 * /services. "View All Industries" is a "#" placeholder until its destination is confirmed.
 */
export const industriesSection = {
  eyebrow: "Industries we serve",
  /** The first line is black; the second line is the red `accent`. */
  heading: { first: "Driving Digital Innovation", accent: "Across Industries" },
  intro:
    "Every industry has unique challenges. Our team creates tailored technology solutions to meet your specific needs and unlock new opportunities.",
  action: { label: "View All Industries", href: "/industries" },
};

/**
 * The three pricing phases under the Industries carousel, exactly as in the design. The prices are
 * kept as written, including their mixed hyphen and en dash formats. Their colours stay in the
 * component.
 */
export const industryPhases = [
  {
    phase: "PHASE 1",
    name: "Practice Launch",
    price: "$950-$2950",
    description: "Build your legal brand and establish a trusted and reliable online presence.",
    row: "Brand Identity",
  },
  {
    phase: "PHASE 2",
    name: "Client Management Platform",
    price: "$2975 – $6700",
    description: "Improve client communication and create a modern legal experience.",
    row: "Client Experience",
  },
  {
    phase: "PHASE 3",
    name: "Smart Legal Practice Management",
    price: "$6800-$19500",
    description:
      "Everything in Phase 1 & 2 plus transform your firm with a complete legal management system.",
    row: "Practice Management",
  },
];

/** The Footer's "Industries" column, in its order. A different set of categories from the carousel. */
export const footerIndustries = [
  "Healthcare & Medical",
  "Legal & Professional Services",
  "Real Estate & Construction",
  "Finance, Insurance & Accounting",
  "Retail, E-commerce & Logistics",
];

/**
 * The Industries page "Industries at a Glance" header (components/industries/IndustriesAtAGlance.tsx),
 * as written in its reference. Moved out of the component unchanged; layout and animation stay there.
 */
export const industriesAtAGlanceSection = {
  eyebrow: "Industries at a Glance",
  /** The first line is ink; the second is the red `accent`. */
  heading: { first: "Digital Solutions for", accent: "All Types of Businesses" },
  description:
    "From local businesses to global brands, we design websites, apps, and digital products for a wide range of industries.",
};

/** The Industries page "Industries at a Glance" cards, in the design's order (left to right, top to bottom). */
export const industriesAtAGlance = [
  {
    title: "Law Firms",
    description:
      "Professional, trustworthy designs that win clients and grow your brand.",
    image: assets.industryLawFirm,
    alt: "Two lawyers shaking hands across a desk with a gavel, scales of justice and signed documents",
  },
  {
    title: "Healthcare",
    description:
      "Clean and easy-to-use designs for doctors, clinics, hospitals and healthcare providers.",
    image: assets.industryHealthcare,
    alt: "Smiling team of doctors and nurses in scrubs and white coats in a clinic",
  },
  {
    title: "Real Estate",
    description: "Modern designs to showcase properties, build trust and generate more leads.",
    image: assets.industryRealEstate,
    alt: "Modern two-storey house with wood panelling, glass balconies and a pool at dusk",
  },
  {
    title: "Construction",
    description: "Practical and professional designs for construction companies and contractors.",
    image: assets.industryConstruction,
    alt: "High-rise building under construction with tower cranes and workers on a city site",
  },
];

/**
 * The "A Trusted Partner Across Industries" header and image alt text
 * (components/sections/IndustriesTrust.tsx, on /industries and /our-work), as written in its
 * reference. Moved out of the component unchanged; the image file, layout, stats bar and animation
 * stay there. The Case Study trust section has the same header wording but its own content
 * (`caseStudyResults` in case-study.ts); the two are kept separate.
 */
export const industriesTrustSection = {
  eyebrow: "Why Businesses Choose Us",
  /** The first line is navy; the second is the red `accent`. */
  heading: { first: "A Trusted Partner", accent: "Across Industries" },
  description: "We understand different business needs and deliver designs that create real value.",
  imageAlt: "Phone, laptop and tablet on stone blocks, each showing a property website design",
};

/** Icons drawn for the Industries page trust stats. */
export type IndustryStatIcon = "users" | "building" | "star" | "growth";

/**
 * The Industries page "A Trusted Partner Across Industries" stats, exactly as in the design
 * (Trust Section.png). The figures are the design's own and still need the owner's confirmation.
 */
export const industryStats: { value: string; label: string; icon: IndustryStatIcon }[] = [
  { value: "100+", label: "Businesses Served", icon: "users" },
  { value: "6+", label: "Industries", icon: "building" },
  { value: "98%", label: "Client Satisfaction", icon: "star" },
  { value: "2x", label: "Avg. Online Growth", icon: "growth" },
];

/**
 * The Industries page "Industry Solutions" header (components/industries/IndustriesSolutions.tsx), as
 * written in its reference. Moved out of the component unchanged; layout, card stacking and animation
 * stay there.
 */
export const industrySolutionsSection = {
  eyebrow: "Industry Solutions",
  /** The first line is navy; the second line is `second` in navy, then the red `accent`. */
  heading: { first: "Complete Digital Solutions", second: "for", accent: "Your Industry" },
  description:
    "From website design to custom software, we provide everything you need to grow your business online.",
};

/**
 * The Industries page "Industry Solutions" cards, exactly as in the design (Frame 2147238556.png).
 * `tone` is the number circle's colour.
 */
export const industrySolutions = [
  {
    number: "01",
    title: "Website Design & Development",
    description: "Modern, responsive and user-friendly websites tailored for your industry and business goals",
    tags: ["Business Websites", "Landing Page", "Custom Development"],
    image: assets.industrySolutionWeb,
    alt: "Laptop on a blue stand showing the Aria Home online store with featured products",
    tone: "#d7bf9e",
  },
  {
    number: "02",
    title: "Mobile App Development",
    description: "Powerful and easy-to-use mobile apps for iOS and Android to help you reach more customers.",
    tags: ["Business Websites", "Cross-Platform", "Custom Features"],
    image: assets.industrySolutionMobile,
    alt: "Hand holding a phone showing the QuickFix home services app",
    tone: "#b3bba1",
  },
  {
    number: "03",
    title: "Custom Software Development",
    description: "Scalable and secure software solutions to streamline your operations and improve efficiency.",
    tags: ["Web Applications", "SaaS Platforms", "Business Automation"],
    image: assets.industrySolutionSoftware,
    alt: "Laptop showing a dark analytics dashboard with revenue figures and a sales chart",
    tone: "#b7a7d3",
  },
  {
    number: "04",
    title: "UI/UX & Product Design",
    description: "Beautiful and user-friendly designs that improve customer experience and engagement.",
    tags: ["UI/UX Design", "Wireframes", "Prototypes"],
    image: assets.industrySolutionDesign,
    alt: "Laptop showing the Noodle Lab restaurant website with a ramen bowl and menu",
    tone: "#7eb2ed",
  },
];

/**
 * The Industries page Hero (components/industries/IndustriesHero.tsx), as written in its reference.
 * Moved out of the component unchanged; the image files, layout, animation and per-photo delays
 * stay there. Both buttons are "#" placeholders: the design has no destinations yet.
 */
export const industriesHero = {
  eyebrow: "Industries",
  /** The first line is ink; the second is the red `accent`. */
  heading: { first: "We Design for", accent: "Every Industry" },
  description:
    "We create modern and user-friendly designs for different types of businesses. No matter your industry, we design digital experiences that fit your goals and help you grow.",
  primaryAction: { label: "Discuss Your Project", href: "#" },
  secondaryAction: { label: "Explore Our Work", href: "#" },
  features: ["Web Development", "Mobile Apps", "UI/UX Design", "AI & Automation"],
  /** Alt text for each Hero image, by the image it describes. */
  imageAlts: {
    background: "Soft beige background with golden light streaks",
    laundry:
      "Technician repairing a washing machine in a laundry room while a smiling homeowner watches",
    law: "Gavel and scales of justice on a desk while two lawyers shake hands",
    dental: "Dentist in a mask examining a smiling patient in a dental chair",
    restaurant: "Waiter serving diners in a bright restaurant with tall windows",
  },
};

/** An image with its intrinsic size, as the newer content stores images. */
type ContentImage = { src: string; width: number; height: number; alt: string };

/** The line icons drawn in the phase cards' header circle (IndustryShowcase.tsx). */
export type IndustryPhaseIcon = "monitor" | "users" | "layers";

export type IndustryPhaseCard = {
  /** Upper-case title, for example "Phase 1". */
  phase: string;
  title: string;
  description: string;
  icon: IndustryPhaseIcon;
  /** Accordion rows: each title opens its list of points (points to be supplied by the owner). */
  features: { title: string; points: string[] }[];
  /** The note at the card's foot: `label` in semibold, then `text`. */
  note: { label: string; text: string };
};

/** Colour theme of an industry's phase cards (the colours are set in IndustryShowcase.tsx). */
export type IndustryShowcaseTheme = "gold" | "navy" | "olive" | "rust";

export type IndustryShowcaseItem = {
  title: string;
  theme: IndustryShowcaseTheme;
  description: string;
  image: ContentImage;
  /** The bare QR code; the component draws its white frame and the two-line caption under it. */
  qr: ContentImage & { caption: { title: string; text: string } };
  action: { label: string; href: string };
  phases: IndustryPhaseCard[];
};

/**
 * The Homepage Industries section's redesign (2026-11-26): per industry, an image card and three
 * phase cards. The header arrows switch industry; Attorney & Lawyers is the only one so far.
 */
export const industryShowcase: IndustryShowcaseItem[] = [
  {
    title: "Attorney & Lawyers",
    theme: "gold",
    description: "Websites and digital tools that help law firms build trust and attract clients.",
    image: {
      src: assets.industryAttorney,
      width: 457,
      height: 530,
      alt: "Barrister in a black gown holding a scroll and a law book",
    },
    qr: {
      src: assets.industryAttorneyQr,
      width: 78,
      height: 78,
      alt: "QR code: scan to explore our legal solutions",
      caption: { title: "Scan to explore", text: "Our Legal Solutions" },
    },
    action: { label: "Contact for Price", href: "/contact" },
    phases: [
      {
        phase: "Phase 1",
        title: "Practice Launch",
        description: "A professional, bar-compliant online presence that turns searches into consultations.",
        icon: "monitor",
        features: [
          {
            title: "Brand & Identity",
            points: [
              "Logo & Brand Guide",
              "Business Cards, Letterhead & Email",
            ],
          },
          {
            title: "Law Firm Website",
            points: [
              "UX Research & Competitor Analysis",
              "Design System, UI Design & Prototyping",
              "Responsive Wireframe Design (Mobile, Tablet & Desktop)",
              "5–10 Page Responsive Website",
              "Practice Area & Lawyer Pages",
              "Legal Disclaimers",
              "Reviews & Case Results",
              "ADA / WCAG Ready",
            ],
          },
          {
            title: "Local SEO & Lead Generation",
            points: [
              "Local SEO & Google Business Profile",
              "Contact, Consultation & Basic Intake Forms",
              "Call & Map Integration",
            ],
          },
          {
            title: "Hosting & Security",
            points: [
              "Domain, Hosting & Email (First Year)",
              "SSL & Daily Backups",
            ],
          },
        ],
        note: { label: "FREE", text: "30 days of post-launch support" },
      },
      {
        phase: "Phase 2",
        title: "Client Engagement Platform",
        description: "Never miss a lead again. Capture, book, and onboard clients 24/7 without adding staff.",
        icon: "users",
        features: [
          {
            title: "24/7 Client Intake",
            points: [
              "Smart Intake & Case Screening",
              "Online Consultation Booking",
              "Live Chat Support",
            ],
          },
          {
            title: "Secure Client Portal",
            points: [
              "Secure Document Upload & Sharing",
              "Case Status Updates",
              "E-Signature for Retainer Agreements",
              "Secure Online Payments",
              "Invoices & Billing Management",
            ],
          },
          {
            title: "Communication & Reminders",
            points: [
              "Automated Email & SMS Reminders",
              "Secure Attorney-Client Messaging",
            ],
          },
          {
            title: "Grow Your Practice",
            points: [
              "Automatic Lead Follow-Up",
              "Lead Source Tracking",
            ],
          },
        ],
        note: { label: "FREE", text: "60 days of support + staff training session" },
      },
      {
        phase: "Phase 3",
        title: "Smart Legal Practice Management",
        description:
          "Everything in Phases 1 & 2, plus your own custom practice management system. No per-user subscriptions, ever.",
        icon: "layers",
        features: [
          {
            title: "Client & Case Management",
            points: [
              "Manage Case & Client Records",
              "Automated Conflict Checks",
              "Automate Tasks & Workflows",
              "Track Court Dates & Deadlines",
              "Generate Legal Documents & Forms",
            ],
          },
          {
            title: "Time, Billing & Finance",
            points: [
              "Time Tracking & Billable Hours",
              "QuickBooks Integration",
            ],
          },
          {
            title: "Analytics & AI",
            points: [
              "Revenue & Collections Dashboard",
              "Case Pipeline & Attorney Performance Reports",
              "AI Case Summaries & Insights",
            ],
          },
          {
            title: "Team & Staff Management",
            points: [
              "Multi-Attorney & Staff Portal",
              "Role-Based Access & Permissions",
              "Activity & Communication Logs",
            ],
          },
          {
            title: "Security & Growth",
            points: [
              "Data Encryption & Two-Factor Authentication",
              "HIPAA-Ready for Personal Injury & Medical Records",
              "Advanced SEO & Content Strategy",
            ],
          },
        ],
        note: { label: "FREE", text: "90 days of support + staff training session" },
      },
    ],
  },
  {
    title: "Doctor, Dentist & Healthcare Professionals",
    theme: "navy",
    description: "Build patient trust, simplify appointments, and grow your healthcare practice.",
    image: {
      src: assets.industryDoctorShowcase,
      width: 457,
      height: 530,
      alt: "Smiling doctor in a white coat with a stethoscope in a bright hospital corridor",
    },
    qr: {
      src: assets.industryDoctorQr,
      width: 78,
      height: 78,
      alt: "QR code: scan to explore our healthcare solutions",
      caption: { title: "Scan to explore", text: "Our Healthcare Solutions" },
    },
    action: { label: "Contact for Price", href: "/contact" },
    phases: [
      {
        phase: "Phase 1",
        title: "Practice Launch",
        description:
          "A trusted, professional online presence that turns Google searches into booked appointments.",
        icon: "monitor",
        features: [
          {
            title: "Brand & Identity",
            points: [
              "Logo & Brand Guide",
              "Business Cards, Letterhead & Appointment Cards",
            ],
          },
          {
            title: "Business Website",
            points: [
              "UX Research & Competitor Analysis",
              "Design System, UI Design & Prototyping",
              "Responsive Wireframe Design (Mobile, Tablet & Desktop)",
              "5–10 Page Responsive Website",
              "ADA / WCAG Ready",
              "Services & Treatment Pages",
              "Doctor & Staff Profiles",
              "Patient Reviews & Before/After Gallery",
            ],
          },
          {
            title: "Local SEO & Lead Generation",
            points: [
              "Local SEO & Google Business Profile",
              "Call & Google Maps Setup",
              "Appointment Request Forms",
            ],
          },
          {
            title: "Hosting & Security",
            points: [
              "Domain, Hosting & Email (First Year)",
              "SSL Certificate & Daily Backups",
            ],
          },
        ],
        note: { label: "FREE", text: "30 days of post-launch support" },
      },
      {
        phase: "Phase 2",
        title: "Patient Engagement Platform",
        description:
          "A fuller schedule and fewer no-shows. Patients book, check in, and pay online, HIPAA-ready from day one.",
        icon: "users",
        features: [
          {
            title: "Online Booking & Intake",
            points: [
              "24/7 Online Appointment Booking",
              "Digital Patient Intake & Consent Forms",
              "Pre-Visit Insurance Information Collection",
              "Live Chat Support",
            ],
          },
          {
            title: "Secure Patient Portal",
            points: [
              "Secure Patient Login",
              "Test Result & Document Sharing",
              "Prescription Refill Requests",
              "Secure Online Payments",
            ],
          },
          {
            title: "Appointment Reminders & Communication",
            points: [
              "Automated SMS & Email Reminders",
              "Recall & Follow-Up Reminders",
              "Secure Patient–Doctor Messages",
            ],
          },
          {
            title: "Grow Your Practice",
            points: [
              "Automated Patient Review Requests",
              "Patient Follow-Up Campaigns",
              "Targeted SEO Strategy",
            ],
          },
        ],
        note: { label: "FREE", text: "60 days of support + front-desk training session" },
      },
      {
        phase: "Phase 3",
        title: "Smart Practice Management",
        description:
          "Everything in Phases 1 & 2, plus your own custom practice management system. No per-provider subscriptions, ever.",
        icon: "layers",
        features: [
          {
            title: "Patient Records & Care",
            points: [
              "Patient Records & Medical History",
              "Chronic Care Follow-Ups",
              "Treatment Plans & Progress Tracking",
              "Automated Tasks & Workflows",
              "Medication & Allergy Management",
            ],
          },
          {
            title: "Scheduling & Billing",
            points: [
              "Multi-Doctor & Multi-Location Calendar",
              "QuickBooks Integration",
              "Insurance Claims & Billing Management",
            ],
          },
          {
            title: "Reports & AI",
            points: [
              "Revenue & Payment Analytics Dashboard",
              "AI-Powered Patient Summaries & Insights",
              "Appointment & No-Show Reports",
            ],
          },
          {
            title: "Team & Staff Management",
            points: [
              "Doctor & Staff Portal",
              "Activity & Communication Logs",
              "Role-Based Access & Permissions",
            ],
          },
          {
            title: "Security & Growth",
            points: [
              "HIPAA-Ready Secure System",
              "SEO & Content Strategy",
              "Two-Factor Authentication",
              "Audit Logs & Access Tracking",
            ],
          },
        ],
        note: { label: "FREE", text: "90 days of support + staff training session" },
      },
    ],
  },
  {
    title: "Plumbers, Electricians, Technicians & Other Repair Vendor",
    theme: "olive",
    description: "Digital tools to attract local customers, get more bookings, and grow your business.",
    image: {
      src: assets.industryPlumberShowcase,
      width: 457,
      height: 530,
      alt: "Technician repairing the wiring of an electronic unit with a screwdriver",
    },
    qr: {
      src: assets.industryPlumberQr,
      width: 75,
      height: 72,
      alt: "QR code: scan to explore our field service solutions",
      caption: { title: "Scan to explore", text: "Our Field Service Solutions" },
    },
    action: { label: "Contact for Price", href: "/contact" },
    phases: [
      {
        phase: "Phase 1",
        title: "Business Launch",
        description: 'A professional brand and website that turns "near me" searches into phone calls.',
        icon: "monitor",
        features: [
          {
            title: "Brand & Identity",
            points: [
              "Logo & Brand Guide",
              "Business Cards, Truck & Uniform Design",
              "Estimate & Proposal Templates",
            ],
          },
          {
            title: "Business Website",
            points: [
              "UX Research & Competitor Analysis",
              "Design System, UI Design & Prototyping",
              "Responsive Wireframe Design (Mobile, Tablet & Desktop)",
              "5–10 Page Responsive Website",
              "Service & Service Area Pages",
              "Project Before/After Gallery",
              "Customer Reviews & Testimonials",
              "License, Insurance & Certification Badges",
            ],
          },
          {
            title: "Local SEO & Lead Generation",
            points: [
              "Local SEO & Google Business Profile",
              "Call & Google Maps Setup",
              "Free Estimate Forms",
            ],
          },
          {
            title: "Hosting & Security",
            points: [
              "Domain, Hosting & Email (First Year)",
              "SSL & Daily Backups",
            ],
          },
        ],
        note: { label: "FREE", text: "30 days of post-launch support" },
      },
      {
        phase: "Phase 2",
        title: "Customer & Job Platform",
        description:
          "Never lose a job to a missed call. Customers book, approve quotes, and pay online day or night.",
        icon: "users",
        features: [
          {
            title: "Booking & Estimates",
            points: [
              "24/7 Online Booking & Emergency Service Requests",
              "Instant Estimates & Quote Requests",
              "Online Quote Approval & E-Signature",
              "Live Chat Support",
            ],
          },
          {
            title: "Customer Portal",
            points: [
              "Job Tracking & Project Status Updates",
              "Photo & Document Sharing",
              "Project Milestone Tracking",
              "Invoices & Secure Online Payments",
            ],
          },
          {
            title: "Communication & Notifications",
            points: [
              "Automated SMS & Email Job Alerts",
              "Real-Time Technician Arrival Notifications",
              "Service & Maintenance Reminders",
            ],
          },
          {
            title: "Customer Retention & Growth",
            points: [
              "Automated Customer Review Requests",
              "Targeted Local SEO Strategy",
            ],
          },
        ],
        note: { label: "FREE", text: "60 days of support + staff training session" },
      },
      {
        phase: "Phase 3",
        title: "Smart Field & Project Management",
        description:
          "Everything in Phases 1 & 2, plus your own custom system to run jobs, crews, and projects. No per-technician subscriptions, ever.",
        icon: "layers",
        features: [
          {
            title: "Jobs & Projects",
            points: [
              "Customer & Job History",
              "Project Tasks & Daily Logs",
              "Automated Workflows",
              "Scheduling & Technician Dispatch",
              "Change Orders & Approvals",
            ],
          },
          {
            title: "Estimates, Billing & Inventory",
            points: [
              "Estimates, Invoices & Payments",
              "QuickBooks Integration",
              "Parts & Material Tracking",
            ],
          },
          {
            title: "Reports & AI",
            points: [
              "Revenue & Job Profitability Dashboard",
              "Crew & Technician Performance Reports",
              "AI-Powered Job Summaries & Insights",
            ],
          },
          {
            title: "Team & Subcontractors",
            points: [
              "Staff & Subcontractor Portal",
              "Time Tracking & Timesheets",
              "Role-Based Access & Permissions",
            ],
          },
          {
            title: "Security & Growth",
            points: [
              "Data Encryption & Two-Factor Authentication",
              "SEO & Content Strategy",
              "Activity Logs",
            ],
          },
        ],
        note: { label: "FREE", text: "90 days of support + staff training session" },
      },
    ],
  },
  {
    title: "Restaurant & Food Brand",
    theme: "rust",
    description: "Reach more diners, boost online orders, and build a stronger food brand.",
    image: {
      src: assets.industryRestaurant,
      width: 457,
      height: 530,
      alt: "Smiling chef in a white chef's hat in a restaurant dining room",
    },
    qr: {
      src: assets.industryRestaurantQr,
      width: 72,
      height: 72,
      alt: "QR code: scan to explore our restaurant solutions",
      caption: { title: "Scan to explore", text: "Our Restaurant Solutions" },
    },
    action: { label: "Contact for Price", href: "/contact" },
    // Phase 2 and 3 accordion titles are as drawn; the design repeats the healthcare titles there,
    // so they are expected to change with this industry's own feature list.
    phases: [
      {
        phase: "Phase 1",
        title: "Restaurant Launch",
        description:
          "Build a professional brand and website that attracts local diners and brings more customers through your doors.",
        icon: "monitor",
        features: [
          { title: "Brand & Identity", points: [] },
          { title: "Business Website", points: [] },
          { title: "Local SEO & Lead Generation", points: [] },
          { title: "Hosting & Security", points: [] },
        ],
        note: { label: "FREE", text: "30 days of post-launch support" },
      },
      {
        phase: "Phase 2",
        title: "Online Ordering Platform",
        description:
          "Let customers explore your menu, place orders, reserve tables, and pay online anytime.",
        icon: "users",
        features: [
          { title: "Online Booking & Intake", points: [] },
          { title: "Secure Patient Portal", points: [] },
          { title: "Appointment Reminders & Communication", points: [] },
          { title: "Grow Your Practice", points: [] },
        ],
        note: { label: "FREE", text: "60 days of support + staff training session" },
      },
      {
        phase: "Phase 3",
        title: "Smart Commerce Management",
        description:
          "Everything in Phases 1 & 2, plus your own custom system to manage orders, inventory, staff, and daily operations.",
        icon: "layers",
        features: [
          { title: "Patient Records & Care", points: [] },
          { title: "Scheduling & Billing", points: [] },
          { title: "Reports & AI", points: [] },
          { title: "Team & Staff Management", points: [] },
          { title: "Security & Growth", points: [] },
        ],
        note: { label: "FREE", text: "90 days of support + staff training session" },
      },
    ],
  },
];
