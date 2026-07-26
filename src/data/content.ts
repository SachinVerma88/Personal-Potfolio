export interface Project {
  id: string;
  name: string;
  tagline: string;
  role: string;
  teamSize: string;
  overview: string;
  contributions: string[];
  techStack: string[];
  heroVideo?: string;
  heroImage?: string;
  demoUrl?: string;
  githubUrl?: string;
  challenges: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client?: string;
  problem: string;
  challenges: string;
  solution: string;
  lessonsLearned: string;
  tools: string[];
  metrics: string;
}

export interface Service {
  id: string;
  title: string;
  outcome: string;
  iconName: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  tags: string[];
  url?: string;
}

export interface OpenSourceRepo {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  stars?: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar?: string;
}

export interface WhatIBringPillar {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const SITE_DATA = {
  identity: {
    name: "Sachin Verma",
    role: "Full Stack & AI Engineer",
    company: "TogetherVSolve Solutions",
    tagline: "Building production software for businesses.",
    headline: "Full Stack & AI Engineer",
    subhead: "Full Stack & AI Engineer at TogetherVSolve Solutions. Building production SaaS platforms, enterprise backend systems, custom e-commerce engines, and AI deployment tools — From idea → production.",
    location: "India • Open to Global Remote & Contract Work",
    statusBadge: "Full Stack & AI Engineer @ TogetherVSolve Solutions",
    email: "s.verma8846@gmail.com",
    github: "https://github.com/SachinVerma88",
    linkedin: "https://www.linkedin.com/in/sachin-verma-444790188/",
    resumeUrl: "#", // TODO: Add link to downloadable resume PDF
    primaryCTA: { label: "Let's Work Together", href: "/#contact" },
    secondaryCTA: { label: "View Professional Work", href: "#work" },
    experienceSummary: "Previously worked as a Full Stack Developer Intern, where I contributed to multiple production-grade software products. After transitioning to a full-time role at TogetherVSolve Solutions, I expanded my responsibilities to full-stack ownership, AI integrations, Linux server administration, and production maintenance."
  },

  trustedTechnologies: [
    { name: "Django", category: "Backend" },
    { name: "React.js", category: "Frontend" },
    { name: "Next.js", category: "Framework" },
    { name: "Node.js", category: "Backend" },
    { name: "FastAPI", category: "AI & APIs" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Redis", category: "Infrastructure" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Linux & Nginx", category: "DevOps" },
    { name: "Docker", category: "DevOps" }
  ],

  engineeringHighlights: [
    "Full Stack & AI Engineer at TogetherVSolve Solutions — full-stack ownership, production deployments, AI integrations, and enterprise app development.",
    "Backend Lead → Full Stack Engineer for Sutra, an Enterprise Task Management Platform built from scratch in a core team of three engineers.",
    "Engineered Leepi, an end-to-end custom printing platform managing personalized product orders, inventory, payments, and Shiprocket API shipping workflows.",
    "Built Kyokutoh India's official corporate website focusing on responsive design, performance, SEO optimization, and Google Maps API integration.",
    "Designed and developed an AI Deployment Agent automating Linux server setups, Nginx/Gunicorn configuration, SSL setup, and rollback support.",
    "Hands-on production DevOps: Linux administration, SSH management, PostgreSQL backups/restoration, live application migrations, and server monitoring."
  ],

  whatIBringToATeam: [
    {
      id: "saas-ground-up",
      title: "Production SaaS from Ground Up",
      description: "Proven track record of building production-grade software products from initial MVP phase to full enterprise releases.",
      iconName: "Layers"
    },
    {
      id: "backend-depth",
      title: "Backend Depth & Full Stack Execution",
      description: "Deep expertise in Django, FastAPI, and Node.js REST API architecture combined with fluent React/Next.js frontend development.",
      iconName: "Database"
    },
    {
      id: "feature-ownership",
      title: "End-to-End Feature Ownership",
      description: "Comfortable taking complete ownership of critical features—from initial requirement analysis and API design to production deployment.",
      iconName: "CheckCircle2"
    },
    {
      id: "linux-devops",
      title: "Practical Linux & Production DevOps",
      description: "Hands-on experience managing Linux servers, SSH setups, Nginx/Gunicorn reverse proxies, PostgreSQL backups, and live server migrations.",
      iconName: "Server"
    },
    {
      id: "product-mindset",
      title: "Product-Focused Mindset",
      description: "A pragmatic engineering approach that balances clean code architecture and technical reliability with business goals and deadlines.",
      iconName: "Briefcase"
    },
    {
      id: "continuous-learning",
      title: "Continuous Learner & Problem Solver",
      description: "Quick to adapt to emerging technologies, AI integration patterns, and complex technical challenges in fast-paced production environments.",
      iconName: "Brain"
    }
  ] as WhatIBringPillar[],

