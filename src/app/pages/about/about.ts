import { Component, OnDestroy, AfterViewInit, isDevMode } from '@angular/core';
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
  /**
   * ISO yyyy-mm-dd, both of them. These used to be free text ("Sept 03, 2024",
   * "Jan 9, 2026"), which reads fine but cannot be compared: parsing non-ISO
   * date strings is implementation-defined, so the same value can yield a valid
   * Date in V8 and Invalid Date elsewhere. formatDate() renders them for display.
   */
  issued: string;
  /** Omit for credentials that never expire. */
  expires?: string;
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

/**
 * Issuer whose certification group renders expanded on load.
 * Named here rather than inline so a rename in `certs` is one edit, not two —
 * see isOpenByDefault() for why this issuer.
 */
const PREFERRED_ISSUER = 'HubSpot Academy';

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
        // Must stay spelled "Vue.js" — usedIn() matches this against
        // projects.ts `tools` by exact lowercased equality, and Do More
        // lists it as 'Vue.js'. "Vue" would compile and credit 0 projects.
        { name: 'Vue.js',     iconSrc: 'assets/icons/skills/vue.png' },
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

  /** Every credential, expired or not. `certGroups` holds the ones still valid. */
  readonly allCerts: Cert[] = [
    {
      name: 'Google Analytics Certified',
      issuer: 'Google',
      url: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/176814946',
      issued:  '2026-03-12',
      expires: '2027-03-12',
    },
    {
      name: 'HubSpot SEO Certified',
      issuer: 'HubSpot Academy',
      url: 'https://app-na2.hubspot.com/academy/achievements/zq0w4kl3/en/1/micko-alberto/seo',
      issued:  '2026-01-09',
      expires: '2027-02-08',
    },
    {
      name: 'HubSpot SEO II Certified',
      issuer: 'HubSpot Academy',
      url: 'https://app-na2.hubspot.com/academy/achievements/p6w0zjt0/en/1/micko-alberto/seo-ii',
      issued:  '2026-02-01',
      expires: '2028-03-02',
    },
    {
      name: 'HubSpot Content Marketing Certified',
      issuer: 'HubSpot Academy',
      url: 'https://app-na2.hubspot.com/academy/achievements/l0mr2v5k/en/1/micko-alberto/content-marketing',
      issued:  '2025-08-26',
      expires: '2027-09-25',
    },
    {
      name: 'Website UI/UX Designing using ChatGPT',
      issuer: 'Simplilearn SkillUp',
      url: 'https://simpli-web.app.link/e/yyfQm52OF0b',
      issued: '2025-08-23',
    },
    {
      name: 'Introduction to Graphic Design; Basics of UI/UX',
      issuer: 'Simplilearn SkillUp',
      url: 'https://simpli-web.app.link/e/XbXbQO7450b',
      issued: '2025-08-09',
    },
    {
      name: 'Legacy Responsive Web Design V8',
      issuer: 'freeCodeCamp.org',
      url: 'https://www.freecodecamp.org/certification/amekuraiya/responsive-web-design',
      issued: '2024-09-03',
    },
    {
      name: 'Legacy JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp.org',
      url: 'https://www.freecodecamp.org/certification/amekuraiya/javascript-algorithms-and-data-structures',
      issued: '2025-10-01',
    },
  ];

  /** Still-valid credentials only — what the page counts and renders. */
  certs: Cert[] = [];
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

    this.certs = this.dropExpired(this.allCerts);
    this.certGroups = this.groupCertsByIssuer(this.certs);
    this.reportExpiry();
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
    const issued = this.formatDate(c.issued);
    return c.expires ? `${issued} – ${this.formatDate(c.expires)}` : issued;
  }

  /**
   * Hides credentials whose expiry has passed.
   *
   * Compares ISO strings rather than Date objects: yyyy-mm-dd sorts
   * lexicographically, so this needs no parsing and cannot drift by a timezone
   * hour. `today` is UTC, so a cert stays listed for a few extra hours in PH
   * (UTC+8) on its final day — erring toward keeping a credential, not dropping
   * one early.
   *
   * Note this runs at *render* time. The prerendered HTML is a build-time
   * snapshot, so a cert that lapses after deployment keeps showing in the
   * indexed page until the next deploy; visitors get the correct list on
   * hydration. Redeploy (or schedule one) to refresh the crawled copy.
   */
  private dropExpired(list: Cert[]): Cert[] {
    const today = new Date().toISOString().slice(0, 10);
    return list.filter(c => !c.expires || c.expires >= today);
  }

  /** Dev-only heads-up, so a credential never vanishes without explanation. */
  private reportExpiry(): void {
    if (!isDevMode()) return;

    const expired = this.allCerts.filter(c => !this.certs.includes(c));
    if (expired.length) {
      console.info(
        `[about] ${expired.length} expired certification(s) hidden:`,
        expired.map(c => `${c.name} (expired ${c.expires})`)
      );
    }

    const soon = this.certs
      .filter(c => c.expires && this.daysUntil(c.expires) <= 90)
      .sort((a, b) => this.daysUntil(a.expires!) - this.daysUntil(b.expires!));

    if (soon.length) {
      console.warn(
        `[about] ${soon.length} certification(s) expiring within 90 days:`,
        soon.map(c => `${c.name} — ${this.daysUntil(c.expires!)} days (${c.expires})`)
      );
    }
  }

  private daysUntil(iso: string): number {
    const ms = Date.parse(`${iso}T00:00:00Z`) - Date.now();
    return Math.ceil(ms / 86_400_000);
  }

  /** timeZone UTC so the rendered day matches the stored day in every locale. */
  private formatDate(iso: string): string {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
  }

  /**
   * Which issuer group starts expanded when the page loads.
   *
   * HubSpot Academy by name, because those are the SEO and content credentials
   * that back the "SEO-focused" claim the rest of the site makes — the group
   * worth reading without a click. Deliberately *not* "whichever group is
   * largest": that would quietly change on its own as certificates expire,
   * eventually promoting a group nobody chose.
   *
   * Falls back to the first group when the preferred issuer is absent, so the
   * section never renders fully collapsed once every HubSpot certificate has
   * lapsed (the last expires 2028-03-02).
   *
   * Must return a stable value per group: Angular only writes the `open`
   * property when the bound expression changes, which is what stops it from
   * re-closing a group the visitor just opened. A rule that flip-flopped
   * across change-detection runs would fight the visitor's clicks.
   */
  isOpenByDefault(group: CertGroup, index: number): boolean {
    const preferred = this.certGroups.find(g => g.issuer === PREFERRED_ISSUER);
    return preferred ? group === preferred : index === 0;
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
