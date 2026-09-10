import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

/** Extra fields a blog post needs to emit BlogPosting structured data. */
export interface ArticleMeta {
  /** The bare post title, WITHOUT the " | Micko Alberto" suffix. Google shows
   *  `headline` in rich results, and the site-name suffix is noise there. */
  headline: string;
  /** ISO yyyy-mm-dd, straight from BlogPost.date. */
  datePublished: string;
  /** BlogPost.tags — becomes `keywords`. */
  keywords?: string[];
}

export interface SeoConfig {
  title: string;
  description: string;
  /** OG image (1200×630px). Relative paths are resolved against BASE_URL. */
  image?: string;
  /** Canonical URL override. Defaults to BASE_URL + current route */
  url?: string;
  /** Open Graph type. Defaults to 'website' */
  type?: 'website' | 'article';
  /** Present only on blog posts. Omit it and any stale BlogPosting JSON-LD
   *  left by a previous route is removed — see setArticleSchema(). */
  article?: ArticleMeta;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly BASE_URL = 'https://amekou-dev.vercel.app';

  /** id on the BlogPosting <script>, so it can be found and replaced/removed. */
  private static readonly ARTICLE_LD_ID = 'ld-article';

  // Purpose-built 1200×630 share card — the exact size LinkedIn, Facebook, X,
  // Discord and Slack crop to. It carries the site's own masthead (JetBrains
  // Mono 900 name, Fraunces italic tagline, steel-blue accent) so a share
  // preview reads as this site rather than as a screenshot of a client's.
  // The matching static tags live in index.html; change both together.
  private readonly DEFAULT_IMAGE = '/assets/images/og-card.png';

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

    // ── BlogPosting JSON-LD ───────────────────────────────────────────────
    this.setArticleSchema(config.article, config.description, url, image);
  }

  /**
   * Writes (or clears) the BlogPosting JSON-LD block.
   *
   * Clearing is the important half. This is a SPA, so <head> survives
   * navigation: a schema written on /blog/some-post would otherwise still be
   * there on /about, telling Google that the About page is an article. Every
   * page calls set(), and every page without `article` clears the block — so
   * it self-cleans without relying on ngOnDestroy, which also fires during
   * prerendering and would strip the tag before the HTML is serialized.
   *
   * The Person schema in index.html is a separate block and is left alone;
   * multiple JSON-LD scripts on one page are valid.
   */
  private setArticleSchema(
    article: ArticleMeta | undefined,
    description: string,
    url: string,
    image: string,
  ): void {
    const doc = this.doc;
    const existing = doc.getElementById(SeoService.ARTICLE_LD_ID);

    if (!article) {
      existing?.remove();
      return;
    }

    const data = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.headline,
      description,
      image,
      datePublished: article.datePublished,
      dateModified: article.datePublished,
      author: { '@type': 'Person', name: 'Micko Alberto', url: `${this.BASE_URL}/about` },
      publisher: { '@type': 'Person', name: 'Micko Alberto', url: this.BASE_URL },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      ...(article.keywords?.length ? { keywords: article.keywords.join(', ') } : {}),
    };

    const script = existing ?? this.createArticleScript();
    script.textContent = JSON.stringify(data);
  }

  private createArticleScript(): HTMLScriptElement {
    const script = this.doc.createElement('script');
    script.id = SeoService.ARTICLE_LD_ID;
    script.setAttribute('type', 'application/ld+json');
    this.doc.head.appendChild(script);
    return script;
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