  selectedWork: [
    {
      id: "sutra",
      name: "Sutra",
      tagline: "Enterprise Task Management & Workflow Automation Platform",
      role: "Backend Lead → Full Stack Engineer",
      teamSize: "Core Team (3 Engineers)",
      overview: "Sutra is an enterprise task management platform built from scratch. Initially led backend architectural development during early MVP phases, later taking full ownership of both frontend and backend engineering after MVP 2.",
      contributions: [
        "Designed and implemented scalable backend architecture using Django and Django REST Framework.",
        "Built REST APIs supporting task lifecycle management, workflow automation, and real-time collaboration modules.",
        "Developed authentication, authorization, and granular role-based access control (RBAC).",
        "Designed PostgreSQL database schemas, business logic, and Redis caching for optimal query performance.",
        "Developed responsive frontend interfaces using React.js and Next.js after MVP 2.",
        "Managed production deployments and collaborated with the Tech Lead on system architecture discussions."
      ],
      techStack: ["React.js", "Next.js", "Django", "PostgreSQL", "Redis", "Tailwind CSS"],
      demoUrl: "https://sutra.togethervsolve.com/download",
      githubUrl: "https://github.com/SachinVerma88",
      challenges: "Architecting flexible role-based access control (RBAC) and high-concurrency task automation workflows while optimizing complex PostgreSQL queries."
    },
    {
      id: "leepi",
      name: "Leepi",
      tagline: "End-to-End Custom Printing & Order Fulfillment Platform",
      role: "Full Stack Developer",
      teamSize: "Product Engineering Team",
      overview: "Leepi is a production-grade custom printing platform managing personalized product orders, inventory tracking, checkout payment flows, and automated shipping logistics.",
      contributions: [
        "Developed backend REST APIs and business logic for product customization and order processing.",
        "Built customer-facing frontend interfaces for personalized product previews and checkout.",
        "Integrated Shiprocket APIs for automated shipping calculation, tracking, and fulfillment.",
        "Built secure order management modules and optimized backend database performance."
      ],
      techStack: ["React.js", "Next.js", "Django", "PostgreSQL", "Shiprocket API"],
      demoUrl: "https://leepi.in/",
      githubUrl: "https://github.com/SachinVerma88",
      challenges: "Synchronizing multi-step product customization states with backend inventory tracking while maintaining smooth client performance."
    },
    {
      id: "kyokutoh",
      name: "Kyokutoh India",
      tagline: "Official Corporate Website & Location Services Engine",
      role: "Full Stack Developer",
      teamSize: "Core Developer",
      overview: "The official corporate web platform for Kyokutoh India, focusing on responsive design, high performance, maintainable component structure, and location mapping.",
      contributions: [
        "Built modular, reusable frontend components in Next.js and React.",
        "Engineered responsive layouts adapting seamlessly across mobile, tablet, and desktop viewports.",
        "Integrated Google Maps API for location services and distributor search.",
        "Optimized page load performance, structured metadata, and overall SEO score."
      ],
      techStack: ["Next.js", "React.js", "Tailwind CSS", "Google Maps API"],
      demoUrl: "https://kyokutohindia.com/",
      githubUrl: "https://github.com/SachinVerma88",
      challenges: "Optimizing Google Maps client script loading and image assets to achieve top Lighthouse performance scores."
    },
    {
      id: "ai-deployment-agent",
      name: "AI Deployment Agent",
      tagline: "Server Automation & Linux Deployment System",
      role: "Software Engineer",
      teamSize: "Solo Developer",
      overview: "An AI-assisted deployment tool designed to simplify server deployments for Django, FastAPI, Flask, and Node.js applications on Linux infrastructure.",
      contributions: [
        "Automated Linux server provisioning and SSH-based deployment scripts.",
        "Built automated Nginx reverse proxy configuration and Gunicorn service management.",
        "Managed SSL certificate setup via Certbot and automated environment configuration.",
        "Implemented deployment verification checks and rollback support to reduce manual effort."
      ],
      techStack: ["Python", "FastAPI", "Linux", "Nginx", "Gunicorn", "Docker"],
      demoUrl: "https://github.com/SachinVerma88",
      githubUrl: "https://github.com/SachinVerma88",
      challenges: "Managing OS-level permissions and multi-framework entrypoint variations (WSGI vs ASGI) in zero-downtime deployment scripts."
    }
  ] as Project[],

