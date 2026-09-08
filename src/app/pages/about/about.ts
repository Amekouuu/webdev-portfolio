import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { PROJECTS } from '../../data/projects';

type TechItem = {
  name: string;
  iconSrc: string;
  iconAlt?: string;
  /** Shown instead of project attribution when no project lists this tool. */
  note?: string;
};

type TechGroup = {
  title: string;
  items: TechItem[];
};

type Cert = {
  name: string;
  issuer: string;
  url: string;
  validFrom?: string;
  validTo?: string;
};

type CertGroup = {
  issuer: string;
  certs: Cert[];
};

type Social = {
  label: string;
  url: string;
  iconSrc: string;
  iconAlt: string;
};

type EducationItem = {
  years: string;
  school: string;
  program: string;
  highlights: string[];
};

/** One command in the fun-facts terminal. */
type TermCommand = {
  cmd: string;
  lines: string[];
  link?: { label: string; url: string };
};

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements AfterViewInit, OnDestroy {
  profile = {
    name: 'Micko Alberto',
    role: 'SEO-Focused Front-End Developer',
    imageUrl: 'assets/images/about-profile-transparent.png',
    imageWebp: 'assets/images/about-profile-transparent.webp',
    imageAlt: 'Micko Alberto',
  };

  introParagraphs: string[] = [
    "I aspire to build clean, fast, and easy-to-navigate websites — with practical SEO so the site doesn't just look good, it gets found.",
    "I focus on readable structure, performance basics, and details that don't feel distracting.",
  ];

  quickFacts = [
    { label: 'Based',  value: 'Pampanga, PH' },
    { label: 'School', value: 'Holy Angel University' },
    { label: 'Focus',  value: 'Front-End + SEO' },
    { label: 'Style',  value: 'Clean + Simple UI' },
  ];

  socials: Social[] = [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/micko-alberto-b49906316/',
      iconSrc: 'assets/images/icons/linkedin.png',
      iconAlt: '',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/Amekouuu',
      iconSrc: 'assets/images/icons/github.png',
      iconAlt: '',
    },
    {
      label: 'Email',
      url: 'mailto:mqalberto12@gmail.com',
      iconSrc: 'assets/images/icons/google.png',
      iconAlt: '',
    },
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
      highlights: [
        "Dean's Lister (2023-2025)",
        'SEO Case Study: M&J Quality Used Cars',
        'Vue.JS Case Study: DoMore Student Planner',
      ],
    },
  ];

  techGroups: TechGroup[] = [
    {
      title: 'Core technologies',
      items: [
        { name: 'HTML',       iconSrc: 'assets/icons/skills/html.png' },
        { name: 'CSS',        iconSrc: 'assets/icons/skills/css.png' },
        { name: 'JavaScript', iconSrc: 'assets/icons/skills/javascript.png' },
        { name: 'Angular',    iconSrc: 'assets/icons/skills/angular.png' },
      ],
    },
    {
      title: 'Tools',
      items: [
        { name: 'Git',   iconSrc: 'assets/icons/skills/github.png', note: 'Version control on every project here.' },
        { name: 'Figma', iconSrc: 'assets/icons/skills/figma.png' },
        { name: 'SEO',   iconSrc: 'assets/icons/skills/seo.png' },
      ],
    },
  ];

  certs: Cert[] = [
    {
      name: 'Google Analytics Certified',
      issuer: 'Google',
      url: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/176814946',
      validFrom: 'March 12, 2026',
      validTo: 'March 12, 2027',
    },
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

  /* The "Amekou" story, as a terminal you can actually poke at. The copy is the
     same content the old Fun Facts card carried. */
  terminal: TermCommand[] = [
    {
      cmd: 'whoami',
      lines: [
        'Micko Alberto — IT student in Mabalacat City, Pampanga.',
        'Front-end development with an SEO focus. Online, I go by "Amekou".',
      ],
    },
    {
      cmd: 'why-amekou',
      lines: [
        'I love gaming, and my in-game handle is "Amekou".',
        'It matches the vibe of my best friend\'s IGN "Neku", so it\'s kind of our thing —',
        'it\'s small, but it makes my username unique but a bit more… me.',
      ],
    },
    {
      cmd: 'now-playing',
      lines: ['Hip-hop & R&B, mostly, while I build.'],
      link: {
        label: 'open spotify',
        url: 'https://open.spotify.com/user/31e7uxgyecob7fs6gp7w33sumjnu?si=ca2a4177713849d7',
      },
    },
  ];

  activeCmd = 0;

  private io: IntersectionObserver | null = null;

  constructor(private seo: SeoService) {
    this.seo.set({
      title: 'About Micko Alberto — Front-End Developer & SEO',
      description:
        'About Micko Alberto — an IT student in Pampanga, Philippines. Education, tech stack, certifications, and the story behind the "Amekou" handle.',
    });

    this.certGroups = this.groupCertsByIssuer(this.certs);
  }

  ngAfterViewInit(): void {
    // Angular 21 runs this during prerendering, where neither document nor
    // IntersectionObserver exists.
    if (typeof document === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    // Decorative only: the rows are fully legible without it, so a browser that
    // never fires this loses a rule sweep, not content. The page was blanked
    // once before by a reveal that hid content until an observer ran.
    this.io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (!e.isIntersecting || !(e.target instanceof HTMLElement)) continue;
          e.target.classList.add('isIn');
          this.io?.unobserve(e.target);
        }
      },
      { threshold: 0.35 }
    );

    for (const row of Array.from(document.querySelectorAll('.techRow'))) {
      this.io.observe(row);
    }
  }

  ngOnDestroy(): void {
    // ngOnDestroy also runs on the server after prerendering.
    this.io?.disconnect();
    this.io = null;
  }

  setCmd(i: number): void {
    this.activeCmd = i;
  }

  get activeCommand(): TermCommand {
    return this.terminal[this.activeCmd];
  }

  /** Projects in data/projects.ts that list this tool — real attribution
      rather than a self-assessed percentage bar. */
  usedIn(tech: string): string[] {
    const key = tech.toLowerCase();
    return PROJECTS
      .filter(p => p.tools.some(t => t.toLowerCase() === key))
      .map(p => this.shortName(p.name));
  }

  usageLabel(tech: string): string {
    const n = this.usedIn(tech).length;
    return n === 1 ? '1 project' : `${n} projects`;
  }

  certMeta(c: Cert): string {
    if (c.validFrom && c.validTo) return `${c.validFrom} – ${c.validTo}`;
    if (c.validFrom) return c.validFrom;
    return '';
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

  /** "Do More — Student Planner (Vue.js)" -> "Do More". The full names carry
      the stack in brackets, which the tool column already says. */
  private shortName(name: string): string {
    return name.split(/\s+[—-]\s+|\s+\(/)[0].replace(/\s+Website$/, '').trim();
  }
}
