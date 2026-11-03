export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "Design Systems" | "Spatial & 3D" | "AI & Generative" | "FinTech & Data";
  role: string;
  period: string;
  featured: boolean;
  color: string;
  accentGradient: string;
  summary: string;
  problem: string;
  solution: string;
  metrics: { label: string; value: string }[];
  deliverables: string[];
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  wireframes: string[];
}

export const projectsData: Project[] = [
  {
    id: "aether-system",
    title: "Aether Multi-Platform Design System",
    tagline: "Unifying 4 platform suites under tokenized, accessible design architecture.",
    category: "Design Systems",
    role: "Lead Systems Designer & Architect",
    period: "2024",
    featured: true,
    color: "#00f2fe",
    accentGradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    summary: "A robust design token pipeline bridging Figma variables directly to CSS/Tailwind variables and iOS Swift tokens, driving consistency and cutting engineer handoff time in half.",
    problem: "Disjointed UI components across web, desktop, and mobile caused severe drift, 4x duplicate work, accessibility regressions, and fragmented branding across four product squads.",
    solution: "Engineered a single-source-of-truth token architecture using Style Dictionary and Figma REST API. Created 40+ atomic components with rigorous WCAG AAA compliance, high-contrast states, and automated visual regression testing.",
    metrics: [
      { label: "Design-to-Code Velocity", value: "+54%" },
      { label: "Token Parity", value: "100%" },
      { label: "Components Built", value: "85+" },
      { label: "Accessibility Score", value: "100/100" }
    ],
    deliverables: [
      "Figma Component Library (Variants, Auto-layout 5.0, Component Properties)",
      "Automated Token Sync CI/CD Pipeline",
      "Interactive Documentation & Sandbox Portal",
      "Comprehensive Accessibility Guidelines & Testing Matrix"
    ],
    techStack: ["Figma Tokens", "Tailwind CSS", "TypeScript", "React", "Storybook", "Style Dictionary"],
    wireframes: [
      "Token Architecture Diagram (Global -> Semantic -> Component)",
      "Adaptive Color Palette with APCA Contrast Ratios",
      "Cross-platform component states (Hover, Focus, Pressed, Disabled)"
    ]
  },
  {
    id: "neuroflow-ai",
    title: "NeuroFlow Generative AI Canvas",
    tagline: "Spatial node-based canvas for multimodal prompt choreography and agent orchestration.",
    category: "AI & Generative",
    role: "Principal Product Designer & Prototyper",
    period: "2024",
    featured: true,
    color: "#a855f7",
    accentGradient: "from-purple-500/20 via-fuchsia-500/10 to-transparent",
    summary: "Moving beyond chat boxes: a visual node-graph canvas where designers and engineers construct, debug, and chain multimodal generative AI workflows in real time.",
    problem: "Linear chatbot threads fail when users orchestrate complex multi-step generative tasks (image prompt -> text refinement -> video synthesis -> formatting). Users lost context and couldn't branch ideas.",
    solution: "Designed an infinite spatial canvas with magnetic snap nodes, real-time token stream visualization, latency indicators, and interactive branch forks. Prototyped key gesture interactions in React Flow & WebGL.",
    metrics: [
      { label: "Workflow Efficiency", value: "+3.2x" },
      { label: "User Retention", value: "78%" },
      { label: "Prototyped & Tested", value: "14 Days" },
      { label: "Community Stars", value: "2.4k" }
    ],
    deliverables: [
      "End-to-end UX architecture and wireflows",
      "Custom node design system with status animations",
      "Interactive code prototype with real AI stream simulation",
      "User research interviews with 24 creative directors"
    ],
    techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Canvas API", "Figma"],
    wireframes: [
      "Infinite Canvas Navigation (Minimap, Zoom-to-fit, Spatial Clustering)",
      "Multimodal Node Types (Text, Vision, Code, Audio)",
      "Real-time Token Generation Visualizer"
    ]
  },
  {
    id: "vortex-spatial",
    title: "Vortex Spatial OS & Vision Interface",
    tagline: "Exploring spatial ergonomics, micro-gestures, and gaze-anchored HUDs.",
    category: "Spatial & 3D",
    role: "Creative Technologist & UI Researcher",
    period: "2023 - 2024",
    featured: true,
    color: "#06b6d4",
    accentGradient: "from-cyan-500/20 via-emerald-500/10 to-transparent",
    summary: "A conceptual spatial operating system interface prototype exploring gaze-pinch interaction mechanics, translucent frosted materials, and depth hierarchy.",
    problem: "Traditional 2D flat design fails in 3D stereoscopic space—flat UI panels block users' peripheral vision and cause optical fatigue when not anchored to human ergonomic cones.",
    solution: "Developed an ergonomic depth hierarchy model where primary tasks float within 45cm comfortable reach and ambient status badges rest in peripheral orbital planes. Implemented dynamic glass blur shaders that adapt to scene brightness.",
    metrics: [
      { label: "Eye Fatigue Reduction", value: "42%" },
      { label: "Target Acquisition Speed", value: "180ms" },
      { label: "Tested Spatial FOV", value: "110 deg" },
      { label: "Shader Frame Rate", value: "90 FPS" }
    ],
    deliverables: [
      "Spatial Ergonomic Guidelines Document",
      "Custom Three.js / WebXR Prototype",
      "Glassmorphic Depth Shader System",
      "Gaze-anchor Micro-interaction Library"
    ],
    techStack: ["Three.js", "WebXR", "GLSL Shaders", "React Three Fiber", "Figma Spatial Kit"],
    wireframes: [
      "Ergonomic Visual Cone Geometry",
      "Gaze Hover Glow Shader Logic",
      "Spatial Pinch-to-Expand Interaction Sequence"
    ]
  },
  {
    id: "krypton-terminal",
    title: "Krypton Institutional Trading Terminal",
    tagline: "High-density algorithmic financial dashboard redesign for sub-second decision making.",
    category: "FinTech & Data",
    role: "Senior Product Designer",
    period: "2023",
    featured: false,
    color: "#10b981",
    accentGradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    summary: "Redesigned a high-frequency trading terminal, transforming a cluttered 200-field screen into a clean, customizable modular cockpit with customizable keybindings.",
    problem: "Institutional traders suffered visual fatigue and critical mis-clicks due to overcrowded tabular data and non-standardized alert colors.",
    solution: "Engineered a dark-mode-first modular widget grid with drag-and-drop dockable panels, micro-sparkline visualizations, and tactile audio-visual confirmation states.",
    metrics: [
      { label: "Order Execution Errors", value: "-68%" },
      { label: "Cognitive Load Score", value: "-35%" },
      { label: "Daily Active Time", value: "6.8 hrs" },
      { label: "Data Throughput", value: "10k ticks/sec" }
    ],
    deliverables: [
      "Modular dashboard grid system with lockable layouts",
      "Data density toggle (Compact, Comfortable, Glanceable)",
      "Audio-tactile notification sound profile",
      "Comprehensive keyboard shortcut HUD"
    ],
    techStack: ["Figma", "Design Tokens", "React", "Chart.js", "Tailwind CSS"],
    wireframes: [
      "Modular 12-column widget snap framework",
      "Order book depth visualizer architecture",
      "Instant hotkey overlay drawer"
    ]
  },
  {
    id: "chronos-synth",
    title: "Chronos Audio-Reactive 3D Canvas",
    tagline: "Interactive WebGL sound visualizer and procedural generative audio synthesizer.",
    category: "Spatial & 3D",
    role: "Creative Technologist",
    period: "2023",
    featured: false,
    color: "#f59e0b",
    accentGradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    summary: "An interactive browser-based synthesizer where users manipulate 3D geometric meshes with mouse physics to generate harmonious ambient chord progressions and resonant soundscapes.",
    problem: "Music creation software (DAWs) has steep learning curves and sterile technical interfaces that intimidate visual thinkers.",
    solution: "Designed a synesthetic interface mapping spatial coordinates to pentatonic frequencies and particle bloom effects, letting anyone compose ambient music by drawing in 3D.",
    metrics: [
      { label: "Average Session Duration", value: "8.4 min" },
      { label: "Unique Compositions Made", value: "32,000+" },
      { label: "Browser Compatibility", value: "99.4%" },
      { label: "Audio Latency", value: "<12ms" }
    ],
    deliverables: [
      "Web Audio API Sound Engine (synthesized chords, reverb, delay)",
      "Interactive Three.js particle geometry with spring physics",
      "Responsive touch & mouse interaction mechanics"
    ],
    techStack: ["Web Audio API", "Three.js", "GLSL Shaders", "TypeScript", "Canvas"],
    wireframes: [
      "Synesthetic frequency-to-color mapping chart",
      "Harmonic node proximity mesh layout",
      "Touch gesture pitch-bend curve"
    ]
  },
  {
    id: "prism-shader",
    title: "Prism Visual Shader Composer",
    tagline: "Empowering visual designers to create custom GPU shaders without writing raw math.",
    category: "AI & Generative",
    role: "Lead Product Designer & Tech Researcher",
    period: "2022 - 2023",
    featured: false,
    color: "#ec4899",
    accentGradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    summary: "A sleek visual node composer translating intuitive artistic controls (liquid ripples, refraction, chromatic aberration) into production-ready WebGL GLSL shader code.",
    problem: "Visual designers want cutting-edge WebGL textures on marketing sites, but the barrier of matrix mathematics and GLSL syntax is insurmountable without specialized graphics engineers.",
    solution: "Created an intuitive UI with visual preview thumbnails on every node, instant export to React/Three.js code, and curated preset templates.",
    metrics: [
      { label: "Time to Shader Export", value: "5 mins vs 2 days" },
      { label: "Community Shaders Shared", value: "1,800+" },
      { label: "NPS Rating", value: "+74" }
    ],
    deliverables: [
      "Intuitive node graph interface design",
      "Real-time WebGL shader compiler pipeline",
      "One-click code exporter (Vanilla, Three.js, React Three Fiber)"
    ],
    techStack: ["WebGL", "GLSL", "React", "TypeScript", "Tailwind CSS"],
    wireframes: [
      "Visual Node Port Logic & Type Validation",
      "Live Viewport Shader Render Loop",
      "Export Modal with syntax highlighting"
    ]
  }
];

