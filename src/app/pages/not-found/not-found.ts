import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

// Single-file on purpose: the design rebuild will likely replace this wholesale,
// so it isn't worth a three-file component yet.
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="nf">
      <p class="nf__code">404</p>
      <h1 class="nf__title">This page doesn't exist.</h1>
      <p class="nf__body">
        The link may be outdated, or the address might have a typo.
      </p>
      <nav class="nf__links" aria-label="Suggested pages">
        <a routerLink="/">Home</a>
        <a routerLink="/projects">Projects</a>
        <a routerLink="/blog">Blog</a>
        <a routerLink="/contact">Contact</a>
      </nav>
    </section>
  `,
  styles: [`
    .nf {
      max-width: 42rem;
      margin: 0 auto;
      padding: clamp(4rem, 12vh, 9rem) 1.5rem;
      text-align: center;
    }
    .nf__code {
      margin: 0 0 .75rem;
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: var(--text-sm, 12px);
      letter-spacing: .18em;
      color: var(--gold, #caa33a);
    }
    .nf__title {
      margin: 0 0 .75rem;
      font-family: Fraunces, Georgia, serif;
      font-size: clamp(1.75rem, 5vw, 2.75rem);
      line-height: 1.15;
      color: var(--text, #0d1b2a);
    }
    .nf__body {
      margin: 0 auto 2rem;
      max-width: 32rem;
      color: var(--text-muted, #4f566b);
    }
    .nf__links {
      display: flex;
      flex-wrap: wrap;
      gap: .5rem 1.5rem;
      justify-content: center;
    }
    .nf__links a {
      color: var(--text, #0d1b2a);
      text-decoration: underline;
      text-underline-offset: 4px;
      padding: .5rem .25rem;
    }
    .nf__links a:hover,
    .nf__links a:focus-visible {
      color: var(--gold, #caa33a);
    }
  `],
})
export class NotFound {
  constructor(private seo: SeoService) {
    this.seo.set({
      title: 'Page not found | Micko Q. Alberto',
      description: 'That page could not be found.',
    });
  }
}
