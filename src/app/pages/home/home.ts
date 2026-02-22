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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, SectionHeader, ProjectCard, LocalTimePipe, RevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  name = 'Micko Q. Alberto';
  tagline = 'Bridging the gap between SEO and front-end development.';

  intro = `<span class="u-accent">I build clean, simple websites</span> and optimize content for search.
           People know me for turning messy ideas into layouts that feel easy to use.`;

  featured = FEATURED_PROJECTS;

  whatIDo = [
    { title: 'Content\nOptimization', desc: 'I help improve readability and SEO alignment for blogs and landing pages.' },
    { title: 'Keyword\nResearch', desc: 'I find high-intent, long-tail keywords that match search intent.' },
    { title: 'UI/UX\nDesigning', desc: 'I design simple, readable layouts that support user experience and SEO.' },
  ];

  heroLine1 = 'still learning,';
  heroLine2 = 'still building';
  heroTitleA11y = 'still learning, still building';

  statusLines: StatusLine[] = [
    { icon: '⌁', text: 'CHILLIN’ IN MABALACAT CITY', appearMs: 250, loadMs: 700 },
    { icon: '◷', text: '', isTime: true, appearMs: 450, loadMs: 500 },
    { icon: '✶', text: 'CURRENT FOCUS: SEO-FOCUSED FRONT-END DEV', appearMs: 300, loadMs: 950 },
    {
      icon: '♫',
      text: 'LISTENING TO: HIPHOP & R&B',
      link: 'https://open.spotify.com/user/31e7uxgyecob7fs6gp7w33sumjnu?si=ca2a4177713849d7',
      appearMs: 650,
      loadMs: 800,
    },
    { icon: '↯', text: 'BUILDING: PORTFOLIO V1', appearMs: 520, loadMs: 1100 },
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
    this.timers.forEach((t) => clearTimeout(t));
    if (this.clockTimer) clearInterval(this.clockTimer);
  }

  private bootStatusLines() {
    this.statusLines.forEach((line) => {
      line.visible = false;
      line.loading = false;
      line.done = false;
    });

    this.cdr.markForCheck();

    this.statusLines.forEach((line) => {
      this.timers.push(
        window.setTimeout(() => {
          line.visible = true;
          line.loading = true;
          this.cdr.markForCheck();

          const jitter = Math.floor(Math.random() * 250);
          const finalLoad = Math.max(250, line.loadMs + jitter);

          this.timers.push(
            window.setTimeout(() => {
              line.loading = false;
              line.done = true;
              this.cdr.markForCheck();
            }, finalLoad)
          );
        }, line.appearMs)
      );
    });
  }
}