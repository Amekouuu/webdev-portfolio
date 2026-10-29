export interface Project {
  id: string;
  name: string;
  tag?: string;
  description: string;
  tools: string[];
  /**
   * The academic year the project was built, named by the calendar year it
   * began: 2025 is the 2025–26 school year. Stored as a number so it sorts;
   * academicYear() renders it as "2025–26".
   */
  yearStart: number;
  /** `webp` is served first via <picture>; `src` is the fallback for older browsers. */
  images: { src: string; alt: string; webp?: string }[];
  /**
   * The deployed site. Optional: a project can ship its source without a
   * public front end. projectHref() falls back to the repo, and a project with
   * neither (an internal system) renders as a card with no link at all, never
   * as a dead anchor -- give it `internal` instead.
   */
  liveUrl?: string;
  repoUrl?: string;
  /** Your part in a team project, shown on the card ("Lead developer"). */
  role?: string;
  /**
   * For work that cannot be linked (an employer's internal system): shown in
   * place of the link buttons, so the card explains why there is no link.
   */
  internal?: string;
  featured?: boolean;
  type: 'web' | 'design';
  imgPos?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'lofu-lost-and-found',
    name: 'LoFu — Lost & Found Web App (MEAN Stack)',
    tag: 'Full-Stack Case Study',
    description:
      'Community lost-and-found platform for Angeles City. Users post a lost or found item, claim it, and message the other party in real time.',
    tools: ['Angular', 'TypeScript', 'Express', 'MongoDB', 'Socket.IO'],
    yearStart: 2025,
    images: [
      { src: '/assets/images/lofu-background.jpg', webp: '/assets/images/lofu-background.webp', alt: 'LoFu lost and found web app home page' },
    ],
    // The API is on Render free tier, which sleeps when idle, so the first
    // load after a quiet spell waits on a cold start before items appear.
    liveUrl: 'https://lofu-webapplication.vercel.app',
    featured: true,
    type: 'web',
    imgPos: 'center',
  },
  {
    id: 'ciac-rmis',
    name: 'CIAC Risk Management Information System (RMIS)',
    tag: 'OJT Project',
    role: 'Lead developer · team project',
    description:
      'Replaces Clark International Airport Corporation’s Excel-based Risk Register with a controlled web system. Departments submit risks; the Risk Management Committee reviews, scores, approves or returns them, and merges duplicates.',
    tools: ['React', 'JavaScript', 'Express', 'SQL Server'],
    yearStart: 2026,
    images: [
      { src: '/assets/images/rmis-login.jpg', webp: '/assets/images/rmis-login.webp', alt: 'CIAC Risk Management System sign-in screen' },
    ],
    // Internal to CIAC: listed with permission, but the system and its
    // source stay private. The sign-in screen is the only public-safe view.
    internal: 'Internal CIAC system, not publicly deployed. Shown with permission.',
    featured: true,
    type: 'web',
    imgPos: 'right center',
  },
  {
    id: 'mj-quality-used-cars',
    name: 'M&J Quality Used Cars Website (Angular)',
    tag: 'Client Project + SEO Case Study',
    description: 'SEO blog + responsive UI for a used car dealership in Mabalacat.',
    tools: ['Angular', 'HTML', 'CSS', 'SEO'],
    yearStart: 2025,
    images: [
      { src: '/assets/images/mjqualitycars-background.jpg', webp: '/assets/images/mjqualitycars-background.webp', alt: 'M&J Quality Used Cars Website Screenshot' },
    ],
    // Link hidden (2026-10-29): the live host is compromised and being cleaned
    // up. Restore when fixed: liveUrl: 'https://www.mjqualitycars.com/',
    internal: 'Site is currently being updated. Link coming back soon.',
    featured: true,
    type: 'web',
    imgPos: 'center',
  },
  {
    id: 'life-saver-care-circle',
    name: 'Life Saver Care Circle — Clinic Booking & Pharmacy System',
    tag: 'Client Project',
    role: 'Support developer · team project',
    description:
      'Booking and pharmacy ordering for Life Saver Care Circle’s PhilHealth-accredited clinics: branch finder, real-time slot booking, medicine ordering with reference-number tracking, and a per-branch admin dashboard.',
    tools: ['React', 'JavaScript', 'Express', 'Supabase'],
    yearStart: 2025,
    images: [
      { src: '/assets/images/lifesaver-background.jpg', webp: '/assets/images/lifesaver-background.webp', alt: 'Life Saver Care Circle website home page' },
    ],
    // Client code: the repository stays private, so there is no Source link.
    liveUrl: 'https://lscarecircle.com.ph/',
    featured: false,
    type: 'web',
    imgPos: 'left center',
  },
  {
    id: 'do-more-student-planner',
    name: 'Do More — Student Planner (Vue.js)',
    tag: 'Academic Vue.js Case Study',
    description: 'A student planner app concept with simple task tracking and clean UI.',
    tools: ['Vue.js', 'JavaScript', 'CSS'],
    yearStart: 2024,
    images: [
      { src: '/assets/images/domore-background.jpg', webp: '/assets/images/domore-background.webp', alt: 'Do More Student Planner Screenshot' },
    ],
    liveUrl: 'https://domore-student-planner.netlify.app/login',
    featured: false,
    type: 'web',
    imgPos: '50% 35%',
  },
  {
    id: 'coffee-shop-dashboard',
    name: 'CafeCrawl — Coffee Shop Blog Site (HTML + CSS)',
    tag: 'Academic HTML/CSS + JavaScript Case Study',
    description: 'Blog site for a mock coffee shop, focused on clean design and a responsive layout that simulates a real-world experience.',
    tools: ['HTML', 'CSS', 'JavaScript'],
    yearStart: 2023,
    images: [
      { src: '/assets/images/cafe-crawl-background.jpg', webp: '/assets/images/cafe-crawl-background.webp', alt: 'CafeCrawl coffee shop blog site screenshot' },
    ],
    liveUrl: 'https://cafe-crawl.netlify.app/',
    featured: false,
    type: 'web',
    imgPos: 'center top',
  },
  {
    id: 'sanvera-pharmacy-ui',
    name: 'Sanvera Pharmacy — UI/UX Case Study',
    tag: 'UI/UX Design (Figma)',
    description:
      'Designed a complete pharmacy website experience including landing, product listings, contact, email template, maps, and social mockups.',
    tools: ['Figma', 'UI/UX', 'Design System'],
    yearStart: 2024,
    images: [
      { src: '/assets/images/sanvera-background.png', webp: '/assets/images/sanvera-background.webp', alt: 'Sanvera Pharmacy Figma Preview' },
    ],
    liveUrl:
      'https://www.figma.com/proto/YDNl0dApodlhDcRgYAoCPy/Sanvera-Pharmacy?node-id=58-79&t=bVZoZOl7nbgmtNCc-1',
    featured: false,
    type: 'design',
    imgPos: 'center 1%',
  },
  {
    id: 'topchillog-ui',
    name: 'TopChillog Featured Page - Mockup',
    tag: 'UI/UX Design (Figma)',
    description:
      'Figma design for a featured page of a local food place called TopChillog.',
    tools: ['Figma', 'UI/UX', 'Components'],
    yearStart: 2024,
    images: [
      { src: '/assets/images/topchillog-landing.jpg', webp: '/assets/images/topchillog-landing.webp', alt: 'TopChillog Figma Preview' },
    ],
    liveUrl: 'https://www.figma.com/design/ZNyCzfEZhhKeH77pwz7WYj/TopChillog-Featured-Page-Mockup?node-id=0-1&t=a5fCXp775fW4lim6-1',
    featured: false,
    type: 'design',
    imgPos: 'center 10%',
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter(p => p.featured).slice(0, 3);

/**
 * Where the card itself points. The live site wins; without one the repo
 * stands in, so a card is never a dead anchor.
 */
export function projectHref(p: Project): string {
  return p.liveUrl ?? p.repoUrl ?? '';
}

/**
 * The primary call-to-action's wording. Design work lives on Figma, and a
 * project with no deployed front end must not promise a site to visit.
 */
export function projectLinkLabel(p: Project): string {
  if (p.type === 'design') return 'Open in Figma';
  return p.liveUrl ? 'Visit site' : 'View source';
}

/** 2025 -> "2025–26". These are school years, so a single year would misstate them. */
export function academicYear(p: Project): string {
  return `${p.yearStart}–${String(p.yearStart + 1).slice(-2)}`;
}