  caseStudies: [
    {
      id: "cs-production-migration",
      title: "Zero-Downtime Linux Server & PostgreSQL Migration for Production Django Application",
      client: "Production Operations @ TogetherVSolve",
      problem: "Migrating a live production Django application and PostgreSQL database to a new Linux server without data loss or downtime.",
      challenges: "Managing large media file transfers, database dump/restore integrity, environment secrets, and DNS transition under active production traffic.",
      solution: "Executed a staged migration pipeline: automated PostgreSQL backup/restoration, rsync media sync, Nginx reverse proxy configuration, Gunicorn setup, SSL provision, and production validation.",
      lessonsLearned: "Staged dry-run migrations with rollback scripts eliminate production downtime and prevent data drift.",
      tools: ["Linux (Ubuntu)", "PostgreSQL", "Nginx", "Gunicorn", "Django", "SSH"],
      metrics: "100% data integrity preserved with seamless production handover"
    },
    {
      id: "cs-sutra-rbac",
      title: "Designing Multi-Tenant RBAC & Workflow Automation in Sutra",
      client: "Sutra Enterprise Platform",
      problem: "Managing complex permission hierarchies (Admin, Manager, Contributor) across multi-team task workflows in a high-concurrency SaaS app.",
      challenges: "Preventing authorization bypasses while maintaining fast query speeds on task trees and notification dispatch queues.",
      solution: "Implemented Django REST Framework custom permission classes coupled with optimized PostgreSQL indexed queries and Redis pub/sub.",
      lessonsLearned: "Role-based access control checks performed at the database query layer eliminate redundant ORM roundtrips.",
      tools: ["Django", "Django REST Framework", "PostgreSQL", "Redis", "React"],
      metrics: "Sub-50ms API response time across complex permission evaluations"
    }
  ] as CaseStudy[],

  services: [
    {
      id: "saas-mvp",
      title: "SaaS MVP & Enterprise Development",
      outcome: "Build production-grade web platforms from scratch with scalable backend architecture and responsive UI.",
      iconName: "Rocket"
    },
    {
      id: "backend-apis",
      title: "Backend Architecture & REST APIs",
      outcome: "Engineered backend microservices in Django, FastAPI, or Node.js with secure auth, RBAC, and database optimization.",
      iconName: "Database"
    },
    {
      id: "ai-automation",
      title: "AI Integration & Deployment Agents",
      outcome: "Embed LLM APIs and automated deployment agents into your infrastructure to streamline operations.",
      iconName: "Bot"
    },
    {
      id: "fullstack-apps",
      title: "Full Stack Application Ownership",
      outcome: "End-to-end full stack development from design implementation to production maintenance.",
      iconName: "Layout"
    },
    {
      id: "production-devops",
      title: "Linux Server Administration & DevOps",
      outcome: "Deploy and manage Linux servers, Nginx reverse proxies, Gunicorn, PostgreSQL backups, and server migrations.",
      iconName: "Server"
    },
    {
      id: "ecommerce-fulfillment",
      title: "E-Commerce & Custom Fulfillment Systems",
      outcome: "Develop custom product order processing, inventory engines, and third-party logistics API integrations.",
      iconName: "Zap"
    }
  ] as Service[],

