// ============================================================================
// PORTFOLIO CONFIGURATION — Edit this file to update all personal details
// ============================================================================

export const portfolio = {
  // ── Personal Info ──────────────────────────────────────────────────────
  name: "Prem Thorat",
  initials: "PT",
  title: "Aspiring AI Engineer",
  tagline: "Curiosity into code. Ideas into intelligent systems.",
  description:
    "I'm a second-year Computer Science student at VIT Pune, exploring artificial intelligence, computer vision, programming, and practical engineering through hands-on projects.",

  // ── About ──────────────────────────────────────────────────────────────
  about:
    "I'm Prem Thorat, a second-year B.Tech Computer Science student specializing in AI and Machine Learning at Vishwakarma Institute of Technology, Pune. I enjoy coding, solving problems, exploring new technologies, and turning ideas into practical projects. I'm particularly interested in computer vision, intelligent systems, and the intersection of software and real-world engineering.",

  // ── Portrait ───────────────────────────────────────────────────────────
  portrait: "/images/prem-profile.webp",
  portraitAlt: "Prem Thorat — B.Tech CSE student specializing in AI and ML at VIT Pune",

  // ── Education ──────────────────────────────────────────────────────────
  education: {
    institution: "Vishwakarma Institute of Technology",
    location: "Pune, Maharashtra, India",
    degree: "B.Tech — Computer Science and Engineering",
    specialization: "Artificial Intelligence and Machine Learning",
    year: "Second Year",
    // Do NOT add GPA, grades, or graduation year unless Prem provides them
  },

  // ── Skills ─────────────────────────────────────────────────────────────
  skills: {
    programming: [
      { name: "Python", description: "General-purpose programming, scripting, and AI/ML development" },
      { name: "Java", description: "Object-oriented programming and application development" },
      { name: "C", description: "Systems programming and foundational computer science" },
    ],
    web: [
      { name: "HTML", description: "Web page structure and semantic markup" },
    ],
    computerVision: [
      { name: "OpenCV", description: "Computer vision library for image and video processing" },
    ],
    professional: [
      { name: "Communication", description: "Clear and effective technical and interpersonal communication" },
      { name: "Leadership", description: "Team coordination and project management" },
    ],
  },

  // ── Projects ───────────────────────────────────────────────────────────
  projects: [
    {
      id: "smart-monitoring-system",
      number: "01",
      title: "Smart Monitoring System",
      category: "Computer Vision",
      overview:
        "A monitoring system that leverages computer vision technology for intelligent observation and analysis.",
      // Editable fields — fill in when details are available
      problem: "",
      solution: "",
      technologies: [],
      components: [],
      contribution: "",
      implementation: "",
      screenshots: [],
      githubUrl: "",
      demoUrl: "",
    },
    {
      id: "line-following-vehicle",
      number: "02",
      title: "Line Following Vehicle",
      category: "Robotics",
      overview:
        "A robotic vehicle designed to autonomously follow a predefined path using sensor-based guidance.",
      // Editable fields — fill in when details are available
      design: "",
      components: [],
      sensors: "",
      controller: "",
      algorithm: "",
      contribution: "",
      media: [],
      githubUrl: "",
      details: "",
    },
  ],

  // ── Contact ────────────────────────────────────────────────────────────
  contact: {
    headline: "Have an idea worth building?",
    description:
      "I'm always interested in exploring technology, solving problems, and building meaningful projects.",
    email: "premthorat612@gmail.com",
    linkedin: "https://linkedin.com/in/prem-thorat-20a405386",
    github: "", // Hidden until a real URL is provided
  },

  // ── SEO ────────────────────────────────────────────────────────────────
  seo: {
    title: "Prem Thorat | Aspiring AI Engineer",
    description:
      "Portfolio of Prem Thorat — a B.Tech Computer Science student at VIT Pune specializing in AI, Machine Learning, Computer Vision, and Robotics.",
    url: "", // Set when deployed
  },

  // ── Navigation ─────────────────────────────────────────────────────────
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Engineering Lab", href: "#lab" },
    { label: "Contact", href: "#contact" },
  ],

  // ── Interests for Learning Section ─────────────────────────────────────
  interests: [
    { name: "Programming", icon: "code", description: "Building software and solving algorithmic challenges" },
    { name: "Problem-Solving", icon: "brain", description: "Analytical thinking and creative solutions" },
    { name: "Computer Vision", icon: "eye", description: "Teaching machines to see and interpret visual data" },
    { name: "AI & Machine Learning", icon: "cpu", description: "Exploring intelligent systems and data-driven models" },
    { name: "Robotics", icon: "bot", description: "Bridging software with real-world mechanical systems" },
    { name: "Future Experiments", icon: "flask", description: "Always exploring the next frontier of technology" },
  ],
} as const;

export type Portfolio = typeof portfolio;
