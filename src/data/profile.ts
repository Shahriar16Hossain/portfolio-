export interface Profile {
  name: string;
  handle: string;
  role: string;
  subTitle: string;
  location: string;
  availability: string;
  status: string;
  bio: string[];
  philosophies: {
    title: string;
    description: string;
    icon: string;
  }[];
  experience: {
    year: string;
    role: string;
    company: string;
    description: string;
    highlights: string[];
  }[];
  socials: {
    name: string;
    url: string;
    handle: string;
    icon: string;
  }[];
  stats: {
    label: string;
    value: string;
    detail: string;
  }[];
}

export const profileData: Profile = {
  name: "Shahriar Hossain",
  handle: "shahriar",
  role: "Product Designer & Creative Technologist",
  subTitle: "Architecting tactile digital experiences, design systems, and generative human-computer interfaces.",
  location: "Global / Remote",
  availability: "Open to High-Impact Roles & Advisory",
  status: "ONLINE - SYSTEM v4.2 OPERATIONAL",
  bio: [
    "I operate at the convergence of high-craft product design, systems thinking, and interactive creative engineering.",
    "With a deep background in designing complex multi-platform interfaces and building functional prototypes directly in code (React, Next.js, WebGL), I bridge the communication chasm between design vision and production software.",
    "My focus is crafting spatial interfaces, generative AI canvases, scalable design systems, and delightful micro-interactions that make software feel alive, responsive, and humane."
  ],
  philosophies: [
    {
      title: "Tactile Digital Craft",
      description: "Digital tools should feel as tangible and satisfying as physical hardware. Every transition, velocity curve, and click feedback is intentional.",
      icon: "Sparkles"
    },
    {
      title: "Design Through Code",
      description: "Code isn't just an implementation detail; it's a creative medium. Prototyping with live data and real physics solves UX problems before engineering ever begins.",
      icon: "Code"
    },
    {
      title: "Algorithmic Precision",
      description: "Scalable design tokens, math-driven typography scales, and modular component architectures turn design into an engine of continuous product velocity.",
      icon: "Layers"
    }
  ],
  experience: [
    {
      year: "2024 — PRESENT",
      role: "Lead Product Designer & Creative Technologist",
      company: "Aether Dynamics & Stealth Ventures",
      description: "Leading zero-to-one product design for AI-native productivity environments and interactive WebGL experiences.",
      highlights: [
        "Architected an adaptive design system deployed across web, desktop, and mobile platforms.",
        "Engineered real-time interactive prototypes in Next.js & Three.js to validate spatial UI paradigms.",
        "Increased user task completion velocity by 38% through contextual predictive micro-interactions."
      ]
    },
    {
      year: "2022 — 2024",
      role: "Senior Product & Interaction Designer",
      company: "Nexus Labs",
      description: "Designed core enterprise dashboards, data visualization suites, and developer-centric workflows.",
      highlights: [
        "Spearheaded multi-brand token system used by 60+ engineers and designers across 4 global teams.",
        "Reduced cognitive load on complex financial data streams using hierarchical glanceable visualization.",
        "Authored interactive guidelines, design tokens schema, and Figma auto-layout best practices."
      ]
    },
    {
      year: "2020 — 2022",
      role: "UI/UX Designer & Creative Frontend Developer",
      company: "Hyperion Digital Studio",
      description: "Crafted award-winning interactive websites, 3D brand experiences, and consumer applications.",
      highlights: [
        "Designed and shipped 15+ bespoke client platforms with fluid animations and responsive physics.",
        "Collaborated closely with executive stakeholders from concept wireframes to production deployment."
      ]
    }
  ],
  stats: [
    { label: "Design Systems Built", value: "8+", detail: "Multi-brand, tokenized architectures" },
    { label: "Years Experience", value: "6+", detail: "At the intersection of design & tech" },
    { label: "Production Components", value: "350+", detail: "Accessible, WCAG compliant" },
    { label: "Client Satisfaction", value: "100%", detail: "Shipped on schedule & polished" }
  ],
  socials: [
    { name: "GitHub", url: "https://github.com", handle: "@shahriarhossain", icon: "Github" },
    { name: "LinkedIn", url: "https://linkedin.com", handle: "shahriarhossain", icon: "Linkedin" },
    { name: "Twitter / X", url: "https://x.com", handle: "@shahriar_design", icon: "Twitter" },
    { name: "Dribbble", url: "https://dribbble.com", handle: "shahriarhossain", icon: "Dribbble" },
    { name: "Email", url: "mailto:contact@shahriarhossain.com", handle: "contact@shahriarhossain.com", icon: "Mail" }
  ]
};