  techStackCategories: [
    {
      title: "Backend & Databases",
      items: ["Django & DRF", "Node.js & Express", "FastAPI", "Python", "PostgreSQL", "Redis"]
    },
    {
      title: "Frontend Engineering",
      items: ["React.js", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "Redux", "HTML5/CSS3"]
    },
    {
      title: "Production DevOps & Cloud",
      items: ["Linux Administration", "Nginx Reverse Proxy", "Gunicorn", "Docker Containers", "SSH & Server Setup", "Vercel"]
    },
    {
      title: "AI & Integrations",
      items: ["AI Deployment Agents", "LLM APIs (OpenAI/Gemini)", "Shiprocket API", "Google Maps API", "RESTful Webhooks"]
    }
  ],

  testimonials: [
    {
      id: "t1",
      quote: "Sachin expanded his role from backend lead to full-stack ownership on Sutra, consistently delivering production-grade code, scalable APIs, and reliable features.",
      author: "Tech Lead",
      title: "Technical Lead",
      company: "TogetherVSolve Solutions",
    },
    {
      id: "t2",
      quote: "His hands-on experience with Linux servers, database migrations, and full-stack development makes him a reliable engineer who takes true ownership.",
      author: "Engineering Manager",
      title: "Product Operations",
      company: "TogetherVSolve Solutions",
    }
  ] as Testimonial[],

  openSourceRepos: [
    {
      id: "ai-deployment-agent-repo",
      name: "ai-deployment-agent",
      description: "Automated Linux server deployment system for Django, FastAPI, Flask, and Node.js with Nginx, Gunicorn, and SSL configuration.",
      techStack: ["Python", "FastAPI", "Linux", "Nginx", "Docker"],
      githubUrl: "https://github.com/SachinVerma88",
    },
    {
      id: "django-rbac-boilerplate",
      name: "django-enterprise-rbac-starter",
      description: "Production starter for Django REST Framework featuring custom role-based access control, JWT authentication, and PostgreSQL optimization.",
      techStack: ["Django", "PostgreSQL", "Redis", "Docker"],
      githubUrl: "https://github.com/SachinVerma88",
    },
    {
      id: "nextjs-corporate-starter",
      name: "nextjs-responsive-corporate-template",
      description: "Clean, responsive corporate web application boilerplate built with Next.js, React, Tailwind CSS, and Google Maps API.",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/SachinVerma88",
    }
  ] as OpenSourceRepo[],

  blogPosts: [
    {
      id: "django-linux-migration",
      title: "How I Migrated a Live Production Django Application & PostgreSQL Database to a New Linux Server",
      date: "Jul 2026",
      readTime: "7 min read",
      summary: "A practical step-by-step guide to managing DB dumps, media asset transfers, Gunicorn/Nginx re-configuration, and SSL setup with zero downtime.",
      tags: ["Linux", "Django", "PostgreSQL", "DevOps"],
      url: "#"
    },
    {
      id: "building-sutra-rbac",
      title: "Architecting Role-Based Access Control in Django REST Framework & Next.js",
      date: "Jun 2026",
      readTime: "6 min read",
      summary: "Lessons learned building Sutra: designing clean permission matrices, optimizing query counts, and securing frontend routes.",
      tags: ["Django", "Next.js", "Security", "Architecture"],
      url: "#"
    },
    {
      id: "ai-server-deployment-automation",
      title: "Building an AI-Assisted Server Deployment Tool for FastAPI & Node.js Applications",
      date: "May 2026",
      readTime: "5 min read",
      summary: "Automating SSH commands, Gunicorn systemd service generation, and Certbot SSL certificate setup using Python automation scripts.",
      tags: ["FastAPI", "Python", "DevOps", "Automation"],
      url: "#"
    }
  ] as BlogPost[],

  contact: {
    headline: "Let's Build Something Great",
    subhead: "Looking for a Full Stack & AI Engineer for your next production product, server migration, or custom application? Let's discuss.",
    engagementTypes: [
      {
        title: "Freelance Development",
        description: "Custom SaaS MVP development, API engineering, or AI integration."
      },
      {
        title: "Long-term Contract",
        description: "Dedicated full-stack engineering capacity and Linux DevOps management."
      },
      {
        title: "Full-time Engineer",
        description: "Full-time Full Stack & AI engineering role."
      }
    ],
    ctaButton: "Send an Inquiry",
  }
};
