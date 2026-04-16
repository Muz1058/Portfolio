export const projects = [
  {
    id: 1,
    title: "Horizon Notifier — Chrome Extension",
    category: "Personal",
    tags: ["Live on Chrome Web Store"],
    description: "A Chrome extension that aggregates UCP student portal updates (announcements, grades, submissions) into a real-time dashboard panel.",
    highlights: [
      "Dual-mode scan architecture (full scan + per-course background scan)",
      "Multi-user identity detection via student registration numbers",
      "Zero external server dependency — all local with real-time badge updates"
    ],
    tech: ["JavaScript", "Chrome Extensions API (MV3)", "Content Scripts", "Service Workers"],
    liveUrl: "https://chrome.google.com/webstore/detail/kjdmbocinichinalcokbjingeoonkbkb",
    githubUrl: "https://github.com/muz1058",
    impactMetric: "Zero external server dependency — all local with real-time badge updates"
  },
  {
    id: 2,
    title: "Admissions Management System",
    category: "Professional",
    tags: ["Government of Punjab"],
    description: "A dynamic admissions portal for educational institutions with online applications, document verification, and merit list generation.",
    highlights: [
      "RESTful API integration between Angular frontend and .NET Core backend",
      "Real-time notifications and email alerts",
      "Encrypted storage and institutional data compliance"
    ],
    tech: ["ASP.NET Core", "Angular", "RESTful APIs", "SQL Server"],
    liveUrl: null,
    githubUrl: null,
    impactMetric: "Served thousands of government users"
  },
  {
    id: 3,
    title: "CHI — Vendor & Applicant Management",
    category: "Professional",
    tags: ["Government of Punjab"],
    description: "Comprehensive system managing adhoc job applications for Community Health Inspector roles — document submission, scrutiny, tracking.",
    highlights: [
      "Role-based authentication for admins and reviewers",
      "Scalable EF + SQL Server queries under high application volumes"
    ],
    tech: ["ASP.NET Core", "Entity Framework Core", "SQL Server"],
    liveUrl: null,
    githubUrl: null,
    impactMetric: "Scalable queries under high load"
  },
  {
    id: 4,
    title: "HSPP — Hospital Staff on Special Packages",
    category: "Professional",
    tags: ["Government of Punjab"],
    description: "Management system for hospital staff benefits and special package allocations for the provincial health department.",
    highlights: [
      "Normalized DB schemas for eligibility and allocation criteria",
      "HR reporting dashboards for department heads"
    ],
    tech: ["ASP.NET Core", "Entity Framework Core", "SQL Server"],
    liveUrl: null,
    githubUrl: null,
    impactMetric: "Provincial health department HR reporting"
  },
  {
    id: 5,
    title: "YouTube Clone Backend",
    category: "Academic",
    tags: ["UCP"],
    description: "RESTful APIs for a YouTube-style platform — user management, video uploads, comments, auth middleware.",
    highlights: [],
    tech: ["Node.js", "Express.js", "MongoDB"],
    liveUrl: null,
    githubUrl: null,
    impactMetric: "RESTful APIs with auth middleware"
  },
  {
    id: 6,
    title: "Smart Parking System with Analytics",
    category: "Academic",
    tags: ["UCP"],
    description: "Real-time parking management with VIP prioritization and analytics dashboard.",
    highlights: [
      "40% improvement in vehicle lookup time via optimized data structures",
      "Circular Queue, HashMap, LinkedList implementation"
    ],
    tech: ["Java", "Data Structures", "Swing"],
    liveUrl: null,
    githubUrl: null,
    impactMetric: "40% faster vehicle lookup"
  },
  {
    id: 7,
    title: "School Principal Management App",
    category: "Personal",
    tags: ["Full-Stack", "Live Deployment"],
    description: "A comprehensive web application designed for school administration, enabling principals and staff to manage administrative workflows efficiently.",
    highlights: [
      "Responsive user interface deployed on Vercel",
      "Robust backend integration using Supabase architecture"
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    liveUrl: "https://school-principal.vercel.app",
    githubUrl: "https://github.com/Muz1058/SchoolPrincipal",
    impactMetric: "Live full-stack application"
  }
];
