export interface Project {
  id: string;
  name: string;
  tag?: string;
  description: string;
  tools: string[];
  images: { src: string; alt: string }[];
  liveUrl: string;
  repoUrl: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 'mj-quality-used-cars',
    name: 'M&J Quality Used Cars Website (Angular)',
    tag: 'Client Project + SEO Case Study',
    description: 'SEO blog + responsive UI for a used car dealership in Mabalacat.',
    tools: ['Angular', 'HTML', 'CSS', 'SEO'],
    images: [
      { src: '/assets/images/mjqualitycars-background.png', alt: 'M&J Quality Used Cars Website Screenshot' },
    ],
    liveUrl: 'https://www.mjqualitycars.com/',
    repoUrl: 'https://github.com/Jex-beep/done-WSEA',
    featured: true,
  },
  {
    id: 'do-more-student-planner',
    name: 'Do More — Student Planner (Vue.js)',
    tag: 'Academic Vue.js Case Study',
    description: 'A student planner app concept with simple task tracking and clean UI.',
    tools: ['Vue.js', 'JavaScript', 'CSS'],
    images: [
      { src: '/assets/images/domore-background.png', alt: 'Do More Student Planner Screenshot' },
    ],
    liveUrl: 'https://domore-student-planner.netlify.app/login',
    repoUrl: 'https://github.com/Amekouuu/DoMore-student-planner.git',
    featured: true,
  },
  {
    id: 'coffee-shop-dashboard',
    name: 'Coffee Shop Blog Site (HTML + CSS)',
     tag: 'Academic HTML/CSS + JavaScript Case Study',
    description: 'Admin dashboard that displays all cafe data, favorites, and reviews.',
    tools: ['HTML', 'CSS', 'JavaScript'],
    images: [
      { src: '/assets/images/cafe-crawl-background.png', alt: 'Cafe Crawl Dashboard Screenshot' },
    ],
    liveUrl: 'https://cafe-crawl.netlify.app/',
    repoUrl: 'https://github.com/Amekouuu/IntroWeb',
    featured: true,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter(p => p.featured).slice(0, 3);
