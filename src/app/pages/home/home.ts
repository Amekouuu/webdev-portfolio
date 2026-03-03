import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { SectionHeader } from '../../shared/components/section-header/section-header';
import { ProjectCard } from '../../shared/components/project-card/project-card';
import { FEATURED_PROJECTS } from '../../data/projects';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { LocalTimePipe } from '../../shared/pipes/local-time.pipe';

type StatusLine = {
  icon: string;
  text: string;
  link?: string;
  isTime?: boolean;
  appearMs: number;
  loadMs: number;
  visible?: boolean;
  loading?: boolean;
  done?: boolean;
};

type Capability = {
  title: string;
  pills: string[];
  badge: string;
  desc: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, SectionHeader, ProjectCard, LocalTimePipe, RevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  name     = 'Micko Q. Alberto';
  tagline  = 'Bridging the gap between SEO and front-end development.';

  intro = `<span class="u-accent">I build clean, simple websites</span> and optimize content for search.
           People know me for turning messy ideas into layouts that feel easy to use.`;

  featured = FEATURED_PROJECTS;

 capabilities: Capability[] = [
  {
    title: 'FRONTEND ENGINEERING',
    pills: ['Angular', 'CSS Architecture', 'Figma'],
    badge: '< >',
    desc: 'I build structured, component-driven interfaces using Angular, focusing on scalable layout systems and performance-conscious UI development.',
  },
  {
    title: 'TOOLS & DEPLOYMENT',
    pills: ['GitHub', 'Vercel', 'Netlify'],
    badge: '{ }',
    desc: 'I manage Git-based workflows and production deployments, ensuring organized version control and clean, repeatable builds.',
  },
  {
    title: 'ANALYTICS & SEO',
    pills: ['Google Analytics 4', 'Google Search Console', 'Google Lighthouse'],
    badge: '/ /',
    desc: 'I use analytics and performance tools to measure, refine, and optimize user experience and search visibility.',
  },
];

  activeCap = 0;

  toggleCap(i: number) {
    this.activeCap = this.activeCap === i ? -1 : i;
  }

  heroTitleA11y = 'still learning, still building';

  statusLines: StatusLine[] = [
    { icon: '⌁', text: 'CHILLIN\u2019 IN MABALACAT CITY',              appearMs: 250, loadMs: 700  },
    { icon: '◷', text: '', isTime: true,                                appearMs: 450, loadMs: 500  },
    { icon: '✶', text: 'CURRENT FOCUS: SEO-FOCUSED FRONT-END DEV',     appearMs: 300, loadMs: 950  },
    {
      icon: '♫',
      text: 'LISTENING TO: HIPHOP & R&B',
      link: 'https://open.spotify.com/user/31e7uxgyecob7fs6gp7w33sumjnu?si=ca2a4177713849d7',
      appearMs: 650,
      loadMs: 800,
    },
    { icon: '↯', text: 'BUILDING: PORTFOLIO V2',                        appearMs: 520, loadMs: 1100 },
  ];

  private timers: number[] = [];
  private clockTimer: ReturnType<typeof setInterval> | null = null;

  constructor(private seo: SeoService, private cdr: ChangeDetectorRef) {
    this.seo.set({
      title: 'Home | Micko Q. Alberto',
      description: 'Portfolio of Micko Q. Alberto — web development, SEO-focused work, and projects.',
    });
  }

  ngOnInit(): void {
    this.bootStatusLines();
    this.clockTimer = setInterval(() => this.cdr.markForCheck(), 1000);
  }

  ngOnDestroy(): void {
    this.timers.forEach(t => clearTimeout(t));
    if (this.clockTimer) clearInterval(this.clockTimer);
  }

  private bootStatusLines() {
    this.statusLines.forEach(line => {
      line.visible = false;
      line.loading = false;
      line.done    = false;
    });

    this.cdr.markForCheck();

    this.statusLines.forEach(line => {
      this.timers.push(
        window.setTimeout(() => {
          line.visible = true;
          line.loading = true;
          this.cdr.markForCheck();

          const jitter    = Math.floor(Math.random() * 250);
          const finalLoad = Math.max(250, line.loadMs + jitter);

          this.timers.push(
            window.setTimeout(() => {
              line.loading = false;
              line.done    = true;
              this.cdr.markForCheck();
            }, finalLoad)
          );
        }, line.appearMs)
      );
    });
  }
}