import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

type Destination = {
  path: string;
  label: string;
  desc: string;
};

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  /* Same labels and descriptions as the nav overlay: someone who lands here
     took a wrong turn, so the way out should read like the site's own
     signposting rather than a separate list invented for the error page. */
  readonly destinations: Destination[] = [
    { path: '/',         label: 'Home',     desc: 'Start here — who I am and what I do.' },
    { path: '/about',    label: 'About',    desc: 'My background, skills, and tools.' },
    { path: '/projects', label: 'Projects', desc: 'Selected web dev and UI/UX work.' },
    { path: '/blog',     label: 'Blog',     desc: 'Notes on Angular, CSS, and SEO.' },
    { path: '/contact',  label: 'Contact',  desc: "Let's work together." },
  ];

  constructor(private router: Router, private seo: SeoService) {
    this.seo.set({
      title: 'Page not found — Micko Alberto',
      description: 'That page could not be found on the portfolio of Micko Alberto.',
    });
  }

  /**
   * The path the visitor actually asked for, so a typo is visible rather than
   * guessed at.
   *
   * Query and hash are dropped and the result is capped: this string comes
   * from the address bar, which means anyone can put text in it via a crafted
   * link. The template renders it through interpolation (never innerHTML), so
   * Angular escapes it, and the cap limits how much arbitrary copy such a link
   * can park on the page.
   */
  get attemptedPath(): string {
    const path = this.router.url.split(/[?#]/)[0];
    if (!path || path === '/') return '';
    return path.length > 64 ? `${path.slice(0, 64)}…` : path;
  }

  /** "01", "02", … matching the indexes on home and the blog. */
  index(i: number): string {
    return String(i + 1).padStart(2, '0');
  }
}
