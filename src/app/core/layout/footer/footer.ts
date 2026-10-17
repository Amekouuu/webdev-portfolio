import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

type Social = { label: string; href: string };

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  year = new Date().getFullYear();

  /**
   * <base href="/"> makes a bare href="#top" resolve to "/#top", so on any
   * page but home the link loaded the home page instead of scrolling. Scroll
   * in place, and move focus to the brand link so keyboard users land at the
   * top too. The href stays for no-JS visitors.
   */
  backToTop(e: Event) {
    e.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    document.querySelector<HTMLElement>('.brand')?.focus({ preventScroll: true });
  }

  socials: Social[] = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/micko-alberto-b49906316/' },
    { label: 'GitHub', href: 'https://github.com/Amekouuu' },
    { label: 'Email', href: 'mailto:mqalberto12@gmail.com' },
  ];
}