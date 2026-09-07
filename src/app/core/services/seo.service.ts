import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

export interface SeoConfig {
  title: string;
  description: string;
  /** OG image (1200×630px). Relative paths are resolved against BASE_URL. */
  image?: string;
  /** Canonical URL override. Defaults to BASE_URL + current route */
  url?: string;
  /** Open Graph type. Defaults to 'website' */
  type?: 'website' | 'article';
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly BASE_URL = 'https://amekou-dev.vercel.app';

  // TODO(og-image): temporary placeholder — a 1900×940 project screenshot that
  // sits near the 1.91:1 ratio scrapers expect. Replace with a purpose-built
  // 1200×630 card, and update the matching tags in index.html.
  private readonly DEFAULT_IMAGE = '/assets/images/mjqualitycars-background.png';

  private readonly doc = inject(DOCUMENT);

  constructor(private title: Title, private meta: Meta, private router: Router) {}

  set(config: SeoConfig): void {
    const fullTitle = config.title;
    const url      = this.absolute(config.url ?? this.router.url);
    const image    = this.absolute(config.image ?? this.DEFAULT_IMAGE);
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
    this.meta.updateTag({ property: 'og:site_name',    content: 'Micko Alberto' });

    // ── Twitter Card ──────────────────────────────────────────────────────
    this.meta.updateTag({ name: 'twitter:card',        content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title',       content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image',       content: image });

    // ── Canonical Link ────────────────────────────────────────────────────
    this.setCanonical(url);
  }

  /** Scrapers reject relative og:image and canonical values, so force absolute. */
  private absolute(pathOrUrl: string): string {
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    return `${this.BASE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
  }

  private setCanonical(url: string): void {
    // Injected rather than the global `document`, which does not exist in Node
    // and threw on every prerendered route.
    const doc = this.doc;
    let link = doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}