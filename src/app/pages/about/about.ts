import { Component } from '@angular/core';
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

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  // Page header copy (used as accessible headings too)
  title = 'About';
  subtitle = 'A quick story about me — and how I build things.';

  // --- HERO / INTRO ---
  profile = {
    name: 'Micko Q. Alberto',
    role: 'IT (Web Dev) Student • Angular • SEO',
    imageUrl: 'assets/images/about-profile-transparent.png', // put your image here
    imageAlt: 'Profile picture of Micko Q. Alberto',
  };

  introParagraphs: string[] = [
    "I’m an IT (Web Development) student at Holy Angel University. I like building websites that feel simple to use, fast to load, and easy to understand.",
    "Outside school, I’m into gaming, learning design/SEO, and exploring new tech — especially tools that help me work smarter.",
    "I enjoy projects where I can combine clean UI + practical SEO, so the site not only looks good… but actually gets found.",
  ];

  quickFacts = [
    { label: 'Base', value: 'Pampanga, PH' },
    { label: 'School', value: 'Holy Angel University' },
    { label: 'Focus', value: 'Front-End + SEO' },
    { label: 'Style', value: 'Clean + Simple UI' },
  ];

  // --- “PERSONAL VIBES” SECTION ---
  gamer = {
    title: 'Gaming & the “Amekou” name',
    body: [
      "I love gaming, and my in-game handle is “Amekou”.",
      "It matches the vibe of my best friend’s IGN “Neku”, so it’s kind of our thing — it’s small, but it makes my username unique but a bit more… me.",
    ],
  };

  // --- HOW I WORK ---
  howIWorkTitle = 'How I work';
  howIWorkPoints = [
    {
      title: 'User-first thinking',
      desc: 'I try to “wear the user’s shoes” so navigation feels natural and everything is easy to find.',
      icon: '🧭',
    },
    {
      title: 'Simple, clean design',
      desc: 'I avoid flashy movement/layout unless it actually improves the experience.',
      icon: '🧼',
    },
    {
      title: 'Open to new tech (AI included)',
      desc: 'I enjoy learning and experimenting with modern tools, especially AI innovations, as long as the output stays clean and useful.',
      icon: '🤖',
    },
  ];

  // --- SOCIALS ---
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

// --- TECH STACK (Core + Tools) ---
techGroups: TechGroup[] = [
  {
    title: 'Core Technologies',
    items: [
      { name: 'HTML', iconSrc: 'assets/icons/skills/html.png', iconAlt: 'HTML logo' },
      { name: 'CSS', iconSrc: 'assets/icons/skills/css.png', iconAlt: 'CSS logo' },
      { name: 'JavaScript', iconSrc: 'assets/icons/skills/javascript.png', iconAlt: 'JavaScript logo' },
      { name: 'Angular', iconSrc: 'assets/icons/skills/angular.png', iconAlt: 'Angular logo' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Git', iconSrc: 'assets/icons/skills/github.png', iconAlt: 'Git logo' },
      { name: 'Figma', iconSrc: 'assets/icons/skills/figma.png', iconAlt: 'Figma logo' },
      { name: 'SEO', iconSrc: 'assets/icons/skills/seo.png', iconAlt: 'SEO icon' },
    ],
  },
];

  // --- CERTS (same list; grouped by issuer with prev/next) ---
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

  constructor(private seo: SeoService) {
    this.seo.set({
      title: 'About | Micko Q. Alberto',
      description:
        'About Micko Q. Alberto — IT Web Development student focused on clean UI, Angular, and SEO. Includes certifications grouped by issuer.',
    });

    this.certGroups = this.groupCertsByIssuer(this.certs);
    this.activeIssuerIndex = 0;
  }

  // ---------- Cert helpers ----------
  private groupCertsByIssuer(list: Cert[]): CertGroup[] {
    const map = new Map<string, Cert[]>();
    for (const c of list) {
      const key = c.issuer?.trim() || 'Other';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(c);
    }

    // Keep stable + readable ordering (A-Z)
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

  // ---------- Smooth scroll helper ----------
  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = 14; // adjust if you have sticky nav
    const y = el.getBoundingClientRect().top + window.scrollY - yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });

    // accessibility: focus target
    el.setAttribute('tabindex', '-1');
    (el as HTMLElement).focus({ preventScroll: true });
  }
}