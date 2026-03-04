import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

type TechItem = {
  name: string;
  iconSrc: string;
  iconAlt?: string;
};

type TechGroup = {
  title: string;
  items: TechItem[];
};

type Cert = {
  name: string;
  issuer: string;
  url: string;
  pdfUrl?: string;
  validFrom?: string;
  validTo?: string;
};

type Social = {
  label: string;
  url: string;
  iconSrc: string;
  iconAlt: string;
};

type CertGroup = {
  issuer: string;
  certs: Cert[];
};

type EducationItem = {
  years: string;
  school: string;
  program: string;
  highlights: string[];
};

type FeaturedProject = {
  title: string;
  desc: string;
  tech: string[];
  primaryLabel: string;
  primaryUrl: string;
  secondaryLabel: string;
  secondaryUrl: string;
};

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit, OnDestroy {
  title = 'About';
  subtitle = 'A quick story about me — and how I approach things.';

  heroName = 'Micko';

  roleHeadline = 'SEO-Focused Front-End Developer';

  resumeUrl = '/assets/Micko_Alberto_Resume.pdf';

  profile = {
    name: 'Micko Q. Alberto',
    role: 'SEO-Focused Front-End Developer',
    imageUrl: 'assets/images/about-profile-transparent.png',
    imageAlt: 'Profile picture of Micko Q. Alberto',
  };

  featuredProject: FeaturedProject | null = {
    title: 'M&J Quality Used Cars Website (Angular)',
    desc: 'SEO optimized site + responsive UI for a used car dealership in Mabalacat.',
    tech: ['Angular', 'UI', 'SEO-ready'],
    primaryLabel: 'View Website',
    primaryUrl: 'https://www.mjqualitycars.com/',
    secondaryLabel: 'View Repository',
    secondaryUrl: 'https://github.com/Jex-beep/done-WSEA',
  };

  introParagraphs: string[] = [
    "I aspire to build clean, fast, and easy-to-navigate websites — with practical SEO so the site doesn't just look good, it gets found.",
    'I focus on readable structure, performance basics, and details that don\'t feel distracting.'
  ];

  quickFacts = [
    { label: 'Base',   value: 'Pampanga, PH' },
    { label: 'School', value: 'Holy Angel University' },
    { label: 'Focus',  value: 'Front-End + SEO' },
    { label: 'Style',  value: 'Clean + Simple UI' },
  ];

  education: EducationItem[] = [
    {
      years: '2023 – Present',
      school: 'Holy Angel University',
      program: 'BS Information Technology (Web Development)',
      highlights: [
  'Developing scalable front-end solutions with attention to UI clarity, accessibility, and performance.',
  'Applying technical SEO fundamentals and structured content strategies in academic and client-based projects.',
],
    },
    {
      years: 'Awards & Notable Coursework',
      school: '',
      program: '',
      highlights: ['Dean\'s Lister (2023-2025)', 'SEO Case Study: M&J Quality Used Cars', 'Vue.JS Case Study: DoMore Student Planner'],
    },
  ];

    // add more soon
  gamer = {
    title: 'Interests & the "Amekou" name',
    body: [
      'I love gaming, and my in-game handle is "Amekou".',
      'It matches the vibe of my best friend\'s IGN "Neku", so it\'s kind of our thing — it\'s small, but it makes my username unique but a bit more… me.',
    ],
  };

  aboutTitle = 'What I focus on';
  aboutBody: string[] = [
  'Clear structure first: I aim for layouts that scan well and feel easy to understand.',
  'Foundational performance and SEO practices: semantic markup, consistent hierarchy, and organized components.',
  'Simplicity and functionality: I avoid unnecessary complexity and focus on what makes a site truly useful.',
  ];

  aboutNote = 'My goal is "simple but premium": fewer distractions, stronger clarity, and better usability.';

howIWorkTitle = 'How I approach projects';

howIWorkPoints = [
  {
    title: 'User-aware thinking',
    desc: 'I try to see projects from a user’s perspective so navigation feels clear and predictable.',
  },
  {
    title: 'Clarity over complexity',
    desc: 'I prioritize clean structure and readable layouts over unnecessary visual effects.',
  },
  {
    title: 'Continuous learning',
    desc: 'I actively explore new tools and technologies — including AI — while focusing on building solid fundamentals.',
  },
];

  socials: Social[] = [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/micko-alberto-b49906316/',
      iconSrc: 'assets/images/icons/linkedin.png',
      iconAlt: 'LinkedIn icon',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/Amekouuu',
      iconSrc: 'assets/images/icons/github.png',
      iconAlt: 'GitHub icon',
    },
    {
      label: 'Email',
      url: 'mailto:mqalberto12@gmail.com',
      iconSrc: 'assets/images/icons/google.png',
      iconAlt: 'Email icon',
    },
  ];

  techGroups: TechGroup[] = [
    {
      title: 'Core Technologies',
      items: [
        { name: 'HTML',       iconSrc: 'assets/icons/skills/html.png',       iconAlt: 'HTML logo' },
        { name: 'CSS',        iconSrc: 'assets/icons/skills/css.png',        iconAlt: 'CSS logo' },
        { name: 'JavaScript', iconSrc: 'assets/icons/skills/javascript.png', iconAlt: 'JavaScript logo' },
        { name: 'Angular',    iconSrc: 'assets/icons/skills/angular.png',    iconAlt: 'Angular logo' },
      ],
    },
    {
      title: 'Tools',
      items: [
        { name: 'Git',   iconSrc: 'assets/icons/skills/github.png', iconAlt: 'Git logo' },
        { name: 'Figma', iconSrc: 'assets/icons/skills/figma.png',  iconAlt: 'Figma logo' },
        { name: 'SEO',   iconSrc: 'assets/icons/skills/seo.png',    iconAlt: 'SEO icon' },
      ],
    },
  ];

  includeSeoTools = false;

  private optionalSeoTools: TechItem[] = [
    { name: 'Google Search Console', iconSrc: 'assets/icons/skills/gsc.png',        iconAlt: 'Google Search Console icon' },
    { name: 'Lighthouse',            iconSrc: 'assets/icons/skills/lighthouse.png',  iconAlt: 'Lighthouse icon' },
    { name: 'GA4',                   iconSrc: 'assets/icons/skills/ga4.png',         iconAlt: 'Google Analytics 4 icon' },
  ];

  certs: Cert[] = [
    {
      name: 'HubSpot SEO Certified',
      issuer: 'HubSpot Academy',
      url: 'https://app-na2.hubspot.com/academy/achievements/zq0w4kl3/en/1/micko-alberto/seo',
      validFrom: 'Jan 9, 2026',
      validTo: 'Feb 8, 2027',
    },
    {
      name: 'HubSpot SEO II Certified',
      issuer: 'HubSpot Academy',
      url: 'https://app-na2.hubspot.com/academy/achievements/p6w0zjt0/en/1/micko-alberto/seo-ii',
      validFrom: 'Feb 1, 2026',
      validTo: 'Mar 2, 2028',
    },
    {
      name: 'HubSpot Content Marketing Certified',
      issuer: 'HubSpot Academy',
      url: 'https://app-na2.hubspot.com/academy/achievements/l0mr2v5k/en/1/micko-alberto/content-marketing',
      validFrom: 'Aug 26, 2025',
      validTo: 'Sep 25, 2027',
    },
    {
      name: 'Website UI/UX Designing using ChatGPT',
      issuer: 'Simplilearn SkillUp',
      url: 'https://simpli-web.app.link/e/yyfQm52OF0b',
      validFrom: 'Aug 23, 2025',
    },
    {
      name: 'Introduction to Graphic Design; Basics of UI/UX',
      issuer: 'Simplilearn SkillUp',
      url: 'https://simpli-web.app.link/e/XbXbQO7450b',
      validFrom: 'Aug 09, 2025',
    },
    {
      name: 'Legacy Responsive Web Design V8',
      issuer: 'freeCodeCamp.org',
      url: 'https://www.freecodecamp.org/certification/amekuraiya/responsive-web-design',
      validFrom: 'Sept 03, 2024',
    },
    {
      name: 'Legacy JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp.org',
      url: 'https://www.freecodecamp.org/certification/amekuraiya/javascript-algorithms-and-data-structures',
      validFrom: 'Oct 01, 2025',
    },
  ];

  certGroups: CertGroup[] = [];
  activeIssuerIndex = 0;

  activeSection: 'intro' | 'work' | 'skills' | 'certs' | 'resume' = 'intro';

  showToTop = false;

  private ioActive: IntersectionObserver | null = null;
  private ioReveal: IntersectionObserver | null = null;
  private onScrollBound: () => void;

  constructor(private seo: SeoService) {
    this.seo.set({
      title: 'About | Micko Q. Alberto',
      description:
        'About Micko Q. Alberto — SEO-focused front-end developer. Skills, certifications, education, and approach.',
    });

    this.certGroups = this.groupCertsByIssuer(this.certs);
    this.activeIssuerIndex = 0;

    if (this.includeSeoTools) {
      const tools = this.techGroups.find(g => g.title === 'Tools');
      if (tools) tools.items = [...tools.items, ...this.optionalSeoTools];
    }

    this.onScrollBound = this.onScroll.bind(this);
  }

  ngAfterViewInit(): void {
    const revealEls = Array.from(document.querySelectorAll('[appReveal]')) as HTMLElement[];

    this.ioReveal = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (!(e.target instanceof HTMLElement)) continue;
          if (e.isIntersecting) e.target.classList.add('isInView');
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );

    for (const el of revealEls) this.ioReveal.observe(el);

    const ids: Array<typeof this.activeSection | 'education' | 'personal' | 'fun'> = [
      'intro', 'work', 'skills', 'certs', 'resume', 'education', 'personal', 'fun',
    ];

    const sectionEls = ids
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    this.ioActive = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(x => x.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];

        if (!visible?.target?.id) return;
        const id = visible.target.id;

        if (id === 'intro' || id === 'work' || id === 'skills' || id === 'certs' || id === 'resume') {
          this.activeSection = id;
        }
      },
      { threshold: [0.25, 0.4, 0.55, 0.7], rootMargin: '-20% 0px -55% 0px' }
    );

    for (const el of sectionEls) this.ioActive.observe(el);

    window.addEventListener('scroll', this.onScrollBound, { passive: true });
    this.onScroll();
  }

  ngOnDestroy(): void {
    this.ioActive?.disconnect();
    this.ioReveal?.disconnect();
    this.ioActive = null;
    this.ioReveal = null;
    window.removeEventListener('scroll', this.onScrollBound);
  }

  private onScroll(): void {
    this.showToTop = window.scrollY > 500;
  }

  private groupCertsByIssuer(list: Cert[]): CertGroup[] {
    const map = new Map<string, Cert[]>();

    for (const c of list) {
      const key = c.issuer?.trim() || 'Other';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(c);
    }

    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([issuer, certs]) => ({ issuer, certs }));
  }

  get activeGroup(): CertGroup | null {
    if (!this.certGroups.length) return null;
    return this.certGroups[this.activeIssuerIndex] || null;
  }

  selectIssuer(index: number) {
    if (index < 0 || index >= this.certGroups.length) return;
    this.activeIssuerIndex = index;
    this.scrollTo('certs');
  }

  nextIssuer() {
    if (!this.certGroups.length) return;
    this.activeIssuerIndex = (this.activeIssuerIndex + 1) % this.certGroups.length;
  }

  prevIssuer() {
    if (!this.certGroups.length) return;
    this.activeIssuerIndex =
      (this.activeIssuerIndex - 1 + this.certGroups.length) % this.certGroups.length;
  }

  certMeta(c: Cert) {
    if (c.validFrom && c.validTo) return `(${c.validFrom} – ${c.validTo})`;
    if (c.validFrom) return `(${c.validFrom})`;
    return '';
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = 14;
    const y = el.getBoundingClientRect().top + window.scrollY - yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });

    el.setAttribute('tabindex', '-1');
    (el as HTMLElement).focus({ preventScroll: true });
  }
}