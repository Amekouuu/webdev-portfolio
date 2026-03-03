import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface SeoConfig {
  title: string;
  description: string;
  /** Full URL to an OG image (1200×630px). Defaults to /assets/images/og-default.png */
  image?: string;
  /** Canonical URL override. Defaults to BASE_URL + current route */
  url?: string;
  /** Open Graph type. Defaults to 'website' */
  type?: 'website' | 'article';
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  // 🔁 Update this to your real domain before deploying
  private readonly BASE_URL = 'https://mickoalberto.dev';
  private readonly DEFAULT_IMAGE = '/assets/images/og-default.png';

  constructor(private title: Title, private meta: Meta, private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        // Safety net — components call seo.set() in their constructors
        // which fires after navigation, so stale meta is always overwritten.
      });
  }

  set(config: SeoConfig): void {
    const fullTitle = config.title;
    const url      = config.url   ?? `${this.BASE_URL}${this.router.url}`;
    const image    = config.image ?? this.DEFAULT_IMAGE;
    const type     = config.type  ?? 'website';

    // ── Standard ──────────────────────────────────────────────────────────
    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description',        content: config.description });

    // ── Open Graph ────────────────────────────────────────────────────────
    this.meta.updateTag({ property: 'og:title',       content: fullTitle });
    this.meta.updateTag({ property: 'og:description',  content: config.description });
    this.meta.updateTag({ property: 'og:image',        content: image });
    this.meta.updateTag({ property: 'og:url',          content: url });
    this.meta.updateTag({ property: 'og:type',         content: type });
    this.meta.updateTag({ property: 'og:site_name',    content: 'Micko Q. Alberto' });

    // ── Twitter Card ──────────────────────────────────────────────────────
    this.meta.updateTag({ name: 'twitter:card',        content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title',       content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image',       content: image });

    // ── Canonical Link ────────────────────────────────────────────────────
    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}