import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'portfolio-theme';

  /**
   * Signal-based reactive theme state (Angular 17+).
   * Read in templates with: themeService.theme()
   */
  theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Whenever theme signal changes, sync <html data-theme="..."> and localStorage
    effect(() => {
      const t = this.theme();
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem(this.STORAGE_KEY, t);
    });
  }

  /** Toggle between light and dark */
  toggle(): void {
    this.theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }

  /** Convenience helper for templates: *ngIf="themeService.isDark()" */
  isDark(): boolean {
    return this.theme() === 'dark';
  }

  private getInitialTheme(): Theme {
    const stored = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;
    // Fall back to OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}