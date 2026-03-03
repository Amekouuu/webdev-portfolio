export interface Skill {
  name: string;
  /** 0–100 — used as CSS width % on the progress bar */
  level: number;
  category: 'frontend' | 'backend' | 'design' | 'seo';
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
  url?: string;
}

export const SKILLS: Skill[] = [
  { name: 'Angular',               level: 82, category: 'frontend' },
  { name: 'React / Next.js',       level: 75, category: 'frontend' },
  { name: 'Vue.js',                level: 68, category: 'frontend' },
  { name: 'CSS / Tailwind CSS',    level: 90, category: 'frontend' },
  { name: 'HTML5',                 level: 95, category: 'frontend' },
  { name: 'Laravel (PHP)',         level: 65, category: 'backend'  },
  { name: 'Node.js / Express',     level: 60, category: 'backend'  },
  { name: 'MongoDB / MySQL',       level: 62, category: 'backend'  },
  { name: 'Figma',                 level: 80, category: 'design'   },
  { name: 'Design Systems',        level: 72, category: 'design'   },
  { name: 'SEO / Core Web Vitals', level: 85, category: 'seo'      },
  { name: 'Google Analytics',      level: 78, category: 'seo'      },
];

export const CERTIFICATIONS: Certification[] = [
  // 🔁 Replace with your real certifications
  {
    name: 'Google Analytics Certification',
    issuer: 'Google',
    year: 2024,
    url: 'https://skillshop.credential.net/',
  },
  {
    name: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    year: 2023,
    url: 'https://freecodecamp.org/',
  },
];

export const CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend:  'Backend',
  design:   'Design & Tooling',
  seo:      'SEO & Performance',
};