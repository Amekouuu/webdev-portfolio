import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';

import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import {
  FEATURED_PROJECTS,
  academicYear,
  projectHref,
  projectLinkLabel,
} from '../../data/projects';
import { LocalTimePipe } from '../../shared/pipes/local-time.pipe';

type Capability = {
  title: string;
  desc: string;
  tools: string[];
};

/** One fact about right now. Rendered as a <dt>/<dd> pair, not an icon row. */
type NowLine = {
  label: string;
  value: string;
  link?: string;
  /** Rendered from LocalTimePipe rather than `value`. */
  isTime?: boolean;
};

@Component({
  selector: 'app-home',
  standalone: true,
  // No scroll-reveal on this page on purpose: the sections are full screenfuls,
  // so fading them in leaves the viewport blank on the way down — and a reveal
  // that fails to fire (as it did on About) hides the page outright.
  imports: [RouterLink, LocalTimePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  private seo = inject(SeoService);

  name    = 'Micko Alberto';
  role    = 'IT Student — Web Developer';
  tagline = 'still learning, still building';

  intro = `<span class="u-accent">I build clean, simple websites</span> and optimize content for search.
           People know me for turning messy ideas into layouts that feel easy to use.`;

  featured = FEATURED_PROJECTS;

  /** Exposed for the template — imported functions aren't callable from one. */
  readonly academicYear = academicYear;
  /** Shared with the projects page so the two cannot describe a link differently. */
  readonly href = projectHref;
  readonly linkLabel = projectLinkLabel;

  /** The same five facts the animated status list carried, minus the fake loading. */
  now: NowLine[] = [
    { label: 'Based in',      value: 'Mabalacat City, Pampanga' },
    { label: 'Local time',    value: '', isTime: true },
    { label: 'Current focus', value: 'Web development' },
    { label: 'Building',      value: 'Life Saver Care Circle' },
    {
      label: 'Listening to',
      value: 'Hip-hop & R&B',
      link: 'https://open.spotify.com/user/31e7uxgyecob7fs6gp7w33sumjnu?si=ca2a4177713849d7',
    },
  ];

  /* These descriptions used to sit behind a "+" toggle. They are the substance
     of the section, so they are always visible now and the accordion is gone. */
  capabilities: Capability[] = [
    {
      title: 'Frontend engineering',
      desc: 'I build structured, component-driven interfaces using Angular, focusing on scalable layout systems and performance-conscious UI development.',
      tools: ['Angular', 'TypeScript', 'CSS Architecture', 'Figma'],
    },
    {
      title: 'Tools & deployment',
      desc: 'I manage Git-based workflows and production deployments, ensuring organized version control and clean, repeatable builds.',
      tools: ['Git', 'GitHub', 'Vercel', 'Netlify'],
    },
    {
      title: 'Analytics & SEO',
      desc: 'I use analytics and performance tools to measure, refine, and optimize user experience and search visibility.',
      tools: ['Google Analytics 4', 'Search Console', 'Lighthouse'],
    },
  ];

  /** Current time in ms, piped through LocalTimePipe. A signal, so the view
      updates on each tick without the pipe having to be impure. */
  readonly clock = signal(Date.now());
  private clockTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.seo.set({
      title: 'Micko Alberto — Web Developer | Portfolio',
      description:
        'Portfolio of Micko Alberto, an IT student and web developer in Pampanga, Philippines building full-stack web apps with React, Angular and Express.',
    });
  }

  ngOnInit(): void {
    // Prerendering runs this in Node; a timer there would keep the build alive.
    if (typeof window === 'undefined') return;
    this.clockTimer = setInterval(() => this.clock.set(Date.now()), 1000);
  }

  ngOnDestroy(): void {
    if (this.clockTimer) clearInterval(this.clockTimer);
  }

  /** "01", "02", … for the numbered indexes. */
  index(i: number): string {
    return String(i + 1).padStart(2, '0');
  }
}
