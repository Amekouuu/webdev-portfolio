import { Injectable, PLATFORM_ID, inject, signal, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

/**
 * Dark mode is switched off for now, not removed. Every dark style is keyed
 * on [data-theme='dark'], so always choosing 'light' disables it without
 * touching any CSS.
 *
 * To bring it back, set this to true AND the matching DARK_MODE_ENABLED in
 * the pre-paint script in index.html (which runs before Angular and so
 * cannot import this), and uncomment the dark theme-color meta there.
 */
export const DARK_MODE_ENABLED = false;

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'portfolio-theme';

  /** Read by the navbar to show or hide the toggle. */
  readonly enabled = DARK_MODE_ENABLED;

  // Prerendering runs this service in Node, where localStorage and matchMedia
  // do not exist. Without this guard every prerendered route throws.
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /**
   * Signal-based reactive theme state (Angular 17+).
   * Read in templates with: themeService.theme()
   */
  theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Whenever theme signal changes, sync <html data-theme="..."> and localStorage
    effect(() => {
      const t = this.theme();
      if (!this.isBrowser) return;
      document.documentElement.setAttribute('data-theme', t);
      // While dark mode is off, leave any saved choice alone so a visitor who
      // picked dark gets it back when it is re-enabled.
      if (DARK_MODE_ENABLED) localStorage.setItem(this.STORAGE_KEY, t);
    });
  }

  /** Toggle between light and dark */
  toggle(): void {
    if (!DARK_MODE_ENABLED) return;
    this.theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }

  /** Convenience helper for templates: *ngIf="themeService.isDark()" */
  isDark(): boolean {
    return this.theme() === 'dark';
  }

  private getInitialTheme(): Theme {
    // Server has no stored preference and no OS signal. The inline script in
    // index.html sets the real theme before first paint, so this value is only
    // ever the prerendered placeholder.
    if (!this.isBrowser) return 'light';
    if (!DARK_MODE_ENABLED) return 'light';

    const stored = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;
    // Fall back to OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}