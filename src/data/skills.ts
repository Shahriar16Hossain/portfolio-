export interface SkillCategory {
  title: string;
  tagline: string;
  icon: string;
  color: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    description: string;
    tags: string[];
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Product & Interaction Design",
    tagline: "Human-centered systems, spatial architectures, and behavioral micro-interactions.",
    icon: "Layout",
    color: "#00f2fe",
    skills: [
      {
        name: "Design Systems & Token Architecture",
        level: 96,
        description: "Multi-platform semantic tokens, component lifecycles, cross-squad governance, automated Figma-to-code pipelines.",
        tags: ["Design Tokens", "Style Dictionary", "Component Libraries", "WCAG AAA"]
      },
      {
        name: "High-Fidelity Prototyping & Motion",
        level: 94,
        description: "Kinetic UI, physics-based springs, gestural micro-interactions, realistic data-driven interactive states.",
        tags: ["Framer", "Principle", "Figma Advanced Prototyping", "Spring Curves"]
      },
      {
        name: "User Research & Information Architecture",
        level: 90,
        description: "Ethnographic research, tree testing, journey mapping, usability benchmarking, cognitive load reduction.",
        tags: ["Usability Testing", "Mental Models", "Card Sorting", "Metrics & Heuristics"]
      },
      {
        name: "Spatial & Ambient Interface Design",
        level: 86,
        description: "VisionOS/WebXR spatial layout, gaze-pinch target tolerances, depth hierarchies, frosted translucent materiality.",
        tags: ["Spatial UI", "VisionOS", "Ergonomics", "Depth Layers"]
      }
    ]
  },
  {
    title: "Creative Technology & Frontend",
    tagline: "Translating complex design concepts into high-performance production code.",
    icon: "Cpu",
    color: "#a855f7",
    skills: [
      {
        name: "React, Next.js & TypeScript",
        level: 95,
        description: "Component architecture, App Router, state machines, performant rendering, custom hooks, type safety.",
        tags: ["Next.js 16", "React 19", "TypeScript", "State Management"]
      },
      {
        name: "Creative WebGL, Three.js & Shaders",
        level: 84,
        description: "GPU particle systems, fragment/vertex shaders, interactive 3D scenes, physics simulations, canvas rendering.",
        tags: ["Three.js", "GLSL", "React Three Fiber", "Physics Engines"]
      },
      {
        name: "Tailwind CSS & Modern CSS Engines",
        level: 98,
        description: "Tailwind v4, CSS variables, subgrid, container queries, CSS animations, micro-performance optimization.",
        tags: ["Tailwind v4", "CSS Grid", "Container Queries", "Hardware Acceleration"]
      },
      {
        name: "Web Audio & Synthesized Feedback",
        level: 82,
        description: "Web Audio API sound synthesis, procedural audio feedback, frequency visualizers, sound design for software.",
        tags: ["Web Audio API", "Sound Design", "Oscillators", "Audio Reactive UI"]
      }
    ]
  },
  {
    title: "AI, Tools & Workflow",
    tagline: "Leveraging cutting-edge generative tools and engineering infrastructure.",
    icon: "Terminal",
    color: "#10b981",
    skills: [
      {
        name: "Figma & Design Tooling Ecosystem",
        level: 98,
        description: "Variables, component sets, auto-layout 5.0, plugin development, REST API integrations.",
        tags: ["Figma Plugins", "Design Tokens", "Auto Layout", "Design Linting"]
      },
      {
        name: "Generative AI & Agent Interface Design",
        level: 91,
        description: "Designing prompt-to-UI interfaces, generative canvas workflows, contextual AI copilots, streaming responses.",
        tags: ["Generative UI", "AI Copilots", "LLM UX Patterns", "Agent Workflows"]
      },
      {
        name: "Engineering Tooling & Version Control",
        level: 89,
        description: "Git, GitHub CI/CD, Vite, Turbopack, npm/pnpm, Storybook, Jest/Playwright testing.",
        tags: ["Git", "GitHub Actions", "Turbopack", "Storybook", "CI/CD"]
      }
    ]
  }
];

