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
      { src: '/assets/images/mjqualitycars-background.png', alt: 'Project screenshot placeholder 1' },
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
      { src: '/assets/images/domore-background.png', alt: 'Project screenshot placeholder 1' },
    ],
    liveUrl: 'https://domore-student-planner.netlify.app/login',
    repoUrl: 'https://github.com/Amekouuu/DoMore-student-planner.git',
    featured: true,
  },
  {
    id: 'coffee-shop-dashboard',
    name: 'Coffee Shop Ratings Dashboard (PHP)',
     tag: 'Academic PHP + JavaScript Case Study',
    description: 'Admin dashboard that displays all cafe data, favorites, and reviews.',
    tools: ['HTML', 'CSS', 'JavaScript', 'Database'],
    images: [
      { src: 'assets/images/placeholder-1.png', alt: 'Project screenshot placeholder 1' },
      { src: 'assets/images/placeholder-2.png', alt: 'Project screenshot placeholder 2' },
    ],
    liveUrl: 'https://your-live-demo-link.com',
    repoUrl: 'https://github.com/your-repo-link',
    featured: true,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter(p => p.featured).slice(0, 3);
