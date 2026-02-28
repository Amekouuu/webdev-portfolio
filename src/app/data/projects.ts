export interface Project {
  id: string;
  name: string;
  tag?: string;
  description: string;
  tools: string[];
  images: { src: string; alt: string }[];
  liveUrl: string;
  repoUrl?: string;
  featured?: boolean;
  type: 'web' | 'design';
  imgPos?: string; // ✅ add this
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
    type: 'web',
    imgPos: 'center',
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
    type: 'web',

    // ✅ tweak if you want to bias toward the main UI
    imgPos: '50% 35%',
  },
  {
    id: 'coffee-shop-dashboard',
    name: 'Mock Coffee Shop Blog Site (HTML + CSS)',
    tag: 'Academic HTML/CSS + JavaScript Case Study',
    description: 'Mock coffee shop blog site with a focus on clean design and responsive layout made to simulate a real-world experience.',
    tools: ['HTML', 'CSS', 'JavaScript'],
    images: [
      { src: '/assets/images/cafe-crawl-background.png', alt: 'Cafe Crawl Blog Site Screenshot' },
    ],
    liveUrl: 'https://cafe-crawl.netlify.app/',
    repoUrl: 'https://github.com/Amekouuu/IntroWeb',
    featured: true,
    type: 'web',

    // ✅ full-page screenshots usually need top bias
    imgPos: 'center top', // try "center 15%" if needed
  },

  // ===== UI/UX (Figma) =====
  {
    id: 'sanvera-pharmacy-ui',
    name: 'Sanvera Pharmacy — UI/UX Case Study',
    tag: 'UI/UX Design (Figma)',
    description:
      'Designed a complete pharmacy website experience including landing, product listings, contact, email template, maps, and social mockups.',
    tools: ['Figma', 'UI/UX', 'Design System'],
    images: [
      { src: '/assets/images/sanvera-preview.png', alt: 'Sanvera Pharmacy Figma Preview' },
    ],
    liveUrl:
      'https://www.figma.com/design/YDNl0dApodlhDcRgYAoCPy/Sanvera-Pharmacy?node-id=58-79&t=KCwOxapxyeH6FPQ6-1',
    featured: false,
    type: 'design',

    // ✅ figma exports often need slight upward bias
    imgPos: 'center 18%',
  },
  {
    id: 'second-figma-design',
    name: 'Second UI/UX Design — Case Study',
    tag: 'UI/UX Design (Figma)',
    description:
      'Second Figma case study focusing on layout systems, responsive sections, and clean component consistency.',
    tools: ['Figma', 'UI/UX', 'Components'],
    images: [
      { src: '/assets/images/placeholder-1.png', alt: 'Second Figma Design Preview' },
    ],
    liveUrl: 'https://www.figma.com/', // TODO: replace with your second design link
    featured: false,
    type: 'design',

    // ✅ placeholder tends to look empty; bias slightly up
    imgPos: 'center 20%',
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter(p => p.featured).slice(0, 3);